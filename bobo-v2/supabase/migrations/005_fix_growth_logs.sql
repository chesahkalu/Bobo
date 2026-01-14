-- Fix growth_logs table - add missing columns if needed
-- Run this in Supabase Dashboard > SQL Editor

-- Add recorded_date column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'growth_logs' AND column_name = 'recorded_date') THEN
        ALTER TABLE public.growth_logs ADD COLUMN recorded_date DATE NOT NULL DEFAULT CURRENT_DATE;
    END IF;
END $$;

-- Add weight_kg column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'growth_logs' AND column_name = 'weight_kg') THEN
        ALTER TABLE public.growth_logs ADD COLUMN weight_kg DECIMAL(5, 2);
    END IF;
END $$;

-- Add height_cm column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'growth_logs' AND column_name = 'height_cm') THEN
        ALTER TABLE public.growth_logs ADD COLUMN height_cm DECIMAL(5, 1);
    END IF;
END $$;

-- Add head_circumference_cm column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'growth_logs' AND column_name = 'head_circumference_cm') THEN
        ALTER TABLE public.growth_logs ADD COLUMN head_circumference_cm DECIMAL(4, 1);
    END IF;
END $$;

-- Add notes column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'growth_logs' AND column_name = 'notes') THEN
        ALTER TABLE public.growth_logs ADD COLUMN notes TEXT;
    END IF;
END $$;

-- Now create indexes (will skip if they exist)
CREATE INDEX IF NOT EXISTS idx_growth_logs_baby ON public.growth_logs(baby_id);
CREATE INDEX IF NOT EXISTS idx_growth_logs_date ON public.growth_logs(recorded_date);

-- Make sure RLS is enabled
ALTER TABLE public.growth_logs ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies to ensure they're correct
DROP POLICY IF EXISTS "Users can view growth logs for their babies" ON public.growth_logs;
DROP POLICY IF EXISTS "Users can insert growth logs for their babies" ON public.growth_logs;
DROP POLICY IF EXISTS "Users can update growth logs for their babies" ON public.growth_logs;
DROP POLICY IF EXISTS "Users can delete growth logs for their babies" ON public.growth_logs;

CREATE POLICY "Users can view growth logs for their babies" ON public.growth_logs
  FOR SELECT TO authenticated
  USING (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert growth logs for their babies" ON public.growth_logs
  FOR INSERT TO authenticated
  WITH CHECK (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()));

CREATE POLICY "Users can update growth logs for their babies" ON public.growth_logs
  FOR UPDATE TO authenticated
  USING (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete growth logs for their babies" ON public.growth_logs
  FOR DELETE TO authenticated
  USING (baby_id IN (SELECT id FROM public.babies WHERE user_id = auth.uid()));
