-- Bobo V2 Growth Tracking Tables
-- Run this in Supabase Dashboard > SQL Editor

-- Growth logs table
CREATE TABLE IF NOT EXISTS public.growth_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id UUID REFERENCES public.babies(id) ON DELETE CASCADE,
  recorded_date DATE NOT NULL,
  weight_kg DECIMAL(5, 2),
  height_cm DECIMAL(5, 1),
  head_circumference_cm DECIMAL(4, 1),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.growth_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
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

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_growth_logs_baby ON public.growth_logs(baby_id);
CREATE INDEX IF NOT EXISTS idx_growth_logs_date ON public.growth_logs(recorded_date);
