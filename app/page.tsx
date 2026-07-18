import Image from "next/image";
import { wedding, mapsEmbedUrl, mapsLink } from "@/content/wedding";

function Card({
  icon,
  title,
  children,
  className = "",
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/70 border border-linen rounded-2xl p-8 shadow-[0_2px_20px_rgba(76,56,44,0.06)] ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl" aria-hidden>
          {icon}
        </span>
        <h3 className="font-serif text-2xl text-sienna">{title}</h3>
      </div>
      <div className="text-cocoa/80 leading-relaxed font-light">{children}</div>
    </div>
  );
}

function Divider({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-4 my-2" aria-hidden>
      <span className={`h-px w-16 ${light ? "bg-cream/60" : "bg-nude"}`} />
      <span className={light ? "text-cream text-lg" : "text-olive text-lg"}>✦</span>
      <span className={`h-px w-16 ${light ? "bg-cream/60" : "bg-nude"}`} />
    </div>
  );
}

export default function Home() {
  const { couple, images } = wedding;
  return (
    <main>
      {/* ─── Héro parallax ─── */}
      <section
        className="relative flex min-h-svh items-center justify-center bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${images.hero})` }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-cocoa/60 via-cocoa/30 to-cocoa/60"
          aria-hidden
        />
        <div className="relative z-10 mx-6 max-w-3xl border border-cream/40 px-8 py-14 text-center sm:px-16">
          <p className="tracking-[0.35em] text-xs uppercase text-cream/90 mb-6">
            Nous nous marions
          </p>
          <h1 className="script text-6xl sm:text-8xl text-cream leading-tight drop-shadow-[0_2px_12px_rgba(76,56,44,0.5)]">
            {couple.partner1}
            <span className="font-serif italic text-4xl sm:text-5xl text-cream/80 mx-4">
              &
            </span>
            {couple.partner2}
          </h1>
          <Divider light />
          <p className="font-serif text-2xl text-cream mt-2">
            {wedding.displayDate}
          </p>
          <p className="font-light text-cream/85 mt-1">
            {wedding.venue.name} · Sidi Kaouki, Maroc
          </p>
        </div>
        <a
          href="#infos"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/90 text-3xl animate-bounce"
          aria-label="Découvrir les informations pratiques"
        >
          ↓
        </a>
      </section>

      {/* ─── Galerie ─── */}
      <section className="bg-sand/60 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center font-serif italic text-xl text-olive mb-10">
            simple · soulful · unforgettable
          </p>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {images.gallery.map((img, i) => (
              <div
                key={img.src}
                className={`arch relative overflow-hidden border border-nude/60 aspect-[3/4] ${
                  i === 1 ? "sm:-translate-y-6" : ""
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, 300px"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Informations pratiques ─── */}
      <section id="infos" className="max-w-5xl mx-auto px-6 py-20 scroll-mt-4">
        <h2 className="font-serif text-4xl text-center text-sienna mb-2">
          Informations pratiques
        </h2>
        <Divider />

        <div className="grid gap-6 sm:grid-cols-2 mt-10">
          <Card icon="📅" title="La date">
            <p className="text-2xl font-serif text-cocoa">{wedding.displayDate}</p>
            <p className="mt-2">
              Merci de confirmer votre présence avant le{" "}
              <strong className="font-medium">{wedding.rsvpDeadline}</strong>.
            </p>
          </Card>

          <Card icon="🕒" title="La cérémonie">
            <p className="text-2xl font-serif text-cocoa">{wedding.ceremonyTime}</p>
            <p className="mt-2">
              Nous vous attendons un peu en avance pour commencer tous ensemble.
            </p>
          </Card>

          <Card icon="📍" title="Le lieu" className="sm:col-span-2">
            <p className="font-medium text-cocoa">{wedding.venue.name}</p>
            <p className="mb-4">{wedding.venue.address}</p>
            <div className="arch overflow-hidden border border-linen">
              <iframe
                src={mapsEmbedUrl()}
                title={`Carte — ${wedding.venue.name}`}
                className="w-full h-72 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={mapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-terracotta underline underline-offset-4 hover:text-sienna"
            >
              Ouvrir dans Google Maps →
            </a>
          </Card>

          <Card icon="✈️" title="Comment venir ?" className="sm:col-span-2">
            <div className="grid gap-2 sm:grid-cols-3 mb-4">
              {wedding.airports.map((a) => (
                <div
                  key={a.code}
                  className="rounded-xl border border-linen bg-sand/50 px-4 py-3 text-center"
                >
                  <p className="font-medium text-cocoa">
                    {a.name}{" "}
                    <span className="text-xs text-olive">({a.code})</span>
                  </p>
                  <p className="text-sm">{a.drive}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2 list-none">
              {wedding.travelTips.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-olive" aria-hidden>
                    ✦
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Card>

          <Card icon="🚗" title="Parking">
            <ul className="space-y-2 list-none">
              {wedding.parking.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-olive" aria-hidden>
                    ✦
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Card>

          {wedding.lodging.offered && (
            <Card icon="🏨" title="Où dormirez-vous ?">
              <p className="inline-block rounded-full bg-olive/15 border border-olive/40 px-3 py-1 text-sm text-olive mb-3">
                Hébergement offert
              </p>
              <ul className="space-y-2 list-none">
                {wedding.lodging.notes.map((n) => (
                  <li key={n} className="flex gap-2">
                    <span className="text-olive" aria-hidden>
                      ✦
                    </span>
                    {n}
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
          <p className="script text-5xl sm:text-6xl text-cream drop-shadow-[0_2px_12px_rgba(76,56,44,0.6)]">
            Rendez-vous au Maroc
          </p>
          <Divider light />
          <p className="font-serif italic text-xl text-cream/90">
            les pieds dans le sable, le cœur dans les étoiles
          </p>
        </div>
      </section>

      {/* ─── Déroulement ─── */}
      <section className="bg-sand/60 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-center text-sienna mb-2">
            Le déroulement de la journée
          </h2>
          <Divider />
          <ol className="mt-10 relative border-s border-nude/70 ms-4 space-y-10">
            {wedding.schedule.map((step) => (
              <li key={step.title} className="ms-8 relative">
                <span
                  className="absolute -start-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-cream border border-nude text-base"
                  aria-hidden
                >
                  {step.icon}
                </span>
                <p className="font-serif text-xl text-terracotta">{step.time}</p>
                <h3 className="font-serif text-2xl text-cocoa">{step.title}</h3>
                <p className="font-light text-cocoa/70">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Contacts ─── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="font-serif text-4xl text-center text-sienna mb-2">
          Contacts utiles
        </h2>
        <Divider />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {wedding.contacts.map((c) => (
            <div
              key={c.name}
              className="arch bg-white/70 border border-linen px-4 pt-10 pb-6 text-center"
            >
              <p className="font-serif text-xl text-cocoa">{c.name}</p>
              <p className="text-sm text-olive mb-2">{c.role}</p>
              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="text-terracotta hover:text-sienna"
              >
                📞 {c.phone}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ─── RSVP ─── */}
      <section className="bg-terracotta text-cream py-16 text-center px-6">
        <h2 className="script text-5xl mb-4">Répondez-nous vite !</h2>
        <p className="font-light max-w-xl mx-auto">
          Chaque invitation contient un lien personnel (ou un QR code) vers votre
          formulaire de réponse. Un doute, une question ? Contactez-nous
          directement.
        </p>
        <p className="mt-6 font-serif italic text-cream/80">
          Réponse souhaitée avant le {wedding.rsvpDeadline}
        </p>
      </section>

      <footer className="py-8 text-center text-sm text-cocoa/50 font-light">
        {couple.partner1} & {couple.partner2} — {wedding.displayDate}
      </footer>
    </main>
  );
}
