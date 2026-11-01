-- ==============================================================================
-- Migration: Add Home Page Hero Image support and Storage policies
-- ==============================================================================

-- 1. Ensure site-images bucket exists for website assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Update storage RLS policies to include site-images bucket
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

-- 3. Update home_hero site_content to include default hero_image_path
INSERT INTO public.site_content (section_key, content)
VALUES (
    'home_hero',
    '{
        "tagline": "Nutrition • Fitness • Wellness",
        "headline": "Real Wellness for Your Real Everyday Life",
        "subheadline": "Personal health & nutrition coaching in Pudukkottai guided by Coach Thangapandian S. Build sustainable habits that last a lifetime.",
        "hero_image_path": "/assets/hero-wellness.jpg"
    }'::jsonb
)
ON CONFLICT (section_key) DO UPDATE SET 
    content = jsonb_set(
        site_content.content, 
        '{hero_image_path}', 
        COALESCE(site_content.content->'hero_image_path', '"/assets/hero-wellness.jpg"'::jsonb)
    );
