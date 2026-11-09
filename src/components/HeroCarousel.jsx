import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Activity, Play, Pause, Volume2, VolumeX, Video as VideoIcon } from 'lucide-react';
import { getMediaType, getMediaUrl } from '../services/dataService';
import './HeroCarousel.css';

export default function HeroCarousel({ items = [], fallbackImage = '/assets/hero-wellness.jpg' }) {
  // Filter only active items and sort by display_order
  const activeItems = (Array.isArray(items) ? items : [])
    .filter((item) => item.active !== false)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRefs = useRef({});
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const timerRef = useRef(null);

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
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

  const currentItem = activeItems[currentIndex] || activeItems[0];
  const currentMediaType = currentItem ? getMediaType(currentItem) : 'image';

  // Handle video playback synchronization on slide change
  useEffect(() => {
    if (!currentItem) return;

    if (currentMediaType === 'video') {
      const vid = videoRefs.current[currentIndex];
      if (vid) {
        vid.currentTime = 0;
        vid.muted = isMuted;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((err) => {
              console.log('Video autoplay interrupted or requires interaction:', err);
              setIsPlaying(false);
            });
        }
      }
    }

    // Pause all non-active videos
    Object.entries(videoRefs.current).forEach(([k, vid]) => {
      if (parseInt(k, 10) !== currentIndex && vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [currentIndex, currentMediaType, isMuted, currentItem]);

  // Handle slideshow auto-advance:
  // - Images: Advance after 5 seconds
  // - Videos: Let video play to completion (via onEnded), with a max safety timer (25s)
  useEffect(() => {
    if (activeItems.length <= 1 || isPaused || reducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (currentMediaType === 'video') {
      // If video is playing, avoid interrupting before it finishes.
      // Safety timer (25s) in case video doesn't end or stalls.
      timerRef.current = setTimeout(() => {
        goToNext();
      }, 25000);
    } else {
      // Images advance after 5 seconds
      timerRef.current = setTimeout(() => {
        goToNext();
      }, 5000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, activeItems.length, isPaused, reducedMotion, currentMediaType, isPlaying, goToNext]);

  // Video Controls: Play/Pause Toggle
  const togglePlayPause = (e) => {
    e.stopPropagation();
    const vid = videoRefs.current[currentIndex];
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
      setIsPaused(false);
    } else {
      vid.pause();
      setIsPlaying(false);
      setIsPaused(true); // pause slideshow when user explicitly pauses video
    }
  };

  // Video Controls: Mute/Unmute Toggle
  const toggleMute = (e) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    const vid = videoRefs.current[currentIndex];
    if (vid) {
      vid.muted = nextMuted;
    }
  };

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

  // If no items are configured, render default single image fallback
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

  return (
    <div
      className="hero-carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Pudugai Wellness Center Hero Media Slideshow"
    >
      <div className="hero-carousel-container">
        {activeItems.map((item, idx) => {
          const isActive = idx === currentIndex;
          const mediaType = getMediaType(item);
          const mediaUrl = getMediaUrl(item, fallbackImage);

          return (
            <div
              key={item.id || idx}
              className={`hero-carousel-slide ${isActive ? 'active' : ''} slide-type-${mediaType}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${activeItems.length}: ${item.title || (mediaType === 'video' ? 'Wellness Video' : 'Wellness Photo')}`}
              aria-hidden={!isActive}
            >
              {mediaType === 'video' ? (
                <div className="hero-carousel-video-wrap">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[idx] = el;
                      else delete videoRefs.current[idx];
                    }}
                    src={mediaUrl}
                    className="hero-carousel-video"
                    playsInline
                    muted={isMuted}
                    loop={false}
                    preload="metadata"
                    onEnded={() => {
                      if (isActive) goToNext();
                    }}
                    onPlay={() => {
                      if (isActive) setIsPlaying(true);
                    }}
                    onPause={() => {
                      if (isActive) setIsPlaying(false);
                    }}
                    onError={(e) => {
                      console.warn('Hero video load error:', mediaUrl, e);
                    }}
                  />
                </div>
              ) : (
                <img
                  src={mediaUrl}
                  alt={item.title || 'Pudugai Wellness Center'}
                  className="hero-carousel-img"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Floating Video Controls (Visible when active slide is a video) */}
        {currentMediaType === 'video' && (
          <div className="hero-video-controls" aria-label="Video controls">
            <button
              type="button"
              className="hero-video-ctrl-btn"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              title={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            </button>

            <button
              type="button"
              className="hero-video-ctrl-btn"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              title={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>
        )}

        {/* Current Active Caption Overlay */}
        <div className="hero-carousel-overlay">
          <div className="hero-carousel-icon">
            {currentMediaType === 'video' ? <VideoIcon size={18} /> : <Activity size={18} />}
          </div>
          <div className="hero-carousel-caption-text">
            <span className="hero-carousel-caption-title">
              {currentItem.title || (currentMediaType === 'video' ? 'Wellness Video Feature' : 'Personalized Wellness Guidance')}
            </span>
            <span className="hero-carousel-caption-desc">
              {currentItem.description || 'Pudukkottai Center • Coach Thangapandian S'}
            </span>
          </div>
        </div>

        {/* Subtle Pagination Dots (only if more than 1 slide) */}
        {activeItems.length > 1 && (
          <div className="hero-carousel-dots" role="tablist" aria-label="Slides">
            {activeItems.map((item, idx) => {
              const isItemVideo = getMediaType(item) === 'video';
              return (
                <button
                  key={idx}
                  type="button"
                  className={`hero-carousel-dot ${idx === currentIndex ? 'active' : ''} ${isItemVideo ? 'is-video' : ''}`}
                  onClick={() => goToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}${isItemVideo ? ' (Video)' : ''}`}
                  aria-current={idx === currentIndex ? 'true' : 'false'}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
