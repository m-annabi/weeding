import type { Metadata } from "next";
import { wedding, mapsEmbedUrl, mapsLink } from "@/content/wedding";
import { Squiggle, icons, type IconName } from "@/components/ornaments";
import { PageHeader, SiteFooter, Tick } from "@/components/site";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = { title: "Infos pratiques — Maureen & Akan" };

/** Bloc dépliable : teinte douce, icône, titre serif, « + » qui pivote. */
function Accordion({
  icon,
  title,
  tint,
  iconColor,
  defaultOpen = false,
  children,
}: {
  icon: IconName;
  title: string;
  tint: string;
  iconColor: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className={`group rounded-2xl ${tint}`}>
      <summary className="flex cursor-pointer select-none items-center gap-4 px-6 py-5 sm:px-8 list-none [&::-webkit-details-marker]:hidden">
        <span className={iconColor}>{icons[icon]("h-6 w-6")}</span>
        <h2 className="font-serif text-xl sm:text-2xl text-cocoa">{title}</h2>
        <span
          className="ml-auto text-3xl font-extralight leading-none text-sienna/70 transition-transform duration-300 group-open:rotate-45"
          aria-hidden
        >
          +
        </span>
      </summary>
      <div className="px-6 pb-8 sm:px-8 font-light text-cocoa/80 leading-relaxed">
        {children}
      </div>
    </details>
  );
}

export default function InfosPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 pb-24">
        <PageHeader label="Pour vous aider" title="Informations pratiques" />

        {/* La date, toujours visible */}
        <section className="py-8 text-center">
          <p className="font-serif text-3xl text-cocoa">{wedding.displayRange}</p>
          <p className="mt-3 font-light text-cocoa/80">
            Merci de confirmer votre présence avant le{" "}
            <strong className="font-medium highlight">{wedding.rsvpDeadline}</strong>.
          </p>
        </section>

        <div className="mt-4 space-y-4">
          <Accordion
            icon="mapPin"
            title="Le lieu"
            tint="bg-sand/70"
            iconColor="text-sienna"
            defaultOpen
          >
            <p className="font-medium text-cocoa">{wedding.venue.name}</p>
            <p className="mb-5">{wedding.venue.address}</p>
            <div className="arch overflow-hidden border border-linen p-1.5 bg-cream/70">
              <iframe
                src={mapsEmbedUrl()}
                title={`Carte — ${wedding.venue.name}`}
                className="arch w-full h-60 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={mapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link mt-5 inline-block text-sienna"
            >
              <span className="smallcaps">Ouvrir dans Google Maps</span>
              <Squiggle className="mt-1 h-2 w-full text-camel transition group-hover/link:text-sienna" />
            </a>
          </Accordion>

          <Accordion
            icon="plane"
            title="Comment venir ?"
            tint="bg-terracotta/10"
            iconColor="text-terracotta"
          >
            {/* Itinéraire en 3 étapes : avion → voiture → kasbah */}
            <div className="my-4 flex flex-col items-center gap-2 md:flex-row md:items-start md:justify-center md:gap-0">
              {wedding.journey.map((step, i) => (
                <div key={step.step} className="contents">
                  {i > 0 && (
                    <>
                      <span
                        className="hidden md:block w-14 border-t-2 border-dashed border-camel/60 mt-7"
                        aria-hidden
                      />
                      <span
                        className="md:hidden h-7 border-s-2 border-dashed border-camel/60"
                        aria-hidden
                      />
                    </>
                  )}
                  <div className="flex flex-col items-center text-center md:w-52">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream border border-camel/50 text-sienna">
                      {icons[step.icon as IconName]("h-6 w-6")}
                    </span>
                    <p className="smallcaps text-terracotta mt-3">{step.step}</p>
                    <p className="text-sm mt-1">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mb-5 text-center">
              {wedding.airports
                .map((a) => `${a.name} (${a.code}) ${a.drive}`)
                .join(" · ")}
            </p>
            <ul className="space-y-3 list-none">
              {wedding.travelTips.map((t) => (
                <li key={t} className="flex gap-3">
                  <Tick />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion
            icon="car"
            title="Les transports sur place"
            tint="bg-olive/10"
            iconColor="text-olive"
          >
            <p>{wedding.localTransport}</p>
          </Accordion>

          {wedding.lodging.offered && (
            <Accordion
              icon="bed"
              title="Où dormirez-vous ?"
              tint="bg-camel/15"
              iconColor="text-camel"
            >
              <p className="smallcaps inline-block rounded-full border border-olive/40 bg-olive/10 px-4 py-1.5 text-olive mb-4">
                Hébergement offert
              </p>
              <div className="space-y-4">
                {wedding.lodging.notes.map((n) => (
                  <p key={n}>{n}</p>
                ))}
              </div>
            </Accordion>
          )}

          <Accordion
            icon="heart"
            title="Ce qui est pris en charge"
            tint="bg-sienna/10"
            iconColor="text-sienna"
          >
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
          </Accordion>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
