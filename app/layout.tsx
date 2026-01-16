import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LocalBusinessSchema, WebsiteSchema } from "@/components/StructuredData";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/logo-mijnpensioen.png",
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/logo-mijnpensioen.png"],
  },
  robots: {
    index: true,
    follow: true,
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
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
