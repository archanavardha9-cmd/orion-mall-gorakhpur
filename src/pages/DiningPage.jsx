import { useState } from 'react';
import { UtensilsCrossed, Clock, Flame, Pizza } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { BrandMark } from '../components/BrandMark';
import {
  DepthEmergeSection,
  Interactive3DTilt,
  ParallaxDepth
} from '../animations/MotionPrimitives';
import { ScrollReveal } from '../animations/ScrollReveal';
import {
  BRAND_IMAGES,
  VIDEO_ASSETS,
  DINING_BRAND_GALLERY
} from '../assets/mediaRegistry';
import { MALL_INFO } from '../utils/mallData';

const DINING_DESTINATIONS = [
  {
    name: 'KFC',
    specialty: 'Hot & Crispy Buckets · Zinger Burgers',
    signature: 'Signature crunch & rice bowls on Third Floor',
    accent: '#E4002B',
    insetImg: DINING_BRAND_GALLERY.burgerKing.sides
  },
  {
    name: 'Burger King',
    specialty: 'Flame-Grilled Whopper · King Fries',
    signature: 'Fresh burger combos & thick shakes',
    accent: '#D62300',
    insetImg: DINING_BRAND_GALLERY.burgerKing.feast
  },
  {
    name: "Domino's Pizza",
    specialty: 'Oven-Fresh Hand-Tossed Pizzas',
    signature: 'Cheese Burst & stuffed garlic breadsticks',
    accent: '#006491',
    insetImg: DINING_BRAND_GALLERY.dominos.spread
  }
];

const BURGER_KING_SHOWCASE = [
  {
    id: 'whopper',
    title: 'Flame-Grilled Whopper Meal',
    caption: 'Signature sesame bun stacked with charred patty, crisp lettuce, ripe tomato & golden King Fries.',
    image: DINING_BRAND_GALLERY.burgerKing.feast,
    alt: 'Flame-grilled double burger with crispy fries and chilled cola on toasted oak counter'
  },
  {
    id: 'sides',
    title: 'Crispy Sides & Thick Shakes',
    caption: 'Golden seasoned potato fries, crunchy onion rings, and rich spun shakes served warm.',
    image: DINING_BRAND_GALLERY.burgerKing.sides,
    alt: 'Burger King burger platter with seasoned fries and signature sides'
  },
  {
    id: 'interior',
    title: 'Warm Amber Dining Lounge',
    caption: 'Contemporary timber paneling, crimson booths & open grill kitchen on the Third Floor.',
    image: DINING_BRAND_GALLERY.burgerKing.interior,
    alt: 'Modern Burger King restaurant dining room with timber paneling and warm amber lighting'
  }
];

const DOMINOS_HIGHLIGHTS = [
  {
    id: 'hand-tossed',
    tabLabel: 'Hand-Tossed',
    title: 'Hand-Tossed Signature Pizzas',
    detail: 'Stone-baked crust stretched fresh to order with bubbling mozzarella & zesty oregano.'
  },
  {
    id: 'cheese-burst',
    tabLabel: 'Cheese Burst',
    title: 'Cheese Burst & Stuffed Garlic Bread',
    detail: 'Golden-baked garlic breadsticks paired with molten liquid cheese & spiced marinara dip.'
  },
  {
    id: 'desserts',
    tabLabel: 'Choco Lava',
    title: 'Choco Lava & Quick Combos',
    detail: 'Warm molten chocolate cake and single-serve pan pizzas prepared in minutes.'
  }
];

function BurgerKingLockup() {
  return (
    <div className="inline-flex items-center gap-4 select-none" aria-label="Burger King official brand lockup">
      <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center shrink-0 drop-shadow-lg">
        <img
          src="/images/logos/burger_king.svg"
          alt="Burger King official logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#FFAA00]">
          BURGER KING
        </span>
        <span className="font-mono-tabular text-[11px] uppercase tracking-[0.2em] text-[#F5EBDC]/90 mt-1">
          Home of the Whopper
        </span>
      </div>
    </div>
  );
}

function DominosLockup() {
  return (
    <div className="inline-flex items-center gap-3.5 select-none" aria-label="Domino's Pizza official brand lockup">
      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0 shadow-sm">
        <img
          src="/images/logos/dominos.svg"
          alt="Domino's Pizza official logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[#006491]">
          Domino&apos;s <span className="text-[#E31837]">Pizza</span>
        </span>
        <span className="font-mono-tabular text-[11px] uppercase tracking-[0.2em] text-slate-600 mt-1">
          Oven-Baked Freshness
        </span>
      </div>
    </div>
  );
}

