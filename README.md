# 💍 Site de mariage — Maureen & Akan

Site de mariage complet : page d'informations pratiques, formulaire RSVP avec lien personnel par invité (+ QR code), et tableau de bord privé pour les mariés.

Thème visuel « Terracotta & Botanical / Marrakech » : tons sable, terracotta, sienne, cacao et olive.

## Démarrage

```bash
npm install
cp .env.example .env        # puis personnaliser (voir ci-dessous)
npx prisma db push          # crée la base SQLite (prisma/dev.db)
npx prisma db seed          # crée les groupes + 4 invités de démonstration
npm run dev                 # http://localhost:3000
```

### Variables d'environnement (`.env`)

| Variable | Rôle |
|---|---|
| `DATABASE_URL` | `file:./dev.db` (SQLite) — remplaçable par PostgreSQL en production |
| `ADMIN_PASSWORD` | Mot de passe du tableau de bord des mariés |
| `AUTH_SECRET` | Secret de signature du cookie de session (`openssl rand -hex 32`) |

## Personnaliser le contenu

**Toutes** les informations du mariage (noms, date, heure, lieu, parking, hébergements, déroulement, contacts, navette) se modifient dans **`content/wedding.ts`**. Aucun autre fichier à toucher.

## Pages

| URL | Description |
|---|---|
| `/` | Page publique : informations pratiques, Google Maps, déroulement, contacts |
| `/rsvp/<token>` | Formulaire RSVP personnel d'un invité (lien à envoyer ou QR code) |
| `/admin` | Tableau de bord : statistiques, repas, allergies, transport, relances par groupe |
| `/admin/invites` | Gestion des invités et des groupes, liens personnels, QR codes |

Exports **CSV / Excel / PDF** disponibles depuis le tableau de bord.

## Fonctionnement du RSVP

1. Créez une invitation dans `/admin/invites` (nombre de places incluses par invitation).
2. Copiez le lien personnel (bouton « 🔗 Lien ») ou téléchargez le QR code.
3. L'invité confirme sa présence, ses accompagnants, régimes/allergies, transport…
4. Les réponses apparaissent en temps réel dans le tableau de bord ; les invités peuvent modifier leur réponse en revenant sur leur lien.
