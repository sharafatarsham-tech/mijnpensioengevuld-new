"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { isValidEmail } from "@/lib/utils";

export default function LandingPagePensioencheck() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Minimal Header - No Navigation */}
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
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-700">Gratis & vrijblijvend gesprek</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-6">
              Hoe staat jouw pensioen ervoor?
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 mt-2">Krijg helder inzicht.</span>
            </h1>

            <p className="text-xl text-slate-600 mb-8">
              Veel mensen hebben geen duidelijk beeld van hun pensioensituatie. 
              In een persoonlijk gesprek brengen we samen in kaart hoe jij ervoor staat en welke mogelijkheden je hebt.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Volledige analyse van je huidige pensioen",
                "Berekening van je persoonlijke pensioengat",
                "Concrete oplossingen op maat",
                "100% gratis en vrijblijvend"
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

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                AFM-geregistreerd
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                AVG Compliant
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sinds 2009
              </span>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl shadow-orange-200/30 border border-orange-100">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                1-1,5 uur persoonlijke aandacht
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Plan je gratis pensioencheck</h2>
              <p className="text-slate-600 text-sm">Wij bellen je binnen 24 uur terug</p>
            </div>

            <LandingForm source="lp-gratis-pensioencheck" />
          </div>
        </div>

        {/* Social Proof + Testimonial */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg max-w-2xl mx-auto">
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map((i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-lg text-slate-700 italic mb-4">
              "Het gesprek gaf me voor het eerst echt inzicht in mijn situatie. Geen verkooppraatje, maar eerlijk advies. Nu weet ik waar ik aan toe ben en wat mijn opties zijn."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center text-white font-bold">
                M
              </div>
              <div>
                <p className="font-semibold text-slate-800">Mark</p>
                <p className="text-sm text-slate-500">Werknemer in loondienst</p>
              </div>
            </div>
          </div>
          <p className="text-center text-slate-500 text-sm mt-6">Meer dan 500 tevreden klanten gingen je voor</p>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 px-6 border-t border-slate-200 mt-12 pb-24 lg:pb-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-700">Privacy</Link>
            <Link href="/voorwaarden" className="hover:text-slate-700">Voorwaarden</Link>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-2xl lg:hidden z-50">
        <a 
          href="#form-section"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3.5 rounded-xl font-bold text-center shadow-lg"
        >
          Plan een vrijblijvend gesprek
        </a>
        <p className="text-center text-xs text-slate-500 mt-2">100% gratis • Geen verplichtingen</p>
      </div>
    </div>
  );
}

function LandingForm({ source }: { source: string }) {
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
        body: JSON.stringify({ ...formData, source }),
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
        <h3 className="text-xl font-bold text-green-800 mb-2">Gelukt! 🎉</h3>
        <p className="text-green-700">Wij bellen je binnen 24 uur om een afspraak te maken.</p>
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
          id="privacy-lp"
          checked={formData.privacy}
          onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
          className="mt-1 w-4 h-4 rounded border-slate-300 text-orange-500"
        />
        <label htmlFor="privacy-lp" className={`text-xs ${errors.privacy ? "text-red-500" : "text-slate-500"}`}>
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
        {formState === "loading" ? "Versturen..." : "Ja, bel mij voor een afspraak →"}
      </button>

      <p className="text-center text-xs text-slate-400">
        Geen spam • Binnen 24 uur reactie • 100% gratis
      </p>
    </form>
  );
}
