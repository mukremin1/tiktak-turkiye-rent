-- Create driver history table
CREATE TABLE public.driver_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  license_number TEXT NOT NULL,
  penalty_points INTEGER NOT NULL DEFAULT 0,
  total_accidents INTEGER NOT NULL DEFAULT 0,
  traffic_violations INTEGER NOT NULL DEFAULT 0,
  last_violation_date TIMESTAMP WITH TIME ZONE,
  verification_status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.driver_history ENABLE ROW LEVEL SECURITY;

-- Users can view their own driver history
CREATE POLICY "Users can view their own driver history"
ON public.driver_history
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own driver history
CREATE POLICY "Users can insert their own driver history"
ON public.driver_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own driver history
CREATE POLICY "Users can update their own driver history"
ON public.driver_history
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_driver_history_updated_at
BEFORE UPDATE ON public.driver_history
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add driver_history_checked column to bookings
ALTER TABLE public.bookings
ADD COLUMN driver_history_checked BOOLEAN DEFAULT false,
ADD COLUMN driver_risk_level TEXT;