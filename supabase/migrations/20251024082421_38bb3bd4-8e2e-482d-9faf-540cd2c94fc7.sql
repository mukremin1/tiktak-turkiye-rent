-- Add km-based pricing to cars table
ALTER TABLE public.cars 
ADD COLUMN IF NOT EXISTS price_per_km numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS km_packages jsonb DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.cars.price_per_km IS 'Price per kilometer';
COMMENT ON COLUMN public.cars.km_packages IS 'JSON object with km packages and their prices, e.g. {"50": 50, "100": 90, "200": 160, "500": 350}';