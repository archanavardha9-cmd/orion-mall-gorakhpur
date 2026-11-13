import { Compass, ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { MallExplorer3D } from '../components/MallExplorer3D';
import {
  DepthEmergeSection,
  Interactive3DTilt,
  ParallaxDepth
} from '../animations/MotionPrimitives';
import { ScrollReveal } from '../animations/ScrollReveal';
import { IMAGE_ASSETS, VIDEO_ASSETS } from '../assets/mediaRegistry';
import { useRouter } from '../utils/router';

export function ExplorePage() {
  const { navigate } = useRouter();

  const jumpTo3D = () => {
    const el = document.getElementById('mall-3d-walkthrough');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* UNIQUE EXPLORE HERO: Centered Spatial Portal Hero over Ascending Mall Escalator Video */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.techFootwear}
        scrim="heroPrism"
        isHero
        minHeight="min-h-[76vh]"
        className="flex items-center justify-center text-center py-20"
      >
        <div className="max-w-4xl mx-auto px-6 text-white space-y-6">
          <div className="space-y-4">
            <ScrollReveal variant="drop">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular tracking-[0.22em] uppercase text-teal-200">
                <Compass className="w-4 h-4" />
                <span>Spatial Mall Walkthrough</span>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="rise" delay={0.05}>
              <h1
                className="font-display font-semibold leading-[0.94] text-white drop-shadow-lg"
                style={{ fontSize: 'clamp(2.9rem, 6.2vw, 5.75rem)' }}
              >
                Walk Through Every Level
              </h1>
            </ScrollReveal>
            <ScrollReveal variant="rise" delay={0.1}>
              <p className="text-sm md:text-base text-white/95 max-w-xl mx-auto">
                Move along sunlit corridors, ride the glass elevator, and inspect every storefront in real time.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="pop" delay={0.14}>
            <div className="pt-2">
              <button
                type="button"
                onClick={jumpTo3D}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-turquoise)] text-white hover:opacity-95 shadow-xl cursor-pointer"
              >
                <span>Launch 3D Walkthrough</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </VideoBackdropSection>

      {/* REAL CONTINUOUS 3D MALL EXPLORER */}
      <section id="mall-3d-walkthrough" className="w-full">
        <MallExplorer3D
          onSelectFloorPage={(floorId) => {
            if (floorId === 'third') navigate('/dining');
            else if (floorId === 'fourth') navigate('/entertainment');
            else navigate('/shopping');
          }}
        />
      </section>

      {/* Immersive Atrium Light & Architecture Finale */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.atriumStory}
        scrim="jewelMist"
        tone="royal"
        minHeight="min-h-[84vh]"
        className="py-24 md:py-32 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] flex items-center">
                <ParallaxDepth offset={-42} horizontal={-14} className="w-[82%] mr-auto">
                  <Interactive3DTilt intensity={5}>
                    <ScrollReveal variant="scaleDepth">
                      <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[16/10]">
                        <img
                          src={IMAGE_ASSETS.mallAtriumEmpty}
                          alt="Sunlit five-level architectural atrium inside Orion Mall"
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
                  offset={44}
                  horizontal={18}
                  className="hidden sm:block absolute right-0 bottom-2 w-[46%] z-20"
                >
                  <ScrollReveal variant="slideLeft" delay={0.1}>
                    <div className="animate-float-reverse rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3]">
                      <img
                        src={IMAGE_ASSETS.brandCinema}
                        alt="Upper floor PVR INOX cinema horizon inside Orion Mall"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </ScrollReveal>
                </ParallaxDepth>
              </div>

              <ScrollReveal variant="slideRight" className="lg:col-span-5">
                <div className="space-y-6 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-8 md:p-10 shadow-2xl">
                  <div>
                    <ScrollReveal variant="drop">
                      <p className="font-mono-tabular text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-turquoise)]">
                        Architectural Perspective
                      </p>
                    </ScrollReveal>
                    <ScrollReveal variant="rise" delay={0.04}>
                      <h2
                        className="font-display font-semibold leading-[0.98] text-[var(--text-primary)] mt-2"
                        style={{ fontSize: 'clamp(2.4rem, 4.4vw, 4rem)' }}
                      >
                        Sunlit From Ground to Sky
                      </h2>
                    </ScrollReveal>
                    <ScrollReveal variant="rise" delay={0.08}>
                      <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mt-4 max-w-md">
                        Five open gallery levels linked by panoramic glass elevators and continuous escalators in Mohaddipur, Gorakhpur.
                      </p>
                    </ScrollReveal>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <ScrollReveal variant="pop" delay={0.12}>
                      <button
                        type="button"
                        onClick={jumpTo3D}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-plum)] text-white hover:opacity-95 transition-opacity shadow-lg cursor-pointer"
                      >
                        <ArrowUp className="w-4 h-4" />
                        <span>Return to 3D Explorer</span>
                      </button>
                    </ScrollReveal>
                    <ScrollReveal variant="pop" delay={0.16}>
                      <button
                        type="button"
                        onClick={() => navigate('/visit')}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-turquoise)] transition-colors cursor-pointer"
                      >
                        <span>Plan Your Visit</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </ScrollReveal>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>
    </div>
  );
}
