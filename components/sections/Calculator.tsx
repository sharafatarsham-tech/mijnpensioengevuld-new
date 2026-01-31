"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { 
  CalculatorIcon, 
  UserIcon, 
  CoinsIcon, 
  ClockIcon, 
  CheckIcon, 
  ShieldCheckIcon, 
  LockIcon, 
  UsersIcon,
  ChartGrowthIcon,
  CalendarIcon
} from "@/components/ui/Icons";

// =============================================================================
// TYPES
// =============================================================================

type CalculatorTab = "pensioen" | "aow" | "jaarruimte";

interface CalculatorValues {
  age: number;
  salary: number;
  currentPension: number;
  includeAOW: boolean;
}

interface CalculationResult {
  monthlyLow: number;
  monthlyHigh: number;
  aow: number;
  target: number;
  gap: number;
  percentage: number;
  yearsToRetirement: number;
}

// =============================================================================
// CONSTANTS 2026
// =============================================================================

const AOW_LEEFTIJD_2026: Record<number, { leeftijd: number; maanden: number }> = {
  1955: { leeftijd: 66, maanden: 7 },
  1956: { leeftijd: 66, maanden: 7 },
  1957: { leeftijd: 66, maanden: 10 },
  1958: { leeftijd: 67, maanden: 0 },
  1959: { leeftijd: 67, maanden: 0 },
  1960: { leeftijd: 67, maanden: 0 },
  1961: { leeftijd: 67, maanden: 3 },
  1962: { leeftijd: 67, maanden: 3 },
  1963: { leeftijd: 67, maanden: 3 },
  1964: { leeftijd: 67, maanden: 3 },
  1965: { leeftijd: 67, maanden: 3 },
  // Vanaf 1966: 67 jaar en 3 maanden (voorlopig)
};

const AOW_BEDRAGEN_2026 = {
  alleenstaand: 1620, // Geschat 2026
  samenwonend: 1112, // Per persoon, geschat 2026
};

const JAARRUIMTE_2026 = {
  franchise: 18500, // Geschat 2026
  premiegrondslag_max: 137800, // Geschat 2026
  percentage: 0.30, // 30%
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getAOWLeeftijd(geboortejaar: number): { leeftijd: number; maanden: number; datum: string } {
  if (geboortejaar < 1955) {
    return { leeftijd: 65, maanden: 0, datum: `${geboortejaar + 65}` };
  }
  
  const aow = AOW_LEEFTIJD_2026[geboortejaar] || { leeftijd: 67, maanden: 3 };
  const maandTekst = aow.maanden > 0 ? ` en ${aow.maanden} maanden` : "";
  
  return { 
    ...aow, 
    datum: `${geboortejaar + aow.leeftijd}${aow.maanden > 0 ? ` (+ ${aow.maanden} mnd)` : ""}` 
  };
}

function berekenJaarruimte2026(brutoJaarinkomen: number, factorA: number = 0): {
  jaarruimte: number;
  premiegrondslag: number;
  maxBedrag: number;
} {
  const premiegrondslag = Math.min(
    Math.max(brutoJaarinkomen - JAARRUIMTE_2026.franchise, 0),
    JAARRUIMTE_2026.premiegrondslag_max - JAARRUIMTE_2026.franchise
  );
  
  const brutoJaarruimte = premiegrondslag * JAARRUIMTE_2026.percentage;
  const jaarruimte = Math.max(brutoJaarruimte - (factorA * 0), 0);
  
  return {
    jaarruimte: Math.round(jaarruimte),
    premiegrondslag: Math.round(premiegrondslag),
    maxBedrag: Math.round((JAARRUIMTE_2026.premiegrondslag_max - JAARRUIMTE_2026.franchise) * JAARRUIMTE_2026.percentage),
  };
}

function calculatePension(values: CalculatorValues): CalculationResult {
  const yearsToRetirement = Math.max(0, 67 - values.age);
  const annualAccrual = values.salary * 0.0175;
  const futureAccrual = annualAccrual * yearsToRetirement;
  const totalPension = values.currentPension + futureAccrual;
  
  const monthlyLow = Math.round((totalPension * 0.85) / 240);
  const monthlyHigh = Math.round((totalPension * 1.15) / 240);
  
  const aowMonthly = values.includeAOW ? AOW_BEDRAGEN_2026.alleenstaand : 0;
  
  const targetMonthly = Math.round((values.salary * 0.7) / 12);
  const avgMonthly = (monthlyLow + monthlyHigh) / 2 + aowMonthly;
  
  return {
    monthlyLow: monthlyLow + aowMonthly,
    monthlyHigh: monthlyHigh + aowMonthly,
    aow: aowMonthly,
    target: targetMonthly,
    gap: Math.max(0, targetMonthly - avgMonthly),
    percentage: Math.min(100, Math.round((avgMonthly / targetMonthly) * 100)),
    yearsToRetirement,
  };
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 text-xs font-bold flex items-center justify-center transition-colors"
        aria-label="Meer informatie"
      >
        ?
      </button>
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl animate-fade-in">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
        </div>
      )}
    </div>
  );
}

