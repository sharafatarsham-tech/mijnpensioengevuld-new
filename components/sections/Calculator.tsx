"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { calculatePension } from "@/lib/utils";
import { CalculatorValues } from "@/types";
import { siteConfig } from "@/config/site";

export function Calculator() {
  const [values, setValues] = useState<CalculatorValues>({
    age: 45,
    salary: 55000,
    currentPension: 100000,
    includeAOW: true,
  });
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const result = calculatePension(values);
  
  // Calculate yearly and total gap
  const yearlyGap = result.gap * 12;
  const yearsInRetirement = 20;
  const totalGap = yearlyGap * yearsInRetirement;

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasSeenPopup && result.gap > 0) {
        setShowExitPopup(true);
        setHasSeenPopup(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasSeenPopup, result.gap]);

  const handleSliderChange = (field: keyof CalculatorValues, value: number | boolean) => {
    setValues({ ...values, [field]: value });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Save to subscribers
    try {
      await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          source: "calculator",
          calculatorData: {
            ...values,
            result: {
              monthlyGap: result.gap,
              yearlyGap,
              totalGap,
              percentage: result.percentage,
            }
          }
        }),
      });
      setEmailSent(true);
      setTimeout(() => setShowExitPopup(false), 2000);
    } catch {
      setEmailSent(true);
    }
  };

  return (
    <>
      <section id="calculator" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="text-xs sm:text-sm font-semibold text-orange-500 uppercase tracking-wider">Pensioen Calculator</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-4 sm:mb-6 px-4">
              Heb jij een pensioengat?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">
              Ontdek in 30 seconden of je straks genoeg hebt om van te leven.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
              <div className="grid lg:grid-cols-2">
                {/* Input */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Jouw gegevens</h3>
                      <p className="text-xs text-slate-500">Pas de schuifjes aan</p>
                    </div>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    {/* Leeftijd */}
                    <div className="group">
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                            <svg className="w-4 h-4 text-slate-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <label className="text-sm font-medium text-slate-700">Leeftijd</label>
                        </div>
                        <div className="bg-orange-50 px-3 py-1 rounded-lg">
                          <span className="text-sm font-bold text-orange-600">{values.age} jaar</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="25"
                        max="65"
                        value={values.age}
                        onChange={(e) => handleSliderChange("age", parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                        style={{ accentColor: "#f97316" }}
                      />
                      <div className="flex justify-between mt-1 px-1">
                        <span className="text-xs text-slate-400">25</span>
                        <span className="text-xs text-slate-400">65</span>
                      </div>
                    </div>

                    {/* Salaris */}
                    <div className="group">
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                            <svg className="w-4 h-4 text-slate-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <label className="text-sm font-medium text-slate-700">Bruto jaarsalaris</label>
                        </div>
                        <div className="bg-orange-50 px-3 py-1 rounded-lg">
                          <span className="text-sm font-bold text-orange-600">€{values.salary.toLocaleString("nl-NL")}</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="25000"
                        max="150000"
                        step="1000"
                        value={values.salary}
                        onChange={(e) => handleSliderChange("salary", parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                        style={{ accentColor: "#f97316" }}
                      />
                      <div className="flex justify-between mt-1 px-1">
                        <span className="text-xs text-slate-400">€25k</span>
                        <span className="text-xs text-slate-400">€150k</span>
                      </div>
                    </div>

                    {/* Opgebouwd pensioen */}
                    <div className="group">
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                            <svg className="w-4 h-4 text-slate-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <label className="text-sm font-medium text-slate-700">Huidig pensioenvermogen</label>
                        </div>
                        <div className="bg-orange-50 px-3 py-1 rounded-lg">
                          <span className="text-sm font-bold text-orange-600">€{values.currentPension.toLocaleString("nl-NL")}</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="500000"
                        step="5000"
                        value={values.currentPension}
                        onChange={(e) => handleSliderChange("currentPension", parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                        style={{ accentColor: "#f97316" }}
                      />
                      <div className="flex justify-between mt-1 px-1">
                        <span className="text-xs text-slate-400">€0</span>
                        <span className="text-xs text-slate-400">€500k</span>
                      </div>
                    </div>

                    {/* AOW Toggle */}
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700">AOW meenemen?</span>
                      </div>
                      <button
                        onClick={() => handleSliderChange("includeAOW", !values.includeAOW)}
                        className={`relative w-12 h-6 rounded-full transition-all ${values.includeAOW ? "bg-orange-500" : "bg-slate-300"}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${values.includeAOW ? "left-7" : "left-1"}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Result - Always visible! */}
                <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-8 -right-8 w-36 h-36 opacity-10">
                    <Image src="/pig-favicon-v2.png" alt="" fill className="object-contain" />
                  </div>

                  <div className="relative">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Jouw resultaat</h3>
                      {result.gap > 0 ? (
                        <span className="bg-red-500/20 text-red-300 text-xs font-bold px-3 py-1.5 rounded-full border border-red-500/30 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Pensioengat
                        </span>
                      ) : (
                        <span className="bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1.5 rounded-full border border-green-500/30">
                          ✓ Op koers
                        </span>
                      )}
                    </div>

                    {/* Expected Pension */}
                    <div className="bg-white/5 backdrop-blur rounded-xl p-4 mb-4 border border-white/10">
                      <p className="text-slate-400 text-xs mb-1">Verwacht maandpensioen</p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        €{result.monthlyLow.toLocaleString("nl-NL")} – {result.monthlyHigh.toLocaleString("nl-NL")}
                      </p>
                      <p className="text-slate-400 text-xs mt-1">bruto per maand (indicatie)</p>
                    </div>

                    {/* GAP - The urgency driver */}
                    {result.gap > 0 ? (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-red-300 font-bold text-sm">Je komt tekort:</p>
                            <p className="text-white text-xl sm:text-2xl font-bold">€{result.gap.toLocaleString("nl-NL")}/maand</p>
                            <p className="text-red-300/80 text-xs mt-1">
                              = €{yearlyGap.toLocaleString("nl-NL")}/jaar = <span className="font-bold text-red-300">€{totalGap.toLocaleString("nl-NL")} totaal</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-green-300 font-bold">Goed bezig!</p>
                            <p className="text-slate-300 text-sm">Je lijkt op koers te liggen voor je pensioendoel.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-400">Pensioen vs. doel (70%)</span>
                        <span className={`font-bold ${result.percentage >= 80 ? "text-green-400" : result.percentage >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                          {result.percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${result.percentage >= 80 ? "bg-green-500" : result.percentage >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: `${Math.min(result.percentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Urgency message */}
                    {result.gap > 0 && (
                      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mb-4">
                        <p className="text-orange-200 text-xs leading-relaxed">
                          <strong className="text-orange-300">💡 Goed nieuws:</strong> Met {67 - values.age} jaar tot je pensioen is dit nog te repareren. 
                          Hoe eerder je begint, hoe makkelijker het wordt.
                        </p>
                      </div>
                    )}

                    {/* Assumptions toggle */}
                    <button
                      onClick={() => setShowAssumptions(!showAssumptions)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-4"
                    >
                      <svg className={`w-3 h-3 transition-transform ${showAssumptions ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Aannames bekijken
                    </button>

                    {showAssumptions && (
                      <div className="bg-white/5 rounded-lg p-3 text-xs text-slate-400 mb-4 space-y-1">
                        <p>• Pensioenleeftijd: 67 jaar</p>
                        <p>• Opbouw: 1,75%/jaar (gemiddeld)</p>
                        <p>• Uitkeringsduur: 20 jaar</p>
                        <p>• AOW: €1.400/maand (indicatie)</p>
                        <p>• Doel: 70% van laatstverdiende salaris</p>
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                      <Link
                        href="#contact"
                        className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3.5 sm:py-4 rounded-xl font-bold text-center transition-all shadow-lg shadow-orange-500/25 active:scale-[0.98]"
                      >
                        {result.gap > 0 ? "Bespreek dit gratis met een adviseur" : "Bevestig dit in een gratis gesprek"}
                      </Link>
                      
                      <a
                        href={`tel:${siteConfig.contact.phoneRaw}`}
                        className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-all border border-white/20"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Liever bellen? {siteConfig.contact.phone}
                      </a>
                    </div>

                    <p className="text-center text-xs text-slate-500 mt-3">
                      100% gratis • Vrijblijvend • Binnen 24u reactie
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 bg-slate-100 rounded-xl p-4 border border-slate-200">
              <p className="text-center text-xs sm:text-sm text-slate-600">
                <strong className="text-slate-700">Disclaimer:</strong> Deze berekening is indicatief. Je werkelijke pensioen kan afwijken. 
                Voor een nauwkeurige berekening plannen we een persoonlijk gesprek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Wacht! Ontvang je resultaat per email
              </h3>
              <p className="text-slate-600 text-sm">
                Je pensioengat is <strong className="text-red-600">€{result.gap.toLocaleString("nl-NL")}/maand</strong>. 
                Laat je email achter en ontvang tips om dit te repareren.
              </p>
            </div>

            {emailSent ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-700 font-medium">Verstuurd! Check je inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="je@email.nl"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-bold hover:from-orange-600 hover:to-amber-600 transition-all"
                >
                  Ontvang mijn resultaat + tips
                </button>
              </form>
            )}

            <p className="text-center text-xs text-slate-500 mt-4">
              Geen spam • Je kunt je altijd uitschrijven
            </p>
          </div>
        </div>
      )}
    </>
  );
}
