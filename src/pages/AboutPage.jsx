import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Target,
  Heart,
  CheckCircle2,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Award,
  Users
} from 'lucide-react';
import { InstagramIcon as Instagram } from '../components/Icons';
import { dataService } from '../services/dataService';
import './AboutPage.css';

export default function AboutPage() {
  const [coach, setCoach] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchAboutData() {
      try {
        const [coachData, contentData] = await Promise.all([
          dataService.getCoachProfile(),
          dataService.getSiteContent('about_page')
        ]);
        if (mounted) {
          setCoach(coachData);
          setContent(contentData);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load about data:', err);
        if (mounted) setLoading(false);
      }
    }
    fetchAboutData();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="about-page">
      {/* 1. Header Banner */}
      <section className="about-header-section">
        <div className="container">
          <span className="section-tag">About Our Center</span>
          <h1 className="about-page-title">Pudugai Wellness Center</h1>
          <p className="about-page-lead">
            A dedicated center for lifestyle, nutrition, and holistic vitality in Pudukkottai,
            guided by Wellness Coach Thangapandian S.
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="section mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="card mv-card">
              <div className="mv-icon-wrap mission">
                <Target size={28} />
              </div>
              <span className="mv-tag">Our Mission</span>
              <h2 className="mv-title">Empowering Everyday Health</h2>
              <p className="mv-text">
                {content?.mission ||
                  'To empower people of all ages to achieve their highest vitality through personalized nutrition plans, body composition analysis, and consistent, supportive coaching.'}
              </p>
            </div>

            <div className="card mv-card">
              <div className="mv-icon-wrap vision">
                <Compass size={28} />
              </div>
              <span className="mv-tag">Our Vision</span>
              <h2 className="mv-title">A Thriving Community</h2>
              <p className="mv-text">
                {content?.vision ||
                  "To become Pudukkottai's most trusted and compassionate wellness community, where healthy living is accessible, sustainable, and joyful."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC COACH PROFILE SECTION */}
      <section className="section coach-detail-section">
        <div className="container">
          <div className="coach-profile-wrapper">
            <div className="coach-image-column">
              <div className="coach-portrait-card">
                {coach?.image_path ? (
                  <img
                    src={coach.image_path}
                    alt={coach.coach_name}
                    className="coach-portrait-img"
                    onError={(e) => {
                      // Fallback if network or invalid URL
                      e.currentTarget.src = '/assets/coach-pandian.png';
                    }}
                  />
                ) : (
                  <div className="coach-portrait-empty">
                    <Users size={64} className="placeholder-icon" />
                    <span>Coach Profile Photograph</span>
                  </div>
                )}
                <div className="coach-seal-badge">
                  <Award size={16} />
                  <span>Founder & Coach</span>
                </div>
              </div>
            </div>

            <div className="coach-bio-column">
              <span className="section-tag">Leadership & Coaching</span>
              <h2 className="coach-full-name">{coach?.coach_name || 'Thangapandian S'}</h2>
              <p className="coach-official-role">
                {coach?.title || 'Wellness Coach & Founder'}
              </p>

              <div className="coach-bio-content">
                <p>
                  {coach?.biography ||
                    'Thangapandian S is dedicated to guiding individuals and families toward healthier, more active, and balanced lifestyles. At Pudugai Wellness Center, the coaching philosophy is rooted in sustainable daily habits, wholesome nutrition, and gradual, realistic progress without extreme or unsustainable restrictions.'}
                </p>
                <p>
                  Coach Thangapandian works closely with each individual, starting with a
                  thorough body composition evaluation to understand baseline parameters such as
                  BMI, body fat, muscle ratio, and metabolic age. Every program is then calibrated
                  to the individual’s daily routine, culinary preferences, and personal goals.
                </p>
              </div>

              {/* Verified Coach Details */}
              <div className="coach-meta-box">
                <div className="meta-row">
                  <Phone size={18} className="meta-icon" />
                  <div>
                    <span className="meta-label">Direct Phone:</span>
                    <a href="tel:9443443261" className="meta-val highlight">
                      94434 43261
                    </a>
                  </div>
                </div>

                <div className="meta-row">
                  <Instagram size={18} className="meta-icon" />
                  <div>
                    <span className="meta-label">Instagram:</span>
                    <a
                      href={coach?.instagram_url || 'https://www.instagram.com/coach_pandian?exln=YmNsbjZkeXQ1dnc3'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="meta-val"
                    >
                      @coach_pandian
                    </a>
                  </div>
                </div>

                <div className="meta-row">
                  <MapPin size={18} className="meta-icon" />
                  <div>
                    <span className="meta-label">Center Address (Pudukkottai):</span>
                    <p className="meta-val">
                      {coach?.address_en || 'E Main Rd, T Nagar, Buvaneswari Nagar, Pudukkottai, Tamil Nadu 622001'}
                    </p>
                    <p className="meta-val tamil-text">
                      {coach?.address_ta || 'கிழக்கு முதன்மை சாலை, டி நகர், புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="coach-action-buttons">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  <span>Connect with Coach</span>
                </Link>
                <Link to="/services" className="btn btn-secondary btn-lg">
                  <span>Browse Programs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Wellness Approach */}
      <section className="section approach-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Methodology</span>
            <h2 className="section-title">The PWC Wellness Philosophy</h2>
            <p className="section-subtitle">
              {content?.approach_intro ||
                'We do not believe in quick-fix crash diets or exhausting extremes. Our wellness model focuses on balanced daily nutrition, hydration, restorative sleep, gentle active movement, and habit accountability.'}
            </p>
          </div>

          <div className="approach-grid">
            <div className="approach-step-card">
              <span className="step-num">01</span>
              <h3>Assess First</h3>
              <p>
                We begin with a scientific body composition scan to measure muscle, visceral fat,
                and resting metabolic rate.
              </p>
            </div>

            <div className="approach-step-card">
              <span className="step-num">02</span>
              <h3>Personalize Nutrition</h3>
              <p>
                A tailored eating plan designed around realistic, local foods you enjoy and can
                comfortably prepare.
              </p>
            </div>

            <div className="approach-step-card">
              <span className="step-num">03</span>
              <h3>Daily Habits</h3>
              <p>
                Building daily consistency with hydration, physical activity, restful sleep, and
                stress mindfulness.
              </p>
            </div>

            <div className="approach-step-card">
              <span className="step-num">04</span>
              <h3>Track & Refine</h3>
              <p>
                Regular check-ins with Coach Thangapandian S to adjust plans as your body adapts
                and improves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Business Journey Milestones */}
      {content?.journey_milestones && (
        <section className="section timeline-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Milestones</span>
              <h2 className="section-title">Our Growth & Community Journey</h2>
            </div>

            <div className="timeline-container">
              {content.journey_milestones.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                  </div>
                  <div className="timeline-card">
                    <span className="timeline-phase">{item.year}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Medical Disclaimer Alert */}
      <div className="container" style={{ marginBottom: '4rem' }}>
        <div className="disclaimer-banner">
          <p>
            <strong>Official Center Notice:</strong> Pudugai Wellness Center provides nutritional
            and lifestyle coaching. Our services are not intended as medical prescriptions, clinical
            diagnoses, or treatments for chronic medical conditions. Always consult your personal
            physician for medical concerns.
          </p>
        </div>
      </div>
    </div>
  );
}
