import { useState } from "react";
import { ShoppingBag, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { VideoBackdropSection } from "../components/VideoBackdropSection";
import { BrandMark } from "../components/BrandMark";
import {
  FullPageContainer,
  useFullPageScroll,
} from "../components/FullPageContainer";
import {
  DepthEmergeSection,
  Interactive3DTilt,
  ParallaxDepth,
} from "../animations/MotionPrimitives";
import { ScrollReveal } from "../animations/ScrollReveal";
import { VIDEO_ASSETS, IMAGE_ASSETS } from "../assets/mediaRegistry";
import { FLOOR_LEVELS } from "../utils/mallData";

const RETAIL_FLOORS = FLOOR_LEVELS.filter((f) =>
  ["ground", "first", "second"].includes(f.id),
);

// Number of brands shown before "View More" on mobile
const MOBILE_BRAND_PREVIEW = 4;

// ─── Brand Modal (mobile only) ────────────────────────────────────────────────
function BrandModal({
  brands,
  activeBrand,
  onSelect,
  onClose,
  accentColor,
  floorLabel,
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="brand-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={`All brands – ${floorLabel}`}
      >
        <motion.div
          key="brand-modal-panel"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
          className="w-full max-h-[80svh] bg-[var(--bg-surface-elevated)] rounded-t-3xl border-t-2 border-[var(--glass-border)] shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-[var(--border-strong)]" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-hairline)] shrink-0">
            <div>
              <p
                className="text-[11px] font-mono-tabular font-bold uppercase tracking-widest"
                style={{ color: accentColor }}
              >
                {floorLabel}
              </p>
              <p className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">
                All Brands · {brands.length} stores
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close brand list"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable brand grid */}
          <div className="overflow-y-auto overscroll-contain flex-1 p-4">
            <div className="flex flex-wrap gap-2.5">
              {brands.map((brand) => {
                const selected = activeBrand.name === brand.name;
                return (
                  <button
                    key={brand.name}
                    type="button"
                    onClick={() => {
                      onSelect(brand);
                      onClose();
                    }}
                    className={`flex items-center gap-2.5 pr-3 p-1.5 rounded-2xl border transition-all cursor-pointer active:scale-95 ${
                      selected
                        ? "border-[var(--accent-coral)] bg-[var(--bg-tint-peach)] dark:bg-[var(--bg-tint-lavender)] scale-[1.02] shadow-md"
                        : "border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <BrandMark name={brand.name} size="sm" />
                    <span className="text-xs font-semibold text-[var(--text-primary)]">
                      {brand.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom safe area padding */}
          <div
            className="pb-safe shrink-0"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Floor Brand List with View More (mobile-aware) ───────────────────────────
function FloorBrandList({
  brands,
  activeBrand,
  onSelect,
  accentColor,
  floorLabel,
  selectedClass,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const preview = brands.slice(0, MOBILE_BRAND_PREVIEW);

  return (
    <>
      <div className="flex flex-wrap gap-2.5">
        {/* On mobile: show only preview brands; on md+: show all */}
        {brands.map((brand, idx) => {
          const selected = activeBrand.name === brand.name;
          const isHiddenOnMobile = idx >= MOBILE_BRAND_PREVIEW;
          return (
            <ScrollReveal
              key={brand.name}
              variant="pop"
              delay={idx * 0.03}
              className={isHiddenOnMobile ? "hidden md:block" : ""}
            >
              <button
                type="button"
                onClick={() => onSelect(brand)}
                className={`flex items-center gap-2.5 pr-3 p-1.5 rounded-2xl border transition-all cursor-pointer ${
                  selected
                    ? selectedClass
                    : "border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]"
                }`}
              >
                <BrandMark name={brand.name} size="sm" />
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  {brand.name}
                </span>
              </button>
            </ScrollReveal>
          );
        })}

        {/* View More button – visible only on mobile when brands exceed preview count */}
        {brands.length > MOBILE_BRAND_PREVIEW && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer active:scale-95"
            style={{ borderColor: accentColor + "60" }}
          >
            <span>+{brands.length - MOBILE_BRAND_PREVIEW} more</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Modal (rendered at mobile viewport) */}
      {modalOpen && (
        <BrandModal
          brands={brands}
          activeBrand={activeBrand}
          onSelect={onSelect}
          onClose={() => setModalOpen(false)}
          accentColor={accentColor}
          floorLabel={floorLabel}
        />
      )}
    </>
  );
}

// ─── Shopping Hero Scene ───────────────────────────────────────────────────────
function ShoppingHeroScene() {
  const { goToSection } = useFullPageScroll();

  const floorTabs = [
    {
      id: "all",
      label: "All Levels",
      targetIndex: 1,
      color: "var(--accent-coral)",
    },
    { id: "ground", label: "Ground (9)", targetIndex: 1, color: "#D64E34" },
    { id: "first", label: "First (7)", targetIndex: 2, color: "#0C8A7B" },
    { id: "second", label: "Second (6)", targetIndex: 3, color: "#6C3EB8" },
  ];

  return (
    <VideoBackdropSection
      video={VIDEO_ASSETS.firstDenim}
      scrim="heroPrism"
      isHero
      minHeight="min-h-[calc(100svh-4rem)]"
      className="flex items-center py-8 md:py-16"
    >
      {/* ── Tablet & Desktop layout ── */}
      <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-5 md:gap-8 lg:gap-12 items-center">
        {/* Text column */}
        <div className="md:col-span-1 lg:col-span-6 space-y-2.5 sm:space-y-4 md:space-y-5 lg:space-y-5 text-white">
          <ScrollReveal variant="drop">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-200">
              <ShoppingBag className="w-4 h-4" />
              <span>Retail Flagships · 22 Stores</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideRight" delay={0.05}>
            <h1
              className="font-display font-semibold leading-[0.95] text-[#f3ede2] drop-shadow-[0_2px_12px_rgba(10,6,22,0.9)]"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 5.2rem)" }}
            >
              Three Levels of Curated Style
            </h1>
          </ScrollReveal>

          <p className="text-sm md:text-base text-[#f7f3ec] max-w-lg leading-relaxed drop-shadow-[0_1px_6px_rgba(10,6,22,0.85)]">
            Explore tailored menswear, iconic denim culture, festive ethnic
            couture, active footwear, and Galaxy flagship electronics across
            Ground, First &amp; Second Floors.
          </p>

          {/* Floor nav – visible on md+ in left column, hidden on mobile (shown below images) */}
          <div className="hidden md:inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl">
            {floorTabs.map((tab, idx) => (
              <ScrollReveal
                key={tab.id}
                variant="pop"
                delay={0.08 + idx * 0.04}
              >
                <button
                  type="button"
                  onClick={() => goToSection(tab.targetIndex)}
                  className="px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer text-[var(--text-primary)] hover:bg-[var(--bg-tint-peach)]/50"
                >
                  {tab.label}
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Image column – tablet gets larger proportions */}
        <div className="md:col-span-1 lg:col-span-6 relative min-h-[160px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[380px] flex items-center pr-0 sm:pr-4">
          <ParallaxDepth offset={-26} className="w-[80%] sm:w-[78%] ml-auto">
            <Interactive3DTilt intensity={5}>
              <ScrollReveal variant="scaleDepth" delay={0.08}>
                <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3] bg-[#2a1530]">
                  <img
                    src={IMAGE_ASSETS.brandLavie}
                    alt="Second Floor luxury handbags showcase inside Orion Mall"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </Interactive3DTilt>
          </ParallaxDepth>

          <ParallaxDepth
            offset={32}
            className="absolute left-0 bottom-0 w-[46%] z-20"
          >
            <ScrollReveal variant="slideLeft" delay={0.14}>
              <div className="animate-float-reverse rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-200/75 aspect-[4/3] bg-[#161b29]">
                <img
                  src={IMAGE_ASSETS.brandSamsung}
                  alt="Ground Floor Samsung flagship electronics showroom"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </ParallaxDepth>
        </div>

        {/* Floor nav – mobile only, shown below images */}
        <div className="md:hidden col-span-1 w-full flex justify-center pt-1">
          <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl">
            {floorTabs.map((tab, idx) => (
              <ScrollReveal
                key={tab.id}
                variant="pop"
                delay={0.08 + idx * 0.04}
              >
                <button
                  type="button"
                  onClick={() => goToSection(tab.targetIndex)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer text-[var(--text-primary)] hover:bg-[var(--bg-tint-peach)]/50"
                >
                  {tab.label}
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </VideoBackdropSection>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function ShoppingPage() {
  const [activeGroundBrand, setActiveGroundBrand] = useState(
    RETAIL_FLOORS[0].brands[0],
  );
  const [activeFirstBrand, setActiveFirstBrand] = useState(
    RETAIL_FLOORS[1].brands[0],
  );
  const [activeSecondBrand, setActiveSecondBrand] = useState(
    RETAIL_FLOORS[2].brands[0],
  );

  const sectionLabels = [
    "01 · Curated Lookbook",
    "02 · Level 00 Flagships",
    "03 · Level 01 Denim & Active",
    "04 · Level 02 Couture & Kids",
  ];

  return (
    <FullPageContainer pageId="shopping" sectionLabels={sectionLabels}>
      {/* Scene 1: Lookbook Hero */}
      <ShoppingHeroScene />

      {/* Scene 2: Ground Floor Flagship Icons & Tech */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.groundLuxury}
        scrim="jewelMist"
        minHeight="min-h-[calc(100svh-4rem)]"
        className="py-8 md:py-20 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <ScrollReveal variant="slideRight" className="lg:col-span-5">
                <div className="space-y-5 bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-5 sm:p-8 shadow-2xl">
                  <div>
                    <ScrollReveal variant="drop">
                      <p className="font-mono-tabular text-xs font-bold uppercase tracking-widest text-[var(--accent-coral)]">
                        Level 00 · Ground Floor
                      </p>
                    </ScrollReveal>
                    <ScrollReveal variant="rise" delay={0.04}>
                      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mt-1">
                        Flagship Icons &amp; Tech
                      </h2>
                    </ScrollReveal>
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                      9 flagship apparel, footwear &amp; Galaxy electronics
                      boutiques along the main atrium.
                    </p>
                  </div>

                  <FloorBrandList
                    brands={RETAIL_FLOORS[0].brands}
                    activeBrand={activeGroundBrand}
                    onSelect={setActiveGroundBrand}
                    accentColor="#D64E34"
                    floorLabel="Level 00 · Ground Floor"
                    selectedClass="border-[var(--accent-coral)] bg-[var(--bg-tint-peach)] dark:bg-[var(--bg-tint-lavender)] scale-[1.03] shadow-md"
                  />
                </div>
              </ScrollReveal>

              <div className="lg:col-span-7">
                <Interactive3DTilt intensity={6}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeGroundBrand.name}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      <ScrollReveal variant="scaleDepth">
                        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3]">
                          <img
                            src={activeGroundBrand.image}
                            alt={`${activeGroundBrand.name} — ${activeGroundBrand.category}`}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </ScrollReveal>
                      <ScrollReveal variant="slideLeft" delay={0.08}>
                        <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:left-6 bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-2xl px-5 py-3.5 shadow-2xl flex items-center gap-4">
                          <BrandMark name={activeGroundBrand.name} size="md" />
                          <div>
                            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] leading-none">
                              {activeGroundBrand.name}
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)] mt-1">
                              {activeGroundBrand.category} ·{" "}
                              {activeGroundBrand.highlight}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>
                    </motion.div>
                  </AnimatePresence>
                </Interactive3DTilt>
              </div>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>

      {/* Scene 3: First Floor Denim & Activewear */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.shoppingFirst}
        scrim="jewelMist"
        minHeight="min-h-[calc(100svh-4rem)]"
        className="py-8 md:py-20 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <Interactive3DTilt intensity={6}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFirstBrand.name}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      <ScrollReveal variant="scaleDepth">
                        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3]">
                          <img
                            src={activeFirstBrand.image}
                            alt={`${activeFirstBrand.name} — ${activeFirstBrand.category}`}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </ScrollReveal>
                      <ScrollReveal variant="slideRight" delay={0.08}>
                        <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:right-6 bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-2xl px-5 py-3.5 shadow-2xl flex items-center gap-4">
                          <BrandMark name={activeFirstBrand.name} size="md" />
                          <div>
                            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] leading-none">
                              {activeFirstBrand.name}
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)] mt-1">
                              {activeFirstBrand.category} ·{" "}
                              {activeFirstBrand.highlight}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>
                    </motion.div>
                  </AnimatePresence>
                </Interactive3DTilt>
              </div>

              <ScrollReveal
                variant="slideLeft"
                className="lg:col-span-5 order-1 lg:order-2"
              >
                <div className="space-y-5 bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-5 sm:p-8 shadow-2xl">
                  <div>
                    <ScrollReveal variant="drop">
                      <p className="font-mono-tabular text-xs font-bold uppercase tracking-widest text-[var(--accent-turquoise)]">
                        Level 01 · First Floor
                      </p>
                    </ScrollReveal>
                    <ScrollReveal variant="rise" delay={0.04}>
                      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mt-1">
                        Denim &amp; Activewear
                      </h2>
                    </ScrollReveal>
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                      7 streetwear, smart-formal &amp; athletic footwear
                      destinations along the upper promenade.
                    </p>
                  </div>

                  <FloorBrandList
                    brands={RETAIL_FLOORS[1].brands}
                    activeBrand={activeFirstBrand}
                    onSelect={setActiveFirstBrand}
                    accentColor="#0C8A7B"
                    floorLabel="Level 01 · First Floor"
                    selectedClass="border-[var(--accent-turquoise)] bg-[var(--bg-tint-mint)] dark:bg-[var(--bg-tint-sky)] scale-[1.03] shadow-md"
                  />
                </div>
              </ScrollReveal>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>

      {/* Scene 4: Second Floor Couture, Bags & Kids */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.secondEthnic}
        scrim="jewelMist"
        minHeight="min-h-[calc(100svh-4rem)]"
        className="py-8 md:py-20 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <ScrollReveal variant="slideRight" className="lg:col-span-5">
                <div className="space-y-5 bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-5 sm:p-8 shadow-2xl">
                  <div>
                    <ScrollReveal variant="drop">
                      <p className="font-mono-tabular text-xs font-bold uppercase tracking-widest text-[var(--accent-plum)]">
                        Level 02 · Second Floor
                      </p>
                    </ScrollReveal>
                    <ScrollReveal variant="rise" delay={0.04}>
                      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] mt-1">
                        Couture, Bags &amp; Kids
                      </h2>
                    </ScrollReveal>
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5">
                      6 festive Indian ethnic, executive womenswear, handbag
                      &amp; kidswear boutiques.
                    </p>
                  </div>

                  <FloorBrandList
                    brands={RETAIL_FLOORS[2].brands}
                    activeBrand={activeSecondBrand}
                    onSelect={setActiveSecondBrand}
                    accentColor="#6C3EB8"
                    floorLabel="Level 02 · Second Floor"
                    selectedClass="border-[var(--accent-plum)] bg-[var(--bg-tint-lavender)] scale-[1.03] shadow-md"
                  />
                </div>
              </ScrollReveal>

              <div className="lg:col-span-7">
                <Interactive3DTilt intensity={6}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSecondBrand.name}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      <ScrollReveal variant="scaleDepth">
                        <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3]">
                          <img
                            src={activeSecondBrand.image}
                            alt={`${activeSecondBrand.name} — ${activeSecondBrand.category}`}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </ScrollReveal>
                      <ScrollReveal variant="slideLeft" delay={0.08}>
                        <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:left-6 bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-2xl px-5 py-3.5 shadow-2xl flex items-center gap-4">
                          <BrandMark name={activeSecondBrand.name} size="md" />
                          <div>
                            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] leading-none">
                              {activeSecondBrand.name}
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)] mt-1">
                              {activeSecondBrand.category} ·{" "}
                              {activeSecondBrand.highlight}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>
                    </motion.div>
                  </AnimatePresence>
                </Interactive3DTilt>
              </div>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>
    </FullPageContainer>
  );
}
