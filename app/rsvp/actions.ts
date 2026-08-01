"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export type FindState = { message: string } | null;

/** Minuscules, sans accents ni espaces superflus, pour comparer les noms. */
function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export async function findInvitation(
  _prev: FindState,
  formData: FormData
): Promise<FindState> {
  const name = normalize(String(formData.get("name") ?? ""));
  if (name.length < 3) {
    return { message: "Indiquez votre prénom et votre nom." };
  }

  const guests = await prisma.guest.findMany({
    select: { token: true, firstName: true, lastName: true, partnerName: true },
  });
  const matches = guests.filter((g) => {
    const full = normalize(`${g.firstName} ${g.lastName}`);
    const reversed = normalize(`${g.lastName} ${g.firstName}`);
    const partner = g.partnerName ? normalize(g.partnerName) : "";
    return (
      full === name ||
      reversed === name ||
      full.includes(name) ||
      (partner !== "" && (partner === name || partner.includes(name)))
    );
  });

  if (matches.length === 1) redirect(`/rsvp/${matches[0].token}`);
  if (matches.length > 1) {
    return {
      message:
        "Plusieurs invitations correspondent à ce nom — précisez prénom et nom, ou contactez-nous directement.",
    };
  }
  return {
    message:
      "Aucune invitation trouvée à ce nom. Vérifiez l'orthographe, ou contactez-nous directement.",
  };
}
