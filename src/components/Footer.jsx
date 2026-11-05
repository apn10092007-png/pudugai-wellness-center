import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { InstagramIcon as Instagram } from './Icons';
import { BUSINESS_CONFIG } from '../config/business';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* ============================================================== */}
      {/* 1. COMPACT PROFESSIONAL MOBILE FOOTER (Screens <= 768px)       */}
      {/* ============================================================== */}
      <div className="mobile-footer">
        <div className="container mobile-footer-inner">
          {/* Brand & Short Description */}
          <div className="mobile-footer-brand">
            <div className="mobile-footer-brand-header">
              <img
                src="/assets/pwc-logo.jpeg"
                alt="Pudugai Wellness Center"
                className="mobile-footer-logo"
              />
              <span className="mobile-footer-title">{BUSINESS_CONFIG.name}</span>
            </div>
            <p className="mobile-footer-desc">
              Wellness and nutrition guidance in Pudukkottai.
            </p>
          </div>

          {/* Essential Clickable Contact Links */}
          <div className="mobile-footer-links-stack">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="mobile-footer-contact-item"
              aria-label={`Call Coach at ${BUSINESS_CONFIG.phoneDisplay}`}
            >
              <Phone size={15} className="mobile-footer-icon" />
              <span className="mobile-footer-text">
                Phone: <strong>{BUSINESS_CONFIG.phoneDisplay}</strong>
              </span>
            </a>

            <a
              href={BUSINESS_CONFIG.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-footer-contact-item"
              aria-label="Location on Google Maps"
            >
              <MapPin size={15} className="mobile-footer-icon" />
              <span className="mobile-footer-text">Location – View on Google Maps</span>
              <ExternalLink size={12} className="mobile-footer-ext" />
            </a>

            <a
              href={BUSINESS_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-footer-contact-item"
              aria-label="Follow Coach Pandian on Instagram"
            >
              <Instagram size={15} className="mobile-footer-icon" />
              <span className="mobile-footer-text">Instagram: @coach_pandian</span>
              <ExternalLink size={12} className="mobile-footer-ext" />
            </a>
          </div>

          {/* Mobile Copyright & Admin Portal */}
          <div className="mobile-footer-bottom">
            <p className="mobile-copyright-text">
              &copy; {currentYear} Pudugai Wellness Center. All rights reserved.
            </p>
            <Link to="/admin/login" className="mobile-admin-link">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. FULL MULTI-COLUMN DESKTOP FOOTER (Screens > 768px)          */}
      {/* ============================================================== */}
      <div className="desktop-footer">
        <div className="container footer-main">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand">
              <img
                src="/assets/pwc-logo.jpeg"
                alt="Pudugai Wellness Center Logo"
                className="footer-logo-img"
              />
              <div>
                <span className="footer-brand-title">{BUSINESS_CONFIG.name}</span>
                <span className="footer-brand-sub">Nutrition • Fitness • Wellness</span>
              </div>
            </div>
            <p className="footer-about-text">
              Guiding individuals and families in Pudukkottai toward vibrant health through
              practical nutrition, body composition assessments, and sustainable daily habits.
            </p>
            <div className="footer-social-row">
              <a
                href={BUSINESS_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label="Visit Coach Pandian on Instagram"
              >
                <Instagram size={16} />
                <span>@coach_pandian</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/about">About Us & Coach Profile</Link></li>
              <li><Link to="/services">Services & Programs</Link></li>
              <li><Link to="/stories">Client Success Stories</Link></li>
              <li><Link to="/contact">Contact & Enquiry</Link></li>
            </ul>
          </div>

          {/* Col 3: Service Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Wellness Programs</h4>
            <ul className="footer-links-list">
              <li><Link to="/services">Weight Loss & Weight Gain</Link></li>
              <li><Link to="/services">BMI & Body Composition</Link></li>
              <li><Link to="/services">Women's & Men's Health</Link></li>
              <li><Link to="/services">Personalized Nutrition Plans</Link></li>
              <li><Link to="/services">Heart & Digestive Wellness</Link></li>
            </ul>
          </div>

          {/* Col 4: Verified Center Contact & Tamil Address */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">Visit Our Center</h4>

            <div className="contact-detail-row">
              <Phone size={18} className="contact-icon" />
              <div>
                <span className="contact-label">Direct Coach Call:</span>
                <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="contact-val highlight">
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="contact-detail-row">
              <MapPin size={18} className="contact-icon" />
              <div>
                <span className="contact-label">Pudukkottai Center Address:</span>
                <p className="contact-val address-en">
                  {BUSINESS_CONFIG.addressEn}
                </p>
                <p className="contact-val address-ta">
                  {BUSINESS_CONFIG.addressTa}
                </p>
              </div>
            </div>

            <a
              href={BUSINESS_CONFIG.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm directions-btn"
            >
              <span>Get Directions on Google Maps</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="footer-disclaimer-wrap">
          <div className="container">
            <div className="footer-disclaimer">
              <ShieldCheck size={18} className="disclaimer-icon" />
              <p>
                <strong>Wellness & Nutrition Disclaimer:</strong> Services, guidance, and dietary
                suggestions provided by Pudugai Wellness Center and Coach Thangapandian S are designed
                for wellness, fitness, and lifestyle education. They are not intended as a substitute
                for professional medical advice, clinical diagnosis, or medical treatment. Individual
                results vary and are not guaranteed.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p className="copyright-text">
              &copy; {currentYear} Pudugai Wellness Center (PWC). All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/contact" className="bottom-link">Get In Touch</Link>
              <span className="dot-divider">•</span>
              <Link to="/admin/login" className="bottom-link admin-portal-link">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
