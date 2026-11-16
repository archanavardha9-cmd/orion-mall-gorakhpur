import { Compass, ArrowDown, ArrowUp, ArrowRight } from 'lucide-react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { MallExplorer3D } from '../components/MallExplorer3D';
import { FullPageContainer, useFullPageScroll } from '../components/FullPageContainer';
import {
  DepthEmergeSection,
  Interactive3DTilt,
  ParallaxDepth
} from '../animations/MotionPrimitives';
import { ScrollReveal } from '../animations/ScrollReveal';
import { IMAGE_ASSETS, VIDEO_ASSETS } from '../assets/mediaRegistry';
import { useRouter } from '../utils/router';

function ExploreHeroScene() {
  const { goToSection } = useFullPageScroll();

  return (
    <VideoBackdropSection
      video={VIDEO_ASSETS.techFootwear}
      scrim="heroPrism"
      isHero
      className="flex items-center justify-center text-center py-8 md:py-12"
    >
      <div className="max-w-3xl mx-auto px-5 text-white space-y-5 my-auto">
        <div className="space-y-3">
          <ScrollReveal variant="drop">
            <div className="inline-flex items-center gap-2 text-xs font-mono-tabular tracking-[0.22em] uppercase text-teal-200">
              <Compass className="w-4 h-4" />
              <span>Spatial Mall Walkthrough</span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="rise" delay={0.05}>
            <h1
              className="font-display font-semibold leading-[0.94] text-white drop-shadow-lg"
              style={{ fontSize: 'clamp(2.5rem, 5.2vw, 4.8rem)' }}
            >
              Walk Through Every Level
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="rise" delay={0.1}>
            <p className="text-xs sm:text-sm md:text-base text-white/95 max-w-lg mx-auto leading-relaxed">
              Move along sunlit corridors, inspect storefronts, and experience Orion Mall in full real-time 3D.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="pop" delay={0.14}>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => goToSection(1)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-turquoise)] text-white hover:opacity-95 shadow-xl cursor-pointer"
            >
              <span>Launch 3D Walkthrough</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </VideoBackdropSection>
  );
}

function Explore3DScene() {
  const { navigate } = useRouter();

  return (
    <div id="mall-3d-walkthrough" className="w-full h-full min-h-[calc(100svh-4rem)] relative interactive-scroll-allow">
      <MallExplorer3D
        onSelectFloorPage={(floorId) => {
          if (floorId === 'third') navigate('/dining');
          else if (floorId === 'fourth') navigate('/entertainment');
          else navigate('/shopping');
        }}
      />
    </div>
  );
}

function ExploreFinaleScene() {
  const { navigate } = useRouter();
  const { goToSection } = useFullPageScroll();

  return (
    <VideoBackdropSection
      video={VIDEO_ASSETS.exploreDome}
      scrim="jewelMist"
      className="flex items-center py-8 md:py-12"
    >
      <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12 my-auto">
        <DepthEmergeSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 relative min-h-0 lg:min-h-[340px] flex items-center">
              <ParallaxDepth className="w-full sm:w-[84%] sm:mr-auto">
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

              <ParallaxDepth className="hidden sm:block absolute right-0 bottom-1 w-[44%] z-20">
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

            <ScrollReveal variant="slideRight" className="lg:col-span-5 order-1 lg:order-2">
              <div className="space-y-4 bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-6 sm:p-8 shadow-2xl">
                <div>
                  <ScrollReveal variant="drop">
                    <p className="font-mono-tabular text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-turquoise)]">
                      Architectural Perspective
                    </p>
                  </ScrollReveal>
                  <ScrollReveal variant="rise" delay={0.04}>
                    <h2
                      className="font-display font-semibold leading-[0.98] text-[var(--text-primary)] mt-1.5"
                      style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
                    >
                      Sunlit From Ground to Sky
                    </h2>
                  </ScrollReveal>
                  <ScrollReveal variant="rise" delay={0.08}>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-2.5 max-w-md">
                      Five open gallery levels linked by panoramic glass elevators and continuous escalators in Mohaddipur, Gorakhpur.
                    </p>
                  </ScrollReveal>
                </div>

                <div className="pt-1 flex flex-wrap gap-2.5">
                  <ScrollReveal variant="pop" delay={0.12}>
                    <button
                      type="button"
                      onClick={() => goToSection(1)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-plum)] text-white hover:opacity-95 transition-opacity shadow-lg cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4" />
                      <span>Return to 3D Explorer</span>
                    </button>
                  </ScrollReveal>
                  <ScrollReveal variant="pop" delay={0.16}>
                    <button
                      type="button"
                      onClick={() => navigate('/visit')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-turquoise)] transition-colors cursor-pointer"
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
  );
}

export function ExplorePage() {
  const sectionLabels = [
    '01 · Spatial Portal',
    '02 · Real 3D Mall Explorer',
    '03 · Architectural Perspective'
  ];

  return (
    <FullPageContainer pageId="explore" sectionLabels={sectionLabels}>
      <ExploreHeroScene />
      <Explore3DScene />
      <ExploreFinaleScene />
    </FullPageContainer>
  );
}
