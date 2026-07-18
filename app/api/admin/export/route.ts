import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { isAdmin } from "@/lib/auth";
import {
  getGuestsFull,
  computeStats,
  guestStatus,
  flightLegs,
  DIET_LABELS,
  type GuestFull,
  type FlightLeg,
} from "@/lib/stats";
import { wedding, airportName } from "@/content/wedding";

export const dynamic = "force-dynamic";

const STATUS_LABELS = {
  attending: "Présent",
  declined: "Absent",
  pending: "En attente",
} as const;

const MODE_LABELS: Record<string, string> = {
  PLANE: "Avion",
  CAR: "Voiture",
  ON_SITE: "Sur place",
};

const HEADERS = [
  "Groupe",
  "Prénom",
  "Nom",
  "Statut",
  "Nb participants",
  "Participants",
  "Régimes",
  "Allergies",
  "Menus enfant",
  "Besoins particuliers",
  "Téléphone",
  "Email",
  "Mode d'arrivée",
  "Aéroport",
  "Arrivée",
  "Vol aller",
  "Retour",
  "Vol retour",
  "Navette",
  "Hébergement",
  "Covoiturage",
  "Commentaire",
];

function accommodationLabel(g: GuestFull) {
  if (!g.rsvp?.attending || !g.rsvp.accommodation) return "";
  return g.rsvp.accommodation === "KASBAH"
    ? "Kasbah"
    : (g.rsvp.accommodationOther ?? "Ailleurs");
}

function guestRow(g: GuestFull): (string | number)[] {
  const status = guestStatus(g);
  const r = g.rsvp;
  const parts = r?.attending ? r.participants : [];
  const diets = parts
    .filter((p) => p.diet !== "NONE")
    .map(
      (p) =>
        `${p.firstName} : ${DIET_LABELS[p.diet] ?? p.diet}${p.diet === "OTHER" && p.dietOther ? ` (${p.dietOther})` : ""}`
    )
    .join(" | ");
  return [
    g.group?.name ?? "",
    g.firstName,
    g.lastName,
    STATUS_LABELS[status],
    status === "attending" ? parts.length : 0,
    parts.map((p) => `${p.firstName} ${p.lastName}`).join(" | "),
    diets,
    parts.filter((p) => p.allergies).map((p) => `${p.firstName} : ${p.allergies}`).join(" | "),
    parts.filter((p) => p.childMenu).length,
    parts.filter((p) => p.specialNeeds).map((p) => `${p.firstName} : ${p.specialNeeds}`).join(" | "),
    r?.phone ?? g.phone ?? "",
    r?.email ?? g.email ?? "",
    r?.attending ? (MODE_LABELS[r.arrivalMode ?? ""] ?? "") : "",
    r?.attending ? airportName(r.arrivalAirport) : "",
    r?.attending ? [r.arrivalDate, r.arrivalTime].filter(Boolean).join(" ") : "",
    r?.attending ? (r.arrivalFlight ?? "") : "",
    r?.attending ? [r.departureDate, r.departureTime].filter(Boolean).join(" ") : "",
    r?.attending ? (r.departureFlight ?? "") : "",
    r?.attending ? (r.needsTransfer ? "Oui" : "Non") : "",
    accommodationLabel(g),
    r?.attending ? (r.offersCarpool ? "Oui" : "Non") : "",
    r?.comment ?? "",
  ];
}

