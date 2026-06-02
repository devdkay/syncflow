import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ActivityTracker() {
  const location = useLocation();

  useEffect(() => {
    const hasSupabase = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!hasSupabase || location.pathname.startsWith('/admin')) {
      return;
    }

    supabase
      .from('page_views')
      .insert({
        path: `${location.pathname}${location.search}`,
        page_title: document.title,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      })
      .then(({ error }) => {
        if (error) {
          console.warn('Unable to record page view:', error.message);
        }
      });
  }, [location.pathname, location.search]);

  return null;
}
