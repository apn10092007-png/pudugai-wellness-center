import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';

// Verified Initial Seed Services matching client requirements
export const INITIAL_SERVICES = [
  // 1. Weight Management
  {
    id: 's-wm-1',
    title: 'Weight Loss',
    description: 'Personal food plans to help you lose fat steadily, keep your energy high, and protect your muscle strength.',
    category: 'Weight Management',
    image_path: '/assets/about-wellness.jpg',
    published: true,
    display_order: 1
  },
  {
    id: 's-wm-2',
    title: 'Weight Gain',
    description: 'Healthy, high-nutrient meal plans to help you gain good weight and build lean muscle safely.',
    category: 'Weight Management',
    image_path: null,
    published: true,
    display_order: 2
  },

  // 2. Health Screening
  {
    id: 's-hs-1',
    title: 'BMI (Body Mass Index)',
    description: 'A simple check comparing your weight and height to find your healthy weight range.',
    category: 'Health Screening',
    image_path: null,
    published: true,
    display_order: 3
  },
  {
    id: 's-hs-2',
    title: 'BMR (Basal Metabolic Rate)',
    description: 'A check of the calories your body burns at rest, helping us design the right food plan for you.',
    category: 'Health Screening',
    image_path: null,
    published: true,
    display_order: 4
  },
  {
    id: 's-hs-3',
    title: 'Body Fat Analysis',
    description: 'A check of your body fat percentage to help you reduce extra fat safely.',
    category: 'Health Screening',
    image_path: null,
    published: true,
    display_order: 5
  },
  {
    id: 's-hs-4',
    title: 'Metabolic Age',
    description: "A check that compares your body's fitness age with your actual age.",
    category: 'Health Screening',
    image_path: null,
    published: true,
    display_order: 6
  },
  {
    id: 's-hs-5',
    title: 'Skeletal Muscle Evaluation',
    description: 'A check of your muscle strength to make sure your body stays strong and active.',
    category: 'Health Screening',
    image_path: null,
    published: true,
    display_order: 7
  },

  // 3. Special Programs
  {
    id: 's-sp-1',
    title: "Children's Health",
    description: 'Simple nutrition and healthy eating habits to help kids grow strong, stay active, and build good immunity.',
    category: 'Special Programs',
    image_path: null,
    published: true,
    display_order: 8
  },
  {
    id: 's-sp-2',
    title: "Women's Health",
    description: 'Food and wellness guidance for women to boost daily energy, strengthen bones, and support overall health.',
    category: 'Special Programs',
    image_path: null,
    published: true,
    display_order: 9
  },
  {
    id: 's-sp-3',
    title: "Men's Health",
    description: 'Food and fitness coaching for men to increase stamina, stay active, and keep muscles strong.',
    category: 'Special Programs',
    image_path: null,
    published: true,
    display_order: 10
  },
  {
    id: 's-sp-4',
    title: 'Energy & Fitness',
    description: 'Daily food tips to avoid tiredness, keep your blood sugar steady, and stay energetic all day.',
    category: 'Special Programs',
    image_path: null,
    published: true,
    display_order: 11
  },
  {
    id: 's-sp-5',
    title: 'Eyes Health',
    description: 'Healthy food choices rich in vitamins and nutrients to care for your eye health.',
    category: 'Special Programs',
    image_path: null,
    published: true,
    display_order: 12
  },

  // 4. Nutrition Guidance
  {
    id: 's-ng-1',
    title: 'Personalized Diet Plans',
    description: 'Custom daily meal plans made around your favorite foods, work schedule, and body checkup results.',
    category: 'Nutrition Guidance',
    image_path: null,
    published: true,
    display_order: 13
  },
  {
    id: 's-ng-2',
    title: 'Healthy Habits',
    description: 'Step-by-step coaching to stop late-night snacking, drink enough water, and eat meals on time.',
    category: 'Nutrition Guidance',
    image_path: null,
    published: true,
    display_order: 14
  },

  // 5. Wellness Solutions
  {
    id: 's-ws-1',
    title: 'Heart Health',
    description: 'Heart-friendly food plans to support healthy cholesterol, steady blood pressure, and overall fitness.',
    category: 'Wellness Solutions',
    image_path: null,
    published: true,
    display_order: 15
  },
  {
    id: 's-ws-2',
    title: 'Digestive Health',
    description: 'Diet advice with fiber and good hydration to ease stomach bloating and support smooth digestion.',
    category: 'Wellness Solutions',
    image_path: null,
    published: true,
    display_order: 16
  },
  {
    id: 's-ws-3',
    title: 'Bone & Joints',
    description: 'Nutrient-rich food plans with calcium and vitamin D to keep your bones strong and joints comfortable.',
    category: 'Wellness Solutions',
    image_path: null,
    published: true,
    display_order: 17
  },
  {
    id: 's-ws-4',
    title: 'Skin & Hair',
    description: 'Healthy foods and hydration tips to nourish your skin and keep your hair strong.',
    category: 'Wellness Solutions',
    image_path: null,
    published: true,
    display_order: 18
  },
  {
    id: 's-ws-5',
    title: 'Immunity',
    description: "Nutrient-packed foods with vitamins to strengthen your body's natural defense against sickness.",
    category: 'Wellness Solutions',
    image_path: null,
    published: true,
    display_order: 19
  },
  {
    id: 's-ws-6',
    title: 'Brain & Sleep',
    description: 'Food and evening routine tips to help you sleep deeply and stay clear-headed throughout the day.',
    category: 'Wellness Solutions',
    image_path: null,
    published: true,
    display_order: 20
  }
];

