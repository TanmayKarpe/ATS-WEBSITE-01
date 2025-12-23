-- Facility Updates & Instrument Highlights Table
-- This table stores dynamic facility updates tied to real instruments

CREATE TABLE IF NOT EXISTS public.facility_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instrument_id UUID NOT NULL REFERENCES public.instruments(id) ON DELETE CASCADE,
  update_type TEXT NOT NULL CHECK (update_type IN ('training', 'availability', 'maintenance', 'highlight')),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  detailed_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_facility_updates_active ON public.facility_updates(is_active, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_facility_updates_instrument ON public.facility_updates(instrument_id);

-- Enable RLS
ALTER TABLE public.facility_updates ENABLE ROW LEVEL SECURITY;

-- Public can read active updates
CREATE POLICY "Anyone can read active facility updates"
  ON public.facility_updates
  FOR SELECT
  USING (is_active = true);

-- Admin can manage all updates (adjust based on your admin role setup)
CREATE POLICY "Admins can manage facility updates"
  ON public.facility_updates
  FOR ALL
  USING (
    auth.role() = 'authenticated'
  );

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_facility_updates_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER facility_updates_updated_at
  BEFORE UPDATE ON public.facility_updates
  FOR EACH ROW
  EXECUTE FUNCTION update_facility_updates_timestamp();

-- Sample data (optional - for testing)
-- Insert sample facility updates for existing instruments
-- Note: Replace instrument IDs with actual UUIDs from your instruments table
