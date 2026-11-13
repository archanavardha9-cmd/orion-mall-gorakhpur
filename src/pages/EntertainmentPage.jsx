import { useState } from 'react';
import { ArrowUpRight, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { BrandMark } from '../components/BrandMark';
import {
  DepthEmergeSection,
  Interactive3DTilt
} from '../animations/MotionPrimitives';
import { ScrollReveal } from '../animations/ScrollReveal';
import { VIDEO_ASSETS, IMAGE_ASSETS } from '../assets/mediaRegistry';
import {
  ENTERTAINMENT_MOVIES,
  INOX_ORION_BOOKING_URL,
  PVR_BOOKING_LINKS
} from '../utils/mallData';

const MOVIE_CATEGORIES = [
  { id: 'nowShowing', label: 'Now Showing' },
  { id: 'comingSoon', label: 'Coming Soon' },
  { id: 'previouslyReleased', label: 'Previously Released' }
];

export function EntertainmentPage() {
  const [activeCategory, setActiveCategory] = useState('nowShowing');
  const [selectedNowShowing, setSelectedNowShowing] = useState(
    ENTERTAINMENT_MOVIES.nowShowing[0]
  );

  return (
    <div className="w-full">
      {/* UNIQUE ENTERTAINMENT HERO: Anamorphic Widescreen Cinema Frame */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.cinemaAuditorium}
        scrim="bottom"
        minHeight="min-h-[82vh]"
        className="flex flex-col justify-between py-12 md:py-16"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex items-center justify-between">
          <BrandMark name="PVR INOX Cinemas" size="md" />
          <span className="font-mono-tabular text-xs tracking-[0.22em] uppercase text-amber-200">
            Fourth Floor · Mohaddipur
          </span>
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 text-white space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            className="max-w-4xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-200">
              <Film className="w-4 h-4" />
              <span>Multiplex Experience</span>
            </div>
            <h1
              className="font-display font-semibold leading-[0.92] text-white"
              style={{ fontSize: 'clamp(3rem, 6.2vw, 5.8rem)' }}
            >
              PVR INOX Cinemas
            </h1>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            <a
              href={PVR_BOOKING_LINKS.bookMyShowGorakhpur}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[var(--accent-coral)] text-white hover:opacity-95 transition-opacity shadow-xl"
            >
              <span>Book Tickets · BookMyShow</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={PVR_BOOKING_LINKS.pvrOfficial}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold backdrop-blur-md bg-white/18 text-white border border-white/35 hover:bg-white/28 transition-colors"
            >
              <span>PVR INOX Official</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </VideoBackdropSection>

      {/* Three-Category Movies Marquee Section */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.cinemaFoyer}
        scrim="lightMist"
        minHeight="min-h-[76vh]"
        className="py-16 md:py-24"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <DepthEmergeSection>
            {/* Cinema Slate Header & Category Navigation */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[var(--border-hairline)] pb-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-plum)]">
                  INOX · Orion Mall, Gorakhpur
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-semibold text-[var(--text-primary)] mt-1 leading-none">
                  Cinema Slate
                </h2>
              </div>

              <div
                role="tablist"
                aria-label="Select movie category"
                className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] shadow-lg self-start lg:self-auto"
              >
                {MOVIE_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'text-white'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="cinemaCategoryHighlight"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-xl bg-[var(--accent-coral)] shadow-md"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10"
              >
                {/* CATEGORY 1: NOW SHOWING (Spotlight + Marquee Reel + Direct INOX Orion Mall Booking) */}
                {activeCategory === 'nowShowing' && (
                  <section aria-labelledby="cat-now-showing" className="space-y-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <p className="font-mono-tabular text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-coral)]">
                          Currently Running in Cinemas
                        </p>
                        <h3
                          id="cat-now-showing"
                          className="font-display text-3xl md:text-5xl font-semibold text-[var(--text-primary)] mt-1"
                        >
                          Now Showing
                        </h3>
                      </div>
                      <span className="text-xs font-medium text-[var(--text-muted)]">
                        Booking available for INOX: Orion Mall, Mohaddipur
                      </span>
                    </div>

                    {/* Interactive Widescreen Spotlight */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedNowShowing.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-7 md:p-11 shadow-2xl"
                      >
                        <div className="lg:col-span-5 flex justify-center">
                          <Interactive3DTilt intensity={8} className="w-full max-w-[330px]">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--glass-border)] aspect-[3/4]">
                              <img
                                src={selectedNowShowing.poster}
                                alt={`${selectedNowShowing.title} official poster`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                                <span className="font-mono-tabular text-xs font-semibold uppercase tracking-widest text-emerald-300">
                                  {selectedNowShowing.status}
                                </span>
                              </div>
                            </div>
                          </Interactive3DTilt>
                        </div>

                        <div className="lg:col-span-7 space-y-6">
                          <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-[var(--text-muted)]">
                            <span className="font-semibold text-[var(--accent-coral)]">
                              {selectedNowShowing.status}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono-tabular">
                              Released {selectedNowShowing.releaseDate}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{selectedNowShowing.language}</span>
                          </div>

                          <h4 className="font-display text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-tight">
                            {selectedNowShowing.title}
                          </h4>

                          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-turquoise)]">
                            {selectedNowShowing.genre}
                          </p>

                          <p className="text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                            {selectedNowShowing.description}
                          </p>

                          <div className="pt-2 flex flex-wrap items-center gap-4">
                            <a
                              href={INOX_ORION_BOOKING_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold bg-[var(--accent-coral)] text-white hover:opacity-95 transition-opacity shadow-xl whitespace-nowrap"
                            >
                              <span>Book Tickets</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                            <span className="text-xs text-[var(--text-muted)]">
                              INOX: Orion Mall, Gorakhpur
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Interactive Now Showing Borderless Marquee Reel */}
                    <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-9 md:overflow-visible md:pb-0 items-start">
                      {ENTERTAINMENT_MOVIES.nowShowing.map((movie, idx) => {
                        const isSelected = selectedNowShowing.id === movie.id;
                        return (
                          <div
                            key={movie.id}
                            className={`group shrink-0 w-[78vw] sm:w-[320px] md:w-auto snap-start space-y-4 transition-transform duration-500 ${
                              idx === 1 ? 'md:mt-6' : ''
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => setSelectedNowShowing(movie)}
                              aria-pressed={isSelected}
                              className={`w-full text-left cursor-pointer block relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl transition-all duration-300 ${
                                isSelected
                                  ? 'ring-2 ring-[var(--accent-coral)] ring-offset-4 ring-offset-transparent scale-[1.01]'
                                  : 'border border-[var(--glass-border)] opacity-90 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={movie.poster}
                                alt={`${movie.title} poster`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                                <p className="font-mono-tabular text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
                                  {movie.status} · {movie.releaseDate}
                                </p>
                                <h5 className="font-display text-3xl font-semibold leading-none">
                                  {movie.title}
                                </h5>
                                <p className="text-xs text-white/85">
                                  {movie.genre} · {movie.language}
                                </p>
                              </div>
                            </button>

                            <div className="px-1.5 flex items-start justify-between gap-4">
                              <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                                {movie.description}
                              </p>
                              <a
                                href={movie.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--accent-coral)] text-white hover:opacity-95 transition-opacity shrink-0 whitespace-nowrap shadow-md"
                              >
                                <span>Book Tickets</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                    {/* CATEGORY 2: COMING SOON (Alternating Large Editorial Splits, Zero Booking Buttons) */}
                {activeCategory === 'comingSoon' && (
                  <section aria-labelledby="cat-coming-soon" className="space-y-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <ScrollReveal variant="drop">
                          <p className="font-mono-tabular text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-turquoise)]">
                            Upcoming Theatrical Slate
                          </p>
                        </ScrollReveal>
                        <ScrollReveal variant="rise" delay={0.04}>
                          <h3
                            id="cat-coming-soon"
                            className="font-display text-3xl md:text-5xl font-semibold text-[var(--text-primary)] mt-1"
                          >
                            Coming Soon
                          </h3>
                        </ScrollReveal>
                      </div>
                      <ScrollReveal variant="rise" delay={0.08}>
                        <span className="text-xs text-[var(--text-muted)]">
                          Confirmed release dates · Advance bookings open closer to release
                        </span>
                      </ScrollReveal>
                    </div>

                    <div className="space-y-12">
                      {ENTERTAINMENT_MOVIES.comingSoon.map((movie, idx) => {
                        const reversed = idx % 2 === 1;
                        return (
                          <ScrollReveal
                            key={movie.id}
                            variant={reversed ? 'slideLeft' : 'slideRight'}
                            delay={idx * 0.04}
                          >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                              <div
                                className={`lg:col-span-4 flex justify-center ${
                                  reversed ? 'lg:order-2' : 'lg:order-1'
                                }`}
                              >
                                <Interactive3DTilt intensity={7} className="w-full max-w-[300px]">
                                  <ScrollReveal variant="scaleDepth">
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] aspect-[3/4]">
                                      <img
                                        src={movie.poster}
                                        alt={`${movie.title} poster`}
                                        referrerPolicy="no-referrer"
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover"
                                      />
                                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <span className="font-mono-tabular text-xs font-semibold uppercase tracking-widest text-amber-200">
                                          {movie.status}
                                        </span>
                                      </div>
                                    </div>
                                  </ScrollReveal>
                                </Interactive3DTilt>
                              </div>

                              <div
                                className={`lg:col-span-8 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-7 md:p-10 shadow-xl space-y-4 ${
                                  reversed ? 'lg:order-1' : 'lg:order-2'
                                }`}
                              >
                                <ScrollReveal variant="rise">
                                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--text-muted)]">
                                    <span className="font-semibold text-[var(--accent-turquoise)]">
                                      {movie.status}
                                    </span>
                                    <span aria-hidden="true">·</span>
                                    <span className="font-mono-tabular">
                                      Releasing {movie.releaseDate}
                                    </span>
                                    <span aria-hidden="true">·</span>
                                    <span>{movie.language}</span>
                                  </div>
                                </ScrollReveal>

                                <ScrollReveal variant="rise" delay={0.04}>
                                  <h4 className="font-display text-3xl md:text-5xl font-semibold text-[var(--text-primary)] leading-tight">
                                    {movie.title}
                                  </h4>
                                </ScrollReveal>

                                <ScrollReveal variant="rise" delay={0.08}>
                                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-plum)]">
                                    {movie.genre}
                                  </p>
                                </ScrollReveal>

                                <ScrollReveal variant="rise" delay={0.12}>
                                  <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                                    {movie.description}
                                  </p>
                                </ScrollReveal>
                              </div>
                            </div>
                          </ScrollReveal>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* CATEGORY 3: PREVIOUSLY RELEASED (Staggered Retrospective Poster Strip, Zero Booking Buttons) */}
                {activeCategory === 'previouslyReleased' && (
                  <section aria-labelledby="cat-previously-released" className="space-y-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <ScrollReveal variant="drop">
                          <p className="font-mono-tabular text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-plum)]">
                            Theatrical Archive · Acclaimed Hits
                          </p>
                        </ScrollReveal>
                        <ScrollReveal variant="rise" delay={0.04}>
                          <h3
                            id="cat-previously-released"
                            className="font-display text-3xl md:text-5xl font-semibold text-[var(--text-primary)] mt-1"
                          >
                            Previously Released
                          </h3>
                        </ScrollReveal>
                      </div>
                      <ScrollReveal variant="rise" delay={0.08}>
                        <span className="text-xs text-[var(--text-muted)]">
                          Popular recent theatrical releases
                        </span>
                      </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
                      {ENTERTAINMENT_MOVIES.previouslyReleased.map((movie, idx) => (
                        <ScrollReveal
                          key={movie.id}
                          variant="scaleDepth"
                          delay={idx * 0.06}
                          className={idx === 1 ? 'lg:mt-8' : ''}
                        >
                          <div className="group space-y-4">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] aspect-[3/4]">
                              <img
                                src={movie.poster}
                                alt={`${movie.title} poster`}
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/15 to-transparent" />
                              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                                <span className="font-mono-tabular text-[11px] font-semibold uppercase tracking-widest text-amber-200">
                                  {movie.status}
                                </span>
                                <h4 className="font-display text-3xl font-semibold leading-none">
                                  {movie.title}
                                </h4>
                                <p className="font-mono-tabular text-xs text-white/85">
                                  Released {movie.releaseDate}
                                </p>
                              </div>
                            </div>

                            <div className="px-2 space-y-2">
                              <ScrollReveal variant="rise" delay={0.04}>
                                <p className="text-xs font-medium text-[var(--text-muted)]">
                                  {movie.genre} · {movie.language}
                                </p>
                              </ScrollReveal>
                              <ScrollReveal variant="rise" delay={0.08}>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                  {movie.description}
                                </p>
                              </ScrollReveal>
                            </div>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </section>
                )}
              </motion.div>
            </AnimatePresence>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>

      {/* Auditorium Visual Section */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.exteriorDusk}
        scrim="side"
        minHeight="min-h-[60vh]"
        className="py-16 md:py-20 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <ScrollReveal variant="slideRight" className="lg:col-span-6">
            <div className="backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-8 md:p-10 shadow-xl space-y-4">
              <ScrollReveal variant="drop">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--accent-turquoise)]">
                  Fourth Floor Auditorium
                </p>
              </ScrollReveal>
              <ScrollReveal variant="rise" delay={0.04}>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
                  Plush Recliners & Express Lift Lobby
                </h2>
              </ScrollReveal>
              <ScrollReveal variant="rise" delay={0.08}>
                <p className="text-sm text-[var(--text-secondary)]">
                  Direct elevator access from basement parking to the Fourth Floor PVR INOX lobby.
                </p>
              </ScrollReveal>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="scaleDepth" delay={0.06} className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] aspect-[4/3]">
              <img
                src={IMAGE_ASSETS.brandCinema}
                alt="Empty luxury multiplex auditorium inside Orion Mall"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </VideoBackdropSection>
    </div>
  );
}


