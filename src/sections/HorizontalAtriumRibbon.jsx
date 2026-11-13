import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Pause,
  Play
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { BrandMark } from '../components/BrandMark';
import { DepthEmergeSection, DramaticReveal } from '../animations/MotionPrimitives';
import { BRAND_IMAGES, IMAGE_ASSETS, VIDEO_ASSETS } from '../assets/mediaRegistry';
import { FLOOR_LEVELS } from '../utils/mallData';
import { useRouter } from '../utils/router';

const FLOOR_STAGE_VISUALS = {
  ground: {
    main: BRAND_IMAGES['Van Heusen'],
    inset: BRAND_IMAGES['Samsung Experience Store'],
    insetLabel: 'Tech & Tailoring'
  },
  first: {
    main: BRAND_IMAGES['Pepe Jeans London'],
    inset: BRAND_IMAGES.Skechers,
    insetLabel: 'Denim & Footwear'
  },
  second: {
    main: BRAND_IMAGES.Soch,
    inset: BRAND_IMAGES.Lavie,
    insetLabel: 'Couture & Handbags'
  },
  third: {
    main: BRAND_IMAGES['Burger King'],
    inset: BRAND_IMAGES['Jawed Habib'],
    insetLabel: 'Dining & Grooming'
  },
  fourth: {
    main: BRAND_IMAGES['PVR INOX Cinemas'],
    inset: IMAGE_ASSETS.posterAction,
    insetLabel: 'Laser Multiplex'
  },
  fifth: {
    main: IMAGE_ASSETS.mallAtriumEmpty,
    inset: null,
    insetLabel: 'Skylight Truss'
  }
};

const verticalFloorVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction >= 0 ? '26%' : '-26%',
    scale: 0.94
  }),
  center: {
    opacity: 1,
    y: '0%',
    scale: 1,
    transition: {
      duration: 0.78,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction >= 0 ? '-22%' : '22%',
    scale: 0.96,
    transition: {
      duration: 0.68,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const CYCLE_DURATION_MS = 4500;

export function HorizontalAtriumRibbon() {
  const [stepState, setStepState] = useState({ step: 0, direction: 1 });
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [manualTick, setManualTick] = useState(0);
  const { navigate } = useRouter();

  const totalFloors = FLOOR_LEVELS.length;
  const activeIndex = ((stepState.step % totalFloors) + totalFloors) % totalFloors;
  const activeFloor = FLOOR_LEVELS[activeIndex];
  const activeVisual = FLOOR_STAGE_VISUALS[activeFloor.id] || {
    main: IMAGE_ASSETS.mallAtriumEmpty,
    inset: null,
    insetLabel: ''
  };

  // Seamless, infinite vertical loop across all floors — never stalls or jumps on wrap
  useEffect(() => {
    if (!isAutoPlaying) return undefined;
    const timer = window.setInterval(() => {
      setStepState((prev) => ({
        step: prev.step + 1,
        direction: 1
      }));
    }, CYCLE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [isAutoPlaying, manualTick]);

  const goStep = (delta) => {
    setStepState((prev) => ({
      step: prev.step + delta,
      direction: delta >= 0 ? 1 : -1
    }));
    setManualTick((n) => n + 1);
  };

  const selectFloorIndex = (targetIdx) => {
    if (targetIdx === activeIndex) return;
    const delta = targetIdx - activeIndex;
    setStepState((prev) => ({
      step: prev.step + delta,
      direction: delta >= 0 ? 1 : -1
    }));
    setManualTick((n) => n + 1);
  };

  const routeForFloor = (id) => {
    if (id === 'third') return '/dining';
    if (id === 'fourth') return '/entertainment';
    if (id === 'fifth') return '/explore';
    return '/shopping';
  };

  return (
    <VideoBackdropSection
      video={VIDEO_ASSETS.exteriorDusk}
      scrim="lightMist"
      minHeight="min-h-[88vh]"
      className="py-20 md:py-28 flex flex-col justify-center"
    >
      <DepthEmergeSection>
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 space-y-10">
          {/* Section Header + Elevation Direction Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <DramaticReveal variant="rise">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-coral)] mb-2">
                Vertical Promenade
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-semibold text-[var(--text-primary)] leading-none">
                Floor by Floor
              </h2>
            </DramaticReveal>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => goStep(-1)}
                aria-label="Previous floor"
                className="w-11 h-11 rounded-full backdrop-blur-md bg-[var(--glass-panel)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => goStep(1)}
                aria-label="Next floor"
                className="w-11 h-11 rounded-full backdrop-blur-md bg-[var(--glass-panel)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsAutoPlaying((p) => !p)}
                aria-label={isAutoPlaying ? 'Pause floor showcase loop' : 'Resume floor showcase loop'}
                className="inline-flex items-center gap-2 px-4 h-11 rounded-full backdrop-blur-md bg-[var(--glass-panel)] border border-[var(--border-strong)] text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-turquoise)] transition-colors cursor-pointer whitespace-nowrap"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Auto</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Paused</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Non-Card Split Stage: Left Architectural Elevation Rail + Right Vertically Animated Floor Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* LEFT: Interactive Floor Elevation Rail (Replaces Horizontal Scroll) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-2 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-4 sm:p-5 shadow-2xl">
              <div className="divide-y divide-[var(--border-hairline)]">
                {FLOOR_LEVELS.map((floor, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={floor.id}
                      type="button"
                      onClick={() => selectFloorIndex(idx)}
                      className="relative w-full text-left py-3.5 px-3.5 flex items-center justify-between gap-4 rounded-2xl transition-colors cursor-pointer group"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="floor-elevation-rail-active"
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-sm"
                        />
                      )}

                      <div className="relative z-10 flex items-center gap-3.5 min-w-0">
                        <span
                          className="font-mono-tabular text-xs font-bold px-2.5 py-1 rounded-lg text-white shrink-0 transition-transform duration-300 group-hover:scale-105"
                          style={{
                            backgroundColor: isActive ? floor.accentColor : 'rgba(110, 98, 130, 0.45)'
                          }}
                        >
                          L{floor.number}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-semibold truncate transition-colors ${
                              isActive
                                ? 'text-[var(--text-primary)]'
                                : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                            }`}
                          >
                            {floor.label}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] truncate">
                            {floor.brands.length > 0
                              ? `${floor.brands.length} Destination${floor.brands.length > 1 ? 's' : ''}`
                              : 'Architectural Skylight Level'}
                          </p>
                        </div>
                      </div>

                      <ArrowRight
                        className={`relative z-10 w-4 h-4 shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'opacity-100 translate-x-0 text-[var(--accent-coral)]'
                            : 'opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-[var(--text-muted)]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Seamless Infinitely Looping Vertical Elevation Stage */}
            <div className="lg:col-span-8 relative min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] bg-[#140f1e]">
              <AnimatePresence initial={false} custom={stepState.direction} mode="sync">
                <motion.div
                  key={stepState.step}
                  custom={stepState.direction}
                  variants={verticalFloorVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full will-change-transform"
                >
                  {/* Full-Bleed Architectural / Brand Floor Imagery */}
                  <motion.img
                    src={activeVisual.main}
                    alt={`${activeFloor.label} — ${activeFloor.themeTitle}`}
                    referrerPolicy="no-referrer"
                    initial={{ scale: 1.07 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 4.4, ease: 'easeOut' }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Subtle Floor-Specific Color Atmosphere & Editorial Contrast Scrim */}
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 85% 18%, ${activeFloor.accentColor}, transparent 62%)`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/42 to-black/20 pointer-events-none" />

                  {/* Floor Content Overlay */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-9 md:p-11 text-white">
                    {/* Top Elevation Header + Secondary Detail Frame */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span
                          className="inline-block font-mono-tabular text-xs font-bold px-3 py-1 rounded-lg text-white shadow-md"
                          style={{ backgroundColor: activeFloor.accentColor }}
                        >
                          Level {activeFloor.number} · {activeFloor.label}
                        </span>
                        <p className="text-xs text-white/80 font-medium pt-1">
                          {activeFloor.subtitle}
                        </p>
                      </div>

                      {activeVisual.inset && (
                        <motion.div
                          initial={{ opacity: 0, y: 18, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                          className="hidden sm:block w-40 md:w-48 rounded-2xl overflow-hidden border border-white/30 shadow-2xl bg-black/40 shrink-0"
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={activeVisual.inset}
                              alt={`${activeFloor.label} highlight`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="px-3 py-1.5 text-[11px] font-medium text-white/90 truncate bg-black/55">
                            {activeVisual.insetLabel}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Bottom Floor Heading, Approved Brand Emblems & CTA */}
                    <div className="space-y-5">
                      <div>
                        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.02] text-white max-w-2xl">
                          {activeFloor.themeTitle}
                        </h3>
                      </div>

                      {activeFloor.brands.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {activeFloor.brands.map((brand) => (
                            <div
                              key={brand.name}
                              className="inline-flex items-center gap-2 pr-3 p-1 rounded-xl bg-black/48 border border-white/20 backdrop-blur-md"
                            >
                              <BrandMark name={brand.name} size="sm" />
                              <span className="text-xs font-semibold text-white whitespace-nowrap">
                                {brand.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-white/85 max-w-xl">
                          Skylight Truss Deck & Building Services · No Retail Stores Listed
                        </p>
                      )}

                      <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => navigate(routeForFloor(activeFloor.id))}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white hover:opacity-95 transition-opacity cursor-pointer shadow-lg whitespace-nowrap"
                          style={{ backgroundColor: activeFloor.accentColor }}
                        >
                          <span>
                            {activeFloor.id === 'fifth'
                              ? 'Walk 3D Atrium'
                              : `Explore ${activeFloor.label}`}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <span className="font-mono-tabular text-xs text-white/75">
                          0{activeIndex + 1} / 0{totalFloors}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Continuous Cycle Progress Hairline Bar */}
              {isAutoPlaying && (
                <motion.div
                  key={`progress-${stepState.step}-${manualTick}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: CYCLE_DURATION_MS / 1000, ease: 'linear' }}
                  style={{ originX: 0, backgroundColor: activeFloor.accentColor }}
                  className="absolute bottom-0 left-0 right-0 h-1 z-20"
                />
              )}
            </div>
          </div>
        </div>
      </DepthEmergeSection>
    </VideoBackdropSection>
  );
}
