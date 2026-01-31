import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";
import { 
  CheckIcon, 
  ShieldCheckIcon, 
  PhoneIcon,
  EmailIcon 
} from "@/components/ui/Icons";

export const metadata = {
  title: "Over Ons | MijnPensioenGevuld.nl",
  description: "Leer meer over MijnPensioenGevuld.nl - Sinds 2009 helpen wij Nederlanders met helder en onafhankelijk pensioenadvies.",
};

export default function OverOnsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Over Ons</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mt-3 mb-6">
              Helder pensioenadvies,<br />
              <span className="text-orange-500">zonder poespas</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Sinds 2009 helpen wij Nederlanders om grip te krijgen op hun pensioen. 
              Onafhankelijk, persoonlijk en met oog voor jouw situatie.
            </p>
          </div>
        </section>

        {/* Onze Missie */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Onze Missie</h2>
                <p className="text-lg text-slate-600 mb-4">
                  Pensioen is voor veel mensen een ver-van-mijn-bed-show. Ingewikkelde brieven, 
                  onduidelijke cijfers en het gevoel dat je er toch niets aan kunt doen.
                </p>
                <p className="text-lg text-slate-600 mb-4">
                  Wij geloven dat iedereen recht heeft op <strong>duidelijkheid</strong> over zijn 
                  financiële toekomst. Daarom vertalen wij complexe pensioenmaterie naar heldere 
                  inzichten en concrete acties.
                </p>
                <p className="text-lg text-slate-600">
                  Geen vakjargon, geen verborgen agenda's. Gewoon eerlijk advies dat werkt.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Wat ons drijft</h3>
                <ul className="space-y-4">
                  {[
                    "Iedereen verdient financiële zekerheid",
                    "Pensioen hoeft niet ingewikkeld te zijn",
                    "Persoonlijk contact maakt het verschil",
                    "Onafhankelijkheid staat voorop",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon className="text-green-500 mt-1 flex-shrink-0" size="md" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cijfers */}
        <section className="py-16 bg-slate-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: "Sinds 2009", label: "Actief in pensioenadvies" },
                { value: "500+", label: "Klanten persoonlijk geholpen" },
                { value: "42", label: "Verzekeraars & beheerders" },
                { value: "100%", label: "Onafhankelijk advies" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl lg:text-4xl font-bold text-orange-400 mb-2">{stat.value}</p>
                  <p className="text-slate-300 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Werkwijze */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Hoe wij werken</h2>
            <div className="space-y-6">
              {[
                {
                  title: "Persoonlijk en op maat",
                  desc: "Geen standaard aanpak, maar advies dat past bij jouw situatie, doelen en mogelijkheden.",
                },
                {
                  title: "Volledig onafhankelijk",
                  desc: "Wij werken niet voor verzekeraars of banken. Ons enige belang is jouw belang.",
                },
                {
                  title: "Transparant over kosten",
                  desc: "Vooraf weet je precies wat je krijgt en wat het kost. Geen verrassingen, nooit.",
                },
                {
                  title: "Langdurige relatie",
                  desc: "Pensioen is geen eenmalige actie. Wij blijven beschikbaar voor vragen en aanpassingen.",
                },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-4 p-6 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Erkend & Geregistreerd</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <ShieldCheckIcon className="text-green-500 mx-auto mb-4" size="xl" />
                <h3 className="font-bold text-slate-800 mb-2">AFM Geregistreerd</h3>
                <p className="text-slate-600 text-sm mb-2">
                  Wij staan geregistreerd bij de Autoriteit Financiële Markten onder {siteConfig.compliance.afmOrganization}.
                </p>
                <p className="text-orange-500 font-semibold">Nr. {siteConfig.compliance.afmNumber}</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <ShieldCheckIcon className="text-green-500 mx-auto mb-4" size="xl" />
                <h3 className="font-bold text-slate-800 mb-2">Kifid Aangesloten</h3>
                <p className="text-slate-600 text-sm mb-2">
                  Voor klachten kun je terecht bij het Kifid, het klachteninstituut voor financiële dienstverlening.
                </p>
                <p className="text-orange-500 font-semibold">Geschillencommissie</p>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              {siteConfig.business.legalName} • KvK: {siteConfig.business.kvkNumber}
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Kennismaken?</h2>
            <p className="text-xl text-orange-100 mb-8">
              Plan een gratis inventarisatiegesprek en ontdek hoe wij jou kunnen helpen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Plan gratis gesprek
              </Link>
              <a 
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                <PhoneIcon size="md" />
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
