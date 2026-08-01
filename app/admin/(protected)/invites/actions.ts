"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";
import { sendInvitationEmail, siteUrl } from "@/lib/email";

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Non autorisé");
}

export async function createGuest(formData: FormData) {
  await requireAdmin();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  if (!firstName || !lastName) return;
  const partnerName = String(formData.get("partnerName") ?? "").trim() || null;
  const email = String(formData.get("email") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const maxGuests = Math.min(
    Math.max(parseInt(String(formData.get("maxGuests") ?? "1"), 10) || 1, 1),
    20
  );
  const groupId = String(formData.get("groupId") ?? "") || null;
  await prisma.guest.create({
    data: { firstName, lastName, partnerName, email, phone, maxGuests, groupId },
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
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  if (!firstName || !lastName) return;
  const partnerName = String(formData.get("partnerName") ?? "").trim() || null;
  const email = String(formData.get("email") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const maxGuests = Math.min(
    Math.max(parseInt(String(formData.get("maxGuests") ?? "1"), 10) || 1, 1),
    20
  );
  const groupId = String(formData.get("groupId") ?? "") || null;
  const lodgingId = String(formData.get("lodgingId") ?? "") || null;
  await prisma.guest.update({
    where: { id },
    data: {
      firstName,
      lastName,
      partnerName,
      email,
      phone,
      maxGuests,
      groupId,
      lodgingId,
    },
  });
  revalidatePath("/admin/invites");
  revalidatePath("/admin");
  redirect("/admin/invites");
}

export async function createGroup(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  await prisma.group.upsert({ where: { name }, update: {}, create: { name } });
  revalidatePath("/admin/invites");
  revalidatePath("/admin");
}

export async function sendInvitation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const guest = await prisma.guest.findUnique({ where: { id } });
  if (!guest) return;
  const email = guest.email?.trim();
  if (!email) {
    redirect(
      `/admin/invites?mail=err&msg=${encodeURIComponent("Cet invité n'a pas d'adresse email.")}`
    );
  }
  try {
    await sendInvitationEmail(
      email!,
      guest.firstName,
      `${siteUrl()}/rsvp/${guest.token}`
    );
  } catch (e) {
    redirect(
      `/admin/invites?mail=err&msg=${encodeURIComponent(
        e instanceof Error ? e.message : "Échec de l'envoi."
      )}`
    );
  }
  await prisma.guest.update({
    where: { id },
    data: { invitationSentAt: new Date() },
  });
  revalidatePath("/admin/invites");
  redirect(
    `/admin/invites?mail=ok&msg=${encodeURIComponent(
      `Invitation envoyée à ${guest.firstName} ${guest.lastName} (${email}).`
    )}`
  );
}

export async function deleteGroup(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.group.delete({ where: { id } });
  revalidatePath("/admin/invites");
  revalidatePath("/admin");
}
