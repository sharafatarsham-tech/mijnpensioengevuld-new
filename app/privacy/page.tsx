import { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Hoe wij omgaan met je persoonsgegevens.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6 prose">
          <h1>Privacybeleid</h1>
          <p className="lead">{siteConfig.name} hecht veel waarde aan de bescherming van je persoonsgegevens. In dit privacybeleid leggen we uit welke gegevens we verzamelen en hoe we daarmee omgaan.</p>

          <h2>Welke gegevens verzamelen we?</h2>
          <p>We verzamelen alleen gegevens die je zelf aan ons verstrekt via het contactformulier:</p>
          <ul>
            <li>Naam</li>
            <li>E-mailadres</li>
            <li>Telefoonnummer (optioneel)</li>
            <li>Je vraag of bericht</li>
          </ul>

          <h2>Waarvoor gebruiken we je gegevens?</h2>
          <p>We gebruiken je gegevens uitsluitend om:</p>
          <ul>
            <li>Contact met je op te nemen naar aanleiding van je vraag</li>
            <li>Je te informeren over onze diensten als je daar om vraagt</li>
          </ul>

          <h2>Delen met derden</h2>
          <p>We delen je gegevens niet met derden, tenzij dit noodzakelijk is voor onze dienstverlening of wanneer we hiertoe wettelijk verplicht zijn.</p>

          <h2>Bewaartermijn</h2>
          <p>We bewaren je gegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld.</p>

          <h2>Je rechten</h2>
          <p>Je hebt recht op inzage, correctie en verwijdering van je gegevens. Neem hiervoor contact met ons op via {siteConfig.contact.email}.</p>

          <h2>Cookies</h2>
          <p>Zie ons <a href="/cookies">cookiebeleid</a> voor informatie over het gebruik van cookies.</p>

          <h2>Contact</h2>
          <p>Vragen over dit privacybeleid? Neem contact op via:</p>
          <ul>
            <li>E-mail: {siteConfig.contact.email}</li>
            <li>Telefoon: {siteConfig.contact.phone}</li>
          </ul>

          <p className="text-sm text-slate-500 mt-8">Laatst bijgewerkt: januari 2025</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
