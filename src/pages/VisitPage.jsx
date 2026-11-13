import { MapPin, Navigation, Clock, Car, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { DepthEmergeSection, DramaticReveal } from '../animations/MotionPrimitives';
import { VIDEO_ASSETS, IMAGE_ASSETS } from '../assets/mediaRegistry';
import { MALL_INFO } from '../utils/mallData';

export function VisitPage() {
  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Orion+Mall+Mohaddipur+Gorakhpur+Uttar+Pradesh';

  return (
    <div className="w-full">
      {/* UNIQUE VISIT HERO: Architectural Coordinate Blueprint */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.visitPlaza}
        scrim="bottom"
        minHeight="min-h-[78vh]"
        className="flex flex-col justify-between py-14 md:py-20"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex items-center justify-between text-white/90 font-mono-tabular text-xs tracking-[0.2em]">
          <span>26.7606° N · 83.3956° E</span>
          <span className="hidden sm:inline">MOHADDIPUR · GORAKHPUR</span>
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            className="border-t border-white/35 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
          >
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-200">
                <MapPin className="w-4 h-4" />
                <span>Getting Here</span>
              </div>
              <h1
                className="font-display font-semibold leading-[0.94] text-white"
                style={{ fontSize: 'clamp(2.9rem, 6vw, 5.5rem)' }}
              >
                Visit Orion Mall
              </h1>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end space-y-4">
              <p className="text-sm text-white/90 leading-relaxed">
                {MALL_INFO.locality}
              </p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[var(--accent-coral)] text-white hover:opacity-95 transition-opacity shadow-xl"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Maps</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </VideoBackdropSection>

      {/* Transit & Hours Split */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.exteriorDusk}
        scrim="lightMist"
        minHeight="min-h-[78vh]"
        className="py-20 md:py-28 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-8 md:p-10 shadow-2xl space-y-6">
                <DramaticReveal variant="slideRight">
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--accent-turquoise)]">
                    Approach
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mt-1">
                    Transit & Parking
                  </h2>
                </DramaticReveal>

                <div className="divide-y divide-[var(--border-hairline)]">
                  {MALL_INFO.transit.map((t) => (
                    <div key={t.mode} className="py-5 first:pt-2 last:pb-2 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="text-base font-semibold text-[var(--text-primary)]">
                          {t.mode}
                        </h3>
                        <span className="font-mono-tabular text-xs font-semibold text-[var(--accent-coral)]">
                          {t.distance}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{t.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <DramaticReveal variant="slideLeft">
                  <div className="backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-8 shadow-2xl space-y-4">
                    <div className="flex items-center gap-2.5 text-[var(--accent-plum)]">
                      <Clock className="w-5 h-5" />
                      <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
                        Daily Hours
                      </h2>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between py-2 border-b border-[var(--border-hairline)]">
                        <span className="text-[var(--text-secondary)]">Retail (00 – 02)</span>
                        <span className="font-mono-tabular font-semibold text-[var(--text-primary)]">
                          {MALL_INFO.hours.retail}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-[var(--border-hairline)]">
                        <span className="text-[var(--text-secondary)]">Dining & Salon (03)</span>
                        <span className="font-mono-tabular font-semibold text-[var(--text-primary)]">
                          {MALL_INFO.hours.dining}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-[var(--text-secondary)]">PVR INOX (04)</span>
                        <span className="font-mono-tabular font-semibold text-[var(--text-primary)]">
                          {MALL_INFO.hours.cinema}
                        </span>
                      </div>
                    </div>
                  </div>
                </DramaticReveal>

                <DramaticReveal variant="scaleDepth" delay={0.1}>
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-[var(--glass-border)] aspect-[16/10]">
                    <img
                      src={IMAGE_ASSETS.mallAtriumEmpty}
                      alt="Orion Mall sunlit central atrium"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </DramaticReveal>
              </div>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>

      {/* Facilities Section over Escalator Motion Video */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.heroAtrium}
        scrim="sideRight"
        minHeight="min-h-[58vh]"
        className="py-20 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <DepthEmergeSection>
            <div className="lg:ml-auto max-w-xl backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-8 md:p-10 shadow-2xl space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent-turquoise)]">
                <Car className="w-4 h-4" />
                <span>Amenities</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
                Visitor Facilities
              </h2>
              <ul className="divide-y divide-[var(--border-hairline)]">
                {MALL_INFO.facilities.map((facility, idx) => (
                  <li
                    key={facility}
                    className="py-3 flex items-center gap-4 text-sm text-[var(--text-secondary)]"
                  >
                    <span className="font-mono-tabular text-xs font-semibold text-[var(--accent-coral)]">
                      0{idx + 1}
                    </span>
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>
    </div>
  );
}