export const INITIAL_COACH = {
  id: 'c0a00000-0000-0000-0000-000000000001',
  coach_name: 'Thangapandian S',
  title: 'Wellness Coach & Founder',
  biography: 'Thangapandian S helps individuals and families build healthier, more active lifestyles. At Pudugai Wellness Center, he focuses on good daily food, simple habits, and steady progress without strict diets or extreme routines.',
  image_path: '/assets/coach-pandian.png',
  phone: '94434 43261',
  instagram_url: 'https://www.instagram.com/coach_pandian?exln=YmNsbjZkeXQ1dnc3',
  maps_url: 'https://maps.app.goo.gl/JAdNVeq53M3PdrW1A',
  address_en: 'E Main Rd, T Nagar, Buvaneswari Nagar, Pudukkottai, Tamil Nadu 622001',
  address_ta: 'கிழக்கு முதன்மை சாலை, டி நகர், புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001'
};

export const INITIAL_COACHES = [
  INITIAL_COACH,
  {
    id: 'c0a00000-0000-0000-0000-000000000002',
    coach_name: 'Thenmozhi',
    title: 'Nutrition Coach',
    biography: 'Thenmozhi provides friendly, personal nutrition coaching for individuals and families. Working closely with Coach Thangapandian S, she helps clients build healthy daily food habits and active routines.',
    image_path: '/assets/avatar-thenmozhi.svg',
    phone: '94434 43261',
    instagram_url: '',
    maps_url: 'https://maps.app.goo.gl/JAdNVeq53M3PdrW1A',
    address_en: 'E Main Rd, T Nagar, Buvaneswari Nagar, Pudukkottai, Tamil Nadu 622001',
    address_ta: 'கிழக்கு முதன்மை சாலை, டி நகர், புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001'
  }
];

export const INITIAL_SITE_CONTENT = {
  mission: 'To help people and families live healthier, more active lives through simple food plans, body checkups, and friendly coaching.',
  vision: "To be Pudukkottai's most trusted and welcoming wellness center, where healthy living is simple, sustainable, and enjoyable.",
  approach_intro: 'We do not believe in strict diets or tiring workouts. We focus on good everyday food, plenty of water, proper sleep, light activity, and steady support.',
  journey_milestones: [
    {
      year: 'Foundation',
      title: 'Wellness Mission Established',
      description: 'Founded in Pudukkottai to give clear, supportive health and nutrition guidance to individuals and families.'
    },
    {
      year: 'Growth',
      title: 'Community Health Screenings',
      description: 'Introduced simple body composition checks (BMI, body fat, muscle mass) to help people understand their health.'
    },
    {
      year: 'Holistic Reach',
      title: 'Comprehensive Programs',
      description: "Added specialized programs for children's nutrition, women's health, daily energy, and joint comfort."
    }
  ]
};

