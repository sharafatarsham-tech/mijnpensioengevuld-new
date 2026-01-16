"use client";

import { useState } from "react";
import Link from "next/link";

export function PensionAgeSlider() {
  const [age, setAge] = useState(67);
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-orange-100 max-w-sm w-full mx-auto lg:mx-0 mt-8">
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Ik wil stoppen op</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-orange-500">{age}</span>
            <span className="text-lg font-medium text-slate-400">jaar</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 mb-1">Standaard AOW</p>
          <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">67 jaar</span>
        </div>
      </div>
      
      <div className="mb-6 relative h-6 flex items-center">
        <input
          type="range"
          min="55"
          max="75"
          step="1"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-600 transition-all"
        />
        <div 
            className="absolute top-8 text-xs font-bold text-orange-500 transform -translate-x-1/2 transition-all duration-200"
            style={{ left: `${((age - 55) / (75 - 55)) * 100}%` }}
        >
            {age}
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
        {age < 67 
          ? "Eerder stoppen kost geld. Weet jij hoeveel je nodig hebt om dit gat op te vangen?" 
          : age === 67 
            ? "De standaardleeftijd. Maar is jouw opgebouwde pensioen tegen die tijd wel genoeg?" 
            : "Langer doorwerken loont. Ontdek hoeveel extra pensioen dit je kan opleveren."}
      </p>

      <Link 
        href="#calculator" 
        className="block w-full bg-slate-800 hover:bg-slate-900 text-white text-center font-semibold py-3 rounded-xl transition-all shadow-lg shadow-slate-800/20"
      >
        Bereken de impact →
      </Link>
    </div>
  );
}
