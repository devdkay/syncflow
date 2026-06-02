import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  CheckCircle,
  DollarSign,
  Inbox,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Menu,
  Pencil,
  RefreshCcw,
  Save,
  ShieldCheck,
  Star,
  Trash2,
  TrendingUp,
  X,
  XCircle,
} from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { ContactSubmission, FinanceEntry, PageView, supabase, TestimonialReview } from '../lib/supabase';

type AdminSection = 'overview' | 'finance' | 'reviews' | 'contacts' | 'traffic';
type TimeRange = '30d' | '90d' | '12m' | 'all';

const currencyFormatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const hasSupabase = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

const navGroups: Array<{ heading: string; items: Array<{ id: AdminSection; label: string; icon: React.ReactNode }> }> = [
  {
    heading: 'Overview',
    items: [{ id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> }],
  },
  {
    heading: 'Business',
    items: [
      { id: 'finance', label: 'Finances', icon: <DollarSign className="w-4 h-4" /> },
      { id: 'contacts', label: 'Contacts', icon: <Inbox className="w-4 h-4" /> },
      { id: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> },
    ],
  },
  {
    heading: 'Analytics',
    items: [{ id: 'traffic', label: 'Traffic', icon: <BarChart3 className="w-4 h-4" /> }],
  },
];

const sectionLabels: Record<AdminSection, string> = {
  overview: 'Overview',
  finance: 'Finances',
  reviews: 'Reviews',
  contacts: 'Contacts',
  traffic: 'Traffic',
};

const defaultFinanceForm = () => ({
  title: '',
  entry_type: 'revenue' as FinanceEntry['entry_type'],
  amount: '',
  category: '',
  entry_date: new Date().toISOString().slice(0, 10),
  notes: '',
});

function formatDate(value?: string) {
  if (!value) return 'Unknown date';
  return dateFormatter.format(new Date(value));
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function rangeCutoff(range: TimeRange) {
  if (range === 'all') return null;

  const now = new Date();
  const cutoff = new Date(now);
  if (range === '30d') cutoff.setDate(now.getDate() - 30);
  if (range === '90d') cutoff.setDate(now.getDate() - 90);
  if (range === '12m') cutoff.setMonth(now.getMonth() - 12);
  return cutoff;
}

function filterFinanceEntries(entries: FinanceEntry[], range: TimeRange) {
  const cutoff = rangeCutoff(range);
  if (!cutoff) return entries;
  return entries.filter(entry => new Date(entry.entry_date) >= cutoff);
}

function filterPageViews(views: PageView[], range: TimeRange) {
  const cutoff = rangeCutoff(range);
  if (!cutoff) return views;
  return views.filter(view => new Date(view.created_at || '') >= cutoff);
}

function buildFinanceChart(entries: FinanceEntry[], range: TimeRange) {
  const filtered = filterFinanceEntries(entries, range);
  const monthly = range === '12m' || range === 'all';

  const buckets = filtered.reduce<Record<string, { label: string; revenue: number; expenses: number }>>((acc, entry) => {
    const date = new Date(entry.entry_date);
    const key = monthly
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      : entry.entry_date;
    const label = monthly
      ? new Intl.DateTimeFormat('en-CA', { month: 'short', year: '2-digit' }).format(date)
      : new Intl.DateTimeFormat('en-CA', { month: 'short', day: 'numeric' }).format(date);

    if (!acc[key]) acc[key] = { label, revenue: 0, expenses: 0 };
    if (entry.entry_type === 'revenue') acc[key].revenue += Number(entry.amount);
    if (entry.entry_type === 'expense') acc[key].expenses += Number(entry.amount);
    return acc;
  }, {});

  return Object.entries(buckets)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([, value]) => ({ ...value, profit: value.revenue - value.expenses }));
}

