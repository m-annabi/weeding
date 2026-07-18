"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Non autorisé");
}

export async function createGuest(formData: FormData) {
  await requireAdmin();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  if (!firstName || !lastName) return;
  const email = String(formData.get("email") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const maxGuests = Math.min(
    Math.max(parseInt(String(formData.get("maxGuests") ?? "1"), 10) || 1, 1),
    20
  );
  const groupId = String(formData.get("groupId") ?? "") || null;
  await prisma.guest.create({
    data: { firstName, lastName, email, phone, maxGuests, groupId },
  });
  revalidatePath("/admin/invites");
  revalidatePath("/admin");
}

export async function deleteGuest(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.guest.delete({ where: { id } });
  revalidatePath("/admin/invites");
  revalidatePath("/admin");
}

export async function updateGuest(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const maxGuests = Math.min(
    Math.max(parseInt(String(formData.get("maxGuests") ?? "1"), 10) || 1, 1),
    20
  );
  const groupId = String(formData.get("groupId") ?? "") || null;
  await prisma.guest.update({ where: { id }, data: { maxGuests, groupId } });
  revalidatePath("/admin/invites");
  revalidatePath("/admin");
}

export async function createGroup(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  await prisma.group.upsert({ where: { name }, update: {}, create: { name } });
  revalidatePath("/admin/invites");
  revalidatePath("/admin");
}

export async function deleteGroup(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.group.delete({ where: { id } });
  revalidatePath("/admin/invites");
  revalidatePath("/admin");
}
