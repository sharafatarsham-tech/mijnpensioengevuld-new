import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Klachtenprocedure",
  description: "Hoe u een klacht kunt indienen en hoe wij daarmee omgaan.",
};

export default function KlachtenPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6 prose">
          <h1>Klachtenprocedure</h1>
          <p className="lead">
            Wij streven naar de beste dienstverlening, maar het kan voorkomen dat u ergens
            ontevreden over bent. Wij nemen klachten serieus en doen ons best om tot een
            oplossing te komen.
          </p>

          <h2>Stap 1: Neem contact met ons op</h2>
          <p>
            Heeft u een klacht? Neem dan eerst rechtstreeks contact met ons op. In veel gevallen
            kunnen we samen tot een snelle oplossing komen.
          </p>
          <ul>
            <li><strong>Telefoon:</strong> {siteConfig.contact.phone}</li>
            <li><strong>E-mail:</strong> {siteConfig.contact.email}</li>
            <li>
              <strong>Post:</strong><br />
              {siteConfig.business.tradeName}<br />
              {siteConfig.contact.address.street}<br />
              {siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}
            </li>
          </ul>

          <h2>Stap 2: Schriftelijke klacht indienen</h2>
          <p>
            Komen wij er samen niet uit, of wilt u direct een formele klacht indienen?
            Stuur dan een schriftelijke klacht naar bovenstaand adres of per e-mail.
          </p>
          <p>Vermeld in uw klacht:</p>
          <ul>
            <li>Uw naam en contactgegevens</li>
            <li>De datum van de klacht</li>
            <li>Een duidelijke omschrijving van uw klacht</li>
            <li>Relevante documenten (indien van toepassing)</li>
            <li>Wat u van ons verwacht als oplossing</li>
          </ul>

          <h2>Behandeling van uw klacht</h2>
          <p>Na ontvangst van uw klacht:</p>
          <ul>
            <li>Ontvangt u binnen <strong>5 werkdagen</strong> een ontvangstbevestiging</li>
            <li>Onderzoeken wij uw klacht zorgvuldig</li>
            <li>Ontvangt u binnen <strong>4 weken</strong> een inhoudelijke reactie</li>
            <li>Als meer tijd nodig is, laten wij u dit weten met een nieuwe termijn</li>
          </ul>

          <h2>Stap 3: Externe geschillenbeslechting</h2>
          <p>
            Bent u niet tevreden met onze reactie op uw klacht? Dan kunt u uw klacht voorleggen
            aan het <strong>Klachteninstituut Financiële Dienstverlening (Kifid)</strong>.
          </p>

          <div className="bg-slate-50 p-6 rounded-lg not-prose my-6">
            <h3 className="font-bold text-slate-800 mb-2">Kifid</h3>
            <p className="text-slate-600 mb-3">
              Het Kifid is een onafhankelijke geschilleninstantie voor financiële dienstverlening.
            </p>
            <ul className="text-slate-600 space-y-1">
              <li><strong>Website:</strong>{" "}
                <a
                  href="https://www.kifid.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline"
                >
                  www.kifid.nl
                </a>
              </li>
              <li><strong>Telefoon:</strong> 070 - 333 89 99</li>
              <li>
                <strong>Adres:</strong><br />
                Kifid<br />
                Postbus 93257<br />
                2509 AG Den Haag
              </li>
            </ul>
          </div>

          <p>
            Let op: u moet eerst onze interne klachtenprocedure doorlopen voordat u naar het
            Kifid kunt stappen. Het Kifid neemt alleen klachten in behandeling die eerst aan
            ons zijn voorgelegd.
          </p>

          <h2>Geschillencommissie</h2>
          <p>
            Naast het Kifid kunt u ook terecht bij de burgerlijke rechter. Wij adviseren u
            echter om eerst de mogelijkheden bij het Kifid te onderzoeken, omdat dit vaak
            sneller en goedkoper is.
          </p>

          <h2>Registratie van klachten</h2>
          <p>
            Wij registreren alle klachten en de afhandeling daarvan. Dit helpt ons om onze
            dienstverlening te verbeteren en soortgelijke klachten in de toekomst te voorkomen.
          </p>

          <h2>Meer informatie</h2>
          <ul>
            <li><Link href="/dienstenwijzer">Dienstenwijzer</Link></li>
            <li><Link href="/voorwaarden">Algemene voorwaarden</Link></li>
            <li><Link href="/privacy">Privacybeleid</Link></li>
          </ul>

          <p className="text-sm text-slate-500 mt-8">Laatst bijgewerkt: januari 2026</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
