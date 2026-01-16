"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ConsentState = "pending" | "accepted" | "rejected";

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem("cookie-consent");
    if (storedConsent) {
      setConsent(storedConsent as ConsentState);
    } else {
      setIsVisible(true);
      setConsent("pending");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    setIsVisible(false);
    // Here you would initialize analytics
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setConsent("rejected");
    setIsVisible(false);
  };

  if (!isVisible || consent !== "pending") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-slate-200 shadow-2xl shadow-slate-900/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-slate-800">Cookievoorkeuren</h3>
            </div>
            <p className="text-sm text-slate-600">
              Wij gebruiken cookies om je ervaring te verbeteren en ons websiteverkeer te analyseren.
              Functionele cookies zijn noodzakelijk voor de werking van de website.
              Met je toestemming plaatsen we ook analytische cookies.{" "}
              <Link href="/cookies" className="text-orange-500 hover:underline">
                Lees meer
              </Link>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <button
              onClick={handleReject}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
            >
              Alleen noodzakelijk
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all shadow-md text-sm"
            >
              Alle cookies accepteren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
