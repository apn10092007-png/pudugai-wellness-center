import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const headerRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const drawerRef = useRef(null);

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

  const closeMobile = useCallback((restoreFocus = false) => {
    setMobileOpen(false);
    if (restoreFocus) {
      toggleBtnRef.current?.focus();
    }
  }, []);

  // 1. Sticky Navbar: Track scroll position to apply subtle shadow only when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 15);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Mobile Menu: Close automatically on route change if open
  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [location.pathname]);

  // 3. Mobile Menu: Keyboard focus management, Escape key, and Focus Trap
  useEffect(() => {
    if (!mobileOpen) return;

    // Focus first link inside drawer when opened
    const focusTimer = setTimeout(() => {
      if (drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          focusables[0].focus();
        }
      }
    }, 60);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMobile(true);
        return;
      }

      // Trap Tab key inside the open drawer
      if (e.key === 'Tab') {
        if (!drawerRef.current) return;
        const focusables = Array.from(
          drawerRef.current.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          // Shift + Tab: wrap from first to last
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: wrap from last to first
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen, closeMobile]);

  // 4. Mobile Menu: Close when clicking outside header
  useEffect(() => {
    if (!mobileOpen) return;

    const handlePointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        closeMobile(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [mobileOpen, closeMobile]);

  // 5. Mobile Menu: Prevent background scrolling while open
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${mobileOpen ? 'menu-open' : ''}`}
    >
      {/* Top micro-bar */}
      <div className="header-topbar">
        <div className="container header-topbar-inner">
          <div className="topbar-info">
            <span>Pudukkottai & Peravurani, Tamil Nadu</span>
          </div>
          <div className="topbar-actions">
            <a href="tel:9443443261" className="topbar-call" title="Call: 94434 43261">
              <Phone size={13} />
              <span>Call: 94434 43261</span>
            </a>
            <a
              href="https://www.instagram.com/coach_pandian?exln=YmNsbjZkeXQ1dnc3"
              target="_blank"
              rel="noopener noreferrer"
              className="topbar-link"
              title="Follow Coach on Instagram"
            >
              <span>Instagram</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="container header-main">
        <Link to="/" className="brand-logo" onClick={closeMobile} aria-label="Pudugai Wellness Center Home">
          <img
            src="https://ggcsfegymkgrvwnexxay.supabase.co/storage/v1/object/public/pwc-public-assets/pwc-logo-transparent%20(1).png"
            alt="Pudugai Wellness Center Logo"
            className="brand-logo-img"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/assets/pwc-logo.jpeg';
            }}
          />
          <div className="brand-text">
            <span className="brand-name">Pudugai Wellness Center</span>
            <span className="brand-subtitle">Nutrition • Fitness • Wellness</span>
          </div>
        </Link>

        {/* Desktop Nav with active link highlighting */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & Mobile Actions */}
        <div className="header-cta-group">
          {/* Smart Contact Button: tel:9443443261 */}
          <a
            href="tel:9443443261"
            className="btn btn-primary header-call-btn"
            aria-label="Call Coach at 94434 43261"
            title="Call: 94434 43261"
          >
            <Phone size={16} className="call-btn-icon" />
            <span className="call-btn-text">94434 43261</span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            ref={toggleBtnRef}
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay for clicking outside & dimming background */}
      <div
        className={`mobile-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => closeMobile(true)}
        aria-hidden="true"
      />

      {/* Mobile Nav Drawer with smooth CSS slide/fade */}
      <div
        id="mobile-navigation-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal={mobileOpen}
        aria-label="Mobile Navigation Menu"
        className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="container mobile-drawer-inner">
          <nav className="mobile-nav" aria-label="Mobile Menu Links">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                aria-current={isActive(item.path) ? 'page' : undefined}
                tabIndex={mobileOpen ? 0 : -1}
                onClick={closeMobile}
              >
                <span>{item.label}</span>
                {isActive(item.path) && <span className="mobile-active-dot" aria-hidden="true" />}
              </Link>
            ))}
          </nav>
          <div className="mobile-drawer-footer">
            <a
              href="tel:9443443261"
              className="btn btn-primary"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={closeMobile}
              aria-label="Call Coach at 94434 43261"
            >
              <Phone size={16} />
              <span>Call Coach: 94434 43261</span>
            </a>
            <a
              href="https://wa.me/919443443261"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={closeMobile}
              aria-label="Chat on WhatsApp with Pudugai Wellness Center"
            >
              <span>WhatsApp Guidance</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
