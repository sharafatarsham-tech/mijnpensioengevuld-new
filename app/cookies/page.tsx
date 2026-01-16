import { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: "Informatie over het gebruik van cookies op onze website.",
};

export default function CookiesPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6 prose">
          <h1>Cookiebeleid</h1>
          <p className="lead">Op deze pagina leggen we uit welke cookies we gebruiken en waarvoor.</p>

          <h2>Wat zijn cookies?</h2>
          <p>Cookies zijn kleine tekstbestanden die door je browser worden opgeslagen wanneer je een website bezoekt. Ze helpen de website om je voorkeuren te onthouden en om het gebruik van de website te analyseren.</p>

          <h2>Welke cookies gebruiken we?</h2>
          
          <h3>Functionele cookies</h3>
          <p>Deze cookies zijn noodzakelijk voor het functioneren van de website. Ze onthouden bijvoorbeeld je cookievoorkeuren.</p>

          <h3>Analytische cookies</h3>
          <p>Met je toestemming gebruiken we analytische cookies om te begrijpen hoe bezoekers onze website gebruiken. Dit helpt ons om de website te verbeteren. We gebruiken hiervoor Google Analytics, waarbij IP-adressen worden geanonimiseerd.</p>

          <h2>Je keuze</h2>
          <p>Bij je eerste bezoek vragen we je toestemming voor het plaatsen van analytische cookies. Je kunt je keuze altijd wijzigen door je browserinstellingen aan te passen of door cookies te verwijderen.</p>

          <h2>Cookies beheren</h2>
          <p>Je kunt cookies beheren via je browserinstellingen. Houd er rekening mee dat het uitschakelen van cookies de functionaliteit van websites kan beïnvloeden.</p>

          <h2>Contact</h2>
          <p>Vragen over cookies? Neem contact op via {siteConfig.contact.email}.</p>

          <p className="text-sm text-slate-500 mt-8">Laatst bijgewerkt: januari 2025</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
