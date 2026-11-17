import { useState } from 'react';
import { UtensilsCrossed, Clock, Flame, Pizza } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoBackdropSection } from '../components/VideoBackdropSection';
import { BrandMark } from '../components/BrandMark';
import { FullPageContainer } from '../components/FullPageContainer';
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
    <div className="inline-flex items-center gap-3.5 select-none" aria-label="Burger King official brand lockup">
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden flex items-center justify-center shrink-0 drop-shadow-md">
        <img
          src="/images/logos/burger_king.svg"
          alt="Burger King official logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#FFAA00]">
          BURGER KING
        </span>
        <span className="font-mono-tabular text-[10px] uppercase tracking-[0.18em] text-[#F5EBDC]/90 mt-0.5">
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

  const sectionLabels = [
    '01 · Third Floor Deck',
    '02 · Culinary Showcase',
    '03 · Burger King',
    '04 · Domino\'s Pizza'
  ];

  return (
    <FullPageContainer pageId="dining" sectionLabels={sectionLabels}>
      {/* UNIQUE DINING HERO: Top-Anchored Sunlit Culinary Horizon */}
      <VideoBackdropSection
        video={VIDEO_ASSETS.diningDeckHero}
        scrim="heroPrism"
        isHero
        minHeight="min-h-[calc(100svh-4rem)]"
        className="flex flex-col justify-center py-12 md:py-20"
      >
        <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-4xl space-y-6 text-white"
          >
            <ScrollReveal variant="drop" className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-200">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Third Floor Pavilion</span>
            </ScrollReveal>
            <ScrollReveal variant="slideRight" delay={0.06}>
              <h1
                className="font-display font-semibold leading-[0.92] text-white drop-shadow-lg"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)' }}
              >
                Third Floor Flavours
              </h1>
            </ScrollReveal>
            <p className="text-base md:text-lg text-white/90 max-w-2xl leading-relaxed pt-2">
              Flame-grilled burgers, crispy golden buckets &amp; oven-baked pizzas served across Orion Mall&apos;s sunlit culinary deck.
            </p>
          </motion.div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12 pt-10 md:pt-16">
          <div className="inline-flex flex-wrap gap-3 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] rounded-2xl p-2 shadow-2xl">
            {DINING_DESTINATIONS.map((item, idx) => (
              <ScrollReveal key={item.name} variant="pop" delay={idx * 0.05}>
                <button
                  type="button"
                  onClick={() => setSelectedOutlet(item)}
                  className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
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
        minHeight="min-h-[calc(100svh-4rem)]"
        className="py-10 md:py-20 flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full px-5 md:px-12">
          <DepthEmergeSection>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOutlet.name}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
              >
                <div className="lg:col-span-7 relative order-2 lg:order-1">
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

                <div className="lg:col-span-5 order-1 lg:order-2 backdrop-blur-xl bg-[var(--bg-surface-elevated)] border-2 border-[var(--glass-border)] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-4 sm:space-y-5">
                  <ScrollReveal variant="pop">
                    <BrandMark name={selectedOutlet.name} size="lg" />
                  </ScrollReveal>
                  <ScrollReveal variant="slideLeft" delay={0.04}>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--text-primary)]">
                      {selectedOutlet.name}
                    </h2>
                  </ScrollReveal>
                  <ScrollReveal variant="rise" delay={0.08}>
                    <p
                      className="text-sm sm:text-base font-semibold"
                      style={{ color: selectedOutlet.accent }}
                    >
                      {selectedOutlet.specialty}
                    </p>
                  </ScrollReveal>
                  <ScrollReveal variant="rise" delay={0.12}>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
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
        minHeight="min-h-[calc(100svh-4rem)]"
        className="flex items-center"
      >
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 md:px-12 py-6 md:py-8 my-auto space-y-5 text-[#F5EBDC]">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-2.5">
                  <BurgerKingLockup />
                  <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#FFAA00]">
                    <Flame className="w-3.5 h-3.5 shrink-0" />
                    <span>Third Floor</span>
                    <span aria-hidden="true">·</span>
                    <span>Flame-Grilled Kitchen</span>
                  </div>
                </div>

                <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#FFFDF9] leading-[1.08] max-w-xl">
                  Flame-Grilled to Order, Boldly Layered
                </h2>

                <p className="text-xs md:text-sm text-[#F5EBDC]/90 leading-relaxed max-w-lg">
                  Seared over open flames on toasted sesame buns, paired with golden crispy fries and thick shakes in an amber-lit lounge.
                </p>

                <div className="space-y-2 pt-1" role="tablist" aria-label="Burger King gallery views">
                  {BURGER_KING_SHOWCASE.map((view, idx) => {
                    const isActive = activeBkView.id === view.id;
                    return (
                      <ScrollReveal key={view.id} variant="slideRight" delay={idx * 0.04}>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActiveBkView(view)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl transition-all cursor-pointer border ${
                            isActive
                              ? 'bg-[#D62300] border-[#FFAA00]/75 text-white shadow-lg translate-x-1'
                              : 'bg-[#502314]/65 border-[#F5EBDC]/15 text-[#F5EBDC]/85 hover:bg-[#502314]/90'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-display text-base font-semibold">
                              {view.title}
                            </span>
                            <span
                              className={`font-mono-tabular text-[10px] uppercase tracking-wider shrink-0 ${
                                isActive ? 'text-[#FFAA00]' : 'text-[#F5EBDC]/60'
                              }`}
                            >
                              {isActive ? 'Viewing' : 'Explore'}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#F5EBDC]/80 mt-0.5 line-clamp-1">
                            {view.caption}
                          </p>
                        </button>
                      </ScrollReveal>
                    );
                  })}
                </div>

                <ScrollReveal variant="rise" delay={0.14}>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tabular text-[#F5EBDC]/85 pt-2 border-t border-[#F5EBDC]/20">
                    <Clock className="w-3.5 h-3.5 text-[#FFAA00]" />
                    <span>{MALL_INFO.hours.dining}</span>
                    <span aria-hidden="true">·</span>
                    <span>Third Floor Counter</span>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-7 relative flex items-center justify-center">
                <Interactive3DTilt intensity={5} className="w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeBkView.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-3xl overflow-hidden shadow-2xl border border-[#FFAA00]/35 aspect-[16/10] max-h-[360px] bg-[#36160B]"
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

                <ScrollReveal variant="slideLeft" delay={0.12} className="hidden sm:block absolute -bottom-4 right-4 w-48 md:w-56">
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
        scrim="none"
        edgeBlend="none"
        minHeight="min-h-[calc(100svh-4rem)]"
        className="flex items-center"
      >
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 md:px-10 py-6 md:py-8 my-auto">
          <DepthEmergeSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Slightly Taller Rectangular Domino's Information Box */}
              <div className="lg:col-span-5 bg-white/95 text-slate-900 rounded-3xl px-7 sm:px-8 py-9 sm:py-11 lg:min-h-[500px] shadow-2xl border border-white/80 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <ScrollReveal variant="pop">
                    <DominosLockup />
                  </ScrollReveal>

                  <ScrollReveal variant="rise" delay={0.03}>
                    <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#E31837]">
                      <Pizza className="w-3.5 h-3.5 shrink-0" />
                      <span>Third Floor</span>
                      <span aria-hidden="true">·</span>
                      <span>Stone-Baked Freshness</span>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal variant="slideRight" delay={0.06}>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#004A70] leading-[1.06]">
                      Fresh Dough. 450° Oven Heat.
                    </h2>
                  </ScrollReveal>

                  <ScrollReveal variant="rise" delay={0.09}>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Hand-stretched dough with bubbling mozzarella, stuffed garlic breadsticks, and warm choco lava cakes baked fresh to order.
                    </p>
                  </ScrollReveal>
                </div>

                <ScrollReveal variant="rise" delay={0.12}>
                  <div className="space-y-3.5 pt-4 border-t border-slate-200">
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
                            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
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
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1.5 pt-1"
                      >
                        <h3 className="font-display text-lg font-semibold text-[#006491]">
                          {activeDominoHighlight.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {activeDominoHighlight.detail}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-slate-600 pt-3 border-t border-slate-100">
                      <Clock className="w-3.5 h-3.5 text-[#E31837]" />
                      <span>{MALL_INFO.hours.dining}</span>
                      <span aria-hidden="true">·</span>
                      <span>Express Counter</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Prominent First Pizza Image + Lower Closer Overlapping Second Pizza Image */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center sm:justify-end pl-0 sm:pl-4 lg:pl-8 pb-4 sm:pb-12">
                {/* First (Larger) Pizza Image: Prominent & slightly lifted */}
                <div className="w-full sm:w-[68%] lg:w-[70%] relative z-10 sm:-translate-y-4">
                  <ScrollReveal variant="scaleDepth" delay={0.06}>
                    <Interactive3DTilt intensity={5}>
                      <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/85 aspect-[4/3] max-h-[430px] bg-slate-900">
                        <img
                          src={DINING_BRAND_GALLERY.dominos.spread}
                          alt="Fresh hand-tossed cheese pull pizza with stuffed garlic breadsticks"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Interactive3DTilt>
                  </ScrollReveal>
                </div>

                {/* Second (Smaller) Pizza Image: Lowered further down & tucked closer to touch/overlap the first */}
                <div className="w-[78%] sm:w-[40%] lg:w-[38%] relative z-20 self-end sm:self-center -mt-6 sm:mt-0 sm:-ml-10 lg:-ml-12 translate-y-2 sm:translate-y-16 lg:translate-y-20">
                  <ScrollReveal variant="scaleDepth" delay={0.12}>
                    <Interactive3DTilt intensity={4}>
                      <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/90 aspect-[4/3] max-h-[235px] bg-slate-900">
                        <img
                          src={DINING_BRAND_GALLERY.dominos.sides}
                          alt="Domino's Pizza oven-baked savory sides, slices and sauces"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Interactive3DTilt>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </DepthEmergeSection>
        </div>
      </VideoBackdropSection>
    </FullPageContainer>
  );
}
