/*
  # Admin dashboard data model

  1. New Tables
    - `testimonials`
      - public review submissions with moderation status
    - `page_views`
      - lightweight traffic tracking for public routes
    - `finance_entries`
      - admin-managed revenue and expense records

  2. Security
    - Public users can submit reviews and page views
    - Public users can only read approved testimonials
    - Authenticated users can manage admin dashboard data
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  business_name text,
  role text,
  location text,
  email text,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  review text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  page_title text,
  referrer text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS finance_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  entry_type text NOT NULL CHECK (entry_type IN ('revenue', 'expense')),
  amount numeric(12, 2) NOT NULL CHECK (amount > 0),
  category text,
  entry_date date NOT NULL DEFAULT CURRENT_DATE,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit testimonials" ON testimonials;
CREATE POLICY "Anyone can submit testimonials"
  ON testimonials
  FOR INSERT
  TO anon
  WITH CHECK (status = 'pending' AND featured = false);

DROP POLICY IF EXISTS "Anyone can read approved testimonials" ON testimonials;
CREATE POLICY "Anyone can read approved testimonials"
  ON testimonials
  FOR SELECT
  TO anon
  USING (status = 'approved');

DROP POLICY IF EXISTS "Authenticated users can manage testimonials" ON testimonials;
CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can record page views" ON page_views;
CREATE POLICY "Anyone can record page views"
  ON page_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can read page views" ON page_views;
CREATE POLICY "Authenticated users can read page views"
  ON page_views
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage finance entries" ON finance_entries;
CREATE POLICY "Authenticated users can manage finance entries"
  ON finance_entries
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can read contact submissions" ON contact_submissions;
CREATE POLICY "Authenticated users can read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_finance_entries_updated_at ON finance_entries;
CREATE TRIGGER update_finance_entries_updated_at
  BEFORE UPDATE ON finance_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
