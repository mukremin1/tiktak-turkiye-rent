-- Create vehicle photos table for dropoff/pickup documentation
CREATE TABLE IF NOT EXISTS public.vehicle_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  car_id UUID NOT NULL REFERENCES public.cars(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  photo_type TEXT NOT NULL CHECK (photo_type IN ('pickup', 'dropoff')),
  photo_url TEXT NOT NULL, -- base64 encoded image data or storage URL
  is_dark_environment BOOLEAN DEFAULT false,
  flash_used BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vehicle_photos ENABLE ROW LEVEL SECURITY;

-- Users can view photos for their bookings
CREATE POLICY "Users can view their vehicle photos"
ON public.vehicle_photos
FOR SELECT
USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.cars
    WHERE cars.id = vehicle_photos.car_id
    AND cars.owner_id = auth.uid()
  )
);

-- Users can insert photos for their bookings
CREATE POLICY "Users can insert vehicle photos"
ON public.vehicle_photos
FOR INSERT
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.bookings
    WHERE bookings.id = vehicle_photos.booking_id
    AND bookings.user_id = auth.uid()
  )
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_vehicle_photos_booking ON public.vehicle_photos(booking_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_photos_car ON public.vehicle_photos(car_id);