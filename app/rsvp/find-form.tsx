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
      className="mx-auto mt-10 w-full max-w-md arch border border-linen bg-ivory/60 px-8 pt-14 pb-10 text-center"
    >
      <p className="font-light text-charcoal/70 mb-6">
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
        className="w-full rounded-xl border border-linen bg-white/80 px-4 py-3 text-center text-charcoal focus:outline-none focus:border-majorelle focus:ring-2 focus:ring-majorelle/20"
      />
      {state && (
        <p className="mt-3 text-sm text-charcoal bg-majorelle/10 border border-majorelle rounded-lg px-3 py-2">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full bg-majorelle py-3 font-medium text-ivory transition hover:bg-majorelle-deep disabled:opacity-60"
      >
        {pending ? "Recherche…" : "Trouver mon invitation"}
      </button>
    </form>
  );
}