function buildTrafficChart(views: PageView[], range: TimeRange) {
  const filtered = filterPageViews(views, range);
  const monthly = range === '12m' || range === 'all';

  const buckets = filtered.reduce<Record<string, { label: string; visits: number }>>((acc, view) => {
    const date = new Date(view.created_at || '');
    if (Number.isNaN(date.getTime())) return acc;

    const key = monthly
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      : date.toISOString().slice(0, 10);
    const label = monthly
      ? new Intl.DateTimeFormat('en-CA', { month: 'short', year: '2-digit' }).format(date)
      : new Intl.DateTimeFormat('en-CA', { month: 'short', day: 'numeric' }).format(date);

    if (!acc[key]) acc[key] = { label, visits: 0 };
    acc[key].visits += 1;
    return acc;
  }, {});

  return Object.entries(buckets)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([, value]) => value);
}

function AdminCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60 ${className}`}>
      {children}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  helper,
  tone = 'cyan',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  helper: string;
  tone?: 'cyan' | 'orange' | 'green' | 'red';
}) {
  const tones = {
    cyan: 'bg-[#00D4FF]/12 text-[#0089a8]',
    orange: 'bg-[#FF6B35]/12 text-[#c84f22]',
    green: 'bg-emerald-500/12 text-emerald-700',
    red: 'bg-red-500/12 text-red-700',
  };

  return (
    <AdminCard className="p-5">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${tones[tone]}`}>
        {icon}
      </div>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{helper}</p>
    </AdminCard>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-950">{title}</h1>
      <p className="mt-2 text-slate-500">{subtitle}</p>
    </div>
  );
}

