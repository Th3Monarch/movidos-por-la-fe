import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Movidos por la Fe — Conectemos la ayuda con quien más la necesita",
  description:
    "Plataforma ciudadana para reportar y coordinar ayuda en comunidades afectadas por el terremoto en Venezuela.",
  applicationName: "Movidos por la Fe",
  keywords: "ayuda, terremoto, Venezuela, centros de acopio, comunidades, solidaridad",
  robots: "index, follow",
  openGraph: {
    title: "Movidos por la Fe — Conectemos la ayuda con quien más la necesita",
    description:
      "Plataforma ciudadana para reportar y coordinar ayuda en comunidades afectadas por el terremoto en Venezuela.",
    locale: "es_VE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900" suppressHydrationWarning>
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
