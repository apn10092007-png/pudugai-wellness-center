import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Compass,
  Building,
  ShieldAlert,
  ArrowRight,
  Phone,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { WhatsAppIcon } from '../components/Icons';
import { BUSINESS_CONFIG } from '../config/business';
import './OurStoryPage.css';

export default function OurStoryPage() {
  const milestones = [
    { date: 'December 2019', title: 'Part-Time Coaching Begins', icon: Compass },
    { date: 'December 2021', title: 'Transition to Full-Time Coaches', icon: Award },
    { date: 'Community Hub', title: 'Opening Pudugai Nutrition Club', icon: Building },
    { date: 'September 2026', title: 'Global Expansion Team (GET) Pin', icon: Sparkles }
  ];

  return (
    <div className="our-story-page">
      {/* 1. Header Banner */}
      <section className="story-header-section">
        <div className="container">
          <Link to="/" className="story-back-link">
            ← Return to Home
          </Link>
          <span className="section-tag">Coaches' Story</span>
          <h1 className="story-main-title">Our Story – Thangapandian & Thenmozhi</h1>
          <p className="story-subtitle-lead">
            How Thangapandian and Thenmozhi started with simple nutrition habits, grew into full-time coaches, and built a healthy community.
          </p>
        </div>
      </section>

      {/* 2. Key Milestones Bar */}
      <section className="story-milestones-bar">
        <div className="container">
          <div className="milestones-track">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="milestone-chip">
                  <div className="milestone-chip-icon">
                    <Icon size={18} />
                  </div>
                  <div className="milestone-chip-text">
                    <span className="milestone-date">{m.date}</span>
                    <strong className="milestone-label">{m.title}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Story Narrative */}
      <section className="section story-content-section">
        <div className="container story-container">
          {/* Section 1 */}
          <article className="story-block">
            <div className="story-block-num">01</div>
            <div className="story-block-body">
              <span className="story-block-tag">The Beginning</span>
              <h2 className="story-block-heading">1. Their Early Challenges</h2>
              <p>
                Long work hours, irregular meals, and daily stress left Thangapandian and Thenmozhi feeling tired and low on energy. They realized they needed to make their family's health a priority.
              </p>
            </div>
          </article>

          {/* Section 2 */}
          <article className="story-block">
            <div className="story-block-num">02</div>
            <div className="story-block-body">
              <span className="story-block-tag">The Turning Point</span>
              <h2 className="story-block-heading">2. Discovering Nutrition and Personal Transformation</h2>
              <p>
                They focused on simple daily habits: a healthy breakfast, proper hydration, light activity, and good sleep. Feeling more energetic and healthier inspired them to share these habits with others.
              </p>
            </div>
          </article>

          {/* Section 3 */}
          <article className="story-block">
            <div className="story-block-num">03</div>
            <div className="story-block-body">
              <span className="story-block-tag">Milestone • December 2019</span>
              <h2 className="story-block-heading">3. Starting Their Coaching Journey – December 2019</h2>
              <p>
                In December 2019, they began part-time coaching for family, friends, and neighbors in Pudukkottai. Helping people eat better and gain energy showed them the true value of personal coaching.
              </p>
            </div>
          </article>

          {/* Section 4 */}
          <article className="story-block">
            <div className="story-block-num">04</div>
            <div className="story-block-body">
              <span className="story-block-tag">Milestone • December 2021</span>
              <h2 className="story-block-heading">4. Becoming Full-Time Coaches – December 2021</h2>
              <p>
                As more people asked for guidance, coaching became their full-time focus. In December 2021, they dedicated themselves completely to guiding clients with body checkups and personal meal plans.
              </p>
            </div>
          </article>

          {/* Section 5 */}
          <article className="story-block">
            <div className="story-block-num">05</div>
            <div className="story-block-body">
              <span className="story-block-tag">Community Hub</span>
              <h2 className="story-block-heading">5. Opening Their Nutrition Club</h2>
              <p>
                They opened Pudugai Wellness Center in Pudukkottai as a welcoming space for the community. Here, members start their mornings with good nutrition, check their progress, and encourage each other.
              </p>
            </div>
          </article>

          {/* Section 6 */}
          <article className="story-block featured-milestone">
            <div className="story-block-num">06</div>
            <div className="story-block-body">
              <span className="story-block-tag">Milestone • September 2026</span>
              <h2 className="story-block-heading">
                6. Achieving Global Expansion Team (GET) Pin – September 2026
              </h2>
              <p>
                In September 2026, they achieved the Global Expansion Team (GET) Pin. This milestone reflects years of teamwork, continuous learning, and dedicated service to the community.
              </p>
            </div>
          </article>

          {/* Section 7 */}
          <article className="story-block">
            <div className="story-block-num">07</div>
            <div className="story-block-body">
              <span className="story-block-tag">Gratitude</span>
              <h2 className="story-block-heading">7. Gratitude to Mentors, Team and Community</h2>
              <p>
                Thangapandian and Thenmozhi are deeply grateful to everyone who supported their journey:
              </p>
              <div className="story-gratitude-list">
                <div className="gratitude-item">
                  <CheckCircle2 size={18} className="gratitude-icon" />
                  <div>
                    <strong>Mentors & Leaders:</strong> For guidance and encouragement from day one.
                  </div>
                </div>
                <div className="gratitude-item">
                  <CheckCircle2 size={18} className="gratitude-icon" />
                  <div>
                    <strong>Associate Coaches:</strong> For working together every day with care and dedication.
                  </div>
                </div>
                <div className="gratitude-item">
                  <CheckCircle2 size={18} className="gratitude-icon" />
                  <div>
                    <strong>Clients & Community:</strong> For trusting our coaches and building healthy habits with us.
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Ethical Results Disclaimer */}
          <div className="story-disclaimer-card">
            <div className="disclaimer-header">
              <ShieldAlert size={20} className="disclaimer-icon" />
              <strong>Notice & Disclaimer</strong>
            </div>
            <p>
              These milestones reflect the personal journey of Coach Thangapandian S and Coach Thenmozhi. Individual wellness results differ and are not guaranteed. Our coaching supports general health and does not replace medical advice.
            </p>
          </div>

          {/* Bottom Action CTA */}
          <div className="story-cta-box">
            <span className="section-tag">Start Today</span>
            <h2>Ready to start your personal wellness journey?</h2>
            <p>
              Visit our center or contact our team for a simple body checkup and personal food plan.
            </p>
            <div className="story-cta-actions">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hello%20Coach%20Thangapandian%20and%20Coach%20Thenmozhi!%20I%20read%20your%20story%20and%20would%20like%20to%20schedule%20an%20assessment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <WhatsAppIcon size={18} />
                <span>Chat on WhatsApp</span>
              </a>
              <Link to="/contact" className="btn btn-primary btn-lg">
                <span>Book a Consultation</span>
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