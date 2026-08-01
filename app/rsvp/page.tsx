import type { Metadata } from "next";
import { wedding } from "@/content/wedding";
import { PageHeader, SiteFooter } from "@/components/site";
import SiteNav from "@/components/site-nav";
import FindForm from "./find-form";

export const metadata: Metadata = { title: "RSVP — Maureen & Akan" };

export default function RsvpFinderPage() {
  return (
    <>
      <SiteNav />
      <main className="relative mx-auto max-w-4xl px-6 pb-24 overflow-hidden">
        <PageHeader label="Répondez-nous vite" title="Confirmer ma venue" />

        <FindForm />

        <p className="mt-12 text-center font-light text-charcoal/70 max-w-xl mx-auto">
          Vous avez déjà reçu un lien personnel ou un QR code ? Il mène au même
          formulaire — et vous pouvez y revenir pour modifier votre réponse.
          Réponse souhaitée avant le {wedding.rsvpDeadline}.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
