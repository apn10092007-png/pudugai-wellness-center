import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { InstagramIcon as Instagram, WhatsAppIcon as WhatsApp } from './Icons';
import { BUSINESS_CONFIG } from '../config/business';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* ============================================================== */}
      {/* 1. COMPACT PROFESSIONAL MOBILE FOOTER (Screens <= 860px)       */}
      {/* ============================================================== */}
      <div className="mobile-footer">
        <div className="container mobile-footer-inner">
          {/* Brand & Short Description */}
          <div className="mobile-footer-brand">
            <div className="mobile-footer-brand-header">
              <img
                src="https://ggcsfegymkgrvwnexxay.supabase.co/storage/v1/object/public/pwc-public-assets/pwc-logo-transparent%20(1).png"
                alt="Pudugai Wellness Center Logo"
                className="mobile-footer-logo"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/pwc-logo.jpeg';
                }}
              />
              <span className="mobile-footer-title">{BUSINESS_CONFIG.name}</span>
            </div>
            <p className="mobile-footer-desc">
              Wellness and nutrition guidance in Pudukkottai & Peravurani.
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
              href="https://maps.app.goo.gl/JAdNVeq53M3PdrW1A"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-footer-contact-item"
              aria-label="Pudukkottai Location on Google Maps"
            >
              <MapPin size={15} className="mobile-footer-icon" />
              <span className="mobile-footer-text">Pudukkottai – View on Google Maps</span>
              <ExternalLink size={12} className="mobile-footer-ext" />
            </a>

            <a
              href="https://maps.app.goo.gl/DFpxMGuHuTudNYFb6"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-footer-contact-item"
              aria-label="Peravurani Location on Google Maps"
            >
              <MapPin size={15} className="mobile-footer-icon" />
              <span className="mobile-footer-text">Peravurani – View on Google Maps</span>
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
              &copy; {CURRENT_YEAR} Pudugai Wellness Center. All rights reserved.
            </p>
            <Link to="/admin/login" className="mobile-admin-link">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. CLEAN MINIMAL DESKTOP FOOTER (Screens > 860px)             */}
      {/* ============================================================== */}
      <div className="desktop-footer">
        <div className="container footer-main">
          {/* Section 1: Brand */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand">
              <img
                src="https://ggcsfegymkgrvwnexxay.supabase.co/storage/v1/object/public/pwc-public-assets/pwc-logo-transparent%20(1).png"
                alt="Pudugai Wellness Center Logo"
                className="footer-logo-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/pwc-logo.jpeg';
                }}
              />
              <div>
                <span className="footer-brand-title">{BUSINESS_CONFIG.name}</span>
              </div>
            </div>
            <p className="footer-tagline">
              Wellness and nutrition guidance for a healthier lifestyle.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="footer-col footer-col-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/stories">Success Stories</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Section 3: Our Locations */}
          <div className="footer-col footer-col-locations">
            <h4 className="footer-heading">Our Locations</h4>
            <div className="footer-locations-list">
              <div className="footer-location-block">
                <span className="footer-location-name">Pudukkottai Center</span>
                <a
                  href="https://maps.app.goo.gl/JAdNVeq53M3PdrW1A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-map-link"
                  aria-label="View Pudukkottai Center on Google Maps"
                >
                  <MapPin size={14} className="footer-link-icon" />
                  <span>View on Google Maps</span>
                  <ExternalLink size={12} className="footer-ext-icon" />
                </a>
              </div>

              <div className="footer-location-block">
                <span className="footer-location-name">Peravurani Center</span>
                <a
                  href="https://maps.app.goo.gl/DFpxMGuHuTudNYFb6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-map-link"
                  aria-label="View Peravurani Center on Google Maps"
                >
                  <MapPin size={14} className="footer-link-icon" />
                  <span>View on Google Maps</span>
                  <ExternalLink size={12} className="footer-ext-icon" />
                </a>
              </div>
            </div>
          </div>

          {/* Section 4: Contact */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="footer-contact-link"
                  aria-label={`Call us at ${BUSINESS_CONFIG.phoneDisplay}`}
                >
                  <Phone size={15} className="footer-link-icon" />
                  <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link"
                  aria-label="Chat with us on WhatsApp"
                >
                  <WhatsApp size={15} className="footer-link-icon" />
                  <span>WhatsApp Chat</span>
                  <ExternalLink size={12} className="footer-ext-icon" />
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_CONFIG.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link"
                  aria-label="Follow Coach Pandian on Instagram"
                >
                  <Instagram size={15} className="footer-link-icon" />
                  <span>@coach_pandian</span>
                  <ExternalLink size={12} className="footer-ext-icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="footer-disclaimer-wrap">
          <div className="container">
            <div className="footer-disclaimer">
              <ShieldCheck size={18} className="disclaimer-icon" />
              <p>
                <strong>Wellness &amp; Nutrition Disclaimer:</strong> Services, guidance, and dietary
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
              &copy; {CURRENT_YEAR} Pudugai Wellness Center (PWC). All rights reserved.
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
