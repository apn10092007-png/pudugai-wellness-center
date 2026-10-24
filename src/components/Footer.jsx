import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { InstagramIcon as Instagram } from './Icons';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
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
              <span className="footer-brand-title">Pudugai Wellness Center</span>
              <span className="footer-brand-sub">Nutrition • Fitness • Wellness</span>
            </div>
          </div>
          <p className="footer-about-text">
            Guiding individuals and families in Pudukkottai toward vibrant health through
            practical nutrition, body composition assessments, and sustainable daily habits.
          </p>
          <div className="footer-social-row">
            <a
              href="https://www.instagram.com/coach_pandian?exln=YmNsbjZkeXQ1dnc3"
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
              <a href="tel:9443443261" className="contact-val highlight">
                94434 43261
              </a>
            </div>
          </div>

          <div className="contact-detail-row">
            <MapPin size={18} className="contact-icon" />
            <div>
              <span className="contact-label">Pudukkottai Center Address:</span>
              <p className="contact-val address-en">
                E Main Rd, T Nagar, Buvaneswari Nagar,<br />
                Pudukkottai, Tamil Nadu 622001
              </p>
              <p className="contact-val address-ta">
                கிழக்கு முதன்மை சாலை, டி நகர்,<br />
                புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001
              </p>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/JAdNVeq53M3PdrW1A"
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
              weight-loss results vary and are not guaranteed.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Admin Link */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Pudugai Wellness Center (PWC). All rights reserved.
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
    </footer>
  );
}
