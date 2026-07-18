import Image from "next/image";
import { wedding } from "@/content/wedding";
import { Sunburst, OliveBranch, PalmLeaf } from "@/components/ornaments";
import { Divider, SiteFooter } from "@/components/site";
import SiteNav from "@/components/site-nav";

export default function Home() {
  const { couple, images } = wedding;
  return (
    <main>
      <SiteNav overlay />

      {/* ─── Héro vidéo ─── */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={images.heroVideo}
          poster={images.heroPoster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-cocoa/45 via-sienna/15 to-cocoa/55"
          aria-hidden
        />
        <div className="relative z-10 mx-6 max-w-3xl px-4 pb-16 text-center">
          <Sunburst className="mx-auto h-9 w-9 text-cream/90 mb-6" />
          <p className="smallcaps text-cream/90 mb-8">
            {couple.partner1} & {couple.partner2}
          </p>
          <h1 className="font-serif italic font-light text-5xl sm:text-7xl text-cream leading-tight drop-shadow-[0_2px_16px_rgba(85,64,44,0.5)]">
            Bienvenue à<br />notre mariage
          </h1>
          <Divider light />
          <p className="font-serif text-2xl text-cream mt-2">
            {wedding.displayDate}
          </p>
          <p className="smallcaps text-cream/85 mt-3">
            {wedding.venue.name} · Sidi Kaouki · Maroc
          </p>
        </div>
        {/* Languette en arche, signature de l'identité */}
        <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
          <div className="arch flex h-20 w-40 items-end justify-center bg-sand/95 pb-3">
            <a href="#suite" aria-label="Découvrir la suite">
              <Sunburst className="h-9 w-9 text-camel transition hover:text-sienna" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Notre histoire, notre concept ─── */}
      <section id="suite" className="relative bg-sand/90 py-24 overflow-hidden scroll-mt-4">
        <PalmLeaf className="pointer-events-none absolute -left-10 -bottom-10 h-64 w-64 text-linen" />
        <div className="relative max-w-5xl mx-auto px-6 space-y-24">
          {wedding.story.map((block, i) => (
            <div
              key={block.title}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              <div
                className={`arch relative overflow-hidden border border-camel/40 p-1.5 bg-cream/70 aspect-[3/4] max-w-md mx-auto w-full ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="arch relative h-full w-full overflow-hidden">
                  {block.media.type === "video" ? (
                    <video
                      className="h-full w-full object-cover"
                      src={block.media.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={block.media.alt}
                    />
                  ) : (
                    <Image
                      src={block.media.src}
                      alt={block.media.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, 440px"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
              <div
                className={`text-center md:text-left ${i % 2 === 1 ? "md:order-1" : ""}`}
              >
                <p className="script text-3xl text-terracotta -rotate-1 mb-3">
                  {block.label.toLowerCase()}
                </p>
                <h2 className="font-serif text-4xl text-sienna mb-6">
                  {block.title}
                </h2>
                <div className="space-y-4 font-light leading-relaxed text-cocoa/80">
                  {block.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <OliveBranch className="mt-8 h-6 w-16 text-olive inline-block" />
              </div>
            </div>
          ))}
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

      <SiteFooter />
    </main>
  );
}
