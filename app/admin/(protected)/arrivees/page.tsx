import { computeStats, getGuestsFull, flightLegs, type FlightLeg } from "@/lib/stats";
import { airportName, wedding } from "@/content/wedding";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function LegsTable({
  legs,
  direction,
}: {
  legs: FlightLeg[];
  direction: "arrival" | "departure";
}) {
  if (legs.length === 0) {
    return (
      <p className="text-sm text-cocoa/40 font-light">
        Aucun vol renseigné pour le moment.
      </p>
    );
  }

  // Regroupement par jour — les vols proches se lisent d'un coup d'œil
  // pour aider les invités à se coordonner (covoiturage, taxis partagés).
  const byDay = new Map<string, FlightLeg[]>();
  for (const leg of legs) {
    if (!byDay.has(leg.date)) byDay.set(leg.date, []);
    byDay.get(leg.date)!.push(leg);
  }

  return (
    <div className="space-y-6">
      {[...byDay.entries()].map(([date, dayLegs]) => {
        const pax = dayLegs.reduce((s, l) => s + l.pax, 0);
        return (
          <div key={date} className="rounded-2xl border border-linen bg-white/80 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-sand/70 px-5 py-3">
              <p className="font-serif text-lg text-cocoa capitalize">
                📅 {formatDate(date)}
              </p>
              <p className="text-sm text-cocoa/60 font-light lining-nums">
                {pax} personne{pax > 1 ? "s" : ""} ·{" "}
                {dayLegs.length} vol{dayLegs.length > 1 ? "s" : ""}
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-linen text-left text-xs uppercase tracking-wider text-cocoa/50">
                  <th className="px-5 py-2">
                    {direction === "arrival" ? "Atterrissage" : "Décollage"}
                  </th>
                  <th className="px-5 py-2">Aéroport</th>
                  <th className="px-5 py-2">Vol</th>
                  <th className="px-5 py-2">Invitation</th>
                  <th className="px-5 py-2 text-center">Pers.</th>
                  <th className="px-5 py-2 text-center">Covoiturage</th>
                  <th className="px-5 py-2">Téléphone</th>
                </tr>
              </thead>
              <tbody>
                {dayLegs.map((leg, i) => (
                  <tr key={i} className="border-b border-linen/60 last:border-0">
                    <td className="px-5 py-2.5 font-medium text-cocoa lining-nums">
                      {leg.time ?? <span className="text-sienna">à préciser</span>}
                    </td>
                    <td className="px-5 py-2.5 font-light">
                      {airportName(leg.airport)}
                    </td>
                    <td className="px-5 py-2.5 font-light">{leg.flight ?? "—"}</td>
                    <td className="px-5 py-2.5">
                      {leg.guest.firstName} {leg.guest.lastName}
                    </td>
                    <td className="px-5 py-2.5 text-center lining-nums">{leg.pax}</td>
                    <td className="px-5 py-2.5 text-center">
                      {leg.offersCarpool ? (
                        <span className="inline-block rounded-full border border-olive/40 bg-olive/15 px-2.5 py-0.5 text-xs text-olive">
                          🤝 Propose
                        </span>
                      ) : (
                        <span className="text-cocoa/30">—</span>
                      )}
                    </td>
                    <td className="px-5 py-2.5 font-light">
                      {leg.guest.rsvp?.phone ?? leg.guest.phone ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default async function ArriveesPage() {
  const guests = await getGuestsFull();
  const stats = computeStats(guests);
  const arrivals = flightLegs(guests, "arrival");
  const departures = flightLegs(guests, "departure");

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-sienna">Arrivées & départs</h1>
          <p className="font-light text-cocoa/60">
            Qui arrive quand et comment — {wedding.venue.name}
          </p>
        </div>
        <div className="flex gap-2">
          {(["xlsx", "pdf"] as const).map((f) => (
            <a
              key={f}
              href={`/api/admin/export?format=${f}&type=arrivees`}
              className="rounded-full border border-cocoa/20 bg-white/80 px-4 py-2 text-sm hover:border-terracotta hover:text-terracotta transition"
            >
              ⬇ Planning {f.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      {/* Invités à relancer */}
      {stats.missingTravelInfo.length > 0 && (
        <div className="rounded-2xl border border-terracotta/50 bg-terracotta/10 p-5">
          <p className="font-serif text-lg text-sienna mb-2">
            ⏳ Infos de voyage manquantes ({stats.missingTravelInfo.length})
          </p>
          <p className="text-sm font-light text-cocoa/70 mb-3">
            Ces invités ont confirmé leur présence mais n&apos;ont pas encore
            renseigné leur mode d&apos;arrivée ou leur vol — pensez à les
            relancer :
          </p>
          <ul className="space-y-1 text-sm">
            {stats.missingTravelInfo.map((g) => (
              <li key={g.id}>
                <strong className="font-medium">
                  {g.firstName} {g.lastName}
                </strong>{" "}
                <span className="text-cocoa/60 font-light">
                  {[g.rsvp?.phone ?? g.phone, g.rsvp?.email ?? g.email]
                    .filter(Boolean)
                    .join(" · ") || "aucune coordonnée"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <section>
        <h2 className="font-serif text-2xl text-sienna mb-4">🛬 Arrivées</h2>
        <LegsTable legs={arrivals} direction="arrival" />
      </section>

      <section>
        <h2 className="font-serif text-2xl text-sienna mb-4">🛫 Départs</h2>
        <LegsTable legs={departures} direction="departure" />
      </section>
    </div>
  );
}
