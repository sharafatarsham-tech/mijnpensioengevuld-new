"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

type FormData = {
  situatie: string;
  leeftijd: string;
  pensioenPotjes: string;
  inkomen: string;
  doel: string;
  naam: string;
  email: string;
  telefoon: string;
};

export default function PensioenCheckWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    situatie: "",
    leeftijd: "",
    pensioenPotjes: "",
    inkomen: "",
    doel: "",
    naam: "",
    email: "",
    telefoon: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 7;

  const handleSelect = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Auto advance after selection
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 300);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.naam,
          email: formData.email,
          phone: formData.telefoon,
          subject: "Pensioencheck Aanvraag",
          message: `
Situatie: ${formData.situatie}
Leeftijd: ${formData.leeftijd}
Pensioenpotjes: ${formData.pensioenPotjes}
Inkomen: ${formData.inkomen}
Doel: ${formData.doel}
          `.trim(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Bedankt voor je aanvraag!</h1>
            <p className="text-lg text-slate-600 mb-8">
              We nemen binnen 24 uur contact met je op om een gratis intakegesprek in te plannen.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <p className="text-blue-800 font-medium">Wat kun je verwachten?</p>
              <ul className="text-blue-700 text-sm mt-3 space-y-2 text-left max-w-sm mx-auto">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  Binnen 24 uur bellen we je voor een afspraak
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  Gratis gesprek van ca. 30 minuten
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  Direct duidelijkheid over je pensioensituatie
                </li>
              </ul>
            </div>
            <Link href="/" className="text-blue-600 font-semibold hover:underline">
              ← Terug naar homepage
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Progress Bar */}
              <div className="bg-slate-100 h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>

              {/* Form Content */}
              <div className="p-8 lg:p-12">
                {/* Step Counter */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                    Stap {currentStep + 1} van {totalSteps}
                  </span>
                </div>

                {/* Step Content */}
                <div className="min-h-[400px]">
                  {currentStep === 0 && (
                    <StepSituatie 
                      value={formData.situatie} 
                      onSelect={(v) => handleSelect("situatie", v)} 
                    />
                  )}
                  {currentStep === 1 && (
                    <StepLeeftijd 
                      value={formData.leeftijd} 
                      onSelect={(v) => handleSelect("leeftijd", v)} 
                    />
                  )}
                  {currentStep === 2 && (
                    <StepPensioenPotjes 
                      value={formData.pensioenPotjes} 
                      onSelect={(v) => handleSelect("pensioenPotjes", v)} 
                    />
                  )}
                  {currentStep === 3 && (
                    <StepInkomen 
                      value={formData.inkomen} 
                      onSelect={(v) => handleSelect("inkomen", v)} 
                    />
                  )}
                  {currentStep === 4 && (
                    <StepDoel 
                      value={formData.doel} 
                      onSelect={(v) => handleSelect("doel", v)} 
                    />
                  )}
                  {currentStep === 5 && (
                    <StepNaam 
                      value={formData.naam} 
                      onChange={(v) => handleInputChange("naam", v)} 
                    />
                  )}
                  {currentStep === 6 && (
                    <StepContact 
                      email={formData.email}
                      telefoon={formData.telefoon}
                      onEmailChange={(v) => handleInputChange("email", v)}
                      onTelefoonChange={(v) => handleInputChange("telefoon", v)}
                    />
                  )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Vorige
                  </button>

                  {currentStep < totalSteps - 1 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                    >
                      Volgende
                      <span className="text-blue-300 text-sm">of Enter ↵</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.email || !formData.telefoon}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                    >
                      {isSubmitting ? "Versturen..." : "Verstuur aanvraag"}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Goal Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Image src="/pig.only.png" alt="" width={32} height={32} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Jouw doel</h3>
                  <p className="text-sm text-slate-500">Pensioencheck</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ontdek vrijblijvend waar je staat met je pensioen. Wij brengen al je regelingen in kaart en geven helder advies.
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-4">Speciaal voor jou</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>100% gratis & vrijblijvend</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Binnen 1 werkdag reactie</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Onafhankelijk advies</span>
                </li>
              </ul>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-slate-800">4.9</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <Image src="/kennisbank/rabobank_logo_icon_169809.png" alt="Google" width={24} height={24} className="opacity-50" />
              </div>
              <p className="text-sm text-slate-500 mb-4">van 225+ tevreden klanten</p>
              
              {/* Mini Review */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    P
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">Peter v.D.</p>
                    <p className="text-xs text-slate-400">1 week geleden</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic">
                  "Eindelijk duidelijkheid! Heel prettig gesprek gehad."
                </p>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-500 mb-2">AFM-geregistreerd</p>
              <p className="text-sm font-medium text-slate-700">Nr. {siteConfig.compliance.afmNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/pig.only.png" alt="" width={40} height={40} />
            <span className="font-bold text-slate-800 text-lg hidden sm:block">MijnPensioenGevuld</span>
          </Link>

          {/* Trust Badges */}
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">✓</span>
              <span className="text-slate-600">Gratis & vrijblijvend</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">⚡</span>
              <span className="text-slate-600">Binnen 1 werkdag reactie</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-bold text-slate-800">4.9</span>
              <span className="text-slate-400 text-sm hidden sm:inline">/ 225+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Step Components
function StepSituatie({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  const options = [
    { value: "loondienst", label: "Ik ben in loondienst", icon: "👔" },
    { value: "zzp", label: "Ik ben ZZP'er / ondernemer", icon: "💼" },
    { value: "beiden", label: "Ik combineer loondienst en ZZP", icon: "🔄" },
    { value: "gepensioneerd", label: "Ik ben (bijna) met pensioen", icon: "🏖️" },
  ];

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
        Wat is jouw werksituatie?
      </h2>
      <p className="text-slate-500 mb-8">
        Dit helpt ons om je pensioenadvies af te stemmen op jouw situatie.
      </p>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
              value === option.value
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <span className="text-2xl">{option.icon}</span>
            <span className="font-medium text-slate-800">{option.label}</span>
            {value === option.value && (
              <svg className="w-6 h-6 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepLeeftijd({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  const options = [
    { value: "25-35", label: "25 - 35 jaar" },
    { value: "35-45", label: "35 - 45 jaar" },
    { value: "45-55", label: "45 - 55 jaar" },
    { value: "55-65", label: "55 - 65 jaar" },
    { value: "65+", label: "65 jaar of ouder" },
  ];

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
        Wat is je leeftijd?
      </h2>
      <p className="text-slate-500 mb-8">
        Je leeftijd bepaalt hoeveel tijd je nog hebt om pensioen op te bouwen.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`p-5 rounded-2xl border-2 transition-all text-center ${
              value === option.value
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <span className="font-medium text-slate-800">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepPensioenPotjes({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  const options = [
    { value: "1", label: "1 werkgever", desc: "Altijd bij dezelfde werkgever gewerkt" },
    { value: "2-3", label: "2-3 werkgevers", desc: "Een paar keer van baan gewisseld" },
    { value: "4+", label: "4 of meer", desc: "Veel verschillende werkgevers gehad" },
    { value: "geen", label: "Geen / onbekend", desc: "Ik weet het niet of heb geen pensioen" },
  ];

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
        Bij hoeveel werkgevers heb je pensioen opgebouwd?
      </h2>
      <p className="text-slate-500 mb-8">
        Hoe meer pensioenpotjes, hoe belangrijker het is om overzicht te krijgen.
      </p>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${
              value === option.value
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <div>
              <span className="font-medium text-slate-800 block">{option.label}</span>
              <span className="text-sm text-slate-500">{option.desc}</span>
            </div>
            {value === option.value && (
              <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepInkomen({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  const options = [
    { value: "< 40k", label: "Minder dan €40.000" },
    { value: "40-60k", label: "€40.000 - €60.000" },
    { value: "60-80k", label: "€60.000 - €80.000" },
    { value: "80-100k", label: "€80.000 - €100.000" },
    { value: "> 100k", label: "Meer dan €100.000" },
    { value: "geen", label: "Zeg ik liever niet" },
  ];

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
        Wat is je bruto jaarinkomen?
      </h2>
      <p className="text-slate-500 mb-8">
        Dit helpt ons inschatten hoeveel fiscale ruimte je hebt voor pensioenopbouw.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`p-5 rounded-2xl border-2 transition-all text-center ${
              value === option.value
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <span className="font-medium text-slate-800 text-sm lg:text-base">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDoel({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  const options = [
    { value: "overzicht", label: "Overzicht krijgen", desc: "Ik wil weten waar ik sta", icon: "📊" },
    { value: "tekort", label: "Pensioentekort oplossen", desc: "Ik wil mijn gat dichten", icon: "🎯" },
    { value: "belasting", label: "Belasting besparen", desc: "Ik wil fiscaal voordeel", icon: "💰" },
    { value: "eerder-stoppen", label: "Eerder stoppen met werken", desc: "Ik wil voor 67 met pensioen", icon: "🏖️" },
  ];

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
        Wat is je belangrijkste doel?
      </h2>
      <p className="text-slate-500 mb-8">
        Zo kunnen wij ons advies afstemmen op wat jij wilt bereiken.
      </p>
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
              value === option.value
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <span className="text-2xl">{option.icon}</span>
            <div className="flex-1">
              <span className="font-medium text-slate-800 block">{option.label}</span>
              <span className="text-sm text-slate-500">{option.desc}</span>
            </div>
            {value === option.value && (
              <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepNaam({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
        Hoe mogen we je noemen?
      </h2>
      <p className="text-slate-500 mb-8">
        Bijna klaar! Vul je naam in zodat we je persoonlijk kunnen begroeten.
      </p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Je volledige naam"
        className="w-full px-6 py-5 text-xl border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
        autoFocus
      />
    </div>
  );
}

function StepContact({ 
  email, 
  telefoon, 
  onEmailChange, 
  onTelefoonChange 
}: { 
  email: string; 
  telefoon: string; 
  onEmailChange: (v: string) => void;
  onTelefoonChange: (v: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
        Hoe kunnen we je bereiken?
      </h2>
      <p className="text-slate-500 mb-8">
        We nemen binnen 1 werkdag contact met je op om een gratis gesprek in te plannen.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">E-mailadres *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="jan@voorbeeld.nl"
            required
            className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Telefoonnummer *</label>
          <input
            type="tel"
            value={telefoon}
            onChange={(e) => onTelefoonChange(e.target.value)}
            placeholder="06 12345678"
            required
            className="w-full px-6 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p className="text-sm text-slate-500 mt-2">
            We bellen je één keer om een afspraak in te plannen. Geen spam.
          </p>
        </div>
      </div>

      {/* Trust elements */}
      <div className="mt-8 p-4 bg-slate-50 rounded-xl">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
          </svg>
          <span>Je gegevens zijn veilig en worden niet gedeeld met derden.</span>
        </div>
      </div>
    </div>
  );
}
