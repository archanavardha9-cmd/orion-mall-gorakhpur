import { ArrowRight, Compass, MapPin } from "lucide-react";
import { HeroVideoStage } from "../sections/HeroVideoStage";
import { ArchitecturalStorySplit } from "../sections/ArchitecturalStorySplit";
import { HorizontalAtriumRibbon } from "../sections/HorizontalAtriumRibbon";
import { BrandSpotlightGallery } from "../sections/BrandSpotlightGallery";
import { DiningCinemaShowcase } from "../sections/DiningCinemaShowcase";
import { VideoBackdropSection } from "../components/VideoBackdropSection";
import { FullPageContainer } from "../components/FullPageContainer";
import {
  DepthEmergeSection,
  Interactive3DTilt,
  ParallaxDepth,
} from "../animations/MotionPrimitives";
import { ScrollReveal } from "../animations/ScrollReveal";
import { IMAGE_ASSETS, VIDEO_ASSETS } from "../assets/mediaRegistry";
import { MALL_INFO } from "../utils/mallData";
import { useRouter } from "../utils/router";

export function HomePage() {
  const { navigate } = useRouter();

  const sectionLabels = [
    "01 · Grand Entrance",
    "02 · Architectural Flow",
    "03 · Floor by Floor",
    "04 · Signature Brands",
    "05 · Dining & Cinema",
    "06 · Plan Your Visit",
  ];

  return (
    <FullPageContainer pageId="home" sectionLabels={sectionLabels}>
      {/* Scene 1: Hero */}
      <HeroVideoStage />

      {/* Scene 2: Architectural Story */}
      <ArchitecturalStorySplit />

      {/* Scene 4: Curated Retail Icons */}
      <BrandSpotlightGallery />

      {/* Scene 5: Dining & Cinema Split */}
      <DiningCinemaShowcase />

      {/* Scene 6: Plan Your Visit */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.visitWalkers}
        scrim="jewelMist"
        className="flex items-center py-6 md:py-10"
      >
        <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12 my-auto">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              <ScrollReveal variant="slideRight" className="lg:col-span-7">
                <div className="relative overflow-hidden bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-4">
                  <div className="relative z-10 space-y-4">
                    <ScrollReveal variant="drop" delay={0.02}>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-coral)]">
                        <MapPin className="w-4 h-4" />
                        <span>Mohaddipur · Gorakhpur</span>
                      </div>
                    </ScrollReveal>
                    <ScrollReveal variant="rise" delay={0.06}>
                      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-[1.04]">
                        Plan Your Visit
                      </h2>
                    </ScrollReveal>
                    <ScrollReveal variant="rise" delay={0.1}>
                      <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed">
                        {MALL_INFO.locality} · Retail {MALL_INFO.hours.retail} ·
                        PVR INOX {MALL_INFO.hours.cinema}
                      </p>
                    </ScrollReveal>
                    <div className="pt-1 flex flex-wrap gap-2.5">
                      <ScrollReveal variant="pop" delay={0.14}>
                        <button
                          type="button"
                          onClick={() => navigate("/visit")}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-gold)] text-white hover:opacity-95 transition-opacity cursor-pointer shadow-lg"
                        >
                          <span>Directions &amp; Hours</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </ScrollReveal>
                      <ScrollReveal variant="pop" delay={0.18}>
                        <button
                          type="button"
                          onClick={() => navigate("/explore")}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-turquoise)] transition-colors cursor-pointer"
                        >
                          <Compass className="w-4 h-4 text-[var(--accent-turquoise)]" />
                          <span>Walk 3D Mall</span>
                        </button>
                      </ScrollReveal>
                      <ScrollReveal variant="pop" delay={0.22}>
                        <button
                          type="button"
                          onClick={() => navigate("/entertainment")}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-plum)] transition-colors cursor-pointer"
                        >
                          <span>PVR INOX Shows</span>
                        </button>
                      </ScrollReveal>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <div className="lg:col-span-5 relative flex items-center justify-center min-h-0 md:min-h-[280px]">
                <ParallaxDepth className="w-full sm:w-[88%] sm:ml-auto">
                  <Interactive3DTilt intensity={5}>
                    <ScrollReveal variant="scaleDepth" delay={0.1}>
                      <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[16/10] sm:aspect-[4/3] bg-[var(--bg-tint-peach)] relative">
                        <img
                          src={IMAGE_ASSETS.brandSalon}
                          alt="Warm sunlit seating terrace at Orion Mall Mohaddipur"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-[#160d26]/85 to-transparent text-white">
                          <p className="font-mono-tabular text-[10px] uppercase tracking-[0.18em] text-amber-200">
                            Mohaddipur Highway Corridor
                          </p>
                          <p className="font-display text-base font-semibold">
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
    </FullPageContainer>
  );
}
