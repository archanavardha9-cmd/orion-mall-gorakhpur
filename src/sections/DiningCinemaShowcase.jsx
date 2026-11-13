import { ArrowRight, ArrowUpRight, Film, UtensilsCrossed } from 'lucide-react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { BrandMark } from '../components/BrandMark';
import { DramaticReveal } from '../animations/MotionPrimitives';
import { VIDEO_ASSETS } from '../assets/mediaRegistry';
import { PVR_BOOKING_LINKS } from '../utils/mallData';
import { useRouter } from '../utils/router';

export function DiningCinemaShowcase() {
  const { navigate } = useRouter();

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[78vh]">
      {/* Left Split: Third Floor Dining & Jawed Habib */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.diningTerrace}
        scrim="bottom"
        minHeight="min-h-[65vh] lg:min-h-[78vh]"
        className="flex items-end"
      >
        <div className="p-8 md:p-14 w-full text-white space-y-5">
          <DramaticReveal variant="slideRight">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-200">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Third Floor</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[0.98] mt-2">
              Dining & Salon
            </h2>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {['KFC', 'Burger King', "Domino's Pizza", 'Jawed Habib'].map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-2 backdrop-blur-md bg-black/30 rounded-xl pr-3 p-1 border border-white/20"
                >
                  <BrandMark name={b} size="sm" />
                  <span className="text-xs font-medium text-white">{b}</span>
                </div>
              ))}
            </div>
            <div className="pt-5">
              <button
                type="button"
                onClick={() => navigate('/dining')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white text-stone-900 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <span>Open Third Floor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </DramaticReveal>
        </div>
      </VideoBackdropSection>

      {/* Right Split: Fourth Floor PVR INOX Cinemas */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.cinemaAuditorium}
        scrim="bottom"
        minHeight="min-h-[65vh] lg:min-h-[78vh]"
        className="flex items-end border-t lg:border-t-0 lg:border-l border-[var(--border-hairline)]"
      >
        <div className="p-8 md:p-14 w-full text-white space-y-5">
          <DramaticReveal variant="slideLeft">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-sky-200">
              <Film className="w-4 h-4" />
              <span>Fourth Floor</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[0.98] mt-2">
              PVR INOX Cinemas
            </h2>
            <div className="flex flex-wrap items-center gap-3 pt-5">
              <button
                type="button"
                onClick={() => navigate('/entertainment')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[var(--accent-coral)] text-white hover:opacity-95 transition-opacity cursor-pointer"
              >
                <span>Now Showing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={PVR_BOOKING_LINKS.bookMyShowGorakhpur}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold backdrop-blur-md bg-white/18 text-white border border-white/35 hover:bg-white/28 transition-colors"
              >
                <span>Book Tickets</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </DramaticReveal>
        </div>
      </VideoBackdropSection>
    </section>
  );
}
