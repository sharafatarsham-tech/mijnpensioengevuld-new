import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { TrustBar } from "@/components/sections/TrustBar";
import { Calculator } from "@/components/sections/Calculator";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQSchema } from "@/components/StructuredData";
import { PensionAgeSlider } from "@/components/ui/PensionAgeSlider";
import { AtmosphereImage } from "@/components/ui/AtmosphereImage";
import { PiggyIcon } from "@/components/ui/PiggyIcon";
import { testimonials } from "@/content/testimonials";
import { faqs } from "@/content/faqs";
import { siteConfig } from "@/config/site";
import { 
  CheckIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  ArrowRightIcon, 
  PhoneIcon, 
  EmailIcon,
  BuildingIcon,
  SearchIcon,
  LightbulbIcon,
  TargetIcon
} from "@/components/ui/Icons";

export default function HomePage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <Navigation />
      <HeroSection />
      <TrustBar />
      <StatsSection />
      <WhySection />
      <WorkflowSection />
      <GuaranteeSection />
      <ConversationSection />
      <Calculator />
      <Testimonials testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <WerkgeversSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/50" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 shadow-sm px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-red-700">⚡ Nog 3 plekken beschikbaar deze maand</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-4 sm:mb-6">
              Voorkom dat je later moet inleveren.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Weet binnen 1,5 uur waar je aan toe bent.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8">Gratis, vertrouwelijk en vrijblijvend inzicht in jouw pensioen.</p>
            
            <PensionAgeSlider />
            
            <p className="text-xs sm:text-sm text-slate-500 my-4 sm:my-6 flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2">
              <span className="flex items-center gap-1">
                <CheckIcon className="text-green-500 flex-shrink-0" size="sm" />
                Vertrouwelijk
              </span>
              <span className="flex items-center gap-1">
                <CheckIcon className="text-green-500 flex-shrink-0" size="sm" />
                Geen spam
              </span>
              <span className="flex items-center gap-1">
                <CheckIcon className="text-green-500 flex-shrink-0" size="sm" />
                Binnen 24u reactie
              </span>
              <span className="flex items-center gap-1">
                <CheckIcon className="text-green-500 flex-shrink-0" size="sm" />
                100% vrijblijvend
              </span>
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 sm:gap-2 bg-white px-2.5 sm:px-3 py-1.5 rounded-full border border-slate-200">
                <ShieldCheckIcon className="text-green-500 flex-shrink-0" size="sm" />
                <span className="text-slate-600">AFM-geregistreerd</span>
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2 bg-white px-2.5 sm:px-3 py-1.5 rounded-full border border-slate-200">
                <CheckIcon className="text-green-500 flex-shrink-0" size="sm" />
                <span className="text-slate-600">Persoonlijk advies</span>
              </span>
            </div>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-2xl shadow-orange-200/30 border border-orange-100 relative">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
              GRATIS INVENTARISATIE
            </div>
            <div className="text-center mb-5 sm:mb-6 pt-2 sm:pt-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-orange-50 text-orange-700 text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full mb-2 sm:mb-3">
                <ClockIcon className="flex-shrink-0" size="sm" />
                <span className="whitespace-nowrap">1-1,5 uur persoonlijke aandacht</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 px-2">Gratis Pensioen Inventarisatie</h2>
              <p className="text-slate-600 mt-2 text-xs sm:text-sm px-2">Een uitgebreid gesprek waarin we jouw <span className="font-semibold">complete situatie</span> in kaart brengen</p>
            </div>
            <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
              {[
                "Volledige analyse van je huidige pensioen",
                "Strategische vragen over jouw doelen",
                "Berekening van je persoonlijke pensioengat",
                "Concrete oplossingen op maat"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 sm:gap-3">
                  <CheckIcon className="text-green-500 flex-shrink-0" size="md" />
                  <span className="text-slate-700 text-xs sm:text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="#contact" className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-center transition-all shadow-lg shadow-orange-500/25 active:scale-[0.98]">
              Vraag gratis inventarisatie aan →
            </Link>
            <p className="text-center text-[10px] sm:text-xs text-slate-500 mt-2 sm:mt-3">100% gratis & vrijblijvend • Beperkte plekken</p>
          </div>
          <AtmosphereImage 
            src="/hero-trust.png"
            alt="Vertrouwen en persoonlijk contact bij pensioenadvies"
            className="h-64 lg:h-80"
          />
        </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-r from-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Google Rating Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.9</span>
            <span className="text-slate-300 text-sm">Google Reviews</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
          {[
            { value: "500+", label: "Klanten persoonlijk geholpen", highlight: true },
            { value: "€3M+", label: "Totaal belastingvoordeel gerealiseerd", highlight: true },
            { value: "Sinds 2009", label: "Ervaring in pensioenadvies" },
            { value: "42", label: "Verzekeraars & beheerders" },
          ].map((stat) => (
            <div key={stat.label} className="px-2">
              <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${stat.highlight ? 'text-green-400' : 'text-orange-400'}`}>
                {stat.value}
              </p>
              <p className="text-slate-300 text-xs sm:text-sm leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const reasons = [
    { 
      icon: <SearchIcon className="text-orange-500" size="xl" />, 
      title: "Je overzicht is een raadsel", 
      desc: "Pensioenbrieven vol jargon en cijfers. Wij vertalen het naar wat het écht betekent voor jou." 
    },
    { 
      icon: <LightbulbIcon className="text-orange-500" size="xl" />, 
      title: "Rust in je hoofd over later", 
      desc: "Ligt je wakker van de vraag 'heb ik straks genoeg'? Wij geven je duidelijkheid, zwart op wit." 
    },
    { 
      icon: <TargetIcon className="text-orange-500" size="xl" />, 
      title: "Zelf bepalen wanneer je stopt", 
      desc: "Hoe eerder je begint, hoe meer keuzes je hebt. Wacht niet tot het te laat is." 
    },
  ];

  return (
    <section id="waarom" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold text-orange-500 uppercase tracking-wider">Waarom pensioenadvies?</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-4 sm:mb-6 px-4">Straks zorgeloos genieten begint vandaag</h2>
          <p className="text-base sm:text-lg text-slate-600 px-4">De meeste mensen weten niet wat ze straks krijgen. Na één gesprek weet jij het wel.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {reasons.map((item) => (
            <div key={item.title} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckIcon className="text-white" size="xl" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Het goede nieuws</h3>
                <p className="text-slate-600 mb-4">Met een persoonlijke inventarisatie krijg je inzicht in je situatie en ontdek je welke mogelijkheden er zijn om je pensioen te verbeteren.</p>
                <Link href="#contact" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700">
                  Plan gratis inventarisatie →
                </Link>
              </div>
            </div>
          </div>
          <AtmosphereImage 
            src="/why-peace.png"
            alt="Rustige pensioensfeer - zorgeloos genieten"
            className="h-64 lg:h-80"
          />
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section id="werkwijze" className="py-16 sm:py-20 lg:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold text-orange-500 uppercase tracking-wider">Hoe het werkt</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-3 sm:mb-4 px-4">Van onzekerheid naar pensioenplan</h2>
          <p className="text-base sm:text-lg text-slate-600 px-4">Een helder proces dat begint met een uitgebreide inventarisatie</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Vraag gesprek aan", desc: "Vul het formulier in. We bellen je binnen 24 uur.", tag: "Direct", tagColor: "green" },
            { step: "2", title: "Inventarisatie", desc: "1-1,5 uur persoonlijk gesprek. We stellen strategische vragen en brengen alles in kaart.", tag: "Gratis", highlight: true },
            { step: "3", title: "Advies op maat", desc: "Je ontvangt een persoonlijk pensioenplan met concrete oplossingen.", tag: "Op maat" },
            { step: "4", title: "Uitvoering & nazorg", desc: "We regelen alles en blijven beschikbaar, met periodieke check-ins als je wilt.", tag: "Inclusief" },
          ].map((item) => (
            <div key={item.step} className={`rounded-xl p-6 border transition-all ${item.highlight ? "bg-orange-50 border-orange-200 shadow-lg" : "bg-white border-slate-200 hover:shadow-lg hover:border-orange-200"}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold mb-4">{item.step}</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.tagColor === "green" ? "bg-green-100 text-green-700 font-bold" : item.tag === "Gratis" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"}`}>{item.tag}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="#contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:scale-[1.02] transition-all">
            Vraag gratis inventarisatie aan
            <ArrowRightIcon size="md" />
          </Link>
          <p className="text-sm text-slate-500 mt-3">Binnen 24 uur reactie • 100% vrijblijvend</p>
        </div>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">Onze Belofte</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-3 mb-4">
            2 Keiharde Garanties
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Wij geloven zo sterk in onze dienstverlening dat we het met garanties onderbouwen
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Garantie 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-bl-full opacity-50" />
            <div className="relative">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">100% Tevredenheidsgarantie</h3>
              <p className="text-slate-600 mb-4">
                Niet tevreden met je advies? Dan gaan we <strong>net zolang door</strong> tot je dat wel bent. 
                Jouw tevredenheid staat bij ons op nummer 1.
              </p>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckIcon size="md" />
                <span>Geen kleine lettertjes</span>
              </div>
            </div>
          </div>
          
          {/* Garantie 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full opacity-50" />
            <div className="relative">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Gratis Eerste Gesprek</h3>
              <p className="text-slate-600 mb-4">
                Je eerste inventarisatie is <strong>100% gratis en vrijblijvend</strong>. 
                Pas daarna beslis je of je verder wilt. Geen verplichtingen, geen verrassingen.
              </p>
              <div className="flex items-center gap-2 text-orange-600 font-semibold">
                <CheckIcon size="md" />
                <span>Waarde van €150, gratis voor jou</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Extra trust */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              AFM geregistreerd
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Kifid aangesloten
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              100% onafhankelijk
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConversationSection() {
  return (
    <section id="gesprek" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <span className="text-xs sm:text-sm font-semibold text-orange-500 uppercase tracking-wider">Gratis inventarisatie</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-4 sm:mb-6">Wat bespreken we in 1-1,5 uur?</h2>
            <p className="text-base sm:text-lg text-slate-600 mb-4 sm:mb-6">
              We brengen je complete situatie in kaart en vertalen cijfers naar duidelijke keuzes. Je krijgt direct overzicht en weet wat je volgende stap is.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <p className="text-sm text-slate-700">
                <span className="font-semibold text-slate-800">Vertrouwelijk en vrijblijvend.</span> Alles wat je deelt blijft tussen ons. Je beslist pas na het gesprek of je verder wilt.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <ul className="space-y-4">
              {[
                "Jouw doelen voor later en wat echt belangrijk is",
                "Huidige pensioenopbouw (AOW, werkgeverspensioen, eigen opbouw)",
                "Inkomen, vaste lasten en ruimte om aanvullend te sparen",
                "Wat er gebeurt als je eerder wilt stoppen met werken",
                "Welke oplossingen het beste passen bij jouw situatie",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="text-green-600" size="sm" />
                  </div>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Na het gesprek krijg je een helder overzicht en weten we of een persoonlijk adviesrapport voor jou zinvol is.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <AtmosphereImage 
            src="/calculator-growth.png"
            alt="Zelfverzekerde blik naar de toekomst - groei en resultaat"
            className="h-64 lg:h-96 w-full"
          />
        </div>
      </div>
    </section>
  );
}

function WerkgeversSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
              <BuildingIcon className="text-white" size="sm" />
              <span className="text-sm font-medium text-white">Voor werkgevers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Pensioenadvies voor uw organisatie
            </h2>
            <p className="text-blue-100 text-lg max-w-xl">
              Collectieve presentaties, 1-op-1 gesprekken en transitieadvies. 
              Voldoe aan de Wet toekomst pensioenen.
            </p>
          </div>
          <Link 
            href="/werkgevers" 
            className="flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all whitespace-nowrap"
          >
            Bekijk werkgeversaanbod
            <ArrowRightIcon size="md" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative">
        <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
          <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-orange-300">Gratis inventarisatie beschikbaar</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">Krijg duidelijkheid<br />over <span className="text-orange-400">jouw</span> pensioen</h2>
        <p className="text-base sm:text-lg text-slate-300 mb-3 sm:mb-4 max-w-2xl mx-auto px-4">Je bent 1 gesprek verwijderd van volledige duidelijkheid over je pensioen.</p>
        <p className="text-sm sm:text-base text-slate-400 mb-8 sm:mb-10 max-w-xl mx-auto px-4">Gratis inventarisatiegesprek van 1-1,5 uur. 100% vrijblijvend.</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 px-4">
          <Link href="#contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 active:scale-[0.98] transition-all text-base sm:text-lg">
            Ja, ik wil mijn gratis inventarisatie
            <ArrowRightIcon size="md" />
          </Link>
          <a href={`tel:${siteConfig.contact.phoneRaw}`} className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold hover:bg-white/10 active:scale-[0.98] transition-all text-sm sm:text-base">
            <PhoneIcon className="flex-shrink-0" size="md" />
            <span className="whitespace-nowrap">Bel direct: {siteConfig.contact.phone}</span>
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-2">
            <CheckIcon className="text-green-400" size="sm" />
            Tevreden klanten
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="text-green-400" size="sm" />
            AFM-geregistreerd
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon className="text-green-400" size="sm" />
            Geen verplichtingen
          </span>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-green-700">Nu beschikbaar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">Plan je gratis gesprek</h2>
            <p className="text-base sm:text-lg text-slate-600 mb-4 sm:mb-6">Binnen <span className="font-bold text-orange-500">24 uur</span> reactie gegarandeerd. Vertrouwelijk en vrijblijvend.</p>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5 mb-8">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <ClockIcon className="text-orange-500" size="md" />
                Wat je krijgt: 1-1,5 uur persoonlijke inventarisatie
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">1.</span>
                  <span><strong>Volledige analyse</strong> van je huidige pensioenopbouw</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">2.</span>
                  <span><strong>Strategische vragen</strong> om je doelen en wensen in kaart te brengen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">3.</span>
                  <span><strong>Persoonlijke berekening</strong> van je pensioengat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">4.</span>
                  <span><strong>Advies op maat</strong> met concrete oplossingen</span>
                </li>
              </ul>
              <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-orange-200">100% gratis & vrijblijvend</p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="text-orange-500" size="lg" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Direct bellen</h4>
                  <a href={`tel:${siteConfig.contact.phoneRaw}`} className="text-lg text-orange-500 hover:text-orange-600 font-semibold">{siteConfig.contact.phone}</a>
                  <p className="text-sm text-slate-500">{siteConfig.openingHours}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <EmailIcon className="text-orange-500" size="lg" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">E-mail</h4>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-600 hover:text-orange-500">{siteConfig.contact.email}</a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <ShieldCheckIcon className="text-green-500" size="md" />
                  AFM-geregistreerd
                </span>
                <span className="flex items-center gap-2 text-slate-600">
                  <CheckIcon className="text-green-500" size="md" />
                  Sinds 2009 actief
                </span>
                <span className="flex items-center gap-2 text-slate-600">
                  <CheckIcon className="text-green-500" size="md" />
                  Tevreden klanten
                </span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-5 sm:p-8 border border-slate-200 relative">
            <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
              GRATIS & VRIJBLIJVEND
            </div>
            <div className="pt-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
