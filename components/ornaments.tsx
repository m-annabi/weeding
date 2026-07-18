/**
 * Ornements et icônes « faits main » — traits fins, héritent de currentColor.
 * Identité : mariage intime au Maroc, bord de mer, chaleureux et minimal.
 */

type SvgProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* ─── Ornements ─── */

/** Soleil rayonnant, signature de l'identité (inspiré des étoiles berbères). */
export function Sunburst({ className = "h-8 w-8" }: SvgProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...stroke}>
      <circle cx="24" cy="24" r="4.5" />
      <path d="M24 4v9M24 35v9M4 24h9M35 24h9" />
      <path d="M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6" strokeWidth="1.1" />
      <path d="M24 15.5l2.6 5.9 5.9 2.6-5.9 2.6-2.6 5.9-2.6-5.9-5.9-2.6 5.9-2.6z" strokeWidth="1" />
    </svg>
  );
}

/** Trois vagues fines. */
export function Waves({ className = "h-6 w-16" }: SvgProps) {
  return (
    <svg viewBox="0 0 64 24" className={className} aria-hidden {...stroke}>
      <path d="M2 6c5-4 9 4 14 0s9 4 14 0 9 4 14 0 9 4 14 0" strokeWidth="1.1" />
      <path d="M2 13c5-4 9 4 14 0s9 4 14 0 9 4 14 0 9 4 14 0" strokeWidth="1.1" />
      <path d="M12 20c5-4 9 4 14 0s9 4 14 0 9 4 12 0" strokeWidth="1.1" />
    </svg>
  );
}

/** Branche d'olivier fine. */
export function OliveBranch({ className = "h-8 w-20" }: SvgProps) {
  return (
    <svg viewBox="0 0 80 32" className={className} aria-hidden {...stroke}>
      <path d="M4 26C24 20 56 14 76 6" strokeWidth="1.1" />
      <path d="M18 22c-1-5 2-9 6-10 1 5-2 9-6 10zM34 18c-1-5 2-9 6-10 1 5-2 9-6 10zM50 14c-1-5 2-9 6-10 1 5-2 9-6 10z" strokeWidth="1" />
      <path d="M26 21c4 2 8 1 10-2-4-2-8-1-10 2zM42 17c4 2 8 1 10-2-4-2-8-1-10 2zM58 12c4 2 8 1 10-2-4-2-8-1-10 2z" strokeWidth="1" />
    </svg>
  );
}

/** Palme en filigrane, à poser ton sur ton dans un coin de section. */
export function PalmLeaf({ className = "h-48 w-48" }: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden {...stroke}>
      <path d="M14 88C30 70 44 48 52 22" strokeWidth="1" />
      <path d="M52 22C44 34 32 40 18 40M52 22c-4 14-12 24-26 30M52 22c0 16-4 30-14 42M52 22c6 12 6 26 0 40M52 22c12 8 18 20 18 34M52 22c14 2 24 10 30 22M52 22c12-4 24-2 34 6" strokeWidth="0.9" />
    </svg>
  );
}

/** Arche marocaine ornée d'un pointillé intérieur. */
export function ArchOutline({ className = "h-24 w-16" }: SvgProps) {
  return (
    <svg viewBox="0 0 64 96" className={className} aria-hidden {...stroke}>
      <path d="M6 92V38c0-18 11-30 26-30s26 12 26 30v54" strokeWidth="1.2" />
      <path d="M13 92V40c0-14 8.5-23 19-23s19 9 19 23v52" strokeWidth="0.9" strokeDasharray="1.5 3.5" />
    </svg>
  );
}

/** Souligné dessiné à la main (sous les liens et boutons texte). */
export function Squiggle({ className = "h-2 w-24" }: SvgProps) {
  return (
    <svg viewBox="0 0 96 8" className={className} aria-hidden {...stroke} preserveAspectRatio="none">
      <path d="M2 5C20 1 40 7 58 4S90 2 94 4" strokeWidth="1.2" />
    </svg>
  );
}

/* ─── Icônes ligne (24×24) ─── */

