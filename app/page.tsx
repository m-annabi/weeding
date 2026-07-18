import Image from "next/image";
import { wedding, mapsEmbedUrl, mapsLink } from "@/content/wedding";
import {
  Sunburst,
  Waves,
  OliveBranch,
  PalmLeaf,
  Squiggle,
  icons,
  type IconName,
} from "@/components/ornaments";

const SCHEDULE_ICONS: Record<string, IconName> = {
  "💍": "rings",
  "🥂": "cocktail",
  "🍽️": "dinner",
  "🎶": "music",
};

function Card({
  icon,
  title,
  children,
  className = "",
}: {
  icon: IconName;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-linen bg-cream/60 rounded-xl p-8 sm:p-10 ${className}`}>
      <div className="flex items-center gap-3 mb-5 text-sienna">
        {icons[icon]("h-6 w-6")}
        <h3 className="font-serif text-2xl">{title}</h3>
      </div>
      <div className="text-cocoa/80 leading-relaxed font-light">{children}</div>
    </div>
  );
}

function Divider({ light = false }: { light?: boolean }) {
  const line = light ? "bg-cream/50" : "bg-nude/60";
  const star = light ? "text-cream" : "text-camel";
  return (
    <div className="flex items-center justify-center gap-5 my-3" aria-hidden>
      <span className={`h-px w-16 ${line}`} />
      <Sunburst className={`h-6 w-6 ${star}`} />
      <span className={`h-px w-16 ${line}`} />
    </div>
  );
}

function Tick() {
  return (
    <span className="mt-1 text-olive" aria-hidden>
      <OliveBranch className="h-3.5 w-9" />
    </span>
  );
}

export default function Home() {
  const { couple, images } = wedding;
  return (
    <main>
      {/* ─── Héro ─── */}
      <section
        className="relative flex min-h-svh items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${images.hero})` }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-cocoa/55 via-sienna/25 to-cocoa/60"
          aria-hidden
        />
        <div className="relative z-10 mx-6 max-w-3xl border border-cream/50 p-2 text-center">
          <div className="border border-cream/30 px-8 py-14 sm:px-16">
            <Sunburst className="mx-auto h-9 w-9 text-cream/90 mb-6" />
            <p className="smallcaps text-cream/90 mb-8">Nous nous marions</p>
            <h1 className="font-serif italic font-light text-6xl sm:text-8xl text-cream leading-none drop-shadow-[0_2px_16px_rgba(85,64,44,0.45)]">
              {couple.partner1}
              <span className="mx-4 not-italic font-serif text-4xl sm:text-5xl text-cream/70 align-middle">
                &
              </span>
              {couple.partner2}
            </h1>
            <Divider light />
            <p className="font-serif text-2xl text-cream mt-2">
              {wedding.displayDate}
            </p>
            <p className="smallcaps text-cream/80 mt-3">
              {wedding.venue.name} · Sidi Kaouki · Maroc
            </p>
          </div>
        </div>
        {/* Languette en arche, signature de l'identité */}
        <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
          <div className="arch flex h-20 w-40 items-end justify-center bg-sand/95 pb-3">
            <a href="#infos" aria-label="Découvrir les informations pratiques">
              <Sunburst className="h-9 w-9 text-camel transition hover:text-sienna" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Galerie ─── */}
      <section className="relative bg-sand/90 py-16 overflow-hidden">
        <PalmLeaf className="pointer-events-none absolute -left-10 -bottom-10 h-64 w-64 text-linen" />
        <div className="relative max-w-4xl mx-auto px-6">
          <p className="smallcaps text-center text-olive mb-10">
            simple · paisible · inoubliable
          </p>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {images.gallery.map((img, i) => (
              <div
                key={img.src}
                className={`arch relative overflow-hidden border border-camel/40 p-1.5 bg-cream/70 aspect-[3/4] ${
                  i === 1 ? "sm:-translate-y-6" : ""
                }`}
              >
                <div className="arch relative h-full w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 33vw, 300px"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Informations pratiques ─── */}
      <section id="infos" className="relative max-w-5xl mx-auto px-6 py-24 scroll-mt-4">
        <p className="smallcaps text-center text-olive mb-3">Le jour J</p>
        <h2 className="font-serif text-4xl text-center text-sienna mb-2">
          Informations pratiques
        </h2>
        <Divider />

        <div className="grid gap-6 sm:grid-cols-2 mt-12">
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
      </section>

      {/* ─── Bande parallax ─── */}
      <section
        className="relative flex min-h-[55vh] items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${images.band})` }}
      >
        <div className="absolute inset-0 bg-cocoa/45" aria-hidden />
        <div className="relative z-10 px-6 py-20 text-center">
          <p className="script text-4xl sm:text-5xl text-cream/95 -rotate-2">
            rendez-vous au Maroc…
          </p>
          <Divider light />
          <p className="font-serif italic text-2xl text-cream">
            les pieds dans le sable, le cœur dans les étoiles
          </p>
        </div>
      </section>

      {/* ─── Déroulement ─── */}
      <section className="bg-sand/90 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className="smallcaps text-center text-olive mb-3">De 15h à l&apos;aube</p>
          <h2 className="font-serif text-4xl text-center text-sienna mb-2">
            Le déroulement de la journée
          </h2>
          <Divider />
          <ol className="mt-12 relative border-s border-camel/50 ms-4 space-y-12">
            {wedding.schedule.map((step) => (
              <li key={step.title} className="ms-9 relative">
                <span
                  className="absolute -start-14 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-cream border border-camel/50 text-sienna"
                  aria-hidden
                >
                  {SCHEDULE_ICONS[step.icon]
                    ? icons[SCHEDULE_ICONS[step.icon]]("h-5 w-5")
                    : step.icon}
                </span>
                <p className="smallcaps text-terracotta">{step.time}</p>
                <h3 className="font-serif text-2xl text-cocoa mt-1">{step.title}</h3>
                <p className="font-light text-cocoa/70">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Contacts ─── */}
      <section className="relative max-w-4xl mx-auto px-6 py-24 overflow-hidden">
        <PalmLeaf className="pointer-events-none absolute -right-14 -top-8 h-56 w-56 -scale-x-100 text-sand" />
        <p className="smallcaps text-center text-olive mb-3">Une question ?</p>
        <h2 className="font-serif text-4xl text-center text-sienna mb-2">
          Contacts utiles
        </h2>
        <Divider />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-12">
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
      </section>

      {/* ─── RSVP ─── */}
      <section className="bg-toffee text-cream py-20 text-center px-6">
        <Sunburst className="mx-auto h-8 w-8 text-cream/80 mb-6" />
        <p className="script text-4xl sm:text-5xl mb-5 -rotate-1">
          répondez-nous vite !
        </p>
        <p className="font-light max-w-xl mx-auto text-cream/90">
          Chaque invitation contient un lien personnel (ou un QR code) vers votre
          formulaire de réponse. Un doute, une question ? Contactez-nous
          directement.
        </p>
        <p className="smallcaps mt-8 text-cream/75">
          Réponse souhaitée avant le {wedding.rsvpDeadline}
        </p>
      </section>

      <footer className="py-10 text-center">
        <Waves className="mx-auto h-5 w-14 text-camel mb-4" />
        <p className="smallcaps text-cocoa/50">
          {couple.partner1} & {couple.partner2} — {wedding.displayDate}
        </p>
      </footer>
    </main>
  );
}
