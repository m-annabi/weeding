import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { logout } from "../login/actions";
import { wedding } from "@/content/wedding";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-sand/40">
      <header className="bg-cocoa text-cream">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          <p className="font-serif italic text-xl text-nude">
            {wedding.couple.partner1} & {wedding.couple.partner2}
          </p>
          <nav className="flex items-center gap-6 text-sm font-light">
            <Link href="/admin" className="hover:text-nude transition">
              📊 Tableau de bord
            </Link>
            <Link href="/admin/invites" className="hover:text-nude transition">
              💌 Invités & groupes
            </Link>
            <Link href="/admin/arrivees" className="hover:text-nude transition">
              ✈️ Arrivées & départs
            </Link>
            <Link href="/admin/hebergements" className="hover:text-nude transition">
              🏨 Hébergements
            </Link>
            <Link href="/" target="_blank" className="hover:text-nude transition">
              🌐 Voir le site
            </Link>
          </nav>
          <form action={logout} className="ms-auto">
            <button className="text-sm text-cream/60 hover:text-cream transition">
              Se déconnecter
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
