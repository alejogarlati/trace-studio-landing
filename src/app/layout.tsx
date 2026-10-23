import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trace Studio | Software a Medida, Automatización & Datos",
  description:
    "Hacemos el software que tu empresa necesita para trabajar sin trabas. Sistemas a medida, automatizaciones y datos de punta a punta.",
  keywords: [
    "Software a medida",
    "Automatización de procesos",
    "Sistemas de gestión",
    "Tableros de datos",
    "Trace Studio",
    "Alejo Garlati",
    "Tucumán",
  ],
  authors: [{ name: "Alejo Garlati" }],
  openGraph: {
    title: "Trace Studio | Software a Medida, Automatización & Datos",
    description:
      "Hacemos el software que tu empresa necesita para trabajar sin trabas. Sistemas a medida, automatizaciones y datos de punta a punta.",
    type: "website",
    locale: "es_AR",
    siteName: "Trace Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="dark"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen selection:bg-[#11ffa1]/30 selection:text-[#11ffa1]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
