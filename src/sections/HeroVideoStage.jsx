import { ArrowRight, Compass, Film } from "lucide-react";
import { ScrollReveal } from "../animations/ScrollReveal";
import {
  Interactive3DTilt,
  ParallaxDepth,
} from "../animations/MotionPrimitives";
import { VideoBackdropSection } from "../components/VideoBackdropSection";
import { BrandMark } from "../components/BrandMark";
import { IMAGE_ASSETS, VIDEO_ASSETS } from "../assets/mediaRegistry";
import { useRouter } from "../utils/router";

const HERO_FEATURED_LOGOS = [
  "MAX Fashion",
  "Levi's",
  "Allen Solly",
  "KFC",
  "PVR INOX Cinemas",
];

const HERO_LEVEL_LINKS = [
  {
    num: "00",
    label: "Ground",
    detail: "Icons & Tech",
    path: "/shopping",
    color: "#E86144",
  },
  {
    num: "01",
    label: "First",
    detail: "Denim & Sport",
    path: "/shopping",
    color: "#14B8A6",
  },
  {
    num: "02",
    label: "Second",
    detail: "Couture & Kids",
    path: "/shopping",
    color: "#A855F7",
  },
  {
    num: "03",
    label: "Third",
    detail: "Dining Terrace",
    path: "/dining",
    color: "#F59E0B",
  },
  {
    num: "04",
    label: "Fourth",
    detail: "PVR INOX",
    path: "/entertainment",
    color: "#3B82F6",
  },
];

export function HeroVideoStage() {
  const { navigate } = useRouter();

  return (
    <VideoBackdropSection
      video={VIDEO_ASSETS.heroAtrium}
      scrim="heroPrism"
      isHero
      className="flex flex-col justify-between"
    >
      {/* Top Architectural Coordinate Line */}
      <div className="relative z-10 w-full bg-gradient-to-b from-[#120b20]/64 via-[#120b20]/28 to-transparent">
        <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12 pt-4 md:pt-6 flex items-center justify-between text-white border-b border-white/20 pb-3">
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

      {/* Main Dynamic Grand Entrance Composition */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 md:px-12 py-4 md:py-6 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Focal Anchor */}
          <div className="lg:col-span-7 text-white space-y-4">
            <ScrollReveal variant="rise" delay={0.04}>
              <h1
                className="font-display font-semibold leading-[0.94] tracking-tight text-white drop-shadow-lg"
                style={{ fontSize: "clamp(2.4rem, 4.8vw, 4.6rem)" }}
              >
                Orion Mall
                <span className="block italic font-medium text-amber-200 mt-0.5">
                  Gorakhpur
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="rise" delay={0.08}>
              <p className="text-xs sm:text-sm md:text-base text-white/95 max-w-xl leading-relaxed drop-shadow-sm">
                Step inside Mohaddipur&apos;s sunlit five-level destination —
                uniting flagship apparel, denim culture, festive couture, Third
                Floor culinary favourites, and PVR INOX Cinemas.
              </p>
            </ScrollReveal>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <ScrollReveal variant="pop" delay={0.12}>
                <button
                  type="button"
                  onClick={() => navigate("/explore")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#d6492e] via-[#e26336] to-[#d97706] text-white hover:opacity-95 transition-all hover:-translate-y-0.5 cursor-pointer shadow-xl whitespace-nowrap"
                >
                  <Compass className="w-4 h-4" />
                  <span>Enter 3D Mall</span>
                </button>
              </ScrollReveal>

              <ScrollReveal variant="pop" delay={0.16}>
                <button
                  type="button"
                  onClick={() => navigate("/shopping")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/20 text-white border border-white/45 hover:bg-white/30 transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Explore Brands</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </ScrollReveal>

              <ScrollReveal variant="pop" delay={0.2}>
                <button
                  type="button"
                  onClick={() => navigate("/entertainment")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#1e1233]/55 text-amber-200 border border-amber-200/35 hover:bg-[#1e1233]/75 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Film className="w-4 h-4" />
                  <span>Movie Tickets</span>
                </button>
              </ScrollReveal>
            </div>

            {/* Featured Brand Strip */}
            <div className="pt-2 border-t border-white/20 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono-tabular uppercase tracking-wider text-white/70">
                Anchor Outlets:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {HERO_FEATURED_LOGOS.map((name, i) => (
                  <ScrollReveal
                    key={name}
                    variant="pop"
                    delay={0.15 + i * 0.03}
                  >
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 border border-white/25 text-xs text-white">
                      <BrandMark name={name} size="sm" />
                      <span className="font-medium text-[11px]">{name}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Right Layered Showcase Imagery */}
          <div className="lg:col-span-5 relative hidden sm:flex items-center justify-center min-h-[240px] md:min-h-[290px]">
            <ParallaxDepth
              offset={-20}
              horizontal={-6}
              className="w-[84%] ml-auto"
            >
              <Interactive3DTilt intensity={5}>
                <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/50 aspect-[4/3] bg-[#1c102d]">
                  <img
                    src={IMAGE_ASSETS.brandMenswear}
                    alt="Premium menswear and fashion atelier at Orion Mall"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-[#160d26]/90 to-transparent text-white">
                    <p className="font-mono-tabular text-[10px] uppercase tracking-[0.18em] text-amber-200">
                      Ground &amp; First Floor Flagships
                    </p>
                    <p className="font-display text-base font-semibold">
                      Curated Menswear, Denim &amp; Footwear
                    </p>
                  </div>
                </div>
              </Interactive3DTilt>
            </ParallaxDepth>

            <ParallaxDepth
              offset={20}
              horizontal={8}
              className="hidden sm:block absolute left-0 bottom-0 w-[46%] z-20"
            >
              <div className="animate-float-reverse rounded-2xl overflow-hidden shadow-2xl border-2 border-white/60 aspect-[4/3] bg-[#1c102d]">
                <img
                  src={IMAGE_ASSETS.brandEthnic}
                  alt="Festive fashion & lifestyle boutiques inside Orion Mall"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 px-2.5 py-1.5 bg-gradient-to-t from-[#160d26]/88 to-transparent text-white">
                  <p className="text-[10px] font-semibold">
                    26 Signature Brands
                  </p>
                </div>
              </div>
            </ParallaxDepth>
          </div>
        </div>
      </div>
    </VideoBackdropSection>
  );
}
