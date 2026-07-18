import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { token } = await params;
  const guest = await prisma.guest.findUnique({ where: { token } });
  if (!guest) {
    return NextResponse.json({ error: "Invité introuvable" }, { status: 404 });
  }

  const origin = request.nextUrl.origin;
  const url = `${origin}/rsvp/${token}`;
  const png = await QRCode.toBuffer(url, {
    type: "png",
    width: 600,
    margin: 2,
    color: { dark: "#4c382c", light: "#faf6ee" },
  });

  const slug = `${guest.firstName}-${guest.lastName}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-");

  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="qr-${slug}.png"`,
    },
  });
}
