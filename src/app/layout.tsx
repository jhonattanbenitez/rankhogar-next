import type { Metadata } from "next";
import "./globals.css";
import Logo from "./components/ui/Logo";
import Footer from "./components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";



export const metadata: Metadata = {
  title: "Consejos y Reseñas para tu Hogar | RankHogar",
  description:
    "Encuentra recomendaciones, comparativas y consejos prácticos para mejorar cada espacio de tu casa. RankHogar te ayuda a tomar mejores decisiones para tu hogar.",
 icons: {
    icon: "/favicon.ico",
  },
    keywords: [
    "hogar",
    "consejos para el hogar",
    "reseñas de productos",
    "comparativas de electrodomésticos",
    "muebles económicos",
    "decoración moderna",
    "ahorro de energía",
    "vida sostenible",
    "productos para el hogar",
  ],
  
  authors: [{ name: "RankHogar", url: "https://rankhogar.com.co" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Consejos y Reseñas para tu Hogar | RankHogar",
    description:
      "Explora ideas y comparativas para mejorar tu casa con estilo, eficiencia y funcionalidad. Artículos confiables sobre electrodomésticos, decoración, sostenibilidad y más.",
    url: "https://rankhogar.com.co",
    siteName: "RankHogar",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consejos y Reseñas para tu Hogar | RankHogar",
    description:
      "Mejora tu hogar con recomendaciones, comparativas y consejos prácticos. Todo en RankHogar.",
    site: "@rankhogar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <header className="border-b py-4 px-6 bg-white shadow-sm">
          <div className="container flex items-center justify-between ">
            <Logo variant="black" className="m-auto" />
          </div>
        </header>
        <main>{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-KM496921GW" />
    </html>
  );
}
