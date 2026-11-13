const BRAND_LOGOS = {
  'MAX Fashion': {
    src: '/images/logos/max_fashion.svg',
    alt: 'MAX Fashion official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1.5'
  },
  UCB: {
    src: '/images/logos/ucb.svg',
    alt: 'United Colors of Benetton official logo',
    backdrop: 'none',
    padding: 'p-0'
  },
  "Levi's": {
    src: '/images/logos/levis.svg',
    alt: "Levi's official logo",
    backdrop: 'light',
    padding: 'px-2 py-1'
  },
  'Van Heusen': {
    src: '/images/logos/van_heusen.png',
    alt: 'Van Heusen official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1.5'
  },
  'Louis Philippe': {
    src: '/images/logos/louis_philippe.png',
    alt: 'Louis Philippe official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1.5'
  },
  ColorPlus: {
    src: '/images/logos/colorplus.png',
    alt: 'ColorPlus official logo',
    backdrop: 'light',
    padding: 'px-2 py-1'
  },
  'Being Human': {
    src: '/images/logos/being_human.png',
    alt: 'Being Human Clothing official logo',
    backdrop: 'light',
    padding: 'px-2 py-1'
  },
  Crocs: {
    src: '/images/logos/crocs.svg',
    alt: 'Crocs official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1.5'
  },
  'Samsung Experience Store': {
    src: '/images/logos/samsung.svg',
    alt: 'Samsung official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1.5'
  },
  'Allen Solly': {
    src: '/images/logos/allen_solly.png',
    alt: 'Allen Solly official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1.5'
  },
  'Peter England': {
    src: '/images/logos/peter_england.svg',
    alt: 'Peter England official logo',
    backdrop: 'none',
    padding: 'p-0'
  },
  'Pepe Jeans London': {
    src: '/images/logos/pepe_jeans.svg',
    alt: 'Pepe Jeans London official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1'
  },
  Spykar: {
    src: '/images/logos/spykar.png',
    alt: 'Spykar official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1.5'
  },
  Mufti: {
    src: '/images/logos/mufti.png',
    alt: 'Mufti official logo',
    backdrop: 'none',
    padding: 'p-0'
  },
  Skechers: {
    src: '/images/logos/skechers.svg',
    alt: 'Skechers official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1.5'
  },
  Reebok: {
    src: '/images/logos/reebok.svg',
    alt: 'Reebok official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1'
  },
  Soch: {
    src: '/images/logos/soch.svg',
    alt: 'Soch official logo',
    backdrop: 'none',
    padding: 'p-0'
  },
  W: {
    src: '/images/logos/w_woman.png',
    alt: 'W for Woman official logo',
    backdrop: 'none',
    padding: 'p-0'
  },
  Aurelia: {
    src: '/images/logos/aurelia.png',
    alt: 'Aurelia official logo',
    backdrop: 'none',
    padding: 'p-0'
  },
  'Van Heusen Woman': {
    src: '/images/logos/van_heusen.png',
    alt: 'Van Heusen Woman official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1.5'
  },
  'U.S. Polo Assn. Kids': {
    src: '/images/logos/uspa.png',
    alt: 'U.S. Polo Assn. official logo',
    backdrop: 'light',
    padding: 'px-2 py-1'
  },
  Lavie: {
    src: '/images/logos/lavie.png',
    alt: 'Lavie official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1.5'
  },
  KFC: {
    src: '/images/logos/kfc.svg',
    alt: 'KFC official logo',
    backdrop: 'light',
    padding: 'px-2.5 py-1'
  },
  'Burger King': {
    src: '/images/logos/burger_king.svg',
    alt: 'Burger King official logo',
    backdrop: 'none',
    padding: 'p-0'
  },
  "Domino's Pizza": {
    src: '/images/logos/dominos.svg',
    alt: "Domino's Pizza official logo",
    backdrop: 'light',
    padding: 'p-1.5'
  },
  'PVR INOX Cinemas': {
    src: '/images/logos/pvr_inox.png',
    alt: 'PVR INOX Cinemas official logo',
    backdrop: 'light',
    padding: 'px-3 py-1.5'
  }
};

export function BrandMark({ name, size = 'md', className = '' }) {
  const logo = BRAND_LOGOS[name];

  const sizeClasses =
    size === 'lg'
      ? 'h-14 min-w-[5.25rem] max-w-[10.5rem]'
      : size === 'sm'
      ? 'h-9 min-w-[3.25rem] max-w-[6.25rem]'
      : 'h-11 min-w-[4rem] max-w-[8rem]';

  const imgHeightClasses =
    size === 'lg'
      ? 'max-h-10'
      : size === 'sm'
      ? 'max-h-6'
      : 'max-h-8';

  if (!logo) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl bg-white/95 border border-black/10 px-3 text-xs font-semibold text-stone-900 shadow-sm shrink-0 ${sizeClasses} ${className}`}
      >
        <span className="truncate">{name}</span>
      </div>
    );
  }

  const containerStyle =
    logo.backdrop === 'light'
      ? 'bg-white/95 border border-black/10 shadow-sm'
      : 'bg-transparent border border-white/15 shadow-sm';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden shrink-0 select-none ${sizeClasses} ${logo.padding} ${containerStyle} ${className}`}
      aria-label={logo.alt}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        decoding="async"
        className={`w-auto h-full ${imgHeightClasses} max-w-full object-contain block`}
      />
    </div>
  );
}
