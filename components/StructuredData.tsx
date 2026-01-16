import { siteConfig } from "@/config/site";

// LocalBusiness Schema voor de homepage
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: ["Zekeringvermogen", "MijnPensioenGevuld"],
    description: "Onafhankelijk pensioenadvies in Eindhoven en omgeving. Gratis inventarisatiegesprek, persoonlijke begeleiding en helder inzicht in uw pensioen. AFM-geregistreerd.",
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      postalCode: siteConfig.contact.address.postalCode,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: "Noord-Brabant",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.4416,
      longitude: 5.4697,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Eindhoven",
      },
      {
        "@type": "State",
        name: "Noord-Brabant",
      },
      {
        "@type": "Country",
        name: "Nederland",
      },
    ],
    serviceType: [
      "Pensioenadvies",
      "Pensioeninventarisatie",
      "Lijfrente advies",
      "AOW advies",
      "Pensioenplanning",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Factuur",
    image: `${siteConfig.url}/logo-mijnpensioen.png`,
    logo: `${siteConfig.url}/logo-mijnpensioen.png`,
    sameAs: [],
    parentOrganization: {
      "@type": "Organization",
      name: "Financieel Zeker",
      url: "https://www.financieel-zeker.nl",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "AFM-registratie",
      identifier: siteConfig.compliance.afmNumber,
      recognizedBy: {
        "@type": "Organization",
        name: "Autoriteit Financiële Markten",
        url: "https://www.afm.nl",
      },
    },
    knowsAbout: [
      "Pensioen",
      "AOW",
      "Pensioengat",
      "Lijfrente",
      "Wet toekomst pensioenen",
      "Pensioenopbouw",
    ],
    slogan: "Weet waar je aan toe bent",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
interface FAQ {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article Schema voor kennisbank
interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
}

export function ArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: `${siteConfig.url}/kennisbank/${slug}`,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo-mijnpensioen.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/kennisbank/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  href: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema met SearchAction
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
