import { Sunburst, Waves, icons, type IconName } from "@/components/ornaments";
import { wedding } from "@/content/wedding";

/** Pictos du déroulement (les emojis de content/wedding.ts restent le fallback). */
export const SCHEDULE_ICONS: Record<string, IconName> = {
  "💍": "rings",
  "🥂": "cocktail",
  "🍽️": "dinner",
  "🎶": "music",
};

export function Divider({ light = false }: { light?: boolean }) {
  const line = light ? "bg-cream/50" : "bg-nude/60";
  const star = light ? "text-cream" : "text-camel";
  return (
    <div className="flex items-center justify-center gap-5 my-3" aria-hidden>
      <span className={`h-px w-16 ${line}`} />
      <Sunburst className={`h-6 w-6 ${star}`} />
      <span className={`h-px w-16 ${line}`} />
    </div>
  );
}

export function Card({
  icon,
  title,
  children,
  className = "",
}: {
  icon: IconName;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-linen bg-cream/60 rounded-xl p-8 sm:p-10 ${className}`}>
      <div className="flex items-center gap-3 mb-5 text-sienna">
        {icons[icon]("h-6 w-6")}
        <h3 className="font-serif text-2xl">{title}</h3>
      </div>
      <div className="text-cocoa/80 leading-relaxed font-light">{children}</div>
    </div>
  );
}

export function Tick() {
  return (
    <span className="mt-1.5 h-px w-6 shrink-0 bg-camel" aria-hidden />
  );
}

/** En-tête de page intérieure (sous le menu fixe). */
export function PageHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="pt-32 pb-4 text-center">
      <p className="smallcaps text-olive mb-3">{label}</p>
      <h1 className="font-serif text-4xl sm:text-5xl text-sienna mb-2">{title}</h1>
      <Divider />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="py-10 text-center">
      <Waves className="mx-auto h-5 w-14 text-camel mb-4" />
      <p className="smallcaps text-cocoa/50">
        {wedding.couple.partner1} & {wedding.couple.partner2} —{" "}
        {wedding.displayDate}
      </p>
    </footer>
  );
}
