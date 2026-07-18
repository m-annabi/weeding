"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sunburst } from "@/components/ornaments";

const LINKS = [
  { href: "/infos", label: "Infos pratiques" },
  { href: "/programme", label: "Programme" },
  { href: "/contacts", label: "Contacts" },
];

/**
 * Menu fixe discret : transparent posé sur le héro (page d'accueil),
 * voile ivoire flouté dès qu'on défile ou sur les pages intérieures.
 */
export default function SiteNav({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overlay || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-linen/70 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5 transition-colors duration-300 ${
          solid ? "text-cocoa" : "text-cream"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 transition hover:opacity-70"
          aria-label="Accueil"
        >
          <Sunburst className={`h-5 w-5 ${solid ? "text-camel" : "text-cream/90"}`} />
          <span className="font-serif italic text-lg leading-none">M & A</span>
        </Link>
        <div className="flex items-center gap-5 sm:gap-9">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`smallcaps !text-[0.62rem] sm:!text-[0.68rem] whitespace-nowrap transition hover:opacity-70 ${
                  active ? (solid ? "text-sienna" : "underline underline-offset-8") : ""
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
