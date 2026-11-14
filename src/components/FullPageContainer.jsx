import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FullPageScrollContext = createContext({
  activeSection: 0,
  totalSections: 0,
  isAtFooter: false,
  goToSection: () => {},
  nextSection: () => {},
  prevSection: () => {},
  scrollToFooter: () => {},
  scrollToLastSectionFromFooter: () => {}
});

export function useFullPageScroll() {
  return useContext(FullPageScrollContext);
}

/**
 * FullPageContainer
 * A unified, controlled full-screen vertical scene manager.
 * 
 * Key behaviours:
 * - Displays one complete main section at a time with smooth vertical transitions.
 * - All visual scrollbars are hidden (cross-browser); scrolling remains 100% active.
 * - Navigation dots are the ONLY visible navigation indicator and include the Footer.
 * - Clicking the Footer dot opens the footer; clicking section dots returns to sections.
 * - Downward gestures from the final section move naturally to the footer.
 * - Upward gestures from the footer return naturally to the final section.
 * - Dispatches scroll-impulse events for scroll-synchronized video playback (forward / reverse / pause).
 */
export function FullPageContainer({
  children,
  pageId = 'page',
  sectionLabels = []
}) {
  const sections = Array.isArray(children) ? children.filter(Boolean) : [children];
  const totalSections = sections.length;

  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = down (from bottom), -1 = up (from top)
  const [isAtFooter, setIsAtFooter] = useState(false);

  const isAtFooterRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(null);

  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);
  const wheelAccumulatorRef = useRef(0);
  const wheelTimeoutRef = useRef(null);

  // Synchronize ref with state
  useEffect(() => {
    isAtFooterRef.current = isAtFooter;
  }, [isAtFooter]);

  // Emit scroll impulse for video forward/reverse control
  const emitScrollImpulse = useCallback((dir, delta = 40) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('scroll-impulse', {
          detail: { direction: dir, delta: Math.abs(delta) }
        })
      );
    }
  }, []);

  // Dynamically measure available viewport height under header
  useEffect(() => {
    const measureAvailableHeight = () => {
      if (containerRef.current && window.scrollY <= 10) {
        const top = containerRef.current.getBoundingClientRect().top;
        const available = window.innerHeight - Math.max(0, top);
        if (available > 320) {
          setContainerHeight(available);
        }
      }
    };

    measureAvailableHeight();
    window.addEventListener('resize', measureAvailableHeight);
    return () => window.removeEventListener('resize', measureAvailableHeight);
  }, [pageId]);

  // Reset to first section and top: 0 on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    setActiveSection(0);
    setIsAtFooter(false);
    isAtFooterRef.current = false;
    setDirection(1);
    isTransitioningRef.current = false;
    wheelAccumulatorRef.current = 0;
  }, [pageId]);

  // Smooth scroll to the Footer
  const scrollToFooter = useCallback(() => {
    if (isTransitioningRef.current) return;
    const footer = document.querySelector('footer');
    if (!footer) return;

    isTransitioningRef.current = true;
    setIsAtFooter(true);
    isAtFooterRef.current = true;
    emitScrollImpulse('down', 60);

    footer.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 650);
  }, [emitScrollImpulse]);

  // Smooth scroll away from the Footer back to the last section
  const scrollToLastSectionFromFooter = useCallback(() => {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    setIsAtFooter(false);
    isAtFooterRef.current = false;
    emitScrollImpulse('up', 60);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 650);
  }, [emitScrollImpulse]);

  // Jump directly to a given section index (or to footer if targetIndex === totalSections)
  const goToSection = useCallback((targetIndex) => {
    if (targetIndex < 0 || targetIndex > totalSections) return;
    if (isTransitioningRef.current) return;

    // Target is the footer
    if (targetIndex === totalSections) {
      scrollToFooter();
      return;
    }

    // Target is a section
    if (isAtFooterRef.current || window.scrollY > 20) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsAtFooter(false);
      isAtFooterRef.current = false;
    }

    if (targetIndex === activeSection) return;

    isTransitioningRef.current = true;
    const newDir = targetIndex > activeSection ? 1 : -1;
    setDirection(newDir);
    setActiveSection(targetIndex);
    emitScrollImpulse(newDir > 0 ? 'down' : 'up', 50);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 650);
  }, [activeSection, totalSections, scrollToFooter, emitScrollImpulse]);

  // Downward gesture handler (Wheel down, Swipe up, ArrowDown, PageDown, Space)
  const handleDown = useCallback((delta = 50) => {
    if (isTransitioningRef.current) return;
    emitScrollImpulse('down', delta);

    // If already at footer, do nothing
    if (isAtFooterRef.current) {
      return;
    }

    // On the final section, move smoothly to the footer
    if (activeSection === totalSections - 1) {
      scrollToFooter();
      return;
    }

    // Otherwise, transition to next section
    goToSection(activeSection + 1);
  }, [activeSection, totalSections, goToSection, scrollToFooter, emitScrollImpulse]);

  // Upward gesture handler (Wheel up, Swipe down, ArrowUp, PageUp, Shift+Space)
  const handleUp = useCallback((delta = 50) => {
    if (isTransitioningRef.current) return;
    emitScrollImpulse('up', delta);

    // If at footer, transition smoothly back into the final section
    if (isAtFooterRef.current || window.scrollY > 20) {
      scrollToLastSectionFromFooter();
      return;
    }

    // Otherwise, transition to previous section
    if (activeSection > 0) {
      goToSection(activeSection - 1);
    }
  }, [activeSection, goToSection, scrollToLastSectionFromFooter, emitScrollImpulse]);

  const nextSection = useCallback(() => {
    handleDown();
  }, [handleDown]);

  const prevSection = useCallback(() => {
    handleUp();
  }, [handleUp]);

  // Window Scroll Listener: synchronizes state with browser scroll position
  useEffect(() => {
    const handleWindowScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const atFooter = scrollY > 30;

      if (atFooter !== isAtFooterRef.current) {
        setIsAtFooter(atFooter);
        isAtFooterRef.current = atFooter;
      }

      // If user scrolled to footer via keyboard or trackpad, keep activeSection on the last section
      if (atFooter && activeSection !== totalSections - 1) {
        setActiveSection(totalSections - 1);
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [activeSection, totalSections]);

  // Wheel Event Listener: intercept deliberate scroll gestures with threshold accumulation
  useEffect(() => {
    const handleWheel = (e) => {
      // Don't intercept if inside an interactive 3D canvas
      if (e.target && e.target.closest && e.target.closest('.interactive-scroll-allow')) {
        return;
      }

      // Emit continuous scroll impulse for subtle real-time video scrub
      emitScrollImpulse(e.deltaY > 0 ? 'down' : 'up', Math.abs(e.deltaY));

      // Check if user is scrolling inside an oversized section container
      const scrollableChild = e.target.closest ? e.target.closest('.oversized-content-scroll') : null;
      if (scrollableChild && !isAtFooterRef.current) {
        const canScrollDown = scrollableChild.scrollTop + scrollableChild.clientHeight < scrollableChild.scrollHeight - 6;
        const canScrollUp = scrollableChild.scrollTop > 6;
        if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
          return; // Allow native internal scroll
        }
      }

      // If at footer, allow natural scroll within tall footer on small screens
      if (isAtFooterRef.current) {
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
        if (e.deltaY > 0 && !atBottom) {
          return;
        }
      }

      e.preventDefault();

      if (isTransitioningRef.current) return;

      wheelAccumulatorRef.current += e.deltaY;

      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
      wheelTimeoutRef.current = setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 160);

      // Threshold of 40px ensures deliberate gesture and prevents accidental double skips
      if (Math.abs(wheelAccumulatorRef.current) >= 40) {
        const delta = wheelAccumulatorRef.current;
        wheelAccumulatorRef.current = 0;
        if (delta > 0) {
          handleDown(Math.abs(delta));
        } else {
          handleUp(Math.abs(delta));
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [handleDown, handleUp, emitScrollImpulse]);

  // Touch Event Listener: Mobile & Tablet Swipe Gesture Handling
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = (e) => {
      if (isTransitioningRef.current) return;
      if (!e.changedTouches || !e.changedTouches[0]) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const diffY = touchStartYRef.current - touchEndY;
      const diffX = touchStartXRef.current - touchEndX;

      // Ignore predominantly horizontal gestures
      if (Math.abs(diffX) > Math.abs(diffY)) return;

      // Deliberate vertical swipe threshold of 45px
      if (Math.abs(diffY) > 45) {
        if (diffY > 0) {
          // Swipe up -> move down
          handleDown(Math.abs(diffY));
        } else {
          // Swipe down -> move up
          handleUp(Math.abs(diffY));
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleDown, handleUp]);

  // Keyboard Navigation: ArrowDown, ArrowUp, PageDown, PageUp, Space, Home, End
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        handleDown(50);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        handleUp(50);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToFooter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDown, handleUp, goToSection, scrollToFooter]);

  // Strictly vertical transition variants (pure Y position + opacity, zero blur, zero scale)
  const sceneVariants = {
    initial: (dir) => ({
      y: dir > 0 ? '100%' : '-100%',
      opacity: 0.95
    }),
    animate: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (dir) => ({
      y: dir > 0 ? '-100%' : '100%',
      opacity: 0.95,
      transition: {
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Compile complete dot list including every main section PLUS the Footer
  const allDotLabels = [...sectionLabels];
  while (allDotLabels.length < totalSections) {
    allDotLabels.push(`Scene 0${allDotLabels.length + 1}`);
  }
  allDotLabels.push('Footer · Orion Mall');

  return (
    <FullPageScrollContext.Provider
      value={{
        activeSection,
        totalSections,
        isAtFooter,
        goToSection,
        nextSection,
        prevSection,
        scrollToFooter,
        scrollToLastSectionFromFooter
      }}
    >
      <div
        ref={containerRef}
        style={{
          height: containerHeight ? `${containerHeight}px` : 'calc(100svh - 4rem)',
          minHeight: '480px'
        }}
        className="relative w-full overflow-hidden select-none bg-[var(--bg-canvas)]"
      >
        {/* Cinematic Scene Stage */}
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            key={`${pageId}-scene-${activeSection}`}
            custom={direction}
            variants={sceneVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden oversized-content-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {sections[activeSection]}
          </motion.div>
        </AnimatePresence>

        {/* Fixed Vertical Navigation Dots on the Right: Sections + Footer */}
        <aside
          aria-label="Scene navigation dots"
          className="fixed right-3.5 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 pointer-events-auto"
        >
          {allDotLabels.map((label, idx) => {
            const isFooterDot = idx === totalSections;
            const isActive = isFooterDot ? isAtFooter : (!isAtFooter && idx === activeSection);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToSection(idx)}
                aria-label={`Navigate to ${label}`}
                title={label}
                className="group relative flex items-center justify-center p-1.5 cursor-pointer focus-visible:outline-none"
              >
                {/* Tooltip Label on Hover */}
                <span className="pointer-events-none absolute right-full mr-3.5 px-2.5 py-1 rounded-lg text-xs font-medium font-mono-tabular uppercase tracking-wider text-white bg-[#1a102b]/95 border border-white/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl hidden md:inline-block">
                  {label}
                </span>

                {/* Dot Element */}
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-3.5 h-3.5 bg-[var(--accent-coral)] ring-4 ring-[var(--accent-coral)]/30 scale-110 shadow-lg'
                      : 'w-2 h-2 bg-[var(--text-primary)]/40 hover:bg-[var(--text-primary)]/80 hover:scale-125'
                  }`}
                />
              </button>
            );
          })}
        </aside>
      </div>
    </FullPageScrollContext.Provider>
  );
}
