import type { Metadata } from "next";
import { Fraunces, Jost, Caveat } from "next/font/google";
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

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-hand",
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
        className={`${fraunces.variable} ${jost.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
