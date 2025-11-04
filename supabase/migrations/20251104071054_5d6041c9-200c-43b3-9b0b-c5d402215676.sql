-- Add GPS tracking columns to cars table
ALTER TABLE public.cars 
ADD COLUMN IF NOT EXISTS gps_device_id TEXT,
ADD COLUMN IF NOT EXISTS last_gps_update TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS speed NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS heading NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS battery_level INTEGER DEFAULT 100;

-- Create GPS location history table for tracking movement over time
CREATE TABLE IF NOT EXISTS public.gps_location_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  speed NUMERIC DEFAULT 0,
  heading NUMERIC DEFAULT 0,
  accuracy NUMERIC,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on GPS history table
ALTER TABLE public.gps_location_history ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Car owners can view their car's GPS history
CREATE POLICY "Car owners can view their GPS history"
  ON public.gps_location_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.cars
      WHERE cars.id = gps_location_history.car_id
      AND cars.owner_id = auth.uid()
    )
  );

-- RLS Policy: System can insert GPS data
CREATE POLICY "System can insert GPS data"
  ON public.gps_location_history FOR INSERT
  WITH CHECK (true);

-- Create index for faster GPS queries
CREATE INDEX IF NOT EXISTS idx_gps_history_car_timestamp 
  ON public.gps_location_history(car_id, timestamp DESC);

-- Enable realtime for GPS tracking
ALTER TABLE public.cars REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cars;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gps_location_history;