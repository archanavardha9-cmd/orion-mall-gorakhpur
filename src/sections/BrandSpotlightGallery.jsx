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
        tagline: 'Tailored menswear, premium denim & contemporary wardrobe essentials',
        accentColor: '#D6492E',
        tint: 'from-rose-200/85 via-orange-100/75 to-amber-200/80 dark:from-rose-950/85 dark:via-stone-900/85 dark:to-amber-950/80',
        activeSurface: 'bg-[#fce8e2] dark:bg-[#3a1f24] border-[#D6492E]',
        icon: Shirt,
        route: '/shopping',
        ctaLabel: 'Clothing & Fashion',
        brands: [
          'Louis Philippe',
          "Levi's",
          'MAX Fashion',
          'Van Heusen'
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
      'MAX Fashion',
      'Van Heusen',
      'KFC',
      'Burger King',
      "Domino's Pizza",
      'Skechers',
      'Reebok',
      'Crocs',
      'Samsung Experience Store',
      'PVR INOX Cinemas',
      'Lavie'
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
      minHeight="min-h-[calc(100svh-4rem)]"
      className="py-6 md:py-8 flex items-center"
    >
      <div className="max-w-[1440px] mx-auto w-full px-5 md:px-10 my-auto">
        <DepthEmergeSection>
          <div className="space-y-5 lg:space-y-6">
            {/* Top Bar: Section Heading (Left) + Stepper/Autoplay Controls (Right) */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-2xl px-4 sm:px-6 py-2.5 shadow-xl max-w-full">
                <ScrollReveal variant="rise">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-plum)] leading-tight">
                    Signature Brands
                  </p>
                </ScrollReveal>
                <ScrollReveal variant="rise" delay={0.03}>
                  <h2 className="font-display text-xl sm:text-3xl font-semibold text-[var(--text-primary)] mt-0.5 leading-none whitespace-normal sm:whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                    Flagship Retail Collection
                  </h2>
                </ScrollReveal>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setAutoCycle((c) => !c)}
                  aria-label={autoCycle ? 'Pause brand spotlight' : 'Play brand spotlight'}
                  className="inline-flex items-center gap-1.5 px-3 h-8 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[11px] font-semibold text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer shadow-sm"
                >
                  {autoCycle ? (
                    <>
                      <Pause className="w-3 h-3 text-[var(--accent-coral)]" />
                      <span>Auto</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-[var(--accent-turquoise)]" />
                      <span>Play</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => stepBrand(-1)}
                  aria-label="Previous brand"
                  className="w-8 h-8 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => stepBrand(1)}
                  aria-label="Next brand"
                  className="w-8 h-8 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer shadow-sm"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 12-Column Brand Spotlight: Brand Image & Cards on Left + Category Nav & Brand List on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-8 items-start lg:items-center">
              {/* RIGHT (Desktop) / FIRST (Mobile): Category Navigation slightly upward directly above Brand List Card */}
              <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-2.5 sm:gap-4">
                {/* 6-Category Navigation cleanly separated above the Brand List Card */}
                <div
                  role="tablist"
                  aria-label="Browse brands by shopping and lifestyle category"
                  className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-md w-full"
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
                        className={`relative inline-flex items-center justify-between gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 min-h-[30px] sm:min-h-[34px] rounded-xl text-[10px] sm:text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap min-w-0 ${
                          isActive
                            ? 'text-white'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="signature-category-indicator"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            className="absolute inset-0 rounded-xl shadow-sm"
                            style={{ backgroundColor: cat.accentColor }}
                            aria-hidden="true"
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1 min-w-0">
                          <Icon
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0"
                            style={isActive ? undefined : { color: cat.accentColor }}
                          />
                          <span className="truncate">{cat.label}</span>
                        </span>
                        <span
                          className={`relative z-10 font-mono-tabular text-[10px] opacity-85 shrink-0 ${
                            isActive ? 'text-white/90' : 'text-[var(--text-muted)]'
                          }`}
                        >
                          {cat.brands.length}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Compact & Clean Brand List Card with clear visual gap below Categories */}
                <div className="relative overflow-hidden backdrop-blur-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-3 sm:p-5 shadow-2xl">
                  <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-2xl opacity-20 pointer-events-none transition-colors duration-500"
                    style={{ backgroundColor: activeCategory.accentColor }}
                  />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="relative z-10 space-y-2.5 sm:space-y-3.5"
                    >
                      {/* Category Header */}
                      <div className="space-y-0.5 sm:space-y-1 border-b border-[var(--border-hairline)] pb-2">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono-tabular font-bold uppercase tracking-[0.14em]"
                            style={{ color: activeCategory.accentColor }}
                          >
                            <activeCategory.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                            <span>{activeCategory.label}</span>
                          </span>
                          <span className="font-mono-tabular text-[10px] sm:text-[11px] font-semibold text-[var(--text-muted)] whitespace-nowrap shrink-0">
                            {activeCategory.brands.length}{' '}
                            {activeCategory.brands.length === 1 ? 'Brand' : 'Brands'}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] leading-tight sm:leading-relaxed line-clamp-1 sm:line-clamp-none">
                          {activeCategory.tagline}
                        </p>
                      </div>

                      {/* Brand List: 2 per row on mobile, reduced height & compact brand logos */}
                      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2 py-0.5">
                        {activeCategory.brands.map((brandName, idx) => {
                          const isSelected = activeStory.name === brandName;
                          return (
                            <motion.button
                              key={brandName}
                              type="button"
                              initial={{ opacity: 0, scale: 0.94 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: idx * 0.02 }}
                              onClick={() => handleSelectBrand(brandName)}
                              aria-pressed={isSelected}
                              className={`group flex items-center gap-1.5 sm:gap-2 rounded-xl border transition-all duration-200 cursor-pointer pr-2 sm:pr-3 p-1 sm:p-1.5 ${
                                isSelected
                                  ? `${activeCategory.activeSurface} scale-[1.02] shadow-md`
                                  : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
                              }`}
                            >
                              <BrandMark
                                name={brandName}
                                size="sm"
                                className="!h-7 !min-w-[2.5rem] !max-w-[4.5rem] sm:!h-9 sm:!min-w-[3.25rem] sm:!max-w-[6.25rem]"
                              />
                              <span className="font-semibold text-[11px] sm:text-xs text-[var(--text-primary)] whitespace-nowrap truncate">
                                {brandName}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Card Footer */}
                      <div className="pt-2 sm:pt-2.5 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-1.5">
                        <span className="text-[10px] sm:text-[11px] text-[var(--text-muted)] truncate max-w-[55%]">
                          {activeStory.specialty}
                        </span>
                        <button
                          type="button"
                          onClick={() => navigate(activeCategory.route)}
                          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold hover:underline cursor-pointer whitespace-nowrap"
                          style={{ color: activeCategory.accentColor }}
                        >
                          <span>Explore {activeCategory.ctaLabel}</span>
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* LEFT (Desktop) / SECOND (Mobile): Main Brand Image + Floating Crest & Detail Info Cards */}
              <div className="lg:col-span-6 order-2 lg:order-1 relative pt-5 sm:pt-9 pb-0 sm:pb-6 flex flex-col sm:flex-row items-center justify-center">
                {/* Layer 3: Brand Name & Logo Crest overlapping upper edge cleanly below heading */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`crest-${activeStory.name}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute top-1 left-2 sm:left-4 z-30 backdrop-blur-xl bg-gradient-to-r ${activeStory.tint} border-2 border-[var(--glass-border)] rounded-2xl px-3.5 sm:px-4 py-2 shadow-xl flex items-center gap-2.5 sm:gap-3`}
                  >
                    <BrandMark name={activeStory.name} size="md" />
                    <div>
                      <p
                        className="font-mono-tabular text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: activeStory.accentColor }}
                      >
                        {activeStory.categoryLabel}
                      </p>
                      <p className="font-display text-lg sm:text-2xl font-semibold text-[var(--text-primary)] leading-none mt-0.5">
                        {activeStory.name}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Layer 1: Main Brand Experience Photography */}
                <Interactive3DTilt intensity={5} className="w-full sm:w-[92%] relative z-10">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[16/10] sm:aspect-[4/3] max-h-[360px] lg:max-h-[410px] bg-[var(--bg-surface)]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${activeStory.name}-${activeStory.primaryImg}`}
                        src={activeStory.primaryImg}
                        alt={`${activeStory.name} — ${activeStory.specialty}`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>
                </Interactive3DTilt>

                {/* Layer 2: Brand Information Card (stacked cleanly on mobile, floating lower-right on sm+) */}
                <ParallaxDepth
                  offset={-20}
                  horizontal={10}
                  className="w-full sm:w-auto sm:absolute sm:right-2 sm:bottom-0 mt-3 sm:mt-0 sm:max-w-[270px] z-20"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`detail-${activeStory.name}`}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="backdrop-blur-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-2xl p-3.5 sm:p-4 shadow-2xl space-y-1"
                    >
                      <p
                        className="font-mono-tabular text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: activeStory.accentColor }}
                      >
                        {activeStory.specialty} · {String(categoryBrandIdx).padStart(2, '0')}/
                        {String(activeCategory.brands.length).padStart(2, '0')}
                      </p>
                      <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed line-clamp-2">
                        {activeStory.highlight}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </ParallaxDepth>
              </div>
            </div>
          </div>
        </DepthEmergeSection>
      </div>
    </VideoBackdropSection>
  );
}
