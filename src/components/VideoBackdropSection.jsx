import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// Shared single-listener scroll & rAF coordinator for all VideoBackdropSection instances.
// Ensures zero redundant scroll listeners and stops rAF completely when idle.
const controllers = new Set();
let listenersAttached = false;
let rafId = null;
let needsTargetRefresh = false;

function scheduleSync(refreshTargets = false) {
  if (refreshTargets) {
    needsTargetRefresh = true;
  }
  if (rafId !== null || typeof window === 'undefined') return;
  rafId = window.requestAnimationFrame(runSyncLoop);
}

function runSyncLoop() {
  rafId = null;
  const refresh = needsTargetRefresh;
  needsTargetRefresh = false;

  let keepRunning = false;
  controllers.forEach((ctrl) => {
    if (refresh) {
      ctrl.updateTarget();
    }
    if (ctrl.stepFrame()) {
      keepRunning = true;
    }
  });

  if (keepRunning) {
    rafId = window.requestAnimationFrame(runSyncLoop);
  }
}

function handleGlobalScroll() {
  scheduleSync(true);
}

function registerVideoController(ctrl) {
  controllers.add(ctrl);
  if (!listenersAttached && typeof window !== 'undefined') {
    window.addEventListener('scroll', handleGlobalScroll, { passive: true });
    window.addEventListener('resize', handleGlobalScroll, { passive: true });
    listenersAttached = true;
  }
  scheduleSync(true);

  return () => {
    controllers.delete(ctrl);
    if (controllers.size === 0 && listenersAttached && typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleGlobalScroll);
      window.removeEventListener('resize', handleGlobalScroll);
      listenersAttached = false;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      needsTargetRefresh = false;
    }
  };
}

