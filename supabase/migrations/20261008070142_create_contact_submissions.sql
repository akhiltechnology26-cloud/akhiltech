/*
# Create contact_submissions table (single-tenant, no auth)

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `email` (text, not null)
  - `phone` (text)
  - `company` (text)
  - `message` (text, not null)
  - `service_interest` (text)
  - `created_at` (timestamp, defaults to now)
2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated INSERT (visitors can submit contact forms without signing in).
- No SELECT/UPDATE/DELETE for anon — only inserts are public.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  service_interest text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_select_contact_submissions"
ON contact_submissions FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "anon_update_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_update_contact_submissions"
ON contact_submissions FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_delete_contact_submissions"
ON contact_submissions FOR DELETE
TO authenticated USING (true);
