"use client";

import { useActionState } from "react";
import { findInvitation, type FindState } from "./actions";

export default function FindForm() {
  const [state, formAction, pending] = useActionState<FindState, FormData>(
    findInvitation,
    null
  );
  return (
    <form
      action={formAction}
      className="mx-auto mt-10 w-full max-w-md arch border border-linen bg-cream/60 px-8 pt-14 pb-10 text-center"
    >
      <p className="font-light text-cocoa/70 mb-6">
        Indiquez le prénom et le nom figurant sur votre invitation : nous vous
        emmenons vers votre formulaire personnel.
      </p>
      <input
        type="text"
        name="name"
        required
        autoFocus
        autoComplete="name"
        placeholder="Prénom Nom"
        className="w-full rounded-xl border border-linen bg-white/80 px-4 py-3 text-center text-cocoa focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
      />
      {state && (
        <p className="mt-3 text-sm text-sienna bg-terracotta/10 border border-terracotta rounded-lg px-3 py-2">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full bg-terracotta py-3 font-medium text-cream transition hover:bg-sienna disabled:opacity-60"
      >
        {pending ? "Recherche…" : "Trouver mon invitation"}
      </button>
    </form>
  );
}
