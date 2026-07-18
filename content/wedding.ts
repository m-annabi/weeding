/**
 * ✏️ TOUTES les informations du mariage se modifient ICI.
 * Aucune autre partie du code n'a besoin d'être touchée.
 */

export const wedding = {
  couple: {
    partner1: "Maureen",
    partner2: "Akan",
  },

  // Date & heure
  displayDate: "Samedi 12 septembre 2026",
  date: "2026-09-12",
  ceremonyTime: "15h00",

  // Date limite de réponse affichée aux invités
  rsvpDeadline: "1er juillet 2026",

  // Lieu
  venue: {
    name: "Domaine de la Roseraie",
    address: "12 chemin des Oliviers, 34000 Montpellier",
    // L'iframe Google Maps est générée à partir de cette recherche (pas de clé API nécessaire)
    mapsQuery: "Domaine de la Roseraie, 12 chemin des Oliviers, 34000 Montpellier",
  },

  // Parking
  parking: [
    "Parking gratuit de 150 places sur le domaine, suivre les panneaux « Mariage ».",
    "Dépose-minute possible devant l'entrée principale pour les personnes à mobilité réduite.",
  ],

  // Hébergements recommandés (laisser le tableau vide [] pour masquer la carte)
  accommodations: [
    {
      name: "Hôtel du Parc",
      detail: "À 5 min du domaine — tarif préférentiel en mentionnant le mariage",
      phone: "04 67 00 00 01",
    },
    {
      name: "Le Clos des Vignes (chambres d'hôtes)",
      detail: "À 10 min en voiture, cadre charmant",
      phone: "04 67 00 00 02",
    },
  ],

  // Déroulement de la journée
  schedule: [
    { time: "15h00", title: "Cérémonie", description: "Sous les arches du jardin", icon: "💍" },
    { time: "17h00", title: "Cocktail", description: "Sur la terrasse, au coucher du soleil", icon: "🥂" },
    { time: "20h00", title: "Repas", description: "Dans l'orangerie", icon: "🍽️" },
    { time: "23h00", title: "Soirée", description: "Piste de danse jusqu'au bout de la nuit", icon: "🎶" },
  ],

  // Contacts utiles
  contacts: [
    { name: "Maureen", role: "La mariée", phone: "06 00 00 00 01" },
    { name: "Akan", role: "Le marié", phone: "06 00 00 00 02" },
    { name: "Sarah", role: "Témoin", phone: "06 00 00 00 03" },
    { name: "Karim", role: "Témoin", phone: "06 00 00 00 04" },
  ],

  // Une navette est-elle proposée ? (affiche l'option dans le formulaire RSVP)
  shuttleOffered: true,
} as const;

export function mapsEmbedUrl() {
  return `https://www.google.com/maps?q=${encodeURIComponent(wedding.venue.mapsQuery)}&output=embed`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.venue.mapsQuery)}`;
}
