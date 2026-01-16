"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { isValidEmail } from "@/lib/utils";

export default function LandingPageZZP() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Minimal Header */}
      <header className="py-4 px-6 flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/pig-favicon-v2.png" alt="" width={32} height={32} />
          <span className="font-bold text-slate-800">MijnPensioenGevuld</span>
        </Link>
        <a href={`tel:${siteConfig.contact.phoneRaw}`} className="text-sm text-slate-600 hover:text-orange-500 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {siteConfig.contact.phone}
        </a>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium text-purple-700">Speciaal voor ZZP'ers & ondernemers</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-6">
              Als ZZP'er bouw je <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">geen pensioen</span> op via een werkgever
            </h1>

            <p className="text-xl text-slate-600 mb-8">
              Maar heb je wél recht op <strong>fiscaal voordeel</strong> bij pensioensparen. 
              Veel ZZP'ers laten duizenden euro's per jaar liggen.
            </p>

            {/* Problem Agitation */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
              <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Het probleem voor ZZP'ers
              </h3>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Gemiddeld pensioengat van €400-800 per maand</li>
                <li>• Alleen AOW = slechts ~€1.400/maand</li>
                <li>• Onbenut fiscaal voordeel tot €15.000/jaar</li>
              </ul>
            </div>

            {/* Solution */}
            <div className="space-y-4 mb-8">
              {[
                "Berekening van je jaarruimte (fiscaal voordeel)",
                "Advies over lijfrente, banksparen of beleggen",
                "Persoonlijk pensioenplan op maat",
                "100% gratis inventarisatiegesprek"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                AFM-geregistreerd
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Onafhankelijk
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Zelf ZZP ervaring
              </span>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl shadow-slate-200/50 border border-slate-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ontdek je fiscale voordeel
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Gratis ZZP pensioenscan</h2>
              <p className="text-slate-600 text-sm">We bellen je binnen 24 uur terug</p>
            </div>

            <ZZPForm />

            {/* Urgency */}
            <div className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-sm text-amber-800 text-center">
                <strong>💡 Tip:</strong> Benut je jaarruimte vóór 31 december om dit jaar nog fiscaal voordeel te pakken!
              </p>
            </div>
          </div>
        </div>

        {/* FAQ for ZZP */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-10">
            Veelgestelde vragen van ZZP'ers
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Wat is jaarruimte?",
                a: "Jaarruimte is de ruimte die je hebt om fiscaal vriendelijk pensioen op te bouwen. Je mag dit bedrag aftrekken van je belastbaar inkomen."
              },
              {
                q: "Hoeveel kan ik besparen?",
                a: "Afhankelijk van je inkomen kun je tot €15.000+ per jaar fiscaal voordelig inleggen. Dit levert direct belastingvoordeel op."
              },
              {
                q: "Wat zijn mijn opties?",
                a: "Je kunt kiezen uit lijfrente (verzekering), banksparen (gegarandeerd) of beleggen (meer risico, potentieel hoger rendement)."
              },
              {
                q: "Is het gesprek echt gratis?",
                a: "Ja, 100%. Het eerste inventarisatiegesprek is geheel vrijblijvend. Je zit nergens aan vast."
              }
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-slate-200 mt-12">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-700">Privacy</Link>
            <Link href="/voorwaarden" className="hover:text-slate-700">Voorwaarden</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ZZPForm() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    privacy: false,
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = "Vul je naam in";
    if (!formData.email) newErrors.email = "Vul je e-mailadres in";
    else if (!isValidEmail(formData.email)) newErrors.email = "Vul een geldig e-mailadres in";
    if (!formData.phone) newErrors.phone = "Vul je telefoonnummer in";
    if (!formData.privacy) newErrors.privacy = "Akkoord vereist";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "lp-zzp-pensioen", situatie: "zzp" }),
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
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Top! 🎉</h3>
        <p className="text-green-700">We bellen je binnen 24 uur voor je gratis ZZP pensioenscan.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-500" : "border-slate-200"} focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none`}
          placeholder="Je naam"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-slate-200"} focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none`}
          placeholder="Je e-mailadres"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-slate-200"} focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none`}
          placeholder="Je telefoonnummer"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="privacy-zzp"
          checked={formData.privacy}
          onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
          className="mt-1 w-4 h-4 rounded border-slate-300 text-orange-500"
        />
        <label htmlFor="privacy-zzp" className={`text-xs ${errors.privacy ? "text-red-500" : "text-slate-500"}`}>
          Ik ga akkoord met het <a href="/privacy" className="text-orange-500 hover:underline">privacybeleid</a>
        </label>
      </div>

      {formState === "error" && (
        <p className="text-red-500 text-sm">Er ging iets mis. Probeer het opnieuw.</p>
      )}

      <button
        type="submit"
        disabled={formState === "loading"}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
      >
        {formState === "loading" ? "Versturen..." : "Vraag gratis ZZP pensioenscan aan →"}
      </button>

      <p className="text-center text-xs text-slate-400">
        100% gratis • Geen verplichtingen • Persoonlijk advies
      </p>
    </form>
  );
}
