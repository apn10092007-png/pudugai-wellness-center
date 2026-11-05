import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  ArrowRight,
  Target,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { InstagramIcon as Instagram, WhatsAppIcon } from '../components/Icons';
import { dataService } from '../services/dataService';
import { BUSINESS_CONFIG } from '../config/business';
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
            Dedicated health, nutrition, and lifestyle guidance in Pudukkottai, led by
            Wellness Coach Thangapandian S.
          </p>
        </div>
      </section>

      {/* 2. Coach Profile (Verified & Concise) */}
      <section className="section about-coach-section">
        <div className="container">
          <div className="about-coach-grid">
            <div className="about-coach-media">
              <img
                src={coach?.image_path || '/assets/coach-pandian.png'}
                alt={coach?.coach_name || 'Coach Thangapandian S'}
                className="about-coach-img"
                onError={(e) => {
                  e.currentTarget.src = '/assets/coach-pandian.png';
                }}
              />
            </div>

            <div className="about-coach-info">
              <span className="section-tag">Founder & Wellness Coach</span>
              <h2 className="about-coach-name">{coach?.coach_name || 'Thangapandian S'}</h2>
              <p className="about-coach-role">{coach?.title || 'Wellness Coach & Founder'}</p>

              <div className="about-coach-bio">
                <p>
                  {coach?.biography ||
                    'Thangapandian S is dedicated to guiding individuals and families in Pudukkottai toward sustainable, healthy lifestyle habits.'}
                </p>
                <p>
                  At Pudugai Wellness Center, coaching begins with a detailed body composition
                  assessment (BMI, BMR, visceral fat, muscle mass). Nutrition plans are then tailored
                  around your daily routine and food preferences without extreme restrictions.
                </p>
              </div>

              <div className="about-coach-contact">
                <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="about-pill">
                  <Phone size={14} />
                  <span>Call: {BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hello%20Coach%20Thangapandian!%20I%20would%20like%20to%20learn%20more%20about%20PWC.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-pill whatsapp"
                >
                  <WhatsAppIcon size={14} />
                  <span>WhatsApp Coach</span>
                </a>
                <a
                  href={BUSINESS_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-pill"
                >
                  <Instagram size={14} />
                  <span>@coach_pandian</span>
                </a>
                <div className="about-pill location">
                  <MapPin size={14} />
                  <span>Pudukkottai Center</span>
                </div>
              </div>

              <div className="about-action-row">
                <Link to="/contact" className="btn btn-primary">
                  <span>Schedule Consultation</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/services" className="btn btn-secondary">
                  <span>Explore Programs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Practical Approach */}
      <section className="section about-values-section">
        <div className="container">
          <div className="about-values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Target size={22} />
              </div>
              <h3>Our Center Mission</h3>
              <p>
                {content?.mission ||
                  'To empower individuals and families to achieve better vitality through personalized nutrition plans, body composition analysis, and consistent, supportive coaching.'}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Compass size={22} />
              </div>
              <h3>Our Philosophy</h3>
              <p>
                {content?.approach_intro ||
                  'We do not believe in quick-fix crash diets or extreme workouts. Our model emphasizes balanced daily nutrition, restorative sleep, gentle movement, and sustainable habit accountability.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
