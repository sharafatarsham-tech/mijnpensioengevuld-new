"use client";

import { LogoLoop } from "@/components/ui/LogoLoop";

const partnerLogos = [
  { 
    src: "/kennisbank/png-clipart-ing-group-logo-bank-financial-institution-symbol-bank-ing-group-logo-removebg.png",
    alt: "ING Bank",
    title: "ING Bank",
  },
  { 
    src: "/kennisbank/rabobank_logo_icon_169809.png",
    alt: "Rabobank",
    title: "Rabobank",
  },
  { 
    src: "/kennisbank/Nationale-Nederlanden-logo-e1556809628966.png",
    alt: "Nationale-Nederlanden",
    title: "Nationale-Nederlanden",
  },
  { 
    src: "/kennisbank/NIBC_logo.png",
    alt: "NIBC Bank",
    title: "NIBC Bank",
  },
  { 
    src: "/kennisbank/RegioBank_logo_(2018).png",
    alt: "RegioBank",
    title: "RegioBank",
  },
  { 
    src: "/kennisbank/Triodos_Bank.png",
    alt: "Triodos Bank",
    title: "Triodos Bank",
  },
  { 
    src: "/kennisbank/Centraal_Beheer_logo.svg",
    alt: "Centraal Beheer",
    title: "Centraal Beheer",
  },
];

export default function TrustLogos() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-medium text-slate-500 mb-8">
          Wij vergelijken voor jou bij <strong className="text-slate-700">meer dan 40 aanbieders</strong>
        </p>
        
        <LogoLoop
          logos={partnerLogos}
          speed={40}
          direction="left"
          logoHeight={45}
          gap={60}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="rgb(248, 250, 252)"
          scaleOnHover={true}
          ariaLabel="Onze partners: Nederlandse banken en verzekeraars"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#0d9488]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            100% onafhankelijk
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#0d9488]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            Geen provisie
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#0d9488]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            Jouw belang voorop
          </span>
        </div>
      </div>
    </section>
  );
}