export const INITIAL_HERO_GALLERY = [
  {
    id: 'hero-gallery-1',
    media_type: 'image',
    media_url: '/assets/hero-wellness.jpg',
    image_path: '/assets/hero-wellness.jpg',
    title: 'Simple Health & Nutrition Guidance',
    description: 'Practical daily wellness coaching in Pudukkottai',
    display_order: 1,
    active: true
  },
  {
    id: 'hero-gallery-2',
    media_type: 'image',
    media_url: '/assets/about-wellness.jpg',
    image_path: '/assets/about-wellness.jpg',
    title: 'Body Composition & Health Checks',
    description: 'Simple checks for BMI, body fat, and muscle',
    display_order: 2,
    active: true
  },
  {
    id: 'hero-gallery-3',
    media_type: 'image',
    media_url: '/assets/coach-pandian.png',
    image_path: '/assets/coach-pandian.png',
    title: 'One-on-One Support with Coach Thangapandian',
    description: 'Build healthy daily habits without strict diets',
    display_order: 3,
    active: true
  }
];

// Helper to determine media type (image vs video) safely
export const getMediaType = (item) => {
  if (!item) return 'image';
  if (item.media_type === 'video' || item.media_type === 'image') {
    return item.media_type;
  }
  const url = item.media_url || item.video_path || item.image_path || '';
  if (url.match(/\.(mp4|webm|mov|mkv)($|\?)/i)) {
    return 'video';
  }
  return 'image';
};

// Helper to resolve media URL safely across new and legacy items
export const getMediaUrl = (item, fallback = '/assets/hero-wellness.jpg') => {
  if (!item) return fallback;
  return item.media_url || item.video_path || item.image_path || fallback;
};

export const INITIAL_HERO_CONTENT = {
  tagline: 'Nutrition • Fitness • Wellness',
  headline: 'Simple, Healthy Living for Everyday Life',
  subheadline: 'Personal health and nutrition coaching in Pudukkottai with Coach Thangapandian S. Build simple, healthy habits that last.',
  hero_image_path: '/assets/hero-wellness.jpg',
  gallery: INITIAL_HERO_GALLERY
};

// Local storage helper keys for offline / preview mode fallback
const STORAGE_KEYS = {
  SERVICES: 'pwc_services_v1',
  STORIES: 'pwc_stories_v1',
  COACH: 'pwc_coach_v1',
  COACHES: 'pwc_coaches_v2',
  CONTENT: 'pwc_content_v1',
  HERO_CONTENT: 'pwc_hero_content_v1',
  ENQUIRIES: 'pwc_enquiries_v1'
};

// In-memory fallback for environments without browser localStorage (e.g. testing / SSR)
const memoryStorage = {};

const getLocal = (key, fallback) => {
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }
    return memoryStorage[key] ? JSON.parse(memoryStorage[key]) : fallback;
  } catch {
    return fallback;
  }
};

const setLocal = (key, val) => {
  try {
    const json = JSON.stringify(val);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, json);
    } else {
      memoryStorage[key] = json;
    }
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
};

