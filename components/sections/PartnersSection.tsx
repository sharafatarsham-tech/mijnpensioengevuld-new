"use client";

import { LogoLoop } from "@/components/ui/LogoLoop";

// Nederlandse banken en verzekeraars - text-based logos
const financialPartners = [
  { node: <span className="font-bold text-[#FF6200]">ING</span>, title: "ING Bank" },
  { node: <span className="font-bold text-[#004D40]">ABN AMRO</span>, title: "ABN AMRO" },
  { node: <span className="font-bold text-[#FF6600]">Rabobank</span>, title: "Rabobank" },
  { node: <span className="font-bold text-[#00529B]">Nationale-Nederlanden</span>, title: "Nationale-Nederlanden" },
  { node: <span className="font-bold text-[#003366]">Aegon</span>, title: "Aegon" },
  { node: <span className="font-bold text-[#E4002B]">a.s.r.</span>, title: "a.s.r. verzekeringen" },
  { node: <span className="font-bold text-[#009FE3]">Centraal Beheer</span>, title: "Centraal Beheer" },
  { node: <span className="font-bold text-[#00A651]">Brand New Day</span>, title: "Brand New Day" },
  { node: <span className="font-bold text-[#1D1D1B]">OHRA</span>, title: "OHRA" },
  { node: <span className="font-bold text-[#003082]">Zwitserleven</span>, title: "Zwitserleven" },
  { node: <span className="font-bold text-[#E30613]">Allianz</span>, title: "Allianz" },
  { node: <span className="font-bold text-[#00205B]">AXA</span>, title: "AXA" },
];

export function PartnersSection() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm text-slate-500 mb-6">
          Wij werken samen met <strong className="text-slate-700">42 banken, verzekeraars en vermogensbeheerders</strong>
        </p>
        <LogoLoop
          logos={financialPartners}
          speed={60}
          direction="left"
          logoHeight={24}
          gap={48}
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

// Alternatieve versie met meer visuele logo's
export function PartnersSectionVisual() {
  const partners = [
    { 
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="w-8 h-8 bg-[#FF6200] rounded-full flex items-center justify-center text-white font-bold text-xs">ING</div>
          <span className="text-sm font-semibold text-slate-700">ING Bank</span>
        </div>
      ),
      title: "ING Bank"
    },
    { 
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="w-8 h-8 bg-[#004D40] rounded-full flex items-center justify-center text-white font-bold text-[8px]">ABN</div>
          <span className="text-sm font-semibold text-slate-700">ABN AMRO</span>
        </div>
      ),
      title: "ABN AMRO"
    },
    { 
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="w-8 h-8 bg-[#FF6600] rounded-full flex items-center justify-center text-white font-bold text-[8px]">RABO</div>
          <span className="text-sm font-semibold text-slate-700">Rabobank</span>
        </div>
      ),
      title: "Rabobank"
    },
    { 
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="w-8 h-8 bg-[#00529B] rounded-full flex items-center justify-center text-white font-bold text-[8px]">NN</div>
          <span className="text-sm font-semibold text-slate-700">Nationale-Nederlanden</span>
        </div>
      ),
      title: "Nationale-Nederlanden"
    },
    { 
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="w-8 h-8 bg-[#003366] rounded-full flex items-center justify-center text-white font-bold text-[10px]">Æ</div>
          <span className="text-sm font-semibold text-slate-700">Aegon</span>
        </div>
      ),
      title: "Aegon"
    },
    { 
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="w-8 h-8 bg-[#E4002B] rounded-full flex items-center justify-center text-white font-bold text-[10px]">asr</div>
          <span className="text-sm font-semibold text-slate-700">a.s.r.</span>
        </div>
      ),
      title: "a.s.r. verzekeringen"
    },
    { 
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="w-8 h-8 bg-[#009FE3] rounded-full flex items-center justify-center text-white font-bold text-[8px]">CB</div>
          <span className="text-sm font-semibold text-slate-700">Centraal Beheer</span>
        </div>
      ),
      title: "Centraal Beheer"
    },
    { 
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="w-8 h-8 bg-[#00A651] rounded-full flex items-center justify-center text-white font-bold text-[8px]">BND</div>
          <span className="text-sm font-semibold text-slate-700">Brand New Day</span>
        </div>
      ),
      title: "Brand New Day"
    },
    { 
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="w-8 h-8 bg-[#003082] rounded-full flex items-center justify-center text-white font-bold text-[8px]">ZL</div>
          <span className="text-sm font-semibold text-slate-700">Zwitserleven</span>
        </div>
      ),
      title: "Zwitserleven"
    },
    { 
      node: (
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="w-8 h-8 bg-[#E30613] rounded-full flex items-center justify-center text-white font-bold text-[8px]">ALZ</div>
          <span className="text-sm font-semibold text-slate-700">Allianz</span>
        </div>
      ),
      title: "Allianz"
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-sm text-slate-500 mb-2">Onafhankelijk advies via</p>
          <p className="text-lg font-semibold text-slate-800">42 banken, verzekeraars & vermogensbeheerders</p>
        </div>
        <LogoLoop
          logos={partners}
          speed={40}
          direction="left"
          logoHeight={48}
          gap={24}
          pauseOnHover={true}
          scaleOnHover={false}
          fadeOut={true}
          fadeOutColor="white"
          ariaLabel="Onze partners"
        />
      </div>
    </section>
  );
}
