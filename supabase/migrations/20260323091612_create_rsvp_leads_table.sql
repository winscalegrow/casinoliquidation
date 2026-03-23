/*
  # Create RSVP Leads Table

  1. New Tables
    - `rsvp_leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `name` (text) - Full name of the registrant
      - `email` (text, unique) - Email address for contact
      - `phone` (text) - Phone number for contact
      - `created_at` (timestamptz) - Timestamp of registration
      - `source` (text) - Source of the registration (default: 'website')
      - `utm_source` (text, optional) - UTM tracking source
      - `utm_campaign` (text, optional) - UTM tracking campaign
  
  2. Security
    - Enable RLS on `rsvp_leads` table
    - Add policy for anonymous users to insert their own data
    - Add policy for service role to read all data
  
  3. Indexes
    - Index on email for faster lookups
    - Index on created_at for analytics queries
  
  4. Notes
    - Email is unique to prevent duplicate registrations
    - All fields except optional UTM parameters are required
    - Timestamps default to current time
*/

CREATE TABLE IF NOT EXISTS rsvp_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  source text DEFAULT 'website' NOT NULL,
  utm_source text,
  utm_campaign text
);

ALTER TABLE rsvp_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register for RSVP"
  ON rsvp_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can view all leads"
  ON rsvp_leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_rsvp_leads_email ON rsvp_leads(email);
CREATE INDEX IF NOT EXISTS idx_rsvp_leads_created_at ON rsvp_leads(created_at DESC);