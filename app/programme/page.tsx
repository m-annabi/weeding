import type { Metadata } from "next";
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

        <ol className="mt-10 relative border-s border-camel/50 ms-4 space-y-12">
          {wedding.programme.map((day) => (
            <li key={day.day} className="ms-9 relative">
              <span
                className="absolute -start-14 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-cream border border-camel/50 text-sienna"
                aria-hidden
              >
                {icons[day.icon as IconName]("h-5 w-5")}
              </span>
              <p className="smallcaps text-terracotta">{day.day}</p>
              <h2 className="font-serif text-2xl text-cocoa mt-1">{day.title}</h2>
              <div className="mt-2 space-y-3 font-light text-cocoa/70">
                {day.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-14 rounded-xl border border-linen bg-cream/60 p-6 font-light text-cocoa/70">
          {wedding.programmeNote}
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
