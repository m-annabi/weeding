"use server";

import { prisma } from "@/lib/prisma";

export type RsvpState = { ok: boolean; message: string } | null;

const DIETS = ["NONE", "VEGETARIAN", "VEGAN", "HALAL", "GLUTEN_FREE", "OTHER"];
const AIRPORTS = ["ESU", "RAK", "AGA"];
const ACCOMMODATIONS = ["KASBAH", "OTHER"];

export async function submitRsvp(
  token: string,
  _prev: RsvpState,
  formData: FormData
): Promise<RsvpState> {
  const guest = await prisma.guest.findUnique({ where: { token } });
  if (!guest) {
    return { ok: false, message: "Invitation introuvable. Vérifiez votre lien." };
  }

  const attendingRaw = formData.get("attending");
  if (attendingRaw !== "yes" && attendingRaw !== "no") {
    return { ok: false, message: "Merci d'indiquer si vous serez présent(e)." };
  }
  const attending = attendingRaw === "yes";

  const str = (name: string, max = 500) => {
    const v = formData.get(name);
    return typeof v === "string" ? v.trim().slice(0, max) || null : null;
  };

  const email = str("email", 200);
  const phone = str("phone", 50);
  const comment = str("comment", 2000);

  const enumOf = (name: string, allowed: string[]) => {
    const v = str(name, 30);
    return v && allowed.includes(v) ? v : null;
  };
  // Tout le monde arrive en avion — plus de choix du mode de transport.
  const fullStayRaw = str("fullStay", 5);
  const fullStay =
    fullStayRaw === "yes" ? true : fullStayRaw === "no" ? false : null;
  const stayDetails = fullStay === false ? str("stayDetails", 300) : null;
  const arrivalAirport = enumOf("arrivalAirport", AIRPORTS);
  const arrivalDate = str("arrivalDate", 10);
  const arrivalTime = str("arrivalTime", 5);
  const arrivalFlight = str("arrivalFlight", 20);
  const departureDate = str("departureDate", 10);
  const departureTime = str("departureTime", 5);
  const departureFlight = str("departureFlight", 20);
  const needsTransfer = formData.get("needsTransfer") === "on";
  const accommodation = enumOf("accommodation", ACCOMMODATIONS);
  const accommodationOther =
    accommodation === "OTHER" ? str("accommodationOther", 300) : null;

  type ParticipantInput = {
    firstName: string;
    lastName: string;
    diet: string;
    dietOther: string | null;
    allergies: string | null;
    childMenu: boolean;
    specialNeeds: string | null;
  };
  const participants: ParticipantInput[] = [];

  if (attending) {
    if (!phone && !email) {
      return {
        ok: false,
        message: "Merci de laisser au moins un téléphone ou un email.",
      };
    }
    const count = Math.min(
      Math.max(parseInt(String(formData.get("count") ?? "1"), 10) || 1, 1),
      guest.maxGuests
    );
    for (let i = 0; i < count; i++) {
      const firstName = str(`p${i}_firstName`, 100);
      const lastName = str(`p${i}_lastName`, 100);
      if (!firstName || !lastName) {
        return {
          ok: false,
          message: `Merci d'indiquer le nom et le prénom du participant ${i + 1}.`,
        };
      }
      const dietRaw = str(`p${i}_diet`, 30) ?? "NONE";
      const diet = DIETS.includes(dietRaw) ? dietRaw : "NONE";
      participants.push({
        firstName,
        lastName,
        diet,
        dietOther: diet === "OTHER" ? str(`p${i}_dietOther`, 200) : null,
        allergies: str(`p${i}_allergies`, 500),
        childMenu: formData.get(`p${i}_childMenu`) === "on",
        specialNeeds: str(`p${i}_specialNeeds`, 500),
      });
    }
  }

  const travel = attending
    ? {
        arrivalMode: "PLANE",
        fullStay,
        stayDetails,
        arrivalAirport,
        arrivalDate,
        arrivalTime,
        arrivalFlight,
        departureDate,
        departureTime,
        departureFlight,
        needsTransfer,
        accommodation,
        accommodationOther,
      }
    : {
        arrivalMode: null,
        fullStay: null,
        stayDetails: null,
        arrivalAirport: null,
        arrivalDate: null,
        arrivalTime: null,
        arrivalFlight: null,
        departureDate: null,
        departureTime: null,
        departureFlight: null,
        needsTransfer: false,
        accommodation: null,
        accommodationOther: null,
      };

  await prisma.$transaction(async (tx) => {
    const rsvp = await tx.rsvp.upsert({
      where: { guestId: guest.id },
      update: { attending, email, phone, comment, ...travel },
      create: { guestId: guest.id, attending, email, phone, comment, ...travel },
    });
    await tx.participant.deleteMany({ where: { rsvpId: rsvp.id } });
    if (participants.length > 0) {
      await tx.participant.createMany({
        data: participants.map((p) => ({ ...p, rsvpId: rsvp.id })),
      });
    }
  });

  return {
    ok: true,
    message: attending
      ? "Merci ! Votre présence est confirmée, nous avons hâte de vous voir. 🎉"
      : "Réponse bien enregistrée. Vous nous manquerez ! 🤍",
  };
}
