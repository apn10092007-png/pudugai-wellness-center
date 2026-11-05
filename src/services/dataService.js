import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js';

// Verified Initial Seed Services matching client requirements
export const INITIAL_SERVICES = [
  // 1. Weight Management
  {
    id: 's-wm-1',
    title: 'Weight Loss',
    description: 'Customized nutrition and gradual calorie management plans designed to achieve steady, healthy fat reduction while maintaining energy and muscle tone.',
    category: 'Weight Management',
    image_path: '/assets/about-wellness.jpg',
    published: true,
    display_order: 1
  },
  {
    id: 's-wm-2',
    title: 'Weight Gain',
    description: 'Nutrient-rich, calorie-dense meal guidance combined with muscle-supportive nutrition to help you gain healthy lean mass safely.',
    category: 'Weight Management',
    image_path: null,
    published: true,
    display_order: 2
  },

  // 2. Health Screening
  {
    id: 's-hs-1',
    title: 'BMI (Body Mass Index)',
    description: 'Baseline assessment of your body mass relative to height to establish accurate health risk tiers and program targets.',
    category: 'Health Screening',
    image_path: null,
    published: true,
    display_order: 3
  },
  {
    id: 's-hs-2',
    title: 'BMR (Basal Metabolic Rate)',
    description: 'Scientific measurement of the minimum calories your body requires at rest to design tailored nutritional intake.',
    category: 'Health Screening',
    image_path: null,
    published: true,
    display_order: 4
  },
  {
    id: 's-hs-3',
    title: 'Body Fat Analysis',
    description: 'Detailed evaluation of subcutaneous and visceral fat percentages to target fat loss while protecting vital organ health.',
    category: 'Health Screening',
    image_path: null,
    published: true,
    display_order: 5
  },
  {
    id: 's-hs-4',
    title: 'Metabolic Age',
    description: 'Insightful evaluation comparing your physiological metabolic rate with biological chronological age.',
    category: 'Health Screening',
    image_path: null,
    published: true,
    display_order: 6
  },
  {
    id: 's-hs-5',
    title: 'Skeletal Muscle Evaluation',
    description: 'Assessment of functional muscle mass across your body to ensure adequate strength, posture, and metabolic resilience.',
    category: 'Health Screening',
    image_path: null,
    published: true,
    display_order: 7
  },

  // 3. Special Programs
  {
    id: 's-sp-1',
    title: "Children's Health",
    description: 'Gentle, balanced nutritional support and wholesome habit development to support physical growth, focus, and immunity in growing kids.',
    category: 'Special Programs',
    image_path: null,
    published: true,
    display_order: 8
  },
  {
    id: 's-sp-2',
    title: "Women's Health",
    description: "Targeted nutritional guidance tailored for hormonal harmony, bone density, energy restoration, and life-stage transitions.",
    category: 'Special Programs',
    image_path: null,
    published: true,
    display_order: 9
  },
  {
    id: 's-sp-3',
    title: "Men's Health",
    description: 'Focused nutrition and lifestyle coaching supporting metabolic stamina, vitality, cardiovascular wellness, and lean muscle retention.',
    category: 'Special Programs',
    image_path: null,
    published: true,
    display_order: 10
  },
  {
    id: 's-sp-4',
    title: 'Energy & Fitness',
    description: 'Nutritional protocols that eliminate daily afternoon fatigue, stabilize blood sugar, and enhance natural physical stamina.',
    category: 'Special Programs',
    image_path: null,
    published: true,
    display_order: 11
  },
  {
    id: 's-sp-5',
    title: 'Eyes Health',
    description: 'Dietary guidance incorporating essential micronutrients, lutein, and antioxidants to support eye comfort and visual wellness.',
    category: 'Special Programs',
    image_path: null,
    published: true,
    display_order: 12
  },

  // 4. Nutrition Guidance
  {
    id: 's-ng-1',
    title: 'Personalized Diet Plans',
    description: 'Everyday meal plans crafted around your specific food preferences, daily schedule, and body composition data.',
    category: 'Nutrition Guidance',
    image_path: null,
    published: true,
    display_order: 13
  },
  {
    id: 's-ng-2',
    title: 'Healthy Habits',
    description: 'Practical behavior coaching to overcome emotional eating, irregular timing, late-night snacking, and hydration neglect.',
    category: 'Nutrition Guidance',
    image_path: null,
    published: true,
    display_order: 14
  },

  // 5. Wellness Solutions
  {
    id: 's-ws-1',
    title: 'Heart Health',
    description: 'Nutrition strategies focusing on cardiovascular wellness, healthy cholesterol balance, and blood pressure support.',
    category: 'Wellness Solutions',
    image_path: null,
    published: true,
    display_order: 15
  },
  {
    id: 's-ws-2',
    title: 'Digestive Health',
    description: 'Gut-supportive dietary plans focusing on prebiotic fiber, hydration, and digestive comfort to alleviate bloating and sluggish digestion.',
    category: 'Wellness Solutions',
    image_path: null,
    published: true,
    display_order: 16
  },
  {
    id: 's-ws-3',
    title: 'Bone & Joints',
    description: 'Nutritional protocols enriched with calcium, vitamin D, and anti-inflammatory nutrients to support joint ease and mobility.',
    category: 'Wellness Solutions',
    image_path: null,
    published: true,
    display_order: 17
  },
  {
    id: 's-ws-4',
    title: 'Skin & Hair',
    description: 'Nourishing dietary advice emphasizing essential fatty acids, hydration, and collagen support for radiant skin and hair strength.',
    category: 'Wellness Solutions',
    image_path: null,
    published: true,
    display_order: 18
  },
  {
    id: 's-ws-5',
    title: 'Immunity',
    description: 'Antioxidant and micronutrient-dense dietary strategies designed to build resilience against seasonal illness.',
    category: 'Wellness Solutions',
    image_path: null,
    published: true,
    display_order: 19
  },
  {
    id: 's-ws-6',
    title: 'Brain & Sleep',
    description: 'Nutritional guidance that supports evening relaxation, deeper sleep cycles, and daytime cognitive clarity.',
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
  biography: 'Thangapandian S is dedicated to guiding individuals and families toward healthier, more active, and balanced lifestyles. At Pudugai Wellness Center, the coaching philosophy is rooted in sustainable daily habits, wholesome nutrition, and gradual, realistic progress without extreme or unsustainable restrictions.',
  image_path: '/assets/coach-pandian.png',
  phone: '94434 43261',
  instagram_url: 'https://www.instagram.com/coach_pandian?exln=YmNsbjZkeXQ1dnc3',
  maps_url: 'https://maps.app.goo.gl/JAdNVeq53M3PdrW1A',
  address_en: 'E Main Rd, T Nagar, Buvaneswari Nagar, Pudukkottai, Tamil Nadu 622001',
  address_ta: 'கிழக்கு முதன்மை சாலை, டி நகர், புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001'
};

export const INITIAL_SITE_CONTENT = {
  mission: 'To empower people of all ages to achieve their highest vitality through personalized nutrition plans, body composition analysis, and consistent, supportive coaching.',
  vision: "To become Pudukkottai's most trusted and compassionate wellness community, where healthy living is accessible, sustainable, and joyful.",
  approach_intro: 'We do not believe in quick-fix crash diets or exhausting extremes. Our wellness model focuses on balanced daily nutrition, hydration, restorative sleep, gentle active movement, and habit accountability.',
  journey_milestones: [
    {
      year: 'Foundation',
      title: 'Wellness Mission Established',
      description: 'Founded in Pudukkottai to provide structured, supportive health and nutrition guidance to individuals and families.'
    },
    {
      year: 'Growth',
      title: 'Community Health Screenings',
      description: 'Introduced comprehensive body composition assessments (BMI, BMR, visceral fat, muscle mass) for personalized coaching.'
    },
    {
      year: 'Holistic Reach',
      title: 'Comprehensive Programs',
      description: "Expanded specialized programs spanning children's nutrition, women's vital health, energy restoration, and joint wellness."
    }
  ]
};

export const INITIAL_HERO_GALLERY = [
  {
    id: 'hero-gallery-1',
    image_path: '/assets/hero-wellness.jpg',
    title: 'Personalized Health & Nutrition Guidance',
    description: 'Sustainable everyday wellness coaching in Pudukkottai',
    display_order: 1,
    active: true
  },
  {
    id: 'hero-gallery-2',
    image_path: '/assets/about-wellness.jpg',
    title: 'Body Composition & Metabolic Screenings',
    description: 'Comprehensive BMI, BMR, and body fat analysis',
    display_order: 2,
    active: true
  },
  {
    id: 'hero-gallery-3',
    image_path: '/assets/coach-pandian.png',
    title: '1-on-1 Guidance with Coach Thangapandian',
    description: 'Practical habit building without extreme restrictions',
    display_order: 3,
    active: true
  }
];

export const INITIAL_HERO_CONTENT = {
  tagline: 'Nutrition • Fitness • Wellness',
  headline: 'Real Wellness for Your Real Everyday Life',
  subheadline: 'Personal health & nutrition coaching in Pudukkottai guided by Coach Thangapandian S. Build sustainable habits that last a lifetime.',
  hero_image_path: '/assets/hero-wellness.jpg',
  gallery: INITIAL_HERO_GALLERY
};

// Local storage helper keys for offline / preview mode fallback
const STORAGE_KEYS = {
  SERVICES: 'pwc_services_v1',
  STORIES: 'pwc_stories_v1',
  COACH: 'pwc_coach_v1',
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
  // 3. COACH PROFILE API (DYNAMIC PHOTO & BIO)
  // ==========================================
  async getCoachProfile() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('coach_profile')
          .select('*')
          .limit(1)
          .single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase fetch coach failed, using local profile:', err);
      }
    }
    return getLocal(STORAGE_KEYS.COACH, INITIAL_COACH);
  },

  async updateCoachProfile(profile) {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('coach_profile')
          .update({
            coach_name: profile.coach_name,
            title: profile.title,
            biography: profile.biography,
            image_path: profile.image_path,
            phone: profile.phone,
            instagram_url: profile.instagram_url,
            maps_url: profile.maps_url,
            address_en: profile.address_en,
            address_ta: profile.address_ta,
            updated_at: new Date().toISOString()
          })
          .eq('id', profile.id || INITIAL_COACH.id)
          .select()
          .single();
        if (!error && data) return data;
      } catch (err) {
        console.error('Supabase updateCoachProfile error:', err);
      }
    }
    const current = getLocal(STORAGE_KEYS.COACH, INITIAL_COACH);
    const updated = { ...current, ...profile, updated_at: new Date().toISOString() };
    setLocal(STORAGE_KEYS.COACH, updated);
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

  async uploadHeroImage(file) {
    // Try dedicated 'site-images' bucket first, then fall back to 'service-images'
    try {
      return await this.uploadImage('site-images', file);
    } catch (err) {
      if (
        err?.message?.includes('Bucket not found') ||
        err?.error === 'Bucket not found' ||
        err?.statusCode === '404'
      ) {
        return await this.uploadImage('service-images', file);
      }
      throw err;
    }
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
  // HERO GALLERY CRUD & ORDERING API
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
      display_order: idx + 1
    }));
    const updated = {
      ...hero,
      gallery: indexed,
      hero_image_path: indexed.find((g) => g.active)?.image_path || hero.hero_image_path || '/assets/hero-wellness.jpg'
    };
    return this.updateHomeHero(updated);
  },

  async addHeroGalleryItem({ file, title = '', description = '' }) {
    const publicUrl = await this.uploadHeroImage(file);
    const hero = await this.getHomeHero();
    const currentGallery = Array.isArray(hero?.gallery) && hero.gallery.length > 0
      ? hero.gallery
      : INITIAL_HERO_GALLERY;
    const newItem = {
      id: 'gallery-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      image_path: publicUrl,
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
    if (itemToDelete?.image_path && !itemToDelete.image_path.startsWith('/assets/')) {
      try {
        for (const bucket of ['site-images', 'service-images']) {
          if (itemToDelete.image_path.includes(`/${bucket}/`)) {
            const fileName = itemToDelete.image_path.split(`/${bucket}/`).pop().split('?')[0];
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
  // 6. STORAGE UPLOAD HELPER
  // ==========================================
  async uploadImage(bucket, file) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Please upload a valid image file (JPG, PNG, or WebP).');
    }
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image size exceeds 5MB limit. Please upload a smaller photo.');
    }

    if (isSupabaseConfigured()) {
      try {
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
        const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
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
  }
};
