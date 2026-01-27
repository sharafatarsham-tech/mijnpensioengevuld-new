import { Metadata } from "next";

// Landing pages should NOT be indexed by search engines
// They are only for paid advertising campaigns
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
