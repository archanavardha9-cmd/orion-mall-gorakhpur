import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// Shared scroll-activity manager so background videos play ONLY while scrolling
// and pause immediately on the exact frame once scrolling stops.
const scrollSubscribers = new Set();
let scrollActive = false;
let scrollStopTimeout = null;
let listenerAttached = false;

function notifyScrollSubscribers() {
  scrollSubscribers.forEach((cb) => cb(scrollActive));
}

function handleWindowScroll() {
  if (!scrollActive) {
    scrollActive = true;
    notifyScrollSubscribers();
  }
  if (scrollStopTimeout !== null) {
    window.clearTimeout(scrollStopTimeout);
  }
  scrollStopTimeout = window.setTimeout(() => {
    scrollActive = false;
    scrollStopTimeout = null;
    notifyScrollSubscribers();
  }, 150);
}

function subscribeToScrollActivity(cb) {
  scrollSubscribers.add(cb);
  if (!listenerAttached && typeof window !== 'undefined') {
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    listenerAttached = true;
  }
  return () => {
    scrollSubscribers.delete(cb);
    if (scrollSubscribers.size === 0 && listenerAttached && typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleWindowScroll);
      listenerAttached = false;
      if (scrollStopTimeout !== null) {
        window.clearTimeout(scrollStopTimeout);
        scrollStopTimeout = null;
      }
      scrollActive = false;
    }
  };
}

export function VideoBackdropSection({
  video,
  scrim = 'soft',
  minHeight = 'min-h-[82vh]',
  className = '',
  id,
  children
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.04]);
  const videoY = useTransform(scrollYProgress, [0, 1], ['-2.5%', '2.5%']);
  const revealOpacity = useTransform(scrollYProgress, [0, 0.16, 0.85, 1], [0.75, 1, 1, 0.85]);

  // Listen to shared global scroll activity across all pages & sections
  useEffect(() => {
    return subscribeToScrollActivity((active) => {
      setIsScrolling(active);
    });
  }, []);

  // Track whether this section is near or inside the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { rootMargin: '180px 0px', threshold: 0.02 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset ready flag only when video source changes
  useEffect(() => {
    setVideoReady(false);
  }, [video?.src]);

  // Synchronize HTMLVideoElement play/pause strictly with scrolling without resetting currentTime
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;

    if (isScrolling && isInView) {
      if (el.paused) {
        const playPromise = el.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            // Silently ignore autoplay-restricted blocks while poster/frame remains visible
          });
        }
      }
    } else if (!el.paused) {
      el.pause();
    }
  }, [isScrolling, isInView, video?.src]);

  // Measured, transparent scrims that keep real video motion vibrant and clear
  const scrimClasses = {
    soft: 'bg-gradient-to-b from-transparent via-black/10 to-black/38 dark:from-[#120e1b]/20 dark:via-[#120e1b]/14 dark:to-[#120e1b]/45',
    side: 'bg-gradient-to-r from-[#faf3ea]/78 via-[#f5eefb]/36 to-transparent dark:from-[#120e1b]/78 dark:via-[#191428]/38 dark:to-transparent',
    sideRight: 'bg-gradient-to-l from-[#faf3ea]/78 via-[#ebf8f5]/36 to-transparent dark:from-[#120e1b]/78 dark:via-[#111c24]/38 dark:to-transparent',
    bottom: 'bg-gradient-to-t from-[#140e20]/64 via-[#140e20]/16 to-transparent',
    lightMist: 'bg-gradient-to-b from-[#faf3ea]/42 via-[#f5eefb]/24 to-[#ebf8f5]/46 dark:from-[#120e1b]/48 dark:via-[#191428]/26 dark:to-[#120e1b]/52'
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
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
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

      <div className="relative z-10 w-full h-full">{children}</div>
    </section>
  );
}
