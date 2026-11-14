import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Film,
  Footprints,
  Pause,
  Play,
  Shirt,
  ShoppingBag,
  Smartphone,
  UtensilsCrossed
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { BrandMark } from '../components/BrandMark';
import {
  DepthEmergeSection,
  Interactive3DTilt,
  ParallaxDepth
} from '../animations/MotionPrimitives';
import { ScrollReveal } from '../animations/ScrollReveal';
import { BRAND_IMAGES, VIDEO_ASSETS } from '../assets/mediaRegistry';
import { FLOOR_LEVELS } from '../utils/mallData';
import { useRouter } from '../utils/router';

const BRAND_CATEGORIES = [
  {
    id: 'clothing',
    label: 'Clothing & Fashion',
    tagline: 'Tailored menswear, denim craft, womenswear & kids style',
    accentColor: '#D6492E',
    tint: 'from-rose-200/85 via-orange-100/75 to-amber-200/80 dark:from-rose-950/85 dark:via-stone-900/85 dark:to-amber-950/80',
    activeSurface: 'bg-[#fce8e2] dark:bg-[#3a1f24] border-[#D6492E]',
    icon: Shirt,
    route: '/shopping',
    ctaLabel: 'Clothing & Fashion',
    brands: [
      'MAX Fashion',
      'UCB',
      "Levi's",
      'Van Heusen',
      'Louis Philippe',
      'ColorPlus',
      'Being Human',
      'Allen Solly',
      'Peter England',
      'Pepe Jeans London',
      'Spykar',
      'Mufti',
      'Soch',
      'W',
      'Aurelia',
      'Van Heusen Woman',
      'U.S. Polo Assn. Kids'
    ]
  },
  {
    id: 'dining',
    label: 'Food & Dining',
    tagline: 'Flame-grilled burgers, crispy buckets & oven-fresh pizza',
    accentColor: '#D97706',
    tint: 'from-amber-200/85 via-orange-100/75 to-rose-200/80 dark:from-amber-950/85 dark:via-orange-950/85 dark:to-stone-900/80',
    activeSurface: 'bg-[#fef0d7] dark:bg-[#3a2815] border-[#D97706]',
    icon: UtensilsCrossed,
    route: '/dining',
    ctaLabel: 'Food & Dining',
    brands: ['KFC', 'Burger King', "Domino's Pizza"]
  },
  {
    id: 'footwear',
    label: 'Footwear',
    tagline: 'Cushioned sneakers, performance trainers & iconic clogs',
    accentColor: '#0C8A7B',
    tint: 'from-teal-200/85 via-emerald-100/75 to-cyan-200/80 dark:from-teal-950/85 dark:via-emerald-950/85 dark:to-slate-900/80',
    activeSurface: 'bg-[#d8f3ec] dark:bg-[#143335] border-[#0C8A7B]',
    icon: Footprints,
    route: '/shopping',
    ctaLabel: 'Footwear Brands',
    brands: ['Skechers', 'Reebok', 'Crocs']
  },
  {
    id: 'electronics',
    label: 'Electronics',
    tagline: 'Flagship smartphones, tablets & connected Galaxy devices',
    accentColor: '#2563EB',
    tint: 'from-sky-200/85 via-blue-100/75 to-indigo-200/80 dark:from-sky-950/85 dark:via-blue-950/85 dark:to-slate-900/80',
    activeSurface: 'bg-[#dceafe] dark:bg-[#192848] border-[#2563EB]',
    icon: Smartphone,
    route: '/shopping',
    ctaLabel: 'Electronics Showroom',
    brands: ['Samsung Experience Store']
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    tagline: 'Multi-screen laser cinema with Dolby surround acoustics',
    accentColor: '#6C3EB8',
    tint: 'from-violet-200/85 via-purple-100/75 to-fuchsia-200/80 dark:from-violet-950/85 dark:via-purple-950/85 dark:to-slate-900/80',
    activeSurface: 'bg-[#ece1fb] dark:bg-[#2a1d47] border-[#6C3EB8]',
    icon: Film,
    route: '/entertainment',
    ctaLabel: 'Cinema Experience',
    brands: ['PVR INOX Cinemas']
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle & Accessories',
    tagline: 'Statement handbags, structured totes & evening clutches',
    accentColor: '#C73468',
    tint: 'from-pink-200/85 via-rose-100/75 to-purple-200/80 dark:from-pink-950/85 dark:via-rose-950/85 dark:to-purple-950/80',
    activeSurface: 'bg-[#fce2ec] dark:bg-[#3a1a2d] border-[#C73468]',
    icon: ShoppingBag,
    route: '/shopping',
    ctaLabel: 'Lifestyle Wing',
    brands: ['Lavie']
  }
];

