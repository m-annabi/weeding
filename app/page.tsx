import Image from "next/image";
import Link from "next/link";
import { wedding } from "@/content/wedding";

type StoryMedia =
  | {
      type: "slider";
      images: readonly string[];
      labels?: readonly string[];
      alt: string;
    }
  | { type: "video"; src: string; alt: string }
  | { type: "image"; src: string; alt: string };
import {
  Sunburst,
  OliveBranch,
  PalmLeaf,
  Waves,
  icons,
} from "@/components/ornaments";
import { Divider, SiteFooter } from "@/components/site";
import SiteNav from "@/components/site-nav";
import StorySlider from "@/components/story-slider";

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
        {/* Voile noir léger pour la lisibilité du texte sur la vidéo */}
        <div className="absolute inset-0 bg-black/25" aria-hidden />
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
          {wedding.story.map((block, i) => {
            const media = block.media as StoryMedia;
            const mediaEl =
              media.type === "slider" ? (
                <StorySlider
                  images={[...media.images]}
                  labels={media.labels ? [...media.labels] : undefined}
                  alt={media.alt}
                />
              ) : media.type === "video" ? (
                <video
                  className="h-full w-full object-cover"
                  src={media.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={media.alt}
                />
              ) : (
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 440px"
                  className="object-cover"
                />
              );
            return (
            <div
              key={block.title}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              {/* Trois écrins différents : arche, ovale sur ombre ocre, polaroid */}
              <div
                className={`relative max-w-sm mx-auto w-full ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                {i === 1 ? (
                  /* Polaroid des souvenirs de voyage */
                  <div className="relative -rotate-2 bg-white p-2.5 pb-14 shadow-[0_16px_44px_rgba(85,64,44,0.2)]">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {mediaEl}
                    </div>
                    <p className="script absolute inset-x-0 bottom-3 text-center text-2xl text-cocoa/75">
                      nos souvenirs depuis 2019…
                    </p>
                  </div>
                ) : (
                  /* Arche marocaine (blocs 1 et 3) */
                  <div className="arch relative overflow-hidden border border-camel/40 p-1.5 bg-cream/70 aspect-[3/4]">
                    <div className="arch relative h-full w-full overflow-hidden">
                      {mediaEl}
                    </div>
                  </div>
                )}
              </div>
              {i === 1 ? (
                /* Dos de carte postale : bloc ocre texturé, timbre et cachet */
                <div className="texture-olive relative rounded-2xl p-8 sm:p-10 text-center md:text-left text-cream shadow-[0_16px_44px_rgba(85,64,44,0.16)] md:order-1">
                  <div
                    className="absolute top-5 right-5 rotate-3 border-2 border-dashed border-cream/60 p-1.5"
                    aria-hidden
                  >
                    <Sunburst className="h-8 w-8 text-cream/90" />
                  </div>
                  <Waves
                    className="absolute top-10 right-24 hidden h-5 w-12 -rotate-12 text-cream/40 sm:block"
                  />
                  <p className="script text-3xl text-cream -rotate-1 mb-3 md:pr-16">
                    {block.label.toLowerCase()}
                  </p>
                  <h2 className="font-serif text-4xl text-cream mb-6 md:pr-14">
                    {block.title}
                  </h2>
                  <div className="space-y-4 font-light leading-relaxed text-cream/90">
                    {block.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              ) : (
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
                {i === 0 ? (
                  <OliveBranch className="mt-8 h-6 w-16 text-olive inline-block" />
                ) : (
                  <span className="mt-8 inline-block text-olive">
                    {icons.tongs("h-8 w-8")}
                  </span>
                )}
              </div>
              )}
            </div>
            );
          })}
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
            {wedding.closing.script}
          </p>
          <Divider light />
          <p className="font-serif italic text-2xl text-cream">
            {wedding.closing.line}
          </p>
        </div>
      </section>

      {/* ─── RSVP ─── */}
      <section className="texture-ocre text-cream py-20 text-center px-6">
        <span className="mx-auto mb-6 block w-fit text-cream/85">
          {icons.surf("h-8 w-8")}
        </span>
        <p className="script text-4xl sm:text-5xl mb-5 -rotate-1">
          répondez-nous vite !
        </p>
        <p className="font-light max-w-xl mx-auto text-cream/90">
          Un onglet dédié sur le site vous permet de répondre directement en
          ligne. Un doute, une question ? Contactez-nous directement.
        </p>
        <Link
          href="/rsvp"
          className="mt-8 inline-block rounded-full bg-cream px-8 py-3 font-medium text-sienna transition hover:bg-sand"
        >
          Répondre en ligne
        </Link>
        <p className="smallcaps mt-8 text-cream/75">
          Réponse souhaitée avant le {wedding.rsvpDeadline}
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
