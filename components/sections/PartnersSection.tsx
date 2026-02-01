"use client";

import Image from "next/image";
import { LogoLoop } from "@/components/ui/LogoLoop";

// Logo's met echte afbeeldingen
const bankLogos = [
  { 
    src: "/kennisbank/bank-ing-group-investment-finance-retail-banking-ing-belgium-ing-bank-as-financial-institution-png-clipart.jpg",
    alt: "ING Bank",
    title: "ING Bank"
  },
  { 
    src: "/kennisbank/rabobank-logo-vector-free-1157421130694joz3bvlv.png",
    alt: "Rabobank",
    title: "Rabobank"
  },
  { 
    src: "/kennisbank/NIBC_logo.png",
    alt: "NIBC Bank",
    title: "NIBC Bank"
  },
  { 
    src: "/kennisbank/RegioBank_logo_(2018).png",
    alt: "RegioBank",
    title: "RegioBank"
  },
  { 
    src: "/kennisbank/Triodos_Bank.png",
    alt: "Triodos Bank",
    title: "Triodos Bank"
  },
  { 
    src: "/kennisbank/png-transparent-centraal-beheer-hd-logo-thumbnail.png",
    alt: "Centraal Beheer",
    title: "Centraal Beheer"
  },
];

// Aanvullende tekst-gebaseerde logo's voor partners waar we geen afbeelding van hebben
const textLogos = [
  { node: <span className="font-bold text-[#004D40] text-lg">ABN AMRO</span>, title: "ABN AMRO" },
  { node: <span className="font-bold text-[#00529B] text-lg">NN</span>, title: "Nationale-Nederlanden" },
  { node: <span className="font-bold text-[#003366] text-lg">Aegon</span>, title: "Aegon" },
  { node: <span className="font-bold text-[#E4002B] text-lg">a.s.r.</span>, title: "a.s.r." },
  { node: <span className="font-bold text-[#00A651] text-lg">Brand New Day</span>, title: "Brand New Day" },
  { node: <span className="font-bold text-[#003082] text-lg">Zwitserleven</span>, title: "Zwitserleven" },
];

// Combineer image en text logos
const allPartners = [
  ...bankLogos,
  ...textLogos,
];

export function PartnersSection() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm text-slate-500 mb-6">
          Wij werken samen met <strong className="text-slate-700">42 banken, verzekeraars en vermogensbeheerders</strong>
        </p>
        <LogoLoop
          logos={allPartners}
          speed={50}
          direction="left"
          logoHeight={40}
          gap={60}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="rgb(248, 250, 252)"
          ariaLabel="Onze partners: Nederlandse banken en verzekeraars"
          className="partner-logos"
        />
      </div>
    </section>
  );
}

// Visuele versie met kaartjes
export function PartnersSectionVisual() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-sm text-slate-500 mb-2">Onafhankelijk advies via</p>
          <p className="text-lg font-semibold text-slate-800">42 banken, verzekeraars & vermogensbeheerders</p>
        </div>
        <LogoLoop
          logos={allPartners}
          speed={40}
          direction="left"
          logoHeight={36}
          gap={48}
          pauseOnHover={true}
          scaleOnHover={false}
          fadeOut={true}
          fadeOutColor="white"
          ariaLabel="Onze partners"
        />
        
        {/* Extra trust indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            100% onafhankelijk
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Geen provisie
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Altijd de beste keuze voor jou
          </span>
        </div>
      </div>
    </section>
  );
}

// Versie met alleen echte logo afbeeldingen
export function PartnersSectionImages() {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Onze Partners</span>
          <h3 className="text-2xl font-bold text-slate-800 mt-2 mb-3">
            Wij vergelijken voor jou
          </h3>
          <p className="text-slate-600">
            Onafhankelijk advies via 42 banken, verzekeraars en vermogensbeheerders
          </p>
        </div>
        
        {/* Logo grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center mb-8">
          {bankLogos.map((logo, index) => (
            <div 
              key={index}
              className="w-full h-16 flex items-center justify-center p-3 bg-white rounded-xl border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all group"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="max-h-10 w-auto object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all"
              />
            </div>
          ))}
        </div>
        
        <p className="text-center text-sm text-slate-400">
          En nog 36 andere aanbieders...
        </p>
      </div>
    </section>
  );
}
