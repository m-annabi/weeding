import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getGuestsFull, guestStatus } from "@/lib/stats";
import {
  createGuest,
  deleteGuest,
  createGroup,
  deleteGroup,
} from "./actions";
import CopyLinkButton from "./copy-link-button";

export const dynamic = "force-dynamic";

const inputCls =
  "rounded-xl border border-linen bg-white px-3 py-2 text-sm font-light focus:outline-none focus:border-terracotta";

const STATUS_BADGE = {
  attending: { label: "✅ Présent", cls: "bg-olive/15 text-olive border-olive/40" },
  declined: { label: "❌ Absent", cls: "bg-terracotta/10 text-sienna border-terracotta/40" },
  pending: { label: "⏳ En attente", cls: "bg-sand text-cocoa/60 border-linen" },
};

export default async function InvitesPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string; status?: string }>;
}) {
  const { group: groupFilter, status: statusFilter } = await searchParams;
  const [allGuests, groups] = await Promise.all([
    getGuestsFull(),
    prisma.group.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { guests: true } } },
    }),
  ]);

  const guests = allGuests.filter((g) => {
    if (groupFilter && (g.group?.name ?? "none") !== groupFilter) return false;
    if (statusFilter && guestStatus(g) !== statusFilter) return false;
    return true;
  });

  const filterUrl = (params: Record<string, string | undefined>) => {
    const merged = { group: groupFilter, status: statusFilter, ...params };
    const qs = new URLSearchParams();
    if (merged.group) qs.set("group", merged.group);
    if (merged.status) qs.set("status", merged.status);
    const s = qs.toString();
    return `/admin/invites${s ? `?${s}` : ""}`;
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-sienna">Invités & groupes</h1>
          <p className="font-light text-cocoa/60">
            {guests.length} invitation{guests.length > 1 ? "s" : ""} affichée
            {guests.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          {(["csv", "xlsx", "pdf"] as const).map((f) => (
            <a
              key={f}
              href={`/api/admin/export?format=${f}`}
              className="rounded-full border border-cocoa/20 bg-white/80 px-4 py-2 text-sm hover:border-terracotta hover:text-terracotta transition"
            >
              ⬇ {f.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      {/* Ajouter un invité */}
      <section className="rounded-2xl border border-linen bg-white/80 p-6">
        <h2 className="font-serif text-xl text-sienna mb-4">
          ➕ Ajouter une invitation
        </h2>
        <form
          action={createGuest}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 items-end"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs text-cocoa/60">Prénom *</label>
            <input name="firstName" required className={inputCls} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-cocoa/60">Nom *</label>
            <input name="lastName" required className={inputCls} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-cocoa/60">Email</label>
            <input name="email" type="email" className={inputCls} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-cocoa/60">Téléphone</label>
            <input name="phone" className={inputCls} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-cocoa/60">Nb pers. max</label>
            <input
              name="maxGuests"
              type="number"
              min={1}
              max={20}
              defaultValue={1}
              className={inputCls}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-cocoa/60">Groupe</label>
            <div className="flex gap-2">
              <select name="groupId" className={`${inputCls} flex-1`}>
                <option value="">— Aucun —</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
              <button className="rounded-full bg-terracotta px-4 py-2 text-sm text-cream hover:bg-sienna transition">
                Ajouter
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-cocoa/50">Filtrer :</span>
        <Link
          href={filterUrl({ status: undefined })}
          className={`rounded-full border px-3 py-1 ${!statusFilter ? "border-cocoa bg-cocoa text-cream" : "border-cocoa/20 bg-white/70 hover:border-cocoa"}`}
        >
          Tous
        </Link>
        {(
          [
            ["attending", "Présents"],
            ["declined", "Absents"],
            ["pending", "En attente"],
          ] as const
        ).map(([value, label]) => (
          <Link
            key={value}
            href={filterUrl({ status: value })}
            className={`rounded-full border px-3 py-1 ${statusFilter === value ? "border-cocoa bg-cocoa text-cream" : "border-cocoa/20 bg-white/70 hover:border-cocoa"}`}
          >
            {label}
          </Link>
        ))}
        <span className="mx-2 text-linen">|</span>
        <Link
          href={filterUrl({ group: undefined })}
          className={`rounded-full border px-3 py-1 ${!groupFilter ? "border-terracotta bg-terracotta text-cream" : "border-cocoa/20 bg-white/70 hover:border-terracotta"}`}
        >
          Tous les groupes
        </Link>
        {groups.map((g) => (
          <Link
            key={g.id}
            href={filterUrl({ group: g.name })}
            className={`rounded-full border px-3 py-1 ${groupFilter === g.name ? "border-terracotta bg-terracotta text-cream" : "border-cocoa/20 bg-white/70 hover:border-terracotta"}`}
          >
            {g.name} ({g._count.guests})
          </Link>
        ))}
      </div>

      {/* Tableau des invités */}
      <div className="overflow-x-auto rounded-2xl border border-linen bg-white/80">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-linen text-left text-xs uppercase tracking-wider text-cocoa/50">
              <th className="px-4 py-3">Invité</th>
              <th className="px-4 py-3">Groupe</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3 text-center">Places</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-center">Participants</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guests.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-cocoa/40 font-light">
                  Aucun invité ne correspond à ces filtres.
                </td>
              </tr>
            )}
            {guests.map((g) => {
              const status = guestStatus(g);
              const badge = STATUS_BADGE[status];
              return (
                <tr key={g.id} className="border-b border-linen/60 last:border-0">
                  <td className="px-4 py-3 font-medium text-cocoa">
                    {g.firstName} {g.lastName}
                  </td>
                  <td className="px-4 py-3 font-light">
                    {g.group?.name ?? <span className="text-cocoa/30">—</span>}
                  </td>
                  <td className="px-4 py-3 font-light text-cocoa/70">
                    {g.rsvp?.phone ?? g.phone ?? ""}
                    {(g.rsvp?.phone ?? g.phone) && (g.rsvp?.email ?? g.email) && (
                      <br />
                    )}
                    {g.rsvp?.email ?? g.email ?? ""}
                  </td>
                  <td className="px-4 py-3 text-center">{g.maxGuests}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs whitespace-nowrap ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {status === "attending" ? g.rsvp!.participants.length : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <CopyLinkButton token={g.token} />
                      <a
                        href={`/api/admin/qr/${g.token}`}
                        className="rounded-full border border-cocoa/20 px-3 py-1 text-xs hover:border-terracotta hover:text-terracotta transition"
                        title="Télécharger le QR code"
                      >
                        QR
                      </a>
                      <form action={deleteGuest}>
                        <input type="hidden" name="id" value={g.id} />
                        <button
                          className="rounded-full border border-cocoa/20 px-3 py-1 text-xs hover:border-sienna hover:text-sienna transition"
                          title="Supprimer l'invitation"
                        >
                          🗑
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Groupes */}
      <section className="rounded-2xl border border-linen bg-white/80 p-6">
        <h2 className="font-serif text-xl text-sienna mb-4">
          👨‍👩‍👧‍👦 Gérer les groupes
        </h2>
        <div className="flex flex-wrap gap-3 mb-4">
          {groups.map((g) => (
            <span
              key={g.id}
              className="inline-flex items-center gap-2 rounded-full border border-linen bg-sand/70 px-4 py-1.5 text-sm"
            >
              {g.name}
              <span className="text-cocoa/50">({g._count.guests})</span>
              <form action={deleteGroup} className="inline">
                <input type="hidden" name="id" value={g.id} />
                <button
                  className="text-cocoa/40 hover:text-sienna transition"
                  title={`Supprimer le groupe ${g.name} (les invités sont conservés)`}
                >
                  ✕
                </button>
              </form>
            </span>
          ))}
        </div>
        <form action={createGroup} className="flex gap-2 max-w-md">
          <input
            name="name"
            required
            placeholder="Nouveau groupe (ex : Cousins de Lyon)"
            className={`${inputCls} flex-1`}
          />
          <button className="rounded-full bg-terracotta px-4 py-2 text-sm text-cream hover:bg-sienna transition">
            Créer
          </button>
        </form>
      </section>
    </div>
  );
}
