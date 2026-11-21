import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/data/contact";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", locale: "pt_BR", title: site.title, description: site.description, siteName: site.name },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { themeColor: "#07080b" };

// Dados estruturados simples. Preencha sameAs com seus perfis reais.
const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: site.name, jobTitle: "Desenvolvedor Full-Stack", url: site.url };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
