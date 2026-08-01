import { prisma } from "@/lib/prisma";
import { getGuestsFull } from "@/lib/stats";
import { createLodging, deleteLodging, assignLodging } from "./actions";

export const dynamic = "force-dynamic";

const inputCls =
  "rounded-xl border border-linen bg-white px-3 py-2 text-sm font-light focus:outline-none focus:border-terracotta";

function nights(arrival: string | null, departure: string | null) {
  if (!arrival || !departure) return null;
  const n = Math.round(
    (Date.parse(departure) - Date.parse(arrival)) / 86_400_000
  );
  return n > 0 ? n : null;
}

export default async function HebergementsPage() {
  const [guests, lodgings] = await Promise.all([
    getGuestsFull(),
    prisma.lodging.findMany({ orderBy: { name: "asc" } }),
  ]);

  // Invitations confirmées qui souhaitent être logées par les mariés
  const wanting = guests.filter(
    (g) => g.rsvp?.attending && g.rsvp.accommodation === "KASBAH"
  );
  const selfOrganized = guests.filter(
    (g) => g.rsvp?.attending && g.rsvp.accommodation === "OTHER"
  );

  const assignedPax = new Map<string, number>();
  for (const g of wanting) {
    if (!g.lodgingId) continue;
    assignedPax.set(
      g.lodgingId,
      (assignedPax.get(g.lodgingId) ?? 0) + g.rsvp!.participants.length
    );
  }
  const unassigned = wanting.filter((g) => !g.lodgingId);
  const totalWanted = wanting.reduce(
    (s, g) => s + g.rsvp!.participants.length,
    0
  );
  const totalCapacity = lodgings.reduce((s, l) => s + l.capacity, 0);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-sienna">Hébergements</h1>
          <p className="font-light text-cocoa/60 lining-nums">
            {totalWanted} personne{totalWanted > 1 ? "s" : ""} à loger ·{" "}
            {totalCapacity} place{totalCapacity > 1 ? "s" : ""} au total ·{" "}
            {unassigned.length} invitation{unassigned.length > 1 ? "s" : ""} non
            attribuée{unassigned.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          {(["xlsx", "pdf"] as const).map((f) => (
            <a
              key={f}
              href={`/api/admin/export?format=${f}&type=logements`}
              className="rounded-full border border-cocoa/20 bg-white/80 px-4 py-2 text-sm hover:border-terracotta hover:text-terracotta transition"
            >
              ⬇ Rooming list {f.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      {/* Logements & capacités */}
      <section className="rounded-2xl border border-linen bg-white/80 p-6">
        <h2 className="font-serif text-xl text-sienna mb-4">
          🏰 Logements (kasbah & annexes)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {lodgings.map((l) => {
            const used = assignedPax.get(l.id) ?? 0;
            const full = l.capacity > 0 && used >= l.capacity;
            const over = l.capacity > 0 && used > l.capacity;
            return (
              <div
                key={l.id}
                className={`rounded-2xl border p-4 ${
                  over
                    ? "border-terracotta bg-terracotta/10"
                    : "border-linen bg-sand/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-serif text-lg text-cocoa">{l.name}</p>
                  <form action={deleteLodging}>
                    <input type="hidden" name="id" value={l.id} />
                    <button
                      className="text-cocoa/40 hover:text-sienna transition text-sm"
                      title={`Supprimer ${l.name} (les invités redeviennent non attribués)`}
                    >
                      ✕
                    </button>
                  </form>
                </div>
                {l.note && (
                  <p className="text-xs text-cocoa/50 font-light mb-2">{l.note}</p>
                )}
                <div className="h-2 rounded-full bg-linen overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full ${over ? "bg-sienna" : "bg-terracotta"}`}
                    style={{
                      width: `${l.capacity > 0 ? Math.min((used / l.capacity) * 100, 100) : 0}%`,
                    }}
                  />
                </div>
                <p className="mt-1 text-sm text-cocoa/60 font-light lining-nums">
                  {used}/{l.capacity} place{l.capacity > 1 ? "s" : ""}
                  {over && " — dépassement !"}
                  {full && !over && " — complet"}
                </p>
              </div>
            );
          })}
          {lodgings.length === 0 && (
            <p className="text-sm text-cocoa/40 font-light sm:col-span-3">
              Créez la kasbah et vos logements annexes ci-dessous (le nombre de
              places compte en personnes).
            </p>
          )}
        </div>
        <form action={createLodging} className="flex flex-wrap gap-2 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-cocoa/60">Nom du logement *</label>
            <input
              name="name"
              required
              placeholder="Kasbah d'Eau, Villa des Dunes…"
              className={`${inputCls} w-56`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-cocoa/60">Places</label>
            <input
              name="capacity"
              type="number"
              min={0}
              defaultValue={0}
              className={`${inputCls} w-24`}
            />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-40">
            <label className="text-xs text-cocoa/60">Note (optionnel)</label>
            <input
              name="note"
              placeholder="À 5 min à pied, 4 chambres…"
              className={inputCls}
            />
          </div>
          <button className="rounded-full bg-terracotta px-4 py-2 text-sm text-cream hover:bg-sienna transition">
            Ajouter / mettre à jour
          </button>
        </form>
      </section>

      {/* Attribution */}
      <section>
        <h2 className="font-serif text-2xl text-sienna mb-4">
          🛏️ Répartition des invités
        </h2>
        {wanting.length === 0 ? (
          <p className="text-sm text-cocoa/40 font-light">
            Aucune invitation confirmée ne demande de logement pour le moment.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-linen bg-white/80">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-linen text-left text-xs uppercase tracking-wider text-cocoa/50">
                  <th className="px-4 py-3">Invitation</th>
                  <th className="px-4 py-3 text-center">Pers.</th>
                  <th className="px-4 py-3">Séjour</th>
                  <th className="px-4 py-3">Logement attribué</th>
                </tr>
              </thead>
              <tbody>
                {wanting.map((g) => {
                  const r = g.rsvp!;
                  const n = nights(r.arrivalDate, r.departureDate);
                  return (
                    <tr key={g.id} className="border-b border-linen/60 last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-medium text-cocoa">
                          {g.firstName} {g.lastName}
                        </p>
                        <p className="text-xs text-cocoa/50 font-light">
                          {r.participants
                            .map((p) => `${p.firstName} ${p.lastName}`)
                            .join(", ")}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-center lining-nums">
                        {r.participants.length}
                      </td>
                      <td className="px-4 py-3 font-light lining-nums">
                        {r.arrivalDate && r.departureDate ? (
                          <>
                            {r.arrivalDate} → {r.departureDate}
                            {n && (
                              <span className="text-cocoa/50"> ({n} nuits)</span>
                            )}
                          </>
                        ) : (
                          <span className="text-sienna">dates à préciser</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <form action={assignLodging} className="flex gap-2">
                          <input type="hidden" name="guestId" value={g.id} />
                          <select
                            name="lodgingId"
                            defaultValue={g.lodgingId ?? ""}
                            className={`${inputCls} min-w-44`}
                          >
                            <option value="">— Non attribué —</option>
                            {lodgings.map((l) => (
                              <option key={l.id} value={l.id}>
                                {l.name}
                              </option>
                            ))}
                          </select>
                          <button className="rounded-full border border-cocoa/20 px-3 py-1 text-xs hover:border-terracotta hover:text-terracotta transition">
                            OK
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* S'organisent eux-mêmes */}
      {selfOrganized.length > 0 && (
        <section className="rounded-2xl border border-linen bg-white/80 p-5">
          <p className="font-serif text-lg text-sienna mb-2">
            📍 S&apos;organisent par eux-mêmes
          </p>
          <ul className="space-y-1 text-sm">
            {selfOrganized.map((g) => (
              <li key={g.id}>
                <strong className="font-medium">
                  {g.firstName} {g.lastName}
                </strong>{" "}
                <span className="text-cocoa/60 font-light">
                  {g.rsvp?.accommodationOther ?? "lieu non précisé"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
