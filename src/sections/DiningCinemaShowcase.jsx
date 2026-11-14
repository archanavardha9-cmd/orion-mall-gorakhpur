import { ArrowRight, ArrowUpRight, Film, UtensilsCrossed } from 'lucide-react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { BrandMark } from '../components/BrandMark';
import { ScrollReveal } from '../animations/ScrollReveal';
import { VIDEO_ASSETS } from '../assets/mediaRegistry';
import { PVR_BOOKING_LINKS } from '../utils/mallData';
import { useRouter } from '../utils/router';

export function DiningCinemaShowcase() {
  const { navigate } = useRouter();

  return (
    <div className="w-full h-full min-h-[calc(100svh-4rem)] grid grid-cols-1 lg:grid-cols-2">
      {/* Left Split: Third Floor Dining */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.diningTerrace}
        scrim="bottom"
        edgeBlend="none"
        className="flex items-end justify-end"
      >
        <div className="relative z-10 w-full p-6 md:p-10 pt-20 md:pt-28 bg-gradient-to-t from-[#120b20]/95 via-[#120b20]/65 to-transparent text-white space-y-4">
          <ScrollReveal variant="slideRight">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-200">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Third Floor</span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="rise" delay={0.05}>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-[0.98] drop-shadow-md">
              Dining Terrace
            </h2>
          </ScrollReveal>
          <p className="text-xs sm:text-sm text-white/95 max-w-md leading-relaxed drop-shadow-sm">
            Flame-grilled Whoppers, golden oven-baked pizzas &amp; signature crispy buckets in a lively social court.
          </p>
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {['KFC', 'Burger King', "Domino's Pizza"].map((b, idx) => (
              <ScrollReveal key={b} variant="pop" delay={0.08 + idx * 0.04}>
                <div className="flex items-center gap-2 bg-[#26120c]/85 rounded-xl pr-3 p-1 border border-amber-200/35 shadow-md">
                  <BrandMark name={b} size="sm" />
                  <span className="text-xs font-semibold text-white">{b}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal variant="rise" delay={0.2}>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/dining')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-300 to-amber-100 text-stone-950 hover:opacity-95 transition-opacity cursor-pointer shadow-lg"
              >
                <span>Open Third Floor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </VideoBackdropSection>

      {/* Right Split: Fourth Floor PVR INOX Cinemas */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.cinemaAuditorium}
        scrim="bottom"
        edgeBlend="none"
        className="flex items-end justify-end border-t lg:border-t-0 lg:border-l border-[var(--glass-border)]"
      >
        <div className="relative z-10 w-full p-6 md:p-10 pt-20 md:pt-28 bg-gradient-to-t from-[#120b20]/95 via-[#120b20]/65 to-transparent text-white space-y-4">
          <ScrollReveal variant="pop">
            <BrandMark name="PVR INOX Cinemas" size="md" />
          </ScrollReveal>
          <ScrollReveal variant="slideLeft">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-200">
              <Film className="w-4 h-4" />
              <span>Fourth Floor</span>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="rise" delay={0.05}>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-[0.98] drop-shadow-md">
              PVR INOX Cinemas
            </h2>
          </ScrollReveal>
          <p className="text-xs sm:text-sm text-white/95 max-w-md leading-relaxed drop-shadow-sm">
            Laser projection, Dolby surround sound &amp; plush recliner auditoriums crowning Orion Mall.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <ScrollReveal variant="pop" delay={0.1}>
              <button
                type="button"
                onClick={() => navigate('/entertainment')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#d6492e] to-[#c73468] text-white hover:opacity-95 transition-opacity cursor-pointer shadow-lg"
              >
                <span>Now Showing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </ScrollReveal>
            <ScrollReveal variant="pop" delay={0.16}>
              <a
                href={PVR_BOOKING_LINKS.bookMyShowGorakhpur}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/22 text-white border border-white/45 hover:bg-white/32 transition-colors"
              >
                <span>Book Tickets</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </VideoBackdropSection>
    </div>
  );
}
