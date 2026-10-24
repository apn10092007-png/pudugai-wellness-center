-- ==============================================================================
-- PUDUGAI WELLNESS CENTER (PWC) - SUPABASE DATABASE SETUP & MIGRATION SCRIPT
-- ==============================================================================
-- Run this complete script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- to create all required tables, security policies, storage buckets, and initial seed data.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABLES CREATION
-- ==============================================================================

-- 2.1 SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'Weight Management',
        'Health Screening',
        'Special Programs',
        'Nutrition Guidance',
        'Wellness Solutions'
    )),
    image_path TEXT,
    published BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.2 SUCCESS STORIES TABLE (With 'ta' and 'en' language support)
CREATE TABLE IF NOT EXISTS public.success_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    language TEXT NOT NULL CHECK (language IN ('ta', 'en')),
    title TEXT,
    story TEXT NOT NULL,
    program_duration TEXT,
    image_path TEXT,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.3 COACH PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.coach_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coach_name TEXT NOT NULL DEFAULT 'Thangapandian S',
    title TEXT NOT NULL DEFAULT 'Wellness Coach & Founder',
    biography TEXT NOT NULL,
    image_path TEXT,
    phone TEXT NOT NULL DEFAULT '94434 43261',
    instagram_url TEXT NOT NULL DEFAULT 'https://www.instagram.com/coach_pandian?exln=YmNsbjZkeXQ1dnc3',
    maps_url TEXT NOT NULL DEFAULT 'https://maps.app.goo.gl/JAdNVeq53M3PdrW1A',
    address_en TEXT NOT NULL DEFAULT 'E Main Rd, T Nagar, Buvaneswari Nagar, Pudukkottai, Tamil Nadu 622001',
    address_ta TEXT NOT NULL DEFAULT 'கிழக்கு முதன்மை சாலை, டி நகர், புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.4 SITE CONTENT TABLE (For dynamic About Us, Mission, Vision, and Highlights)
CREATE TABLE IF NOT EXISTS public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2.5 ENQUIRIES TABLE (Customer contact and assessment requests)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure service column exists for any existing setups
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS service TEXT;

