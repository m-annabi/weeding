import type { Metadata } from "next";
import { wedding } from "@/content/wedding";
import { icons } from "@/components/ornaments";
import { PageHeader, SiteFooter, SCHEDULE_ICONS } from "@/components/site";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = { title: "Programme — Maureen & Akan" };

export default function ProgrammePage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 pb-24">
        <PageHeader label="De 15h à l'aube" title="Le programme de la journée" />

        <ol className="mt-10 relative border-s border-camel/50 ms-4 space-y-12">
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
              <h2 className="font-serif text-2xl text-cocoa mt-1">{step.title}</h2>
              <p className="font-light text-cocoa/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </>
  );
}
