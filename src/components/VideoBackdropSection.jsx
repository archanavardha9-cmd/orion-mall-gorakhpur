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
  tone = 'none',
  minHeight = 'min-h-[82vh]',
  className = '',
  id,
  children
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const stateRef = useRef({
    isInView: false,
    targetTime: 0.02,
    smoothedTime: 0.02,
    initialized: false
  });

  const [videoReady, setVideoReady] = useState(false);
  const [isNearView, setIsNearView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.04]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['-2.5%', '2.5%']);
  const revealOpacity = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0.82, 1, 1, 0.86]);

  // Reset ready flag only when video source actually changes
  useEffect(() => {
    setVideoReady(false);
    stateRef.current.initialized = false;
  }, [video?.src]);

  // Track both near-viewport (for eager metadata->auto buffering) and active viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsNearView(true);
      stateRef.current.isInView = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          stateRef.current.isInView = entry.isIntersecting;
          if (entry.isIntersecting) {
            setIsNearView(true);
            scheduleSync(true);
          }
        });
      },
      { rootMargin: '320px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Register scroll-synchronized forward/reverse scrubbing controller
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

      // Sections starting in the initial viewport begin at progress 0 at scrollY=0.
      // Sections below the fold begin at progress 0 when their top enters the bottom of viewport.
      const startScroll = Math.max(0, docTop - vh);
      const endScroll = docTop + rect.height;
      const span = Math.max(1, endScroll - startScroll);
      const progress = Math.min(1, Math.max(0, (scrollY - startScroll) / span));

      const safeMin = 0.02;
      const safeMax = Math.max(safeMin + 0.04, duration - 0.04);
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

      // Never let native playback clock fight scroll-scrubbed currentTime
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
        st.smoothedTime += diff * 0.34;
      }

      const deltaFromVideo = Math.abs(st.smoothedTime - vid.currentTime);
      const pendingDistance = Math.abs(st.targetTime - vid.currentTime);

      if (!vid.seeking && deltaFromVideo >= 0.015) {
        try {
          vid.currentTime = st.smoothedTime;
        } catch {
          // Ignore transient seek exceptions before full decode readiness
        }
      }

      return pendingDistance >= 0.015 || Math.abs(st.targetTime - st.smoothedTime) >= 0.008;
    };

    const ctrl = {
      updateTarget: computeScrollTargetTime,
      stepFrame
    };

    const unregister = registerVideoController(ctrl);
    return unregister;
  }, [video?.src]);

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
        const safeMin = 0.02;
        const safeMax = Math.max(safeMin + 0.04, vid.duration - 0.04);
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

    if (vid.readyState >= 2) {
      setVideoReady(true);
    }
    scheduleSync(true);
  };

  const handleVideoSeeked = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.readyState >= 2) {
      setVideoReady(true);
    }
    scheduleSync(false);
  };

  // Rich, vibrant scrims that keep colours luminous without flat black or milky white wash
  const scrimClasses = {
    soft: 'bg-gradient-to-b from-[#1a102b]/12 via-[#120b20]/10 to-[#140c24]/48',
    side: 'bg-gradient-to-r from-[#f8ebdc]/80 via-[#f2e4fb]/44 to-transparent dark:from-[#120c22]/84 dark:via-[#1c1334]/46 dark:to-transparent',
    sideRight: 'bg-gradient-to-l from-[#f8ebdc]/80 via-[#e0f5f0]/44 to-transparent dark:from-[#120c22]/84 dark:via-[#102329]/46 dark:to-transparent',
    bottom: 'bg-gradient-to-t from-[#160d26]/74 via-[#1c1130]/22 to-[#1f1233]/14',
    heroPrism: 'bg-gradient-to-tr from-[#1c0f2e]/68 via-[#3d1c3a]/24 to-[#b45309]/18',
    lightMist: 'bg-gradient-to-br from-[#f9ebd9]/56 via-[#efe3fc]/36 to-[#dcf4ee]/54 dark:from-[#130d22]/64 dark:via-[#1d1433]/44 dark:to-[#0f2228]/60',
    jewelMist: 'bg-gradient-to-br from-[#fde6d8]/52 via-[#ede0fc]/34 to-[#d6f2ec]/52 dark:from-[#180f2b]/68 dark:via-[#23143d]/48 dark:to-[#0f252b]/64'
  };

  const toneOverlays = {
    none: null,
    coral: 'radial-gradient(circle at 18% 22%, rgba(214, 78, 52, 0.22), transparent 54%), radial-gradient(circle at 84% 78%, rgba(217, 119, 6, 0.18), transparent 52%)',
    emerald: 'radial-gradient(circle at 80% 20%, rgba(12, 138, 123, 0.22), transparent 55%), radial-gradient(circle at 18% 82%, rgba(37, 99, 235, 0.16), transparent 52%)',
    amethyst: 'radial-gradient(circle at 22% 20%, rgba(108, 62, 184, 0.22), transparent 55%), radial-gradient(circle at 82% 80%, rgba(201, 59, 107, 0.18), transparent 52%)',
    royal: 'radial-gradient(circle at 75% 24%, rgba(37, 99, 235, 0.24), transparent 55%), radial-gradient(circle at 20% 80%, rgba(217, 119, 6, 0.2), transparent 52%)'
  };

  return (
    <section
      id={id}
      ref={containerRef}
      className={`relative w-full overflow-hidden ${minHeight} ${className}`}
    >
      <motion.div
        style={{ scale: videoScale, y: videoY, opacity: revealOpacity }}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        {video?.poster && (
          <img
            src={video.poster}
            alt={video.alt || 'Orion Mall architectural footage'}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <video
          ref={videoRef}
          key={video?.src}
          src={video?.src}
          poster={video?.poster}
          muted
          playsInline
          preload={isNearView ? 'auto' : 'metadata'}
          onLoadedMetadata={handleVideoLoaded}
          onLoadedData={handleVideoLoaded}
          onCanPlay={handleVideoLoaded}
          onSeeked={handleVideoSeeked}
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </motion.div>

      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
          scrimClasses[scrim] || scrimClasses.soft
        }`}
      />

      {toneOverlays[tone] && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: toneOverlays[tone] }}
        />
      )}

      <div className="relative z-10 w-full h-full">{children}</div>
    </section>
  );
}
