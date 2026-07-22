-- ============================================================
-- PRODUCT MEDIA STORAGE
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  TRUE,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Future-ready bucket for 3D models (GLB/GLTF)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-models',
  'product-models',
  TRUE,
  52428800, -- 50 MB
  ARRAY['model/gltf-binary', 'model/gltf+json', 'application/octet-stream']
)
ON CONFLICT (id) DO NOTHING;

-- product-images policies
CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "Admins can update product images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images' AND public.is_admin());

CREATE POLICY "Admins can delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND public.is_admin());

-- product-models policies (for upcoming 3D uploads)
CREATE POLICY "Public can view product models"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-models');

CREATE POLICY "Admins can upload product models"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-models' AND public.is_admin());

CREATE POLICY "Admins can update product models"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-models' AND public.is_admin());

CREATE POLICY "Admins can delete product models"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-models' AND public.is_admin());