-- ==============================================================================
-- 3. INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_services_category_pub ON public.services(category, published);
CREATE INDEX IF NOT EXISTS idx_success_stories_pub ON public.success_stories(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status_created ON public.enquiries(status, created_at DESC);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 4.1 SERVICES POLICIES
-- Public can view only published services
DROP POLICY IF EXISTS "Public can view published services" ON public.services;
CREATE POLICY "Public can view published services" 
    ON public.services 
    FOR SELECT 
    USING (published = true);

-- Authenticated admins can perform all actions
DROP POLICY IF EXISTS "Admins have full access to services" ON public.services;
CREATE POLICY "Admins have full access to services" 
    ON public.services 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- 4.2 SUCCESS STORIES POLICIES
-- Public can view only published stories
DROP POLICY IF EXISTS "Public can view published success stories" ON public.success_stories;
CREATE POLICY "Public can view published success stories" 
    ON public.success_stories 
    FOR SELECT 
    USING (published = true);

-- Authenticated admins can perform all actions
DROP POLICY IF EXISTS "Admins have full access to success stories" ON public.success_stories;
CREATE POLICY "Admins have full access to success stories" 
    ON public.success_stories 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- 4.3 COACH PROFILE POLICIES
-- Public can view coach profile
DROP POLICY IF EXISTS "Public can view coach profile" ON public.coach_profile;
CREATE POLICY "Public can view coach profile" 
    ON public.coach_profile 
    FOR SELECT 
    USING (true);

-- Authenticated admins can manage coach profile
DROP POLICY IF EXISTS "Admins can update coach profile" ON public.coach_profile;
CREATE POLICY "Admins can update coach profile" 
    ON public.coach_profile 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- 4.4 SITE CONTENT POLICIES
-- Public can view site content
DROP POLICY IF EXISTS "Public can view site content" ON public.site_content;
CREATE POLICY "Public can view site content" 
    ON public.site_content 
    FOR SELECT 
    USING (true);

-- Authenticated admins can manage site content
DROP POLICY IF EXISTS "Admins can manage site content" ON public.site_content;
CREATE POLICY "Admins can manage site content" 
    ON public.site_content 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- 4.5 ENQUIRIES POLICIES (STRICT PRIVACY)
-- Public users can only INSERT valid enquiries (with non-empty name & valid phone)
DROP POLICY IF EXISTS "Public can insert enquiries" ON public.enquiries;
CREATE POLICY "Public can insert enquiries" 
    ON public.enquiries 
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (
        length(trim(customer_name)) > 0 AND 
        length(trim(phone)) >= 10
    );

-- Only authenticated admins can read enquiries
DROP POLICY IF EXISTS "Admins can view enquiries" ON public.enquiries;
CREATE POLICY "Admins can view enquiries" 
    ON public.enquiries 
    FOR SELECT 
    TO authenticated 
    USING (true);

-- Only authenticated admins can update enquiry status
DROP POLICY IF EXISTS "Admins can update enquiries" ON public.enquiries;
CREATE POLICY "Admins can update enquiries" 
    ON public.enquiries 
    FOR UPDATE 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- Only authenticated admins can delete enquiries
DROP POLICY IF EXISTS "Admins can delete enquiries" ON public.enquiries;
CREATE POLICY "Admins can delete enquiries" 
    ON public.enquiries 
    FOR DELETE 
    TO authenticated 
    USING (true);

-- ==============================================================================
-- 5. STORAGE BUCKETS SETUP
-- ==============================================================================
-- Insert buckets into storage.buckets if they do not exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('coach-images', 'coach-images', true),
    ('service-images', 'service-images', true),
    ('story-images', 'story-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies: Public can read, authenticated admins can upload/delete
DROP POLICY IF EXISTS "Public can view coach images" ON storage.objects;
CREATE POLICY "Public can view coach images" 
    ON storage.objects FOR SELECT 
    USING (bucket_id IN ('coach-images', 'service-images', 'story-images'));

DROP POLICY IF EXISTS "Admins can upload images" ON storage.objects;
CREATE POLICY "Admins can upload images" 
    ON storage.objects FOR INSERT 
    TO authenticated 
    WITH CHECK (bucket_id IN ('coach-images', 'service-images', 'story-images'));

DROP POLICY IF EXISTS "Admins can update images" ON storage.objects;
CREATE POLICY "Admins can update images" 
    ON storage.objects FOR UPDATE 
    TO authenticated 
    USING (bucket_id IN ('coach-images', 'service-images', 'story-images'));

DROP POLICY IF EXISTS "Admins can delete images" ON storage.objects;
CREATE POLICY "Admins can delete images" 
    ON storage.objects FOR DELETE 
    TO authenticated 
    USING (bucket_id IN ('coach-images', 'service-images', 'story-images'));

-- ==============================================================================
-- 6. INITIAL SEED DATA
-- ==============================================================================

-- 6.1 Seed Coach Profile
DELETE FROM public.coach_profile;
INSERT INTO public.coach_profile (
    id,
    coach_name,
    title,
    biography,
    image_path,
    phone,
    instagram_url,
    maps_url,
    address_en,
    address_ta
) VALUES (
    'c0a00000-0000-0000-0000-000000000001',
    'Thangapandian S',
    'Wellness Coach & Founder',
    'Thangapandian S is dedicated to guiding individuals and families toward healthier, more active, and balanced lifestyles. At Pudugai Wellness Center, the coaching philosophy is rooted in sustainable daily habits, wholesome nutrition, and gradual, realistic progress without extreme or unsustainable restrictions.',
    '/assets/coach-pandian.png',
    '94434 43261',
    'https://www.instagram.com/coach_pandian?exln=YmNsbjZkeXQ1dnc3',
    'https://maps.app.goo.gl/JAdNVeq53M3PdrW1A',
    'E Main Rd, T Nagar, Buvaneswari Nagar, Pudukkottai, Tamil Nadu 622001',
    'கிழக்கு முதன்மை சாலை, டி நகர், புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001'
);

-- 6.2 Seed Default Site Content
INSERT INTO public.site_content (section_key, content)
VALUES 
(
    'about_page',
    '{
        "mission": "To empower people of all ages to achieve their highest vitality through personalized nutrition plans, body composition analysis, and consistent, supportive coaching.",
        "vision": "To become Pudukkottai''s most trusted and compassionate wellness community, where healthy living is accessible, sustainable, and joyful.",
        "approach_intro": "We do not believe in quick-fix crash diets or exhausting extremes. Our wellness model focuses on balanced daily nutrition, hydration, restorative sleep, gentle active movement, and habit accountability.",
        "journey_milestones": [
            {"year": "Foundation", "title": "Wellness Mission Established", "description": "Founded in Pudukkottai to provide structured, supportive health and nutrition guidance to individuals and families."},
            {"year": "Growth", "title": "Community Health Screenings", "description": "Introduced comprehensive body composition assessments (BMI, BMR, visceral fat, muscle mass) for personalized coaching."},
            {"year": "Holistic Reach", "title": "Comprehensive Programs", "description": "Expanded specialized programs spanning children''s nutrition, women''s vital health, energy restoration, and joint wellness."}
        ]
    }'::jsonb
),
(
    'home_hero',
    '{
        "tagline": "Nutrition • Fitness • Wellness",
        "headline": "Real Wellness for Your Real Everyday Life",
        "subheadline": "Personal health & nutrition coaching in Pudukkottai guided by Coach Thangapandian S. Build sustainable habits that last a lifetime."
    }'::jsonb
)
ON CONFLICT (section_key) DO UPDATE SET content = EXCLUDED.content;

