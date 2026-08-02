import { wedding } from "@/content/wedding";

/** Étoile à huit branches (khatam, motif zellige) : deux carrés croisés. */
function KhatamStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="5.8" y="5.8" width="12.4" height="12.4" fill="#efe6cc" />
      <rect
        x="5.8"
        y="5.8"
        width="12.4"
        height="12.4"
        fill="#efe6cc"
        transform="rotate(45 12 12)"
      />
      <circle cx="12" cy="12" r="2.4" fill="#b0552e" />
    </svg>
  );
}

/** Losange kilim (œil terracotta cerclé d'or sur fond crème). */
function KilimDiamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <path d="M10 1l9 9-9 9-9-9z" fill="#efe6cc" />
      <path d="M10 4l6 6-6 6-6-6z" fill="#d9b878" />
      <path d="M10 6.5l3.5 3.5-3.5 3.5-3.5-3.5z" fill="#b0552e" />
      <path d="M10 8.6l1.4 1.4-1.4 1.4-1.4-1.4z" fill="#824023" />
    </svg>
  );
}

/**
 * Carte d'invitation façon « Pueblo » (faire-part kilim) : papier vert
 * mousse texturé, double liseré crème, losanges kilim aux angles.
 */
export function InvitationCard({ className = "" }: { className?: string }) {
  const { couple, displayDate, venue } = wedding;
  return (
    <div
      className={`texture-moss relative overflow-hidden rounded-[4px] ${className}`}
    >
      {/* Liseré extérieur + arche marocaine intérieure (porte de riad) */}
      <div
        className="absolute inset-2.5 border border-cream/65"
        aria-hidden
      />
      <div
        className="absolute inset-x-[16px] top-[16px] bottom-[15px] border border-cream/35 [border-radius:50%_50%_0_0/20%_20%_0_0]"
        aria-hidden
      />
      {/* Losanges kilim aux angles et au centre des bords haut/bas */}
      <KilimDiamond className="absolute left-[3px] top-[3px] h-4 w-4" />
      <KilimDiamond className="absolute right-[3px] top-[3px] h-4 w-4" />
      <KilimDiamond className="absolute bottom-[3px] left-[3px] h-4 w-4" />
      <KilimDiamond className="absolute bottom-[3px] right-[3px] h-4 w-4" />
      <KilimDiamond className="absolute left-1/2 top-[5px] h-3 w-3 -translate-x-1/2" />
      <KilimDiamond className="absolute bottom-[5px] left-1/2 h-3 w-3 -translate-x-1/2" />
      <div className="relative mx-8 flex h-full flex-col items-center justify-center gap-2.5 px-0.5 py-8 text-center text-cream">
        <KhatamStar className="h-5 w-5" />
        <p className="font-serif whitespace-nowrap text-[17px] uppercase leading-[1.3] tracking-[0.08em]">
          {couple.partner1} & {couple.partner2}
        </p>
        <p className="script -rotate-1 text-[17px] leading-snug text-cream/95">
          vous
          <br />
          invitent à célébrer
          <br />
          leur mariage
        </p>
        <span
          className="mx-auto block h-2 w-2.5 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)] bg-[#b0552e]"
          aria-hidden
        />
        <div className="font-serif text-[10.5px] leading-relaxed">
          <p>{displayDate}</p>
          <p>à l&apos;hôtel la {venue.name},</p>
          <p>Sidi Kaouki Maroc</p>
        </div>
        <p className="smallcaps !text-[7px] !leading-relaxed !tracking-[0.22em] text-cream/85">
          Séjour du jeudi 27
          <br />
          au dimanche 30 mai 2027
        </p>
      </div>
    </div>
  );
}

/**
 * Scène animée : l'enveloppe doublée terracotta s'ouvre, la carte kilim
 * glisse et vient se poser devant (animation CSS pure, autoplay).
 */
export default function InvitationReveal() {
  return (
    <div className="invite-scene h-[460px] sm:h-[500px]">
      <div className="invite-envelope">
        <div className="invite-flap" aria-hidden>
          <div className="invite-flap-face invite-flap-front" />
          <div className="invite-flap-face invite-flap-back" />
        </div>
        <div className="invite-card">
          <InvitationCard className="h-full w-full" />
        </div>
        <div className="invite-pocket" aria-hidden />
      </div>
    </div>
  );
}
