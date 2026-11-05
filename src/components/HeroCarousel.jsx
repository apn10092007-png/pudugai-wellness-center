import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Activity } from 'lucide-react';
import './HeroCarousel.css';

export default function HeroCarousel({ items = [], fallbackImage = '/assets/hero-wellness.jpg' }) {
  // Filter only active items and sort by display_order
  const activeItems = (Array.isArray(items) ? items : [])
    .filter((item) => item.active !== false)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const timerRef = useRef(null);

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e) => setReducedMotion(e.matches);
      mediaQuery.addEventListener?.('change', listener);
      return () => mediaQuery.removeEventListener?.('change', listener);
    }
  }, []);

  // Safe navigation helpers
  const goToNext = useCallback(() => {
    if (activeItems.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % activeItems.length);
  }, [activeItems.length]);

  const goToPrev = useCallback(() => {
    if (activeItems.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + activeItems.length) % activeItems.length);
  }, [activeItems.length]);

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  // Automatic change every 4.5 seconds (unless paused or reduced motion is preferred)
  useEffect(() => {
    if (activeItems.length <= 1 || isPaused || reducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeItems.length, isPaused, reducedMotion, goToNext]);

  // Handle Touch Swipe on Mobile
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;

    // Only register as swipe if horizontal distance is greater than vertical distance and > 40px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goToNext(); // Swiped left -> next
      } else {
        goToPrev(); // Swiped right -> prev
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setTimeout(() => setIsPaused(false), 2000);
  };

  // If no items are configured, render default single image
  if (activeItems.length === 0) {
    return (
      <div className="hero-carousel-wrapper">
        <div className="hero-carousel-container">
          <img
            src={fallbackImage}
            alt="Pudugai Wellness Center Lifestyle"
            className="hero-carousel-fallback"
            onError={(e) => {
              e.currentTarget.src = '/assets/hero-wellness.jpg';
            }}
          />
          <div className="hero-carousel-overlay">
            <div className="hero-carousel-icon">
              <Activity size={18} />
            </div>
            <div className="hero-carousel-caption-text">
              <span className="hero-carousel-caption-title">Personalized Guidance</span>
              <span className="hero-carousel-caption-desc">Pudukkottai Center</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentItem = activeItems[currentIndex] || activeItems[0];

  return (
    <div
      className="hero-carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Pudugai Wellness Center Hero Gallery"
    >
      <div className="hero-carousel-container">
        {activeItems.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={item.id || idx}
              className={`hero-carousel-slide ${isActive ? 'active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${activeItems.length}: ${item.title || 'Wellness Photo'}`}
              aria-hidden={!isActive}
            >
              <img
                src={item.image_path || fallbackImage}
                alt={item.title || 'Pudugai Wellness Center'}
                className="hero-carousel-img"
                loading={idx === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
              />
            </div>
          );
        })}

        {/* Current Active Caption Overlay */}
        <div className="hero-carousel-overlay">
          <div className="hero-carousel-icon">
            <Activity size={18} />
          </div>
          <div className="hero-carousel-caption-text">
            <span className="hero-carousel-caption-title">
              {currentItem.title || 'Personalized Wellness Guidance'}
            </span>
            <span className="hero-carousel-caption-desc">
              {currentItem.description || 'Pudukkottai Center • Coach Thangapandian S'}
            </span>
          </div>
        </div>

        {/* Small Subtle Pagination Dots (only if more than 1 image) */}
        {activeItems.length > 1 && (
          <div className="hero-carousel-dots" role="tablist" aria-label="Slides">
            {activeItems.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`hero-carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => goToIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
