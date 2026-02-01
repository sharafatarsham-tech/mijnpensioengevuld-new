"use client";

import { LogoLoop } from "@/components/ui/LogoLoop";

// Partner logos van Nederlandse banken en verzekeraars
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

export function PartnersSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Onze Partners
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
            Wij vergelijken voor jou
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto text-lg">
            Onafhankelijk advies via <strong className="text-slate-800">42 banken, verzekeraars en vermogensbeheerders</strong>
          </p>
        </div>
        
        {/* Logo Loop - animatie met alle logos */}
        <div className="relative py-4">
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
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-slate-600">
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">100% onafhankelijk</span>
            </span>
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Geen provisie</span>
            </span>
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Altijd jouw belang voorop</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export voor backwards compatibility
export const PartnersSectionVisual = PartnersSection;
export const PartnersSectionImages = PartnersSection;
