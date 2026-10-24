import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Sparkles,
  ShieldAlert,
  Users,
  ArrowRight
} from 'lucide-react';
import { dataService } from '../services/dataService';
import './SuccessStoriesPage.css';

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadStories() {
      try {
        const data = await dataService.getPublishedSuccessStories();
        if (mounted) {
          setStories(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching stories:', err);
        if (mounted) setLoading(false);
      }
    }
    loadStories();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="stories-page">
      {/* Header */}
      <section className="stories-header-section">
        <div className="container">
          <span className="section-tag">Client Transformations</span>
          <h1 className="stories-page-title">Client Success Stories</h1>
          <p className="stories-page-lead">
            Real experiences and journeys from individuals who built sustainable nutrition and
            lifestyle habits with Pudugai Wellness Center.
          </p>
        </div>
      </section>

      {/* Mandatory Results Disclaimer */}
      <section className="stories-disclaimer-wrap">
        <div className="container">
          <div className="disclaimer-banner">
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <ShieldAlert size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <div>
                <strong>Individual Results Notice:</strong> Stories and testimonials shared here
                reflect unique personal journeys and individual dedication. Weight-loss and
                wellness outcomes vary from person to person depending on consistency, metabolic
                profile, and adherence, and are never guaranteed.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Listing */}
      <section className="section stories-main-section">
        <div className="container">
          {loading ? (
            <div className="stories-loading-box">
              <div className="spinner"></div>
              <p>Loading published journeys...</p>
            </div>
          ) : stories.length > 0 ? (
            <div className="stories-grid-layout">
              {stories.map((story) => (
                <article
                  key={story.id}
                  className={`story-full-card ${story.language === 'ta' ? 'tamil-font-scope' : ''}`}
                >
                  {story.image_path && (
                    <div className="story-photo-box">
                      <img
                        src={story.image_path}
                        alt={`${story.client_name}'s journey`}
                        className="story-portrait"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="story-content-body">
                    <div className="story-meta-top">
                      <h3 className="story-author-name">{story.client_name}</h3>
                      {story.language === 'ta' ? (
                        <span className="lang-pill tamil">தமிழ் பதிவு</span>
                      ) : (
                        <span className="lang-pill english">English</span>
                      )}
                    </div>

                    {story.program_duration && (
                      <div className="story-duration-tag">
                        <Calendar size={14} />
                        <span>
                          {story.language === 'ta' ? 'திட்டம் கால அளவு: ' : 'Program Duration: '}
                          <strong>{story.program_duration}</strong>
                        </span>
                      </div>
                    )}

                    {story.title && (
                      <h4 className="story-headline">{story.title}</h4>
                    )}

                    <div className="story-text-container">
                      <p>{story.story}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Clean Empty State as strictly required by prompt */
            <div className="stories-empty-state-box">
              <div className="empty-state-icon">
                <Users size={48} />
              </div>
              <h2 className="empty-state-title">Client Stories are Being Prepared</h2>
              <p className="empty-state-desc">
                At Pudugai Wellness Center, we uphold strict ethical standards: we never create
                fictional reviews or use unverified stock testimonials. As clients complete their
                verified milestones and grant consent, their authentic journeys will be shared here.
              </p>
              <div className="empty-state-actions">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  <span>Start Your Personal Wellness Story</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/services" className="btn btn-secondary btn-lg">
                  <span>Explore Screening & Nutrition Plans</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Encouragement CTA */}
      <section className="section stories-cta-section">
        <div className="container">
          <div className="stories-encourage-card">
            <div className="encourage-icon">
              <Sparkles size={24} />
            </div>
            <h2>Your Journey Starts with One Step</h2>
            <p>
              Whether your goal is safe fat loss, healthy muscle gain, hormonal vitality, or higher
              daily energy, Coach Thangapandian S is ready to guide you.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              <span>Book Your First Session</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
