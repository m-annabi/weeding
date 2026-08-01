import type { Metadata } from "next";
import { wedding } from "@/content/wedding";
import { PalmLeaf } from "@/components/ornaments";
import { PageHeader, SiteFooter } from "@/components/site";
import SiteNav from "@/components/site-nav";
import FindForm from "./find-form";

export const metadata: Metadata = { title: "RSVP — Maureen & Akan" };

export default function RsvpFinderPage() {
  return (
    <>
      <SiteNav />
      <main className="relative mx-auto max-w-4xl px-6 pb-24 overflow-hidden">
        <PalmLeaf className="pointer-events-none absolute -left-14 top-16 h-56 w-56 text-sand" />
        <PageHeader label="Répondez-nous vite" title="Confirmer ma venue" />

        <FindForm />

        <p className="mt-12 text-center font-light text-cocoa/70 max-w-xl mx-auto">
          Vous avez déjà reçu un lien personnel ou un QR code ? Il mène au même
          formulaire — et vous pouvez y revenir pour modifier votre réponse.
          Réponse souhaitée avant le {wedding.rsvpDeadline}.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