export function VideoBackdropSection({
  video,
  scrim = 'soft',
  edgeBlend = 'canvas',
  isHero = false,
  objectPosition,
  minHeight = 'min-h-[82vh]',
  className = '',
  id,
  children
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const stateRef = useRef({
    isInView: isHero,
    targetTime: video?.startTime ?? 0.02,
    smoothedTime: video?.startTime ?? 0.02,
    initialized: false
  });

  const [isNearView, setIsNearView] = useState(isHero);
  const [hasVideoError, setHasVideoError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Gradual emergence and exit transitions over warm canvas tone (never black frames)
  const transitionOpacity = useTransform(
    scrollYProgress,
    isHero ? [0, 0.84, 1] : [0, 0.14, 0.86, 1],
    isHero ? [1, 1, 0.48] : [0.42, 1, 1, 0.42]
  );

  // Reset error flag when video source changes
  useEffect(() => {
    setHasVideoError(false);
    stateRef.current.initialized = false;
  }, [video?.src]);

  // Preload up to one full viewport ahead so approaching sections reveal crisp frames immediately
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsNearView(true);
      stateRef.current.isInView = true;
      return;
    }

    const nearObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNearView(true);
          }
        });
      },
      { rootMargin: '1100px 0px', threshold: 0.01 }
    );

    const viewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          stateRef.current.isInView = entry.isIntersecting;
          if (entry.isIntersecting) {
            setIsNearView(true);
            scheduleSync(true);
          }
        });
      },
      { rootMargin: '240px 0px', threshold: 0.01 }
    );

    nearObserver.observe(el);
    viewObserver.observe(el);
    return () => {
      nearObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  // Register scroll-synchronized forward/reverse scrubbing controller
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getClipBounds = (duration) => {
      const minBound = Math.max(0.02, Math.min(duration - 0.12, video?.startTime ?? 0.02));
      const maxBound = Math.max(
        minBound + 0.05,
        Math.min(duration - 0.04, video?.endTime ?? duration - 0.04)
      );
      return [minBound, maxBound];
    };

    const computeScrollTargetTime = () => {
      const container = containerRef.current;
      const vid = videoRef.current;
      if (!container || !vid) return;

      const duration = vid.duration;
      if (!Number.isFinite(duration) || duration <= 0.1) return;

      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docTop = rect.top + scrollY;

      const startScroll = Math.max(0, docTop - vh);
      const endScroll = docTop + rect.height;
      const span = Math.max(1, endScroll - startScroll);
      const progress = Math.min(1, Math.max(0, (scrollY - startScroll) / span));

      const [safeMin, safeMax] = getClipBounds(duration);
      const nextTarget = safeMin + progress * (safeMax - safeMin);

      stateRef.current.targetTime = nextTarget;
      if (!stateRef.current.initialized) {
        stateRef.current.smoothedTime = nextTarget;
        stateRef.current.initialized = true;
      }
    };

    const stepFrame = () => {
      const vid = videoRef.current;
      const st = stateRef.current;
      if (!vid || !st.isInView) return false;
      if (vid.readyState < 1 || !Number.isFinite(vid.duration) || vid.duration <= 0.1) {
        return false;
      }

      if (!vid.paused) {
        vid.pause();
      }

      if (prefersReducedMotion) {
        return false;
      }

      const diff = st.targetTime - st.smoothedTime;
      if (Math.abs(diff) < 0.008) {
        st.smoothedTime = st.targetTime;
      } else {
        st.smoothedTime += diff * 0.38;
      }

      const deltaFromVideo = Math.abs(st.smoothedTime - vid.currentTime);
      const pendingDistance = Math.abs(st.targetTime - vid.currentTime);

      if (!vid.seeking && deltaFromVideo >= 0.012) {
        try {
          vid.currentTime = st.smoothedTime;
        } catch {
          // Ignore transient seek exceptions before decode readiness
        }
      }

      return pendingDistance >= 0.012 || Math.abs(st.targetTime - st.smoothedTime) >= 0.008;
    };

    const ctrl = {
      updateTarget: computeScrollTargetTime,
      stepFrame
    };

    return registerVideoController(ctrl);
  }, [video?.src, video?.startTime, video?.endTime]);

  const handleVideoLoaded = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    if (!vid.paused) vid.pause();

    if (Number.isFinite(vid.duration) && vid.duration > 0.1) {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const docTop = rect.top + scrollY;
        const startScroll = Math.max(0, docTop - vh);
        const endScroll = docTop + rect.height;
        const span = Math.max(1, endScroll - startScroll);
        const progress = Math.min(1, Math.max(0, (scrollY - startScroll) / span));

        const safeMin = Math.max(0.02, Math.min(vid.duration - 0.12, video?.startTime ?? 0.02));
        const safeMax = Math.max(
          safeMin + 0.05,
          Math.min(vid.duration - 0.04, video?.endTime ?? vid.duration - 0.04)
        );
        const initialTime = safeMin + progress * (safeMax - safeMin);
        stateRef.current.targetTime = initialTime;
        stateRef.current.smoothedTime = initialTime;
        stateRef.current.initialized = true;
        try {
          vid.currentTime = initialTime;
        } catch {
          // Ignore
        }
      }
    }
    scheduleSync(true);
  };

  // Scrims are kept minimal, sharp, and non-foggy so crisp natural video is clearly visible
  const scrimClasses = {
    soft: 'bg-[#120b20]/15',
    side: 'bg-gradient-to-r from-[#120b20]/55 via-[#120b20]/15 to-transparent',
    sideRight: 'bg-gradient-to-l from-[#120b20]/55 via-[#120b20]/15 to-transparent',
    bottom: 'bg-gradient-to-t from-[#120b20]/75 via-[#120b20]/25 to-transparent',
    heroPrism: 'bg-gradient-to-r from-[#140d21]/60 via-[#140d21]/20 to-transparent',
    lightMist: 'bg-[#120b20]/10',
    jewelMist: 'bg-[#120b20]/12',
    none: 'bg-transparent'
  };

  const resolvedPosition = objectPosition || video?.objectPosition || 'center center';

  return (
    <section
      id={id}
      ref={containerRef}
      className={`relative w-full overflow-x-clip ${minHeight} ${className}`}
    >
      {/* Base canvas background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[var(--bg-canvas)]"
      >
        {/* Sticky viewport-proportioned video stage */}
        <motion.div
          style={{ opacity: transitionOpacity, willChange: 'opacity' }}
          className="sticky top-0 w-full h-[100svh] max-h-full overflow-hidden"
        >
          {hasVideoError && video?.poster ? (
            <img
              src={video.poster}
              alt={video.alt || 'Orion Mall footage'}
              referrerPolicy="no-referrer"
              style={{ objectPosition: resolvedPosition }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              key={video?.src}
              src={video?.src}
              muted
              playsInline
              preload={isHero ? 'auto' : (isNearView ? 'auto' : 'metadata')}
              onLoadedMetadata={handleVideoLoaded}
              onLoadedData={handleVideoLoaded}
              onCanPlay={handleVideoLoaded}
              onError={() => setHasVideoError(true)}
              aria-hidden="true"
              style={{ objectPosition: resolvedPosition }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Minimal contrast scrim for typography legibility without fog or blur */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
              scrimClasses[scrim] || scrimClasses.soft
            }`}
          />
        </motion.div>

        {/* Gentle boundary blend for continuous visual connection across sections */}
        {edgeBlend === 'canvas' && (
          <>
            {!isHero && (
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-16 md:h-24 pointer-events-none bg-gradient-to-b from-[var(--bg-canvas)]/60 to-transparent"
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-16 md:h-24 pointer-events-none bg-gradient-to-t from-[var(--bg-canvas)]/60 to-transparent"
            />
          </>
        )}
      </div>

      <div className="relative z-10 w-full h-full">{children}</div>
    </section>
  );
}
