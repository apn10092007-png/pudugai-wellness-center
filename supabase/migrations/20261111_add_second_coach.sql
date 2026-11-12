-- ==============================================================================
-- PUDUGAI WELLNESS CENTER (PWC) - ADD SECOND COACH PROFILE (THENMOZHI)
-- ==============================================================================
-- This migration idempotently registers Thenmozhi as the second coach profile
-- in public.coach_profile without modifying or overwriting Thangapandian S.

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
    'c0a00000-0000-0000-0000-000000000002',
    'Thenmozhi',
    'Nutrition Coach',
    'Thenmozhi is dedicated to guiding individuals and families with supportive, personalized nutrition coaching. Working closely alongside Coach Thangapandian S, she helps clients build wholesome daily nutrition habits and active lifestyle routines.',
    '/assets/avatar-thenmozhi.svg',
    '94434 43261',
    '',
    'https://maps.app.goo.gl/JAdNVeq53M3PdrW1A',
    'E Main Rd, T Nagar, Buvaneswari Nagar, Pudukkottai, Tamil Nadu 622001',
    'கிழக்கு முதன்மை சாலை, டி நகர், புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001'
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    coach_name = EXCLUDED.coach_name;
