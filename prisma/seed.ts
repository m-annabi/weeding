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

async function main() {
  for (const name of GROUPS) {
    await prisma.group.upsert({ where: { name }, update: {}, create: { name } });
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

  console.log("Seed terminé :", GROUPS.length, "groupes,", demo.length, "invités démo.");
}

main().finally(() => prisma.$disconnect());
