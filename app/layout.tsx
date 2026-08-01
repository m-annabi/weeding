import type { Metadata } from "next";
import { Fraunces, Jost } from "next/font/google";
import { wedding } from "@/content/wedding";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: `${wedding.couple.partner1} & ${wedding.couple.partner2} — Mariage`,
  description: `Mariage de ${wedding.couple.partner1} et ${wedding.couple.partner2} — ${wedding.displayDate}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${fraunces.variable} ${jost.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
