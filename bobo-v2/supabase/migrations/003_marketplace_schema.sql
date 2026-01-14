-- Bobo V2 Marketplace Tables
-- Run this in Supabase Dashboard > SQL Editor

-- Marketplace listings
CREATE TABLE IF NOT EXISTS public.marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2),
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sell', 'swap', 'free')),
  category TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('new', 'like_new', 'good', 'fair')),
  images TEXT[] DEFAULT '{}',
  location TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marketplace messages
CREATE TABLE IF NOT EXISTS public.marketplace_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES public.marketplace_listings(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved/Favorited listings
CREATE TABLE IF NOT EXISTS public.marketplace_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES public.marketplace_listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- Enable RLS
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for listings
CREATE POLICY "Anyone can view active listings" ON public.marketplace_listings
  FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "Users can create listings" ON public.marketplace_listings
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings" ON public.marketplace_listings
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own listings" ON public.marketplace_listings
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for messages
CREATE POLICY "Users can view own messages" ON public.marketplace_messages
  FOR SELECT TO authenticated USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON public.marketplace_messages
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);

-- RLS Policies for favorites
CREATE POLICY "Users can manage own favorites" ON public.marketplace_favorites
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_listings_user ON public.marketplace_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_listings_category ON public.marketplace_listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_active ON public.marketplace_listings(is_active);
CREATE INDEX IF NOT EXISTS idx_messages_listing ON public.marketplace_messages(listing_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.marketplace_messages(receiver_id);
