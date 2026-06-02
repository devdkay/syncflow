import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
