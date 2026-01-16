import { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description: "De algemene voorwaarden van onze dienstverlening.",
};

export default function VoorwaardenPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6 prose">
          <h1>Algemene Voorwaarden</h1>
          <p className="lead">Deze voorwaarden zijn van toepassing op de dienstverlening van {siteConfig.name}.</p>

          <h2>Artikel 1 - Definities</h2>
          <p>In deze voorwaarden wordt verstaan onder:</p>
          <ul>
            <li><strong>Adviseur:</strong> {siteConfig.name}, gevestigd te {siteConfig.contact.address.city}</li>
            <li><strong>Klant:</strong> de natuurlijke of rechtspersoon die gebruik maakt van de diensten</li>
            <li><strong>Diensten:</strong> financieel advies, waaronder pensioenadvies</li>
          </ul>

          <h2>Artikel 2 - Toepasselijkheid</h2>
          <p>Deze voorwaarden zijn van toepassing op alle offertes, overeenkomsten en diensten van de adviseur.</p>

          <h2>Artikel 3 - Dienstverlening</h2>
          <p>De adviseur verleent diensten naar beste kunnen en met inachtneming van de geldende wet- en regelgeving. De adviseur is aangesloten bij {siteConfig.compliance.afmOrganization} en staat geregistreerd bij de AFM onder nummer {siteConfig.compliance.afmNumber}.</p>

          <h2>Artikel 4 - Informatieverstrekking</h2>
          <p>De klant verstrekt alle informatie die nodig is voor een juiste uitvoering van de diensten. De adviseur mag uitgaan van de juistheid van de verstrekte informatie.</p>

          <h2>Artikel 5 - Vergoeding</h2>
          <p>De vergoeding voor de diensten wordt vooraf besproken en schriftelijk vastgelegd. Het eerste oriëntatiegesprek is kosteloos.</p>

          <h2>Artikel 6 - Aansprakelijkheid</h2>
          <p>De adviseur is niet aansprakelijk voor schade die het gevolg is van onjuiste of onvolledige informatieverstrekking door de klant. De aansprakelijkheid is beperkt tot het bedrag dat in het betreffende geval door de beroepsaansprakelijkheidsverzekering wordt uitgekeerd.</p>

          <h2>Artikel 7 - Klachten</h2>
          <p>Klachten kunnen worden ingediend via {siteConfig.contact.email}. We streven ernaar klachten binnen 4 weken af te handelen. Bij onenigheid kunt u terecht bij het Klachteninstituut Financiële Dienstverlening (Kifid).</p>

          <h2>Artikel 8 - Toepasselijk recht</h2>
          <p>Op alle overeenkomsten is Nederlands recht van toepassing.</p>

          <p className="text-sm text-slate-500 mt-8">Laatst bijgewerkt: januari 2025</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
