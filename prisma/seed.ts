import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GROUPS = [
  "Famille Akan",
  "Famille Maureen",
  "Amis",
  "Collègues",
  "Témoins",
  "Prestataires",
];

// Inventaire réel de la Kasbah d'Eau : 16 chambres, toutes en double/twin,
// soit 32 lits de base. Les 6 suites vue mer et 2 des 3 master suites peuvent
// accueillir un lit d'appoint (8 lits d'appoint au total, 60 €/lit/nuit).
// La capacité est comptée en personnes (lits de base) ; le lit d'appoint
// optionnel et payant est signalé dans la note.
const EXTRA_BED = "lit d'appoint possible (+60 €/nuit)";
const LODGINGS: { name: string; capacity: number; note: string }[] = [
  ...Array.from({ length: 6 }, (_, i) => ({
    name: `Suite vue mer ${i + 1}`,
    capacity: 2,
    note: `Vue mer · double/twin · ${EXTRA_BED}`,
  })),
  ...Array.from({ length: 7 }, (_, i) => ({
    name: `Chambre vue jardin ${i + 1}`,
    capacity: 2,
    note: "Vue jardin · double/twin",
  })),
  { name: "Master suite 1", capacity: 2, note: "Master suite · double" },
  {
    name: "Master suite 2",
    capacity: 2,
    note: `Master suite · double/twin · ${EXTRA_BED}`,
  },
  {
    name: "Master suite 3",
    capacity: 2,
    note: `Master suite · double/twin · ${EXTRA_BED}`,
  },
];

async function main() {
  for (const name of GROUPS) {
    await prisma.group.upsert({ where: { name }, update: {}, create: { name } });
  }

  for (const l of LODGINGS) {
    await prisma.lodging.upsert({
      where: { name: l.name },
      update: { capacity: l.capacity, note: l.note },
      create: l,
    });
  }

  const groups = await prisma.group.findMany();
  const byName = Object.fromEntries(groups.map((g) => [g.name, g.id]));

  // Quelques invités de démonstration — à supprimer via le tableau de bord
  const demo = [
    { firstName: "Jean", lastName: "Dupont", maxGuests: 2, group: "Famille Akan", email: "jean.dupont@example.com" },
    { firstName: "Fatima", lastName: "Benali", maxGuests: 4, group: "Famille Maureen", phone: "06 12 34 56 78" },
    { firstName: "Lucas", lastName: "Martin", maxGuests: 1, group: "Amis" },
    { firstName: "Sarah", lastName: "Cohen", maxGuests: 2, group: "Témoins" },
  ];

  for (const g of demo) {
    const exists = await prisma.guest.findFirst({
      where: { firstName: g.firstName, lastName: g.lastName },
    });
    if (!exists) {
      await prisma.guest.create({
        data: {
          firstName: g.firstName,
          lastName: g.lastName,
          maxGuests: g.maxGuests,
          email: g.email,
          phone: g.phone,
          groupId: byName[g.group],
        },
      });
    }
  }

  console.log(
    "Seed terminé :",
    GROUPS.length,
    "groupes,",
    LODGINGS.length,
    "logements (32 lits + 8 lits d'appoint),",
    demo.length,
    "invités démo."
  );
}

main().finally(() => prisma.$disconnect());
