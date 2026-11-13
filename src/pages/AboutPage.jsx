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
          <span className="section-tag">About Us</span>
          <h1 className="about-page-title">Pudugai Wellness Center</h1>
          <p className="about-page-lead">
            Simple health, nutrition, and lifestyle guidance across our Pudukkottai and Peravurani locations, led by Coaches Thangapandian S and Thenmozhi.
          </p>
        </div>
      </section>

      {/* 2. Coach Profiles (Both Coaches) */}
      <section className="section about-coach-section">
        <div className="container">
          <div className="section-header-compact">
            <span className="section-tag">Our Team</span>
            <h2 className="section-title">Meet Your Wellness Coaches</h2>
            <p className="section-subtitle">
              Helping you build healthy eating habits and active daily routines.
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
              <span className="section-tag">Our Journey</span>
              <h3>How We Started and Grew</h3>
              <p>
                We started part-time in December 2019, opened our own Nutrition Club, and achieved the Global Expansion Team (GET) Pin in September 2026.
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
              <h3>Our Mission</h3>
              <p>
                {content?.mission ||
                  'To help people and families live healthier, more active lives through simple food plans, body checkups, and friendly coaching.'}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Compass size={22} />
              </div>
              <h3>How We Help You</h3>
              <p>
                {content?.approach_intro ||
                  'We do not believe in strict diets or tiring workouts. We focus on good everyday food, plenty of water, proper sleep, light activity, and steady support.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
