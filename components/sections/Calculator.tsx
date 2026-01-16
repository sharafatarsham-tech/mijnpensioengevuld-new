"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { calculatePension } from "@/lib/utils";
import { CalculatorValues } from "@/types";

export function Calculator() {
  const [values, setValues] = useState<CalculatorValues>({
    age: 45,
    salary: 55000,
    currentPension: 100000,
    includeAOW: true,
  });
  const [showAssumptions, setShowAssumptions] = useState(false);

  const result = calculatePension(values);

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Pensioen Calculator</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-6">
            Hoe vol is jouw spaarvarkentje?
          </h2>
          <p className="text-lg text-slate-600">
            Deze tool geeft een grove indicatie. Voor een nauwkeurige berekening is persoonlijk advies nodig.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid lg:grid-cols-2">
              {/* Input */}
              <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                <h3 className="font-bold text-slate-800 mb-6">Jouw gegevens</h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Leeftijd</label>
                      <span className="text-sm font-bold text-orange-500">{values.age} jaar</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="65"
                      value={values.age}
                      onChange={(e) => setValues({ ...values, age: parseInt(e.target.value) })}
                      className="w-full h-2 bg-orange-100 rounded-full appearance-none cursor-pointer"
                      style={{ accentColor: "#f97316" }}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Bruto jaarsalaris</label>
                      <span className="text-sm font-bold text-orange-500">€ {values.salary.toLocaleString("nl-NL")}</span>
                    </div>
                    <input
                      type="range"
                      min="25000"
                      max="150000"
                      step="1000"
                      value={values.salary}
                      onChange={(e) => setValues({ ...values, salary: parseInt(e.target.value) })}
                      className="w-full h-2 bg-orange-100 rounded-full appearance-none cursor-pointer"
                      style={{ accentColor: "#f97316" }}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Opgebouwd pensioen (schatting)</label>
                      <span className="text-sm font-bold text-orange-500">€ {values.currentPension.toLocaleString("nl-NL")}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      step="5000"
                      value={values.currentPension}
                      onChange={(e) => setValues({ ...values, currentPension: parseInt(e.target.value) })}
                      className="w-full h-2 bg-orange-100 rounded-full appearance-none cursor-pointer"
                      style={{ accentColor: "#f97316" }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-sm font-medium text-slate-700">AOW meenemen?</span>
                    <button
                      onClick={() => setValues({ ...values, includeAOW: !values.includeAOW })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${values.includeAOW ? "bg-orange-500" : "bg-slate-300"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${values.includeAOW ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="p-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20">
                  <Image src="/pig-favicon-v2.png" alt="" fill className="object-contain" />
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Indicatie maandpensioen</h3>
                    <span className="bg-white/20 text-xs font-medium px-3 py-1 rounded-full">Schatting</span>
                  </div>

                  <p className="text-4xl font-bold mb-1">
                    € {result.monthlyLow.toLocaleString("nl-NL")} – {result.monthlyHigh.toLocaleString("nl-NL")}
                  </p>
                  <p className="text-orange-100 text-sm mb-6">per maand (indicatief)</p>

                  <div className="space-y-3 py-4 border-t border-b border-white/20 mb-6">
                    {values.includeAOW && (
                      <div className="flex justify-between text-sm">
                        <span className="text-orange-100">Waarvan AOW (indicatie)</span>
                        <span className="font-medium">± € {result.aow.toLocaleString("nl-NL")}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-100">Doel (70% van salaris)</span>
                      <span className="font-medium">€ {result.target.toLocaleString("nl-NL")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-100">Spaarvarkentje gevuld</span>
                      <span className={`font-medium ${result.percentage >= 80 ? "text-green-300" : "text-yellow-200"}`}>
                        ± {result.percentage}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowAssumptions(!showAssumptions)}
                    className="text-sm text-orange-100 hover:text-white flex items-center gap-1 mb-4"
                  >
                    <svg className={`w-4 h-4 transition-transform ${showAssumptions ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Bekijk aannames
                  </button>

                  {showAssumptions && (
                    <div className="bg-white/10 rounded-lg p-4 text-xs text-orange-100 mb-4 space-y-1">
                      <p>• Pensioenleeftijd: 67 jaar</p>
                      <p>• Opbouwpercentage: 1,75% per jaar (indicatief)</p>
                      <p>• Uitkeringsduur: 20 jaar</p>
                      <p>• Geen indexatie meegenomen</p>
                      <p>• AOW: indicatie, afhankelijk van situatie</p>
                    </div>
                  )}

                  <Link
                    href="/#contact"
                    className="block w-full bg-white text-orange-600 py-3.5 rounded-xl font-bold text-center hover:bg-orange-50 transition-colors"
                  >
                    Vraag persoonlijk advies aan
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            <strong>Let op:</strong> Deze berekening is puur indicatief. Je werkelijke pensioen kan aanzienlijk afwijken.
            Een persoonlijk advies volgt altijd na een uitgebreide inventarisatie.
          </p>
        </div>
      </div>
    </section>
  );
}
