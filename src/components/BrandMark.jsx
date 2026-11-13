const BRAND_STYLES = {
  'MAX Fashion': { bg: '#0E4DA4', fg: '#FFFFFF', accent: '#E31E24', style: 'sans-bold', mark: 'MAX' },
  UCB: { bg: '#008A4B', fg: '#FFFFFF', accent: '#D9F99D', style: 'box', mark: 'UCB' },
  "Levi's": { bg: '#B91C1C', fg: '#FFFFFF', accent: '#FEE2E2', style: 'batwing', mark: "LEVI'S" },
  'Van Heusen': { bg: '#1E1B2E', fg: '#F5EFE6', accent: '#D4AF37', style: 'serif', mark: 'VH' },
  'Louis Philippe': { bg: '#2B1B17', fg: '#F7E7CE', accent: '#C89D54', style: 'crest', mark: 'LP' },
  ColorPlus: { bg: '#D95338', fg: '#FFFDF9', accent: '#FDE68A', style: 'sans-wide', mark: 'CP' },
  'Being Human': { bg: '#1F2937', fg: '#F9FAFB', accent: '#F43F5E', style: 'heart', mark: 'BH' },
  Crocs: { bg: '#15803D', fg: '#FFFFFF', accent: '#BBF7D0', style: 'round', mark: 'crocs' },
  'Samsung Experience Store': { bg: '#1428A0', fg: '#FFFFFF', accent: '#93C5FD', style: 'ellipse', mark: 'SAMSUNG' },
  'Allen Solly': { bg: '#143642', fg: '#FDF8F0', accent: '#F59E0B', style: 'stag', mark: 'AS' },
  'Peter England': { bg: '#1E3A5F', fg: '#F8FAFC', accent: '#E2E8F0', style: 'serif', mark: 'PE' },
  'Pepe Jeans London': { bg: '#0F172A', fg: '#F8FAFC', accent: '#38BDF8', style: 'sans-bold', mark: 'Pepe' },
  Spykar: { bg: '#991B1B', fg: '#FFFFFF', accent: '#FCA5A5', style: 'sans-wide', mark: 'SPYKAR' },
  Mufti: { bg: '#312E81', fg: '#F5F3FF', accent: '#C4B5FD', style: 'sans-bold', mark: 'MUFTI' },
  Skechers: { bg: '#0369A1', fg: '#FFFFFF', accent: '#BAE6FD', style: 'italic', mark: 'S' },
  Reebok: { bg: '#18181B', fg: '#FFFFFF', accent: '#EF4444', style: 'delta', mark: 'RBK' },
  Soch: { bg: '#881337', fg: '#FFF1F2', accent: '#FBCFE8', style: 'serif', mark: 'Soch' },
  W: { bg: '#9D174D', fg: '#FDF2F8', accent: '#F9A8D4', style: 'monogram', mark: 'W' },
  Aurelia: { bg: '#B45309', fg: '#FFFBEB', accent: '#FDE68A', style: 'serif', mark: 'Aurelia' },
  'Van Heusen Woman': { bg: '#5B21B6', fg: '#FAF5FF', accent: '#DDD6FE', style: 'serif', mark: 'VH W' },
  'U.S. Polo Assn. Kids': { bg: '#1D4ED8', fg: '#FFFFFF', accent: '#F87171', style: 'crest', mark: 'USPA' },
  Lavie: { bg: '#BE185D', fg: '#FFF1F2', accent: '#FBCFE8', style: 'italic', mark: 'Lavie' },
  KFC: { bg: '#B91C1C', fg: '#FFFFFF', accent: '#FEF2F2', style: 'stripes', mark: 'KFC' },
  'Burger King': { bg: '#C2410C', fg: '#FFF7ED', accent: '#FDBA74', style: 'bun', mark: 'BK' },
  "Domino's Pizza": { bg: '#006491', fg: '#FFFFFF', accent: '#E31837', style: 'domino', mark: "Domino's" },
  'PVR INOX Cinemas': { bg: '#1E1B4B', fg: '#F8FAFC', accent: '#FBBF24', style: 'cinema', mark: 'PVR INOX' }
};

export function BrandMark({ name, size = 'md' }) {
  const cfg = BRAND_STYLES[name] || {
    bg: '#3B2C59',
    fg: '#FAF5EE',
    accent: '#D64E34',
    style: 'sans-bold',
    mark: name.slice(0, 3).toUpperCase()
  };

  const dims =
    size === 'lg'
      ? 'h-16 min-w-[4.25rem] px-4 text-base'
      : size === 'sm'
      ? 'h-10 min-w-[2.75rem] px-2.5 text-xs'
      : 'h-12 min-w-[3.25rem] px-3 text-sm';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl font-bold tracking-wider select-none shadow-sm overflow-hidden shrink-0 ${dims}`}
      style={{ backgroundColor: cfg.bg, color: cfg.fg }}
      aria-label={`${name} emblem`}
    >
      {cfg.style === 'domino' && (
        <span
          className="w-2.5 h-2.5 rotate-45 mr-1.5 inline-block shrink-0"
          style={{ backgroundColor: cfg.accent }}
        />
      )}
      {cfg.style === 'stripes' && (
        <span
          className="absolute inset-y-0 left-0 w-1.5"
          style={{ backgroundColor: cfg.accent }}
        />
      )}
      {cfg.style === 'crest' && (
        <span
          className="absolute inset-1 rounded-lg border opacity-45 pointer-events-none"
          style={{ borderColor: cfg.accent }}
        />
      )}
      <span
        className={
          cfg.style === 'serif' || cfg.style === 'crest'
            ? 'font-display italic tracking-wide'
            : 'tracking-wider'
        }
      >
        {cfg.mark}
      </span>
    </div>
  );
}
