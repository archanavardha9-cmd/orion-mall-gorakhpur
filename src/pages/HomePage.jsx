import { ArrowRight, Compass, MapPin } from 'lucide-react';
import { HeroVideoStage } from '../sections/HeroVideoStage';
import { ArchitecturalStorySplit } from '../sections/ArchitecturalStorySplit';
import { HorizontalAtriumRibbon } from '../sections/HorizontalAtriumRibbon';
import { BrandSpotlightGallery } from '../sections/BrandSpotlightGallery';
import { DiningCinemaShowcase } from '../sections/DiningCinemaShowcase';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import {
  DepthEmergeSection,
  Interactive3DTilt,
  ParallaxDepth
} from '../animations/MotionPrimitives';
import { ScrollReveal } from '../animations/ScrollReveal';
import { IMAGE_ASSETS, VIDEO_ASSETS } from '../assets/mediaRegistry';
import { MALL_INFO } from '../utils/mallData';
import { useRouter } from '../utils/router';

export function HomePage() {
  const { navigate } = useRouter();

  return (
    <div className="w-full">
      <HeroVideoStage />
      <ArchitecturalStorySplit />
      <HorizontalAtriumRibbon />
      <BrandSpotlightGallery />
      <DiningCinemaShowcase />

      {/* Closing Mohaddipur Visit Invitation */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.visitWalkers}
        scrim="jewelMist"
        minHeight="min-h-[100vh]"
        className="flex items-center py-20 md:py-24"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <ScrollReveal variant="slideRight" className="lg:col-span-7">
                <div className="relative overflow-hidden backdrop-blur-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-8 md:p-12 shadow-2xl space-y-5">
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-tl from-[var(--accent-coral)]/25 via-[var(--accent-gold)]/18 to-transparent blur-2xl pointer-events-none"
                  />

                  <div className="relative z-10 space-y-5">
                    <ScrollReveal variant="drop" delay={0.02}>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-coral)]">
                        <MapPin className="w-4 h-4" />
                        <span>Mohaddipur · Gorakhpur</span>
                      </div>
                    </ScrollReveal>
                    <ScrollReveal variant="rise" delay={0.06}>
                      <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-[1.04]">
                        Plan Your Visit
                      </h2>
                    </ScrollReveal>
                    <ScrollReveal variant="rise" delay={0.1}>
                      <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed">
                        {MALL_INFO.locality} · Retail {MALL_INFO.hours.retail} · PVR INOX {MALL_INFO.hours.cinema}
                      </p>
                    </ScrollReveal>
                    <div className="pt-2 flex flex-wrap gap-3.5">
                      <ScrollReveal variant="pop" delay={0.14}>
                        <button
                          type="button"
                          onClick={() => navigate('/visit')}
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-gold)] text-white hover:opacity-95 transition-opacity cursor-pointer shadow-lg"
                        >
                          <span>Directions &amp; Hours</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </ScrollReveal>
                      <ScrollReveal variant="pop" delay={0.18}>
                        <button
                          type="button"
                          onClick={() => navigate('/explore')}
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-turquoise)] transition-colors cursor-pointer"
                        >
                          <Compass className="w-4 h-4 text-[var(--accent-turquoise)]" />
                          <span>Walk 3D Mall</span>
                        </button>
                      </ScrollReveal>
                      <ScrollReveal variant="pop" delay={0.22}>
                        <button
                          type="button"
                          onClick={() => navigate('/entertainment')}
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-plum)] transition-colors cursor-pointer"
                        >
                          <span>PVR INOX Shows</span>
                        </button>
                      </ScrollReveal>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <div className="lg:col-span-5 relative hidden sm:flex items-center justify-center min-h-[300px]">
                <ParallaxDepth offset={-24} className="w-[88%] ml-auto">
                  <Interactive3DTilt intensity={5}>
                    <ScrollReveal variant="scaleDepth" delay={0.1}>
                      <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3] bg-[var(--bg-tint-peach)]">
                        <img
                          src={IMAGE_ASSETS.brandSalon}
                          alt="Warm sunlit seating terrace at Orion Mall Mohaddipur"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#160d26]/85 to-transparent text-white">
                          <p className="font-mono-tabular text-[11px] uppercase tracking-[0.18em] text-amber-200">
                            Mohaddipur Highway Corridor
                          </p>
                          <p className="font-display text-xl font-semibold">
                            Multi-Level Parking &amp; Valet Entry
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  </Interactive3DTilt>
                </ParallaxDepth>
              </div>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>
    </div>
  );
}
