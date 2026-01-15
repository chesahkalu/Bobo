-- Create storage bucket for baby photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('baby-photos', 'baby-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload baby photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'baby-photos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to view any baby photos (public bucket)
CREATE POLICY "Public can view baby photos"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'baby-photos');

-- Allow users to update their own baby photos
CREATE POLICY "Users can update own baby photos"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'baby-photos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own baby photos
CREATE POLICY "Users can delete own baby photos"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'baby-photos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
