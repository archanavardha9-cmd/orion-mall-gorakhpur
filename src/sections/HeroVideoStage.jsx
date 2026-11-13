import { ArrowRight, Compass } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { VIDEO_ASSETS } from '../assets/mediaRegistry';
import { useRouter } from '../utils/router';

export function HeroVideoStage() {
  const { navigate } = useRouter();

  return (
    <VideoBackdropSection
      video={VIDEO_ASSETS.heroAtrium}
      scrim="bottom"
      minHeight="min-h-[92vh]"
      className="flex flex-col justify-between"
    >
      {/* Top Architectural Coordinate Line */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 pt-10 md:pt-14 flex items-center justify-between text-white/90">
        <ScrollReveal variant="slideRight">
          <span className="text-xs font-mono-tabular tracking-[0.22em] uppercase">
            Mohaddipur · Gorakhpur · UP
          </span>
        </ScrollReveal>
        <ScrollReveal variant="slideLeft" delay={0.05}>
          <span className="text-xs font-mono-tabular tracking-[0.22em] uppercase hidden sm:inline">
            Ground — Fourth Floor
          </span>
        </ScrollReveal>
      </div>

      {/* Center-Bottom Kinetic Editorial Composition */}
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 pb-14 md:pb-20 pt-24">
        <div className="border-t border-white/30 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-9 text-white">
            <ScrollReveal variant="rise" delay={0.04}>
              <h1
                className="font-display font-semibold leading-[0.92] tracking-tight text-white drop-shadow-md"
                style={{ fontSize: 'clamp(3rem, 6.8vw, 6.25rem)' }}
              >
                Orion Mall Gorakhpur
              </h1>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-4">
            <ScrollReveal variant="slideLeft" delay={0.08}>
              <p className="text-sm text-white/90 lg:text-right leading-relaxed max-w-xs">
                Destinations across retail, dining & PVR INOX Cinemas.
              </p>
            </ScrollReveal>
            <div className="flex flex-wrap gap-3">
              <ScrollReveal variant="pop" delay={0.12}>
                <button
                  type="button"
                  onClick={() => navigate('/explore')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-semibold bg-[var(--accent-coral)] text-white hover:opacity-95 transition-transform hover:-translate-y-0.5 cursor-pointer shadow-xl"
                >
                  <Compass className="w-4 h-4" />
                  <span>Enter 3D Mall</span>
                </button>
              </ScrollReveal>
              <ScrollReveal variant="pop" delay={0.16}>
                <button
                  type="button"
                  onClick={() => navigate('/shopping')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-semibold backdrop-blur-md bg-white/18 text-white border border-white/40 hover:bg-white/28 transition-colors cursor-pointer"
                >
                  <span>Brands</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </VideoBackdropSection>
  );
}

