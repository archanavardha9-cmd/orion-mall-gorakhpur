import { ArrowUpRight } from 'lucide-react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import {
  DepthEmergeSection,
  DramaticReveal,
  KineticLineReveal,
  ParallaxDepth
} from '../animations/MotionPrimitives';
import { IMAGE_ASSETS, VIDEO_ASSETS } from '../assets/mediaRegistry';
import { useRouter } from '../utils/router';

const CHAPTERS = [
  { num: '01', title: 'Ground & First Retail Promenade' },
  { num: '02', title: 'Second Floor Couture & Junior Wing' },
  { num: '03', title: 'Third Floor Dining & PVR INOX Above' }
];

export function ArchitecturalStorySplit() {
  const { navigate } = useRouter();

  return (
    <VideoBackdropSection
      id="atrium-story"
      video={VIDEO_ASSETS.atriumStory}
      scrim="side"
      minHeight="min-h-[88vh]"
      className="flex items-center py-20 md:py-28"
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
        <DepthEmergeSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Minimal Editorial Narrative Column (Reduced Text, Strong Visual Hierarchy) */}
            <div className="lg:col-span-5 space-y-8 backdrop-blur-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-3xl p-8 md:p-11 shadow-xl">
              <DramaticReveal variant="curtain">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-turquoise)] mb-2">
                  Architecture & Flow
                </p>
                <KineticLineReveal
                  text="Five sunlit levels in Mohaddipur"
                  className="font-display text-4xl md:text-5xl font-semibold leading-[1.02] text-[var(--text-primary)]"
                />
              </DramaticReveal>

              <div className="divide-y divide-[var(--border-hairline)]">
                {CHAPTERS.map((ch, idx) => (
                  <DramaticReveal key={ch.num} variant="slideRight" delay={idx * 0.08}>
                    <div className="py-4 flex items-baseline gap-5">
                      <span className="font-mono-tabular text-xs font-semibold text-[var(--accent-coral)] shrink-0">
                        {ch.num}
                      </span>
                      <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                        {ch.title}
                      </h3>
                    </div>
                  </DramaticReveal>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate('/explore')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-coral)] hover:underline cursor-pointer"
              >
                <span>Walk the 3D Mall Atrium</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3-Layer Overlapping People-Free Architectural Photography */}
            <div className="lg:col-span-7 relative min-h-[420px] md:min-h-[540px] flex items-center justify-center">
              <ParallaxDepth offset={-44} horizontal={-14} className="w-[78%] ml-auto">
                <DramaticReveal variant="scaleDepth">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] aspect-[16/10]">
                    <img
                      src={IMAGE_ASSETS.mallAtriumEmpty}
                      alt="Sunlit five-level central atrium inside Orion Mall"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </DramaticReveal>
              </ParallaxDepth>

              <ParallaxDepth
                offset={48}
                horizontal={18}
                className="absolute left-0 bottom-0 md:bottom-4 w-[52%] z-20"
              >
                <DramaticReveal variant="slideLeft" delay={0.1}>
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3]">
                    <img
                      src={IMAGE_ASSETS.brandEthnic}
                      alt="Second Floor festive boutique interior"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </DramaticReveal>
              </ParallaxDepth>
            </div>
          </div>
        </DepthEmergeSection>
      </div>
    </VideoBackdropSection>
  );
}
