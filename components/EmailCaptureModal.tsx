"use client";

import { useState } from "react";
import { isValidEmail } from "@/lib/utils";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  previewData: {
    monthlyLow: number;
    monthlyHigh: number;
    percentage: number;
  };
}

export function EmailCaptureModal({ isOpen, onClose, onSuccess, previewData }: EmailCaptureModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = "Vul je naam in";
    if (!formData.email) newErrors.email = "Vul je e-mailadres in";
    else if (!isValidEmail(formData.email)) newErrors.email = "Vul een geldig e-mailadres in";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Send to API
      await fetch("/api/calculator-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          calculatorResult: previewData,
          source: "calculator",
        }),
      });

      // Store in localStorage to remember user
      localStorage.setItem("calculator-unlocked", "true");
      localStorage.setItem("calculator-user", JSON.stringify({ name: formData.name, email: formData.email }));

      onSuccess();
    } catch {
      // Still allow access on error
      onSuccess();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Je berekening is klaar!</h3>
          <p className="text-orange-100">Vul je gegevens in om het volledige resultaat te zien</p>
        </div>

        {/* Preview */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Geschat maandpensioen:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-800 blur-sm select-none">
                € {previewData.monthlyLow.toLocaleString("nl-NL")} - {previewData.monthlyHigh.toLocaleString("nl-NL")}
              </span>
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Naam *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-500" : "border-slate-200"} focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none`}
              placeholder="Je voornaam"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-500" : "border-slate-200"} focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none`}
              placeholder="je@email.nl"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Telefoon (optioneel)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
              placeholder="06 - 1234 5678"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all disabled:opacity-50"
          >
            {isLoading ? "Even geduld..." : "Toon mijn resultaat"}
          </button>

          <p className="text-xs text-slate-500 text-center">
            We sturen je eenmalig het resultaat per e-mail. Geen spam.
          </p>
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
