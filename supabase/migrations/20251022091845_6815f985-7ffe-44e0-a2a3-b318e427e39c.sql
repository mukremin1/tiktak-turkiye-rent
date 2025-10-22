-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create enum for car types
CREATE TYPE public.car_type AS ENUM ('compact', 'sedan', 'suv');

-- Create enum for fuel types
CREATE TYPE public.fuel_type AS ENUM ('Benzin', 'Dizel', 'Elektrik', 'Hibrit');

-- Create enum for transmission types
CREATE TYPE public.transmission_type AS ENUM ('Manuel', 'Otomatik');

-- Create cars table
CREATE TABLE public.cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type car_type NOT NULL,
  price_per_minute DECIMAL(10,2) NOT NULL,
  price_per_hour DECIMAL(10,2) NOT NULL,
  price_per_day DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  fuel_type fuel_type NOT NULL,
  transmission transmission_type NOT NULL,
  seats INTEGER NOT NULL CHECK (seats > 0 AND seats <= 9),
  available BOOLEAN DEFAULT true,
  location TEXT NOT NULL,
  city TEXT DEFAULT 'Trabzon',
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  plate_number TEXT,
  year INTEGER,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on cars
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Cars policies - Everyone can view available cars
CREATE POLICY "Anyone can view available cars"
  ON public.cars FOR SELECT
  USING (available = true OR auth.uid() = owner_id);

-- Car owners can update their own cars
CREATE POLICY "Owners can update their own cars"
  ON public.cars FOR UPDATE
  USING (auth.uid() = owner_id);

-- Car owners can delete their own cars
CREATE POLICY "Owners can delete their own cars"
  ON public.cars FOR DELETE
  USING (auth.uid() = owner_id);

-- Authenticated users can insert cars
CREATE POLICY "Authenticated users can insert cars"
  ON public.cars FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for cars updated_at
CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON public.cars
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_cars_owner_id ON public.cars(owner_id);
CREATE INDEX idx_cars_city ON public.cars(city);
CREATE INDEX idx_cars_available ON public.cars(available);
CREATE INDEX idx_cars_type ON public.cars(type);