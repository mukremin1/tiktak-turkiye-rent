-- Add lock status to cars table
ALTER TABLE cars ADD COLUMN IF NOT EXISTS lock_status TEXT DEFAULT 'locked' CHECK (lock_status IN ('locked', 'unlocked'));

-- Create vehicle actions log table
CREATE TABLE IF NOT EXISTS vehicle_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('lock', 'unlock', 'location_check')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  latitude NUMERIC,
  longitude NUMERIC,
  notes TEXT
);

-- Enable RLS on vehicle_actions
ALTER TABLE vehicle_actions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vehicle_actions
CREATE POLICY "Users can view actions for cars they own"
  ON vehicle_actions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cars 
      WHERE cars.id = vehicle_actions.car_id 
      AND cars.owner_id = auth.uid()
    )
    OR user_id = auth.uid()
  );

CREATE POLICY "Users can insert actions for available cars"
  ON vehicle_actions
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM cars 
      WHERE cars.id = vehicle_actions.car_id 
      AND cars.available = true
    )
  );

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_vehicle_actions_car_id ON vehicle_actions(car_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_actions_timestamp ON vehicle_actions(timestamp DESC);