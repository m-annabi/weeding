import { wedding } from "@/content/wedding";

/**
 * Carte d'invitation façon « Pueblo » (faire-part kilim) : fond olive
 * texturé, bandes kilim latérales, textes du mariage.
 */
export function InvitationCard({ className = "" }: { className?: string }) {
  const { couple, displayDate, displayRangeShort, venue } = wedding;
  return (
    <div
      className={`texture-olive relative overflow-hidden rounded-[4px] ${className}`}
    >
      <div className="kilim-band absolute inset-y-0 left-1.5 w-9" aria-hidden />
      <div className="kilim-band absolute inset-y-0 right-1.5 w-9" aria-hidden />
      <div className="relative mx-12 flex h-full flex-col items-center justify-center gap-2.5 px-1 py-7 text-center text-cream">
        <p className="font-serif text-[19px] uppercase leading-[1.25] tracking-[0.1em]">
          {couple.partner1}
          <br />
          <span className="text-[15px] tracking-[0.14em]">& {couple.partner2}</span>
        </p>
        <p className="script -rotate-2 text-[19px] leading-snug text-cream/95">
          vous invitent à<br />
          célébrer
          <br />
          leur mariage
        </p>
        <span
          className="mx-auto block h-1.5 w-1.5 rotate-45 bg-[#c98d5c]"
          aria-hidden
        />
        <div className="font-serif text-[11.5px] leading-relaxed">
          <p>{displayDate}</p>
          <p>{venue.name}</p>
          <p>Sidi Kaouki · Maroc</p>
        </div>
        <p className="smallcaps !text-[7px] !tracking-[0.28em] text-cream/80">
          Séjour {displayRangeShort}
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
