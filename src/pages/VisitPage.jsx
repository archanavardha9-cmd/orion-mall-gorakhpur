import { MapPin, Navigation, Clock, Car, ArrowUpRight } from 'lucide-react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { DepthEmergeSection, Interactive3DTilt } from '../animations/MotionPrimitives';
import { ScrollReveal } from '../animations/ScrollReveal';
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
        scrim="heroPrism"
        isHero
        minHeight="min-h-[78vh]"
        className="flex flex-col justify-between py-14 md:py-20"
      >
        <div className="w-full bg-gradient-to-b from-[#120b20]/62 via-[#120b20]/26 to-transparent -mt-14 md:-mt-20 pt-14 md:pt-20 pb-5">
          <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex items-center justify-between text-white font-mono-tabular text-xs tracking-[0.2em]">
            <ScrollReveal variant="slideRight"><span className="drop-shadow-[0_1px_6px_rgba(10,6,20,0.8)]">26.7606° N · 83.3956° E</span></ScrollReveal>
            <ScrollReveal variant="slideLeft"><span className="hidden sm:inline text-amber-200 drop-shadow-[0_1px_6px_rgba(10,6,20,0.9)]">MOHADDIPUR · GORAKHPUR</span></ScrollReveal>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 text-white">
          <div className="border-t border-white/35 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <ScrollReveal variant="drop">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-200">
                  <MapPin className="w-4 h-4" />
                  <span>Getting Here</span>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="rise" delay={0.05}>
                <h1
                  className="font-display font-semibold leading-[0.94] text-white drop-shadow-lg"
                  style={{ fontSize: 'clamp(2.9rem, 6vw, 5.5rem)' }}
                >
                  Visit Orion Mall
                </h1>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end space-y-4">
              <ScrollReveal variant="slideLeft" delay={0.08}>
                <p className="text-sm text-white/95 leading-relaxed">
                  {MALL_INFO.locality}
                </p>
              </ScrollReveal>
              <ScrollReveal variant="pop" delay={0.12}>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#d6492e] to-[#d97706] text-white hover:opacity-95 transition-opacity shadow-xl"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Maps</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </VideoBackdropSection>

      {/* Transit & Hours Split */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.exteriorDusk}
        scrim="jewelMist"
        tone="emerald"
        minHeight="min-h-[78vh]"
        className="py-20 md:py-28 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <ScrollReveal variant="slideRight" className="lg:col-span-7">
                <div className="backdrop-blur-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-8 md:p-10 shadow-2xl space-y-6">
                  <div>
                    <ScrollReveal variant="drop">
                      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--accent-turquoise)]">
                        Approach
                      </p>
                    </ScrollReveal>
                    <ScrollReveal variant="rise" delay={0.04}>
                      <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mt-1">
                        Transit &amp; Parking
                      </h2>
                    </ScrollReveal>
                  </div>

                  <div className="divide-y divide-[var(--border-hairline)]">
                    {MALL_INFO.transit.map((t, idx) => (
                      <ScrollReveal key={t.mode} variant="rise" delay={idx * 0.05}>
                        <div className="py-5 first:pt-2 last:pb-2 space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h3 className="text-base font-semibold text-[var(--text-primary)]">
                              {t.mode}
                            </h3>
                            <span className="font-mono-tabular text-xs font-bold text-[var(--accent-coral)]">
                              {t.distance}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--text-secondary)]">{t.note}</p>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <div className="lg:col-span-5 space-y-6">
                <ScrollReveal variant="slideLeft">
                  <div className="backdrop-blur-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-8 shadow-2xl space-y-4">
                    <ScrollReveal variant="drop">
                      <div className="flex items-center gap-2.5 text-[var(--accent-plum)]">
                        <Clock className="w-5 h-5" />
                        <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
                          Daily Hours
                        </h2>
                      </div>
                    </ScrollReveal>
                    <div className="space-y-3 text-sm">
                      <ScrollReveal variant="rise" delay={0.04}>
                        <div className="flex items-center justify-between py-2 border-b border-[var(--border-hairline)]">
                          <span className="text-[var(--text-secondary)]">Retail (00 – 02)</span>
                          <span className="font-mono-tabular font-semibold text-[var(--text-primary)]">
                            {MALL_INFO.hours.retail}
                          </span>
                        </div>
                      </ScrollReveal>
                      <ScrollReveal variant="rise" delay={0.08}>
                        <div className="flex items-center justify-between py-2 border-b border-[var(--border-hairline)]">
                          <span className="text-[var(--text-secondary)]">Dining (03)</span>
                          <span className="font-mono-tabular font-semibold text-[var(--text-primary)]">
                            {MALL_INFO.hours.dining}
                          </span>
                        </div>
                      </ScrollReveal>
                      <ScrollReveal variant="rise" delay={0.12}>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-[var(--text-secondary)]">PVR INOX (04)</span>
                          <span className="font-mono-tabular font-semibold text-[var(--text-primary)]">
                            {MALL_INFO.hours.cinema}
                          </span>
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="scaleDepth" delay={0.1}>
                  <Interactive3DTilt intensity={5}>
                    <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[16/10]">
                      <img
                        src={IMAGE_ASSETS.mallAtriumEmpty}
                        alt="Orion Mall sunlit central atrium"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Interactive3DTilt>
                </ScrollReveal>
              </div>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>

      {/* Facilities Section over Escalator Motion Video */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.atriumStory}
        scrim="jewelMist"
        minHeight="min-h-[58vh]"
        className="py-20 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <DepthEmergeSection>
            <ScrollReveal variant="slideLeft" className="lg:ml-auto max-w-xl">
              <div className="backdrop-blur-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-8 md:p-10 shadow-2xl space-y-5">
                <ScrollReveal variant="drop">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent-turquoise)]">
                    <Car className="w-4 h-4" />
                    <span>Amenities</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal variant="rise" delay={0.04}>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
                    Visitor Facilities
                  </h2>
                </ScrollReveal>
                <ul className="divide-y divide-[var(--border-hairline)]">
                  {MALL_INFO.facilities.map((facility, idx) => (
                    <ScrollReveal key={facility} variant="rise" delay={idx * 0.04}>
                      <li className="py-3 flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                        <span className="font-mono-tabular text-xs font-bold text-[var(--accent-coral)]">
                          0{idx + 1}
                        </span>
                        <span>{facility}</span>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>
    </div>
  );
}
