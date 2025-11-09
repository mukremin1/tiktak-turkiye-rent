-- Create service zones table
CREATE TABLE IF NOT EXISTS public.service_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Trabzon',
  description TEXT,
  boundaries JSONB NOT NULL, -- GeoJSON polygon coordinates
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for service_zones
ALTER TABLE public.service_zones ENABLE ROW LEVEL SECURITY;

-- Anyone can view active service zones
CREATE POLICY "Anyone can view active service zones"
ON public.service_zones
FOR SELECT
USING (is_active = true);

-- Add pickup and dropoff columns to bookings
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS pickup_zone_id UUID REFERENCES public.service_zones(id),
ADD COLUMN IF NOT EXISTS dropoff_zone_id UUID REFERENCES public.service_zones(id),
ADD COLUMN IF NOT EXISTS pickup_address TEXT,
ADD COLUMN IF NOT EXISTS dropoff_address TEXT,
ADD COLUMN IF NOT EXISTS different_zone_fee NUMERIC DEFAULT 0;

-- Insert default service zones for Trabzon
INSERT INTO public.service_zones (name, city, description, boundaries) VALUES
('Merkez', 'Trabzon', 'Trabzon Merkez - Meydan, Kalkınma, Çömlekçi', 
 '{"type":"Polygon","coordinates":[[[39.7150,41.0050],[39.7350,41.0050],[39.7350,40.9950],[39.7150,40.9950],[39.7150,41.0050]]]}'::jsonb),
('Akçaabat', 'Trabzon', 'Akçaabat ilçesi ve çevresi',
 '{"type":"Polygon","coordinates":[[[39.5700,41.0250],[39.6000,41.0250],[39.6000,41.0050],[39.5700,41.0050],[39.5700,41.0250]]]}'::jsonb),
('Yomra', 'Trabzon', 'Yomra ilçesi ve Arsin yolu',
 '{"type":"Polygon","coordinates":[[[39.8200,40.9500],[39.8500,40.9500],[39.8500,40.9300],[39.8200,40.9300],[39.8200,40.9500]]]}'::jsonb),
('Ortahisar', 'Trabzon', 'Ortahisar - KTÜ kampüsü çevresi',
 '{"type":"Polygon","coordinates":[[[39.7600,40.9900],[39.7900,40.9900],[39.7900,40.9700],[39.7600,40.9700],[39.7600,40.9900]]]}'::jsonb)
ON CONFLICT DO NOTHING;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_zones ON public.bookings(pickup_zone_id, dropoff_zone_id);
CREATE INDEX IF NOT EXISTS idx_service_zones_city ON public.service_zones(city, is_active);