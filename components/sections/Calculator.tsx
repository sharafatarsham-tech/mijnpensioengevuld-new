"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { calculatePension } from "@/lib/utils";
import { CalculatorValues } from "@/types";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";

export function Calculator() {
  const [values, setValues] = useState<CalculatorValues>({
    age: 45,
    salary: 55000,
    currentPension: 100000,
    includeAOW: true,
  });
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const result = calculatePension(values);

  // Check if user already unlocked the calculator
  useEffect(() => {
    const unlocked = localStorage.getItem("calculator-unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  // Track when user interacts with sliders
  const handleSliderChange = (field: keyof CalculatorValues, value: number | boolean) => {
    setValues({ ...values, [field]: value });
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  // Handle unlock button click
  const handleUnlockClick = () => {
    if (!isUnlocked) {
      setShowModal(true);
    }
  };

  // Handle successful email capture
  const handleEmailSuccess = () => {
    setIsUnlocked(true);
    setShowModal(false);
  };

  return (
    <>
      <section id="calculator" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="text-xs sm:text-sm font-semibold text-orange-500 uppercase tracking-wider">Pensioen Calculator</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-4 sm:mb-6 px-4">
              Hoe staat jouw pensioen ervoor?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">
              Krijg in 30 seconden een eerste indicatie. Voor een nauwkeurige berekening plannen we graag een gesprek.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
              <div className="grid lg:grid-cols-2">
                {/* Input */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-8">
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

                  <div className="space-y-8">
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
                      <div className="relative">
                        <input
                          type="range"
                          min="18"
                          max="65"
                          value={values.age}
                          onChange={(e) => handleSliderChange("age", parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer hover:bg-slate-300 transition-colors"
                          style={{ accentColor: "#f97316" }}
                        />
                        <div className="flex justify-between mt-1 px-1">
                          <span className="text-xs text-slate-400">18</span>
                          <span className="text-xs text-slate-400">65</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-slate-200" />

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
                          <span className="text-sm font-bold text-orange-600">€ {values.salary.toLocaleString("nl-NL")}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="25000"
                          max="150000"
                          step="1000"
                          value={values.salary}
                          onChange={(e) => handleSliderChange("salary", parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer hover:bg-slate-300 transition-colors"
                          style={{ accentColor: "#f97316" }}
                        />
                        <div className="flex justify-between mt-1 px-1">
                          <span className="text-xs text-slate-400">€ 25k</span>
                          <span className="text-xs text-slate-400">€ 150k</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-slate-200" />

                    {/* Opgebouwd pensioen */}
                    <div className="group">
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                            <svg className="w-4 h-4 text-slate-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <label className="text-sm font-medium text-slate-700">Opgebouwd pensioen</label>
                        </div>
                        <div className="bg-orange-50 px-3 py-1 rounded-lg">
                          <span className="text-sm font-bold text-orange-600">€ {values.currentPension.toLocaleString("nl-NL")}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="500000"
                          step="5000"
                          value={values.currentPension}
                          onChange={(e) => handleSliderChange("currentPension", parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer hover:bg-slate-300 transition-colors"
                          style={{ accentColor: "#f97316" }}
                        />
                        <div className="flex justify-between mt-1 px-1">
                          <span className="text-xs text-slate-400">€ 0</span>
                          <span className="text-xs text-slate-400">€ 500k</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200" />

                    {/* AOW Toggle */}
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-700">AOW meenemen?</span>
                      </div>
                      <button
                        onClick={() => handleSliderChange("includeAOW", !values.includeAOW)}
                        className={`relative w-14 h-7 rounded-full transition-all duration-300 ${values.includeAOW ? "bg-orange-500 shadow-lg shadow-orange-500/30" : "bg-slate-300"}`}
                      >
                        <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${values.includeAOW ? "left-8" : "left-1"}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="p-8 bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-8 -right-8 w-36 h-36 opacity-15">
                    <Image src="/pig-favicon-v2.png" alt="" fill className="object-contain" />
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-lg">Indicatie maandpensioen</h3>
                      <span className="bg-white/20 backdrop-blur text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">Schatting</span>
                    </div>

                    {/* Blurred result when locked */}
                    <div className={`bg-white/10 backdrop-blur rounded-2xl p-6 mb-6 border border-white/20 relative ${!isUnlocked && hasInteracted ? "overflow-hidden" : ""}`}>
                      <p className={`text-4xl lg:text-5xl font-bold mb-2 transition-all ${!isUnlocked && hasInteracted ? "blur-md select-none" : ""}`}>
                        € {result.monthlyLow.toLocaleString("nl-NL")} – {result.monthlyHigh.toLocaleString("nl-NL")}
                      </p>
                      <p className={`text-orange-100 text-sm ${!isUnlocked && hasInteracted ? "blur-sm" : ""}`}>bruto per maand (indicatief)</p>

                      {/* Unlock overlay */}
                      {!isUnlocked && hasInteracted && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-2xl">
                          <button
                            onClick={handleUnlockClick}
                            className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                            Ontgrendel resultaat
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className={`mb-6 ${!isUnlocked && hasInteracted ? "blur-sm" : ""}`}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-orange-100">Pensioen opgebouwd</span>
                        <span className={`font-bold ${result.percentage >= 80 ? "text-green-300" : result.percentage >= 60 ? "text-yellow-200" : "text-red-200"}`}>
                          {result.percentage}%
                        </span>
                      </div>
                      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${result.percentage >= 80 ? "bg-green-400" : result.percentage >= 60 ? "bg-yellow-400" : "bg-red-400"}`}
                          style={{ width: `${Math.min(result.percentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className={`space-y-3 py-4 border-t border-white/20 mb-6 ${!isUnlocked && hasInteracted ? "blur-sm" : ""}`}>
                      {values.includeAOW && (
                        <div className="flex justify-between text-sm">
                          <span className="text-orange-100 flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-200 rounded-full" />
                            Waarvan AOW (indicatie)
                          </span>
                          <span className="font-medium">± € {result.aow.toLocaleString("nl-NL")}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-orange-100 flex items-center gap-2">
                          <span className="w-2 h-2 bg-orange-200 rounded-full" />
                          Doel (70% van salaris)
                        </span>
                        <span className="font-medium">€ {result.target.toLocaleString("nl-NL")}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowAssumptions(!showAssumptions)}
                      className="text-sm text-orange-100 hover:text-white flex items-center gap-2 mb-4 transition-colors"
                    >
                      <svg className={`w-4 h-4 transition-transform duration-300 ${showAssumptions ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Bekijk aannames
                    </button>

                    {showAssumptions && (
                      <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-xs text-orange-100 mb-4 space-y-2 border border-white/10">
                        <p className="flex items-center gap-2"><span className="text-orange-300">•</span> Pensioenleeftijd: 67 jaar</p>
                        <p className="flex items-center gap-2"><span className="text-orange-300">•</span> Opbouwpercentage: 1,75% per jaar (indicatief)</p>
                        <p className="flex items-center gap-2"><span className="text-orange-300">•</span> Uitkeringsduur: 20 jaar</p>
                        <p className="flex items-center gap-2"><span className="text-orange-300">•</span> Geen indexatie meegenomen</p>
                        <p className="flex items-center gap-2"><span className="text-orange-300">•</span> AOW: indicatie, afhankelijk van situatie</p>
                      </div>
                    )}

                    {isUnlocked ? (
                      <Link
                        href="/#contact"
                        className="block w-full bg-white text-orange-600 py-4 rounded-xl font-bold text-center hover:bg-orange-50 hover:scale-[1.02] transition-all shadow-lg"
                      >
                        Vraag persoonlijk advies aan
                      </Link>
                    ) : (
                      <button
                        onClick={handleUnlockClick}
                        className="block w-full bg-white text-orange-600 py-4 rounded-xl font-bold text-center hover:bg-orange-50 hover:scale-[1.02] transition-all shadow-lg"
                      >
                        {hasInteracted ? "Ontgrendel volledig resultaat" : "Bereken mijn pensioen"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-slate-100 rounded-xl p-4 border border-slate-200">
              <p className="text-center text-sm text-slate-600">
                <strong className="text-slate-700">Let op:</strong> Deze berekening is puur indicatief. Je werkelijke pensioen kan aanzienlijk afwijken.
                Een persoonlijk advies volgt altijd na een uitgebreide inventarisatie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleEmailSuccess}
        previewData={{
          monthlyLow: result.monthlyLow,
          monthlyHigh: result.monthlyHigh,
          percentage: result.percentage,
        }}
      />
    </>
  );
}
