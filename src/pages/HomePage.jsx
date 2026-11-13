import { ArrowRight } from 'lucide-react';
import { HeroVideoStage } from '../sections/HeroVideoStage';
import { ArchitecturalStorySplit } from '../sections/ArchitecturalStorySplit';
import { HorizontalAtriumRibbon } from '../sections/HorizontalAtriumRibbon';
import { BrandSpotlightGallery } from '../sections/BrandSpotlightGallery';
import { DiningCinemaShowcase } from '../sections/DiningCinemaShowcase';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { DepthEmergeSection, DramaticReveal } from '../animations/MotionPrimitives';
import { VIDEO_ASSETS } from '../assets/mediaRegistry';
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
        video={VIDEO_ASSETS.visitPlaza}
        scrim="soft"
        minHeight="min-h-[64vh]"
        className="flex items-center py-20"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <DepthEmergeSection>
            <DramaticReveal variant="scaleDepth">
              <div className="max-w-2xl backdrop-blur-xl bg-[var(--glass-panel)] border border-[var(--glass-border)] rounded-3xl p-8 md:p-12 shadow-2xl space-y-5">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-coral)]">
                  Mohaddipur · Gorakhpur
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-[1.04]">
                  Plan Your Visit
                </h2>
                <p className="text-sm md:text-base text-[var(--text-secondary)]">
                  {MALL_INFO.locality} · {MALL_INFO.hours.retail}
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => navigate('/visit')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[var(--accent-coral)] text-white hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    <span>Directions & Hours</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/entertainment')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-turquoise)] transition-colors cursor-pointer"
                  >
                    <span>PVR INOX Shows</span>
                  </button>
                </div>
              </div>
            </DramaticReveal>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>
    </div>
  );
}