function CustomSlider({
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
  color = "orange",
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
  color?: "orange" | "teal";
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const percentage = ((value - min) / (max - min)) * 100;
  const bubblePosition = Math.max(10, Math.min(90, percentage));
  
  const colorClasses = {
    orange: {
      track: "bg-gradient-to-r from-orange-400 to-orange-500",
      thumb: "bg-orange-500 border-white shadow-orange-500/30",
    },
    teal: {
      track: "bg-gradient-to-r from-teal-400 to-teal-500",
      thumb: "bg-teal-500 border-white shadow-teal-500/30",
    },
  };
  
  const colors = colorClasses[color];

  return (
    <div className="relative pt-8 pb-1">
      <div 
        className="absolute top-0 transform -translate-x-1/2 transition-all duration-150 ease-out pointer-events-none z-10"
        style={{ left: `${bubblePosition}%` }}
      >
        <div className={`px-3 py-1.5 rounded-lg text-sm font-bold text-white whitespace-nowrap ${color === "orange" ? "bg-orange-500" : "bg-teal-500"} shadow-lg`}>
          {formatValue(value)}
        </div>
        <div className={`absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 ${color === "orange" ? "bg-orange-500" : "bg-teal-500"}`} />
      </div>
      
      <div 
        ref={sliderRef}
        className="relative h-3 cursor-pointer group"
        onClick={(e) => {
          if (!sliderRef.current) return;
          const rect = sliderRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const pct = Math.max(0, Math.min(1, x / rect.width));
          const newValue = Math.round((min + pct * (max - min)) / step) * step;
          onChange(newValue);
        }}
      >
        <div className="absolute inset-0 bg-slate-200 rounded-full" />
        <div 
          className={`absolute inset-y-0 left-0 rounded-full ${colors.track} transition-all duration-150`}
          style={{ width: `${percentage}%` }}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${colors.thumb} border-[3px] shadow-lg cursor-grab active:cursor-grabbing transition-transform hover:scale-110 active:scale-95`}
          style={{ left: `calc(${percentage}% - 12px)` }}
        />
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        style={{ top: '2rem' }}
        aria-label="Slider"
      />
    </div>
  );
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);
  
  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = value;
    const duration = 300;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * easeOut);
      setDisplayValue(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
    previousValue.current = value;
  }, [value]);
  
  return (
    <span className="tabular-nums">
      {prefix}{displayValue.toLocaleString("nl-NL")}{suffix}
    </span>
  );
}

function ComparisonChart({ expected, target, percentage }: { expected: number; target: number; percentage: number }) {
  const maxValue = Math.max(expected, target) * 1.1;
  const expectedWidth = (expected / maxValue) * 100;
  const targetWidth = (target / maxValue) * 100;
  
  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Jouw verwachte pensioen</span>
          <span className="font-bold text-white">€{expected.toLocaleString("nl-NL")}</span>
        </div>
        <div className="h-4 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-700 ease-out ${percentage >= 70 ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-orange-400 to-amber-500"}`}
            style={{ width: `${expectedWidth}%` }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Doel (70% van salaris)</span>
          <span className="font-bold text-slate-300">€{target.toLocaleString("nl-NL")}</span>
        </div>
        <div className="h-4 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-slate-400 to-slate-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${targetWidth}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// TAB COMPONENTS
// =============================================================================

function AOWCalculator() {
  const currentYear = new Date().getFullYear();
  const [geboortejaar, setGeboortejaar] = useState(1985);
  const [leefsituatie, setLeefsituatie] = useState<"alleenstaand" | "samenwonend">("alleenstaand");
  
  const aowInfo = getAOWLeeftijd(geboortejaar);
  const aowBedrag = leefsituatie === "alleenstaand" ? AOW_BEDRAGEN_2026.alleenstaand : AOW_BEDRAGEN_2026.samenwonend;
  const huidigeLeeftijd = currentYear - geboortejaar;
  const jarenTotAOW = Math.max(0, (geboortejaar + aowInfo.leeftijd + (aowInfo.maanden / 12)) - currentYear);
  
  return (
    <div className="space-y-6">
      {/* Geboortejaar */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          In welk jaar ben je geboren?
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[1960, 1970, 1980, 1990].map((decade) => (
            <button
              key={decade}
              onClick={() => setGeboortejaar(decade + 5)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                geboortejaar >= decade && geboortejaar < decade + 10
                  ? "bg-orange-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {decade}s
            </button>
          ))}
        </div>
        <input
          type="number"
          value={geboortejaar}
          onChange={(e) => setGeboortejaar(Math.max(1940, Math.min(2005, parseInt(e.target.value) || 1980)))}
          className="w-full mt-3 px-4 py-3 border border-slate-200 rounded-xl text-center text-lg font-bold focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
        />
      </div>
      
      {/* Leefsituatie */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Wat is je leefsituatie bij pensioen?
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLeefsituatie("alleenstaand")}
            className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border-2 ${
              leefsituatie === "alleenstaand"
                ? "bg-orange-50 border-orange-500 text-orange-700"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            Alleenstaand
          </button>
          <button
            onClick={() => setLeefsituatie("samenwonend")}
            className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border-2 ${
              leefsituatie === "samenwonend"
                ? "bg-orange-50 border-orange-500 text-orange-700"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            Samenwonend
          </button>
        </div>
      </div>
      
      {/* Resultaat */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CalendarIcon className="text-orange-400" size="md" />
          Jouw AOW-gegevens
        </h4>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-slate-400">AOW-leeftijd</span>
            <span className="text-xl font-bold">
              {aowInfo.leeftijd} jaar {aowInfo.maanden > 0 && `+ ${aowInfo.maanden} mnd`}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-slate-400">AOW start in jaar</span>
            <span className="text-xl font-bold">{geboortejaar + aowInfo.leeftijd}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-slate-400">Nog te gaan</span>
            <span className="text-xl font-bold text-orange-400">{Math.round(jarenTotAOW)} jaar</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-slate-400">Verwacht AOW-bedrag (2026)</span>
            <span className="text-2xl font-bold text-green-400">€{aowBedrag}/mnd</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-slate-400">
            💡 AOW bouwt je op tussen je 15e en AOW-leeftijd. Elk jaar = 2% opbouw. 
            50 jaar = 100% AOW.
          </p>
        </div>
      </div>
    </div>
  );
}

function JaarruimteCalculator() {
  const [brutoInkomen, setBrutoInkomen] = useState(55000);
  const [isZZP, setIsZZP] = useState(false);
  
  const result = berekenJaarruimte2026(brutoInkomen);
  const maandelijks = Math.round(result.jaarruimte / 12);
  
  return (
    <div className="space-y-6">
      {/* Inkomen Slider */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-slate-700">
            Wat is je bruto jaarinkomen?
          </label>
          <Tooltip text="Je totale bruto jaarinkomen uit werk, inclusief vakantiegeld." />
        </div>
        <CustomSlider
          value={brutoInkomen}
          min={20000}
          max={150000}
          step={1000}
          onChange={setBrutoInkomen}
          formatValue={(v) => `€${(v / 1000).toFixed(0)}k`}
        />
        <div className="flex justify-between mt-2 px-1">
          <span className="text-xs text-slate-400">€20.000</span>
          <span className="text-xs text-slate-400">€150.000</span>
        </div>
      </div>
      
      {/* ZZP Toggle */}
      <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div>
          <span className="text-sm font-semibold text-slate-700 block">Ben je ZZP'er?</span>
          <span className="text-xs text-slate-500">ZZP'ers hebben vaak meer jaarruimte</span>
        </div>
        <button
          onClick={() => setIsZZP(!isZZP)}
          className={`relative w-14 h-8 rounded-full transition-all duration-300 ${isZZP ? "bg-orange-500" : "bg-slate-300"}`}
        >
          <span className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${isZZP ? "left-7" : "left-1"}`} />
        </button>
      </div>
      
      {/* Resultaat */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CoinsIcon className="text-orange-400" size="md" />
          Jouw Jaarruimte 2026
        </h4>
        
        <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl p-5 mb-4">
          <p className="text-slate-300 text-sm mb-1">Je mag fiscaal aftrekbaar inleggen:</p>
          <p className="text-4xl font-bold text-orange-400">
            €{result.jaarruimte.toLocaleString("nl-NL")}
          </p>
          <p className="text-slate-400 text-sm mt-2">= €{maandelijks}/maand</p>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Bruto inkomen</span>
            <span>€{brutoInkomen.toLocaleString("nl-NL")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">AOW-franchise</span>
            <span>- €{JAARRUIMTE_2026.franchise.toLocaleString("nl-NL")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Premiegrondslag</span>
            <span>€{result.premiegrondslag.toLocaleString("nl-NL")}</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3">
            <span className="text-slate-400">× 30%</span>
            <span className="font-bold">€{result.jaarruimte.toLocaleString("nl-NL")}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-slate-400">
            💡 De jaarruimte is het bedrag dat je fiscaal voordelig kunt inleggen in 
            lijfrente of banksparen. Je krijgt de inleg terug via belastingaftrek.
          </p>
        </div>
      </div>
      
      {/* Belastingvoordeel */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
          <CheckIcon className="text-green-600" size="sm" />
          Geschat belastingvoordeel
        </h5>
        <p className="text-sm text-green-700">
          Bij een belastingtarief van ~37% bespaar je circa <strong>€{Math.round(result.jaarruimte * 0.37).toLocaleString("nl-NL")}</strong> per jaar aan belasting!
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN CALCULATOR COMPONENT
// =============================================================================

export function Calculator() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>("pensioen");
  const [values, setValues] = useState<CalculatorValues>({
    age: 42,
    salary: 55000,
    currentPension: 75000,
    includeAOW: true,
  });
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const result = calculatePension(values);

  const yearlyGap = result.gap * 12;
  const yearsInRetirement = 20;
  const totalGap = yearlyGap * yearsInRetirement;
  const avgMonthly = (result.monthlyLow + result.monthlyHigh) / 2;

  const handleValueChange = (field: keyof CalculatorValues, value: number | boolean) => {
    setIsCalculating(true);
    setValues({ ...values, [field]: value });
    setTimeout(() => setIsCalculating(false), 300);
  };

  const formatEuro = (value: number) => value >= 1000 ? `€${(value / 1000).toFixed(0)}k` : `€${value.toLocaleString("nl-NL")}`;
  const formatAge = (value: number) => `${value} jaar`;
  const formatPension = (value: number) => value >= 1000 ? `€${(value / 1000).toFixed(0)}k` : `€${value}`;

  const tabs = [
    { id: "pensioen" as const, label: "Pensioengat", icon: <ChartGrowthIcon size="sm" /> },
    { id: "aow" as const, label: "AOW-leeftijd", icon: <CalendarIcon size="sm" /> },
    { id: "jaarruimte" as const, label: "Jaarruimte", icon: <CoinsIcon size="sm" /> },
  ];

  return (
    <section id="calculator" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30" />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <CalculatorIcon size="sm" />
            Gratis Pensioen Calculator 2026
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
            Bereken jouw <span className="text-orange-500">pensioensituatie</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Ontdek in 30 seconden of je straks genoeg hebt. Kies een berekening hieronder.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-orange-600 shadow-lg"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
            
            {/* AOW Tab */}
            {activeTab === "aow" && (
              <div className="p-6 sm:p-8 lg:p-10">
                <AOWCalculator />
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <Link
                    href="#contact"
                    className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-xl font-bold text-center transition-all shadow-lg shadow-orange-500/25"
                  >
                    Bespreek je AOW-situatie met een adviseur →
                  </Link>
                </div>
              </div>
            )}
            
            {/* Jaarruimte Tab */}
            {activeTab === "jaarruimte" && (
              <div className="p-6 sm:p-8 lg:p-10">
                <JaarruimteCalculator />
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <Link
                    href="#contact"
                    className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-xl font-bold text-center transition-all shadow-lg shadow-orange-500/25"
                  >
                    Ontdek hoe je jaarruimte optimaal benut →
                  </Link>
                </div>
              </div>
            )}
            
            {/* Pensioen Tab */}
            {activeTab === "pensioen" && (
              <div className="grid lg:grid-cols-5">
                {/* Input Section */}
                <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center">
                      <CalculatorIcon className="text-orange-500" size="lg" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">Vul jouw gegevens in</h3>
                      <p className="text-sm text-slate-500">Pas de schuifjes aan voor jouw situatie</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Age Slider */}
                    <div className="group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                            <UserIcon className="text-slate-500 group-hover:text-orange-500 transition-colors" size="md" />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-slate-700 block">Hoe oud ben je?</label>
                            <span className="text-xs text-slate-400">Nog {result.yearsToRetirement} jaar tot pensioen</span>
                          </div>
                        </div>
                        <Tooltip text="Je huidige leeftijd. Hoe jonger je bent, hoe meer tijd je hebt om bij te sparen." />
                      </div>
                      <CustomSlider
                        value={values.age}
                        min={25}
                        max={65}
                        step={1}
                        onChange={(v) => handleValueChange("age", v)}
                        formatValue={formatAge}
                      />
                      <div className="flex justify-between mt-2 px-1">
                        <span className="text-xs text-slate-400">25 jaar</span>
                        <span className="text-xs text-slate-400">65 jaar</span>
                      </div>
                    </div>

                    {/* Salary Slider */}
                    <div className="group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                            <CoinsIcon className="text-slate-500 group-hover:text-orange-500 transition-colors" size="md" />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-slate-700 block">Wat verdien je per jaar?</label>
                            <span className="text-xs text-slate-400">Bruto jaarsalaris</span>
                          </div>
                        </div>
                        <Tooltip text="Je bruto jaarsalaris bepaalt hoeveel pensioen je nodig hebt (70% hiervan is het doel)." />
                      </div>
                      <CustomSlider
                        value={values.salary}
                        min={25000}
                        max={150000}
                        step={1000}
                        onChange={(v) => handleValueChange("salary", v)}
                        formatValue={formatEuro}
                      />
                      <div className="flex justify-between mt-2 px-1">
                        <span className="text-xs text-slate-400">€25.000</span>
                        <span className="text-xs text-slate-400">€150.000</span>
                      </div>
                    </div>

                    {/* Current Pension Slider */}
                    <div className="group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                            <ChartGrowthIcon className="text-slate-500 group-hover:text-orange-500 transition-colors" size="md" />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-slate-700 block">Hoeveel heb je al opgebouwd?</label>
                            <span className="text-xs text-slate-400">Check dit op mijnpensioenoverzicht.nl</span>
                          </div>
                        </div>
                        <Tooltip text="Je totale pensioenvermogen tot nu toe. Vind dit op mijnpensioenoverzicht.nl of je UPO." />
                      </div>
                      <CustomSlider
                        value={values.currentPension}
                        min={0}
                        max={500000}
                        step={5000}
                        onChange={(v) => handleValueChange("currentPension", v)}
                        formatValue={formatPension}
                      />
                      <div className="flex justify-between mt-2 px-1">
                        <span className="text-xs text-slate-400">€0</span>
                        <span className="text-xs text-slate-400">€500.000</span>
                      </div>
                    </div>

                    {/* AOW Toggle */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-5 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <ClockIcon className="text-teal-500" size="md" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-700 block">AOW meenemen?</span>
                          <span className="text-xs text-slate-500">2026: ca. €{AOW_BEDRAGEN_2026.alleenstaand}/maand (alleenstaand)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tooltip text="AOW is het staatspensioen dat je krijgt vanaf je 67e." />
                        <button
                          onClick={() => handleValueChange("includeAOW", !values.includeAOW)}
                          className={`relative w-14 h-8 rounded-full transition-all duration-300 ${values.includeAOW ? "bg-teal-500" : "bg-slate-300"}`}
                        >
                          <span className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${values.includeAOW ? "left-7" : "left-1"}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 opacity-5">
                    <Image src="/pig-favicon-v2.png" alt="" fill className="object-contain" />
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold">Jouw resultaat</h3>
                      {result.gap > 0 ? (
                        <span className="bg-red-500/20 text-red-300 text-xs font-bold px-4 py-2 rounded-full border border-red-500/30 flex items-center gap-2 animate-pulse">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Pensioengat
                        </span>
                      ) : (
                        <span className="bg-green-500/20 text-green-300 text-xs font-bold px-4 py-2 rounded-full border border-green-500/30 flex items-center gap-2">
                          <CheckIcon size="sm" />
                          Op koers
                        </span>
                      )}
                    </div>

                    <div className={`bg-white/5 backdrop-blur rounded-2xl p-5 mb-5 border border-white/10 transition-all duration-300 ${isCalculating ? "scale-[0.98] opacity-80" : ""}`}>
                      <p className="text-slate-400 text-sm mb-2">Verwacht maandpensioen</p>
                      <p className="text-3xl sm:text-4xl font-bold tracking-tight">
                        <AnimatedNumber value={result.monthlyLow} prefix="€" /> – <AnimatedNumber value={result.monthlyHigh} />
                      </p>
                      <p className="text-slate-400 text-xs mt-2">bruto per maand {values.includeAOW && "(incl. AOW)"}</p>
                    </div>

                    {result.gap > 0 ? (
                      <div className="bg-gradient-to-r from-red-500/20 to-red-600/10 border border-red-500/30 rounded-2xl p-5 mb-5">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <ChartGrowthIcon className="text-red-400" size="lg" />
                          </div>
                          <div>
                            <p className="text-red-300 font-semibold text-sm">Je komt maandelijks tekort:</p>
                            <p className="text-white text-2xl sm:text-3xl font-bold mt-1">
                              <AnimatedNumber value={result.gap} prefix="€" suffix="/mnd" />
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-red-300/80 text-xs">= €{yearlyGap.toLocaleString("nl-NL")}/jaar</span>
                              <span className="text-red-300/60">•</span>
                              <span className="text-red-300 text-xs font-bold">€{totalGap.toLocaleString("nl-NL")} totaal*</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/10 border border-green-500/30 rounded-2xl p-5 mb-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <CheckIcon className="text-green-400" size="lg" />
                          </div>
                          <div>
                            <p className="text-green-300 font-bold">Goed bezig!</p>
                            <p className="text-slate-300 text-sm">Je lijkt op koers te liggen voor je pensioendoel.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mb-5">
                      <ComparisonChart expected={Math.round(avgMonthly)} target={result.target} percentage={result.percentage} />
                    </div>

                    {result.gap > 0 && result.yearsToRetirement > 5 && (
                      <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-5">
                        <p className="text-orange-200 text-sm leading-relaxed">
                          <strong className="text-orange-300">💡 Goed nieuws:</strong> Met nog {result.yearsToRetirement} jaar tot je pensioen is dit gat nog te dichten.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => setShowAssumptions(!showAssumptions)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-2 mb-5 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-transform ${showAssumptions ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Aannames bekijken
                    </button>

                    {showAssumptions && (
                      <div className="bg-white/5 rounded-xl p-4 text-xs text-slate-400 mb-5 space-y-1.5 border border-white/10">
                        <p>• Pensioenleeftijd: 67 jaar</p>
                        <p>• Gemiddelde opbouw: 1,75%/jaar</p>
                        <p>• Uitkeringsduur: 20 jaar</p>
                        <p>• AOW 2026: €{AOW_BEDRAGEN_2026.alleenstaand}/maand (alleenstaand)</p>
                        <p>• Doel: 70% van laatstverdiende salaris</p>
                        <p className="text-slate-500 pt-2 border-t border-white/10">* Totaal tekort over 20 jaar pensioen</p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Link
                        href="#contact"
                        className="group block w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-xl font-bold text-center transition-all shadow-lg shadow-orange-500/25 active:scale-[0.98]"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {result.gap > 0 ? "Bespreek dit gratis met een adviseur" : "Bevestig dit in een gratis gesprek"}
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </Link>
                      
                      <a
                        href={`tel:${siteConfig.contact.phoneRaw}`}
                        className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-xl font-medium transition-all border border-white/20"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Bel direct: {siteConfig.contact.phone}
                      </a>
                    </div>

                    <p className="text-center text-xs text-slate-500 mt-4">
                      ✓ 100% gratis • ✓ Vrijblijvend • ✓ Binnen 24u reactie
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-slate-100 rounded-2xl p-5 border border-slate-200">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-slate-600">
                <strong className="text-slate-700">Disclaimer:</strong> Deze berekeningen zijn indicaties op basis van 2026 cijfers. 
                Je werkelijke pensioen kan afwijken. Voor een nauwkeurige berekening plannen we graag een persoonlijk gesprek.
              </p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="text-green-500" size="md" />
              <span>AFM geregistreerd</span>
            </div>
            <div className="flex items-center gap-2">
              <LockIcon className="text-green-500" size="md" />
              <span>100% privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="text-green-500" size="md" />
              <span>1.200+ tevreden klanten</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </section>
  );
}
