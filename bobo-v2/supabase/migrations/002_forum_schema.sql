-- Bobo V2 Community Forum Tables
-- Run this in Supabase Dashboard > SQL Editor

-- Forum categories
CREATE TABLE IF NOT EXISTS public.forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum threads
CREATE TABLE IF NOT EXISTS public.forum_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum posts (replies)
CREATE TABLE IF NOT EXISTS public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_helpful BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum likes
CREATE TABLE IF NOT EXISTS public.forum_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  thread_id UUID REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, thread_id),
  UNIQUE(user_id, post_id)
);

-- Enable RLS
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Read access for authenticated users
CREATE POLICY "Authenticated users can view categories" ON public.forum_categories
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view threads" ON public.forum_threads
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view posts" ON public.forum_posts
  FOR SELECT TO authenticated USING (true);

-- RLS Policies - Write access
CREATE POLICY "Users can create threads" ON public.forum_threads
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own threads" ON public.forum_threads
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can create posts" ON public.forum_posts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON public.forum_posts
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own likes" ON public.forum_likes
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_forum_threads_category ON public.forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_user ON public.forum_threads(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_thread ON public.forum_posts(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_user ON public.forum_posts(user_id);

-- Insert default categories
INSERT INTO public.forum_categories (name, description, icon, color, sort_order) VALUES
  ('Sleep & Naps', 'Discuss sleep training, nap schedules, and bedtime routines', '🌙', 'blue', 1),
  ('Feeding & Nutrition', 'Breastfeeding, formula, solids, and picky eaters', '🍼', 'green', 2),
  ('Development & Milestones', 'Motor skills, speech, cognitive development', '🎯', 'purple', 3),
  ('Health & Wellness', 'Illness, vaccines, pediatrician tips', '💊', 'red', 4),
  ('New Parents', 'First-time parent advice and support', '👶', 'pink', 5),
  ('Work-Life Balance', 'Returning to work, childcare, parenting burnout', '⚖️', 'amber', 6),
  ('Products & Gear', 'Reviews, recommendations, what worked for you', '🛒', 'indigo', 7),
  ('Success Stories', 'Share your wins and celebrate milestones', '🎉', 'emerald', 8)
ON CONFLICT DO NOTHING;