function toCsv(guests: GuestFull[]) {
  const escape = (v: string | number) => {
    const s = String(v);
    return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [HEADERS, ...guests.map(guestRow)].map((row) =>
    row.map(escape).join(";")
  );
  // BOM pour qu'Excel (FR) ouvre le fichier en UTF-8 avec séparateur « ; »
  return "\ufeff" + lines.join("\r\n");
}

function autoWidth(sheet: ExcelJS.Worksheet) {
  sheet.columns.forEach((col) => {
    let max = 12;
    col.eachCell?.((cell) => {
      max = Math.min(Math.max(max, String(cell.value ?? "").length + 2), 50);
    });
    col.width = max;
  });
}

async function toXlsx(guests: GuestFull[]) {
  const wb = new ExcelJS.Workbook();

  const sheet = wb.addWorksheet("Invitations");
  sheet.addRow(HEADERS);
  sheet.getRow(1).font = { bold: true };
  guests.forEach((g) => sheet.addRow(guestRow(g)));
  autoWidth(sheet);

  const pSheet = wb.addWorksheet("Participants");
  pSheet.addRow([
    "Groupe",
    "Invitation",
    "Prénom",
    "Nom",
    "Régime",
    "Précision régime",
    "Allergies",
    "Menu enfant",
    "Besoins particuliers",
  ]);
  pSheet.getRow(1).font = { bold: true };
  for (const g of guests) {
    if (!g.rsvp?.attending) continue;
    for (const p of g.rsvp.participants) {
      pSheet.addRow([
        g.group?.name ?? "",
        `${g.firstName} ${g.lastName}`,
        p.firstName,
        p.lastName,
        DIET_LABELS[p.diet] ?? p.diet,
        p.dietOther ?? "",
        p.allergies ?? "",
        p.childMenu ? "Oui" : "Non",
        p.specialNeeds ?? "",
      ]);
    }
  }
  pSheet.columns.forEach((col) => (col.width = 18));

  return wb.xlsx.writeBuffer();
}

function toPdf(guests: GuestFull[]) {
  const stats = computeStats(guests);
  const doc = new jsPDF({ orientation: "landscape", format: "a4" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(
    `Mariage ${wedding.couple.partner1} & ${wedding.couple.partner2} — Réponses des invités`,
    14,
    15
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    [
      `Invitations : ${stats.totalGuests}   Réponses : ${stats.responded}   Présents : ${stats.attending}   Absents : ${stats.declined}   En attente : ${stats.pending}   Participants : ${stats.totalParticipants}`,
      `Repas — Végétarien : ${stats.vegetarian}   Vegan : ${stats.vegan}   Halal : ${stats.halal}   Sans gluten : ${stats.glutenFree}   Menus enfant : ${stats.childMenus}`,
    ],
    14,
    23
  );

  autoTable(doc, {
    startY: 32,
    head: [
      [
        "Groupe",
        "Invité",
        "Statut",
        "Nb",
        "Participants",
        "Régimes",
        "Allergies",
        "Besoins",
        "Contact",
      ],
    ],
    body: guests.map((g) => {
      const row = guestRow(g);
      return [
        row[0],
        `${row[1]} ${row[2]}`,
        row[3],
        row[4],
        row[5],
        row[6],
        row[7],
        row[9],
        [row[10], row[11]].filter(Boolean).join("\n"),
      ];
    }),
    styles: { fontSize: 7.5, cellPadding: 1.5, overflow: "linebreak" },
    headStyles: { fillColor: [185, 106, 75] },
    alternateRowStyles: { fillColor: [250, 246, 238] },
  });

  return doc.output("arraybuffer");
}

/* ─── Planning chauffeur (navettes aéroport) ─── */

const LEG_HEADERS = [
  "Date",
  "Heure",
  "Aéroport",
  "Vol",
  "Invitation",
  "Personnes",
  "Covoiturage",
  "Téléphone",
];

function legRow(leg: FlightLeg) {
  return [
    leg.date,
    leg.time ?? "à préciser",
    airportName(leg.airport),
    leg.flight ?? "",
    `${leg.guest.firstName} ${leg.guest.lastName}`,
    leg.pax,
    leg.offersCarpool ? "Propose" : "",
    leg.guest.rsvp?.phone ?? leg.guest.phone ?? "",
  ];
}

async function transfersXlsx(guests: GuestFull[]) {
  const wb = new ExcelJS.Workbook();
  for (const [title, direction] of [
    ["Arrivées", "arrival"],
    ["Départs", "departure"],
  ] as const) {
    const sheet = wb.addWorksheet(title);
    sheet.addRow(LEG_HEADERS);
    sheet.getRow(1).font = { bold: true };
    flightLegs(guests, direction).forEach((leg) => sheet.addRow(legRow(leg)));
    autoWidth(sheet);
  }
  return wb.xlsx.writeBuffer();
}

function transfersPdf(guests: GuestFull[]) {
  const doc = new jsPDF({ orientation: "landscape", format: "a4" });
  const arrivals = flightLegs(guests, "arrival");
  const departures = flightLegs(guests, "departure");
  const arrivalPax = arrivals.reduce((s, l) => s + l.pax, 0);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(
    `Planning des arrivées — ${wedding.venue.name} (${wedding.displayDate})`,
    14,
    15
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `${arrivalPax} personne(s) arrivant en avion. Trajets : Essaouira = 20 min, Marrakech = 2h45, Agadir = 2h30. Lignes en gras = covoiturage proposé.`,
    14,
    22
  );

  let y = 28;
  for (const [title, legs] of [
    ["ARRIVÉES", arrivals],
    ["DÉPARTS", departures],
  ] as const) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, 14, y + 4);
    autoTable(doc, {
      startY: y + 7,
      head: [LEG_HEADERS],
      body: legs.map(legRow),
      styles: { fontSize: 8.5, cellPadding: 1.8, overflow: "linebreak" },
      headStyles: { fillColor: [185, 106, 75] },
      alternateRowStyles: { fillColor: [250, 246, 238] },
      didParseCell: (data) => {
        if (data.section === "body" && legs[data.row.index]?.offersCarpool) {
          data.cell.styles.fontStyle = "bold";
        }
      },
    });
    y =
      (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
        .finalY + 8;
  }

  return doc.output("arraybuffer");
}

/* ─── Rooming list (répartition dans les logements) ─── */

const ROOM_HEADERS = [
  "Logement",
  "Invitation",
  "Participants",
  "Personnes",
  "Arrivée",
  "Départ",
  "Téléphone",
];

function roomingByLodging(guests: GuestFull[]) {
  const wanting = guests.filter(
    (g) => g.rsvp?.attending && g.rsvp.accommodation === "KASBAH"
  );
  const byLodging = new Map<string, GuestFull[]>();
  for (const g of wanting) {
    const key = g.lodging?.name ?? "⚠ Non attribué";
    if (!byLodging.has(key)) byLodging.set(key, []);
    byLodging.get(key)!.push(g);
  }
  return byLodging;
}

function roomRow(g: GuestFull): (string | number)[] {
  const r = g.rsvp!;
  return [
    g.lodging?.name ?? "Non attribué",
    `${g.firstName} ${g.lastName}`,
    r.participants.map((p) => `${p.firstName} ${p.lastName}`).join(" | "),
    r.participants.length,
    r.arrivalDate ?? "",
    r.departureDate ?? "",
    r.phone ?? g.phone ?? "",
  ];
}

async function roomingXlsx(guests: GuestFull[]) {
  const wb = new ExcelJS.Workbook();
  const sheet = wb.addWorksheet("Rooming list");
  sheet.addRow(ROOM_HEADERS);
  sheet.getRow(1).font = { bold: true };
  for (const group of roomingByLodging(guests).values()) {
    group.forEach((g) => sheet.addRow(roomRow(g)));
  }
  autoWidth(sheet);
  return wb.xlsx.writeBuffer();
}

function roomingPdf(guests: GuestFull[]) {
  const doc = new jsPDF({ orientation: "landscape", format: "a4" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(
    `Rooming list — ${wedding.venue.name} (${wedding.displayDate})`,
    14,
    15
  );

  let y = 22;
  for (const [lodgingName, group] of roomingByLodging(guests).entries()) {
    const pax = group.reduce((s, g) => s + g.rsvp!.participants.length, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${lodgingName} — ${pax} personne(s)`, 14, y + 4);
    autoTable(doc, {
      startY: y + 7,
      head: [ROOM_HEADERS.slice(1)],
      body: group.map((g) => roomRow(g).slice(1)),
      styles: { fontSize: 8.5, cellPadding: 1.8, overflow: "linebreak" },
      headStyles: { fillColor: [185, 106, 75] },
      alternateRowStyles: { fillColor: [250, 246, 238] },
    });
    y =
      (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
        .finalY + 8;
  }

  return doc.output("arraybuffer");
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const format = request.nextUrl.searchParams.get("format") ?? "csv";
  const rawType = request.nextUrl.searchParams.get("type") ?? "reponses";
  const type = rawType === "navettes" ? "arrivees" : rawType;
  const guests = await getGuestsFull();
  const date = new Date().toISOString().slice(0, 10);
  const base = `${
    type === "arrivees"
      ? "planning-arrivees"
      : type === "logements"
        ? "rooming-list"
        : "reponses-mariage"
  }-${date}`;

  if (type === "logements") {
    if (format === "xlsx") {
      const buffer = await roomingXlsx(guests);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${base}.xlsx"`,
        },
      });
    }
    return new NextResponse(roomingPdf(guests), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${base}.pdf"`,
      },
    });
  }

  if (type === "arrivees") {
    if (format === "xlsx") {
      const buffer = await transfersXlsx(guests);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${base}.xlsx"`,
        },
      });
    }
    return new NextResponse(transfersPdf(guests), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${base}.pdf"`,
      },
    });
  }

  if (format === "csv") {
    return new NextResponse(toCsv(guests), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${base}.csv"`,
      },
    });
  }
  if (format === "xlsx") {
    const buffer = await toXlsx(guests);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${base}.xlsx"`,
      },
    });
  }
  if (format === "pdf") {
    return new NextResponse(toPdf(guests), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${base}.pdf"`,
      },
    });
  }
  return NextResponse.json({ error: "Format inconnu" }, { status: 400 });
}
