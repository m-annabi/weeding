import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { wedding } from "@/content/wedding";
import { Sunburst, Waves } from "@/components/ornaments";
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
          className="absolute inset-0 bg-gradient-to-b from-cocoa/55 via-sienna/30 to-cocoa/65"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-2xl px-6 pt-16 pb-32 text-center">
          <p className="smallcaps text-cream/90 mb-6">{wedding.displayDate}</p>
          <h1 className="font-serif italic font-light text-5xl sm:text-7xl text-cream leading-none drop-shadow-[0_2px_16px_rgba(85,64,44,0.5)]">
            {wedding.couple.partner1}
            <span className="mx-3 not-italic text-3xl sm:text-4xl text-cream/70 align-middle">
              &
            </span>
            {wedding.couple.partner2}
          </h1>
          <div
            className="flex items-center justify-center gap-5 my-5"
            aria-hidden
          >
            <span className="h-px w-16 bg-cream/50" />
            <Sunburst className="h-6 w-6 text-cream" />
            <span className="h-px w-16 bg-cream/50" />
          </div>
          <p className="smallcaps text-cream/85">
            {wedding.venue.name} · Sidi Kaouki · Maroc
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 pb-20">
        {/* Carton d'invitation */}
        <div className="arch relative z-10 -mt-20 border border-camel/50 bg-cream p-2 shadow-[0_10px_40px_rgba(85,64,44,0.16)]">
          <div className="arch border border-camel/40 border-dashed px-6 pt-12 pb-8 text-center">
            <Sunburst className="mx-auto h-7 w-7 text-camel mb-4" />
            <p className="smallcaps text-olive mb-4">Invitation pour</p>
            <p className="font-serif text-3xl text-cocoa">
              {guest.firstName} {guest.lastName}
            </p>
            <p className="font-light text-cocoa/70 mt-4 max-w-md mx-auto">
              Nous serions honorés de vous compter parmi nous, les pieds dans le
              sable. Merci de répondre avant le{" "}
              <strong className="font-medium highlight">{wedding.rsvpDeadline}</strong>.
            </p>
          </div>
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
          <Waves className="mx-auto h-5 w-14 text-camel mb-4" />
          <p className="script text-3xl text-terracotta -rotate-1 mb-3">
            on a hâte de vous voir !
          </p>
          <p className="text-sm text-cocoa/50 font-light">
            Un problème avec le formulaire ? Contactez-nous directement.
          </p>
        </footer>
      </div>
    </main>
  );
}
