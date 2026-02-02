"use client";

import { useState, useEffect } from "react";

export default function RateComparison() {
  const [animatedGap, setAnimatedGap] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedGap(68), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Wist je dit?
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            68% heeft een pensioengat
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            De meeste Nederlanders bouwen niet genoeg pensioen op. 
            Hoe eerder je het weet, hoe meer je kunt doen.
          </p>
        </div>

        {/* Visual Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Stat 1 - Animated Circle */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="relative w-28 h-28 mx-auto mb-5">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="10"
                />
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${animatedGap * 2.51} 251`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-900">{animatedGap}%</span>
              </div>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Heeft een tekort</h3>
            <p className="text-sm text-slate-500">Gemiddeld €500-€800 p/m minder</p>
          </div>

          {/* Stat 2 - Highlighted */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 text-center border-2 border-[#0d9488] shadow-sm">
            <div className="w-28 h-28 mx-auto mb-5 bg-white rounded-full flex items-center justify-center shadow-md">
              <div className="text-center">
                <span className="text-3xl font-bold text-[#0d9488]">€652</span>
              </div>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Gemiddeld tekort</h3>
            <p className="text-sm text-slate-500">€7.824 per jaar minder inkomen</p>
          </div>

          {/* Stat 3 */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="w-28 h-28 mx-auto mb-5 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-slate-400">?</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Weet het niet</h3>
            <p className="text-sm text-slate-500">45% heeft geen idee waar ze staan</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-10 text-center max-w-3xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Hoe staat jouw pensioen ervoor?
          </h3>
          <p className="text-slate-400 mb-6">
            Ontdek het in een gratis gesprek van 30 minuten
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/#calculator" 
              className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Bereken je pensioengat
            </a>
            <a 
              href="/#contact"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Plan gratis gesprek
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
