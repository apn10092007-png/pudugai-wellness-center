import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Scale,
  Activity,
  HeartPulse,
  Apple,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Phone
} from 'lucide-react';
import { dataService } from '../services/dataService';
import './ServicesPage.css';

const CATEGORIES = [
  'All Programs',
  'Weight Management',
  'Health Screening',
  'Special Programs',
  'Nutrition Guidance',
  'Wellness Solutions'
];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Programs');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await dataService.getPublishedServices();
        if (mounted) {
          setServices(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const filteredServices = services.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Programs' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Weight Management':
        return <Scale size={18} />;
      case 'Health Screening':
        return <Activity size={18} />;
      case 'Special Programs':
        return <Sparkles size={18} />;
      case 'Nutrition Guidance':
        return <Apple size={18} />;
      case 'Wellness Solutions':
        return <HeartPulse size={18} />;
      default:
        return <Activity size={18} />;
    }
  };

  return (
    <div className="services-page">
      {/* Header */}
      <section className="services-header-section">
        <div className="container">
          <span className="section-tag">What We Offer</span>
          <h1 className="services-main-title">Wellness Programs & Body Checks</h1>
          <p className="services-main-lead">
            Personal food plans, simple body checkups, and daily habit coaching to fit your life.
          </p>
        </div>
      </section>

      {/* Medical Disclaimer Banner */}
      <section className="services-disclaimer-section">
        <div className="container">
          <div className="disclaimer-banner">
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <ShieldAlert size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <div>
                <strong>Important Note:</strong> Pudugai Wellness Center offers food, lifestyle, and
                wellness coaching. Our programs and body checks are for general health and education.
                They do not replace medical advice, prescriptions, or hospital treatments.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="services-control-section">
        <div className="container">
          <div className="control-bar-inner">
            {/* Category tabs */}
            <div className="category-tabs-scroll">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`cat-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat !== 'All Programs' && (
                    <span className="cat-icon">{getCategoryIcon(cat)}</span>
                  )}
                  <span>{cat}</span>
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="search-box-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search programs or checks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section services-grid-section">
        <div className="container">
          {loading ? (
            <div className="services-loading-state">
              <div className="spinner"></div>
              <p>Loading wellness services...</p>
            </div>
          ) : filteredServices.length > 0 ? (
            <div className="services-cards-grid">
              {filteredServices.map((service) => (
                <div key={service.id} className="service-detail-card">
                  <div className="service-card-top">
                    <span className="card-category-badge">
                      {getCategoryIcon(service.category)}
                      <span>{service.category}</span>
                    </span>
                  </div>

                  <h3 className="card-service-title">{service.title}</h3>
                  <p className="card-service-desc">{service.description}</p>

                  <div className="card-footer-action">
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="btn btn-outline btn-sm"
                    >
                      <span>Ask About This</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="services-empty-state">
              <h3>No programs found</h3>
              <p>Try a different search word or select another category.</p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSelectedCategory('All Programs');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Consultation Call to Action */}
      <section className="section services-cta-section">
        <div className="container">
          <div className="services-consultation-banner">
            <div>
              <h2>Not sure which program is right for you?</h2>
              <p>
                Visit either of our centers in Pudukkottai or Peravurani, or contact our team for a simple body checkup.
              </p>
            </div>
            <div className="consult-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                <span>Book a Consultation</span>
              </Link>
              <a href="tel:9443443261" className="btn btn-secondary btn-lg">
                <Phone size={18} />
                <span>94434 43261</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
