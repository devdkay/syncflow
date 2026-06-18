/*
  # Popup offer settings

  1. New Tables
    - `popup_settings`
      - one editable settings row for the public homepage offer popup

  2. Security
    - Public users can read active popup settings
    - Authenticated admins can manage the popup settings
*/

CREATE TABLE IF NOT EXISTS popup_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enabled boolean NOT NULL DEFAULT true,
  delay_seconds integer NOT NULL DEFAULT 3 CHECK (delay_seconds >= 0 AND delay_seconds <= 30),
  eyebrow text DEFAULT 'Limited Offer',
  title text NOT NULL DEFAULT 'Get One Week Free Trial',
  description text NOT NULL DEFAULT 'Get your website and use it for one week. If you like it, then pay - you surely will.',
  primary_button_enabled boolean NOT NULL DEFAULT true,
  primary_button_label text NOT NULL DEFAULT 'Get Free Trial',
  primary_button_target_section text NOT NULL DEFAULT 'contact',
  secondary_button_enabled boolean NOT NULL DEFAULT true,
  secondary_button_label text NOT NULL DEFAULT 'View Packages',
  secondary_button_target_section text NOT NULL DEFAULT 'pricing',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE popup_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read enabled popup settings" ON popup_settings;
CREATE POLICY "Anyone can read enabled popup settings"
  ON popup_settings
  FOR SELECT
  TO anon
  USING (enabled = true);

DROP POLICY IF EXISTS "Authenticated users can manage popup settings" ON popup_settings;
CREATE POLICY "Authenticated users can manage popup settings"
  ON popup_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO popup_settings (
  enabled,
  delay_seconds,
  eyebrow,
  title,
  description,
  primary_button_enabled,
  primary_button_label,
  primary_button_target_section,
  secondary_button_enabled,
  secondary_button_label,
  secondary_button_target_section
)
SELECT
  true,
  3,
  'Limited Offer',
  'Get One Week Free Trial',
  'Get your website and use it for one week. If you like it, then pay - you surely will.',
  true,
  'Get Free Trial',
  'contact',
  true,
  'View Packages',
  'pricing'
WHERE NOT EXISTS (SELECT 1 FROM popup_settings);

DROP TRIGGER IF EXISTS update_popup_settings_updated_at ON popup_settings;
CREATE TRIGGER update_popup_settings_updated_at
  BEFORE UPDATE ON popup_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
