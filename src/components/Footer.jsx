import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { MALL_INFO, PVR_BOOKING_LINKS } from "../utils/mallData";
import { ROUTES, useRouter } from "../utils/router";
import { ScrollReveal } from "../animations/ScrollReveal";

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="relative border-t border-[var(--border-hairline)] bg-gradient-to-b from-[var(--bg-surface-elevated)] to-[var(--bg-surface)] backdrop-blur-xl transition-colors duration-300">
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-plum)] to-[var(--accent-turquoise)]"
      />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 space-y-4">
            <ScrollReveal variant="rise">
              {/* Orion Mall logo – transparent PNG, no background */}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
                aria-label="Orion Mall – go to home page"
                className="inline-block focus-visible:outline-2 focus-visible:outline-[var(--accent-coral)] focus-visible:outline-offset-2 rounded-sm"
              >
                <picture>
                  <source srcSet="/images/orion_mall_logo.webp" type="image/webp" />
                  <img
                    src="/images/orion_mall_logo.webp"
                    alt="Orion Mall"
                    width="220"
                    height="64"
                    className="h-14 md:h-16 w-auto object-contain"
                    style={{ maxWidth: "220px" }}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </a>
            </ScrollReveal>
            <ScrollReveal variant="rise" delay={0.04}>
              <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
                A contemporary five-level retail, dining, and multiplex
                destination at the heart of Mohaddipur, Uttar Pradesh.
              </p>
            </ScrollReveal>
            <div className="pt-2 space-y-2 text-sm text-[var(--text-secondary)]">
              <ScrollReveal variant="rise" delay={0.08}>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 text-[var(--accent-coral)] shrink-0" />
                  <span>{MALL_INFO.locality}</span>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="rise" delay={0.12}>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 mt-0.5 text-[var(--accent-turquoise)] shrink-0" />
                  <span>
                    Retail: {MALL_INFO.hours.retail} · Cinema:{" "}
                    {MALL_INFO.hours.cinema}
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <ScrollReveal variant="rise">
              <p className="text-xs font-semibold tracking-wider uppercase text-[var(--accent-plum)]">
                Destinations
              </p>
            </ScrollReveal>
            <ul className="space-y-2">
              {ROUTES.map((route, idx) => (
                <li key={route.path}>
                  <ScrollReveal
                    variant="rise"
                    delay={0.04 + idx * 0.03}
                  >
                    <a
                      href={route.path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(route.path);
                      }}
                      className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-coral)] transition-colors"
                    >
                      {route.label}
                    </a>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <ScrollReveal variant="rise">
              <p className="text-xs font-semibold tracking-wider uppercase text-[var(--accent-turquoise)]">
                Fourth Floor Cinema Booking
              </p>
            </ScrollReveal>
            <ScrollReveal variant="rise" delay={0.04}>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Reserve recliner seats and view live showtimes for PVR INOX
                Cinemas at Orion Mall, Mohaddipur via verified ticket portals.
              </p>
            </ScrollReveal>
            <div className="flex flex-wrap gap-3 pt-1">
              <ScrollReveal variant="pop" delay={0.08}>
                <a
                  href={PVR_BOOKING_LINKS.bookMyShowGorakhpur}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[var(--accent-coral)] to-[var(--accent-plum)] text-[#faf4eb] hover:opacity-90 transition-opacity shadow-sm"
                >
                  <span>Book via BookMyShow</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </ScrollReveal>
              <ScrollReveal variant="pop" delay={0.12}>
                <a
                  href={PVR_BOOKING_LINKS.pvrOfficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-turquoise)] transition-colors"
                >
                  <span>PVR INOX Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <ScrollReveal variant="rise">
            <span>Orion Mall · Mohaddipur, Gorakhpur, Uttar Pradesh</span>
          </ScrollReveal>
          <ScrollReveal variant="rise" delay={0.04}>
            <span>
              Ground to Fourth Floor Retail, Culinary Court &amp; PVR INOX
              Cinemas
            </span>
          </ScrollReveal>
        </div>
      </div>
    </footer>
  );
}
