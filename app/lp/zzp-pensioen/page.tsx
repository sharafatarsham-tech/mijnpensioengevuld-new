"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { isValidEmail } from "@/lib/utils";

export default function LandingPageZZP() {
  const [todayCount, setTodayCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // Simulate realistic counters (in production, fetch from API)
    const baseToday = 3 + Math.floor(Math.random() * 4); // 3-6
    const baseTotal = 847 + Math.floor(Math.random() * 50);
    setTodayCount(baseToday);
    setTotalCount(baseTotal);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Minimal Header */}
      <header className="py-4 px-6 flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/pig-favicon-v2.png" alt="" width={32} height={32} />
          <span className="font-bold text-white">MijnPensioenGevuld</span>
        </Link>
        <a href={`tel:${siteConfig.contact.phoneRaw}`} className="text-sm text-slate-300 hover:text-orange-400 flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {siteConfig.contact.phone}
        </a>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 lg:py-16">
        {/* Hero Section with Background Image */}
        <div className="text-center mb-12 relative">
          {/* Decorative background element */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-orange-300">Speciaal voor ZZP'ers & ondernemers</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Laat jij €10.000+ belastingvoordeel liggen?
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mt-2">
                Ontdek het in de gratis ZZP pensioencheck
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              In 2 minuten weet je: hoeveel jaarruimte je hebt, wat je pensioentekort is, 
              en hoe je vanaf <strong className="text-white">€100/maand</strong> slim pensioen opbouwt.
            </p>
          </div>

          {/* Social Proof Bar */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-sm text-slate-400 mb-8">
            <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <strong className="text-white">{todayCount}</strong> checks vandaag
            </span>
            <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <strong className="text-white">9.2</strong> score
            </span>
            <span className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-full text-green-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <strong>96%</strong> beveelt ons aan
            </span>
            <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <strong className="text-white">{totalCount}+</strong> geholpen
            </span>
          </div>
        </div>

        {/* Hero Image - Small decorative pig */}
        <div className="flex justify-center mb-8 lg:hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl" />
            <Image 
              src="/pig-favicon-v2.png" 
              alt="MijnPensioenGevuld mascot" 
              width={80} 
              height={80}
              className="relative"
            />
          </div>
        </div>

        {/* Multi-Step Form with Info Sidebar */}
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Info Sidebar - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block lg:order-2">
              <div className="sticky top-4 space-y-4">
                {/* Info Box */}
                <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-white">Goed om te weten</h4>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2 text-slate-300">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Al vanaf <strong className="text-white">€100/maand</strong> pensioen opbouwen</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-300">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Max. jaarruimte 2026: <strong className="text-white">€35.589</strong></span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-300">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Direct <strong className="text-white">belastingvoordeel</strong> (tot 49,5%)</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-300">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Hoe eerder je begint, hoe <strong className="text-white">goedkoper</strong></span>
                    </li>
                  </ul>
                </div>

                {/* Mini testimonial */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <p className="text-slate-400 text-xs italic mb-3">"Correcte en deskundige service. Adequaat en vriendelijk geadviseerd."</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">- Peter, Den Haag</span>
                  </div>
                </div>

                {/* Decorative pig image */}
                <div className="relative flex justify-center py-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-orange-500/10 rounded-full blur-2xl" />
                  </div>
                  <Image 
                    src="/pig-favicon-v2.png" 
                    alt="" 
                    width={100} 
                    height={100}
                    className="relative opacity-80"
                  />
                </div>
              </div>
            </div>

            {/* Form - Takes 2 columns */}
            <div className="lg:col-span-2 lg:order-1">
              <MultiStepForm />
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-slate-400">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            AFM-geregistreerd
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            100% onafhankelijk advies
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Gratis & vrijblijvend
          </span>
        </div>

        {/* Misverstanden Section - Like Competitor */}
        <div className="mt-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-4">
            De 5 grootste misverstanden over pensioen als ZZP'er
          </h2>
          <p className="text-slate-400 text-center mb-10 max-w-xl mx-auto">
            Herken jij je hierin? Je bent niet de enige.
          </p>
          
          <div className="grid gap-4">
            {[
              {
                myth: '"Ik heb nog tijd genoeg om later te beginnen"',
                truth: "Elk jaar uitstel kost je duizenden euro's aan gemist rendement. Door het rente-op-rente effect is vroeg beginnen vele malen voordeliger dan later meer inleggen."
              },
              {
                myth: '"AOW is genoeg voor mij"',
                truth: "De AOW is momenteel ~€1.400 netto per maand. Kun je daarvan je huidige levensstijl behouden? De meeste ZZP'ers hebben een pensioengat van €500-€1.500 per maand."
              },
              {
                myth: '"Extra pensioen opbouwen kan alleen met veel geld"',
                truth: "Al vanaf €100 per maand is pensioenopbouw zinvol. En als ZZP'er kun je dit bedrag vaak direct aftrekken van je belasting - dus het kost je netto veel minder."
              },
              {
                myth: '"Ik stop mijn geld liever in mijn eigen bedrijf"',
                truth: "Begrijpelijk, maar wat als je bedrijf stopt of minder waard wordt? Pensioen spreiden is verstandig. Plus: de belastingaftrek maakt het aantrekkelijker dan je denkt."
              },
              {
                myth: '"Pensioenadvies is duur en ingewikkeld"',
                truth: "Ons eerste gesprek is 100% gratis én vrijblijvend. We brengen je situatie in kaart en geven je concrete opties - zonder verplichting."
              }
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-orange-500/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">{item.myth}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.truth}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Break - Peace of Mind Image */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 z-10 pointer-events-none" />
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/50">
            <Image 
              src="/why-peace.png" 
              alt="Rust en zekerheid voor je pensioen" 
              width={1200}
              height={400}
              className="w-full h-48 lg:h-64 object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center px-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  Rust in je hoofd over je pensioen
                </h3>
                <p className="text-slate-200 text-sm lg:text-base max-w-md mx-auto drop-shadow-md">
                  Weet waar je aan toe bent en geniet nu al van de zekerheid
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Wat andere ZZP'ers zeggen
          </h2>
          <p className="text-slate-400 text-center mb-10">
            <strong className="text-green-400">96% van onze klanten</strong> beveelt ons aan
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "Eindelijk iemand die het helder uitlegt zonder te pushen. Ik weet nu precies hoeveel jaarruimte ik heb en welke optie bij mij past.",
                name: "Sandra K.",
                role: "Grafisch ontwerper",
                location: "Eindhoven",
                date: "januari 2026",
                rating: 5
              },
              {
                quote: "Ik dacht dat ik te weinig verdiende voor pensioenopbouw. Blijkt dat ik €12.000 jaarruimte had en nu €3.600 minder belasting betaal!",
                name: "Mark T.",
                role: "IT Consultant",
                location: "Amsterdam",
                date: "december 2025",
                rating: 5
              },
              {
                quote: "Heel fijn dat het eerste gesprek gratis was. Geen verkoopdruk, gewoon eerlijk advies. Ik ben nu klant en heel tevreden.",
                name: "Lisa M.",
                role: "Copywriter",
                location: "Utrecht",
                date: "november 2025",
                rating: 5
              },
              {
                quote: "Als starter dacht ik: pensioen komt later wel. Gelukkig heeft dit gesprek me wakker geschud. Nu leg ik €200/maand in.",
                name: "Tom B.",
                role: "Marketeer",
                location: "Den Bosch",
                date: "januari 2026",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">{testimonial.date}</span>
                </div>
                <blockquote className="text-slate-300 text-sm italic mb-4">"{testimonial.quote}"</blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                    <p className="text-slate-500 text-xs">{testimonial.role}</p>
                  </div>
                  <span className="text-xs text-slate-600">{testimonial.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Klaar om je pensioen goed te regelen?
          </h2>
          <p className="text-orange-100 mb-8 max-w-xl mx-auto">
            Start de gratis pensioencheck en ontdek binnen 2 minuten hoeveel fiscaal voordeel je laat liggen.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Start de gratis pensioencheck →
          </button>
          <p className="text-orange-200 text-sm mt-4">100% gratis • Geen verplichtingen • 2 minuten</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800 mt-12 pb-24 lg:pb-8">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name} • AFM-register: {siteConfig.compliance.afmNumber}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/voorwaarden" className="hover:text-slate-300 transition-colors">Voorwaarden</Link>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-700 p-4 shadow-2xl lg:hidden z-50">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3.5 rounded-xl font-bold text-center shadow-lg"
        >
          Start gratis pensioencheck →
        </button>
      </div>
    </div>
  );
}

// Multi-step form component
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    // Step 1
    pensionBuilding: "",
    // Step 2
    usingJaarruimte: "",
    // Step 3
    earlierPension: "",
    // Step 4
    age: "",
    income: "",
    // Step 5
    name: "",
    email: "",
    phone: "",
    privacy: false,
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.privacy) return;
    if (!isValidEmail(formData.email)) return;

    setFormState("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: "lp-zzp-pensioen-quiz",
          situatie: "zzp",
          extra: {
            pensionBuilding: formData.pensionBuilding,
            usingJaarruimte: formData.usingJaarruimte,
            earlierPension: formData.earlierPension,
            age: formData.age,
            income: formData.income,
          }
        }),
      });
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Top, je aanvraag is binnen! 🎉</h3>
        <p className="text-slate-300 mb-6">
          We nemen binnen 24 uur contact met je op voor je persoonlijke ZZP pensioencheck.
        </p>
        <div className="bg-slate-700/50 rounded-xl p-4 text-left text-sm text-slate-400">
          <p className="font-semibold text-white mb-2">Wat kun je verwachten:</p>
          <ul className="space-y-1">
            <li>✓ Berekening van je jaarruimte</li>
            <li>✓ Inzicht in je pensioentekort</li>
            <li>✓ Advies over de beste optie voor jou</li>
            <li>✓ Antwoord op al je vragen</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 lg:p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Stap {step} van {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% compleet</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content - with fade animation */}
      <div className="min-h-[280px] animate-in fade-in duration-300">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">Bouw je al pensioen op?</h3>
            {[
              { value: "nee", label: "Nee, ik bouw geen pensioen op", emoji: "❌" },
              { value: "zelf", label: "Ja, dit regel ik zelf", emoji: "💪" },
              { value: "vroeger", label: "Vroeger wel, nu niet meer", emoji: "⏸️" },
              { value: "weet-niet", label: "Ik weet het niet zeker", emoji: "🤔" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => { setFormData({ ...formData, pensionBuilding: option.value }); handleNext(); }}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                  formData.pensionBuilding === option.value
                    ? "bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/10"
                    : "bg-slate-700/50 border-slate-600 text-slate-300 hover:border-orange-500/50 hover:bg-slate-700"
                }`}
              >
                <span className="mr-3 text-lg">{option.emoji}</span>
                {option.label}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">Benut je je fiscale jaarruimte?</h3>
            <p className="text-slate-400 text-sm mb-4">
              Jaarruimte = het bedrag dat je fiscaal vriendelijk mag inleggen voor pensioen (max €35.589 in 2026)
            </p>
            {[
              { value: "ja", label: "Ja, ik benut mijn jaarruimte", emoji: "✅" },
              { value: "nee", label: "Nee, ik benut deze niet", emoji: "❌" },
              { value: "gedeeltelijk", label: "Gedeeltelijk", emoji: "🔄" },
              { value: "weet-niet", label: "Ik weet niet wat dit is", emoji: "❓" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => { setFormData({ ...formData, usingJaarruimte: option.value }); handleNext(); }}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                  formData.usingJaarruimte === option.value
                    ? "bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/10"
                    : "bg-slate-700/50 border-slate-600 text-slate-300 hover:border-orange-500/50 hover:bg-slate-700"
                }`}
              >
                <span className="mr-3 text-lg">{option.emoji}</span>
                {option.label}
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">Zou je eerder met pensioen willen?</h3>
            {[
              { value: "ja-graag", label: "Ja, ik wil eerder stoppen met werken", emoji: "🏖️" },
              { value: "misschien", label: "Misschien, als het financieel kan", emoji: "🤔" },
              { value: "aow-leeftijd", label: "Nee, de AOW-leeftijd is prima", emoji: "👍" },
              { value: "weet-niet", label: "Weet ik nog niet", emoji: "❓" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => { setFormData({ ...formData, earlierPension: option.value }); handleNext(); }}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                  formData.earlierPension === option.value
                    ? "bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/10"
                    : "bg-slate-700/50 border-slate-600 text-slate-300 hover:border-orange-500/50 hover:bg-slate-700"
                }`}
              >
                <span className="mr-3 text-lg">{option.emoji}</span>
                {option.label}
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">Even wat achtergrond</h3>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2 font-medium">Wat is je leeftijd?</label>
              <select
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-700/50 border border-slate-600 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
              >
                <option value="">Selecteer je leeftijd...</option>
                <option value="18-30">18 - 30 jaar</option>
                <option value="31-40">31 - 40 jaar</option>
                <option value="41-50">41 - 50 jaar</option>
                <option value="51-60">51 - 60 jaar</option>
                <option value="60+">60+ jaar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2 font-medium">Wat is je jaarinkomen (ongeveer)?</label>
              <select
                value={formData.income}
                onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-700/50 border border-slate-600 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
              >
                <option value="">Selecteer je inkomen...</option>
                <option value="< 30k">Minder dan €30.000</option>
                <option value="30-50k">€30.000 - €50.000</option>
                <option value="50-75k">€50.000 - €75.000</option>
                <option value="75-100k">€75.000 - €100.000</option>
                <option value="> 100k">Meer dan €100.000</option>
              </select>
            </div>

            <button
              onClick={handleNext}
              disabled={!formData.age || !formData.income}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              Volgende stap →
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">Bijna klaar! 🎉</h3>
            <p className="text-slate-400 text-sm mb-6">
              Vul je gegevens in en we nemen binnen 24 uur contact op voor je persoonlijke pensioencheck.
            </p>
            
            <div>
              <label className="block text-sm text-slate-400 mb-1.5 font-medium">Naam *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Je volledige naam"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-1.5 font-medium">E-mail *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="je@email.nl"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-1.5 font-medium">Telefoon *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="06 - 1234 5678"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
              />
            </div>

            <div className="flex items-start gap-3 bg-slate-700/30 p-3 rounded-xl border border-slate-700">
              <input
                type="checkbox"
                id="privacy-zzp"
                checked={formData.privacy}
                onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                className="mt-0.5 w-5 h-5 rounded border-slate-600 bg-slate-700 text-orange-500 focus:ring-orange-500 focus:ring-2 cursor-pointer"
              />
              <label htmlFor="privacy-zzp" className="text-sm text-slate-300 cursor-pointer">
                Ik ga akkoord met het <a href="/privacy" className="text-orange-400 hover:underline font-medium">privacybeleid</a>
              </label>
            </div>

            {formState === "error" && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
                <p className="text-red-400 text-sm">Er ging iets mis. Probeer het opnieuw.</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={formState === "loading" || !formData.name || !formData.email || !formData.phone || !formData.privacy}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              {formState === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Versturen...
                </span>
              ) : "Ontvang mijn gratis pensioencheck →"}
            </button>

            <p className="text-center text-xs text-slate-500">
              🔒 Je gegevens zijn veilig • Geen spam • 100% gratis
            </p>
          </div>
        )}
      </div>

      {/* Back Button - shown on all steps except first */}
      {step > 1 && (
        <button
          onClick={handleBack}
          className="mt-4 text-slate-400 text-sm hover:text-white transition-colors flex items-center gap-1 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Vorige stap
        </button>
      )}
    </div>
  );
}
