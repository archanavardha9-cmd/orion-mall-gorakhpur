import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { BrandMark } from '../components/BrandMark';
import {
  DepthEmergeSection,
  Interactive3DTilt,
  ParallaxDepth
} from '../animations/MotionPrimitives';
import { BRAND_IMAGES, VIDEO_ASSETS } from '../assets/mediaRegistry';
import { FLOOR_LEVELS } from '../utils/mallData';
import { useRouter } from '../utils/router';

const FLOOR_TINTS = {
  ground:
    'from-amber-200/80 via-orange-100/60 to-rose-100/75 dark:from-amber-950/70 dark:via-stone-900/75 dark:to-purple-950/70',
  first:
    'from-teal-200/80 via-cyan-100/60 to-sky-100/75 dark:from-teal-950/70 dark:via-slate-900/75 dark:to-indigo-950/70',
  second:
    'from-purple-200/80 via-pink-100/60 to-amber-100/75 dark:from-purple-950/70 dark:via-rose-950/70 dark:to-stone-900/75',
  third:
    'from-orange-200/80 via-amber-100/60 to-rose-100/75 dark:from-amber-950/70 dark:via-stone-900/75 dark:to-rose-950/70',
  fourth:
    'from-indigo-200/80 via-violet-100/60 to-sky-100/75 dark:from-indigo-950/70 dark:via-purple-950/75 dark:to-slate-900/70'
};

function buildBrandStory(brand, floor) {
  return {
    name: brand.name,
    floor: floor.label,
    floorId: floor.id,
    floorNumber: floor.number,
    category: brand.category,
    highlight: brand.highlight,
    primaryImg: brand.image || BRAND_IMAGES[brand.name],
    tint: FLOOR_TINTS[floor.id] || FLOOR_TINTS.ground,
    accentColor: floor.accentColor
  };
}

