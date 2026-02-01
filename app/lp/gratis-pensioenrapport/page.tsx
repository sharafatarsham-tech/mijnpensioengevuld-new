"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { CheckIcon, ShieldCheckIcon, ClockIcon } from "@/components/ui/Icons";

type FormState = "idle" | "loading" | "success" | "error";

const situatieOptions = [
  { value: "loondienst", label: "Loondienst" },
  { value: "zzp", label: "ZZP'er / Freelancer" },
  { value: "dga", label: "DGA / Ondernemer met BV" },
  { value: "combinatie", label: "Combinatie" },
];

const leefsituatieOptions = [
  { value: "alleenstaand", label: "Alleenstaand" },
  { value: "samenwonend", label: "Samenwonend / Gehuwd" },
  { value: "alleenstaand_met_kind", label: "Alleenstaand met kind" },
];

export default function GratisPensioenRapportPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    telefoon: "",
    geboortejaar: "",
    leefsituatie: "alleenstaand",
    type_werknemer: "loondienst",
    bruto_jaarinkomen: "",
    werkgeverspensioen: "",
    privacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) return;
    
    setFormState("loading");
    
    try {
      const res = await fetch("/api/pension-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 py-4">
          <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
            <Logo />
          </div>
        </nav>
        
        <main className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="text-white" size="xl" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-slate-800 mb-4">
            Je rapport is onderweg! 📬
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Check je inbox (en spam folder) - binnen enkele minuten ontvang je jouw persoonlijke pensioenrapport.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-left">
            <h2 className="font-heading text-xl font-bold text-slate-800 mb-4">Wat kun je verwachten?</h2>
            <ul className="space-y-3">
              {[
                "Overzicht van je AOW-situatie",
                "Berekening van je pensioengat",
                "Je persoonlijke dekkingsgraad",
                "Concrete aanbevelingen op maat",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckIcon className="text-teal-500 flex-shrink-0" size="md" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-10 p-6 bg-teal-50 rounded-xl border border-teal-200">
            <h3 className="font-heading font-bold text-slate-800 mb-2">Wil je persoonlijk advies?</h3>
            <p className="text-slate-600 text-sm mb-4">
              Plan een gratis inventarisatiegesprek en krijg maatwerk advies van onze pensioenadviseur.
            </p>
            <Link 
              href="/#contact" 
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
            >
              Plan gratis gesprek →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 py-4">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ShieldCheckIcon className="text-teal-500" size="sm" />
            <span>100% gratis & vrijblijvend</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Value proposition */}
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              Gratis Pensioenrapport
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Ontvang direct inzicht in<br />
              <span className="text-teal-600">jouw pensioensituatie</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8">
              Vul je gegevens in en ontvang binnen enkele minuten een persoonlijk pensioenrapport met:
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                { title: "AOW-overzicht", desc: "Je AOW-leeftijd en verwachte uitkering" },
                { title: "Pensioengat analyse", desc: "Het verschil tussen wat je krijgt en wat je nodig hebt" },
                { title: "Dekkingsgraad", desc: "Hoe goed je pensioen nu gedekt is" },
                { title: "Persoonlijk advies", desc: "Concrete stappen om je situatie te verbeteren" },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon className="text-teal-600" size="sm" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">{item.title}</span>
                    <span className="text-slate-600"> — {item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <ClockIcon className="text-teal-500" size="sm" />
                2 minuten invullen
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheckIcon className="text-teal-500" size="sm" />
                Veilig & vertrouwelijk
              </span>
            </div>
            
            {/* Testimonial */}
            <div className="mt-10 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-700 italic mb-4">
                "Ik had geen idee dat mijn pensioengat zo groot was. Dit rapport gaf me precies het inzicht dat ik nodig had om actie te ondernemen."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold">
                  MV
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Marco V.</p>
                  <p className="text-slate-500 text-xs">ZZP'er, 48 jaar</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs font-bold px-4 py-1 rounded-full">
              DIRECT IN JE INBOX
            </div>
            
            <h2 className="font-heading text-xl font-bold text-slate-800 mb-6 text-center pt-2">
              Ontvang je gratis pensioenrapport
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Persoonlijke gegevens */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Naam *</label>
                  <input
                    type="text"
                    required
                    value={formData.naam}
                    onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    placeholder="Je volledige naam"
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">E-mail *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      placeholder="je@email.nl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefoon</label>
                    <input
                      type="tel"
                      value={formData.telefoon}
                      onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      placeholder="06 - 1234 5678"
                    />
                  </div>
                </div>
              </div>
              
              {/* Pensioen gegevens */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-4">Pensioengegevens</p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Geboortejaar *</label>
                    <input
                      type="number"
                      required
                      min="1940"
                      max="2010"
                      value={formData.geboortejaar}
                      onChange={(e) => setFormData({ ...formData, geboortejaar: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      placeholder="bijv. 1985"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Leefsituatie *</label>
                    <select
                      required
                      value={formData.leefsituatie}
                      onChange={(e) => setFormData({ ...formData, leefsituatie: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white"
                    >
                      {leefsituatieOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Werksituatie *</label>
                    <select
                      required
                      value={formData.type_werknemer}
                      onChange={(e) => setFormData({ ...formData, type_werknemer: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white"
                    >
                      {situatieOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bruto jaarinkomen *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.bruto_jaarinkomen}
                      onChange={(e) => setFormData({ ...formData, bruto_jaarinkomen: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      placeholder="bijv. 50000"
                    />
                  </div>
                </div>
                
                {formData.type_werknemer === "loondienst" && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Geschat werkgeverspensioen per jaar (optioneel)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.werkgeverspensioen}
                      onChange={(e) => setFormData({ ...formData, werkgeverspensioen: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      placeholder="bijv. 15000"
                    />
                    <p className="text-xs text-slate-500 mt-1">Staat op je Uniform Pensioenoverzicht (UPO)</p>
                  </div>
                )}
              </div>
              
              {/* Privacy */}
              <div className="flex items-start gap-3 pt-4">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  checked={formData.privacy}
                  onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-teal-600 cursor-pointer"
                />
                <label htmlFor="privacy" className="text-sm text-slate-600">
                  Ik ga akkoord met het <a href="/privacy" className="text-teal-600 hover:underline">privacybeleid</a> en 
                  ontvang mijn rapport per e-mail
                </label>
              </div>
              
              {formState === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">Er ging iets mis. Probeer het opnieuw.</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={formState === "loading" || !formData.privacy}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-teal-500/25 transition-all disabled:opacity-50 text-lg cursor-pointer"
              >
                {formState === "loading" ? "Even geduld..." : "Ontvang mijn gratis rapport →"}
              </button>
              
              <p className="text-center text-xs text-slate-500">
                Binnen 2 minuten in je inbox • Geen spam, beloofd
              </p>
            </form>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>© 2024 MijnPensioenGevuld.nl • AFM-geregistreerd • <a href="/privacy" className="hover:text-teal-600">Privacy</a></p>
        </div>
      </footer>
    </div>
  );
}
