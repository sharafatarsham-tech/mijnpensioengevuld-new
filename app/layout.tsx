import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LocalBusinessSchema, WebsiteSchema } from "@/components/StructuredData";
import { CookieConsent } from "@/components/CookieConsent";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Onafhankelijk Pensioenadvies Eindhoven`,
    template: `%s | ${siteConfig.name}`,
  },
  description: "Onafhankelijk pensioenadvies in Eindhoven. Gratis inventarisatiegesprek van 1,5 uur. Weet binnen één gesprek waar je aan toe bent. AFM-geregistreerd. ✓ Persoonlijk ✓ Helder ✓ Vrijblijvend",
  keywords: [
    "pensioenadvies",
    "pensioenadvies eindhoven",
    "pensioenadviseur",
    "pensioengat",
    "AOW",
    "lijfrente",
    "pensioenplanning",
    "onafhankelijk pensioenadvies",
    "gratis pensioenadvies",
    "pensioen berekenen",
  ],
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: "/pig-favicon-v2.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/pig-favicon-v2.png",
    apple: [
      { url: "/pig-favicon-v2.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: `${siteConfig.name} | Onafhankelijk Pensioenadvies Eindhoven`,
    description: "Gratis inventarisatiegesprek van 1,5 uur. Weet binnen één gesprek waar je aan toe bent. AFM-geregistreerd pensioenadviseur in Eindhoven.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/logo-mijnpensioen.png",
        width: 1200,
        height: 630,
        alt: "MijnPensioenGevuld - Onafhankelijk Pensioenadvies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Pensioenadvies Eindhoven`,
    description: "Gratis inventarisatiegesprek. Weet binnen 1,5 uur waar je aan toe bent.",
    images: ["/logo-mijnpensioen.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  other: {
    "geo.region": "NL-NB",
    "geo.placename": "Eindhoven",
    "geo.position": "51.4416;5.4697",
    "ICBM": "51.4416, 5.4697",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        <LocalBusinessSchema />
        <WebsiteSchema />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <GoogleAnalytics />
        {children}
        <WhatsAppButton />
        <StickyMobileCTA />
        <CookieConsent />
      </body>
    </html>
  );
}
