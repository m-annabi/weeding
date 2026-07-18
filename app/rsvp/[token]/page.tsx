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
        comesByCar: guest.rsvp.comesByCar,
        needsShuttle: guest.rsvp.needsShuttle,
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
      <div className="max-w-2xl mx-auto px-6 py-16">
        <header className="text-center mb-4">
          <p className="tracking-[0.35em] text-xs uppercase text-olive mb-4">
            {wedding.displayDate}
          </p>
          <h1 className="script text-5xl sm:text-6xl text-terracotta">
            {wedding.couple.partner1} & {wedding.couple.partner2}
          </h1>
          <div className="arch border border-nude/70 bg-cream/70 mt-8 px-6 pt-10 pb-8">
            <p className="font-serif text-2xl text-cocoa">
              {guest.firstName} {guest.lastName}
            </p>
            <p className="font-light text-cocoa/70 mt-2">
              Nous serions honorés de vous compter parmi nous. Merci de
              répondre avant le{" "}
              <strong className="font-medium">{wedding.rsvpDeadline}</strong>.
            </p>
          </div>
        </header>
        <RsvpForm
          token={guest.token}
          firstName={guest.firstName}
          lastName={guest.lastName}
          maxGuests={guest.maxGuests}
          shuttleOffered={wedding.shuttleOffered}
          existing={existing}
        />
        <footer className="mt-12 text-center text-sm text-cocoa/50 font-light">
          Un problème avec le formulaire ? Contactez-nous directement.
        </footer>
      </div>
    </main>
  );
}
