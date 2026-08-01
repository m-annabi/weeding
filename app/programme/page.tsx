import type { Metadata } from "next";
import Image from "next/image";
import { wedding } from "@/content/wedding";
import { icons, type IconName } from "@/components/ornaments";
import { PageHeader, SiteFooter } from "@/components/site";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = { title: "Programme — Maureen & Akan" };

export default function ProgrammePage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-4xl px-6 pb-24">
        <PageHeader label={wedding.displayRangeShort} title="Le programme" />

        <div className="mt-12 space-y-16 sm:space-y-20">
          {wedding.programme.map((day, i) => {
            const media = day.media as { type: "video" | "image"; src: string; alt: string };
            return (
            <section
              key={day.day}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              <div
                className={`arch relative overflow-hidden border border-brass/40 p-1.5 bg-ivory/70 aspect-[3/4] max-w-xs mx-auto w-full ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <div className="arch relative h-full w-full overflow-hidden">
                  {media.type === "video" ? (
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
                      sizes="(max-width: 768px) 90vw, 320px"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
              <div
                className={`text-center md:text-left ${
                  i % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory border border-brass/50 text-brass mb-4"
                  aria-hidden
                >
                  {icons[day.icon as IconName]("h-5 w-5")}
                </span>
                <p className="smallcaps text-majorelle">{day.day}</p>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mt-1">
                  {day.title}
                </h2>
                <div className="mt-3 space-y-3 font-light text-charcoal/70">
                  {day.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </section>
            );
          })}
        </div>

        <p className="mt-16 rounded-xl border border-linen bg-ivory/60 p-6 font-light text-charcoal/70">
          {wedding.programmeNote}
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