export function BrandSpotlightGallery() {
  const { navigate } = useRouter();

  const brandDetailsMap = useMemo(() => {
    const map = {};
    FLOOR_LEVELS.forEach((level) => {
      level.brands.forEach((brand) => {
        map[brand.name] = {
          name: brand.name,
          specialty: brand.category,
          highlight: brand.highlight,
          image: brand.image || BRAND_IMAGES[brand.name]
        };
      });
    });
    return map;
  }, []);

  const orderedStories = useMemo(() => {
    return BRAND_CATEGORIES.flatMap((cat) =>
      cat.brands.map((brandName) => {
        const meta = brandDetailsMap[brandName] || {};
        return {
          name: brandName,
          categoryId: cat.id,
          categoryLabel: cat.label,
          accentColor: cat.accentColor,
          tint: cat.tint,
          route: cat.route,
          specialty: meta.specialty || cat.label,
          highlight: meta.highlight || cat.tagline,
          primaryImg: meta.image || BRAND_IMAGES[brandName]
        };
      })
    );
  }, [brandDetailsMap]);

  const featuredCycle = useMemo(() => {
    const spotlightNames = [
      'Louis Philippe',
      "Levi's",
      'KFC',
      'Skechers',
      'Samsung Experience Store',
      'PVR INOX Cinemas',
      'Lavie',
      'Soch',
      'Burger King',
      'Crocs',
      "Domino's Pizza"
    ];
    return spotlightNames
      .map((name) => orderedStories.find((s) => s.name === name))
      .filter(Boolean);
  }, [orderedStories]);

  const [activeCategoryId, setActiveCategoryId] = useState(BRAND_CATEGORIES[0].id);
  const [activeBrandName, setActiveBrandName] = useState(BRAND_CATEGORIES[0].brands[0]);
  const [autoCycle, setAutoCycle] = useState(true);

  const activeCategory = useMemo(
    () => BRAND_CATEGORIES.find((cat) => cat.id === activeCategoryId) || BRAND_CATEGORIES[0],
    [activeCategoryId]
  );

  const activeStory = useMemo(
    () =>
      orderedStories.find((story) => story.name === activeBrandName) ||
      orderedStories.find((story) => story.categoryId === activeCategory.id) ||
      orderedStories[0],
    [orderedStories, activeBrandName, activeCategory.id]
  );

  useEffect(() => {
    if (!autoCycle || featuredCycle.length === 0) return undefined;
    const timer = window.setInterval(() => {
      setActiveBrandName((prevName) => {
        const idx = featuredCycle.findIndex((s) => s.name === prevName);
        const nextStory = featuredCycle[(idx + 1) % featuredCycle.length];
        setActiveCategoryId(nextStory.categoryId);
        return nextStory.name;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [autoCycle, featuredCycle]);

  const handleSelectCategory = (cat) => {
    setAutoCycle(false);
    setActiveCategoryId(cat.id);
    if (cat.brands[0]) {
      setActiveBrandName(cat.brands[0]);
    }
  };

  const handleSelectBrand = (brandName) => {
    setAutoCycle(false);
    setActiveBrandName(brandName);
  };

  const stepBrand = (delta) => {
    setAutoCycle(false);
    const idx = orderedStories.findIndex((s) => s.name === activeStory.name);
    const base = idx === -1 ? 0 : idx;
    const nextStory = orderedStories[(base + delta + orderedStories.length) % orderedStories.length];
    setActiveCategoryId(nextStory.categoryId);
    setActiveBrandName(nextStory.name);
  };

  const categoryBrandIdx = Math.max(0, activeCategory.brands.indexOf(activeStory.name)) + 1;

  return (
    <VideoBackdropSection
      video={VIDEO_ASSETS.firstRetail}
      scrim="jewelMist"
      className="flex flex-col justify-center py-4 md:py-6"
    >
      <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12 space-y-3.5 my-auto">
        <DepthEmergeSection>
          <div className="space-y-3.5">
            {/* Section Title + Smooth Category Navigation Bar */}
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-2xl px-5 py-2 shadow-xl self-start">
                  <ScrollReveal variant="rise">
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-plum)]">
                      Signature Brands
                    </p>
                  </ScrollReveal>
                  <ScrollReveal variant="rise" delay={0.04}>
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mt-0.5 leading-none">
                      Curated Retail Icons
                    </h2>
                  </ScrollReveal>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setAutoCycle((c) => !c)}
                    aria-label={autoCycle ? 'Pause brand spotlight' : 'Play brand spotlight'}
                    className="inline-flex items-center gap-1.5 px-3 h-8 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer shadow-sm"
                  >
                    {autoCycle ? (
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
                  <button
                    type="button"
                    onClick={() => stepBrand(-1)}
                    aria-label="Previous brand"
                    className="w-8 h-8 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepBrand(1)}
                    aria-label="Next brand"
                    className="w-8 h-8 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer shadow-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Compact Interactive 6-Category Navigation */}
              <div
                role="tablist"
                aria-label="Browse brands by shopping and lifestyle category"
                className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-xl"
              >
                {BRAND_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = cat.id === activeCategory.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectCategory(cat)}
                      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[32px] rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'text-white'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="signature-category-indicator"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-xl shadow-md"
                          style={{ backgroundColor: cat.accentColor }}
                          aria-hidden="true"
                        />
                      )}
                      <Icon
                        className="relative z-10 w-3.5 h-3.5 shrink-0"
                        style={isActive ? undefined : { color: cat.accentColor }}
                      />
                      <span className="relative z-10">{cat.label}</span>
                      <span
                        className={`relative z-10 font-mono-tabular text-[10px] opacity-85 ${
                          isActive ? 'text-white/90' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {cat.brands.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 12-Column Brand Spotlight + Active Category Discovery Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* LEFT: Dynamic Visual Stage */}
              <div className="lg:col-span-7 relative min-h-[220px] sm:min-h-[300px] flex items-center justify-center">
                <Interactive3DTilt intensity={5} className="w-[88%] relative z-10">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[16/10] bg-[var(--bg-surface)]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${activeStory.name}-${activeStory.primaryImg}`}
                        src={activeStory.primaryImg}
                        alt={`${activeStory.name} — ${activeStory.specialty}`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>
                </Interactive3DTilt>

                {/* Layer 2: Floating Specialty Plaque */}
                <ParallaxDepth
                  className="hidden sm:block absolute right-0 bottom-1 max-w-[240px] z-20"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`detail-${activeStory.name}`}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-2xl p-3 shadow-xl space-y-1"
                    >
                      <p
                        className="font-mono-tabular text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: activeStory.accentColor }}
                      >
                        {activeStory.specialty} · {String(categoryBrandIdx).padStart(2, '0')}/
                        {String(activeCategory.brands.length).padStart(2, '0')}
                      </p>
                      <p className="text-xs text-[var(--text-primary)] font-medium leading-snug">
                        {activeStory.highlight}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </ParallaxDepth>

                {/* Layer 3: Official Brand Mark Crest Plate */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`crest-${activeStory.name}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute -top-3 left-3 sm:left-5 z-30 bg-gradient-to-r ${activeStory.tint} border-2 border-[var(--glass-border)] rounded-xl px-3 py-1.5 shadow-xl flex items-center gap-2.5`}
                  >
                    <BrandMark name={activeStory.name} size="md" />
                    <div>
                      <p
                        className="font-mono-tabular text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: activeStory.accentColor }}
                      >
                        {activeStory.categoryLabel}
                      </p>
                      <p className="font-display text-base sm:text-lg font-semibold text-[var(--text-primary)] leading-none mt-0.5">
                        {activeStory.name}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* RIGHT: Active Category Discovery Showcase */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="relative z-10 space-y-3"
                    >
                      {/* Category Visual Identity Header */}
                      <div className="space-y-1 border-b border-[var(--border-hairline)] pb-2">
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-mono-tabular font-bold uppercase tracking-[0.16em]"
                            style={{ color: activeCategory.accentColor }}
                          >
                            <activeCategory.icon className="w-3.5 h-3.5 shrink-0" />
                            <span>{activeCategory.label}</span>
                          </span>
                          <span className="font-mono-tabular text-xs font-semibold text-[var(--text-muted)] whitespace-nowrap shrink-0">
                            {activeCategory.brands.length}{' '}
                            {activeCategory.brands.length === 1 ? 'Brand' : 'Brands'}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          {activeCategory.tagline}
                        </p>
                      </div>

                      {/* Brands Belonging Exclusively to Selected Category */}
                      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto py-1">
                        {activeCategory.brands.map((brandName, idx) => {
                          const isSelected = activeStory.name === brandName;
                          return (
                            <motion.button
                              key={brandName}
                              type="button"
                              initial={{ opacity: 0, scale: 0.94 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: idx * 0.015 }}
                              onClick={() => handleSelectBrand(brandName)}
                              aria-pressed={isSelected}
                              className={`group flex items-center gap-1.5 rounded-xl border transition-all duration-200 cursor-pointer pr-2.5 p-1 ${
                                isSelected
                                  ? `${activeCategory.activeSurface} scale-[1.03] shadow-md`
                                  : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
                              }`}
                            >
                              <BrandMark
                                name={brandName}
                                size="sm"
                              />
                              <span className="font-semibold text-xs text-[var(--text-primary)] whitespace-nowrap">
                                {brandName}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Category Footer Metadata & Action Link */}
                      <div className="pt-2 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {activeStory.specialty} · {activeStory.categoryLabel}
                        </span>
                        <button
                          type="button"
                          onClick={() => navigate(activeCategory.route)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline cursor-pointer whitespace-nowrap"
                          style={{ color: activeCategory.accentColor }}
                        >
                          <span>Explore {activeCategory.ctaLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </DepthEmergeSection>
      </div>
    </VideoBackdropSection>
  );
}
