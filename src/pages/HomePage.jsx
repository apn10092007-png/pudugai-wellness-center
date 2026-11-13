import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Heart,
  Scale,
  Users,
  MapPin,
  Calendar
} from 'lucide-react';
import { InstagramIcon as Instagram, WhatsAppIcon } from '../components/Icons';
import HeroCarousel from '../components/HeroCarousel';
import { dataService, INITIAL_HERO_GALLERY } from '../services/dataService';
import { BUSINESS_CONFIG } from '../config/business';
import './HomePage.css';

// Static frontend content for hero headlines – easy to edit directly here
const HERO_HEADLINES = {
  badge: 'Nutrition • Fitness • Wellness',
  headline: 'Simple, Healthy Living for Everyday Life.',
  subheadline:
    'Personal health and nutrition coaching in Pudukkottai with Coach Thangapandian S. Build simple, healthy habits that last.'
};

export default function HomePage() {
  const [coaches, setCoaches] = useState([]);
  const [services, setServices] = useState([]);
  const [stories, setStories] = useState([]);
  const [heroGallery, setHeroGallery] = useState(INITIAL_HERO_GALLERY);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const [coachesData, servicesData, storiesData, galleryData] = await Promise.all([
          dataService.getAllCoaches(),
          dataService.getPublishedServices(),
          dataService.getPublishedSuccessStories(),
          dataService.getHeroGallery()
        ]);
        if (mounted) {
          setCoaches(coachesData || []);
          setServices(servicesData);
          setStories(storiesData);
          setHeroGallery(galleryData || INITIAL_HERO_GALLERY);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading home data:', err);
        if (mounted) setLoading(false);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, []);

  // Filter 6 featured services for homepage preview
  const featuredServices = services.slice(0, 6);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION WITH DYNAMIC CAROUSEL */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">{HERO_HEADLINES.badge}</span>
            
            <h1 className="hero-title">
              {HERO_HEADLINES.headline}
            </h1>
            
            <p className="hero-description">
              {HERO_HEADLINES.subheadline}
            </p>

            <div className="hero-cta-group">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hello%20Pudugai%20Wellness%20Center!%20I%20would%20like%20to%20enquire%20about%20your%20wellness%20programs.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg hero-whatsapp-btn"
              >
                <WhatsAppIcon size={18} />
                <span>Chat on WhatsApp</span>
              </a>

              <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="btn btn-secondary btn-lg">
                <Phone size={17} />
                <span>Call: {BUSINESS_CONFIG.phoneDisplay}</span>
              </a>
            </div>

            <div className="hero-features-strip">
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Personal Meal Plans</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Simple Body Health Checks</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>One-on-One Coach Support</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <HeroCarousel
              items={heroGallery}
              fallbackImage="/assets/hero-wellness.jpg"
            />
          </div>
        </div>
      </section>

      {/* 2. SIMPLE INTRODUCTION & 3 CORE PILLARS */}
      <section className="section intro-section">
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">About Our Center</span>
            <h2 className="section-title">A Simple Way to Lasting Health</h2>
            <p className="section-subtitle">
              We do not believe in strict diets or heavy workouts. Real health comes from
              knowing your body, eating good food, and having a coach to guide you every day.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Scale size={22} />
              </div>
              <h3>Body Checkup</h3>
              <p>
                We check your BMI, body fat, and muscle to understand what your body needs.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Heart size={22} />
              </div>
              <h3>Healthy Eating</h3>
              <p>
                Simple meal plans made to match your daily routine and the foods you like.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Users size={22} />
              </div>
              <h3>Personal Coaching</h3>
              <p>
                Friendly, one-on-one coaching to help you build healthy habits and stay on track.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE WELLNESS PROGRAMS */}
      <section className="section services-overview-section">
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">Wellness Programs</span>
            <h2 className="section-title">Programs for Your Health Goals</h2>
            <p className="section-subtitle">
              From healthy weight loss and body checks to nutrition plans for the whole family.
            </p>
          </div>

          <div className="services-grid">
            {featuredServices.map((service) => (
              <div key={service.id} className="service-card">
                <span className="service-category-tag">{service.category}</span>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="service-learn-link"
                >
                  <span>Ask About This</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          <div className="section-center-action">
            <Link to="/services" className="btn btn-outline btn-lg">
              <span>View All Programs & Checks</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. MEET YOUR COACHES */}
      <section className="section coaches-section">
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">Our Coaches</span>
            <h2 className="section-title">Meet Your Wellness Coaches</h2>
            <p className="section-subtitle">
              Personal guidance to help you build healthy eating habits and an active lifestyle.
            </p>
          </div>

          <div className="coaches-grid">
            {coaches.map((c) => (
              <div key={c.id || c.coach_name} className="coach-clean-card">
                <div className="coach-card-image-wrap">
                  <img
                    src={c.image_path || (c.coach_name.includes('Thenmozhi') ? '/assets/avatar-thenmozhi.svg' : '/assets/coach-pandian.png')}
                    alt={c.coach_name}
                    className="coach-card-img"
                    onError={(e) => {
                      e.currentTarget.src = c.coach_name.includes('Thenmozhi') ? '/assets/avatar-thenmozhi.svg' : '/assets/coach-pandian.png';
                    }}
                  />
                </div>

                <div className="coach-card-body">
                  <span className="coach-card-role">{c.title || 'Wellness Coach'}</span>
                  <h3 className="coach-card-name">{c.coach_name}</h3>

                  <p className="coach-card-bio">{c.biography}</p>

                  <div className="coach-card-pills">
                    <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="coach-contact-pill">
                      <Phone size={14} />
                      <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                    </a>
                    {c.instagram_url && (
                      <a
                        href={c.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="coach-contact-pill"
                      >
                        <Instagram size={14} />
                        <span>Instagram</span>
                      </a>
                    )}
                    <div className="coach-contact-pill location">
                      <MapPin size={14} />
                      <span>Pudukkottai Center</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="coaches-action-row">
            <Link to="/about" className="btn btn-outline btn-lg">
              <span>Learn More About Us</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-primary btn-lg">
              <span>Book a Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. OUR JOURNEY SECTION */}
      <section className="section our-journey-section">
        <div className="container">
          <div className="our-journey-card">
            <div className="our-journey-header">
              <span className="section-tag">Our Journey</span>
              <h2 className="our-journey-title">Our Story of Growth and Service</h2>
            </div>
            <p className="our-journey-intro">
              Thangapandian and Thenmozhi started with a simple passion for good health. They began part-time in December 2019, and with hard work and teamwork, it grew into full-time coaching. Today, they run their own wellness club and help people in the community live healthier lives.
            </p>
            <div className="our-journey-action">
              <Link to="/our-story" className="btn btn-primary btn-lg">
                <span>Read Our Full Story</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GENUINE SUCCESS STORIES (IF AVAILABLE) */}
      {stories.length > 0 && (
        <section className="section stories-preview-section">
          <div className="container">
            <div className="section-header-compact">
              <span className="section-tag">Client Stories</span>
              <h2 className="section-title">Real Stories from Real People</h2>
              <p className="section-subtitle">
                Read how people in our community improved their health with simple daily habits.
              </p>
            </div>

            <div className="stories-grid">
              {stories.slice(0, 3).map((item) => (
                <div key={item.id} className="story-card">
                  {item.image_path && (
                    <img
                      src={item.image_path}
                      alt={item.client_name}
                      className="story-card-img"
                      loading="lazy"
                    />
                  )}
                  <div className="story-card-body">
                    <div className="story-header-row">
                      <span className="story-client-name">{item.client_name}</span>
                      {item.language === 'ta' && (
                        <span className="story-lang-badge">தமிழ்</span>
                      )}
                    </div>
                    {item.program_duration && (
                      <span className="story-duration">
                        <Calendar size={13} />
                        <span>{item.program_duration}</span>
                      </span>
                    )}
                    {item.title && <h4 className="story-title">{item.title}</h4>}
                    <p className="story-text">{item.story}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="disclaimer-banner" style={{ marginTop: '2rem' }}>
              <p>
                <strong>Notice:</strong> Weight loss and health results differ for each person. Results
                depend on your body, routine, and effort, and are not guaranteed.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 6. CLEAR CONTACT / ENQUIRY SECTION */}
      <section className="section home-contact-cta">
        <div className="container">
          <div className="home-cta-inner">
            <span className="section-tag">Get Started</span>
            <h2>Ready to feel healthier and more active?</h2>
            <p>
              Contact our team today for a simple body checkup and an easy health plan. We also have a wellness centre in Peravurani. Visit either of our locations to connect with our team.
            </p>
            <div className="home-cta-actions">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hello%20Pudugai%20Wellness%20Center!%20I%20would%20like%20to%20schedule%20an%20assessment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <WhatsAppIcon size={18} />
                <span>Chat on WhatsApp</span>
              </a>
              <Link to="/contact" className="btn btn-primary btn-lg">
                <span>Send a Message</span>
                <ArrowRight size={17} />
              </Link>
              <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="btn btn-secondary btn-lg">
                <Phone size={17} />
                <span>Call {BUSINESS_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
