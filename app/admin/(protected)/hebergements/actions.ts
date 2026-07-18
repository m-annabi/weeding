"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Non autorisé");
}

function revalidate() {
  revalidatePath("/admin/hebergements");
  revalidatePath("/admin");
}

export async function createLodging(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const capacity = Math.max(
    parseInt(String(formData.get("capacity") ?? "0"), 10) || 0,
    0
  );
  const note = String(formData.get("note") ?? "").trim() || null;
  await prisma.lodging.upsert({
    where: { name },
    update: { capacity, note },
    create: { name, capacity, note },
  });
  revalidate();
}

export async function deleteLodging(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.lodging.delete({ where: { id } });
  revalidate();
}

export async function assignLodging(formData: FormData) {
  await requireAdmin();
  const guestId = String(formData.get("guestId") ?? "");
  if (!guestId) return;
  const lodgingId = String(formData.get("lodgingId") ?? "") || null;
  await prisma.guest.update({
    where: { id: guestId },
    data: { lodgingId },
  });
  revalidate();
}