function RangeTabs({ value, onChange }: { value: TimeRange; onChange: (range: TimeRange) => void }) {
  return (
    <div className="grid grid-cols-4 gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
      {(['30d', '90d', '12m', 'all'] as TimeRange[]).map(range => (
        <button
          key={range}
          type="button"
          onClick={() => onChange(range)}
          className={`rounded-lg px-3 py-2 text-xs font-bold uppercase transition-colors ${value === range ? 'bg-[#00D4FF] text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-950'}`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [reviews, setReviews] = useState<TestimonialReview[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [financeEntries, setFinanceEntries] = useState<FinanceEntry[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [financeRange, setFinanceRange] = useState<TimeRange>('90d');
  const [trafficRange, setTrafficRange] = useState<TimeRange>('90d');
  const [editingFinanceId, setEditingFinanceId] = useState<string | null>(null);
  const [financeForm, setFinanceForm] = useState(defaultFinanceForm);

  const loadDashboardData = async () => {
    if (!hasSupabase) return;

    setDataLoading(true);
    setError(null);

    try {
      const [contactsResult, reviewsResult, pageViewsResult, financeResult] = await Promise.all([
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('page_views').select('*').order('created_at', { ascending: false }).limit(1000),
        supabase.from('finance_entries').select('*').order('entry_date', { ascending: false }),
      ]);

      if (contactsResult.error) throw contactsResult.error;
      if (reviewsResult.error) throw reviewsResult.error;
      if (pageViewsResult.error) throw pageViewsResult.error;
      if (financeResult.error) throw financeResult.error;

      setContacts((contactsResult.data || []) as ContactSubmission[]);
      setReviews((reviewsResult.data || []) as TestimonialReview[]);
      setPageViews((pageViewsResult.data || []) as PageView[]);
      setFinanceEntries((financeResult.data || []) as FinanceEntry[]);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Unable to load dashboard data.'));
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (!hasSupabase) {
      setAuthLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadDashboardData();
  }, [session]);

  const totals = useMemo(() => {
    const revenue = financeEntries
      .filter(entry => entry.entry_type === 'revenue')
      .reduce((sum, entry) => sum + Number(entry.amount), 0);
    const expenses = financeEntries
      .filter(entry => entry.entry_type === 'expense')
      .reduce((sum, entry) => sum + Number(entry.amount), 0);

    return {
      revenue,
      expenses,
      profit: revenue - expenses,
      pendingReviews: reviews.filter(review => review.status === 'pending').length,
      approvedReviews: reviews.filter(review => review.status === 'approved').length,
    };
  }, [financeEntries, reviews]);

  const viewsByPath = useMemo(() => {
    const counts = pageViews.reduce<Record<string, number>>((acc, view) => {
      acc[view.path] = (acc[view.path] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [pageViews]);

  const financeByCategory = useMemo(() => {
    const counts = financeEntries.reduce<Record<string, number>>((acc, entry) => {
      const key = entry.category || 'General';
      const signedAmount = entry.entry_type === 'revenue' ? Number(entry.amount) : -Number(entry.amount);
      acc[key] = (acc[key] || 0) + signedAmount;
      return acc;
    }, {});

    return Object.entries(counts).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])).slice(0, 6);
  }, [financeEntries]);

  const financeChart = useMemo(() => buildFinanceChart(financeEntries, financeRange), [financeEntries, financeRange]);
  const trafficChart = useMemo(() => buildTrafficChart(pageViews, trafficRange), [pageViews, trafficRange]);
  const financeChartMax = useMemo(() => Math.max(...financeChart.flatMap(point => [point.revenue, point.expenses, Math.abs(point.profit)]), 1), [financeChart]);
  const trafficChartMax = useMemo(() => Math.max(...trafficChart.map(point => point.visits), 1), [trafficChart]);

  const recentActivities = useMemo(() => {
    const contactItems = contacts.slice(0, 3).map(contact => ({
      id: `contact-${contact.id}`,
      label: `New contact from ${contact.full_name}`,
      date: contact.created_at,
      section: 'contacts' as AdminSection,
    }));
    const reviewItems = reviews.slice(0, 3).map(review => ({
      id: `review-${review.id}`,
      label: `${review.status} review from ${review.client_name}`,
      date: review.created_at,
      section: 'reviews' as AdminSection,
    }));
    const financeItems = financeEntries.slice(0, 3).map(entry => ({
      id: `finance-${entry.id}`,
      label: `${entry.entry_type === 'revenue' ? 'Revenue' : 'Expense'}: ${entry.title}`,
      date: entry.created_at || entry.entry_date,
      section: 'finance' as AdminSection,
    }));

    return [...contactItems, ...reviewItems, ...financeItems]
      .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
      .slice(0, 5);
  }, [contacts, financeEntries, reviews]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Unable to sign in.'));
    } finally {
      setSigningIn(false);
    }
  };

  const updateReview = async (id: string, changes: Partial<TestimonialReview>) => {
    const { error: updateError } = await supabase.from('testimonials').update(changes).eq('id', id);
    if (updateError) {
      setError(updateError.message);
      return;
    }

    setReviews(prev => prev.map(review => (review.id === id ? { ...review, ...changes } : review)));
  };

  const resetFinanceForm = () => {
    setEditingFinanceId(null);
    setFinanceForm(defaultFinanceForm());
  };

  const submitFinanceEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const amount = Number(financeForm.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Enter a valid finance amount.');
      return;
    }

    const entry = {
      title: financeForm.title,
      entry_type: financeForm.entry_type,
      amount,
      category: financeForm.category || null,
      entry_date: financeForm.entry_date,
      notes: financeForm.notes || null,
    };

    if (editingFinanceId) {
      const { data, error: updateError } = await supabase
        .from('finance_entries')
        .update(entry)
        .eq('id', editingFinanceId)
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setFinanceEntries(prev => prev.map(item => (item.id === editingFinanceId ? data as FinanceEntry : item)));
      resetFinanceForm();
      return;
    }

    const { data, error: insertError } = await supabase
      .from('finance_entries')
      .insert(entry)
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setFinanceEntries(prev => [data as FinanceEntry, ...prev]);
    resetFinanceForm();
  };

  const startEditFinanceEntry = (entry: FinanceEntry) => {
    setEditingFinanceId(entry.id || null);
    setFinanceForm({
      title: entry.title,
      entry_type: entry.entry_type,
      amount: String(entry.amount),
      category: entry.category || '',
      entry_date: entry.entry_date,
      notes: entry.notes || '',
    });
  };

  const deleteFinanceEntry = async (entry: FinanceEntry) => {
    if (!entry.id || !window.confirm(`Delete "${entry.title}"?`)) return;

    const { error: deleteError } = await supabase.from('finance_entries').delete().eq('id', entry.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setFinanceEntries(prev => prev.filter(item => item.id !== entry.id));
    if (editingFinanceId === entry.id) resetFinanceForm();
  };

  const switchSection = (section: AdminSection) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const renderFinanceChart = (compact = false) => (
    <AdminCard className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Finance Analytics</h2>
          <p className="text-sm text-slate-500">Revenue, expenses, and profit by period.</p>
        </div>
        <RangeTabs value={financeRange} onChange={setFinanceRange} />
      </div>

      <div className={`${compact ? 'h-56' : 'h-80'} mt-6 overflow-x-auto`}>
        {financeChart.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-500">
            Add finance entries to populate this chart.
          </div>
        ) : (
          <div className="flex h-full min-w-[580px] items-end gap-5 border-b border-slate-200 pb-8">
            {financeChart.map(point => (
              <div key={point.label} className="flex h-full flex-1 flex-col justify-end gap-3">
                <div className="flex h-full items-end justify-center gap-1.5">
                  <div className="w-4 rounded-t bg-emerald-500" title={`Revenue ${currencyFormatter.format(point.revenue)}`} style={{ height: `${Math.max((point.revenue / financeChartMax) * 100, point.revenue ? 5 : 0)}%` }} />
                  <div className="w-4 rounded-t bg-[#FF6B35]" title={`Expenses ${currencyFormatter.format(point.expenses)}`} style={{ height: `${Math.max((point.expenses / financeChartMax) * 100, point.expenses ? 5 : 0)}%` }} />
                  <div className="w-4 rounded-t bg-[#00D4FF]" title={`Profit ${currencyFormatter.format(point.profit)}`} style={{ height: `${Math.max((Math.abs(point.profit) / financeChartMax) * 100, point.profit ? 5 : 0)}%` }} />
                </div>
                <p className="text-center text-[11px] text-slate-500">{point.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded bg-emerald-500" /> Revenue</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded bg-[#FF6B35]" /> Expenses</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded bg-[#00D4FF]" /> Profit</span>
      </div>
    </AdminCard>
  );

  const renderTrafficChart = (compact = false) => (
    <AdminCard className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Traffic Analytics</h2>
          <p className="text-sm text-slate-500">Tracked public page activity over time.</p>
        </div>
        <RangeTabs value={trafficRange} onChange={setTrafficRange} />
      </div>

      <div className={`${compact ? 'h-56' : 'h-80'} mt-6 overflow-x-auto`}>
        {trafficChart.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-500">
            Page views will appear here once visitors browse the site.
          </div>
        ) : (
          <div className="flex h-full min-w-[560px] items-end gap-5 border-b border-slate-200 pb-8">
            {trafficChart.map(point => (
              <div key={point.label} className="flex h-full flex-1 flex-col justify-end gap-3">
                <div className="flex h-full items-end justify-center">
                  <div className="w-8 rounded-t bg-gradient-to-t from-[#00a8cc] to-[#00D4FF]" title={`${point.visits} visits`} style={{ height: `${Math.max((point.visits / trafficChartMax) * 100, 8)}%` }} />
                </div>
                <p className="text-center text-[11px] text-slate-500">{point.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminCard>
  );

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-6">
        <Loader2 className="h-8 w-8 animate-spin text-[#00D4FF]" />
      </main>
    );
  }

  if (!hasSupabase) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-6">
        <div className="max-w-lg rounded-2xl border border-gray-800 bg-gray-900/60 p-8 text-center">
          <ShieldCheck className="mx-auto mb-5 h-12 w-12 text-[#00D4FF]" />
          <h1 className="mb-3 text-3xl font-bold text-white">Admin Requires Supabase</h1>
          <p className="text-gray-400">
            Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then create an admin user in Supabase Auth to access this dashboard.
          </p>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0d0d0d] via-black to-[#111827] px-6">
        <form onSubmit={signIn} className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/70 p-8 shadow-2xl shadow-[#00D4FF]/10">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#00D4FF]">SyncFlow Admin</p>
            <h1 className="text-3xl font-bold text-white">Sign in to manage business data</h1>
          </div>

          {error && <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

          <div className="space-y-5">
            <div>
              <label htmlFor="adminEmail" className="mb-2 block text-sm font-semibold text-white">Email</label>
              <input id="adminEmail" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full rounded-lg border border-gray-700 bg-gray-800/60 px-4 py-3 text-white focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]" />
            </div>
            <div>
              <label htmlFor="adminPassword" className="mb-2 block text-sm font-semibold text-white">Password</label>
              <input id="adminPassword" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full rounded-lg border border-gray-700 bg-gray-800/60 px-4 py-3 text-white focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]" />
            </div>
            <button type="submit" disabled={signingIn} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#FF6B35] px-6 py-3.5 font-bold text-slate-950 disabled:opacity-60">
              {signingIn && <Loader2 className="h-5 w-5 animate-spin" />}
              Sign In
            </button>
          </div>
        </form>
      </main>
    );
  }

  const renderOverview = () => (
    <div className="space-y-7">
      <SectionTitle title="Dashboard Overview" subtitle="Welcome back. Here is what is happening across SyncFlow." />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<DollarSign className="h-5 w-5" />} label="Total Revenue" value={currencyFormatter.format(totals.revenue)} helper="From recorded finance entries" tone="green" />
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Profit" value={currencyFormatter.format(totals.profit)} helper={`${currencyFormatter.format(totals.expenses)} in expenses`} tone={totals.profit >= 0 ? 'cyan' : 'red'} />
        <StatCard icon={<Inbox className="h-5 w-5" />} label="Contact Leads" value={String(contacts.length)} helper="Form submissions received" tone="orange" />
        <StatCard icon={<Star className="h-5 w-5" />} label="Pending Reviews" value={String(totals.pendingReviews)} helper={`${totals.approvedReviews} approved reviews`} tone="cyan" />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {renderFinanceChart(true)}
        {renderTrafficChart(true)}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.7fr]">
        <AdminCard className="p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-950">Recent Activity</h2>
            <button onClick={loadDashboardData} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-[#00D4FF] hover:text-slate-950">
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.length === 0 && <p className="text-slate-500">No activity yet.</p>}
            {recentActivities.map(activity => (
              <button key={activity.id} onClick={() => switchSection(activity.section)} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-[#00D4FF]">
                <p className="font-semibold text-slate-950">{activity.label}</p>
                <p className="mt-1 text-sm text-slate-500">{formatDate(activity.date)}</p>
              </button>
            ))}
          </div>
        </AdminCard>

        <AdminCard className="p-6">
          <h2 className="mb-5 text-xl font-bold text-slate-950">Quick Actions</h2>
          <div className="space-y-3">
            <button onClick={() => switchSection('finance')} className="w-full rounded-xl border border-slate-200 p-4 text-left font-semibold text-slate-700 hover:border-[#00D4FF] hover:text-slate-950">Add finance entry</button>
            <button onClick={() => switchSection('reviews')} className="w-full rounded-xl border border-slate-200 p-4 text-left font-semibold text-slate-700 hover:border-[#00D4FF] hover:text-slate-950">Moderate reviews</button>
            <button onClick={() => switchSection('contacts')} className="w-full rounded-xl border border-slate-200 p-4 text-left font-semibold text-slate-700 hover:border-[#00D4FF] hover:text-slate-950">Review contact leads</button>
          </div>
        </AdminCard>
      </section>
    </div>
  );

  const renderFinance = () => (
    <div className="space-y-7">
      <SectionTitle title="Finance Management" subtitle="Track revenue, expenses, profit, and business events." />
      {renderFinanceChart()}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <AdminCard className="p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-950">{editingFinanceId ? 'Edit Entry' : 'Add Entry'}</h2>
            {editingFinanceId && (
              <button type="button" onClick={resetFinanceForm} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-950">
                <X className="h-4 w-4" />
                Cancel
              </button>
            )}
          </div>
          <form onSubmit={submitFinanceEntry} className="space-y-4">
            <input value={financeForm.title} onChange={e => setFinanceForm(prev => ({ ...prev, title: e.target.value }))} required className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#00D4FF]" placeholder="Title" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <select value={financeForm.entry_type} onChange={e => setFinanceForm(prev => ({ ...prev, entry_type: e.target.value as FinanceEntry['entry_type'] }))} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#00D4FF]">
                <option value="revenue">Revenue</option>
                <option value="expense">Expense</option>
              </select>
              <input value={financeForm.amount} onChange={e => setFinanceForm(prev => ({ ...prev, amount: e.target.value }))} required type="number" min="0" step="0.01" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#00D4FF]" placeholder="Amount" />
              <input value={financeForm.category} onChange={e => setFinanceForm(prev => ({ ...prev, category: e.target.value }))} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#00D4FF]" placeholder="Category" />
              <input value={financeForm.entry_date} onChange={e => setFinanceForm(prev => ({ ...prev, entry_date: e.target.value }))} required type="date" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#00D4FF]" />
            </div>
            <textarea value={financeForm.notes} onChange={e => setFinanceForm(prev => ({ ...prev, notes: e.target.value }))} rows={3} className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none focus:border-[#00D4FF]" placeholder="Notes" />
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00D4FF] px-5 py-3 font-bold text-slate-950 hover:bg-[#22ddff]">
              <Save className="h-4 w-4" />
              {editingFinanceId ? 'Save Changes' : 'Save Entry'}
            </button>
          </form>
        </AdminCard>

        <AdminCard className="p-6">
          <h2 className="mb-5 text-xl font-bold text-slate-950">Finance Entries</h2>
          <div className="max-h-[560px] space-y-3 overflow-y-auto pr-2">
            {financeEntries.length === 0 && <p className="text-slate-500">No finance entries yet.</p>}
            {financeEntries.map(entry => (
              <div key={entry.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-bold text-slate-950">{entry.title}</p>
                    <p className="text-sm text-slate-500">{entry.category || 'General'} | {formatDate(entry.entry_date)}</p>
                    {entry.notes && <p className="mt-2 text-sm text-slate-600">{entry.notes}</p>}
                  </div>
                  <p className={`font-bold ${entry.entry_type === 'revenue' ? 'text-emerald-700' : 'text-[#c84f22]'}`}>
                    {entry.entry_type === 'revenue' ? '+' : '-'}{currencyFormatter.format(Number(entry.amount))}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={() => startEditFinanceEntry(entry)} className="inline-flex items-center gap-1.5 rounded-lg border border-[#00D4FF]/40 px-3 py-2 text-sm font-semibold text-[#0089a8] hover:bg-[#00D4FF]/10">
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteFinanceEntry(entry)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </section>

      <AdminCard className="p-6">
        <h2 className="mb-5 text-xl font-bold text-slate-950">Category Breakdown</h2>
        <div className="space-y-4">
          {financeByCategory.length === 0 && <p className="text-slate-500">Add finance entries to populate category totals.</p>}
          {financeByCategory.map(([category, amount]) => {
            const max = Math.max(...financeByCategory.map(([, value]) => Math.abs(value)), 1);
            return (
              <div key={category}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-semibold text-slate-700">{category}</span>
                  <span className={amount >= 0 ? 'font-bold text-emerald-700' : 'font-bold text-[#c84f22]'}>{currencyFormatter.format(amount)}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${amount >= 0 ? 'bg-emerald-500' : 'bg-[#FF6B35]'}`} style={{ width: `${Math.max((Math.abs(amount) / max) * 100, 8)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </AdminCard>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-7">
      <SectionTitle title="Review Moderation" subtitle="Approve, reject, and feature client reviews before they appear publicly." />
      <AdminCard className="p-6">
        <div className="space-y-4">
          {reviews.length === 0 && <p className="text-slate-500">No client reviews submitted yet.</p>}
          {reviews.map(review => (
            <div key={review.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-bold text-slate-950">{review.client_name}</p>
                  <p className="text-sm text-slate-500">{review.business_name || review.role || 'Client'} | {formatDate(review.created_at)}</p>
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${review.status === 'approved' ? 'text-emerald-700' : review.status === 'rejected' ? 'text-red-700' : 'text-[#c84f22]'}`}>{review.status}</span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-700">{review.review}</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => updateReview(review.id!, { status: 'approved' })} className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"><CheckCircle className="h-4 w-4" /> Approve</button>
                <button type="button" onClick={() => updateReview(review.id!, { status: 'rejected', featured: false })} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"><XCircle className="h-4 w-4" /> Reject</button>
                <button type="button" onClick={() => updateReview(review.id!, { featured: !review.featured, status: 'approved' })} className="inline-flex items-center gap-1.5 rounded-lg border border-[#00D4FF]/40 px-3 py-2 text-sm font-semibold text-[#0089a8] hover:bg-[#00D4FF]/10"><Star className="h-4 w-4" /> {review.featured ? 'Unfeature' : 'Feature'}</button>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-7">
      <SectionTitle title="Contact Submissions" subtitle="Review inbound project inquiries and client details." />
      <AdminCard className="p-6">
        <div className="space-y-4">
          {contacts.length === 0 && <p className="text-slate-500">No contact submissions yet.</p>}
          {contacts.map(contact => (
            <div key={contact.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-bold text-slate-950">{contact.full_name}</p>
                  <p className="text-sm text-slate-500">{contact.business_name || 'No business name'} | {formatDate(contact.created_at)}</p>
                </div>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0089a8] hover:text-slate-950"><Mail className="h-4 w-4" /> {contact.email}</a>
              </div>
              <p className="mb-2 text-sm font-semibold text-[#c84f22]">{contact.service}</p>
              <p className="text-sm leading-relaxed text-slate-700">{contact.message}</p>
              {contact.phone && <p className="mt-3 text-sm text-slate-500">Phone: {contact.phone}</p>}
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );

  const renderTraffic = () => (
    <div className="space-y-7">
      <SectionTitle title="Traffic Analytics" subtitle="See public site visits and the most active pages." />
      {renderTrafficChart()}
      <AdminCard className="p-6">
        <h2 className="mb-5 text-xl font-bold text-slate-950">Top Pages</h2>
        <div className="space-y-4">
          {viewsByPath.length === 0 && <p className="text-slate-500">No page views tracked yet.</p>}
          {viewsByPath.map(([path, count]) => {
            const max = Math.max(...viewsByPath.map(([, value]) => value), 1);
            return (
              <div key={path}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="truncate font-semibold text-slate-700">{path}</span>
                  <span className="font-bold text-slate-950">{count}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#00D4FF] to-[#FF6B35]" style={{ width: `${Math.max((count / max) * 100, 8)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </AdminCard>
    </div>
  );

  const renderActiveSection = () => {
    if (activeSection === 'finance') return renderFinance();
    if (activeSection === 'reviews') return renderReviews();
    if (activeSection === 'contacts') return renderContacts();
    if (activeSection === 'traffic') return renderTraffic();
    return renderOverview();
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 lg:grid lg:grid-cols-[248px_1fr]">
      {sidebarOpen && <button className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close admin navigation" />}

      <aside className={`fixed left-0 top-0 z-50 h-screen w-[248px] border-r border-slate-800 bg-[#07111d] p-4 text-white transition-transform lg:sticky lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#00D4FF]">SyncFlow</p>
            <h1 className="mt-1 text-2xl font-bold leading-tight">Admin Panel</h1>
          </div>
          <button className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-8">
          {navGroups.map(group => (
            <div key={group.heading}>
              <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">{group.heading}</p>
              <div className="space-y-1">
                {group.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => switchSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${activeSection === item.id ? 'bg-[#00D4FF] text-slate-950 shadow-lg shadow-[#00D4FF]/20' : 'text-slate-300 hover:bg-white/8 hover:text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <button onClick={() => supabase.auth.signOut()} className="absolute bottom-4 left-4 right-4 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-bold text-slate-300 transition-colors hover:border-[#00D4FF] hover:text-[#00D4FF]">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </aside>

      <section className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">
                <Menu className="h-6 w-6" />
              </button>
              <p className="text-sm font-bold text-slate-950">{sectionLabels[activeSection]}</p>
            </div>
            {dataLoading && (
              <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading
              </span>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
          {renderActiveSection()}
        </div>
      </section>
    </main>
  );
}
