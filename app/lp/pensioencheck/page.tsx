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
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 200);
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
          message: `Situatie: ${formData.situatie}\nLeeftijd: ${formData.leeftijd}\nPensioenpotjes: ${formData.pensioenPotjes}\nInkomen: ${formData.inkomen}\nDoel: ${formData.doel}`,
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
      <div className="min-h-screen bg-[#f8fafc]">
        <Header />
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">Bedankt voor je aanvraag!</h1>
            <p className="text-gray-600 mb-6">We nemen binnen 1 werkdag contact met je op.</p>
            <Link href="/" className="text-[#1e56a0] hover:underline text-sm">
              ← Terug naar homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side - Form */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Progress indicator */}
              <div className="h-1 bg-gray-100">
                <div 
                  className="h-full bg-[#1e56a0] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>

              <div className="p-6 lg:p-8">
                {/* Form steps */}
                <div className="min-h-[420px]">
                  {currentStep === 0 && <StepSituatie value={formData.situatie} onSelect={(v) => handleSelect("situatie", v)} />}
                  {currentStep === 1 && <StepLeeftijd value={formData.leeftijd} onSelect={(v) => handleSelect("leeftijd", v)} />}
                  {currentStep === 2 && <StepPensioenPotjes value={formData.pensioenPotjes} onSelect={(v) => handleSelect("pensioenPotjes", v)} />}
                  {currentStep === 3 && <StepInkomen value={formData.inkomen} onSelect={(v) => handleSelect("inkomen", v)} />}
                  {currentStep === 4 && <StepDoel value={formData.doel} onSelect={(v) => handleSelect("doel", v)} />}
                  {currentStep === 5 && <StepNaam value={formData.naam} onChange={(v) => handleInputChange("naam", v)} onNext={handleNext} />}
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
                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
                  {currentStep > 0 ? (
                    <button onClick={handleBack} className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Vorige
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep === totalSteps - 1 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.email || !formData.telefoon}
                      className="bg-[#22c55e] hover:bg-[#16a34a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2"
                    >
                      {isSubmitting ? "Versturen..." : "Verstuur aanvraag"}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="text-[#1e56a0] hover:text-[#164180] text-sm flex items-center gap-1"
                    >
                      of klik op <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">Enter ↵</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sidebar */}
          <div className="lg:w-[320px] space-y-4">
            
            {/* Jouw doel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Jouw doel</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ontdek vrijblijvend waar je staat met je pensioen en wat je mogelijkheden zijn.
              </p>
            </div>

            {/* Speciaal voor pensioen */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Speciaal voor pensioen</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bereken vrijblijvend jouw pensioensituatie en ontdek of je op koers ligt.
              </p>
            </div>

            {/* Zoals jij dat wilt */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Zoals jij dat wilt</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ontvang persoonlijk advies afgestemd op jouw situatie en wensen.
              </p>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold text-[#1e56a0]">4.9</span>
                <div className="flex text-yellow-400 text-sm">★★★★★</div>
              </div>
              <p className="text-gray-500 text-xs mb-3">van 225+ tevreden klanten</p>
              
              <div className="border-t border-gray-100 pt-3 space-y-3">
                <Review 
                  name="Peter v.D."
                  date="1 week geleden"
                  title="zeer goed"
                  text="Eindelijk duidelijkheid over mijn pensioen."
                />
                <Review 
                  name="Marieke J."
                  date="2 weken geleden"
                  title="goede ervaring"
                  text="Prettig en helder advies gekregen."
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 py-6 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-700">Privacybeleid</Link>
            <Link href="/cookies" className="hover:text-gray-700">Cookievoorkeuren</Link>
            <Link href="/voorwaarden" className="hover:text-gray-700">Disclaimer</Link>
          </div>
          <p>AFM-vergunning: {siteConfig.compliance.afmNumber}</p>
        </div>
      </footer>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/pig.only.png" alt="" width={36} height={36} />
            <span className="font-semibold text-gray-900">MijnPensioenGevuld</span>
          </Link>

          {/* Trust badges */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-4">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-700">
                <strong>4.9</strong> van 225+ klanten
              </span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-green-600 font-medium">✓ Gratis & vrijblijvend</span>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-[#1e56a0] text-white py-2">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-1 text-xs md:text-sm">
          <span>✓ Binnen 1 werkdag duidelijkheid</span>
          <span>✓ Gratis & vrijblijvend!</span>
          <span>✓ 100% onafhankelijk advies</span>
        </div>
      </div>
    </header>
  );
}

function Review({ name, date, title, text }: { name: string; date: string; title: string; text: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 bg-[#1e56a0] rounded-full flex items-center justify-center text-white text-xs font-medium">
          {name.charAt(0)}
        </div>
        <span className="text-gray-800 text-xs font-medium">{name}</span>
        <span className="text-gray-400 text-xs">{date}</span>
      </div>
      <p className="text-gray-800 text-xs font-medium">{title}</p>
      <p className="text-gray-600 text-xs">{text}</p>
    </div>
  );
}

// Option button component - exact style
function OptionButton({ 
  selected, 
  onClick, 
  children 
}: { 
  selected: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-md border-2 transition-all ${
        selected 
          ? "border-[#1e56a0] bg-blue-50 text-[#1e56a0]" 
          : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          selected ? "border-[#1e56a0]" : "border-gray-300"
        }`}>
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#1e56a0]" />}
        </div>
        <span className="text-sm">{children}</span>
      </div>
    </button>
  );
}

// Step components
function StepSituatie({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Wat is jouw werksituatie?*</h2>
      <p className="text-gray-500 text-sm mb-6">Dit helpt ons om je advies af te stemmen.</p>
      <div className="space-y-2">
        <OptionButton selected={value === "loondienst"} onClick={() => onSelect("loondienst")}>
          Ik ben in loondienst
        </OptionButton>
        <OptionButton selected={value === "zzp"} onClick={() => onSelect("zzp")}>
          Ik ben ZZP'er / ondernemer
        </OptionButton>
        <OptionButton selected={value === "beiden"} onClick={() => onSelect("beiden")}>
          Ik combineer loondienst en ZZP
        </OptionButton>
        <OptionButton selected={value === "gepensioneerd"} onClick={() => onSelect("gepensioneerd")}>
          Ik ben (bijna) met pensioen
        </OptionButton>
      </div>
    </div>
  );
}

function StepLeeftijd({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Wat is je leeftijd?*</h2>
      <p className="text-gray-500 text-sm mb-6">Je leeftijd bepaalt hoeveel tijd je nog hebt.</p>
      <div className="space-y-2">
        <OptionButton selected={value === "25-35"} onClick={() => onSelect("25-35")}>25 - 35 jaar</OptionButton>
        <OptionButton selected={value === "35-45"} onClick={() => onSelect("35-45")}>35 - 45 jaar</OptionButton>
        <OptionButton selected={value === "45-55"} onClick={() => onSelect("45-55")}>45 - 55 jaar</OptionButton>
        <OptionButton selected={value === "55-65"} onClick={() => onSelect("55-65")}>55 - 65 jaar</OptionButton>
        <OptionButton selected={value === "65+"} onClick={() => onSelect("65+")}>65 jaar of ouder</OptionButton>
      </div>
    </div>
  );
}

function StepPensioenPotjes({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Bij hoeveel werkgevers heb je pensioen opgebouwd?*</h2>
      <p className="text-gray-500 text-sm mb-6">Hoe meer potjes, hoe belangrijker overzicht.</p>
      <div className="space-y-2">
        <OptionButton selected={value === "1"} onClick={() => onSelect("1")}>1 werkgever</OptionButton>
        <OptionButton selected={value === "2-3"} onClick={() => onSelect("2-3")}>2-3 werkgevers</OptionButton>
        <OptionButton selected={value === "4+"} onClick={() => onSelect("4+")}>4 of meer werkgevers</OptionButton>
        <OptionButton selected={value === "geen"} onClick={() => onSelect("geen")}>Geen / weet ik niet</OptionButton>
      </div>
    </div>
  );
}

function StepInkomen({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Wat is je bruto jaarinkomen?*</h2>
      <p className="text-gray-500 text-sm mb-6">Dit helpt inschatten hoeveel fiscale ruimte je hebt.</p>
      <div className="space-y-2">
        <OptionButton selected={value === "< 40k"} onClick={() => onSelect("< 40k")}>Minder dan €40.000</OptionButton>
        <OptionButton selected={value === "40-60k"} onClick={() => onSelect("40-60k")}>€40.000 - €60.000</OptionButton>
        <OptionButton selected={value === "60-80k"} onClick={() => onSelect("60-80k")}>€60.000 - €80.000</OptionButton>
        <OptionButton selected={value === "80-100k"} onClick={() => onSelect("80-100k")}>€80.000 - €100.000</OptionButton>
        <OptionButton selected={value === "> 100k"} onClick={() => onSelect("> 100k")}>Meer dan €100.000</OptionButton>
        <OptionButton selected={value === "geen"} onClick={() => onSelect("geen")}>Zeg ik liever niet</OptionButton>
      </div>
    </div>
  );
}

function StepDoel({ value, onSelect }: { value: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Wat is je belangrijkste doel?*</h2>
      <p className="text-gray-500 text-sm mb-6">Zo stemmen wij ons advies af op jouw wensen.</p>
      <div className="space-y-2">
        <OptionButton selected={value === "overzicht"} onClick={() => onSelect("overzicht")}>Overzicht krijgen van mijn pensioen</OptionButton>
        <OptionButton selected={value === "tekort"} onClick={() => onSelect("tekort")}>Pensioentekort oplossen</OptionButton>
        <OptionButton selected={value === "belasting"} onClick={() => onSelect("belasting")}>Belasting besparen</OptionButton>
        <OptionButton selected={value === "eerder-stoppen"} onClick={() => onSelect("eerder-stoppen")}>Eerder stoppen met werken</OptionButton>
      </div>
    </div>
  );
}

function StepNaam({ value, onChange, onNext }: { value: string; onChange: (v: string) => void; onNext: () => void }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Wat is je volledige naam?*</h2>
      <p className="text-gray-500 text-sm mb-6">Bijna klaar! Vul je gegevens in.</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Bijv. Jan Jansen"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#1e56a0] transition-colors text-gray-900"
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
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Hoe kunnen we je bereiken?*</h2>
      <p className="text-gray-500 text-sm mb-6">We nemen binnen 1 werkdag contact met je op.</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Je e-mailadres*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="jan@voorbeeld.nl"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#1e56a0] transition-colors text-gray-900"
          />
          <p className="text-xs text-gray-400 mt-1">We sturen je een overzicht van de door jou ingevulde gegevens.</p>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Je telefoonnummer*</label>
          <input
            type="tel"
            value={telefoon}
            onChange={(e) => onTelefoonChange(e.target.value)}
            placeholder="06 12345678"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#1e56a0] transition-colors text-gray-900"
          />
          <p className="text-xs text-gray-400 mt-1">We nemen één keer telefonisch contact met je op om de aanvraag te bespreken.</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" defaultChecked className="mt-1" />
          <span className="text-xs text-gray-600">
            Ik ga akkoord met het verzenden en in behandeling nemen van mijn gegevens, waarna er telefonisch contact met mij wordt opgenomen. 
            (<Link href="/privacy" className="text-[#1e56a0] hover:underline">Lees ons privacy statement</Link>)
          </span>
        </label>
      </div>
    </div>
  );
}
