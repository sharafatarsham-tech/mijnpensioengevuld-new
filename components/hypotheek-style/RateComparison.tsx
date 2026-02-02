"use client";

import { useState, useEffect } from "react";

export default function RateComparison() {
  const [animatedGap, setAnimatedGap] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedGap(68), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            ⚠️ Wist je dit?
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            68% van de Nederlanders heeft een pensioengat
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dat betekent minder inkomen dan verwacht na je pensioen. 
            Hoe eerder je het weet, hoe meer je kunt doen.
          </p>
        </div>

        {/* Visual Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {/* Stat 1 - Pensioengat */}
          <div className="bg-slate-50 rounded-2xl p-8 text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                />
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="12"
                  strokeDasharray={`${animatedGap * 2.51} 251`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">{animatedGap}%</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Heeft een tekort</h3>
            <p className="text-sm text-slate-600">Gemiddeld €500-€800 per maand minder dan verwacht</p>
          </div>

          {/* Stat 2 - Gemiddeld tekort */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 text-center border-2 border-[#0d9488]">
            <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="text-center">
                <span className="text-4xl font-bold text-[#0d9488]">€652</span>
                <span className="block text-xs text-slate-500 mt-1">per maand</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Gemiddeld tekort</h3>
            <p className="text-sm text-slate-600">Dat is €7.824 per jaar minder pensioeninkomen</p>
          </div>

          {/* Stat 3 - Onwetendheid */}
          <div className="bg-slate-50 rounded-2xl p-8 text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-5xl">🤷</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Weet het niet</h3>
            <p className="text-sm text-slate-600">45% heeft geen idee of ze genoeg opbouwen</p>
          </div>
        </div>

        {/* CTA Block */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Hoe staat jouw pensioen ervoor?
          </h3>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            In een gratis gesprek van 30 minuten brengen we je volledige pensioensituatie in kaart. 
            Geen verkooppraat, gewoon duidelijkheid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#calculator" 
              className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Bereken je pensioengat
            </a>
            <a 
              href="/#contact"
              className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Plan gratis gesprek
            </a>
          </div>
          <p className="text-slate-500 text-sm mt-6">
            ✓ Gratis en vrijblijvend • ✓ Binnen 24 uur reactie • ✓ 100% onafhankelijk
          </p>
        </div>

        {/* Source */}
        <p className="text-center text-xs text-slate-400 mt-8">
          Bronnen: CBS, Nibud, Pensioenfederatie 2024
        </p>
      </div>
    </section>
  );
}
