"use client";

import { useState } from "react";
import { trackConversion } from "@/components/GoogleAnalytics";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("🎉 Welkom! Check je inbox voor een bevestigingsmail.");
        setEmail("");
        setName("");
        trackConversion("newsletter_signup");
      } else {
        setStatus("error");
        setMessage(data.error || "Er ging iets mis. Probeer opnieuw.");
      }
    } catch {
      setStatus("error");
      setMessage("Er ging iets mis. Probeer opnieuw.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">🎉</div>
        <p className="text-green-700 font-medium">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Je naam (optioneel)"
        />
      </div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Je email adres"
          required
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">{message}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50"
      >
        {status === "loading" ? "Aanmelden..." : "Aanmelden voor tips"}
      </button>
      <p className="text-xs text-slate-500 text-center">
        Geen spam, alleen waardevolle pensioen tips. Je kunt je altijd uitschrijven.
      </p>
    </form>
  );
}
