"use client";

import { useState } from "react";
import { FAQ } from "@/types";

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3">Veelgestelde vragen</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={activeFaq === i}
              >
                <span className="font-semibold text-slate-800 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-orange-500 flex-shrink-0 transition-transform ${activeFaq === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeFaq === i && (
                <div className="px-6 pb-6">
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
