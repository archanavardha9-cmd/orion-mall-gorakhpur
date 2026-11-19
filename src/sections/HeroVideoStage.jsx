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
  "KFC",
  "Levi's",
  "PVR INOX Cinemas",
];

const HERO_BRAND_CONFIG = {
  "MAX Fashion": {
    bg: "bg-[#f0f6ff]",
    border: "border-[#2563eb]/25",
    accent: "#2563eb",
  },
  "KFC": {
    bg: "bg-[#fff4f4]",
    border: "border-[#e4002b]/25",
    accent: "#e4002b",
  },
  "Levi's": {
    bg: "bg-[#fff6f2]",
    border: "border-[#d6492e]/25",
    accent: "#d6492e",
  },
  "PVR INOX Cinemas": {
    bg: "bg-[#fffbe8]",
    border: "border-[#c6821c]/25",
    accent: "#c6821c",
  },
};

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
      <div className="relative z-10 w-full bg-gradient-to-b from-[#f5ede2]/95 via-[#f5ede2]/50 to-transparent">
        <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12 pt-4 md:pt-6 flex items-center justify-between text-[#3e3056] border-b border-[#3e3056]/15 pb-3">
          <ScrollReveal variant="slideRight">
            <span className="text-xs font-mono-tabular tracking-[0.22em] uppercase text-[#3e3056] font-semibold">
              Mohaddipur · Gorakhpur · Uttar Pradesh
            </span>
          </ScrollReveal>
          <ScrollReveal variant="slideLeft" delay={0.05}>
            <span className="text-xs font-mono-tabular tracking-[0.22em] uppercase hidden sm:inline text-black font-semibold">
              Five Levels · Fashion · Dining · Cinema
            </span>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Dynamic Grand Entrance Composition */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 md:px-12 py-4 md:py-6 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Focal Anchor */}
          <div className="lg:col-span-7 text-[#2b1f3d] space-y-4">
            <ScrollReveal variant="rise" delay={0.04}>
              <h1
                className="font-display font-semibold leading-[0.94] tracking-tight text-[#160d26]"
                style={{ fontSize: "clamp(2.75rem, 5vw, 4.6rem)" }}
              >
                Orion Mall
                <span className="block italic font-medium text-[#c2410c] mt-0.5">
                  Gorakhpur
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="rise" delay={0.08}>
              <p className="text-sm sm:text-sm md:text-base text-[#2b1f3d] font-medium max-w-xl leading-relaxed">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#d6492e] via-[#e26336] to-[#d97706] text-[#faf4eb] hover:opacity-95 transition-all hover:-translate-y-0.5 cursor-pointer shadow-xl whitespace-nowrap"
                >
                  <Compass className="w-4 h-4" />
                  <span>Enter 3D Mall</span>
                </button>
              </ScrollReveal>

              <ScrollReveal variant="pop" delay={0.16}>
                <button
                  type="button"
                  onClick={() => navigate("/shopping")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#1e1233] text-amber-200 border border-amber-300/40 hover:bg-[#2b1a47] transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shadow-lg backdrop-blur-md"
                >
                  <span>Explore Brands</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </ScrollReveal>

              <ScrollReveal variant="pop" delay={0.2}>
                <button
                  type="button"
                  onClick={() => navigate("/entertainment")}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#1e1233]/90 text-amber-200 border border-amber-200/40 hover:bg-[#1e1233] transition-colors cursor-pointer whitespace-nowrap shadow-md"
                >
                  <Film className="w-4 h-4" />
                  <span>Movie Tickets</span>
                </button>
              </ScrollReveal>
            </div>

            {/* Featured Brand Strip - Desktop / Tablet: individual pill containers, no outer wrapper */}
            <div className="hidden sm:flex flex-wrap items-center gap-2">
              {HERO_FEATURED_LOGOS.map((name, i) => (
                <ScrollReveal
                  key={name}
                  variant="pop"
                  delay={0.15 + i * 0.03}
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 border border-[#3e3056]/20 text-xs text-[#1a102b] shadow-xs backdrop-blur-md">
                    <BrandMark name={name} size="sm" />
                    <span className="font-semibold text-[11px] text-[#1a102b]">{name}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Featured Brand Strip - Mobile: Compact coloured individual containers */}
            <div className="sm:hidden grid grid-cols-2 gap-1.5 max-w-[240px] pt-1">
              {HERO_FEATURED_LOGOS.map((name, i) => {
                const brandStyle = HERO_BRAND_CONFIG[name] || {
                  bg: "bg-white",
                  border: "border-white/40",
                  accent: "#f5be42",
                };

                return (
                  <ScrollReveal
                    key={name}
                    variant="pop"
                    delay={0.15 + i * 0.03}
                    className="w-full"
                  >
                    <div
                      className={`w-full h-8 rounded-lg ${brandStyle.bg} ${brandStyle.border} border shadow-xs flex items-center justify-center px-2 py-0.5 transition-transform`}
                      style={{
                        borderBottomColor: brandStyle.accent,
                        borderBottomWidth: "2px",
                      }}
                    >
                      <BrandMark
                        name={name}
                        size="md"
                        raw={true}
                        className="max-h-4 max-w-[62px] w-auto object-contain filter"
                      />
                    </div>
                  </ScrollReveal>
                );
              })}
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
                    width="480"
                    height="360"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-[#160d26]/90 to-transparent">
                    <p className="font-mono-tabular text-[10px] uppercase tracking-[0.18em] text-amber-200">
                      Ground &amp; First Floor Flagships
                    </p>
                    <p className="font-display text-base font-semibold text-[#f3ede2]">
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
                  width="320"
                  height="240"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 px-2.5 py-1.5 bg-gradient-to-t from-[#160d26]/88 to-transparent">
                  <p className="text-[10px] font-semibold text-amber-100">
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
