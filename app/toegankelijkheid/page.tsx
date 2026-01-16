import { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Toegankelijkheidsverklaring",
  description: "Onze inzet voor digitale toegankelijkheid volgens de European Accessibility Act (EAA).",
};

export default function ToegankelijkheidPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6 prose">
          <h1>Toegankelijkheidsverklaring</h1>
          <p className="lead">
            {siteConfig.name} streeft naar een website die toegankelijk is voor iedereen,
            inclusief mensen met een beperking. Wij voldoen aan de Web Content Accessibility
            Guidelines (WCAG) 2.1 niveau AA en de European Accessibility Act (EAA).
          </p>

          <h2>Onze inzet voor toegankelijkheid</h2>
          <p>
            Wij geloven dat iedereen gelijke toegang moet hebben tot onze diensten en informatie.
            Daarom werken wij continu aan het verbeteren van de toegankelijkheid van onze website.
          </p>

          <h3>Maatregelen die wij nemen</h3>
          <ul>
            <li>Duidelijke en begrijpelijke teksten</li>
            <li>Voldoende kleurcontrast tussen tekst en achtergrond</li>
            <li>Navigatie die werkt met toetsenbord</li>
            <li>Alternatieve teksten bij afbeeldingen</li>
            <li>Responsief ontwerp voor alle apparaten</li>
            <li>Logische koppenstructuur</li>
            <li>Formulieren met duidelijke labels en foutmeldingen</li>
          </ul>

          <h2>Toegankelijkheidsstatus</h2>
          <p>
            Deze website voldoet gedeeltelijk aan WCAG 2.1 niveau AA.
            Wij werken actief aan het oplossen van eventuele toegankelijkheidsproblemen.
          </p>

          <h3>Bekende beperkingen</h3>
          <p>
            Ondanks onze inspanningen kunnen sommige onderdelen van de website nog niet volledig
            toegankelijk zijn. Wij werken hier actief aan. Bekende aandachtspunten:
          </p>
          <ul>
            <li>Sommige PDF-documenten zijn mogelijk niet volledig toegankelijk</li>
            <li>De pensioen calculator kan worden verbeterd voor screenreaders</li>
          </ul>

          <h2>Feedback en contact</h2>
          <p>
            Ervaar je problemen met de toegankelijkheid van onze website? Of heb je suggesties
            voor verbetering? Wij horen het graag!
          </p>
          <ul>
            <li>E-mail: {siteConfig.contact.email}</li>
            <li>Telefoon: {siteConfig.contact.phone}</li>
          </ul>
          <p>
            Wij streven ernaar om binnen 5 werkdagen te reageren op toegankelijkheidsmeldingen.
          </p>

          <h2>Handhaving</h2>
          <p>
            Als je niet tevreden bent met onze reactie op je melding, kun je contact opnemen met
            de Autoriteit Financiële Markten (AFM) of het College voor de Rechten van de Mens.
          </p>

          <h2>Technische specificaties</h2>
          <p>De toegankelijkheid van deze website is afhankelijk van de volgende technologieën:</p>
          <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
          </ul>
          <p>
            Deze technologieën worden ondersteund door de meeste moderne browsers en
            hulptechnologieën zoals screenreaders.
          </p>

          <p className="text-sm text-slate-500 mt-8">Laatst bijgewerkt: januari 2026</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
