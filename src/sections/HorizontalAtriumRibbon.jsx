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
import { DepthEmergeSection } from '../animations/MotionPrimitives';
import { ScrollReveal } from '../animations/ScrollReveal';
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
    inset: BRAND_IMAGES["Domino's Pizza"],
    insetLabel: 'Dining Terrace'
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
      scrim="jewelMist"
      className="flex flex-col justify-center py-4 md:py-6"
    >
      <DepthEmergeSection>
        <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12 space-y-4 my-auto">
          {/* Section Header + Elevation Direction Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-2xl px-5 py-2.5 shadow-xl self-start">
              <ScrollReveal variant="rise">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-coral)] mb-0.5">
                  Vertical Promenade
                </p>
              </ScrollReveal>
              <ScrollReveal variant="slideRight" delay={0.05}>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--text-primary)] leading-none">
                  Floor by Floor
                </h2>
              </ScrollReveal>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <ScrollReveal variant="pop" delay={0.08}>
                <button
                  type="button"
                  onClick={() => goStep(-1)}
                  aria-label="Previous floor"
                  className="w-9 h-9 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer shadow-sm"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </ScrollReveal>
              <ScrollReveal variant="pop" delay={0.12}>
                <button
                  type="button"
                  onClick={() => goStep(1)}
                  aria-label="Next floor"
                  className="w-9 h-9 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer shadow-sm"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </ScrollReveal>
              <ScrollReveal variant="pop" delay={0.16}>
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((p) => !p)}
                  aria-label={isAutoPlaying ? 'Pause floor showcase loop' : 'Resume floor showcase loop'}
                  className="inline-flex items-center gap-1.5 px-3 h-9 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-turquoise)] transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-[var(--accent-coral)]" />
                      <span>Auto</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-[var(--accent-turquoise)]" />
                      <span>Paused</span>
                    </>
                  )}
                </button>
              </ScrollReveal>
            </div>
          </div>

          {/* Split Stage: Left Elevation Rail + Right Vertically Animated Floor Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
            {/* LEFT: Interactive Floor Elevation Rail */}
            <ScrollReveal variant="slideRight" className="lg:col-span-4">
              <div className="flex flex-col justify-between gap-1 bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-2xl p-2 sm:p-3 shadow-xl h-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1 lg:gap-0 lg:divide-y divide-[var(--border-hairline)]">
                  {FLOOR_LEVELS.map((floor, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <ScrollReveal key={floor.id} variant="rise" delay={idx * 0.03}>
                        <button
                          type="button"
                          onClick={() => selectFloorIndex(idx)}
                          className="relative w-full text-left py-2 px-2.5 flex items-center justify-between gap-2 lg:gap-3 rounded-xl transition-colors cursor-pointer group"
                        >
                          {isActive && (
                            <motion.div
                              layoutId="floor-elevation-rail-active"
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute inset-0 rounded-xl bg-[var(--bg-tint-peach)]/75 dark:bg-[var(--bg-tint-lavender)]/85 border border-[var(--border-strong)] shadow-sm"
                            />
                          )}

                          <div className="relative z-10 flex items-center gap-2 lg:gap-2.5 min-w-0">
                            <span
                              className="font-mono-tabular text-[11px] font-bold px-2 py-0.5 rounded-md text-[#faf4eb] shrink-0 shadow-sm"
                              style={{
                                backgroundColor: isActive ? floor.accentColor : 'rgba(108, 62, 184, 0.55)'
                              }}
                            >
                              L{floor.number}
                            </span>
                            <div className="min-w-0">
                              <p
                                className={`text-xs font-semibold truncate transition-colors ${
                                  isActive
                                    ? 'text-[var(--text-primary)]'
                                    : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                                }`}
                              >
                                {floor.label}
                              </p>
                              <p className="text-[10px] text-[var(--text-muted)] truncate hidden sm:block">
                                {floor.brands.length > 0
                                  ? `${floor.brands.length} Destination${floor.brands.length > 1 ? 's' : ''}`
                                  : 'Architectural Skylight Level'}
                              </p>
                            </div>
                          </div>

                          <ArrowRight
                            className={`relative z-10 w-3.5 h-3.5 shrink-0 hidden lg:block transition-all duration-300 ${
                              isActive
                                ? 'opacity-100 translate-x-0 text-[var(--accent-coral)]'
                                : 'opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-[var(--text-muted)]'
                            }`}
                          />
                        </button>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT: Seamless Infinitely Looping Vertical Elevation Stage */}
            <ScrollReveal variant="scaleDepth" delay={0.06} className="lg:col-span-8">
              <div className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-[420px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] bg-[#140f1e] h-full">
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
                    <motion.img
                      src={activeVisual.main}
                      alt={`${activeFloor.label} — ${activeFloor.themeTitle}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      initial={{ scale: 1.07 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 4.4, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Vibrant Floor-Specific Color Glow & Editorial Contrast Scrim */}
                    <div
                      className="absolute inset-0 opacity-45 mix-blend-soft-light pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 82% 18%, ${activeFloor.accentColor}, transparent 64%)`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130c22]/90 via-[#19102c]/36 to-[#130c22]/18 pointer-events-none" />

                    <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 text-[#f7f3ec]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <span
                            className="inline-block font-mono-tabular text-xs font-bold px-2.5 py-0.5 rounded-lg text-[#faf4eb] shadow-md"
                            style={{ backgroundColor: activeFloor.accentColor }}
                          >
                            Level {activeFloor.number} · {activeFloor.label}
                          </span>
                          <p className="text-[11px] text-amber-100/90 font-medium pt-0.5">
                            {activeFloor.subtitle}
                          </p>
                        </div>

                        {activeVisual.inset && (
                          <motion.div
                            initial={{ opacity: 0, y: 14, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                            className="hidden sm:block w-32 md:w-40 rounded-xl overflow-hidden border border-white/35 shadow-2xl bg-[#160d26]/85 shrink-0"
                          >
                            <div className="aspect-[4/3] overflow-hidden">
                              <img
                                src={activeVisual.inset}
                                alt={`${activeFloor.label} highlight`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="px-2 py-1 text-[10px] font-medium text-amber-100 truncate bg-[#160d26]/90">
                              {activeVisual.insetLabel}
                            </p>
                          </motion.div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.04] text-[#f3ede2] max-w-2xl">
                            {activeFloor.themeTitle}
                          </h3>
                        </div>

                        {activeFloor.brands.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                            {activeFloor.brands.map((brand) => (
                              <div
                                key={brand.name}
                                className="inline-flex items-center gap-1.5 pr-2.5 p-1 rounded-lg bg-[#150e24]/85 border border-white/20"
                              >
                                <BrandMark name={brand.name} size="sm" />
                                <span className="text-[11px] font-semibold text-amber-100 whitespace-nowrap">
                                  {brand.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-[#f7f3ec]/90 max-w-xl">
                            Skylight Truss Deck &amp; Building Services · No Retail Stores Listed
                          </p>
                        )}

                        <div className="pt-0.5 flex flex-wrap items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => navigate(routeForFloor(activeFloor.id))}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#faf4eb] hover:opacity-95 transition-opacity cursor-pointer shadow-lg whitespace-nowrap"
                            style={{ backgroundColor: activeFloor.accentColor }}
                          >
                            <span>
                              {activeFloor.id === 'fifth'
                                ? 'Walk 3D Atrium'
                                : `Explore ${activeFloor.label}`}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <span className="font-mono-tabular text-xs text-amber-100/85">
                            0{activeIndex + 1} / 0{totalFloors}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {isAutoPlaying && (
                  <motion.div
                    key={`progress-${stepState.step}-${manualTick}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: CYCLE_DURATION_MS / 1000, ease: 'linear' }}
                    style={{ originX: 0, backgroundColor: activeFloor.accentColor }}
                    className="absolute bottom-0 left-0 right-0 h-1.5 z-20"
                  />
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </DepthEmergeSection>
    </VideoBackdropSection>
  );
}
