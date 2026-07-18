import type { Metadata } from "next";
import { wedding } from "@/content/wedding";
import { PalmLeaf, icons } from "@/components/ornaments";
import { PageHeader, SiteFooter } from "@/components/site";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = { title: "Contacts — Maureen & Akan" };

export default function ContactsPage() {
  return (
    <>
      <SiteNav />
      <main className="relative mx-auto max-w-4xl px-6 pb-24 overflow-hidden">
        <PalmLeaf className="pointer-events-none absolute -right-14 top-16 h-56 w-56 -scale-x-100 text-sand" />
        <PageHeader label="Une question ?" title="Contacts utiles" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {wedding.contacts.map((c) => (
            <div
              key={c.name}
              className="arch border border-linen bg-cream/60 px-4 pt-12 pb-7 text-center"
            >
              <p className="font-serif text-xl text-cocoa">{c.name}</p>
              <p className="smallcaps text-olive mt-1 mb-4">{c.role}</p>
              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 text-sienna hover:text-terracotta transition"
              >
                {icons.phone("h-4 w-4")}
                <span className="font-light">{c.phone}</span>
              </a>
            </div>
          ))}
        </div>

        <p className="mt-14 text-center font-light text-cocoa/70 max-w-xl mx-auto">
          Pour toute question sur votre venue, votre logement ou le formulaire
          de réponse, appelez-nous ou écrivez-nous — on est là.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
