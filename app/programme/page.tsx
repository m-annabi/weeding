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
      <main className="mx-auto max-w-3xl px-6 pb-24">
        <PageHeader label={wedding.displayRangeShort} title="Le programme" />

        <div className="mt-10 divide-y divide-linen/70">
          {wedding.programme.map((day) => {
            const media = day.media as { type: "video" | "image"; src: string; alt: string };
            return (
              <section
                key={day.day}
                className="flex items-start gap-6 sm:gap-10 py-10"
              >
                <div className="relative h-32 w-32 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-full border border-camel/40 p-1 bg-cream/70">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
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
                        sizes="144px"
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <p className="smallcaps text-terracotta flex items-center gap-2">
                    <span className="text-camel">
                      {icons[day.icon as IconName]("h-5 w-5")}
                    </span>
                    {day.day}
                  </p>
                  <h2 className="font-serif text-2xl text-cocoa mt-1">
                    {day.title}
                  </h2>
                  <div className="mt-2 space-y-2.5 font-light text-cocoa/70">
                    {day.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <p className="texture-olive mt-10 rounded-xl p-7 font-light text-cream/95 text-center">
          {wedding.programmeNote}
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
