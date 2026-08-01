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
  displayDate: "Samedi 29 mai 2027",
  date: "2027-05-29",
  ceremonyTime: "15h00",

  // Date limite de réponse affichée aux invités
  rsvpDeadline: "15 septembre 2026",

  // Lieu
  venue: {
    name: "Kasbah d'Eau",
    address: "Plage de Sidi Kaouki, Essaouira, Maroc",
    // L'iframe Google Maps est générée à partir de cette recherche (pas de clé API nécessaire)
    mapsQuery: "Kasbah d'Eau, Sidi Kaouki, Morocco",
  },

  // Images & vidéos du site (public/images et public/videos)
  images: {
    heroVideo: "/videos/hero-plage.mp4",
    heroPoster: "/images/hero-poster.jpg",
    band: "/images/kasbah.jpg",
  },

  // Les blocs de bienvenue sous le héro (média + texte, alternés)
  story: [
    {
      label: "Merci d'être là",
      title: "Célébrer notre amour avec vous",
      paragraphs: [
        "Plus qu'un mariage, c'est une invitation à vivre des moments qu'on n'oubliera pas. Merci du fond du cœur de faire le voyage pour nous. Ce mariage, c'est bien sûr la célébration de notre amour — mais c'est surtout l'occasion de passer du temps avec les gens qu'on aime.",
        "On a choisi un endroit qui nous ressemble : chaleureux, intimiste et simple. Pas de grandes cérémonies — juste vous, nous, l'océan, et quelques jours qui comptent vraiment.",
      ],
      media: { type: "image", src: "/images/couple.jpg", alt: "Maureen et Akan au soleil couchant" },
    },
    {
      label: "Notre amour du voyage",
      title: "On vous emmène au Maroc",
      paragraphs: [
        "Voyager fait partie de nous. Alors pour un jour aussi important, on a voulu partager cette passion avec vous, en vous emmenant là où on se sent chez nous.",
        "Sidi Kaouki : un petit village de pêcheurs au sud d'Essaouira, entre couchers de soleil, tajines face à l'océan, surfeurs et animaux en liberté. On espère que vous comprendrez, une fois sur place, pourquoi on aime tant cet endroit.",
      ],
      media: { type: "video", src: "/videos/tajine-ocean.mp4", alt: "Tajine face à l'océan à Sidi Kaouki" },
    },
    {
      label: "Notre intention",
      title: "Pour ces quelques jours",
      paragraphs: [
        "On a voulu un mariage authentique, entourés des personnes qu'on aime le plus — une trentaine en tout. L'envie, c'est simple : que chacun vienne comme il est, sans autre attente que de profiter les uns des autres.",
        "Du jeudi 27 au dimanche 30 mai 2027, on prendra le temps de tout savourer : des repas partagés, quelques activités et de bons fous rires, le plaisir de découvrir les lieux à notre rythme — et quelque part au milieu de tout ça, se dire oui.",
      ],
      media: { type: "video", src: "/videos/piscine-plage.mp4", alt: "La piscine de la kasbah face à la plage de Sidi Kaouki" },
    },
  ],

  // Bande image de fin de page
  closing: {
    script: "rendez-vous au Maroc…",
    line: "pour se créer des souvenirs ensemble",
  },

  // Aéroports pour rejoindre la kasbah (codes utilisés dans le formulaire RSVP et le planning des arrivées)
  airports: [
    { code: "ESU", name: "Essaouira-Mogador", drive: "à ≈ 20 min de la kasbah" },
    { code: "RAK", name: "Marrakech-Menara", drive: "à ≈ 2h45 de route" },
    { code: "AGA", name: "Agadir Al-Massira", drive: "à ≈ 2h30 de route" },
  ],

  // Conseils d'accès affichés dans la carte « Comment venir »
  travelTips: [
    "Les vols directs vers Essaouira (ESU) sont les plus pratiques mais peu fréquents — réservez tôt !",
    "Sinon, atterrissez à Marrakech (RAK) : c'est l'aéroport le mieux desservi, puis ≈ 2h45 de route.",
    "Billets d'avion et trajets jusqu'à la kasbah sont à votre charge — indiquez vos horaires de vol dans le formulaire pour faciliter l'organisation et le covoiturage entre invités.",
    "La location de voiture est simple au Maroc et la kasbah dispose d'un parking gratuit.",
  ],

  // Parking (pour ceux qui viennent en voiture)
  parking: [
    "Parking gratuit à la kasbah pour ceux qui viennent en voiture de location.",
    "Dépose-minute devant l'entrée pour les personnes à mobilité réduite.",
  ],

  // Hébergement : la kasbah est privatisée et les logements sont offerts
  lodging: {
    offered: true,
    notes: [
      "Nous privatisons la Kasbah d'Eau : l'hébergement est offert à nos invités. 🤍",
      "Les chambres de la kasbah étant limitées, certains invités seront logés dans des logements annexes à quelques minutes — c'est nous qui répartissons tout le monde.",
      "Indiquez simplement dans le formulaire de réponse si vous souhaitez être logé(e) sur place, ou si vous préférez vous organiser par vous-même.",
    ],
  },

  // Déroulement de la journée
  schedule: [
    { time: "15h00", title: "Cérémonie", description: "Face à l'océan, sur la terrasse de la kasbah", icon: "💍" },
    { time: "17h00", title: "Cocktail", description: "Au coucher du soleil, les pieds dans le sable", icon: "🥂" },
    { time: "20h00", title: "Repas", description: "Sous les étoiles, dans le patio", icon: "🍽️" },
    { time: "23h00", title: "Soirée", description: "Piste de danse jusqu'au bout de la nuit", icon: "🎶" },
  ],

  // Contacts utiles
  contacts: [
    { name: "Maureen", role: "La mariée", phone: "06 00 00 00 01" },
    { name: "Akan", role: "Le marié", phone: "06 00 00 00 02" },
    { name: "Sarah", role: "Témoin", phone: "06 00 00 00 03" },
    { name: "Karim", role: "Témoin", phone: "06 00 00 00 04" },
  ],

  // Une navette aéroport ⇄ kasbah est-elle offerte par les mariés ?
  // (false = les invités gèrent leur trajet ; on collecte quand même vols et horaires)
  transferOffered: false,
} as const;

export function mapsEmbedUrl() {
  return `https://www.google.com/maps?q=${encodeURIComponent(wedding.venue.mapsQuery)}&output=embed`;
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.venue.mapsQuery)}`;
}

export function airportName(code: string | null | undefined) {
  return wedding.airports.find((a) => a.code === code)?.name ?? code ?? "";
}
