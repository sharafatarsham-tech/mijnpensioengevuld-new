"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { isValidEmail } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

const situatieOptions = [
  { value: "", label: "Selecteer je situatie" },
  { value: "werknemer", label: "Werknemer (in loondienst)" },
  { value: "zzp", label: "ZZP'er / Freelancer" },
  { value: "dga", label: "DGA / Ondernemer met BV" },
  { value: "combinatie", label: "Combinatie (loondienst + ZZP)" },
  { value: "werkgever", label: "Werkgever (advies voor organisatie)" },
  { value: "anders", label: "Anders" },
];

const leeftijdOptions = [
  { value: "", label: "Selecteer je leeftijd" },
  { value: "18-25", label: "18 - 25 jaar" },
  { value: "25-35", label: "25 - 35 jaar" },
  { value: "35-45", label: "35 - 45 jaar" },
  { value: "45-55", label: "45 - 55 jaar" },
  { value: "55-65", label: "55 - 65 jaar" },
  { value: "65+", label: "65+ jaar" },
];

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    situatie: "",
    leeftijd: "",
    message: "",
    privacy: false,
    honeypot: "",
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = "Vul je naam in";
    if (!formData.email) newErrors.email = "Vul je e-mailadres in";
    else if (!isValidEmail(formData.email)) newErrors.email = "Vul een geldig e-mailadres in";
    if (!formData.phone) newErrors.phone = "Vul je telefoonnummer in zodat we je kunnen bereiken";
    // Situatie optioneel - hogere conversie, later filteren
    if (!formData.privacy) newErrors.privacy = "Je moet akkoord gaan met het privacybeleid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (formData.honeypot) return; // Bot detected

    setFormState("loading");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", phone: "", situatie: "", leeftijd: "", message: "", privacy: false, honeypot: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 sm:p-8 text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2 px-2">Je aanvraag is ontvangen!</h3>
        <p className="text-sm sm:text-base text-green-700 mb-4 px-2">We nemen binnen 24 uur contact met je op om een afspraak in te plannen.</p>
        <div className="bg-white/50 rounded-lg p-4 text-left">
          <p className="text-sm text-green-800 font-medium mb-2">Wat kun je verwachten:</p>
          <ul className="text-sm text-green-700 space-y-1">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Telefonisch contact binnen 24 uur
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Gratis uitgebreid inventarisatiegesprek
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Persoonlijk advies op maat
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Naam *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${errors.name ? "border-red-500" : "border-slate-200"} focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none`}
          placeholder="Je volledige naam"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">E-mail *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-slate-200"} focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none`}
            placeholder="je@email.nl"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Telefoon *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-500" : "border-slate-200"} focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none`}
            placeholder="06 - 1234 5678"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Jouw situatie</label>
          <select
            value={formData.situatie}
            onChange={(e) => setFormData({ ...formData, situatie: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none bg-white"
          >
            {situatieOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Leeftijd</label>
          <select
            value={formData.leeftijd}
            onChange={(e) => setFormData({ ...formData, leeftijd: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none bg-white"
          >
            {leeftijdOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Je vraag of situatie (optioneel)</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none"
          placeholder="Vertel kort wat je wilt weten of bereiken..."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          checked={formData.privacy}
          onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
          className="mt-1 w-4 h-4 rounded border-slate-300 text-teal-600 cursor-pointer"
        />
        <label htmlFor="privacy" className={`text-sm ${errors.privacy ? "text-red-500" : "text-slate-600"}`}>
          Ik ga akkoord met het <a href="/privacy" className="text-teal-600 hover:text-teal-700 hover:underline transition-colors duration-200">privacybeleid</a>
        </label>
      </div>

      {formState === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">Er ging iets mis. Probeer het opnieuw of neem telefonisch contact op.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={formState === "loading"}
        className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-3.5 sm:py-4 rounded-xl font-bold shadow-lg shadow-teal-500/25 hover:shadow-xl hover:from-teal-700 hover:to-teal-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 text-base sm:text-lg cursor-pointer"
      >
        {formState === "loading" ? "Versturen..." : "Ja, plan mijn gratis gesprek"}
      </button>

      <p className="text-center text-[10px] sm:text-xs text-slate-500">
        We bellen je binnen 24 uur om een afspraak in te plannen
      </p>
    </form>
  );
}
