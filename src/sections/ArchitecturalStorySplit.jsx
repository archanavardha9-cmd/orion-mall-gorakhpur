import { ArrowUpRight } from 'lucide-react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import {
  DepthEmergeSection,
  Interactive3DTilt,
  KineticLineReveal,
  ParallaxDepth
} from '../animations/MotionPrimitives';
import { ScrollReveal } from '../animations/ScrollReveal';
import { IMAGE_ASSETS, VIDEO_ASSETS } from '../assets/mediaRegistry';
import { useRouter } from '../utils/router';

const CHAPTERS = [
  {
    num: '01',
    title: 'Ground & First Retail Promenade',
    detail: 'Tailoring, denim culture, footwear & flagship tech',
    accent: 'var(--accent-coral)',
    path: '/shopping'
  },
  {
    num: '02',
    title: 'Second Floor Couture & Junior Wing',
    detail: 'Festive ethnic silhouettes, handbags & kidswear',
    accent: 'var(--accent-plum)',
    path: '/shopping'
  },
  {
    num: '03',
    title: 'Third Floor Dining & PVR INOX Above',
    detail: 'Social food pavilion crowned by laser multiplex screens',
    accent: 'var(--accent-turquoise)',
    path: '/dining'
  }
];

export function ArchitecturalStorySplit() {
  const { navigate } = useRouter();

  return (
    <VideoBackdropSection
      id="atrium-story"
      video={VIDEO_ASSETS.atriumStory}
      scrim="jewelMist"
      className="flex items-center py-8 md:py-10"
    >
      <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12 my-auto">
        <DepthEmergeSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Editorial Narrative Column */}
            <ScrollReveal variant="slideRight" className="lg:col-span-5">
              <div className="relative space-y-5 bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <ScrollReveal variant="drop">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-turquoise)]">
                      Architecture &amp; Flow
                    </p>
                  </ScrollReveal>
                  <KineticLineReveal
                    text="Five sunlit levels in Mohaddipur"
                    className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.04] text-[var(--text-primary)]"
                  />

                  <div className="divide-y divide-[var(--border-hairline)]">
                    {CHAPTERS.map((ch, idx) => (
                      <ScrollReveal
                        key={ch.num}
                        variant="slideRight"
                        delay={0.05 + idx * 0.04}
                      >
                        <button
                          type="button"
                          onClick={() => navigate(ch.path)}
                          className="group w-full text-left py-2.5 flex items-start justify-between gap-3 hover:translate-x-1 transition-transform cursor-pointer"
                        >
                          <div className="flex items-baseline gap-3">
                            <span
                              className="font-mono-tabular text-xs font-bold px-2 py-0.5 rounded-lg text-white shrink-0"
                              style={{ backgroundColor: ch.accent }}
                            >
                              {ch.num}
                            </span>
                            <div>
                              <h3 className="font-display text-base sm:text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-coral)] transition-colors">
                                {ch.title}
                              </h3>
                              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                                {ch.detail}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-coral)] shrink-0 mt-1 transition-colors" />
                        </button>
                      </ScrollReveal>
                    ))}
                  </div>

                  <ScrollReveal variant="rise" delay={0.2}>
                    <button
                      type="button"
                      onClick={() => navigate("/explore")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-plum)] text-white hover:opacity-95 transition-opacity shadow-lg cursor-pointer"
                    >
                      <span>Walk the 3D Mall Atrium</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>

            {/* Overlapping Architectural Photography */}
            <div className="lg:col-span-7 relative min-h-0 md:min-h-[400px] lg:min-h-[440px] flex items-center justify-center pb-4 sm:pb-0">
              {/* Layer 1: Main Sunlit Atrium */}
              <ParallaxDepth
                offset={-24}
                horizontal={-8}
                className="w-full sm:w-[88%] sm:ml-auto relative z-10"
              >
                <Interactive3DTilt intensity={5}>
                  <ScrollReveal variant="scaleDepth" delay={0.08}>
                    <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[16/10] bg-[var(--bg-tint-peach)]">
                      <img
                        src={IMAGE_ASSETS.mallLuxuryCorridor}
                        alt="Luxury marble promenade and golden chandelier corridor inside Orion Mall"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </ScrollReveal>
                </Interactive3DTilt>
              </ParallaxDepth>

              {/* Layer 2: Top-Left Menswear Atelier Accent */}
              <ParallaxDepth
                offset={-16}
                horizontal={8}
                className="hidden sm:block absolute left-1 -top-2 w-[38%] z-20"
              >
                <ScrollReveal variant="drop" delay={0.12}>
                  <div className="animate-float-reverse rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3] bg-[var(--bg-tint-lavender)]">
                    <img
                      src={IMAGE_ASSETS.brandMenswear}
                      alt="Ground Floor tailoring & fashion atelier inside Orion Mall"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </ScrollReveal>
              </ParallaxDepth>

              {/* Layer 3: Bottom-Left Ethnic Couture Wing */}
              <ParallaxDepth
                offset={24}
                horizontal={12}
                className="absolute left-2 sm:-left-2 -bottom-2 sm:-bottom-4 w-[50%] sm:w-[54%] z-30"
              >
                <ScrollReveal variant="slideLeft" delay={0.16}>
                  <div className="animate-float-slow rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3] bg-[var(--bg-tint-mint)]">
                    <img
                      src={IMAGE_ASSETS.brandEthnic}
                      alt="Second Floor festive boutique interior"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 px-3 py-1.5 bg-gradient-to-t from-[#160d26]/85 to-transparent text-white">
                      <p className="font-mono-tabular text-[10px] uppercase tracking-[0.14em] text-amber-200 truncate">
                        26 Signature Outlets · Floors 00–04
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </ParallaxDepth>
            </div>
          </div>
        </DepthEmergeSection>
      </div>
    </VideoBackdropSection>
  );
}
