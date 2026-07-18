import { prisma } from "./prisma";

export async function getGuestsFull() {
  return prisma.guest.findMany({
    include: {
      group: true,
      lodging: true,
      rsvp: { include: { participants: true } },
    },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });
}

export type GuestFull = Awaited<ReturnType<typeof getGuestsFull>>[number];

export const DIET_LABELS: Record<string, string> = {
  NONE: "Sans particularité",
  VEGETARIAN: "Végétarien",
  VEGAN: "Vegan",
  HALAL: "Halal",
  GLUTEN_FREE: "Sans gluten",
  OTHER: "Autre",
};

export function guestStatus(g: GuestFull): "pending" | "attending" | "declined" {
  if (!g.rsvp) return "pending";
  return g.rsvp.attending ? "attending" : "declined";
}

export function computeStats(guests: GuestFull[]) {
  const attendingGuests = guests.filter((g) => guestStatus(g) === "attending");
  const participants = attendingGuests.flatMap((g) => g.rsvp!.participants);

  const dietCount = (diet: string) =>
    participants.filter((p) => p.diet === diet).length;

  const byGroup = new Map<
    string,
    {
      total: number;
      responded: number;
      attending: number;
      participants: number;
      pendingGuests: { name: string; phone: string | null; email: string | null }[];
    }
  >();
  for (const g of guests) {
    const key = g.group?.name ?? "Sans groupe";
    if (!byGroup.has(key)) {
      byGroup.set(key, {
        total: 0,
        responded: 0,
        attending: 0,
        participants: 0,
        pendingGuests: [],
      });
    }
    const entry = byGroup.get(key)!;
    entry.total++;
    const status = guestStatus(g);
    if (status !== "pending") entry.responded++;
    if (status === "attending") {
      entry.attending++;
      entry.participants += g.rsvp!.participants.length;
    }
    if (status === "pending") {
      entry.pendingGuests.push({
        name: `${g.firstName} ${g.lastName}`,
        phone: g.phone,
        email: g.email,
      });
    }
  }

  return {
    totalGuests: guests.length,
    responded: guests.filter((g) => guestStatus(g) !== "pending").length,
    attending: attendingGuests.length,
    declined: guests.filter((g) => guestStatus(g) === "declined").length,
    pending: guests.filter((g) => guestStatus(g) === "pending").length,
    totalParticipants: participants.length,
    vegetarian: dietCount("VEGETARIAN"),
    vegan: dietCount("VEGAN"),
    halal: dietCount("HALAL"),
    glutenFree: dietCount("GLUTEN_FREE"),
    otherDiet: participants.filter((p) => p.diet === "OTHER"),
    childMenus: participants.filter((p) => p.childMenu).length,
    allergies: participants
      .filter((p) => p.allergies)
      .map((p) => ({ name: `${p.firstName} ${p.lastName}`, detail: p.allergies! })),
    specialNeeds: participants
      .filter((p) => p.specialNeeds)
      .map((p) => ({ name: `${p.firstName} ${p.lastName}`, detail: p.specialNeeds! })),
    byPlane: attendingGuests.filter((g) => g.rsvp!.arrivalMode === "PLANE").length,
    byCar: attendingGuests.filter((g) => g.rsvp!.arrivalMode === "CAR").length,
    onSite: attendingGuests.filter((g) => g.rsvp!.arrivalMode === "ON_SITE").length,
    missingTravelInfo: attendingGuests.filter((g) => {
      const r = g.rsvp!;
      if (!r.arrivalMode) return true;
      return r.arrivalMode === "PLANE" && (!r.arrivalDate || !r.arrivalTime);
    }),
    // Invitations qui souhaitent être logées par les mariés (kasbah/annexes)
    wantsLodging: attendingGuests.filter(
      (g) => g.rsvp!.accommodation === "KASBAH"
    ),
    wantsLodgingSeats: attendingGuests
      .filter((g) => g.rsvp!.accommodation === "KASBAH")
      .reduce((sum, g) => sum + g.rsvp!.participants.length, 0),
    elsewhere: attendingGuests.filter((g) => g.rsvp!.accommodation === "OTHER"),
    carpoolOffers: attendingGuests.filter((g) => g.rsvp!.offersCarpool),
    comments: guests
      .filter((g) => g.rsvp?.comment)
      .map((g) => ({
        name: `${g.firstName} ${g.lastName}`,
        detail: g.rsvp!.comment!,
      })),
    byGroup,
  };
}

export type Stats = ReturnType<typeof computeStats>;

export type FlightLeg = {
  guest: GuestFull;
  date: string;
  time: string | null;
  flight: string | null;
  airport: string | null;
  pax: number;
  offersCarpool: boolean;
};

/**
 * Vols triés par date puis heure, pour le planning des navettes.
 * `direction: "arrival"` = atterrissages, `"departure"` = décollages retour.
 */
export function flightLegs(
  guests: GuestFull[],
  direction: "arrival" | "departure"
): FlightLeg[] {
  const legs: FlightLeg[] = [];
  for (const g of guests) {
    const r = g.rsvp;
    if (!r?.attending || r.arrivalMode !== "PLANE") continue;
    const date = direction === "arrival" ? r.arrivalDate : r.departureDate;
    if (!date) continue;
    legs.push({
      guest: g,
      date,
      time: direction === "arrival" ? r.arrivalTime : r.departureTime,
      flight: direction === "arrival" ? r.arrivalFlight : r.departureFlight,
      airport: r.arrivalAirport,
      pax: r.participants.length,
      offersCarpool: r.offersCarpool,
    });
  }
  return legs.sort(
    (a, b) =>
      a.date.localeCompare(b.date) ||
      (a.time ?? "99:99").localeCompare(b.time ?? "99:99")
  );
}
