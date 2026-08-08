import { wedding } from "@/content/wedding";

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

/** Arche : palmiers, croissant de lune et étoiles (silhouettes dorées). */
function ArchScene({ className = "" }: { className?: string }) {
  const gold = "#d9b878";
  return (
    <svg
      viewBox="0 0 100 150"
      className={className}
      fill="none"
      stroke={gold}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Arche (élargie) */}
      <path d="M12 146V58c0-30 15-44 38-44s38 14 38 44v88" />
      <path d="M12 146h76" strokeWidth="1.2" />
      {/* Petit palmier (silhouette, en retrait) */}
      <g fill="#d9b878" stroke="none">
        <path d="M30 103c-6.2-2.5-12.4-2.5-17.4 1.2 5.6 0 11.8 0 17.4.6z" />
        <path d="M30 103c-5.6-5.6-11.2-7.4-16.7-6.8 5.6 2.5 11.8 5 16.1 7.4z" />
        <path d="M30 103c-2.5-6.8-5-11.2-9.3-13.6 3.7 4.3 6.2 8.7 8 13.6z" />
        <path d="M30 103c2.5-7.4 6.2-11.2 11.2-13-4.3 4.3-7.4 8.7-9.9 13z" />
        <path d="M30 103c5.6-5 11.2-6.2 16.7-5-5.6 1.9-11.8 3.7-16.1 5.6z" />
        <path d="M28.9 144c.6-10 .4-22 .6-41l1.1.1c-.2 19 .1 31 .5 40.9z" />
        <circle cx="28.6" cy="104.6" r="1.1" />
        <circle cx="32" cy="105.2" r="1.1" />
      </g>
      {/* Croissant de lune */}
      <path
        d="M68.5 32a9 9 0 1 0 3 14.2A7 7 0 1 1 68.5 32z"
        fill="#d9b878"
        stroke="none"
      />
      {/* Palmier en silhouette (feuilles pleines) */}
      <g fill="#d9b878" stroke="none">
        <path d="M52 88C42 84 32 84 24 90c9 0 19 0 28 1z" />
        <path d="M52 88c-9-9-18-12-27-11 9 4 19 8 26 12z" />
        <path d="M52 88c-4-11-8-18-15-22 6 7 10 14 13 22z" />
        <path d="M52 88c4-12 10-18 18-21-7 7-12 14-16 21z" />
        <path d="M52 88c9-8 18-10 27-8-9 3-19 6-26 9z" />
        <path d="M52 88c10-2 20 0 26 6-9-2-19-3-26-2z" />
        <path d="M50.2 144c1-18 .6-36 1-56l1.8.1c-.4 20 .2 38 .8 55.9z" />
        <circle cx="49.4" cy="90.5" r="1.7" />
        <circle cx="55" cy="91.5" r="1.7" />
      </g>
      {/* Étoiles khatam (4 branches) et losange zellige ocre */}
      <g fill="#d9b878" stroke="none">
        <path d="m22 66 1.6 3.4L27 71l-3.4 1.6L22 76l-1.6-3.4L17 71l3.4-1.6z" />
        <path d="m78 60 1.6 3.4L83 65l-3.4 1.6L78 70l-1.6-3.4L73 65l3.4-1.6z" />
        <path d="m66 104 1.3 2.7 2.7 1.3-2.7 1.3-1.3 2.7-1.3-2.7-2.7-1.3 2.7-1.3z" />
      </g>
      <path
        d="m71 118 3.5 4.5-3.5 4.5-3.5-4.5z"
        fill="#b0552e"
        stroke="#d9b878"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/**
 * Carte d'invitation (validée) : papier vert mousse texturé, liseré et
 * losanges kilim, texte courbé, arche aux palmiers, grosse date à points.
 */
export function InvitationCard({ className = "" }: { className?: string }) {
  const { couple, venue } = wedding;
  return (
    <div
      className={`texture-moss relative overflow-hidden rounded-[4px] ${className}`}
    >
      {/* Double liseré + losanges kilim aux angles (touches ocre) */}
      <div className="absolute inset-2.5 border border-cream/65" aria-hidden />
      <div className="absolute inset-[15px] border border-cream/30" aria-hidden />
      <KilimDiamond className="absolute left-[3px] top-[3px] h-4 w-4" />
      <KilimDiamond className="absolute right-[3px] top-[3px] h-4 w-4" />
      <KilimDiamond className="absolute bottom-[3px] left-[3px] h-4 w-4" />
      <KilimDiamond className="absolute bottom-[3px] right-[3px] h-4 w-4" />
      <div className="relative flex h-full flex-col items-center justify-center gap-1.5 px-6 py-8 text-center text-cream">
        {/* « Célébrez avec nous » sur une courbe */}
        <svg viewBox="0 0 220 62" className="w-[196px]" aria-hidden>
          <path id="arcpath" d="M14 58A124 124 0 0 1 206 58" fill="none" />
          <text
            fill="#f2ead6"
            fontSize="8.8"
            letterSpacing="2.4"
            style={{ fontFamily: "var(--font-jost), sans-serif" }}
          >
            <textPath href="#arcpath" startOffset="50%" textAnchor="middle">
              CÉLÉBREZ AVEC NOUS AU MAROC
            </textPath>
          </text>
        </svg>
        <div className="flex min-h-0 flex-1 items-center justify-center pb-4">
          <ArchScene className="h-[134px]" />
        </div>
        <p className="mt-1 font-serif text-[16px] uppercase leading-tight tracking-[0.08em]">
          {couple.partner1}{" "}
          <span className="font-serif italic normal-case text-[17px] text-[#d9b878]">
            &
          </span>{" "}
          {couple.partner2}
        </p>
        <p className="smallcaps !text-[7px] !tracking-[0.3em] text-cream/90">
          se marient !
        </p>
        {/* Deux alliances entrelacées, clin d'œil discret */}
        <svg
          viewBox="0 0 26 14"
          className="h-[11px] w-[22px] opacity-90"
          fill="none"
          stroke="#d9b878"
          strokeWidth="1.1"
          aria-hidden
        >
          <circle cx="9.5" cy="7" r="5.2" />
          <circle cx="16.5" cy="7" r="5.2" />
        </svg>
        <p className="font-serif text-[15px] tracking-[0.18em]">
          29<span className="text-[#d9b878]"> · </span>05
          <span className="text-[#d9b878]"> · </span>27
        </p>
        <div className="smallcaps !text-[6.5px] !leading-relaxed !tracking-[0.22em] text-cream/85">
          À l&apos;hôtel la {venue.name} · Sidi Kaouki
          <br />
          Séjour du 27 au 30 mai 2027
        </div>
        <p className="script -rotate-1 text-[15px] text-[#d9b878]">
          sous le soleil de Sidi Kaouki
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
