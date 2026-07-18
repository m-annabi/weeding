"use server";

import { redirect } from "next/navigation";
import { checkPassword, createAdminSession, destroyAdminSession } from "@/lib/auth";

export type LoginState = { message: string } | null;

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    return { message: "Mot de passe incorrect." };
  }
  await createAdminSession();
  redirect("/admin");
}

export async function logout() {
  await destroyAdminSession();
  redirect("/admin/login");
}
