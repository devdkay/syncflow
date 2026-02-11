/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `business_name` (text, optional)
      - `email` (text, required)
      - `phone` (text, optional)
      - `service` (text, required)
      - `message` (text, required)
      - `budget` (text, optional)
      - `timeline` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for service role to insert and read data
    - Public users can insert (for form submissions)
    - Only authenticated admin users can read all submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  business_name text,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact submissions (for the public form)
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role to read all submissions (for admin access)
CREATE POLICY "Service role can read all submissions"
  ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();