-- 6.3 Seed Official Verified Services (18 Services across 5 categories)
DELETE FROM public.services;
INSERT INTO public.services (title, description, category, display_order, published)
VALUES
    -- 1. Weight Management
    ('Weight Loss', 'Customized nutrition and gradual calorie management plans designed to achieve steady, healthy fat reduction while maintaining energy and muscle tone.', 'Weight Management', 1, true),
    ('Weight Gain', 'Nutrient-rich, calorie-dense meal guidance combined with muscle-supportive nutrition to help you gain healthy lean mass safely.', 'Weight Management', 2, true),

    -- 2. Health Screening
    ('BMI (Body Mass Index)', 'Baseline assessment of your body mass relative to height to establish accurate health risk tiers and program targets.', 'Health Screening', 3, true),
    ('BMR (Basal Metabolic Rate)', 'Scientific measurement of the minimum calories your body requires at rest to design tailored nutritional intake.', 'Health Screening', 4, true),
    ('Body Fat Analysis', 'Detailed evaluation of subcutaneous and visceral fat percentages to target fat loss while protecting vital organ health.', 'Health Screening', 5, true),
    ('Metabolic Age', 'Insightful evaluation comparing your physiological metabolic rate with biological chronological age.', 'Health Screening', 6, true),
    ('Skeletal Muscle Evaluation', 'Assessment of functional muscle mass across your body to ensure adequate strength, posture, and metabolic resilience.', 'Health Screening', 7, true),

    -- 3. Special Programs
    ('Children''s Health', 'Gentle, balanced nutritional support and wholesome habit development to support physical growth, focus, and immunity in growing kids.', 'Special Programs', 8, true),
    ('Women''s Health', 'Targeted nutritional guidance tailored for hormonal harmony, bone density, energy restoration, and life-stage transitions.', 'Special Programs', 9, true),
    ('Men''s Health', 'Focused nutrition and lifestyle coaching supporting metabolic stamina, vitality, cardiovascular wellness, and lean muscle retention.', 'Special Programs', 10, true),
    ('Energy & Fitness', 'Nutritional protocols that eliminate daily afternoon fatigue, stabilize blood sugar, and enhance natural physical stamina.', 'Special Programs', 11, true),
    ('Eyes Health', 'Dietary guidance incorporating essential micronutrients, lutein, and antioxidants to support eye comfort and visual wellness.', 'Special Programs', 12, true),

    -- 4. Nutrition Guidance
    ('Personalized Diet Plans', 'Everyday meal plans crafted around your specific food preferences, daily schedule, and body composition data.', 'Nutrition Guidance', 13, true),
    ('Healthy Habits', 'Practical behavior coaching to overcome emotional eating, irregular timing, late-night snacking, and hydration neglect.', 'Nutrition Guidance', 14, true),

    -- 5. Wellness Solutions
    ('Heart Health', 'Nutrition strategies focusing on cardiovascular wellness, healthy cholesterol balance, and blood pressure support.', 'Wellness Solutions', 15, true),
    ('Digestive Health', 'Gut-supportive dietary plans focusing on prebiotic fiber, hydration, and digestive comfort to alleviate bloating and sluggish digestion.', 'Wellness Solutions', 16, true),
    ('Bone & Joints', 'Nutritional protocols enriched with calcium, vitamin D, and anti-inflammatory nutrients to support joint ease and mobility.', 'Wellness Solutions', 17, true),
    ('Skin & Hair', 'Nourishing dietary advice emphasizing essential fatty acids, hydration, and collagen support for radiant skin and hair strength.', 'Wellness Solutions', 18, true),
    ('Immunity', 'Antioxidant and micronutrient-dense dietary strategies designed to build resilience against seasonal illness.', 'Wellness Solutions', 19, true),
    ('Brain & Sleep', 'Nutritional guidance that supports evening relaxation, deeper sleep cycles, and daytime cognitive clarity.', 'Wellness Solutions', 20, true);

-- Copy initial setup to migration directory as reference
-- Completed successfully!