// ==========================================
// 1. SERVICES API
// ==========================================
export const dataService = {
  // Public: get only published services
  async getPublishedServices() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local seed:', err);
      }
    }
    const local = getLocal(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    return local.filter((s) => s.published);
  },

  // Admin: get all services
  async getAllServices() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, using local services:', err);
      }
    }
    return getLocal(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  },

  // Admin: save/update service
  async saveService(service) {
    if (isSupabaseConfigured()) {
      try {
        if (service.id && !service.id.startsWith('s-')) {
          const { data, error } = await supabase
            .from('services')
            .update({
              title: service.title,
              description: service.description,
              category: service.category,
              image_path: service.image_path,
              published: service.published,
              display_order: service.display_order ?? 0,
              updated_at: new Date().toISOString()
            })
            .eq('id', service.id)
            .select()
            .single();
          if (!error) return data;
        } else {
          const { data, error } = await supabase
            .from('services')
            .insert({
              title: service.title,
              description: service.description,
              category: service.category,
              image_path: service.image_path,
              published: service.published ?? true,
              display_order: service.display_order ?? 0
            })
            .select()
            .single();
          if (!error) return data;
        }
      } catch (err) {
        console.error('Supabase saveService error:', err);
      }
    }
    // Fallback local update
    const current = getLocal(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    if (service.id) {
      const idx = current.findIndex((s) => s.id === service.id);
      if (idx !== -1) {
        current[idx] = { ...current[idx], ...service, updated_at: new Date().toISOString() };
        setLocal(STORAGE_KEYS.SERVICES, current);
        return current[idx];
      }
    }
    const newService = {
      ...service,
      id: 'local-' + Date.now(),
      created_at: new Date().toISOString()
    };
    current.push(newService);
    setLocal(STORAGE_KEYS.SERVICES, current);
    return newService;
  },

  // Admin: delete service
  async deleteService(id) {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.error('Supabase deleteService error:', err);
      }
    }
    const current = getLocal(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    const updated = current.filter((s) => s.id !== id);
    setLocal(STORAGE_KEYS.SERVICES, updated);
    return true;
  },

  // ==========================================
  // 2. SUCCESS STORIES API (Tamil & English)
  // ==========================================
  async getPublishedSuccessStories() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('success_stories')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase fetch stories failed, using local stories:', err);
      }
    }
    const local = getLocal(STORAGE_KEYS.STORIES, []);
    return local.filter((s) => s.published);
  },

  async getAllSuccessStories() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('success_stories')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase fetch all stories error:', err);
      }
    }
    return getLocal(STORAGE_KEYS.STORIES, []);
  },

  async saveSuccessStory(story) {
    if (isSupabaseConfigured()) {
      try {
        if (story.id && !story.id.startsWith('local-')) {
          const { data, error } = await supabase
            .from('success_stories')
            .update({
              client_name: story.client_name,
              language: story.language, // 'ta' or 'en'
              title: story.title || null,
              story: story.story,
              program_duration: story.program_duration || null,
              image_path: story.image_path || null,
              published: story.published ?? true,
              updated_at: new Date().toISOString()
            })
            .eq('id', story.id)
            .select()
            .single();
          if (!error) return data;
        } else {
          const { data, error } = await supabase
            .from('success_stories')
            .insert({
              client_name: story.client_name,
              language: story.language, // 'ta' or 'en'
              title: story.title || null,
              story: story.story,
              program_duration: story.program_duration || null,
              image_path: story.image_path || null,
              published: story.published ?? true
            })
            .select()
            .single();
          if (!error) return data;
        }
      } catch (err) {
        console.error('Supabase saveSuccessStory error:', err);
      }
    }
    // Local fallback
    const current = getLocal(STORAGE_KEYS.STORIES, []);
    if (story.id) {
      const idx = current.findIndex((s) => s.id === story.id);
      if (idx !== -1) {
        current[idx] = { ...current[idx], ...story, updated_at: new Date().toISOString() };
        setLocal(STORAGE_KEYS.STORIES, current);
        return current[idx];
      }
    }
    const newStory = {
      ...story,
      id: 'local-' + Date.now(),
      created_at: new Date().toISOString()
    };
    current.unshift(newStory);
    setLocal(STORAGE_KEYS.STORIES, current);
    return newStory;
  },

  async deleteSuccessStory(id) {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('success_stories').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.error('Supabase deleteSuccessStory error:', err);
      }
    }
    const current = getLocal(STORAGE_KEYS.STORIES, []);
    const updated = current.filter((s) => s.id !== id);
    setLocal(STORAGE_KEYS.STORIES, updated);
    return true;
  },

  // ==========================================
  // 3. COACH PROFILE API (DYNAMIC PHOTO & BIO FOR BOTH COACHES)
  // ==========================================
  async getAllCoaches() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('coach_profile')
          .select('*')
          .order('id', { ascending: true });
        if (!error && data && data.length > 0) {
          // If only 1 coach exists in Supabase (legacy single-coach database), seamlessly include Thenmozhi
          if (data.length === 1 && (data[0].coach_name || '').includes('Thangapandian')) {
            const merged = [data[0], INITIAL_COACHES[1]];
            setLocal(STORAGE_KEYS.COACHES, merged);
            return merged;
          }
          setLocal(STORAGE_KEYS.COACHES, data);
          return data;
        }
      } catch (err) {
        console.warn('Supabase fetch coaches failed, using local profile:', err);
      }
    }
    return getLocal(STORAGE_KEYS.COACHES, INITIAL_COACHES);
  },

  async getCoachProfile() {
    const coaches = await this.getAllCoaches();
    return coaches[0] || INITIAL_COACH;
  },

  async updateCoachProfile(profile) {
    const targetId = profile.id || INITIAL_COACH.id;
    if (isSupabaseConfigured()) {
      try {
        // Upsert to handle both existing records and new second coach insertion
        const { data, error } = await supabase
          .from('coach_profile')
          .upsert({
            id: targetId,
            coach_name: profile.coach_name,
            title: profile.title,
            biography: profile.biography,
            image_path: profile.image_path,
            phone: profile.phone || '94434 43261',
            instagram_url: profile.instagram_url || '',
            maps_url: profile.maps_url || 'https://maps.app.goo.gl/JAdNVeq53M3PdrW1A',
            address_en: profile.address_en || 'E Main Rd, T Nagar, Buvaneswari Nagar, Pudukkottai, Tamil Nadu 622001',
            address_ta: profile.address_ta || 'கிழக்கு முதன்மை சாலை, டி நகர், புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001',
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (!error && data) {
          const currentList = getLocal(STORAGE_KEYS.COACHES, INITIAL_COACHES);
          const idx = currentList.findIndex((c) => c.id === targetId);
          if (idx !== -1) currentList[idx] = data;
          else currentList.push(data);
          setLocal(STORAGE_KEYS.COACHES, currentList);
          if (idx === 0) setLocal(STORAGE_KEYS.COACH, data);
          return data;
        }
      } catch (err) {
        console.error('Supabase updateCoachProfile error:', err);
      }
    }

    const currentList = getLocal(STORAGE_KEYS.COACHES, INITIAL_COACHES);
    const idx = currentList.findIndex((c) => c.id === targetId);
    let updated;
    if (idx !== -1) {
      currentList[idx] = { ...currentList[idx], ...profile, updated_at: new Date().toISOString() };
      updated = currentList[idx];
    } else {
      updated = { ...profile, id: targetId, updated_at: new Date().toISOString() };
      currentList.push(updated);
    }
    setLocal(STORAGE_KEYS.COACHES, currentList);
    if (idx === 0) setLocal(STORAGE_KEYS.COACH, updated);
    return updated;
  },

  // ==========================================
  // 4. SITE CONTENT API (About, Mission, Vision)
  // ==========================================
  async getSiteContent(sectionKey = 'about_page') {
    const isHero = sectionKey === 'home_hero';
    const fallbackDefault = isHero ? INITIAL_HERO_CONTENT : INITIAL_SITE_CONTENT;
    const localKey = isHero ? STORAGE_KEYS.HERO_CONTENT : STORAGE_KEYS.CONTENT;

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('content')
          .eq('section_key', sectionKey)
          .single();
        if (!error && data?.content) {
          const resolved = isHero
            ? {
                ...INITIAL_HERO_CONTENT,
                ...data.content,
                hero_image_path: data.content.hero_image_path || '/assets/hero-wellness.jpg',
                gallery: Array.isArray(data.content.gallery) && data.content.gallery.length > 0
                  ? data.content.gallery
                  : INITIAL_HERO_GALLERY
              }
            : data.content;
          setLocal(localKey, resolved);
          return resolved;
        }
      } catch (err) {
        console.warn(`Supabase fetch site content (${sectionKey}) failed:`, err);
      }
    }
    return getLocal(localKey, fallbackDefault);
  },

  async updateSiteContent(sectionKey, content) {
    const isHero = sectionKey === 'home_hero';
    const localKey = isHero ? STORAGE_KEYS.HERO_CONTENT : STORAGE_KEYS.CONTENT;

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .upsert(
            {
              section_key: sectionKey,
              content,
              updated_at: new Date().toISOString()
            },
            { onConflict: 'section_key' }
          )
          .select()
          .single();

        if (!error && data?.content) {
          setLocal(localKey, data.content);
          return data.content;
        }
        if (error) {
          console.warn(`Supabase updateSiteContent (${sectionKey}) warning:`, error.message);
        }
      } catch (err) {
        console.warn(`Supabase updateSiteContent (${sectionKey}) catch:`, err.message);
      }
    }
    setLocal(localKey, content);
    return content;
  },

  async getHomeHero() {
    return this.getSiteContent('home_hero');
  },

  async updateHomeHero(content) {
    return this.updateSiteContent('home_hero', content);
  },

  async uploadHeroMedia(file) {
    // Try dedicated 'site-images' bucket first, then fall back to 'service-images'
    try {
      return await this.uploadMediaFile('site-images', file);
    } catch (err) {
      if (
        err?.message?.includes('Bucket not found') ||
        err?.error === 'Bucket not found' ||
        err?.statusCode === '404'
      ) {
        return await this.uploadMediaFile('service-images', file);
      }
      throw err;
    }
  },

  async uploadHeroImage(file) {
    return this.uploadHeroMedia(file);
  },

  async deleteHeroImage() {
    const current = await this.getSiteContent('home_hero');
    const oldUrl = current?.hero_image_path;

    // Reset hero_image_path to default placeholder in database
    const updated = {
      ...current,
      hero_image_path: '/assets/hero-wellness.jpg'
    };
    const saved = await this.updateSiteContent('home_hero', updated);

    // Optionally attempt to remove old file from Supabase storage if it was stored there
    if (oldUrl && isSupabaseConfigured()) {
      try {
        for (const bucket of ['site-images', 'service-images']) {
          if (oldUrl.includes(`/${bucket}/`)) {
            const fileName = oldUrl.split(`/${bucket}/`).pop().split('?')[0];
            if (fileName) {
              await supabase.storage.from(bucket).remove([fileName]);
            }
          }
        }
      } catch (cleanErr) {
        console.warn('Storage cleanup non-critical error:', cleanErr);
      }
    }

    return saved;
  },

  // ==========================================
  // HERO GALLERY / MEDIA SLIDESHOW CRUD & ORDERING API
  // ==========================================
  async getHeroGallery(onlyActive = true) {
    const hero = await this.getHomeHero();
    let gallery = Array.isArray(hero?.gallery) && hero.gallery.length > 0
      ? hero.gallery
      : INITIAL_HERO_GALLERY;
    if (onlyActive) {
      gallery = gallery.filter((item) => item.active !== false);
    }
    return gallery.slice().sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  },

  async getAllHeroGallery() {
    return this.getHeroGallery(false);
  },

  async updateHeroGallery(gallery) {
    const hero = await this.getHomeHero();
    const indexed = gallery.map((item, idx) => ({
      ...item,
      media_type: getMediaType(item),
      media_url: getMediaUrl(item),
      image_path: getMediaUrl(item), // preserve backward compatibility
      display_order: idx + 1
    }));

    const activeItem = indexed.find((g) => g.active);
    const activeMediaUrl = activeItem ? getMediaUrl(activeItem) : (hero.hero_image_path || '/assets/hero-wellness.jpg');

    const updated = {
      ...hero,
      gallery: indexed,
      hero_image_path: activeMediaUrl
    };
    return this.updateHomeHero(updated);
  },

  async addHeroGalleryItem({ file, title = '', description = '', media_type }) {
    const isVideo = file.type?.startsWith('video/') ||
      media_type === 'video' ||
      /\.(mp4|webm|mov|mkv)$/i.test(file.name || '');

    const publicUrl = await this.uploadHeroMedia(file);
    const hero = await this.getHomeHero();
    const currentGallery = Array.isArray(hero?.gallery) && hero.gallery.length > 0
      ? hero.gallery
      : INITIAL_HERO_GALLERY;

    const newItem = {
      id: 'gallery-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      media_type: isVideo ? 'video' : 'image',
      media_url: publicUrl,
      image_path: publicUrl, // backward compatibility
      video_path: isVideo ? publicUrl : null,
      title: title.trim(),
      description: description.trim(),
      display_order: currentGallery.length + 1,
      active: true
    };

    const updatedGallery = [...currentGallery, newItem];
    await this.updateHeroGallery(updatedGallery);
    return newItem;
  },

  async deleteHeroGalleryItem(id) {
    const hero = await this.getHomeHero();
    const currentGallery = Array.isArray(hero?.gallery) && hero.gallery.length > 0
      ? hero.gallery
      : INITIAL_HERO_GALLERY;
    const itemToDelete = currentGallery.find((g) => g.id === id);
    const updatedGallery = currentGallery.filter((g) => g.id !== id);
    await this.updateHeroGallery(updatedGallery);

    // Clean up file in Supabase storage if it was stored there
    const targetUrl = itemToDelete ? getMediaUrl(itemToDelete) : null;
    if (targetUrl && !targetUrl.startsWith('/assets/')) {
      try {
        for (const bucket of ['site-images', 'service-images']) {
          if (targetUrl.includes(`/${bucket}/`)) {
            const fileName = targetUrl.split(`/${bucket}/`).pop().split('?')[0];
            if (fileName && isSupabaseConfigured()) {
              await supabase.storage.from(bucket).remove([fileName]);
            }
          }
        }
      } catch (err) {
        console.warn('Storage delete cleanup error:', err);
      }
    }
    return true;
  },

  async toggleHeroGalleryItemActive(id) {
    const hero = await this.getHomeHero();
    const currentGallery = Array.isArray(hero?.gallery) && hero.gallery.length > 0
      ? hero.gallery
      : INITIAL_HERO_GALLERY;
    const updatedGallery = currentGallery.map((item) =>
      item.id === id ? { ...item, active: !item.active } : item
    );
    await this.updateHeroGallery(updatedGallery);
    return updatedGallery.find((g) => g.id === id);
  },

  async updateHeroGalleryItem(id, updates) {
    const hero = await this.getHomeHero();
    const currentGallery = Array.isArray(hero?.gallery) && hero.gallery.length > 0
      ? hero.gallery
      : INITIAL_HERO_GALLERY;
    const updatedGallery = currentGallery.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    await this.updateHeroGallery(updatedGallery);
    return updatedGallery.find((g) => g.id === id);
  },

  async reorderHeroGallery(fromIndex, toIndex) {
    const hero = await this.getHomeHero();
    const currentGallery = [...(Array.isArray(hero?.gallery) && hero.gallery.length > 0
      ? hero.gallery
      : INITIAL_HERO_GALLERY)];
    if (
      fromIndex < 0 ||
      fromIndex >= currentGallery.length ||
      toIndex < 0 ||
      toIndex >= currentGallery.length
    ) {
      return currentGallery;
    }
    const [moved] = currentGallery.splice(fromIndex, 1);
    currentGallery.splice(toIndex, 0, moved);
    await this.updateHeroGallery(currentGallery);
    return currentGallery;
  },

  // ==========================================
  // 5. ENQUIRIES API (Customer Contact Form)
  // ==========================================
  async submitEnquiry({ customer_name, phone, service, message }) {
    if (!customer_name?.trim()) throw new Error('Please enter your full name.');
    const cleanPhone = phone?.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      throw new Error('Please enter a valid 10-digit phone number.');
    }

    const payload = {
      customer_name: customer_name.trim(),
      phone: phone.trim(),
      service: service?.trim() || null,
      message: message?.trim() || 'Not provided',
      status: 'new'
    };

    if (isSupabaseConfigured()) {
      try {
        // PostgREST executes INSERT without RETURNING * when .select() is omitted.
        // This avoids RLS 42501 errors because anonymous visitors have INSERT permission
        // but not SELECT permission on the private enquiries table.
        const { error } = await supabase
          .from('enquiries')
          .insert(payload);

        if (error) {
          // If error is because 'service' column doesn't exist yet on an older table, fallback safely
          if (error.message?.includes('service') || error.code === '42703') {
            const fallbackPayload = {
              customer_name: payload.customer_name,
              phone: payload.phone,
              message: payload.service
                ? `[Service: ${payload.service}] ${payload.message}`
                : payload.message,
              status: 'new'
            };
            const retry = await supabase.from('enquiries').insert(fallbackPayload);
            if (retry.error) throw retry.error;
          } else {
            throw error;
          }
        }

        // Also persist to local storage for offline viewing and admin dashboard consistency
        const current = getLocal(STORAGE_KEYS.ENQUIRIES, []);
        const newEnquiry = {
          ...payload,
          id: 'enq-' + Date.now(),
          created_at: new Date().toISOString()
        };
        current.unshift(newEnquiry);
        setLocal(STORAGE_KEYS.ENQUIRIES, current);

        return { success: true, ...newEnquiry };
      } catch (err) {
        console.error('Supabase submitEnquiry error:', err);
        // If network fetch failed (offline / sandbox), record locally for testing and admin preview
        if (err.message?.includes('fetch failed')) {
          const current = getLocal(STORAGE_KEYS.ENQUIRIES, []);
          const newEnquiry = {
            ...payload,
            id: 'enq-' + Date.now(),
            created_at: new Date().toISOString()
          };
          current.unshift(newEnquiry);
          setLocal(STORAGE_KEYS.ENQUIRIES, current);
          return { success: true, ...newEnquiry };
        }
        throw new Error(err.message || 'Failed to submit enquiry. Please try again.');
      }
    }

    // Local fallback for demo / testing
    const current = getLocal(STORAGE_KEYS.ENQUIRIES, []);
    const newEnquiry = {
      ...payload,
      id: 'enq-' + Date.now(),
      created_at: new Date().toISOString()
    };
    current.unshift(newEnquiry);
    setLocal(STORAGE_KEYS.ENQUIRIES, current);
    return { success: true, ...newEnquiry };
  },

  async getAllEnquiries() {
    if (isSupabaseConfigured()) {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session) {
          const { data, error } = await supabase
            .from('enquiries')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error && data) {
            setLocal(STORAGE_KEYS.ENQUIRIES, data);
            return data;
          }
        }
      } catch (err) {
        console.error('Supabase getAllEnquiries error:', err);
      }
    }
    return getLocal(STORAGE_KEYS.ENQUIRIES, []);
  },

  async updateEnquiryStatus(id, status) {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('enquiries')
          .update({ status })
          .eq('id', id)
          .select()
          .single();
        if (!error) return data;
      } catch (err) {
        console.error('Supabase updateEnquiryStatus error:', err);
      }
    }
    const current = getLocal(STORAGE_KEYS.ENQUIRIES, []);
    const idx = current.findIndex((e) => e.id === id);
    if (idx !== -1) {
      current[idx].status = status;
      setLocal(STORAGE_KEYS.ENQUIRIES, current);
      return current[idx];
    }
    return null;
  },

  async deleteEnquiry(id) {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('enquiries').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.error('Supabase deleteEnquiry error:', err);
      }
    }
    const current = getLocal(STORAGE_KEYS.ENQUIRIES, []);
    const filtered = current.filter((e) => e.id !== id);
    setLocal(STORAGE_KEYS.ENQUIRIES, filtered);
    return true;
  },

  // ==========================================
  // 6. STORAGE UPLOAD HELPERS (IMAGES & VIDEOS)
  // ==========================================
  async uploadMediaFile(bucket, file) {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-m4v'];

    const isImage = validImageTypes.includes(file.type) || /\.(jpe?g|png|webp)$/i.test(file.name || '');
    const isVideo = validVideoTypes.includes(file.type) || /\.(mp4|webm|mov|m4v)$/i.test(file.name || '');

    if (!isImage && !isVideo) {
      throw new Error('Please upload a valid image (JPG, PNG, WebP) or video (MP4, WebM).');
    }

    // Size limit: 10MB for images, 60MB for videos
    if (isImage && file.size > 10 * 1024 * 1024) {
      throw new Error('Image size exceeds 10MB limit. Please upload an optimized photo.');
    }
    if (isVideo && file.size > 60 * 1024 * 1024) {
      throw new Error('Video size exceeds 60MB limit. Please upload a compressed MP4 or WebM video.');
    }

    if (isSupabaseConfigured()) {
      try {
        const ext = file.name.split('.').pop() || (isVideo ? 'mp4' : 'jpg');
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
        const contentType = file.type || (isVideo ? 'video/mp4' : 'image/jpeg');

        const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType
        });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
          return publicUrlData.publicUrl;
        }

        if (error) {
          if (error.message?.includes('Bucket not found')) throw error;
          console.warn(`Supabase storage upload error (${bucket}):`, error.message);
        }
      } catch (uploadErr) {
        if (uploadErr.message?.includes('Bucket not found')) throw uploadErr;
        console.warn(`Supabase storage (${bucket}) upload error, using local fallback:`, uploadErr.message);
      }
    }

    // Local fallback: convert to base64 Data URL for instant preview & persistence
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  async uploadImage(bucket, file) {
    return this.uploadMediaFile(bucket, file);
  }
};
