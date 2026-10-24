import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services & Programs', path: '/services' },
    { label: 'Success Stories', path: '/stories' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="site-header">
      {/* Top micro-bar */}
      <div className="header-topbar">
        <div className="container header-topbar-inner">
          <div className="topbar-info">
            <span>Pudukkottai, Tamil Nadu</span>
            <span className="dot-divider">•</span>
            <span>Coach Thangapandian S</span>
          </div>
          <div className="topbar-actions">
            <a href="tel:9443443261" className="topbar-call">
              <Phone size={13} />
              <span>Call: 94434 43261</span>
            </a>
            <a
              href="https://www.instagram.com/coach_pandian?exln=YmNsbjZkeXQ1dnc3"
              target="_blank"
              rel="noopener noreferrer"
              className="topbar-link"
            >
              <span>Instagram</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="container header-main">
        <Link to="/" className="brand-logo" onClick={closeMobile}>
          <img
            src="/assets/pwc-logo.jpeg"
            alt="Pudugai Wellness Center Logo"
            className="brand-logo-img"
          />
          <div className="brand-text">
            <span className="brand-name">Pudugai Wellness Center</span>
            <span className="brand-subtitle">Nutrition • Fitness • Wellness</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="header-cta-group">
          <a href="tel:9443443261" className="btn btn-primary btn-sm header-call-btn">
            <Phone size={15} />
            <span>94434 43261</span>
          </a>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="container mobile-drawer-inner">
            <nav className="mobile-nav">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={closeMobile}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mobile-drawer-footer">
              <a href="tel:9443443261" className="btn btn-primary" onClick={closeMobile}>
                <Phone size={16} />
                <span>Call Coach: 94434 43261</span>
              </a>
              <a
                href="https://wa.me/919443443261"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                onClick={closeMobile}
              >
                <span>WhatsApp Guidance</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
