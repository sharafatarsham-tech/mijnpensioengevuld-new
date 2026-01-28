"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

// Types
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

// Updated calculation with 2026 figures
function calculatePension(values: CalculatorValues): CalculationResult {
  const yearsToRetirement = Math.max(0, 67 - values.age);
  const annualAccrual = values.salary * 0.0175; // 1.75% per year average
  const futureAccrual = annualAccrual * yearsToRetirement;
  const totalPension = values.currentPension + futureAccrual;
  
  // Convert to monthly (20 year payout = 240 months)
  const monthlyLow = Math.round((totalPension * 0.85) / 240);
  const monthlyHigh = Math.round((totalPension * 1.15) / 240);
  
  // AOW 2026: ~€1.560 for singles (updated from €1.400)
  const aowMonthly = values.includeAOW ? 1560 : 0;
  
  // Target: 70% of last salary
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

// Tooltip component
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

// Custom Slider component with modern styling
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
  
  // Clamp the bubble position so it doesn't go outside the track
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
      {/* Value bubble - positioned above track */}
      <div 
        className="absolute top-0 transform -translate-x-1/2 transition-all duration-150 ease-out pointer-events-none z-10"
        style={{ left: `${bubblePosition}%` }}
      >
        <div className={`px-3 py-1.5 rounded-lg text-sm font-bold text-white whitespace-nowrap ${color === "orange" ? "bg-orange-500" : "bg-teal-500"} shadow-lg`}>
          {formatValue(value)}
        </div>
        {/* Arrow pointing down */}
        <div className={`absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 ${color === "orange" ? "bg-orange-500" : "bg-teal-500"}`} />
      </div>
      
      {/* Slider track container */}
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
        {/* Background track */}
        <div className="absolute inset-0 bg-slate-200 rounded-full" />
        
        {/* Active track */}
        <div 
          className={`absolute inset-y-0 left-0 rounded-full ${colors.track} transition-all duration-150`}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Thumb */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${colors.thumb} border-[3px] shadow-lg cursor-grab active:cursor-grabbing transition-transform hover:scale-110 active:scale-95`}
          style={{ left: `calc(${percentage}% - 12px)` }}
        />
      </div>
      
      {/* Native input for accessibility */}
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

// Animated number component
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
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * easeOut);
      
      setDisplayValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
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

// Comparison Bar Chart
function ComparisonChart({ expected, target, percentage }: { expected: number; target: number; percentage: number }) {
  const maxValue = Math.max(expected, target) * 1.1;
  const expectedWidth = (expected / maxValue) * 100;
  const targetWidth = (target / maxValue) * 100;
  
  return (
    <div className="space-y-3">
      {/* Expected */}
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
      
      {/* Target */}
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

// Main Calculator component
export function Calculator() {
  const [values, setValues] = useState<CalculatorValues>({
    age: 42,
    salary: 55000,
    currentPension: 75000,
    includeAOW: true,
  });
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const result = calculatePension(values);

  // Calculate yearly and total gap
  const yearlyGap = result.gap * 12;
  const yearsInRetirement = 20;
  const totalGap = yearlyGap * yearsInRetirement;
  const avgMonthly = (result.monthlyLow + result.monthlyHigh) / 2;

  const handleValueChange = (field: keyof CalculatorValues, value: number | boolean) => {
    setIsCalculating(true);
    setValues({ ...values, [field]: value });
    setTimeout(() => setIsCalculating(false), 300);
  };

  // Format helpers
  const formatEuro = (value: number) => {
    if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}k`;
    }
    return `€${value.toLocaleString("nl-NL")}`;
  };
  const formatAge = (value: number) => `${value} jaar`;
  const formatPension = (value: number) => {
    if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}k`;
    }
    return `€${value}`;
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30" />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Gratis Pensioen Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 sm:mb-6">
            Heb jij een <span className="text-orange-500">pensioengat</span>?
            </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Ontdek in 30 seconden of je straks genoeg hebt om comfortabel van te leven.
            </p>
          </div>

        {/* Calculator Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
            <div className="grid lg:grid-cols-5">
              
              {/* Input Section - 3 columns */}
              <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
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
                          <svg className="w-5 h-5 text-slate-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
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
                          <svg className="w-5 h-5 text-slate-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
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
                          <svg className="w-5 h-5 text-slate-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
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
                        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                          </svg>
                        </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-700 block">AOW meenemen in berekening?</span>
                        <span className="text-xs text-slate-500">2026: ca. €1.560/maand (alleenstaand)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tooltip text="AOW is het staatspensioen dat je krijgt vanaf je 67e. Dit is ongeveer €1.560/maand voor alleenstaanden in 2026." />
                      <button
                        onClick={() => handleValueChange("includeAOW", !values.includeAOW)}
                        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${values.includeAOW ? "bg-teal-500" : "bg-slate-300"}`}
                        aria-label="AOW toggle"
                      >
                        <span className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${values.includeAOW ? "left-7" : "left-1"}`} />
                      </button>
                    </div>
                    </div>
                  </div>
                </div>

              {/* Result Section - 2 columns */}
              <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 text-white relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -right-12 w-48 h-48 opacity-5">
                    <Image src="/pig-favicon-v2.png" alt="" fill className="object-contain" />
                  </div>

                  <div className="relative">
                  {/* Status Badge */}
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
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Op koers
                      </span>
                    )}
                    </div>

                  {/* Expected Pension */}
                  <div className={`bg-white/5 backdrop-blur rounded-2xl p-5 mb-5 border border-white/10 transition-all duration-300 ${isCalculating ? "scale-[0.98] opacity-80" : ""}`}>
                    <p className="text-slate-400 text-sm mb-2">Verwacht maandpensioen</p>
                    <p className="text-3xl sm:text-4xl font-bold tracking-tight">
                      <AnimatedNumber value={result.monthlyLow} prefix="€" /> – <AnimatedNumber value={result.monthlyHigh} />
                    </p>
                    <p className="text-slate-400 text-xs mt-2">bruto per maand {values.includeAOW && "(incl. AOW)"}</p>
                  </div>

                  {/* GAP Display */}
                  {result.gap > 0 ? (
                    <div className="bg-gradient-to-r from-red-500/20 to-red-600/10 border border-red-500/30 rounded-2xl p-5 mb-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
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
                          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-green-300 font-bold">Goed bezig!</p>
                          <p className="text-slate-300 text-sm">Je lijkt op koers te liggen voor je pensioendoel.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual Comparison */}
                  <div className="mb-5">
                    <ComparisonChart 
                      expected={Math.round(avgMonthly)} 
                      target={result.target} 
                      percentage={result.percentage} 
                    />
                  </div>

                  {/* Urgency message */}
                  {result.gap > 0 && result.yearsToRetirement > 5 && (
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-5">
                      <p className="text-orange-200 text-sm leading-relaxed">
                        <strong className="text-orange-300">💡 Goed nieuws:</strong> Met nog {result.yearsToRetirement} jaar tot je pensioen is dit gat nog te dichten. 
                        Hoe eerder je begint, hoe minder je maandelijks hoeft in te leggen.
                      </p>
                    </div>
                  )}

                  {/* Assumptions toggle */}
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
                      <p>• AOW 2026: €1.560/maand (alleenstaand)</p>
                      <p>• Doel: 70% van laatstverdiende salaris</p>
                      <p className="text-slate-500 pt-2 border-t border-white/10">* Totaal tekort over 20 jaar pensioen</p>
                      </div>
                    )}

                  {/* CTA Buttons */}
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
            </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-slate-100 rounded-2xl p-5 border border-slate-200">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-slate-600">
                <strong className="text-slate-700">Disclaimer:</strong> Deze berekening is een indicatie op basis van gemiddelden. 
                Je werkelijke pensioen kan afwijken door rendement, inflatie en persoonlijke factoren. 
                Voor een nauwkeurige berekening plannen we graag een persoonlijk gesprek.
              </p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>AFM geregistreerd</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>100% privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>1.200+ tevreden klanten</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
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
