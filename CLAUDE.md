@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

French-language wedding website ("weeding" is a typo kept as the repo name): public info page, per-guest RSVP forms accessed via unique token links/QR codes, and a password-protected couple's dashboard. UI copy is entirely in French.

## Commands

```bash
npm run dev              # dev server on :3000
npm run build            # production build
npm run lint             # ESLint
npx tsc --noEmit         # type check

npx prisma db push       # push schema to SQLite (prisma/dev.db, no migrations)
npx prisma db seed       # seed groups + demo guests (tsx prisma/seed.ts)
npx prisma studio        # inspect DB
```

No test framework is configured. `.env` needs `DATABASE_URL` (SQLite `file:./dev.db`), `ADMIN_PASSWORD`, `AUTH_SECRET` — see `.env.example`.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Prisma 6 + SQLite (intentionally pinned to v6 — v7 requires driver adapters), exceljs/jspdf for exports, qrcode for QR PNGs.

## Architecture

- **`content/wedding.ts`** — single source of truth for all wedding content (names, date, venue, schedule, contacts…). Edit here, never hardcode wedding facts in components.
- **Data model** (`prisma/schema.prisma`): `Group` → `Guest` (has unique `token` used as the personal RSVP URL, and `maxGuests` = seats covered by the invitation) → `Rsvp` (1:1 with Guest) → `Participant` (one row per attendee; `diet` is a string enum NONE/VEGETARIAN/VEGAN/HALAL/GLUTEN_FREE/OTHER because SQLite has no Prisma enums). `Rsvp` also carries travel data (arrivalMode PLANE/CAR/ON_SITE, airport, flight dates/times, `accommodation` KASBAH/OTHER = wants couple-provided lodging or self-organized). `Lodging` (name + capacity in persons) is assigned per invitation via `Guest.lodgingId` in `/admin/hebergements`.
- **Business context**: destination wedding at Kasbah d'Eau (Sidi Kaouki, Morocco). Lodging is offered by the couple (privatized hotel + annexes, they assign rooms); flights and transfers are NOT offered — flight info is still collected for the `/admin/arrivees` planning and guest carpooling (`transferOffered: false` in `content/wedding.ts` hides the shuttle checkbox).
- **Auth** (`lib/auth.ts`): single admin password from env; session cookie = HMAC(AUTH_SECRET, password), verified with `isAdmin()`. There is **no middleware** — protection lives in `app/admin/(protected)/layout.tsx` (redirect), and every admin server action / API route re-checks `isAdmin()` itself. Keep that invariant when adding admin surface.
- **Route layout**: `app/admin/login` sits outside the `(protected)` route group on purpose. RSVP submission is a server action (`app/rsvp/[token]/actions.ts`) that upserts the Rsvp and fully replaces its participants in a transaction.
- **Stats & exports**: `lib/stats.ts` (`getGuestsFull` + `computeStats`) is shared by the dashboard page and `app/api/admin/export/route.ts` (CSV with `;` separator + BOM for French Excel, XLSX 2 sheets, PDF via jspdf-autotable). Add new metrics there, not in pages.
- **Theme**: Tailwind v4 tokens in `app/globals.css` (`@theme` for the terracotta/Marrakech palette). Fonts come from `next/font` variables on `<body>`; font tokens referencing them **must stay in `@theme inline`** (plain `@theme` silently drops `var()` references). Cormorant needs `lining-nums` for stat figures.
