import Link from "next/link";
import { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Pensioenadvies voor Werkgevers | Wet Toekomst Pensioenen",
  description: "Voldoe aan uw wettelijke pensioenverplichtingen. Collectieve pensioenpresentaties, 1-op-1 gesprekken en advies over de transitie naar het nieuwe pensioenstelsel.",
  keywords: ["pensioenadvies werkgevers", "wet toekomst pensioenen", "pensioen werknemers", "collectief pensioenadvies", "wtp werkgever"],
  alternates: {
    canonical: `${siteConfig.url}/werkgevers`,
  },
};

export default function WerkgeversPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-6">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-sm font-medium text-blue-700">Voor werkgevers</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-6">
                Pensioenadvies voor uw organisatie
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 mt-2">
                  Voldoe aan de Wet toekomst pensioenen
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Help uw werknemers met helder pensioeninzicht. Wij verzorgen collectieve presentaties, 
                persoonlijke gesprekken en adviseren over de transitie naar het nieuwe pensioenstelsel.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-[1.02] transition-all">
                  Vrijblijvend gesprek aanvragen
                </Link>
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-4 rounded-xl font-semibold text-slate-700 hover:border-blue-300 transition-all">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Urgentie - Deadlines */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                ⚠️ Belangrijke deadlines Wet toekomst pensioenen
              </h2>
              <p className="text-orange-100 text-lg">
                Als werkgever heeft u wettelijke verplichtingen. Mis deze deadlines niet.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  date: "1 januari 2028",
                  title: "Uiterste transitiedatum",
                  description: "Alle pensioenregelingen moeten zijn overgegaan naar het nieuwe stelsel"
                },
                {
                  date: "31 december 2026",
                  title: "Peildatum compensatie",
                  description: "Werknemers moeten geïnformeerd zijn over eventuele compensatie"
                },
                {
                  date: "Doorlopend",
                  title: "Informatieplicht",
                  description: "Wet pensioencommunicatie verplicht actieve informatievoorziening"
                }
              ].map((item) => (
                <div key={item.date} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                  <div className="text-orange-200 font-bold text-sm mb-2">{item.date}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-orange-100 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wat wij bieden */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Onze diensten</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-4">
                Wat wij voor uw organisatie doen
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Van collectieve voorlichting tot persoonlijke begeleiding - wij ontzorgen u volledig.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "👥",
                  title: "Collectieve pensioenpresentatie",
                  description: "Interactieve sessie voor al uw werknemers. Helder uitleg over het nieuwe pensioenstelsel en wat dit voor hen betekent.",
                  details: ["1-2 uur op locatie of online", "Inclusief Q&A sessie", "Materiaal voor nazorg"]
                },
                {
                  icon: "🎯",
                  title: "1-op-1 pensioengesprekken",
                  description: "Persoonlijke inventarisatie per werknemer. Iedereen krijgt inzicht in zijn eigen situatie en mogelijkheden.",
                  details: ["45-60 min per werknemer", "Persoonlijk pensioenrapport", "Concrete vervolgstappen"]
                },
                {
                  icon: "📋",
                  title: "Pensioeninventarisatie",
                  description: "Complete analyse van uw huidige pensioenregeling en de impact van de transitie op uw werknemers.",
                  details: ["Gap-analyse per leeftijdsgroep", "Compensatieberekening", "Risico-inventarisatie"]
                },
                {
                  icon: "📊",
                  title: "Transitieadvies",
                  description: "Strategisch advies over de overgang naar het nieuwe pensioenstelsel. Wij begeleiden het hele proces.",
                  details: ["Keuze pensioenaanbieder", "Onderhandelingsondersteuning", "Implementatiebegeleiding"]
                },
                {
                  icon: "📧",
                  title: "Pensioencommunicatie",
                  description: "Wij helpen u voldoen aan de wettelijke informatieplicht met heldere communicatie naar werknemers.",
                  details: ["Nieuwsbrieven en mailings", "FAQ documenten", "Intranet content"]
                },
                {
                  icon: "🔄",
                  title: "Doorlopende ondersteuning",
                  description: "Jaarlijkse updates, nieuwe medewerkers onboarden en vragen beantwoorden - wij blijven beschikbaar.",
                  details: ["Jaarlijkse review", "Onboarding nieuwe medewerkers", "Helpdesk functie"]
                }
              ].map((service) => (
                <div key={service.title} className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-all border border-slate-100">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-slate-500">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voordelen voor werkgever */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Waarom samenwerken</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-6">
                  Voordelen voor uw organisatie
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Voldoe aan wettelijke verplichtingen",
                      description: "Voorkom boetes en aansprakelijkheid door te voldoen aan de Wet pensioencommunicatie en Wtp."
                    },
                    {
                      title: "Tevreden werknemers",
                      description: "Werknemers waarderen een werkgever die investeert in hun financiële toekomst. Goed voor retentie."
                    },
                    {
                      title: "Tijdwinst voor HR",
                      description: "Wij nemen het volledige pensioentraject uit handen. Uw HR-afdeling kan zich focussen op andere zaken."
                    },
                    {
                      title: "Onafhankelijk advies",
                      description: "Wij vergelijken alle aanbieders en hebben geen binding met specifieke pensioenfondsen of verzekeraars."
                    }
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                        <p className="text-slate-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Schaalbaar voor elke organisatie
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Tarieven op maat</h3>
                  <p className="text-slate-600">Van MKB tot grote ondernemingen</p>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Collectieve presentatie</span>
                    <span className="font-bold text-slate-800">Op aanvraag</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">1-op-1 gesprekken</span>
                    <span className="font-bold text-slate-800">Per werknemer</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600">Volledig pakket</span>
                    <span className="font-bold text-slate-800">Maatwerk</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 text-center mb-6">
                  Prijzen afhankelijk van organisatiegrootte en gewenste diensten
                </p>
                <Link href="#contact" className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-center shadow-lg hover:shadow-xl transition-all">
                  Vraag vrijblijvend een offerte aan
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Onze werkwijze</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-4">
                Hoe werkt het?
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Kennismaking", description: "Vrijblijvend gesprek over uw wensen en de situatie binnen uw organisatie." },
                { step: "2", title: "Inventarisatie", description: "Analyse van uw huidige pensioenregeling en de impact op werknemers." },
                { step: "3", title: "Plan van aanpak", description: "Concrete offerte met tijdlijn en deliverables op maat." },
                { step: "4", title: "Uitvoering", description: "Wij voeren het plan uit en zorgen voor heldere communicatie." }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-slate-200">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Vrijblijvend gesprek aanvragen
                </h2>
                <p className="text-slate-600">
                  Laat uw gegevens achter en wij nemen binnen 24 uur contact met u op.
                </p>
              </div>
              <WerkgeversContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function WerkgeversContactForm() {
  return (
    <form action="/api/leads" method="POST" className="space-y-6">
      <input type="hidden" name="source" value="werkgevers-pagina" />
      <input type="hidden" name="situatie" value="werkgever" />
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Uw naam *</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            placeholder="Volledige naam"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Bedrijfsnaam *</label>
          <input
            type="text"
            name="company"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            placeholder="Naam organisatie"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">E-mail *</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            placeholder="email@bedrijf.nl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Telefoon *</label>
          <input
            type="tel"
            name="phone"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            placeholder="06 - 1234 5678"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Aantal werknemers</label>
        <select
          name="employees"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white"
        >
          <option value="">Selecteer...</option>
          <option value="1-10">1 - 10 werknemers</option>
          <option value="11-50">11 - 50 werknemers</option>
          <option value="51-200">51 - 200 werknemers</option>
          <option value="200+">Meer dan 200 werknemers</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Waar kunnen wij u mee helpen?</label>
        <textarea
          name="message"
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
          placeholder="Bijv. collectieve presentatie, 1-op-1 gesprekken, transitieadvies..."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          name="privacy"
          required
          className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600"
        />
        <label htmlFor="privacy" className="text-sm text-slate-600">
          Ik ga akkoord met het <a href="/privacy" className="text-blue-600 hover:underline">privacybeleid</a>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
      >
        Verstuur aanvraag
      </button>
      
      <p className="text-center text-xs text-slate-500">
        Wij nemen binnen 24 uur contact met u op
      </p>
    </form>
  );
}
