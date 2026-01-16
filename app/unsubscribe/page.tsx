"use client";

import { useState } from "react";
import Link from "next/link";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`/api/subscribers?email=${encodeURIComponent(email)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {status === "success" ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Uitgeschreven</h1>
            <p className="text-slate-600 mb-6">
              Je ontvangt geen emails meer van ons. We zullen je missen!
            </p>
            <Link
              href="/"
              className="text-orange-500 hover:underline"
            >
              Terug naar website
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Uitschrijven</h1>
              <p className="text-slate-600 mt-2">
                Voer je email in om uit te schrijven van onze nieuwsbrief.
              </p>
            </div>

            <form onSubmit={handleUnsubscribe} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Je email adres"
                required
              />

              {status === "error" && (
                <p className="text-sm text-red-600">
                  Er ging iets mis. Probeer opnieuw.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-slate-800 text-white py-3 rounded-xl font-semibold hover:bg-slate-900 transition-all disabled:opacity-50"
              >
                {status === "loading" ? "Bezig..." : "Uitschrijven"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              <Link href="/" className="text-orange-500 hover:underline">
                Terug naar website
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
