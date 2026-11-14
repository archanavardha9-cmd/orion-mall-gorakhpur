import { useState } from 'react';
import { ArrowUpRight, Film, ChevronLeft, ChevronRight, Calendar, Ticket } from 'lucide-react';
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
  { id: 'comingSoon', label: 'Coming Soon' }
];

export function EntertainmentPage() {
  const [activeCategory, setActiveCategory] = useState('nowShowing');
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const currentMovies = ENTERTAINMENT_MOVIES[activeCategory] || ENTERTAINMENT_MOVIES.nowShowing;
  const safeIndex = Math.min(activeMovieIndex, currentMovies.length - 1);
  const currentMovie = currentMovies[safeIndex] || currentMovies[0];

  const handleCategorySwitch = (catId) => {
    setActiveCategory(catId);
    setActiveMovieIndex(0);
    setSlideDirection(1);
  };

  const handleNextMovie = () => {
    setSlideDirection(1);
    setActiveMovieIndex((prev) => (prev + 1) % currentMovies.length);
  };

  const handlePrevMovie = () => {
    setSlideDirection(-1);
    setActiveMovieIndex((prev) => (prev - 1 + currentMovies.length) % currentMovies.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.94,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div className="w-full">
      {/* UNIQUE ENTERTAINMENT HERO: Anamorphic Widescreen Cinema Frame */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.cinemaAuditorium}
        scrim="bottom"
        isHero
        minHeight="min-h-[100vh]"
        className="flex flex-col justify-between py-12 md:py-16"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex items-center justify-between gap-4">
          <BrandMark name="PVR INOX Cinemas" size="md" />
          <span className="font-mono-tabular text-xs tracking-[0.22em] uppercase text-amber-200 backdrop-blur-md bg-[#120c22]/60 border border-white/20 px-3.5 py-1.5 rounded-xl">
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
              className="font-display font-semibold leading-[0.92] text-white drop-shadow-lg"
              style={{ fontSize: 'clamp(3rem, 6.2vw, 5.8rem)' }}
            >
              PVR INOX Cinemas
            </h1>
            <p className="text-sm md:text-base text-white/90 max-w-xl">
              Laser projection, spatial Dolby surround acoustics, and plush recliner seating high above Orion Mall&apos;s central atrium.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            <a
              href={PVR_BOOKING_LINKS.bookMyShowGorakhpur}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#d6492e] to-[#c73468] text-white hover:opacity-95 transition-opacity shadow-xl"
            >
              <span>Book Tickets · BookMyShow</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={PVR_BOOKING_LINKS.pvrOfficial}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold backdrop-blur-md bg-white/18 text-white border border-white/40 hover:bg-white/28 transition-colors"
            >
              <span>PVR INOX Official</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </VideoBackdropSection>

      {/* Premium Cinematic Movies Showcase Carousel Section */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.cinemaHall}
        scrim="jewelMist"
        minHeight="min-h-[100vh]"
        className="py-16 md:py-24 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <DepthEmergeSection>
            {/* Header with Category Toggle */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[var(--border-hairline)] pb-8">
              <div className="backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-2xl px-6 py-4 shadow-xl self-start">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-plum)]">
                  INOX · Orion Mall, Gorakhpur
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--text-primary)] mt-1 leading-none">
                  Cinema Slate
                </h2>
              </div>

              {/* Two categories only: Now Showing & Coming Soon */}
              <div
                role="tablist"
                aria-label="Select movie category"
                className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-lg self-start lg:self-auto"
              >
                {MOVIE_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleCategorySwitch(cat.id)}
                      className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'text-white'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="cinemaCategoryHighlight"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-plum)] shadow-md"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cinematic Horizontal Movie Showcase */}
            <div className="mt-10 relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-tabular uppercase tracking-widest text-[var(--accent-coral)]">
                    {activeCategory === 'nowShowing' ? 'Now Showing in Theatres' : 'Upcoming Theatrical Slate'}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">·</span>
                  <span className="text-xs font-mono-tabular text-[var(--text-muted)]">
                    {safeIndex + 1} of {currentMovies.length}
                  </span>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevMovie}
                    aria-label="Previous movie"
                    className="w-10 h-10 rounded-xl backdrop-blur-md bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMovie}
                    aria-label="Next movie"
                    className="w-10 h-10 rounded-xl backdrop-blur-md bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent-coral)] transition-colors cursor-pointer shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Prominent Center Showcase with AnimatePresence Horizontal Slide */}
              <div className="overflow-hidden">
                <AnimatePresence custom={slideDirection} mode="wait">
                  <motion.div
                    key={`${activeCategory}-${currentMovie.id}`}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center backdrop-blur-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-6 sm:p-10 shadow-2xl"
                  >
                    {/* Left Center Stage: Big Poster */}
                    <div className="lg:col-span-5 flex justify-center">
                      <Interactive3DTilt intensity={7} className="w-full max-w-[340px]">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[3/4] bg-stone-900">
                          <img
                            src={currentMovie.poster}
                            alt={`${currentMovie.title} official theatrical poster`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/35 to-transparent">
                            <span className="font-mono-tabular text-xs font-semibold uppercase tracking-widest text-emerald-300">
                              {currentMovie.status}
                            </span>
                          </div>
                        </div>
                      </Interactive3DTilt>
                    </div>

                    {/* Right Center Stage: Movie Information & Direct Booking */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-[var(--text-muted)]">
                        <span className="font-semibold text-[var(--accent-coral)]">
                          {currentMovie.status}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {activeCategory === 'nowShowing' ? `Released ${currentMovie.releaseDate}` : `Releasing ${currentMovie.releaseDate}`}
                          </span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{currentMovie.language}</span>
                      </div>

                      <h3 className="font-display text-4xl sm:text-5xl font-semibold text-[var(--text-primary)] leading-tight">
                        {currentMovie.title}
                      </h3>

                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-turquoise)]">
                        {currentMovie.genre}
                      </p>

                      <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                        {currentMovie.description}
                      </p>

                      {/* Integrated Booking: ONLY for Now Showing movies */}
                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        {activeCategory === 'nowShowing' && currentMovie.bookingUrl ? (
                          <a
                            href={currentMovie.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-plum)] text-white hover:opacity-95 transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                          >
                            <Ticket className="w-4 h-4" />
                            <span>Book Tickets</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-mono-tabular font-medium bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-muted)]">
                            <span>Advance bookings open closer to release date</span>
                          </div>
                        )}
                        <span className="text-xs text-[var(--text-muted)]">
                          INOX: Orion Mall, Gorakhpur
                        </span>
                      </div>

                      {/* Movie Thumbnails Strip */}
                      <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center gap-3 overflow-x-auto pb-1">
                        {currentMovies.map((m, idx) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setSlideDirection(idx >= safeIndex ? 1 : -1);
                              setActiveMovieIndex(idx);
                            }}
                            className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                              idx === safeIndex
                                ? 'border-[var(--accent-coral)] bg-[var(--bg-tint-peach)] dark:bg-[var(--bg-tint-lavender)] shadow-sm'
                                : 'border-transparent bg-[var(--bg-surface)] hover:border-[var(--border-strong)] opacity-75 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={m.poster}
                              alt=""
                              aria-hidden="true"
                              className="w-8 h-10 object-cover rounded-lg"
                            />
                            <span className="text-xs font-semibold text-[var(--text-primary)]">
                              {m.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>

      {/* Auditorium Visual Section (Authentic Cinema Projector Motion Video) */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.entSeats}
        scrim="jewelMist"
        minHeight="min-h-[100vh]"
        className="py-16 md:py-24 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <ScrollReveal variant="slideRight" className="lg:col-span-6">
            <div className="backdrop-blur-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-8 md:p-10 shadow-2xl space-y-5">
              <BrandMark name="PVR INOX Cinemas" size="md" />
              <ScrollReveal variant="drop">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--accent-turquoise)]">
                  Fourth Floor Auditorium
                </p>
              </ScrollReveal>
              <ScrollReveal variant="rise" delay={0.04}>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
                  Plush Recliners &amp; Express Lift Lobby
                </h2>
              </ScrollReveal>
              <ScrollReveal variant="rise" delay={0.08}>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Direct elevator access from basement parking to the Fourth Floor PVR INOX lobby, featuring gourmet popcorn concessions and Dolby acoustics.
                </p>
              </ScrollReveal>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="scaleDepth" delay={0.06} className="lg:col-span-6">
            <Interactive3DTilt intensity={5}>
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3]">
                <img
                  src={IMAGE_ASSETS.brandCinema}
                  alt="Empty luxury multiplex auditorium inside Orion Mall"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </Interactive3DTilt>
          </ScrollReveal>
        </div>
      </VideoBackdropSection>
    </div>
  );
}
