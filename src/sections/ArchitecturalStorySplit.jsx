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
      tone="emerald"
      minHeight="min-h-[88vh]"
      className="flex items-center py-20 md:py-28"
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
        <DepthEmergeSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Editorial Narrative Column */}
            <ScrollReveal variant="slideRight" className="lg:col-span-5">
              <div className="relative space-y-8 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-3xl p-8 md:p-11 shadow-2xl overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br from-[var(--accent-coral)]/20 via-[var(--accent-plum)]/15 to-transparent blur-2xl pointer-events-none"
                />

                <div className="relative z-10 space-y-6">
                  <ScrollReveal variant="drop">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-turquoise)]">
                      Architecture &amp; Flow
                    </p>
                  </ScrollReveal>
                  <KineticLineReveal
                    text="Five sunlit levels in Mohaddipur"
                    className="font-display text-4xl md:text-5xl font-semibold leading-[1.02] text-[var(--text-primary)]"
                  />

                  <div className="divide-y divide-[var(--border-hairline)]">
                    {CHAPTERS.map((ch, idx) => (
                      <ScrollReveal key={ch.num} variant="slideRight" delay={0.06 + idx * 0.06}>
                        <button
                          type="button"
                          onClick={() => navigate(ch.path)}
                          className="group w-full text-left py-4 flex items-start justify-between gap-4 hover:translate-x-1 transition-transform cursor-pointer"
                        >
                          <div className="flex items-baseline gap-4">
                            <span
                              className="font-mono-tabular text-xs font-bold px-2.5 py-1 rounded-lg text-white shrink-0"
                              style={{ backgroundColor: ch.accent }}
                            >
                              {ch.num}
                            </span>
                            <div>
                              <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-coral)] transition-colors">
                                {ch.title}
                              </h3>
                              <p className="text-xs text-[var(--text-muted)] mt-1">
                                {ch.detail}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-coral)] shrink-0 mt-1 transition-colors" />
                        </button>
                      </ScrollReveal>
                    ))}
                  </div>

                  <ScrollReveal variant="rise" delay={0.26}>
                    <button
                      type="button"
                      onClick={() => navigate('/explore')}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-plum)] text-white hover:opacity-95 transition-opacity shadow-lg cursor-pointer"
                    >
                      <span>Walk the 3D Mall Atrium</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>

            {/* 3-Layer Overlapping Architectural Photography */}
            <div className="lg:col-span-7 relative min-h-[430px] md:min-h-[560px] flex items-center justify-center">

              {/* Layer 1: Main Sunlit Atrium */}
              <ParallaxDepth offset={-42} horizontal={-14} className="w-[78%] ml-auto relative z-10">
                <Interactive3DTilt intensity={5}>
                  <ScrollReveal variant="scaleDepth" delay={0.08}>
                    <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[16/10] bg-[var(--bg-tint-peach)]">
                      <img
                        src={IMAGE_ASSETS.mallAtriumEmpty}
                        alt="Sunlit five-level central atrium inside Orion Mall"
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
                offset={-24}
                horizontal={10}
                className="hidden sm:block absolute left-2 top-0 w-[34%] z-20"
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
                offset={46}
                horizontal={18}
                className="absolute left-0 bottom-0 md:bottom-4 w-[52%] z-30"
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
                    <div className="absolute inset-x-0 bottom-0 px-4 py-2.5 bg-gradient-to-t from-[#160d26]/85 to-transparent text-white">
                      <p className="font-mono-tabular text-[11px] uppercase tracking-[0.16em] text-amber-200">
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
