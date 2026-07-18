import Link from "next/link";
import { computeStats, getGuestsFull, DIET_LABELS } from "@/lib/stats";

export const dynamic = "force-dynamic";

function Tile({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: number | string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? "bg-terracotta text-cream border-terracotta" : "bg-white/80 border-linen"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-wider ${
          accent ? "text-cream/80" : "text-cocoa/50"
        }`}
      >
        {label}
      </p>
      <p className="font-serif text-4xl mt-1 lining-nums">{value}</p>
      {hint && (
        <p className={`text-xs mt-1 ${accent ? "text-cream/70" : "text-cocoa/40"}`}>
          {hint}
        </p>
      )}
    </div>
  );
}

function ListCard({
  title,
  icon,
  items,
  empty,
}: {
  title: string;
  icon: string;
  items: { name: string; detail: string }[];
  empty: string;
}) {
  return (
    <div className="rounded-2xl border border-linen bg-white/80 p-6">
      <h3 className="font-serif text-xl text-sienna mb-3">
        {icon} {title}
      </h3>
      {items.length === 0 ? (
        <p className="text-sm text-cocoa/40 font-light">{empty}</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-medium text-cocoa whitespace-nowrap">
                {item.name} :
              </span>
              <span className="text-cocoa/70 font-light">{item.detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default async function DashboardPage() {
  const guests = await getGuestsFull();
  const stats = computeStats(guests);
  const responseRate =
    stats.totalGuests > 0
      ? Math.round((stats.responded / stats.totalGuests) * 100)
      : 0;

  const diets = [
    { label: DIET_LABELS.VEGETARIAN, value: stats.vegetarian },
    { label: DIET_LABELS.VEGAN, value: stats.vegan },
    { label: DIET_LABELS.HALAL, value: stats.halal },
    { label: DIET_LABELS.GLUTEN_FREE, value: stats.glutenFree },
    { label: "Menus enfant", value: stats.childMenus },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-sienna">Tableau de bord</h1>
          <p className="font-light text-cocoa/60">
            {stats.responded} réponse{stats.responded > 1 ? "s" : ""} sur{" "}
            {stats.totalGuests} invitation{stats.totalGuests > 1 ? "s" : ""} (
            {responseRate}%)
          </p>
        </div>
        <div className="flex gap-2">
          {(["csv", "xlsx", "pdf"] as const).map((f) => (
            <a
              key={f}
              href={`/api/admin/export?format=${f}`}
              className="rounded-full border border-cocoa/20 bg-white/80 px-4 py-2 text-sm hover:border-terracotta hover:text-terracotta transition"
            >
              ⬇ Export {f.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      {/* Chiffres clés */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Tile label="Invitations" value={stats.totalGuests} />
        <Tile label="Réponses reçues" value={stats.responded} hint={`${responseRate}% de réponses`} />
        <Tile label="Présents" value={stats.attending} hint="invitations confirmées" />
        <Tile label="Absents" value={stats.declined} />
        <Tile label="Participants" value={stats.totalParticipants} hint="personnes attendues" accent />
      </div>

      {/* Repas */}
      <section>
        <h2 className="font-serif text-2xl text-sienna mb-4">🍽️ Repas</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {diets.map((d) => (
            <Tile key={d.label} label={d.label} value={d.value} />
          ))}
        </div>
        {stats.otherDiet.length > 0 && (
          <p className="mt-3 text-sm text-cocoa/60 font-light">
            Autres régimes :{" "}
            {stats.otherDiet
              .map((p) => `${p.firstName} ${p.lastName} (${p.dietOther ?? "non précisé"})`)
              .join(", ")}
          </p>
        )}
      </section>

      {/* Allergies, besoins, commentaires */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ListCard
          title="Allergies & intolérances"
          icon="⚠️"
          items={stats.allergies}
          empty="Aucune allergie signalée."
        />
        <ListCard
          title="Besoins particuliers"
          icon="♿"
          items={stats.specialNeeds}
          empty="Aucun besoin particulier signalé."
        />
        <ListCard
          title="Commentaires"
          icon="💬"
          items={stats.comments}
          empty="Aucun commentaire."
        />
      </div>

      {/* Transport */}
      <section>
        <h2 className="font-serif text-2xl text-sienna mb-4">🚗 Transport</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Tile label="Viennent en voiture" value={stats.cars} hint="invitations" />
          <Tile
            label="Navette demandée"
            value={stats.shuttleSeats}
            hint={`personnes (${stats.shuttleInvites.length} invitation${stats.shuttleInvites.length > 1 ? "s" : ""})`}
          />
          <Tile label="Proposent un covoiturage" value={stats.carpoolOffers.length} />
        </div>
        {stats.carpoolOffers.length > 0 && (
          <p className="mt-3 text-sm text-cocoa/60 font-light">
            Covoiturage proposé par :{" "}
            {stats.carpoolOffers
              .map((g) => `${g.firstName} ${g.lastName}${g.rsvp?.phone ? ` (${g.rsvp.phone})` : ""}`)
              .join(", ")}
          </p>
        )}
      </section>

      {/* Par groupe */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-sienna">
            👨‍👩‍👧‍👦 Répartition par groupe
          </h2>
          <Link
            href="/admin/invites"
            className="text-sm text-terracotta hover:text-sienna underline underline-offset-4"
          >
            Gérer les invités →
          </Link>
        </div>
        <div className="space-y-4">
          {[...stats.byGroup.entries()].map(([name, g]) => {
            const rate = g.total > 0 ? Math.round((g.responded / g.total) * 100) : 0;
            return (
              <div
                key={name}
                className="rounded-2xl border border-linen bg-white/80 p-5"
              >
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                  <p className="font-serif text-lg text-cocoa w-44">{name}</p>
                  <div className="flex-1 min-w-40">
                    <div className="h-2 rounded-full bg-linen overflow-hidden">
                      <div
                        className="h-full rounded-full bg-terracotta"
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-cocoa/60 font-light whitespace-nowrap">
                    {g.responded}/{g.total} réponse{g.responded > 1 ? "s" : ""} ·{" "}
                    {g.attending} présent{g.attending > 1 ? "s" : ""} ·{" "}
                    {g.participants} participant{g.participants > 1 ? "s" : ""}
                  </p>
                </div>
                {g.pendingGuests.length > 0 && (
                  <p className="mt-2 text-sm font-light text-cocoa/60">
                    <span className="text-sienna font-medium">À relancer :</span>{" "}
                    {g.pendingGuests
                      .map(
                        (p) =>
                          `${p.name}${p.phone ? ` (${p.phone})` : p.email ? ` (${p.email})` : ""}`
                      )
                      .join(", ")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
