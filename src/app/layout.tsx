import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "wefreep.com — La friperie malgache réinventée par l'IA",
  description: "Marketplace IA de vêtements de seconde main à Madagascar. Cherchez par photo, obtenez un prix juste, vendez sans effort.",
  openGraph: { title: "wefreep.com", description: "Marketplace friperie IA — Madagascar", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${spaceGrotesk.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
