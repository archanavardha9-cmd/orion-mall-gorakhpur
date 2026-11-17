import { useState } from "react";
import { ShoppingBag } from "lucide-react";
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

function ShoppingHeroScene() {
  const { goToSection } = useFullPageScroll();

  return (
    <VideoBackdropSection
      video={VIDEO_ASSETS.firstDenim}
      scrim="heroPrism"
      isHero
      minHeight="min-h-[calc(100svh-4rem)]"
      className="flex items-center py-8 md:py-16"
    >
      <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-7 items-center">
        <div className="lg:col-span-6 space-y-3 lg:space-y-5 text-white">
          <ScrollReveal variant="drop">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-200">
              <ShoppingBag className="w-4 h-4" />
              <span>Retail Flagships · 22 Stores</span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="slideRight" delay={0.05}>
            <h1
              className="font-display font-semibold leading-[0.95] text-white drop-shadow-lg"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
            >
              Three Levels of Curated Style
            </h1>
          </ScrollReveal>
          <p className="text-sm text-white/90 max-w-lg leading-relaxed">
            Explore tailored menswear, iconic denim culture, festive ethnic
            couture, active footwear, and Galaxy flagship electronics across
            Ground, First &amp; Second Floors.
          </p>

          {/* Floor Navigation Bar - hidden on mobile (shown after images), visible on desktop in original position */}
          <div className="hidden lg:inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl">
            {[
              {
                id: "all",
                label: "All Levels",
                targetIndex: 1,
                color: "var(--accent-coral)",
              },
              {
                id: "ground",
                label: "Ground (9)",
                targetIndex: 1,
                color: "#D64E34",
              },
              {
                id: "first",
                label: "First (7)",
                targetIndex: 2,
                color: "#0C8A7B",
              },
              {
                id: "second",
                label: "Second (6)",
                targetIndex: 3,
                color: "#6C3EB8",
              },
            ].map((tab, idx) => (
              <ScrollReveal
                key={tab.id}
                variant="pop"
                delay={0.08 + idx * 0.04}
              >
                <button
                  type="button"
                  onClick={() => goToSection(tab.targetIndex)}
                  className="px-3.5 sm:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer text-[var(--text-primary)] hover:bg-[var(--bg-tint-peach)]/50"
                >
                  {tab.label}
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Layered Overlapping Storefront Imagery */}
<div className="lg:col-span-6 relative min-h-[180px] sm:min-h-[260px] flex items-center pr-0 sm:pr-4">
          <ParallaxDepth offset={-26} className="w-[78%] sm:w-[78%] ml-auto">
            <Interactive3DTilt intensity={5}>
              <ScrollReveal variant="scaleDepth" delay={0.08}>
                <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3] bg-[#2a1530] max-h-[220px] sm:max-h-[280px] lg:max-h-none">
                  <img
                    src={IMAGE_ASSETS.brandLavie}
                    alt="Second Floor luxury handbags showcase inside Orion Mall"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </Interactive3DTilt>
          </ParallaxDepth>
          <ParallaxDepth
            offset={32}
            className="absolute left-0 bottom-0 w-[48%] z-20"
          >
            <ScrollReveal variant="slideLeft" delay={0.14}>
              <div className="animate-float-reverse rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-200/75 aspect-[4/3] bg-[#161b29] max-h-[160px] sm:max-h-[200px] lg:max-h-none">
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

        {/* Floor Navigation Bar - visible on mobile only, placed after images per requested order */}
        <div className="lg:hidden col-span-1 w-full flex justify-center pt-1.5">
          <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl">
            {[
              {
                id: "all",
                label: "All Levels",
                targetIndex: 1,
                color: "var(--accent-coral)",
              },
              {
                id: "ground",
                label: "Ground (9)",
                targetIndex: 1,
                color: "#D64E34",
              },
              {
                id: "first",
                label: "First (7)",
                targetIndex: 2,
                color: "#0C8A7B",
              },
              {
                id: "second",
                label: "Second (6)",
                targetIndex: 3,
                color: "#6C3EB8",
              },
            ].map((tab, idx) => (
              <ScrollReveal
                key={tab.id}
                variant="pop"
                delay={0.08 + idx * 0.04}
              >
                <button
                  type="button"
                  onClick={() => goToSection(tab.targetIndex)}
                  className="px-3.5 sm:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer text-[var(--text-primary)] hover:bg-[var(--bg-tint-peach)]/50"
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

                  <div className="flex flex-wrap gap-2.5">
                    {RETAIL_FLOORS[0].brands.map((brand, idx) => {
                      const selected = activeGroundBrand.name === brand.name;
                      return (
                        <ScrollReveal
                          key={brand.name}
                          variant="pop"
                          delay={idx * 0.03}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveGroundBrand(brand)}
                            className={`flex items-center gap-2.5 pr-3 p-1.5 rounded-2xl border transition-all cursor-pointer ${
                              selected
                                ? "border-[var(--accent-coral)] bg-[var(--bg-tint-peach)] dark:bg-[var(--bg-tint-lavender)] scale-[1.03] shadow-md"
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
                  </div>
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

                  <div className="flex flex-wrap gap-2.5">
                    {RETAIL_FLOORS[1].brands.map((brand, idx) => {
                      const selected = activeFirstBrand.name === brand.name;
                      return (
                        <ScrollReveal
                          key={brand.name}
                          variant="pop"
                          delay={idx * 0.03}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveFirstBrand(brand)}
                            className={`flex items-center gap-2.5 pr-3 p-1.5 rounded-2xl border transition-all cursor-pointer ${
                              selected
                                ? "border-[var(--accent-turquoise)] bg-[var(--bg-tint-mint)] dark:bg-[var(--bg-tint-sky)] scale-[1.03] shadow-md"
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
                  </div>
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

                  <div className="flex flex-wrap gap-2.5">
                    {RETAIL_FLOORS[2].brands.map((brand, idx) => {
                      const selected = activeSecondBrand.name === brand.name;
                      return (
                        <ScrollReveal
                          key={brand.name}
                          variant="pop"
                          delay={idx * 0.03}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveSecondBrand(brand)}
                            className={`flex items-center gap-2.5 pr-3 p-1.5 rounded-2xl border transition-all cursor-pointer ${
                              selected
                                ? "border-[var(--accent-plum)] bg-[var(--bg-tint-lavender)] scale-[1.03] shadow-md"
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
                  </div>
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
