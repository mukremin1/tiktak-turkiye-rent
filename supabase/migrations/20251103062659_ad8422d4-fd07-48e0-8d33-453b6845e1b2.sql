-- Extend driver_history for scoring system
ALTER TABLE public.driver_history ADD COLUMN IF NOT EXISTS driver_score INTEGER DEFAULT 100 CHECK (driver_score >= 0 AND driver_score <= 100);
ALTER TABLE public.driver_history ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false;
ALTER TABLE public.driver_history ADD COLUMN IF NOT EXISTS blocked_reason TEXT;

-- Create vehicle_alerts table for hood open, accidents, etc.
CREATE TABLE public.vehicle_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE NOT NULL,
  alert_type TEXT NOT NULL, -- 'hood_open', 'accident', 'speeding', 'unauthorized_access'
  severity TEXT NOT NULL, -- 'low', 'medium', 'high', 'critical'
  description TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  is_resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES auth.users(id),
  metadata JSONB, -- Additional data like speed, impact force, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vehicle_alerts ENABLE ROW LEVEL SECURITY;

-- Car owners can view alerts for their cars
CREATE POLICY "Car owners can view their vehicle alerts"
ON public.vehicle_alerts
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.cars
    WHERE cars.id = vehicle_alerts.car_id
    AND cars.owner_id = auth.uid()
  )
);

-- Car owners can update their vehicle alerts
CREATE POLICY "Car owners can update their vehicle alerts"
ON public.vehicle_alerts
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.cars
    WHERE cars.id = vehicle_alerts.car_id
    AND cars.owner_id = auth.uid()
  )
);

-- System can create alerts (via service role or triggers)
CREATE POLICY "System can create vehicle alerts"
ON public.vehicle_alerts
FOR INSERT
WITH CHECK (true);

-- Add trigger for updated_at
CREATE TRIGGER update_vehicle_alerts_updated_at
BEFORE UPDATE ON public.vehicle_alerts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to check driver eligibility
CREATE OR REPLACE FUNCTION public.check_driver_eligibility(p_user_id UUID)
RETURNS TABLE (
  is_eligible BOOLEAN,
  reason TEXT,
  driver_score INTEGER
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_driver_history RECORD;
BEGIN
  -- Get driver history
  SELECT * INTO v_driver_history
  FROM public.driver_history
  WHERE user_id = p_user_id
  LIMIT 1;

  -- If no driver history, not eligible
  IF v_driver_history IS NULL THEN
    RETURN QUERY SELECT false, 'Sürücü belgesi doğrulanmamış', 0;
    RETURN;
  END IF;

  -- Check if approved
  IF NOT v_driver_history.is_approved THEN
    RETURN QUERY SELECT false, 'Sürücü belgesi onay bekliyor', v_driver_history.driver_score;
    RETURN;
  END IF;

  -- Check driver score (minimum 60 required)
  IF v_driver_history.driver_score < 60 THEN
    RETURN QUERY SELECT 
      false, 
      'Sürücü puanınız çok düşük (minimum 60 gerekli)',
      v_driver_history.driver_score;
    RETURN;
  END IF;

  -- Check penalty points (maximum 70 allowed)
  IF v_driver_history.penalty_points > 70 THEN
    RETURN QUERY SELECT 
      false,
      'Ceza puanınız çok yüksek',
      v_driver_history.driver_score;
    RETURN;
  END IF;

  -- All checks passed
  RETURN QUERY SELECT true, 'Uygun', v_driver_history.driver_score;
END;
$$;

-- Function to update driver score based on behavior
CREATE OR REPLACE FUNCTION public.update_driver_score(
  p_user_id UUID,
  p_change INTEGER,
  p_reason TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.driver_history
  SET 
    driver_score = GREATEST(0, LEAST(100, driver_score + p_change)),
    notes = COALESCE(notes, '') || E'\n' || 
            to_char(now(), 'YYYY-MM-DD HH24:MI:SS') || ': ' || 
            CASE WHEN p_change > 0 THEN '+' ELSE '' END || 
            p_change::text || ' puan - ' || p_reason,
    updated_at = now()
  WHERE user_id = p_user_id;
END;
$$;