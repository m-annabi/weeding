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
  // Séjour complet (affiché sur les pages Infos/Programme et en pied de page)
  displayRange: "Du jeudi 27 mai au dimanche 30 mai 2027",
  displayRangeShort: "du 27 au 30 mai 2027",

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
    band: "/images/kasbah-sunset.jpg",
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
      // Diaporama : tous les souvenirs de voyage (public/images/souvenirs,
      // ordre chronologique)
      media: {
        type: "slider",
        images: Array.from(
          { length: 25 },
          (_, i) =>
            `/images/souvenirs/souvenir-${String(i + 1).padStart(2, "0")}.jpg`
        ),
        alt: "Nos voyages et nos moments ensemble depuis 2019",
      },
    },
    {
      label: "Notre intention",
      title: "Pour ces quelques jours",
      paragraphs: [
        "On a voulu un mariage authentique, entourés des personnes qu'on aime le plus — une trentaine en tout. L'envie, c'est simple : que chacun vienne comme il est, sans autre attente que de profiter les uns des autres.",
        "Du jeudi 27 au dimanche 30 mai 2027, on prendra le temps de tout savourer : des repas partagés, quelques activités et de bons fous rires, le plaisir de découvrir les lieux à notre rythme — et quelque part au milieu de tout ça, se dire oui.",
      ],
      media: { type: "video", src: "/videos/tajine-ocean.mp4", alt: "Tajine face à l'océan à Sidi Kaouki" },
    },
  ],

  // Bande image de fin de page
  closing: {
    script: "rendez-vous au Maroc…",
    line: "pour se créer des souvenirs ensemble",
  },

  // Aéroports pour rejoindre la kasbah (codes utilisés dans le formulaire RSVP et le planning des arrivées)
  // Ordre d'affichage : Essaouira en dernier (petit aéroport, peu desservi)
  airports: [
    { code: "RAK", name: "Marrakech-Menara", drive: "à ≈ 2h45 de route" },
    { code: "AGA", name: "Agadir Al-Massira", drive: "à ≈ 2h30 de route" },
    { code: "ESU", name: "Essaouira-Mogador", drive: "à ≈ 20 min de la kasbah" },
  ],

  // Itinéraire en 3 étapes affiché en tête de « Comment venir ? »
  journey: [
    { icon: "plane", step: "1 — L'avion", text: "Atterrissez à Marrakech, Agadir ou Essaouira" },
    { icon: "car", step: "2 — La voiture", text: "Chauffeur ou voiture de location jusqu'à la kasbah" },
    { icon: "home", step: "Vous y êtes", text: "Kasbah d'Eau, plage de Sidi Kaouki" },
  ],

  // Conseils d'accès affichés dans la carte « Comment venir » (parking inclus)
  travelTips: [
    "Marrakech (RAK) reste l'aéroport le mieux desservi si vous cherchez un vol depuis chez vous.",
    "Essaouira (ESU) est tout près, mais c'est un petit aéroport qui dessert peu de villes : il y a peu de chances que ce soit celui que vous trouviez pour votre trajet. Si vous avez la chance d'y avoir un vol direct, tant mieux !",
    "Le plus simple reste de réserver un chauffeur qui vous emmène et vous ramène, très simple à organiser — comptez en moyenne 70 à 85€ le trajet aller, et autant pour le retour. N'hésitez pas à vous mutualiser à plusieurs pour réduire les coûts.",
    "Si vous vous en sentez, vous pouvez aussi louer une voiture — sachez juste que les routes ne sont pas toujours en très bon état. Un parking gratuit est disponible à la kasbah.",
  ],

  // Les transports sur place
  localTransport:
    "Sur place, si besoin de vous déplacer, les taxis ne coûtent presque rien. On organisera aussi quelques sorties pour se balader à Essaouira, et vous serez bien sûr libres d'y aller quand bon vous semble.",

  // Dress code
  dressCode: [
    "Pas de dress code imposé, on veut avant tout que vous soyez à l'aise. Pour le samedi, jour du mariage, on vous demande simplement de prévoir une tenue habillée.",
    "Pour le reste du séjour, venez comme vous en avez envie — confortable, décontracté, à votre image.",
  ],

  // Hébergement : la kasbah est privatisée et les logements sont offerts
  lodging: {
    offered: true,
    website: "https://kasbahdeau.com",
    notes: [
      "On a voulu prendre en charge le logement pour permettre à chacun de venir. L'idée, c'est d'être tous au même endroit, ensemble, tout en respectant le rythme et la vie de chacun.",
      "Des chambres adaptées sont prévues pour les parents. Si vous avez des besoins essentiels (lit bébé, etc.), indiquez-les dans le formulaire — on s'occupe du reste.",
    ],
  },

  // Ce qui est pris en charge (transparence sur les coûts)
  covered: {
    intro: "Pour être transparents sur l'organisation :",
    included: [
      "l'hébergement",
      "les petits déjeuners",
      "le repas du vendredi soir",
      "le repas du samedi soir",
      "le brunch du dimanche",
    ],
    excluded: [
      "le billet d'avion",
      "le trajet aller-retour jusqu'à la kasbah",
      "les autres repas",
      "les activités",
    ],
  },

  // Programme des quelques jours (une entrée par journée)
  programme: [
    {
      day: "Jeudi 27 mai",
      title: "Arrivée à l'hôtel",
      icon: "home",
      paragraphs: [
        "Vous pouvez arriver dès 14h. On profite d'une soirée tranquille, avec un repas à la kasbah pour ceux qui le souhaitent.",
      ],
      media: { type: "video", src: "/videos/programme-jeudi.mp4", alt: "Dromadaire sur la plage de Sidi Kaouki" },
    },
    {
      day: "Vendredi 28 mai",
      title: "Une journée libre, à vivre comme vous le sentez",
      icon: "sun",
      paragraphs: [
        "On organisera quelques activités selon l'envie du moment — surf, quad, hammam, yoga. Rien d'obligatoire : ceux qui ont envie nous rejoignent, ceux qui préfèrent un moment pour eux ou se poser à la piscine en profitent aussi.",
        "Sur place, à l'hôtel, vous avez une salle de sport, une piscine, un billard, des échecs, et la plage juste en face pour profiter et vous ressourcer.",
        "Le soir, direction Essaouira : repas tous ensemble au restaurant, puis balade dans la ville.",
      ],
      media: { type: "video", src: "/videos/programme-vendredi.mp4", alt: "Kitesurf sur la plage de Sidi Kaouki" },
    },
    {
      day: "Samedi 29 mai",
      title: "Le jour du mariage",
      icon: "rings",
      paragraphs: [
        "Le matin, quartier libre pour tout le monde. Nos témoins et nous serons de notre côté pour la cérémonie religieuse en petit comité. L'après-midi, cérémonie tous ensemble, suivie d'un cocktail au bord de la piscine. Le soir, repas convivial à la kasbah et soirée animée.",
      ],
      media: { type: "video", src: "/videos/piscine-plage.mp4", alt: "La piscine de la kasbah face à la plage" },
    },
    {
      day: "Dimanche 30 mai",
      title: "Brunch et retour tranquille",
      icon: "dinner",
      paragraphs: [
        "On termine ces quelques jours par un brunch ensemble, avant un retour tranquille à la maison.",
      ],
      media: { type: "video", src: "/videos/programme-dimanche.mp4", alt: "Un chat de la kasbah au soleil" },
    },
  ],

  // Note affichée sous le programme
  programmeNote:
    "Chacun vient comme il peut et comme il veut : libre à vous d'arriver plus tôt, de repartir plus tard, de participer à tout ou de ne rien faire du tout. Rien n'est obligatoire — l'essentiel, c'est de profiter de ces quelques jours à votre rythme.",

  // Contacts utiles
  contacts: [
    { name: "Maureen", role: "La mariée", phone: "06 00 00 00 01" },
    { name: "Akan", role: "Le marié", phone: "06 00 00 00 02" },
    { name: "Sarah", role: "Témoin", phone: "06 00 00 00 03" },
    { name: "Karim", role: "Témoin", phone: "06 00 00 00 04" },
  ],

  // Email d'invitation envoyé depuis /admin/invites
  invitationEmail: {
    subject: "Notre mariage au Maroc — votre invitation 💌",
    intro:
      "On se marie ! Et on aimerait plus que tout que vous soyez là. Rendez-vous à la Kasbah d'Eau, un petit coin de paradis face à l'océan, à Sidi Kaouki au Maroc.",
    linkLabel: "Répondre à l'invitation",
    outro:
      "Sur votre page personnelle, vous trouverez toutes les infos pratiques (comment venir, où vous dormirez, le programme) et le formulaire de réponse — vous pourrez y revenir à tout moment pour modifier votre réponse.",
    signature: "Avec tout notre amour,",
  },

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
