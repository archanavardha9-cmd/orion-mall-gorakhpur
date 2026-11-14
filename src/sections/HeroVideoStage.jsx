import { ArrowRight, Compass, Film } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Interactive3DTilt, ParallaxDepth } from '../animations/MotionPrimitives';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { BrandMark } from '../components/BrandMark';
import { IMAGE_ASSETS, VIDEO_ASSETS } from '../assets/mediaRegistry';
import { useRouter } from '../utils/router';

const HERO_FEATURED_LOGOS = [
  'MAX Fashion',
  "Levi's",
  'Allen Solly',
  'KFC',
  'PVR INOX Cinemas'
];

const HERO_LEVEL_LINKS = [
  { num: '00', label: 'Ground', detail: 'Icons & Tech', path: '/shopping', color: '#E86144' },
  { num: '01', label: 'First', detail: 'Denim & Sport', path: '/shopping', color: '#14B8A6' },
  { num: '02', label: 'Second', detail: 'Couture & Kids', path: '/shopping', color: '#A855F7' },
  { num: '03', label: 'Third', detail: 'Dining Terrace', path: '/dining', color: '#F59E0B' },
  { num: '04', label: 'Fourth', detail: 'PVR INOX', path: '/entertainment', color: '#3B82F6' }
];

export function HeroVideoStage() {
  const { navigate } = useRouter();

  return (
    <VideoBackdropSection
      video={VIDEO_ASSETS.heroAtrium}
      scrim="heroPrism"
      isHero
      minHeight="min-h-[100vh]"
      className="flex flex-col justify-between"
    >

      {/* Top Architectural Coordinate Line */}
      <div className="relative z-10 w-full bg-gradient-to-b from-[#120b20]/64 via-[#120b20]/28 to-transparent">
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 pt-8 md:pt-11 flex items-center justify-between text-white border-b border-white/25 pb-4">
          <ScrollReveal variant="slideRight">
            <span className="text-xs font-mono-tabular tracking-[0.22em] uppercase drop-shadow-[0_1px_6px_rgba(10,6,20,0.8)]">
              Mohaddipur · Gorakhpur · Uttar Pradesh
            </span>
          </ScrollReveal>
          <ScrollReveal variant="slideLeft" delay={0.05}>
            <span className="text-xs font-mono-tabular tracking-[0.22em] uppercase hidden sm:inline text-amber-200 drop-shadow-[0_1px_6px_rgba(10,6,20,0.9)]">
              Five Levels · Fashion · Dining · Cinema
            </span>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Dynamic 12-Column Grand Entrance Composition */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Focal Anchor: Display Typography, Actions & Authentic Brand Strip */}
          <div className="lg:col-span-7 text-white space-y-7">
            <ScrollReveal variant="rise" delay={0.04}>
              <h1
                className="font-display font-semibold leading-[0.92] tracking-tight text-white drop-shadow-lg"
                style={{ fontSize: 'clamp(3.25rem, 6.4vw, 6.2rem)' }}
              >
                Orion Mall
                <span className="block italic font-medium text-amber-200 mt-1">
                  Gorakhpur
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="rise" delay={0.08}>
              <p className="text-base md:text-lg text-white/95 max-w-xl leading-relaxed drop-shadow-sm">
                Step inside Mohaddipur&apos;s sunlit five-level destination — uniting flagship apparel, denim culture, festive couture, Third Floor culinary favourites, and PVR INOX Cinemas.
              </p>
            </ScrollReveal>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <ScrollReveal variant="pop" delay={0.12}>
                <button
                  type="button"
                  onClick={() => navigate('/explore')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#d6492e] via-[#e26336] to-[#d97706] text-white hover:opacity-95 transition-all hover:-translate-y-0.5 cursor-pointer shadow-xl whitespace-nowrap"
                >
                  <Compass className="w-4 h-4" />
                  <span>Enter 3D Mall</span>
                </button>
              </ScrollReveal>

              <ScrollReveal variant="pop" delay={0.16}>
                <button
                  type="button"
                  onClick={() => navigate('/shopping')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold backdrop-blur-md bg-white/20 text-white border border-white/45 hover:bg-white/30 transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Explore Brands</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </ScrollReveal>

              <ScrollReveal variant="pop" delay={0.2}>
                <button
                  type="button"
                  onClick={() => navigate('/entertainment')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold backdrop-blur-md bg-[#1e1233]/55 text-amber-200 border border-amber-200/35 hover:bg-[#1e1233]/75 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Film className="w-4 h-4" />
                  <span>PVR INOX</span>
                </button>
              </ScrollReveal>
            </div>

            {/* Authentic Resident Brand Crest Strip */}
            <ScrollReveal variant="rise" delay={0.22}>
              <div className="pt-4 border-t border-white/25 space-y-2.5">
                <p className="font-mono-tabular text-[11px] uppercase tracking-[0.2em] text-amber-100/90">
                  Featured Destinations Inside
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {HERO_FEATURED_LOGOS.map((brand) => (
                    <BrandMark key={brand} name={brand} size="sm" />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Layered Architectural Preview Composition */}
          <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[430px] flex items-center justify-center">
            <ParallaxDepth offset={-26} className="w-[86%] ml-auto">
              <Interactive3DTilt intensity={6}>
                <div className="animate-float-slow rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200/45 aspect-[4/3] bg-[#1c102d]">
                  <img
                    src={IMAGE_ASSETS.mallAtriumEmpty}
                    alt="Sunlit five-level central atrium inside Orion Mall Gorakhpur"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#160d26]/85 via-[#160d26]/30 to-transparent text-white">
                    <p className="font-mono-tabular text-[11px] uppercase tracking-[0.18em] text-amber-200">
                      Central Skylight Atrium
                    </p>
                    <p className="font-display text-xl font-semibold">
                      Five Curated Retail & Leisure Levels
                    </p>
                  </div>
                </div>
              </Interactive3DTilt>
            </ParallaxDepth>

            <ParallaxDepth
              offset={30}
              horizontal={12}
              className="hidden sm:block absolute left-0 bottom-0 w-[52%] z-20"
            >
              <div className="animate-float-reverse rounded-2xl overflow-hidden shadow-2xl border-2 border-white/60 aspect-[4/3] bg-[#1c102d]">
                <img
                  src={IMAGE_ASSETS.brandEthnic}
                  alt="Festive fashion & lifestyle boutiques inside Orion Mall"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 px-3.5 py-2.5 bg-gradient-to-t from-[#160d26]/88 to-transparent text-white">
                  <p className="text-xs font-semibold">26 Signature Brands</p>
                </div>
              </div>
            </ParallaxDepth>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Floor Elevation Bar */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 backdrop-blur-xl bg-[#1a102b]/58 border border-white/25 rounded-2xl p-2 shadow-2xl">
          {HERO_LEVEL_LINKS.map((lv) => (
            <button
              key={lv.num}
              type="button"
              onClick={() => navigate(lv.path)}
              className="group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left hover:bg-white/14 transition-colors cursor-pointer"
            >
              <span
                className="font-mono-tabular text-xs font-bold px-2 py-1 rounded-lg text-white shrink-0 transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: lv.color }}
              >
                L{lv.num}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{lv.label}</p>
                <p className="text-[11px] text-white/75 truncate">{lv.detail}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </VideoBackdropSection>
  );
}
