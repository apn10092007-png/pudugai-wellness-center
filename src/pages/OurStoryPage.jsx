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
            From personal vitality transformation to building Pudukkottai's trusted wellness
            community and achieving the Global Expansion Team (GET) milestone.
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
                Before discovering the power of balanced daily nutrition, Thangapandian and
                Thenmozhi led demanding, fast-paced everyday lives. Like many couples working hard
                to build their future, long work hours, unpredictable routines, and everyday
                financial pressures left little time to prioritize physical health.
              </p>
              <p>
                Skipping regular meals, relying on convenient but nutrient-deficient food choices,
                and neglecting basic hydration gradually resulted in declining daily energy and
                physical fatigue. They recognized that while they were working hard for their family,
                their vitality was being compromised—motivating them to seek a healthier, more
                purposeful path.
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
                Their journey changed fundamentally when they were introduced to structured, balanced
                cellular nutrition and simple lifestyle fundamentals. Rather than following extreme
                crash diets or exhausting restrictions, they adopted an approach rooted in consistent
                daily habits: quality morning nutrition, adequate hydration, gentle movement, and
                restorative sleep.
              </p>
              <p>
                Through this personal commitment, both Thangapandian and Thenmozhi experienced a
                profound renewal in their everyday stamina, digestive comfort, and general sense of
                well-being. Experiencing these positive, tangible results in their own daily lives
                convinced them of the value of balanced nutrition and sparked a genuine desire to
                share this knowledge with others.
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
                Energized by their own personal wellness progress, Thangapandian and Thenmozhi decided
                to begin mentoring others. In December 2019, they officially launched their wellness
                endeavor as part-time coaches.
              </p>
              <p>
                Balancing their existing daily responsibilities, they began by reaching out to family
                members, friends, and neighbors in Pudukkottai. They conducted initial wellness
                screenings, shared practical meal advice, and provided regular habit accountability.
                Seeing their earliest clients gain confidence and improve their daily energy affirmed
                that coaching was their true calling.
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
                Over the next two years, word of their compassionate, results-focused coaching spread
                throughout the local community. The growing number of individuals seeking their
                guidance made it clear that coaching deserved their undivided attention.
              </p>
              <p>
                In December 2021, Thangapandian and Thenmozhi took the definitive step to transition
                into full-time wellness coaching. Dedicating themselves completely enabled them to
                offer deep, personalized support—conducting scientific body composition evaluations,
                designing custom lifestyle roadmaps, and providing continuous daily encouragement for
                their clients.
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
                To provide a warm, physical gathering space for their wellness family, Thangapandian
                and Thenmozhi established their dedicated Nutrition Club—Pudugai Wellness Center—in
                Pudukkottai.
              </p>
              <p>
                The nutrition club was envisioned not merely as an assessment office, but as a vibrant
                social hub where people start their mornings with wholesome nutrition, track their
                body composition metrics (BMI, BMR, visceral fat, muscle mass), exchange encouragement,
                and learn lifelong healthy eating practices in a positive atmosphere.
              </p>
            </div>
          </article>

          {/* Section 6 */}
          <article className="story-block featured-milestone">
            <div className="story-block-num">06</div>
            <div className="story-block-body">
              <span className="story-block-tag">International Achievement</span>
              <h2 className="story-block-heading">
                6. Achieving Global Expansion Team (GET) Pin – September 2026
              </h2>
              <p>
                Through relentless dedication, teamwork, professional leadership, and hundreds of
                positive client milestones across Pudukkottai, Thangapandian and Thenmozhi reached a
                landmark organizational achievement in September 2026: qualifying for the prestigious
                <strong> Global Expansion Team (GET) Pin</strong>.
              </p>
              <p>
                This achievement reflects years of continuous personal learning, high ethical
                coaching standards, and the flourishing associate coaching team they have trained,
                mentored, and supported across the region.
              </p>
            </div>
          </article>

          {/* Section 7 */}
          <article className="story-block">
            <div className="story-block-num">07</div>
            <div className="story-block-body">
              <span className="story-block-tag">Heartfelt Appreciation</span>
              <h2 className="story-block-heading">7. Gratitude to Their Mentors, Team and Community</h2>
              <p>
                Looking back from their humble beginnings in December 2019 to qualifying for the Global
                Expansion Team Pin in September 2026, Thangapandian and Thenmozhi extend their heartfelt
                gratitude:
              </p>
              <div className="story-gratitude-list">
                <div className="gratitude-item">
                  <CheckCircle2 size={18} className="gratitude-icon" />
                  <div>
                    <strong>To Their Respected Mentors & Leaders:</strong> For their patient guidance,
                    invaluable leadership training, and constant inspiration that guided their path.
                  </div>
                </div>
                <div className="gratitude-item">
                  <CheckCircle2 size={18} className="gratitude-icon" />
                  <div>
                    <strong>To Their Associate Coaches & Team:</strong> For their shared passion, hard
                    work, and commitment to touching lives with genuine care every day.
                  </div>
                </div>
                <div className="gratitude-item">
                  <CheckCircle2 size={18} className="gratitude-icon" />
                  <div>
                    <strong>To the Pudukkottai Community & Clients:</strong> For trusting them with
                    their health, embracing wholesome daily habits, and inspiring everyone with their
                    personal milestones.
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Ethical Results Disclaimer */}
          <div className="story-disclaimer-card">
            <div className="disclaimer-header">
              <ShieldAlert size={20} className="disclaimer-icon" />
              <strong>Ethical Notice & Wellness Disclaimer</strong>
            </div>
            <p>
              The health, vitality, and organizational milestones described in this story represent the
              personal experiences and individual effort of Coach Thangapandian S and Coach Thenmozhi.
              Nutritional plans, lifestyle modifications, and wellness coaching work in harmony with
              personal consistency, balanced diet, and active living. Results are individual and not
              guaranteed. Nutrition products, programs, and coaching do not diagnose, treat, prevent,
              or cure any medical condition.
            </p>
          </div>

          {/* Bottom Action CTA */}
          <div className="story-cta-box">
            <span className="section-tag">Begin Your Wellness Story</span>
            <h2>Ready to start your personal journey with Coach Thangapandian & Coach Thenmozhi?</h2>
            <p>
              Visit our Pudukkottai center for a comprehensive body composition screening and a
              tailored everyday nutrition roadmap.
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
                <span>Book Initial Screening</span>
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