export function BrandSpotlightGallery() {
  const allStories = useMemo(() => {
    return FLOOR_LEVELS.slice(0, 5).flatMap((floor) =>
      floor.brands.map((brand) => buildBrandStory(brand, floor))
    );
  }, []);

  const featuredCycle = useMemo(() => {
    const names = [
      'Louis Philippe',
      "Levi's",
      'Samsung Experience Store',
      'Crocs',
      'Pepe Jeans London',
      'Skechers',
      'Soch',
      'Lavie',
      'KFC',
      'Burger King',
      "Domino's Pizza",
      'Jawed Habib',
      'PVR INOX Cinemas'
    ];
    return names
      .map((name) => allStories.find((s) => s.name === name))
      .filter(Boolean);
  }, [allStories]);

  const [floorFilterIdx, setFloorFilterIdx] = useState(0);
  const [activeStory, setActiveStory] = useState(
    () => allStories.find((s) => s.name === 'Louis Philippe') || allStories[0]
  );
  const [autoCycle, setAutoCycle] = useState(true);
  const { navigate } = useRouter();

  const activeFloor = FLOOR_LEVELS[floorFilterIdx] || FLOOR_LEVELS[0];

  useEffect(() => {
    if (!autoCycle || featuredCycle.length === 0) return;
    const timer = window.setInterval(() => {
      setActiveStory((prev) => {
        const idx = featuredCycle.findIndex((b) => b.name === prev.name);
        const nextIdx = (idx + 1) % featuredCycle.length;
        return featuredCycle[nextIdx];
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [autoCycle, featuredCycle]);

  const stepFeatured = (delta) => {
    const idx = allStories.findIndex((b) => b.name === activeStory.name);
    const base = idx === -1 ? 0 : idx;
    const nextIdx = (base + delta + allStories.length) % allStories.length;
    const nextStory = allStories[nextIdx];
    setActiveStory(nextStory);
    const nextFloorIdx = FLOOR_LEVELS.findIndex((fl) => fl.id === nextStory.floorId);
    if (nextFloorIdx !== -1 && nextFloorIdx < 5) {
      setFloorFilterIdx(nextFloorIdx);
    }
  };

  return (
    <VideoBackdropSection
      video={VIDEO_ASSETS.shoppingReel}
      scrim="lightMist"
      minHeight="min-h-[92vh]"
      className="py-20 md:py-28 flex items-center"
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 space-y-12">
        <DepthEmergeSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* LEFT: Unique Category-Authentic Storefront Photography + Separate Brand Crest */}
            <div className="lg:col-span-7 relative min-h-[390px] sm:min-h-[470px] flex items-center">
              {/* Layer 1: Unique Brand Photography */}
              <Interactive3DTilt intensity={6} className="w-[90%] relative z-10">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] aspect-[4/3] bg-[var(--bg-surface)]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${activeStory.name}-${activeStory.primaryImg}`}
                      src={activeStory.primaryImg}
                      alt={`${activeStory.name} — ${activeStory.category}`}
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0, scale: 1.07 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>
              </Interactive3DTilt>

              {/* Layer 2: Floating Collection Detail Plaque (Parallax depth, zero repeated photos) */}
              <ParallaxDepth
                offset={-36}
                horizontal={16}
                className="hidden sm:block absolute right-0 bottom-3 max-w-[270px] z-20"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`detail-${activeStory.name}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.45 }}
                    className="backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-2xl p-5 shadow-2xl space-y-1.5"
                  >
                    <p
                      className="font-mono-tabular text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: activeStory.accentColor }}
                    >
                      Level {activeStory.floorNumber} · {activeStory.category}
                    </p>
                    <p className="text-xs md:text-sm text-[var(--text-primary)] font-medium leading-relaxed">
                      {activeStory.highlight}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </ParallaxDepth>

              {/* Layer 3: Visually Separate Brand Mark Crest Plate */}
              <motion.div
                key={`crest-${activeStory.name}`}
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className={`absolute -top-4 left-4 sm:left-6 z-30 backdrop-blur-xl bg-gradient-to-r ${activeStory.tint} border border-[var(--glass-border)] rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-4`}
              >
                <BrandMark name={activeStory.name} size="lg" />
                <div>
                  <p className="font-mono-tabular text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-coral)]">
                    {activeStory.floor}
                  </p>
                  <p className="font-display text-2xl font-semibold text-[var(--text-primary)] leading-none mt-0.5">
                    {activeStory.name}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Visual Brand Explorer & Authentic Emblem Wall */}
            <div className="lg:col-span-5 space-y-6 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-7 md:p-9 shadow-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--accent-plum)]">
                    Signature Brands
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mt-0.5">
                    Curated Retail Icons
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setAutoCycle((c) => !c)}
                    aria-label={autoCycle ? 'Pause gallery' : 'Play gallery'}
                    className="w-9 h-9 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
                  >
                    {autoCycle ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAutoCycle(false);
                      stepFeatured(-1);
                    }}
                    aria-label="Previous brand visual"
                    className="w-9 h-9 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAutoCycle(false);
                      stepFeatured(1);
                    }}
                    aria-label="Next brand visual"
                    className="w-9 h-9 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floor Filter Strip */}
              <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)]">
                {FLOOR_LEVELS.slice(0, 5).map((fl, idx) => (
                  <button
                    key={fl.id}
                    type="button"
                    onClick={() => {
                      setFloorFilterIdx(idx);
                      if (fl.brands[0]) {
                        setAutoCycle(false);
                        setActiveStory(buildBrandStory(fl.brands[0], fl));
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      floorFilterIdx === idx
                        ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {fl.shortLabel}
                  </button>
                ))}
              </div>

              {/* Pure Visual Brand Emblem Matrix */}
              <div className="flex flex-wrap gap-3 py-2">
                {activeFloor.brands.map((brand) => {
                  const isActive = activeStory.name === brand.name;
                  return (
                    <button
                      key={brand.name}
                      type="button"
                      onClick={() => {
                        setAutoCycle(false);
                        setActiveStory(buildBrandStory(brand, activeFloor));
                      }}
                      className={`group flex items-center gap-2.5 pr-3.5 p-1.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border-[var(--accent-coral)] bg-[var(--bg-tint-peach)] dark:bg-[var(--bg-tint-lavender)] scale-[1.03] shadow-md'
                          : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <BrandMark name={brand.name} size="sm" />
                      <span className="text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap">
                        {brand.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between gap-4">
                <span className="text-xs text-[var(--text-muted)]">
                  {activeStory.category} · {activeStory.floor}
                </span>
                <button
                  type="button"
                  onClick={() => navigate('/shopping')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-coral)] hover:underline cursor-pointer whitespace-nowrap"
                >
                  <span>Explore All Wings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </DepthEmergeSection>
      </div>
    </VideoBackdropSection>
  );
}
