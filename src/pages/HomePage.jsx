import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Activity,
  Heart,
  Scale,
  Users,
  MapPin,
  Calendar
} from 'lucide-react';
import { InstagramIcon as Instagram, WhatsAppIcon } from '../components/Icons';
import HeroCarousel from '../components/HeroCarousel';
import { dataService, INITIAL_HERO_CONTENT } from '../services/dataService';
import { BUSINESS_CONFIG } from '../config/business';
import './HomePage.css';

export default function HomePage() {
  const [coach, setCoach] = useState(null);
  const [services, setServices] = useState([]);
  const [stories, setStories] = useState([]);
  const [heroContent, setHeroContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const [coachData, servicesData, storiesData, heroData] = await Promise.all([
          dataService.getCoachProfile(),
          dataService.getPublishedServices(),
          dataService.getPublishedSuccessStories(),
          dataService.getHomeHero()
        ]);
        if (mounted) {
          setCoach(coachData);
          setServices(servicesData);
          setStories(storiesData);
          setHeroContent(heroData || INITIAL_HERO_CONTENT);
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
            <span className="hero-badge">Nutrition • Fitness • Wellness</span>
            
            <h1 className="hero-title">
              {heroContent?.headline || 'Real Wellness for Your Real Everyday Life.'}
            </h1>
            
            <p className="hero-description">
              {heroContent?.subheadline ||
                'Personalized health, nutrition, and lifestyle coaching in Pudukkottai guided by Coach Thangapandian S. Build sustainable daily habits that last.'}
            </p>

            <div className="hero-cta-group">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hello%20Pudugai%20Wellness%20Center!%20I%20would%20like%20to%20enquire%20about%20your%20wellness%20programs.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg hero-whatsapp-btn"
              >
                <WhatsAppIcon size={18} />
                <span>Continue to WhatsApp ↗</span>
              </a>

              <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="btn btn-secondary btn-lg">
                <Phone size={17} />
                <span>Call: {BUSINESS_CONFIG.phoneDisplay}</span>
              </a>
            </div>

            <div className="hero-features-strip">
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Personalized Nutrition Plans</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Scientific Body Composition Screenings</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Direct 1-on-1 Guidance with Coach</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <HeroCarousel
              items={heroContent?.gallery}
              fallbackImage={heroContent?.hero_image_path || '/assets/hero-wellness.jpg'}
            />
          </div>
        </div>
      </section>

      {/* 2. SIMPLE INTRODUCTION & 3 CORE PILLARS */}
      <section className="section intro-section">
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">About Pudugai Wellness Center</span>
            <h2 className="section-title">A Thoughtful Approach to Lasting Health</h2>
            <p className="section-subtitle">
              We do not promote extreme diets or unsustainable workout routines. True progress
              comes from understanding your body, balancing everyday nourishment, and receiving
              consistent personal encouragement.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Scale size={22} />
              </div>
              <h3>Body Analysis</h3>
              <p>
                Baseline assessments of BMI, BMR, visceral fat, and muscle mass to understand your
                unique metabolic profile.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Heart size={22} />
              </div>
              <h3>Practical Nutrition</h3>
              <p>
                Simple, wholesome meal guidance designed around your everyday food preferences and
                schedule.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Users size={22} />
              </div>
              <h3>Direct Coach Support</h3>
              <p>
                Ongoing personal accountability with Coach Thangapandian S to build habits that fit
                your daily life.
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
            <h2 className="section-title">Programs Designed For Your Health Goals</h2>
            <p className="section-subtitle">
              From gradual weight management and comprehensive screenings to targeted family and
              lifestyle programs.
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
                  <span>Enquire About This</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          <div className="section-center-action">
            <Link to="/services" className="btn btn-outline btn-lg">
              <span>View All 18+ Programs & Screenings</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. MEET THE COACH */}
      <section className="section coach-section">
        <div className="container">
          <div className="coach-clean-layout">
            <div className="coach-image-col">
              <img
                src={coach?.image_path || '/assets/coach-pandian.png'}
                alt={coach?.coach_name || 'Coach Thangapandian S'}
                className="coach-clean-img"
                onError={(e) => {
                  e.currentTarget.src = '/assets/coach-pandian.png';
                }}
              />
            </div>

            <div className="coach-details-col">
              <span className="section-tag">Dedicated Wellness Coach</span>
              <h2 className="coach-title-name">{coach?.coach_name || 'Thangapandian S'}</h2>
              <span className="coach-subtitle-role">{coach?.title || 'Wellness Coach & Founder'}</span>

              <p className="coach-description-text">
                {coach?.biography ||
                  'Coach Thangapandian S is dedicated to empowering individuals and families in Pudukkottai toward vibrant health through personalized nutrition and steady, sustainable habits.'}
              </p>

              <div className="coach-contact-pills">
                <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="coach-contact-pill">
                  <Phone size={14} />
                  <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
                <a
                  href={BUSINESS_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coach-contact-pill"
                >
                  <Instagram size={14} />
                  <span>@coach_pandian</span>
                </a>
                <div className="coach-contact-pill location">
                  <MapPin size={14} />
                  <span>Pudukkottai Center</span>
                </div>
              </div>

              <div className="coach-buttons-row">
                <Link to="/about" className="btn btn-primary">
                  <span>About Coach & Center</span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  <span>Book Initial Assessment</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GENUINE SUCCESS STORIES (IF AVAILABLE) */}
      {stories.length > 0 && (
        <section className="section stories-preview-section">
          <div className="container">
            <div className="section-header-compact">
              <span className="section-tag">Client Progress</span>
              <h2 className="section-title">Genuine Client Experiences</h2>
              <p className="section-subtitle">
                Stories from community members who revitalized their wellness through consistent
                habits.
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
                <strong>Individual Notice:</strong> Weight-loss and health outcomes are individual
                experiences that depend on personal dedication, lifestyle, and adherence. Results
                are never guaranteed.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 6. CLEAR CONTACT / ENQUIRY SECTION */}
      <section className="section home-contact-cta">
        <div className="container">
          <div className="home-cta-inner">
            <span className="section-tag">Take the First Step</span>
            <h2>Ready to improve your health and nutrition?</h2>
            <p>
              Connect directly with Coach Thangapandian S today for your personalized body composition
              screening and healthy lifestyle roadmap.
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
                <span>Send Web Enquiry</span>
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
