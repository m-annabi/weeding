import { InvitationCard } from "@/components/invitation-reveal";

// Page utilitaire : rendu isolé de la carte (sert à générer l'image de
// l'email d'invitation via une capture headless — fond assorti à l'email).
export default function CartePage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#faf4e8] p-8">
      <div className="w-[300px]" style={{ aspectRatio: "3 / 4.1" }}>
        <InvitationCard className="h-full w-full shadow-[0_18px_44px_rgba(85,64,44,0.28)]" />
      </div>
    </main>
  );
}
