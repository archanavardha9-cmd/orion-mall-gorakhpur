import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { MALL_INFO, PVR_BOOKING_LINKS } from '../utils/mallData';
import { ROUTES, useRouter } from '../utils/router';

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="relative border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-display text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
              Orion Mall, Gorakhpur
            </h2>
            <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
              A contemporary five-level retail, dining, and multiplex destination at the heart of Mohaddipur, Uttar Pradesh.
            </p>
            <div className="pt-2 space-y-2 text-sm text-[var(--text-secondary)]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-[var(--accent-coral)] shrink-0" />
                <span>{MALL_INFO.locality}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-[var(--accent-turquoise)] shrink-0" />
                <span>
                  Retail: {MALL_INFO.hours.retail} · Cinema: {MALL_INFO.hours.cinema}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[var(--text-muted)]">
              Destinations
            </p>
            <ul className="space-y-2">
              {ROUTES.map((route) => (
                <li key={route.path}>
                  <a
                    href={route.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(route.path);
                    }}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-coral)] transition-colors"
                  >
                    {route.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[var(--text-muted)]">
              Fourth Floor Cinema Booking
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Reserve recliner seats and view live showtimes for PVR INOX Cinemas at Orion Mall, Mohaddipur via verified ticket portals.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={PVR_BOOKING_LINKS.bookMyShowGorakhpur}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--accent-coral)] text-white hover:opacity-90 transition-opacity"
              >
                <span>Book via BookMyShow</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={PVR_BOOKING_LINKS.pvrOfficial}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[var(--accent-turquoise)] transition-colors"
              >
                <span>PVR INOX Portal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <span>Orion Mall · Mohaddipur, Gorakhpur, Uttar Pradesh</span>
          <span>Ground to Fourth Floor Retail, Culinary Court & PVR INOX Cinemas</span>
        </div>
      </div>
    </footer>
  );
}
