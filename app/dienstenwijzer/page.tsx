import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Dienstenwijzer",
  description: "Informatie over onze dienstverlening, wie wij zijn en hoe wij werken.",
};

export default function DienstenwijzerPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6 prose">
          <h1>Dienstenwijzer</h1>
          <p className="lead">
            Deze dienstenwijzer informeert u over wie wij zijn, wat wij doen en hoe wij werken.
            Dit document is opgesteld conform de eisen van de Wet op het financieel toezicht (Wft).
          </p>

          <h2>Wie zijn wij?</h2>
          <p>
            <strong>{siteConfig.business.tradeName}</strong> is een handelsnaam van{" "}
            <strong>{siteConfig.business.legalName}</strong>, gevestigd te{" "}
            {siteConfig.contact.address.street}, {siteConfig.contact.address.postalCode}{" "}
            {siteConfig.contact.address.city}.
          </p>
          <ul>
            <li><strong>KvK-nummer:</strong> {siteConfig.business.kvkNumber}</li>
            <li><strong>Telefoon:</strong> {siteConfig.contact.phone}</li>
            <li><strong>E-mail:</strong> {siteConfig.contact.email}</li>
          </ul>

          <h2>Toezicht en vergunningen</h2>
          <p>
            Wij zijn aangesloten bij <strong>{siteConfig.compliance.afmOrganization}</strong> en
            staan geregistreerd bij de Autoriteit Financiële Markten (AFM) onder vergunningnummer{" "}
            <strong>{siteConfig.compliance.afmNumber}</strong>.
          </p>
          <p>
            U kunt onze registratie controleren in het{" "}
            <a
              href="https://www.afm.nl/nl-nl/sector/registers/vergunningenregisters/financiele-dienstverleners"
              target="_blank"
              rel="noopener noreferrer"
            >
              AFM-register
            </a>.
          </p>

          <h2>Onze dienstverlening</h2>
          <p>Wij zijn gespecialiseerd in pensioenadvies en bieden de volgende diensten aan:</p>

          <h3>Voor particulieren</h3>
          <ul>
            <li>Pensioeninventarisatie en -analyse</li>
            <li>Berekening van uw pensioengat</li>
            <li>Advies over aanvullende pensioenvoorzieningen</li>
            <li>Lijfrente- en bankspaaradvies</li>
            <li>Begeleiding bij pensionering</li>
          </ul>

          <h3>Voor werkgevers</h3>
          <ul>
            <li>Collectieve pensioenpresentaties</li>
            <li>Individuele pensioengesprekken met werknemers</li>
            <li>Advies over de Wet toekomst pensioenen (Wtp)</li>
            <li>Pensioencommunicatie</li>
          </ul>

          <h2>Hoe werken wij?</h2>
          <p>
            Wij werken op basis van <strong>advies</strong>. Dit betekent dat wij uw persoonlijke
            situatie inventariseren, analyseren en u een passend advies geven. U beslist zelf of
            u dit advies opvolgt.
          </p>

          <h3>Ons adviesproces</h3>
          <ol>
            <li>
              <strong>Kennismaking (gratis):</strong> In een vrijblijvend gesprek van 1-1,5 uur
              brengen wij uw situatie in kaart en bespreken wij uw wensen en doelen.
            </li>
            <li>
              <strong>Analyse:</strong> Wij analyseren uw huidige pensioenopbouw en berekenen
              uw verwachte pensioeninkomen.
            </li>
            <li>
              <strong>Advies:</strong> U ontvangt een persoonlijk adviesrapport met concrete
              aanbevelingen.
            </li>
            <li>
              <strong>Uitvoering:</strong> Als u besluit het advies op te volgen, begeleiden
              wij u bij de uitvoering.
            </li>
          </ol>

          <h2>Onafhankelijkheid</h2>
          <p>
            Wij geven onafhankelijk advies. Dit betekent dat wij niet gebonden zijn aan één
            specifieke aanbieder. Wij vergelijken producten van meer dan 40 pensioenaanbieders
            om tot het beste advies voor uw situatie te komen.
          </p>

          <h2>Beloning</h2>
          <p>
            Het eerste inventarisatiegesprek is altijd <strong>gratis en vrijblijvend</strong>.
          </p>
          <p>
            Voor advies en bemiddeling rekenen wij een vergoeding. De hoogte hiervan hangt af
            van de complexiteit van uw situatie en de werkzaamheden die wij verrichten.
            Wij bespreken de kosten altijd vooraf en leggen deze schriftelijk vast, zodat u
            weet waar u aan toe bent.
          </p>
          <p>
            Wij ontvangen geen provisie van productaanbieders voor pensioenadvies.
            Onze beloning komt volledig van u als klant.
          </p>

          <h2>Aansprakelijkheid en verzekering</h2>
          <p>
            Wij hebben een beroepsaansprakelijkheidsverzekering afgesloten die voldoet aan de
            wettelijke eisen. Deze verzekering dekt schade die voortvloeit uit fouten in onze
            advisering.
          </p>

          <h2>Beëindiging van de relatie</h2>
          <p>
            U kunt de relatie met ons op elk moment beëindigen. Eventuele reeds gemaakte kosten
            voor verrichte werkzaamheden blijven verschuldigd.
          </p>

          <h2>Klachten</h2>
          <p>
            Bent u niet tevreden over onze dienstverlening? Neem dan eerst contact met ons op.
            Wij proberen samen met u tot een oplossing te komen.
          </p>
          <p>
            Meer informatie over onze klachtenprocedure vindt u op onze{" "}
            <Link href="/klachten">klachtenpagina</Link>.
          </p>

          <h2>Meer informatie</h2>
          <ul>
            <li><Link href="/privacy">Privacybeleid</Link></li>
            <li><Link href="/voorwaarden">Algemene voorwaarden</Link></li>
            <li><Link href="/klachten">Klachtenprocedure</Link></li>
          </ul>

          <p className="text-sm text-slate-500 mt-8">Laatst bijgewerkt: januari 2026</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
