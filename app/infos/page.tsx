import type { Metadata } from "next";
import { wedding, mapsEmbedUrl, mapsLink } from "@/content/wedding";
import { Squiggle } from "@/components/ornaments";
import { Card, PageHeader, SiteFooter, Tick } from "@/components/site";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = { title: "Infos pratiques — Maureen & Akan" };

export default function InfosPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 pb-24">
        <PageHeader label="Le jour J" title="Informations pratiques" />

        <div className="grid gap-6 sm:grid-cols-2 mt-8">
          <Card icon="calendar" title="La date">
            <p className="text-2xl font-serif text-cocoa">{wedding.displayDate}</p>
            <p className="mt-3">
              Merci de confirmer votre présence avant le{" "}
              <strong className="font-medium highlight">{wedding.rsvpDeadline}</strong>.
            </p>
          </Card>

          <Card icon="clock" title="La cérémonie">
            <p className="text-2xl font-serif text-cocoa">{wedding.ceremonyTime}</p>
            <p className="mt-3">
              Nous vous attendons un peu en avance pour commencer tous ensemble.
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

          <Card icon="car" title="Parking">
            <ul className="space-y-3 list-none">
              {wedding.parking.map((p) => (
                <li key={p} className="flex gap-3">
                  <Tick />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Card>

          {wedding.lodging.offered && (
            <Card icon="bed" title="Où dormirez-vous ?">
              <p className="smallcaps inline-block rounded-full border border-olive/40 bg-olive/10 px-4 py-1.5 text-olive mb-4">
                Hébergement offert
              </p>
              <ul className="space-y-3 list-none">
                {wedding.lodging.notes.map((n) => (
                  <li key={n} className="flex gap-3">
                    <Tick />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
