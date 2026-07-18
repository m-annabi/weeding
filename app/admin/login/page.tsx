"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    null
  );
  return (
    <main className="min-h-screen bg-sand/60 flex items-center justify-center px-6">
      <form
        action={formAction}
        className="w-full max-w-sm arch bg-cream border border-nude/70 px-8 pt-16 pb-10 text-center"
      >
        <p className="text-3xl mb-2">🔐</p>
        <h1 className="font-serif text-3xl text-sienna mb-1">
          Espace des mariés
        </h1>
        <p className="font-light text-cocoa/60 mb-8 text-sm">
          Tableau de bord privé
        </p>
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="Mot de passe"
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
          {pending ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </main>
  );
}
