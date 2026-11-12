import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  ArrowRight,
  Target,
  Compass
} from 'lucide-react';
import { InstagramIcon as Instagram } from '../components/Icons';
import { dataService } from '../services/dataService';
import { BUSINESS_CONFIG } from '../config/business';
import './AboutPage.css';

export default function AboutPage() {
  const [coaches, setCoaches] = useState([]);
  const [content, setContent] = useState(null);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchAboutData() {
      try {
        const [coachesData, contentData] = await Promise.all([
          dataService.getAllCoaches(),
          dataService.getSiteContent('about_page')
        ]);
        if (mounted) {
          setCoaches(coachesData || []);
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
            Wellness Coaches Thangapandian S and Thenmozhi.
          </p>
        </div>
      </section>

      {/* 2. Coach Profiles (Both Coaches) */}
      <section className="section about-coach-section">
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">Leadership & Guidance</span>
            <h2 className="section-title">Our Dedicated Wellness Coaches</h2>
            <p className="section-subtitle">
              Personalized health, nutrition, and lifestyle mentoring led by Coach Thangapandian S & Coach Thenmozhi.
            </p>
          </div>

          <div className="about-coaches-grid">
            {coaches.map((c) => (
              <div key={c.id || c.coach_name} className="about-coach-card">
                <div className="about-coach-media">
                  <img
                    src={c.image_path || (c.coach_name.includes('Thenmozhi') ? '/assets/avatar-thenmozhi.svg' : '/assets/coach-pandian.png')}
                    alt={c.coach_name}
                    className="about-coach-img"
                    onError={(e) => {
                      e.currentTarget.src = c.coach_name.includes('Thenmozhi') ? '/assets/avatar-thenmozhi.svg' : '/assets/coach-pandian.png';
                    }}
                  />
                </div>

                <div className="about-coach-info">
                  <span className="section-tag">{c.title || 'Wellness Coach'}</span>
                  <h3 className="about-coach-name">{c.coach_name}</h3>
                  <p className="about-coach-role">{c.title}</p>

                  <div className="about-coach-bio">
                    <p>{c.biography}</p>
                  </div>

                  <div className="about-coach-contact">
                    <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="about-pill">
                      <Phone size={14} />
                      <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                    </a>
                    {c.instagram_url ? (
                      <a
                        href={c.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-pill"
                      >
                        <Instagram size={14} />
                        <span>Instagram</span>
                      </a>
                    ) : null}
                    <div className="about-pill location">
                      <MapPin size={14} />
                      <span>Pudukkottai Center</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dedicated Coaches' Story Banner */}
          <div className="about-story-banner">
            <div className="about-story-text">
              <span className="section-tag">Coaches' Journey</span>
              <h3>Our Journey of Transformation and Growth</h3>
              <p>
                From starting part-time in December 2019 to opening their Nutrition Club and achieving the Global Expansion Team (GET) Pin in September 2026.
              </p>
            </div>
            <Link to="/our-story" className="btn btn-primary btn-lg">
              <span>Read Our Full Story</span>
              <ArrowRight size={17} />
            </Link>
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