export function DiningPage() {
  const [selectedOutlet, setSelectedOutlet] = useState(DINING_DESTINATIONS[0]);
  const [activeBkView, setActiveBkView] = useState(BURGER_KING_SHOWCASE[0]);
  const [activeDominoHighlight, setActiveDominoHighlight] = useState(DOMINOS_HIGHLIGHTS[0]);

  return (
    <div className="w-full">
      {/* UNIQUE DINING HERO: Top-Anchored Sunlit Culinary Horizon */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.diningTerrace}
        scrim="heroPrism"
        isHero
        minHeight="min-h-[80vh]"
        className="flex flex-col justify-between py-14 md:py-20"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-3xl space-y-4 text-white"
          >
            <ScrollReveal variant="drop" className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-200">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Third Floor Pavilion</span>
            </ScrollReveal>
            <ScrollReveal variant="slideRight" delay={0.06}>
              <h1
                className="font-display font-semibold leading-[0.94] text-white drop-shadow-lg"
                style={{ fontSize: 'clamp(2.9rem, 6vw, 5.5rem)' }}
              >
                Third Floor Flavours
              </h1>
            </ScrollReveal>
            <p className="text-sm md:text-base text-white/90 max-w-xl leading-relaxed">
              Flame-grilled burgers, crispy golden buckets &amp; oven-baked pizzas served across Orion Mall&apos;s sunlit culinary deck.
            </p>
          </motion.div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 pt-16">
          <div className="inline-flex flex-wrap gap-3 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-2xl p-2 shadow-2xl">
            {DINING_DESTINATIONS.map((item, idx) => (
              <ScrollReveal key={item.name} variant="pop" delay={idx * 0.05}>
                <button
                  type="button"
                  onClick={() => setSelectedOutlet(item)}
                  className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                    selectedOutlet.name === item.name
                      ? 'text-white shadow-md'
                      : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                  }`}
                  style={
                    selectedOutlet.name === item.name
                      ? { backgroundColor: item.accent }
                      : undefined
                  }
                >
                  <BrandMark name={item.name} size="sm" />
                  <span>{item.name}</span>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </VideoBackdropSection>

      {/* Culinary Visual Stage over Warm Dining Room Motion Video */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.diningCulinary}
        scrim="jewelMist"
        tone="coral"
        minHeight="min-h-[78vh]"
        className="py-20 md:py-28 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <DepthEmergeSection>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOutlet.name}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                <div className="lg:col-span-7 relative">
                  <ParallaxDepth offset={24}>
                    <Interactive3DTilt intensity={5}>
                      <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--glass-border)] aspect-[4/3] bg-[#2a150f]">
                        <img
                          src={BRAND_IMAGES[selectedOutlet.name] || selectedOutlet.insetImg}
                          alt={`${selectedOutlet.name} signature culinary spread`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Interactive3DTilt>
                  </ParallaxDepth>
                </div>

                <div className="lg:col-span-5 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-8 md:p-10 shadow-2xl space-y-5">
                  <ScrollReveal variant="pop">
                    <BrandMark name={selectedOutlet.name} size="lg" />
                  </ScrollReveal>
                  <ScrollReveal variant="slideLeft" delay={0.04}>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--text-primary)]">
                      {selectedOutlet.name}
                    </h2>
                  </ScrollReveal>
                  <ScrollReveal variant="rise" delay={0.08}>
                    <p
                      className="text-base font-semibold"
                      style={{ color: selectedOutlet.accent }}
                    >
                      {selectedOutlet.specialty}
                    </p>
                  </ScrollReveal>
                  <ScrollReveal variant="rise" delay={0.12}>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {selectedOutlet.signature}
                    </p>
                  </ScrollReveal>
                  <ScrollReveal variant="rise" delay={0.16}>
                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-[var(--text-muted)] pt-3 border-t border-[var(--border-hairline)]">
                      <Clock className="w-3.5 h-3.5 text-[var(--accent-turquoise)]" />
                      <span>{MALL_INFO.hours.dining} · Third Floor</span>
                    </div>
                  </ScrollReveal>
                </div>
              </motion.div>
            </AnimatePresence>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>

      {/* DEDICATED BRAND SECTION: BURGER KING (over Flame-Grilled Burger & Fries Motion Video) */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.diningBurger}
        scrim="soft"
        edgeBlend="none"
        minHeight="min-h-[86vh]"
        className="flex items-center"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(64, 24, 14, 0.88) 0%, rgba(140, 28, 12, 0.78) 52%, rgba(214, 107, 20, 0.68) 100%)'
          }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 pt-20 pb-24 md:pt-28 md:pb-32 space-y-12 text-[#F5EBDC]">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              <div className="lg:col-span-5 space-y-7 pb-4 md:pb-6">
                <div className="space-y-4">
                  <BurgerKingLockup />
                  <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#FFAA00]">
                    <Flame className="w-3.5 h-3.5 shrink-0" />
                    <span>Third Floor</span>
                    <span aria-hidden="true">·</span>
                    <span>Flame-Grilled Kitchen</span>
                  </div>
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#FFFDF9] leading-[1.05] max-w-xl">
                  Flame-Grilled to Order, Boldly Layered
                </h2>

                <p className="text-sm md:text-base text-[#F5EBDC]/90 leading-relaxed max-w-lg">
                  Seared over open flames on toasted sesame buns, paired with golden crispy fries,
                  crunchy onion rings, and creamy thick shakes in an amber-lit dining lounge.
                </p>

                <div className="space-y-2.5 pt-2" role="tablist" aria-label="Burger King gallery views">
                  {BURGER_KING_SHOWCASE.map((view, idx) => {
                    const isActive = activeBkView.id === view.id;
                    return (
                      <ScrollReveal key={view.id} variant="slideRight" delay={idx * 0.05}>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActiveBkView(view)}
                          className={`w-full text-left px-5 py-3.5 rounded-2xl transition-all cursor-pointer border ${
                            isActive
                              ? 'bg-[#D62300] border-[#FFAA00]/75 text-white shadow-xl translate-x-1'
                              : 'bg-[#502314]/65 border-[#F5EBDC]/15 text-[#F5EBDC]/85 hover:bg-[#502314]/90 hover:border-[#FF8732]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-display text-lg font-semibold">
                              {view.title}
                            </span>
                            <span
                              className={`font-mono-tabular text-[11px] uppercase tracking-wider shrink-0 ${
                                isActive ? 'text-[#FFAA00]' : 'text-[#F5EBDC]/60'
                              }`}
                            >
                              {isActive ? 'Viewing' : 'Explore'}
                            </span>
                          </div>
                          <p className="text-xs text-[#F5EBDC]/85 mt-1 leading-relaxed">
                            {view.caption}
                          </p>
                        </button>
                      </ScrollReveal>
                    );
                  })}
                </div>

                <ScrollReveal variant="rise" delay={0.18}>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular text-[#F5EBDC]/85 pt-4 pb-3 border-t border-[#F5EBDC]/20">
                    <Clock className="w-3.5 h-3.5 text-[#FFAA00]" />
                    <span>{MALL_INFO.hours.dining}</span>
                    <span aria-hidden="true">·</span>
                    <span>Whopper Grill Counter &amp; Lounge Seating</span>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-7 relative pb-16 sm:pb-24 lg:pb-28">
                <Interactive3DTilt intensity={6}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeBkView.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-3xl overflow-hidden shadow-2xl border border-[#FFAA00]/35 aspect-[4/3] bg-[#36160B]"
                    >
                      <img
                        src={activeBkView.image}
                        alt={activeBkView.alt}
                        referrerPolicy="no-referrer"
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </Interactive3DTilt>

                <ScrollReveal variant="slideLeft" delay={0.12} className="hidden sm:block absolute bottom-0 right-4 md:right-8 w-56 md:w-72">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#FFAA00]/80 bg-[#36160B]">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={
                          activeBkView.id === 'interior'
                            ? DINING_BRAND_GALLERY.burgerKing.feast
                            : DINING_BRAND_GALLERY.burgerKing.interior
                        }
                        alt={
                          activeBkView.id === 'interior'
                            ? 'Flame-grilled Whopper burger and fries feast'
                            : 'Burger King contemporary timber restaurant seating'
                        }
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>

      {/* DEDICATED BRAND SECTION: DOMINO'S PIZZA (over Oven-Fresh Pizza Motion Video) */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.diningPizza}
        scrim="soft"
        edgeBlend="none"
        minHeight="min-h-[88vh]"
        className="flex items-center"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(140deg, rgba(0, 56, 92, 0.88) 0%, rgba(0, 100, 145, 0.8) 55%, rgba(227, 24, 55, 0.6) 100%)'
          }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12 pt-20 pb-24 md:pt-28 md:pb-32 space-y-12">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <div className="lg:col-span-5 bg-[#fffcf8] text-slate-900 rounded-3xl p-8 md:p-10 pb-10 md:pb-12 shadow-2xl border border-white/80 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <ScrollReveal variant="pop">
                    <DominosLockup />
                  </ScrollReveal>

                  <ScrollReveal variant="rise" delay={0.04}>
                    <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#E31837]">
                      <Pizza className="w-3.5 h-3.5 shrink-0" />
                      <span>Third Floor</span>
                      <span aria-hidden="true">·</span>
                      <span>Open-Oven Kitchen</span>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal variant="slideRight" delay={0.08}>
                    <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#004A70] leading-[1.04]">
                      Fresh Dough. 450° Oven Heat.
                    </h2>
                  </ScrollReveal>

                  <ScrollReveal variant="rise" delay={0.12}>
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                      Hand-stretched crust topped with golden bubbling mozzarella, vibrant garden
                      peppers, stuffed garlic breadsticks, and warm choco lava cakes pulled hot from
                      the oven.
                    </p>
                  </ScrollReveal>
                </div>

                <ScrollReveal variant="rise" delay={0.16}>
                  <div className="space-y-3 pt-4 pb-2 border-t border-slate-200">
                    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Domino's Pizza specialties">
                      {DOMINOS_HIGHLIGHTS.map((item) => {
                        const isActive = activeDominoHighlight.id === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveDominoHighlight(item)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                              isActive
                                ? 'bg-[#006491] text-white shadow-sm'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {item.tabLabel}
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeDominoHighlight.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1 pt-1"
                      >
                        <h3 className="font-display text-lg font-semibold text-[#006491]">
                          {activeDominoHighlight.title}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                          {activeDominoHighlight.detail}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-slate-600 pt-2 pb-1">
                      <Clock className="w-3.5 h-3.5 text-[#E31837]" />
                      <span>{MALL_INFO.hours.dining}</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-7 flex">
                <ScrollReveal variant="scaleDepth" className="w-full lg:h-full">
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[320px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 bg-[#003B5C]">
                    <img
                      src={DINING_BRAND_GALLERY.dominos.interior}
                      alt="Domino's Pizza modern cobalt blue and crisp white mall restaurant interior"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-[#002B42]/88 via-[#002B42]/40 to-transparent text-white">
                      <p className="font-mono-tabular text-[11px] uppercase tracking-[0.2em] text-sky-200">
                        Open Kitchen Theatre · Third Floor
                      </p>
                      <p className="font-display text-2xl md:text-3xl font-semibold mt-1">
                        Blue-Tiled Oven Bar &amp; Express Pickup Counter
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 pb-4 md:pb-6">
              <div className="lg:col-span-7 space-y-3">
                <ScrollReveal variant="scaleDepth">
                  <ParallaxDepth offset={14}>
                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/25 aspect-[16/10] bg-[#003B5C]">
                      <img
                        src={DINING_BRAND_GALLERY.dominos.spread}
                        alt="Fresh hand-tossed cheese pull pizza with stuffed garlic breadsticks and marinara dip"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </ParallaxDepth>
                </ScrollReveal>
                <ScrollReveal variant="rise" delay={0.06}>
                  <div className="px-1 pt-1 pb-3 text-white space-y-1.5">
                    <p className="font-mono-tabular text-[11px] uppercase tracking-[0.18em] text-rose-200">
                      Cheese Pull Perfection · Hand-Tossed &amp; Pan Crusts
                    </p>
                    <p className="text-sm text-white/90 leading-relaxed">
                      Golden crust dusted in toasted cornmeal, bubbling mozzarella, sweet golden corn,
                      paprika &amp; fresh basil served beside oven-warm breadsticks.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-5 space-y-3 lg:mt-8">
                <ScrollReveal variant="scaleDepth" delay={0.08}>
                  <ParallaxDepth offset={20}>
                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/25 aspect-[4/3] bg-[#003B5C]">
                      <img
                        src={DINING_BRAND_GALLERY.dominos.sides}
                        alt="Domino's Pizza baked slices, cheesy sides and sauces"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </ParallaxDepth>
                </ScrollReveal>
                <ScrollReveal variant="rise" delay={0.14}>
                  <div className="px-1 pt-1 pb-3 text-white space-y-1.5">
                    <p className="font-mono-tabular text-[11px] uppercase tracking-[0.18em] text-sky-200">
                      Sides, Pasta &amp; Desserts · Express Dining
                    </p>
                    <p className="text-sm text-white/90 leading-relaxed">
                      Zesty tacos, stuffed cheesy twists &amp; chocolate lava indulgences crafted to
                      share before or after your movie on Fourth Floor.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>
    </div>
  );
}
