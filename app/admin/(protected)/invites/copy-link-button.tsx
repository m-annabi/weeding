"use client";

import { useState } from "react";

export default function CopyLinkButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        const url = `${window.location.origin}/rsvp/${token}`;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`rounded-full border px-3 py-1 text-xs transition ${
        copied
          ? "border-olive bg-olive/10 text-olive"
          : "border-cocoa/20 hover:border-terracotta hover:text-terracotta"
      }`}
      title="Copier le lien personnel"
    >
      {copied ? "✓ Copié !" : "🔗 Lien"}
    </button>
  );
}
