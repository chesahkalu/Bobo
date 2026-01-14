-- Bobo V2 Database Schema
-- Run this in Supabase Dashboard > SQL Editor

-- Users profile (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Baby profiles
CREATE TABLE IF NOT EXISTS public.babies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  photo_url TEXT,
  weight_at_birth DECIMAL(4,2),
  height_at_birth DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Caregivers (multi-user support)
CREATE TABLE IF NOT EXISTS public.caregivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id UUID REFERENCES public.babies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'caregiver',
  permissions JSONB DEFAULT '{"read": true, "write": true}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(baby_id, user_id)
);

-- Sleep logs
CREATE TABLE IF NOT EXISTS public.sleep_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id UUID REFERENCES public.babies(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  quality TEXT CHECK (quality IN ('poor', 'fair', 'good', 'excellent')),
  location TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feeding logs
CREATE TABLE IF NOT EXISTS public.feeding_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id UUID REFERENCES public.babies(id) ON DELETE CASCADE,
  feeding_type TEXT NOT NULL CHECK (feeding_type IN ('breast', 'bottle', 'solid', 'formula')),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration_minutes INTEGER,
  amount_ml INTEGER,
  breast_side TEXT CHECK (breast_side IN ('left', 'right', 'both')),
  food_description TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Diaper logs
CREATE TABLE IF NOT EXISTS public.diaper_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id UUID REFERENCES public.babies(id) ON DELETE CASCADE,
  diaper_type TEXT NOT NULL CHECK (diaper_type IN ('wet', 'dirty', 'both', 'dry')),
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Growth measurements
CREATE TABLE IF NOT EXISTS public.growth_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id UUID REFERENCES public.babies(id) ON DELETE CASCADE,
  measurement_date DATE NOT NULL,
  weight_kg DECIMAL(4,2),
  height_cm DECIMAL(5,2),
  head_circumference_cm DECIMAL(4,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Milestones reference
CREATE TABLE IF NOT EXISTS public.milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  age_range_start_months INTEGER,
  age_range_end_months INTEGER,
  tips TEXT[]
);

-- Baby milestones (tracking)
CREATE TABLE IF NOT EXISTS public.baby_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id UUID REFERENCES public.babies(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES public.milestones(id),
  achieved_date DATE,
  notes TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(baby_id, milestone_id)
);

-- Waitlist signups
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.babies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feeding_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diaper_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.baby_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for babies
CREATE POLICY "Users can view own babies" ON public.babies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create babies" ON public.babies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own babies" ON public.babies
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own babies" ON public.babies
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for tracking logs (via baby ownership)
CREATE POLICY "Users can manage own baby's sleep logs" ON public.sleep_logs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.babies WHERE babies.id = sleep_logs.baby_id AND babies.user_id = auth.uid())
  );

CREATE POLICY "Users can manage own baby's feeding logs" ON public.feeding_logs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.babies WHERE babies.id = feeding_logs.baby_id AND babies.user_id = auth.uid())
  );

CREATE POLICY "Users can manage own baby's diaper logs" ON public.diaper_logs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.babies WHERE babies.id = diaper_logs.baby_id AND babies.user_id = auth.uid())
  );

CREATE POLICY "Users can manage own baby's growth logs" ON public.growth_logs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.babies WHERE babies.id = growth_logs.baby_id AND babies.user_id = auth.uid())
  );

-- Allow anyone to join waitlist
CREATE POLICY "Anyone can join waitlist" ON public.waitlist
  FOR INSERT WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_babies_user_id ON public.babies(user_id);
CREATE INDEX IF NOT EXISTS idx_sleep_logs_baby_id ON public.sleep_logs(baby_id);
CREATE INDEX IF NOT EXISTS idx_feeding_logs_baby_id ON public.feeding_logs(baby_id);
CREATE INDEX IF NOT EXISTS idx_diaper_logs_baby_id ON public.diaper_logs(baby_id);
CREATE INDEX IF NOT EXISTS idx_growth_logs_baby_id ON public.growth_logs(baby_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
