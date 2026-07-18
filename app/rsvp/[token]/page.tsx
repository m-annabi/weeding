import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { wedding } from "@/content/wedding";
import RsvpForm from "./rsvp-form";

export const dynamic = "force-dynamic";

export default async function RsvpPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const guest = await prisma.guest.findUnique({
    where: { token },
    include: { rsvp: { include: { participants: true } } },
  });
  if (!guest) notFound();

  const existing = guest.rsvp
    ? {
        attending: guest.rsvp.attending,
        email: guest.rsvp.email,
        phone: guest.rsvp.phone,
        arrivalMode: guest.rsvp.arrivalMode,
        arrivalAirport: guest.rsvp.arrivalAirport,
        arrivalDate: guest.rsvp.arrivalDate,
        arrivalTime: guest.rsvp.arrivalTime,
        arrivalFlight: guest.rsvp.arrivalFlight,
        departureDate: guest.rsvp.departureDate,
        departureTime: guest.rsvp.departureTime,
        departureFlight: guest.rsvp.departureFlight,
        needsTransfer: guest.rsvp.needsTransfer,
        accommodation: guest.rsvp.accommodation,
        accommodationOther: guest.rsvp.accommodationOther,
        offersCarpool: guest.rsvp.offersCarpool,
        comment: guest.rsvp.comment,
        participants: guest.rsvp.participants.map((p) => ({
          firstName: p.firstName,
          lastName: p.lastName,
          diet: p.diet,
          dietOther: p.dietOther,
          allergies: p.allergies,
          childMenu: p.childMenu,
          specialNeeds: p.specialNeeds,
        })),
      }
    : null;

  return (
    <main className="min-h-screen bg-sand/50">
      {/* ─── Bandeau image ─── */}
      <header
        className="relative bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${wedding.images.band})` }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-cocoa/60 via-cocoa/35 to-cocoa/65"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-2xl px-6 pt-16 pb-32 text-center">
          <p className="tracking-[0.35em] text-xs uppercase text-cream/90 mb-5">
            {wedding.displayDate}
          </p>
          <h1 className="script text-5xl sm:text-7xl text-cream leading-tight drop-shadow-[0_2px_12px_rgba(76,56,44,0.5)]">
            {wedding.couple.partner1}
            <span className="font-serif italic text-3xl sm:text-4xl text-cream/80 mx-3">
              &
            </span>
            {wedding.couple.partner2}
          </h1>
          <div
            className="flex items-center justify-center gap-4 my-4"
            aria-hidden
          >
            <span className="h-px w-16 bg-cream/60" />
            <span className="text-cream text-lg">✦</span>
            <span className="h-px w-16 bg-cream/60" />
          </div>
          <p className="font-serif italic text-lg text-cream/90">
            {wedding.venue.name} · Sidi Kaouki, Maroc
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 pb-20">
        {/* Carton d'invitation */}
        <div className="arch relative z-10 -mt-20 border border-nude/70 bg-cream px-6 pt-14 pb-9 text-center shadow-[0_10px_40px_rgba(76,56,44,0.18)]">
          <p className="tracking-[0.3em] text-[11px] uppercase text-olive mb-3">
            Invitation pour
          </p>
          <p className="font-serif text-3xl text-cocoa">
            {guest.firstName} {guest.lastName}
          </p>
          <p className="font-light text-cocoa/70 mt-3 max-w-md mx-auto">
            Nous serions honorés de vous compter parmi nous, les pieds dans le
            sable. Merci de répondre avant le{" "}
            <strong className="font-medium">{wedding.rsvpDeadline}</strong>.
          </p>
        </div>

        <RsvpForm
          token={guest.token}
          firstName={guest.firstName}
          lastName={guest.lastName}
          maxGuests={guest.maxGuests}
          transferOffered={wedding.transferOffered}
          airports={wedding.airports}
          existing={existing}
        />

        <footer className="mt-14 text-center">
          <div
            className="flex items-center justify-center gap-4 mb-4"
            aria-hidden
          >
            <span className="h-px w-16 bg-nude" />
            <span className="text-olive text-lg">✦</span>
            <span className="h-px w-16 bg-nude" />
          </div>
          <p className="script text-3xl text-terracotta mb-2">
            On a hâte de vous voir !
          </p>
          <p className="text-sm text-cocoa/50 font-light">
            Un problème avec le formulaire ? Contactez-nous directement.
          </p>
        </footer>
      </div>
    </main>
  );
}
