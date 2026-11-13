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
          <span className="section-tag">Coaches' Success Story</span>
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
                Before learning about good nutrition, Thangapandian and Thenmozhi had busy, stressful work routines. Long hours and irregular meals left them with little time to take care of their health.
              </p>
              <p>
                Skipping meals and eating on the go led to low energy and daily tiredness. They realized they needed a healthier, simpler way of living for their family.
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
                Their lives changed when they started focusing on balanced nutrition and simple daily habits. Instead of strict diets, they focused on a healthy breakfast, drinking enough water, daily movement, and good sleep.
              </p>
              <p>
                With these changes, they felt more energetic, lighter, and healthier. Experiencing these positive results inspired them to help others do the same.
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
                After seeing their own health improve, Thangapandian and Thenmozhi began guiding others. In December 2019, they started coaching part-time alongside their regular work.
              </p>
              <p>
                They started by helping family, friends, and neighbors in Pudukkottai with simple meal plans and body checks. Seeing their clients feel healthier and more confident confirmed that coaching was the right path.
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
                Over the next two years, more people in the community asked for their help. Guiding clients became their main focus.
              </p>
              <p>
                In December 2021, they stepped into full-time wellness coaching. This allowed them to spend every day guiding people with body checkups, custom food plans, and steady personal support.
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
                To give clients a friendly place to meet and learn, they opened Pudugai Wellness Center in Pudukkottai.
              </p>
              <p>
                The center is a welcoming space where people start their mornings with healthy nutrition, check their progress, and encourage each other to stay active and healthy.
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
                Through teamwork, continuous learning, and helping many clients improve their health, they achieved the Global Expansion Team (GET) Pin in September 2026.
              </p>
              <p>
                This milestone represents years of hard work, honest guidance, and building a supportive team of coaches.
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
                Looking back from December 2019 to their GET Pin milestone in September 2026, Thangapandian and Thenmozhi share their gratitude:
              </p>
              <div className="story-gratitude-list">
                <div className="gratitude-item">
                  <CheckCircle2 size={18} className="gratitude-icon" />
                  <div>
                    <strong>To Mentors & Leaders:</strong> For the guidance, training, and encouragement along the way.
                  </div>
                </div>
                <div className="gratitude-item">
                  <CheckCircle2 size={18} className="gratitude-icon" />
                  <div>
                    <strong>To Associate Coaches & Team:</strong> For working together with care and dedication every day.
                  </div>
                </div>
                <div className="gratitude-item">
                  <CheckCircle2 size={18} className="gratitude-icon" />
                  <div>
                    <strong>To Clients & the Community:</strong> For trusting our coaches and building healthy habits with us.
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Ethical Results Disclaimer */}
          <div className="story-disclaimer-card">
            <div className="disclaimer-header">
              <ShieldAlert size={20} className="disclaimer-icon" />
              <strong>Notice & Wellness Disclaimer</strong>
            </div>
            <p>
              The experiences and milestones shared here reflect the personal journey and dedication of Coach Thangapandian S and Coach Thenmozhi. Health and wellness results differ for each person and are not guaranteed. Our coaching and programs support general wellness and do not replace medical advice or treatments.
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