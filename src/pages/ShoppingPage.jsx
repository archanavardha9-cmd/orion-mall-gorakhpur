import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { BrandMark } from '../components/BrandMark';
import {
  DepthEmergeSection,
  Interactive3DTilt,
  ParallaxDepth
} from '../animations/MotionPrimitives';
import { VIDEO_ASSETS, IMAGE_ASSETS } from '../assets/mediaRegistry';
import { FLOOR_LEVELS } from '../utils/mallData';

const RETAIL_FLOORS = FLOOR_LEVELS.filter((f) =>
  ['ground', 'first', 'second'].includes(f.id)
);

export function ShoppingPage() {
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [activeGroundBrand, setActiveGroundBrand] = useState(RETAIL_FLOORS[0].brands[0]);
  const [activeFirstBrand, setActiveFirstBrand] = useState(RETAIL_FLOORS[1].brands[0]);
  const [activeSecondBrand, setActiveSecondBrand] = useState(RETAIL_FLOORS[2].brands[0]);

  const showGround = selectedFloor === 'all' || selectedFloor === 'ground';
  const showFirst = selectedFloor === 'all' || selectedFloor === 'first';
  const showSecond = selectedFloor === 'all' || selectedFloor === 'second';

  return (
    <div className="w-full">
      {/* UNIQUE SHOPPING HERO: Asymmetric Editorial Lookbook Split */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.shoppingReel}
        scrim="side"
        minHeight="min-h-[82vh]"
        className="flex items-center py-16 md:py-24"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-coral)]">
              <ShoppingBag className="w-4 h-4" />
              <span>Retail Flagships</span>
            </div>
            <h1
              className="font-display font-semibold leading-[0.95] text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(2.8rem, 5.4vw, 5.2rem)' }}
            >
              Three Levels of Curated Style
            </h1>

            {/* Floor Filter Bar */}
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] shadow-lg">
              {[
                { id: 'all', label: 'All Levels' },
                { id: 'ground', label: 'Ground (9)' },
                { id: 'first', label: 'First (7)' },
                { id: 'second', label: 'Second (6)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFloor(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedFloor === tab.id
                      ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Layered Overlapping Storefront Imagery */}
          <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] flex items-center">
            <ParallaxDepth offset={-26} className="w-[82%] ml-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.85 }}
                className="rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] aspect-[4/3]"
              >
                <img
                  src={IMAGE_ASSETS.brandLavie}
                  alt="Second Floor luxury handbags showcase inside Orion Mall"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </ParallaxDepth>
            <ParallaxDepth offset={32} className="absolute left-0 bottom-0 w-[48%] z-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.14 }}
                className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3]"
              >
                <img
                  src={IMAGE_ASSETS.brandSamsung}
                  alt="Ground Floor Samsung flagship electronics showroom"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </ParallaxDepth>
          </div>
        </div>
      </VideoBackdropSection>

      {/* Ground Floor Visual Emblem Stage */}
      {showGround && (
        <VideoBackdropSection
          video={VIDEO_ASSETS.groundLuxury}
          scrim="lightMist"
          minHeight="min-h-[82vh]"
          className="py-20 md:py-28 flex items-center"
        >
          <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
            <DepthEmergeSection>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-8 shadow-2xl">
                  <div>
                    <p className="font-mono-tabular text-xs font-semibold uppercase tracking-widest text-[var(--accent-coral)]">
                      Level 00 · Ground Floor
                    </p>
                    <h2 className="font-display text-4xl font-semibold text-[var(--text-primary)] mt-1">
                      Flagship Icons & Tech
                    </h2>
                  </div>

                  {/* Visual Brand Logo Matrix */}
                  <div className="flex flex-wrap gap-2.5">
                    {RETAIL_FLOORS[0].brands.map((brand) => {
                      const selected = activeGroundBrand.name === brand.name;
                      return (
                        <button
                          key={brand.name}
                          type="button"
                          onClick={() => setActiveGroundBrand(brand)}
                          className={`flex items-center gap-2.5 pr-3 p-1.5 rounded-2xl border transition-all cursor-pointer ${
                            selected
                              ? 'border-[var(--accent-coral)] bg-[var(--bg-tint-peach)] dark:bg-[var(--bg-tint-lavender)] scale-[1.03] shadow-md'
                              : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
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
                        <div className="rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] aspect-[4/3]">
                          <img
                            src={activeGroundBrand.image}
                            alt={`${activeGroundBrand.name} — ${activeGroundBrand.category}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Separate Floating Crest Plate */}
                        <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:left-6 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-4">
                          <BrandMark name={activeGroundBrand.name} size="md" />
                          <div>
                            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] leading-none">
                              {activeGroundBrand.name}
                            </h3>
                            <p className="text-xs text-[var(--text-muted)] mt-1">
                              {activeGroundBrand.category} · {activeGroundBrand.highlight}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </Interactive3DTilt>
                </div>
              </div>
            </DepthEmergeSection>
          </div>
        </VideoBackdropSection>
      )}

      {/* First Floor Visual Emblem Stage */}
      {showFirst && (
        <VideoBackdropSection
          video={VIDEO_ASSETS.firstDenim}
          scrim="sideRight"
          minHeight="min-h-[82vh]"
          className="py-20 md:py-28 flex items-center"
        >
          <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
            <DepthEmergeSection>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
                        <div className="rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] aspect-[4/3]">
                          <img
                            src={activeFirstBrand.image}
                            alt={`${activeFirstBrand.name} — ${activeFirstBrand.category}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:right-6 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-4">
                          <BrandMark name={activeFirstBrand.name} size="md" />
                          <div>
                            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] leading-none">
                              {activeFirstBrand.name}
                            </h3>
                            <p className="text-xs text-[var(--text-muted)] mt-1">
                              {activeFirstBrand.category} · {activeFirstBrand.highlight}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </Interactive3DTilt>
                </div>

                <div className="lg:col-span-5 order-1 lg:order-2 space-y-6 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-8 shadow-2xl">
                  <div>
                    <p className="font-mono-tabular text-xs font-semibold uppercase tracking-widest text-[var(--accent-turquoise)]">
                      Level 01 · First Floor
                    </p>
                    <h2 className="font-display text-4xl font-semibold text-[var(--text-primary)] mt-1">
                      Denim & Activewear
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {RETAIL_FLOORS[1].brands.map((brand) => {
                      const selected = activeFirstBrand.name === brand.name;
                      return (
                        <button
                          key={brand.name}
                          type="button"
                          onClick={() => setActiveFirstBrand(brand)}
                          className={`flex items-center gap-2.5 pr-3 p-1.5 rounded-2xl border transition-all cursor-pointer ${
                            selected
                              ? 'border-[var(--accent-turquoise)] bg-[var(--bg-tint-mint)] dark:bg-[var(--bg-tint-sky)] scale-[1.03] shadow-md'
                              : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
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
              </div>
            </DepthEmergeSection>
          </div>
        </VideoBackdropSection>
      )}

      {/* Second Floor Visual Emblem Stage */}
      {showSecond && (
        <VideoBackdropSection
          video={VIDEO_ASSETS.secondEthnic}
          scrim="lightMist"
          minHeight="min-h-[82vh]"
          className="py-20 md:py-28 flex items-center"
        >
          <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
            <DepthEmergeSection>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-8 shadow-2xl">
                  <div>
                    <p className="font-mono-tabular text-xs font-semibold uppercase tracking-widest text-[var(--accent-plum)]">
                      Level 02 · Second Floor
                    </p>
                    <h2 className="font-display text-4xl font-semibold text-[var(--text-primary)] mt-1">
                      Couture, Bags & Kids
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {RETAIL_FLOORS[2].brands.map((brand) => {
                      const selected = activeSecondBrand.name === brand.name;
                      return (
                        <button
                          key={brand.name}
                          type="button"
                          onClick={() => setActiveSecondBrand(brand)}
                          className={`flex items-center gap-2.5 pr-3 p-1.5 rounded-2xl border transition-all cursor-pointer ${
                            selected
                              ? 'border-[var(--accent-plum)] bg-[var(--bg-tint-lavender)] scale-[1.03] shadow-md'
                              : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)]'
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
                        <div className="rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] aspect-[4/3]">
                          <img
                            src={activeSecondBrand.image}
                            alt={`${activeSecondBrand.name} — ${activeSecondBrand.category}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:left-6 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-4">
                          <BrandMark name={activeSecondBrand.name} size="md" />
                          <div>
                            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] leading-none">
                              {activeSecondBrand.name}
                            </h3>
                            <p className="text-xs text-[var(--text-muted)] mt-1">
                              {activeSecondBrand.category} · {activeSecondBrand.highlight}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </Interactive3DTilt>
                </div>
              </div>
            </DepthEmergeSection>
          </div>
        </VideoBackdropSection>
      )}
    </div>
  );
}
