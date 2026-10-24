import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  Activity,
  Heart,
  Scale,
  Sparkles,
  Users,
  MapPin,
  Calendar
} from 'lucide-react';
import { InstagramIcon as Instagram } from '../components/Icons';
import { dataService } from '../services/dataService';
import './HomePage.css';

export default function HomePage() {
  const [coach, setCoach] = useState(null);
  const [services, setServices] = useState([]);
  const [stories, setStories] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const [coachData, servicesData, storiesData, contentData] = await Promise.all([
          dataService.getCoachProfile(),
          dataService.getPublishedServices(),
          dataService.getPublishedSuccessStories(),
          dataService.getSiteContent('about_page')
        ]);
        if (mounted) {
          setCoach(coachData);
          setServices(servicesData);
          setStories(storiesData);
          setContent(contentData);
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
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} className="badge-sparkle" />
              <span>Nutrition • Fitness • Wellness</span>
            </div>
            <h1 className="hero-title">
              Real Wellness for Your <span className="highlight-text">Real Life</span>.
            </h1>
            <p className="hero-description">
              Personalized health, nutrition, and lifestyle coaching in Pudukkottai,
              guided by <strong>Coach Thangapandian S</strong>. Build sustainable daily habits
              without harsh restrictions or temporary fixes.
            </p>

            <div className="hero-cta-group">
              <Link to="/contact" className="btn btn-primary btn-lg">
                <span>Book a Consultation</span>
                <ArrowRight size={18} />
              </Link>
              <a href="tel:9443443261" className="btn btn-secondary btn-lg">
                <Phone size={18} />
                <span>Call: 94434 43261</span>
              </a>
            </div>

            <div className="hero-features-strip">
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Personalized Nutrition Plans</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Body Composition Screenings</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Dedicated 1-on-1 Coaching</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <img
                src="/assets/hero-wellness.jpg"
                alt="Pudugai Wellness Center Lifestyle"
                className="hero-main-img"
              />
              <div className="hero-floating-badge">
                <div className="floating-badge-icon">
                  <Activity size={20} />
                </div>
                <div>
                  <span className="badge-title">Personalized Guidance</span>
                  <span className="badge-sub">Pudukkottai Center</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION & CORE VALUES */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-card">
            <div className="intro-badge">About Pudugai Wellness Center</div>
            <h2 className="intro-heading">
              A thoughtful, supportive approach to lasting health.
            </h2>
            <p className="intro-text">
              At Pudugai Wellness Center (PWC), we believe that vibrant health is not achieved
              through unsustainable starvation or extreme workout routines. True transformation
              comes from understanding your unique body, balancing your daily nourishment, and
              receiving continuous personal encouragement.
            </p>

            <div className="pillars-grid">
              <div className="pillar-card">
                <div className="pillar-icon-wrap green">
                  <Scale size={24} />
                </div>
                <h3>Body Analysis</h3>
                <p>
                  Assess BMI, visceral fat, muscle balance, and metabolic rate before designing your path.
                </p>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon-wrap teal">
                  <Heart size={24} />
                </div>
                <h3>Tailored Nutrition</h3>
                <p>
                  Wholesome, practical meal plans structured around real, everyday foods and lifestyle habits.
                </p>
              </div>

              <div className="pillar-card">
                <div className="pillar-icon-wrap amber">
                  <Users size={24} />
                </div>
                <h3>Direct Coach Support</h3>
                <p>
                  Ongoing guidance and accountability with Coach Thangapandian S every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COACH PROFILE PREVIEW */}
      <section className="section coach-preview-section">
        <div className="container">
          <div className="coach-preview-card">
            <div className="coach-preview-img-wrap">
              {coach?.image_path ? (
                <img
                  src={coach.image_path}
                  alt={`Coach ${coach.coach_name}`}
                  className="coach-preview-img"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/coach-pandian.png';
                  }}
                />
              ) : (
                <div className="coach-avatar-placeholder">
                  <Users size={48} />
                </div>
              )}
              <div className="coach-badge-overlay">
                <span>Verified Coach</span>
              </div>
            </div>

            <div className="coach-preview-info">
              <span className="section-tag">Meet Your Coach</span>
              <h2 className="coach-name">{coach?.coach_name || 'Thangapandian S'}</h2>
              <span className="coach-role">{coach?.title || 'Wellness Coach & Founder'}</span>

              <p className="coach-bio-text">
                {coach?.biography ||
                  'Dedicated to empowering individuals and families in Pudukkottai toward vibrant health through personalized nutrition and steady, sustainable habits.'}
              </p>

              <div className="coach-contact-pills">
                <a href="tel:9443443261" className="coach-pill">
                  <Phone size={15} />
                  <span>94434 43261</span>
                </a>
                <a
                  href={coach?.instagram_url || 'https://www.instagram.com/coach_pandian'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coach-pill"
                >
                  <Instagram size={15} />
                  <span>@coach_pandian</span>
                </a>
                <div className="coach-pill location">
                  <MapPin size={15} />
                  <span>Pudukkottai Center</span>
                </div>
              </div>

              <div className="coach-cta-row">
                <Link to="/about" className="btn btn-primary">
                  <span>Read Full Coach Journey</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  <span>Schedule Assessment</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES OVERVIEW */}
      <section className="section services-overview-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Comprehensive Wellness</span>
            <h2 className="section-title">Programs Designed For Your Body</h2>
            <p className="section-subtitle">
              From targeted weight management and health screening to special family programs
              and vital wellness solutions.
            </p>
          </div>

          <div className="services-grid">
            {featuredServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-category-tag">{service.category}</div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
                <Link to="/services" className="service-learn-link">
                  <span>Explore Program</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          <div className="services-footer-cta">
            <Link to="/services" className="btn btn-outline btn-lg">
              <span>View All 18+ Wellness Services & Screenings</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SUCCESS STORIES PREVIEW */}
      <section className="section stories-preview-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Genuine Client Transformations</span>
            <h2 className="section-title">Stories of Sustainable Progress</h2>
            <p className="section-subtitle">
              Read real experiences from community members who revitalized their energy,
              health markers, and wellness with Coach Thangapandian S.
            </p>
          </div>

          {stories.length > 0 ? (
            <div className="stories-grid">
              {stories.slice(0, 3).map((item) => (
                <div key={item.id} className="story-card">
                  {item.image_path && (
                    <img
                      src={item.image_path}
                      alt={item.client_name}
                      className="story-card-img"
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
          ) : (
            <div className="stories-empty-preview">
              <Users size={36} className="empty-icon" />
              <h3>Client Transformations Coming Soon</h3>
              <p>
                We only publish genuine, client-approved wellness stories. Visit our center or
                connect with Coach Thangapandian S to embark on your personal journey.
              </p>
              <Link to="/contact" className="btn btn-primary btn-sm">
                <span>Start Your Transformation</span>
              </Link>
            </div>
          )}

          <div className="disclaimer-banner" style={{ marginTop: '2.5rem' }}>
            <p>
              <strong>Notice:</strong> Weight-loss and health outcomes are individual experiences
              and depend on consistency, lifestyle, and unique biological factors. Results are
              never guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BUSINESS JOURNEY HIGHLIGHTS */}
      {content?.journey_milestones && (
        <section className="section journey-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Our Journey</span>
              <h2 className="section-title">Committed to Pudukkottai's Health</h2>
              <p className="section-subtitle">
                A community-centered commitment to genuine wellness and mindful nutrition.
              </p>
            </div>

            <div className="journey-grid">
              {content.journey_milestones.map((milestone, idx) => (
                <div key={idx} className="journey-card">
                  <div className="journey-step-number">{idx + 1}</div>
                  <span className="journey-year">{milestone.year}</span>
                  <h3 className="journey-title">{milestone.title}</h3>
                  <p className="journey-desc">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. CONTACT & ENQUIRY CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <span className="cta-banner-tag">Begin Today</span>
              <h2 className="cta-banner-title">
                Ready to transform your health and nutrition?
              </h2>
              <p className="cta-banner-desc">
                Contact Coach Thangapandian S today for your personalized body composition
                screening and custom wellness roadmap.
              </p>
              <div className="cta-banner-buttons">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  <span>Send an Enquiry</span>
                  <ArrowRight size={18} />
                </Link>
                <a href="tel:9443443261" className="btn btn-secondary btn-lg">
                  <Phone size={18} />
                  <span>Call 94434 43261</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
