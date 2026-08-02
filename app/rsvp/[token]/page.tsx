import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { wedding } from "@/content/wedding";
import { Sunburst, icons } from "@/components/ornaments";
import InvitationReveal from "@/components/invitation-reveal";
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
        fullStay: guest.rsvp.fullStay,
        stayDetails: guest.rsvp.stayDetails,
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
      <div className="mx-auto max-w-2xl px-6 pt-6 pb-20">
        {/* L'enveloppe s'ouvre, la carte kilim sort (façon Paperless Post) */}
        <InvitationReveal />
        <div className="invite-after mt-10 text-center">
          <Sunburst className="mx-auto h-7 w-7 text-camel mb-4" />
          <p className="smallcaps text-olive mb-4">Invitation pour</p>
          <p className="font-serif text-3xl text-cocoa">
            {guest.firstName} {guest.lastName}
            {guest.partnerName ? ` & ${guest.partnerName}` : ""}
          </p>
          <p className="font-light text-cocoa/70 mt-4 max-w-md mx-auto">
            Nous serions honorés de vous compter parmi nous, les pieds dans le
            sable. Merci de répondre avant le{" "}
            <strong className="font-medium highlight">{wedding.rsvpDeadline}</strong>.
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
          <span className="mx-auto mb-4 block w-fit text-camel">
            {icons.tongs("h-8 w-8")}
          </span>
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
