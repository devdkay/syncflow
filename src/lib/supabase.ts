import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

function createDisabledSupabaseClient(): SupabaseClient {
  return new Proxy(
    {},
    {
      get() {
        throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable database features.');
      },
    }
  ) as SupabaseClient;
}

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createDisabledSupabaseClient();

export type ContactSubmission = {
  id?: string;
  full_name: string;
  business_name?: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  budget?: string;
  timeline?: string;
  created_at?: string;
  updated_at?: string;
};

export type TestimonialReview = {
  id?: string;
  client_name: string;
  business_name?: string | null;
  role?: string | null;
  location?: string | null;
  email?: string | null;
  rating: number;
  review: string;
  status: 'pending' | 'approved' | 'rejected';
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type PageView = {
  id?: string;
  path: string;
  page_title?: string | null;
  referrer?: string | null;
  user_agent?: string | null;
  created_at?: string;
};

export type FinanceEntry = {
  id?: string;
  title: string;
  entry_type: 'revenue' | 'expense';
  amount: number;
  category?: string | null;
  entry_date: string;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type PopupSettings = {
  id?: string;
  enabled: boolean;
  delay_seconds: number;
  eyebrow?: string | null;
  title: string;
  description: string;
  primary_button_enabled: boolean;
  primary_button_label: string;
  primary_button_target_section: string;
  secondary_button_enabled: boolean;
  secondary_button_label: string;
  secondary_button_target_section: string;
  created_at?: string;
  updated_at?: string;
};