function Icon({ children, className = "h-6 w-6" }: SvgProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
      {children}
    </svg>
  );
}

export const icons = {
  calendar: (c?: string) => (
    <Icon className={c}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 2.8V6M16 2.8V6" />
      <path d="M8.5 14.5l2.3 2.3 4.7-4.7" strokeWidth="1.1" />
    </Icon>
  ),
  clock: (c?: string) => (
    <Icon className={c}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2.5" />
    </Icon>
  ),
  mapPin: (c?: string) => (
    <Icon className={c}>
      <path d="M12 21.5c4.5-4.6 7-8.2 7-11.5a7 7 0 10-14 0c0 3.3 2.5 6.9 7 11.5z" />
      <circle cx="12" cy="9.8" r="2.6" />
    </Icon>
  ),
  plane: (c?: string) => (
    <Icon className={c}>
      <path d="M21 15.5l-8.5-5V4.8a1.6 1.6 0 00-3.2 0v5.7L2.9 15.5v2l6.4-2v3.6L7 20.7v1.5l4.9-1.3 4.9 1.3v-1.5l-2.3-1.6V15.5l6.5 2z" />
    </Icon>
  ),
  car: (c?: string) => (
    <Icon className={c}>
      <path d="M4 16.5l1.4-5.4A2.5 2.5 0 017.8 9h8.4a2.5 2.5 0 012.4 2.1L20 16.5M4 16.5h16M4 16.5v3.2M20 16.5v3.2" />
      <circle cx="7.8" cy="16.4" r="0.4" />
      <circle cx="16.2" cy="16.4" r="0.4" />
    </Icon>
  ),
  bed: (c?: string) => (
    <Icon className={c}>
      <path d="M3 18.5V7M3 15h18v3.5M3 12h18v-1.5a2 2 0 00-2-2H10V12" />
      <circle cx="6.5" cy="10" r="1.4" />
    </Icon>
  ),
  phone: (c?: string) => (
    <Icon className={c}>
      <path d="M6.8 3.5H9l1.4 4-2 1.5a12.5 12.5 0 004.6 4.6l1.5-2 4 1.4v2.2a2 2 0 01-2.2 2A15.5 15.5 0 014.8 5.7a2 2 0 012-2.2z" />
    </Icon>
  ),
  rings: (c?: string) => (
    <Icon className={c}>
      <circle cx="9.2" cy="13.5" r="5.8" />
      <circle cx="14.8" cy="13.5" r="5.8" />
      <path d="M12 4.2l-1.6-1.9h3.2z" strokeWidth="1.1" />
    </Icon>
  ),
  cocktail: (c?: string) => (
    <Icon className={c}>
      <path d="M12 21v-8.5M8 21h8M5 3.5h14L12 12.5z" />
      <path d="M7.2 6.5h9.6" strokeWidth="1" />
    </Icon>
  ),
  dinner: (c?: string) => (
    <Icon className={c}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" strokeWidth="1" />
    </Icon>
  ),
  music: (c?: string) => (
    <Icon className={c}>
      <path d="M9 18.5V6l11-2.5V16" />
      <circle cx="6.5" cy="18.5" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </Icon>
  ),
  sun: (c?: string) => (
    <Icon className={c}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7" />
    </Icon>
  ),
  check: (c?: string) => (
    <Icon className={c}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 12.2l2.8 2.8 5.2-5.6" />
    </Icon>
  ),
  cross: (c?: string) => (
    <Icon className={c}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </Icon>
  ),
  home: (c?: string) => (
    <Icon className={c}>
      <path d="M4.5 10.5L12 4l7.5 6.5M6.5 9v11h11V9" />
      <path d="M10 20v-5.5h4V20" />
    </Icon>
  ),
  heart: (c?: string) => (
    <Icon className={c}>
      <path d="M12 20s-7.5-4.8-7.5-10a4.3 4.3 0 017.5-2.9A4.3 4.3 0 0119.5 10c0 5.2-7.5 10-7.5 10z" />
    </Icon>
  ),
} as const;

export type IconName = keyof typeof icons;
