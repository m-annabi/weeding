import type { Metadata } from "next";
import { wedding, mapsEmbedUrl, mapsLink } from "@/content/wedding";
import { Squiggle, icons } from "@/components/ornaments";
import { Card, PageHeader, SiteFooter, Tick } from "@/components/site";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = { title: "Infos pratiques — Maureen & Akan" };

export default function InfosPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 pb-24">
        <PageHeader label="Pour vous aider" title="Informations pratiques" />

        <div className="grid gap-6 sm:grid-cols-2 mt-8">
          <Card icon="calendar" title="La date" className="sm:col-span-2">
            <p className="text-2xl font-serif text-cocoa">{wedding.displayRange}</p>
            <p className="mt-3">
              Merci de confirmer votre présence avant le{" "}
              <strong className="font-medium highlight">{wedding.rsvpDeadline}</strong>.
            </p>
          </Card>

          <Card icon="mapPin" title="Le lieu" className="sm:col-span-2">
            <p className="font-medium text-cocoa">{wedding.venue.name}</p>
            <p className="mb-5">{wedding.venue.address}</p>
            <div className="arch overflow-hidden border border-linen p-1.5 bg-cream/70">
              <iframe
                src={mapsEmbedUrl()}
                title={`Carte — ${wedding.venue.name}`}
                className="arch w-full h-72 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={mapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-block text-sienna"
            >
              <span className="smallcaps">Ouvrir dans Google Maps</span>
              <Squiggle className="mt-1 h-2 w-full text-camel transition group-hover:text-sienna" />
            </a>
          </Card>

          <Card icon="plane" title="Comment venir ?" className="sm:col-span-2">
            <div className="grid gap-2 sm:grid-cols-3 mb-5">
              {wedding.airports.map((a) => (
                <div
                  key={a.code}
                  className="rounded-lg border border-linen bg-sand/60 px-4 py-3 text-center"
                >
                  <p className="font-medium text-cocoa">
                    {a.name}{" "}
                    <span className="text-xs text-olive">({a.code})</span>
                  </p>
                  <p className="text-sm">{a.drive}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-3 list-none">
              {wedding.travelTips.map((t) => (
                <li key={t} className="flex gap-3">
                  <Tick />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon="car" title="Les transports sur place">
            <p>{wedding.localTransport}</p>
          </Card>

          {wedding.lodging.offered && (
            <Card icon="bed" title="Où dormirez-vous ?">
              <p className="smallcaps inline-block rounded-full border border-olive/40 bg-olive/10 px-4 py-1.5 text-olive mb-4">
                Hébergement offert
              </p>
              <div className="space-y-4">
                {wedding.lodging.notes.map((n) => (
                  <p key={n}>{n}</p>
                ))}
              </div>
            </Card>
          )}

          <Card icon="heart" title="Ce qui est pris en charge" className="sm:col-span-2">
            <p className="mb-5">{wedding.covered.intro}</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="smallcaps text-olive mb-3">On prend en charge</p>
                <ul className="space-y-2 list-none">
                  {wedding.covered.included.map((c) => (
                    <li key={c} className="flex items-start gap-3">
                      <span className="mt-1 text-olive">{icons.check("h-4 w-4")}</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="smallcaps text-terracotta mb-3">Restent à votre charge</p>
                <ul className="space-y-2 list-none">
                  {wedding.covered.excluded.map((c) => (
                    <li key={c} className="flex items-start gap-3">
                      <span className="mt-1 text-terracotta">{icons.cross("h-4 w-4")}</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
