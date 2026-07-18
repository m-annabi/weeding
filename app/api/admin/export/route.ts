import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { isAdmin } from "@/lib/auth";
import {
  getGuestsFull,
  computeStats,
  guestStatus,
  DIET_LABELS,
  type GuestFull,
} from "@/lib/stats";
import { wedding } from "@/content/wedding";

export const dynamic = "force-dynamic";

const STATUS_LABELS = {
  attending: "Présent",
  declined: "Absent",
  pending: "En attente",
} as const;

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
  "Voiture",
  "Navette",
  "Covoiturage",
  "Commentaire",
];

function guestRow(g: GuestFull): (string | number)[] {
  const status = guestStatus(g);
  const parts = g.rsvp?.attending ? g.rsvp.participants : [];
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
    g.rsvp?.phone ?? g.phone ?? "",
    g.rsvp?.email ?? g.email ?? "",
    g.rsvp?.attending ? (g.rsvp.comesByCar ? "Oui" : "Non") : "",
    g.rsvp?.attending ? (g.rsvp.needsShuttle ? "Oui" : "Non") : "",
    g.rsvp?.attending ? (g.rsvp.offersCarpool ? "Oui" : "Non") : "",
    g.rsvp?.comment ?? "",
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

async function toXlsx(guests: GuestFull[]) {
  const wb = new ExcelJS.Workbook();

  const sheet = wb.addWorksheet("Invitations");
  sheet.addRow(HEADERS);
  sheet.getRow(1).font = { bold: true };
  guests.forEach((g) => sheet.addRow(guestRow(g)));
  sheet.columns.forEach((col) => {
    let max = 12;
    col.eachCell?.((cell) => {
      max = Math.min(Math.max(max, String(cell.value ?? "").length + 2), 50);
    });
    col.width = max;
  });

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

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const format = request.nextUrl.searchParams.get("format") ?? "csv";
  const guests = await getGuestsFull();
  const date = new Date().toISOString().slice(0, 10);
  const base = `reponses-mariage-${date}`;

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
