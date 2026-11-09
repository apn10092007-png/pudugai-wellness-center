-- ==============================================================================
-- Migration: Upgrade Hero Carousel to Media Slideshow (Images + Videos)
-- ==============================================================================

-- 1. Ensure 'site-images' bucket exists and is public (used for images and videos)
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('site-images', 'site-images', true, 62914560) -- 60MB limit
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 62914560;

-- 2. Update storage RLS policies to ensure public read and authenticated admin management
DROP POLICY IF EXISTS "Public can view coach images" ON storage.objects;
CREATE POLICY "Public can view coach images" 
    ON storage.objects FOR SELECT 
    USING (bucket_id IN ('coach-images', 'service-images', 'story-images', 'site-images'));

DROP POLICY IF EXISTS "Admins can upload images" ON storage.objects;
CREATE POLICY "Admins can upload images" 
    ON storage.objects FOR INSERT 
    TO authenticated 
    WITH CHECK (bucket_id IN ('coach-images', 'service-images', 'story-images', 'site-images'));

DROP POLICY IF EXISTS "Admins can update images" ON storage.objects;
CREATE POLICY "Admins can update images" 
    ON storage.objects FOR UPDATE 
    TO authenticated 
    USING (bucket_id IN ('coach-images', 'service-images', 'story-images', 'site-images'));

DROP POLICY IF EXISTS "Admins can delete images" ON storage.objects;
CREATE POLICY "Admins can delete images" 
    ON storage.objects FOR DELETE 
    TO authenticated 
    USING (bucket_id IN ('coach-images', 'service-images', 'story-images', 'site-images'));

-- 3. Document JSONB structure for site_content 'home_hero' gallery items:
-- Each gallery item supports:
--   {
--     "id": "gallery-...",
--     "media_type": "image" | "video",
--     "media_url": "https://... or /assets/...",
--     "image_path": "https://... or /assets/...", (legacy compatibility)
--     "video_path": "https://..." (if video),
--     "title": "Optional Title",
--     "description": "Optional Caption",
--     "display_order": 1,
--     "active": true
--   }
