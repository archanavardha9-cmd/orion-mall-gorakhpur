import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * VideoBackdropSection
 * Scroll-controlled cinematic video background:
 * - Downward scrolling advances video forward smoothly.
 * - Upward scrolling reverses video backward from its current frame.
 * - Stopping scroll pauses playback immediately (~180ms delay) maintaining the exact frame visible.
 * - Videos do NOT continuously autoplay when idle.
 * - Resuming scroll continues from current frame without resetting.
 * - Crisp, sharp rendering without heavy blur or fog overlays.
 */
export function VideoBackdropSection({
  video,
  scrim = 'soft',
  edgeBlend = 'canvas',
  isHero = false,
  objectPosition,
  minHeight = 'min-h-[calc(100svh-4rem)]',
  className = '',
  id,
  children
}) {
  const videoRef = useRef(null);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const stopTimeoutRef = useRef(null);
  const isScrubbingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const animFrameRef = useRef(null);

  useEffect(() => {
    setHasVideoError(false);
  }, [video?.src]);

  // Progressive activation: Hero loads on user interaction or idle; non-hero loads on intersection
  useEffect(() => {
    const activate = () => setShouldLoadVideo(true);

    if (isHero) {
      const onUserAction = () => {
        activate();
        window.removeEventListener('scroll', onUserAction);
        window.removeEventListener('wheel', onUserAction);
        window.removeEventListener('touchstart', onUserAction);
      };

      window.addEventListener('scroll', onUserAction, { passive: true, once: true });
      window.addEventListener('wheel', onUserAction, { passive: true, once: true });
      window.addEventListener('touchstart', onUserAction, { passive: true, once: true });

      const idleId = typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(activate, { timeout: 2000 })
        : setTimeout(activate, 1500);

      return () => {
        window.removeEventListener('scroll', onUserAction);
        window.removeEventListener('wheel', onUserAction);
        window.removeEventListener('touchstart', onUserAction);
        if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(idleId);
        else clearTimeout(idleId);
      };
    } else {
      if (!window.IntersectionObserver) {
        setShouldLoadVideo(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            activate();
            observer.disconnect();
          }
        },
        { rootMargin: '350px' }
      );

      const el = id ? document.getElementById(id) : null;
      if (el) {
        observer.observe(el);
      } else {
        const timeout = setTimeout(activate, 2000);
        return () => clearTimeout(timeout);
      }

      return () => observer.disconnect();
    }
  }, [isHero, id]);

  // Initial video setup: mute, preload, and prime the first frame cleanly (prevent black frames)
  useEffect(() => {
    if (!shouldLoadVideo) return;
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;

    const handleLoadedMetadata = () => {
      // Set to 0.05s so the browser decodes and displays the initial frame while paused
      if (vid.currentTime === 0 && vid.duration > 0.1) {
        vid.currentTime = 0.05;
      }
      targetTimeRef.current = vid.currentTime;
    };

    if (vid.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      vid.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
    }

    return () => {
      vid.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [video?.src]);

  // Handle forward scroll movement
  const handleScrollDown = useCallback((intensity = 40) => {
    const vid = videoRef.current;
    if (!vid) return;

    // Clear any pending pause
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
    }

    const duration = vid.duration || 10;

    // If already at end of video, loop seamlessly
    if (vid.currentTime >= duration - 0.2) {
      vid.currentTime = 0.05;
    }

    // Play forward smoothly
    vid.playbackRate = 1.0;
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    // Pause promptly when user stops scrolling (180ms delay)
    stopTimeoutRef.current = setTimeout(() => {
      if (vid && !vid.paused) {
        vid.pause();
      }
    }, 180);
  }, []);

  // Handle reverse scroll movement (stepping backward from current frame)
  const handleScrollUp = useCallback((intensity = 40) => {
    const vid = videoRef.current;
    if (!vid) return;

    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
    }

    // Immediately pause native forward playback to step in reverse
    if (!vid.paused) {
      vid.pause();
    }

    const duration = vid.duration || 10;
    // Step backwards proportionally to scroll gesture
    const step = Math.min(0.45, Math.max(0.06, intensity * 0.0025));
    let nextTime = vid.currentTime - step;

    if (nextTime < 0.05) {
      nextTime = Math.max(0.05, duration - 0.5);
    }

    vid.currentTime = nextTime;
    targetTimeRef.current = nextTime;

    // Ensure it remains paused when scrolling ceases
    stopTimeoutRef.current = setTimeout(() => {
      if (vid && !vid.paused) {
        vid.pause();
      }
    }, 120);
  }, []);

  // Connect to global scroll-impulse event dispatched by FullPageContainer and wheel gestures
  useEffect(() => {
    const onScrollImpulse = (e) => {
      if (!e.detail) return;
      const { direction, delta } = e.detail;
      if (direction === 'down') {
        handleScrollDown(delta);
      } else if (direction === 'up') {
        handleScrollUp(delta);
      }
    };

    window.addEventListener('scroll-impulse', onScrollImpulse);
    return () => window.removeEventListener('scroll-impulse', onScrollImpulse);
  }, [handleScrollDown, handleScrollUp]);

  // Fallback native wheel listener for the section itself
  useEffect(() => {
    const onLocalWheel = (e) => {
      if (e.deltaY > 0) {
        handleScrollDown(Math.abs(e.deltaY));
      } else if (e.deltaY < 0) {
        handleScrollUp(Math.abs(e.deltaY));
      }
    };

    window.addEventListener('wheel', onLocalWheel, { passive: true });
    return () => window.removeEventListener('wheel', onLocalWheel);
  }, [handleScrollDown, handleScrollUp]);

  const scrimClasses = {
    soft: 'bg-[#120b20]/15',
    side: 'bg-gradient-to-r from-[#120b20]/55 via-[#120b20]/15 to-transparent',
    sideRight: 'bg-gradient-to-l from-[#120b20]/55 via-[#120b20]/15 to-transparent',
    bottom: 'bg-gradient-to-t from-[#120b20]/75 via-[#120b20]/25 to-transparent',
    heroPrism: 'bg-gradient-to-r from-[#fbf7f0]/92 via-[#fbf7f0]/62 to-[#fbf7f0]/15',
    lightMist: 'bg-[#120b20]/10',
    jewelMist: 'bg-[#120b20]/12',
    none: 'bg-transparent'
  };

  const resolvedPosition = objectPosition || video?.objectPosition || 'center center';

  return (
    <section
      id={id}
      className={`relative w-full min-h-full ${minHeight} flex flex-col overflow-x-hidden ${className}`}
    >
      {/* Background Video Stage */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[var(--bg-canvas)] overflow-hidden"
      >
        {video?.poster && (
          <picture>
            {video.posterMobile && (
              <source media="(max-width: 768px)" srcSet={video.posterMobile} type="image/webp" />
            )}
            <img
              src={video.poster}
              alt={video.alt || 'Orion Mall footage'}
              referrerPolicy="no-referrer"
              loading={isHero ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={isHero ? "high" : "auto"}
              style={{ objectPosition: resolvedPosition }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
        )}
        {!hasVideoError && shouldLoadVideo && (
          <video
            ref={videoRef}
            key={video?.src}
            src={video?.src}
            poster={video?.poster}
            muted
            playsInline
            preload={isHero ? "metadata" : "none"}
            onError={() => setHasVideoError(true)}
            aria-hidden="true"
            style={{ objectPosition: resolvedPosition }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Minimal legibility scrim for typography without heavy blur or fog */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
            scrimClasses[scrim] || scrimClasses.soft
          }`}
        />
      </div>

      {/* Content Layer: safe vertical centering avoids top cutoff when mobile content overflows */}
      <div
        className={`relative z-10 w-full flex-1 flex flex-col ${
          className.includes('justify-between')
            ? 'justify-between'
            : className.includes('justify-end')
            ? 'justify-end'
            : '[&>*:first-child]:mt-auto [&>*:last-child]:mb-auto'
        }`}
      >
        {children}
      </div>
    </section>
  );
}
