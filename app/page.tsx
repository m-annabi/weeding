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

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2" aria-hidden>
      <span className="h-px w-16 bg-nude" />
      <span className="text-olive text-lg">✦</span>
      <span className="h-px w-16 bg-nude" />
    </div>
  );
}

export default function Home() {
  const { couple } = wedding;
  return (
    <main>
      {/* ─── Héro ─── */}
      <section className="relative overflow-hidden bg-sand">
        <div className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="arch border border-nude/70 bg-cream/60 px-8 pt-16 pb-12 sm:px-16">
            <p className="tracking-[0.35em] text-xs uppercase text-olive mb-6">
              Nous nous marions
            </p>
            <h1 className="script text-6xl sm:text-7xl text-terracotta leading-tight">
              {couple.partner1}
              <span className="font-serif italic text-4xl sm:text-5xl text-cocoa/70 mx-3">
                &
              </span>
              {couple.partner2}
            </h1>
            <Divider />
            <p className="font-serif text-2xl text-cocoa mt-2">
              {wedding.displayDate}
            </p>
            <p className="font-light text-cocoa/70 mt-1">
              {wedding.venue.name} · {wedding.venue.address.split(",").pop()}
            </p>
          </div>
          <p className="mt-10 font-serif italic text-xl text-olive">
            simple · soulful · unforgettable
          </p>
        </div>
      </section>

      {/* ─── Informations pratiques ─── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
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

          {wedding.accommodations.length > 0 && (
            <Card icon="🏨" title="Où dormir ?">
              <ul className="space-y-3 list-none">
                {wedding.accommodations.map((a) => (
                  <li key={a.name}>
                    <p className="font-medium text-cocoa">{a.name}</p>
                    <p className="text-sm">{a.detail}</p>
                    <p className="text-sm text-olive">{a.phone}</p>
                  </li>
                ))}
              </ul>
            </Card>
          )}
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
