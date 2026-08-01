import Image from "next/image";
import Link from "next/link";
import { wedding } from "@/content/wedding";

type StoryMedia =
  | { type: "slider"; images: readonly string[]; alt: string }
  | { type: "video"; src: string; alt: string }
  | { type: "image"; src: string; alt: string };
import { Sunburst, OliveBranch } from "@/components/ornaments";
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
          className="absolute inset-0 bg-gradient-to-b from-charcoal/45 via-charcoal/15 to-charcoal/55"
          aria-hidden
        />
        <div className="relative z-10 mx-6 max-w-3xl px-4 pb-16 text-center">
          <Sunburst className="mx-auto h-9 w-9 text-ivory/90 mb-6" />
          <p className="smallcaps text-ivory/90 mb-8">
            {couple.partner1} & {couple.partner2}
          </p>
          <h1 className="font-serif italic font-light text-5xl sm:text-7xl text-ivory leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
            Bienvenue à<br />notre mariage
          </h1>
          <Divider light />
          <p className="font-serif text-2xl text-ivory mt-2">
            {wedding.displayDate}
          </p>
          <p className="smallcaps text-ivory/85 mt-3">
            {wedding.venue.name} · Sidi Kaouki · Maroc
          </p>
        </div>
        {/* Indicateur de scroll : anneau fin + soleil, flottement discret */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <a
            href="#suite"
            aria-label="Découvrir la suite"
            className="float-soft flex h-14 w-14 items-center justify-center rounded-full border border-ivory/60 bg-ivory/10 backdrop-blur-sm transition hover:bg-ivory/25"
          >
            <Sunburst className="h-6 w-6 text-ivory" />
          </a>
        </div>
      </section>

      {/* ─── Notre histoire, notre concept ─── */}
      <section id="suite" className="relative bg-sand/90 py-28 overflow-hidden scroll-mt-4">
        <div className="relative max-w-5xl mx-auto px-6 space-y-28">
          {wedding.story.map((block, i) => {
            const media = block.media as StoryMedia;
            return (
            <div
              key={block.title}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              <div
                className={`arch relative overflow-hidden border border-brass/40 p-1.5 bg-ivory/70 aspect-[3/4] max-w-md mx-auto w-full ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="arch relative h-full w-full overflow-hidden">
                  {media.type === "slider" ? (
                    <StorySlider images={[...media.images]} alt={media.alt} />
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
                  )}
                </div>
              </div>
              <div
                className={`text-center md:text-left ${i % 2 === 1 ? "md:order-1" : ""}`}
              >
                <p className="script text-3xl text-majorelle mb-3">
                  {block.label.toLowerCase()}
                </p>
                <h2 className="font-serif text-4xl text-charcoal mb-6">
                  {block.title}
                </h2>
                <div className="space-y-4 font-light leading-relaxed text-charcoal/80">
                  {block.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <OliveBranch className="mt-8 h-6 w-16 text-olive inline-block" />
              </div>
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
        <div className="absolute inset-0 bg-charcoal/45" aria-hidden />
        <div className="relative z-10 px-6 py-20 text-center">
          <p className="script text-4xl sm:text-5xl text-ivory/95">
            {wedding.closing.script}
          </p>
          <Divider light />
          <p className="font-serif italic text-2xl text-ivory">
            {wedding.closing.line}
          </p>
        </div>
      </section>

      {/* ─── RSVP ─── */}
      <section className="bg-majorelle text-ivory py-24 text-center px-6">
        <Sunburst className="mx-auto h-8 w-8 text-ivory/80 mb-6" />
        <p className="script text-4xl sm:text-5xl mb-5">
          répondez-nous vite !
        </p>
        <p className="font-light max-w-xl mx-auto text-ivory/90">
          Un onglet dédié sur le site vous permet de répondre directement en
          ligne. Un doute, une question ? Contactez-nous directement.
        </p>
        <Link
          href="/rsvp"
          className="mt-8 inline-block rounded-full bg-ivory px-8 py-3 font-medium text-majorelle transition hover:bg-sand"
        >
          Répondre en ligne
        </Link>
        <p className="smallcaps mt-8 text-ivory/75">
          Réponse souhaitée avant le {wedding.rsvpDeadline}
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
