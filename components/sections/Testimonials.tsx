"use client";

import { useState, useEffect } from "react";
import { Testimonial } from "@/types";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const current = testimonials[active];

  return (
    <section id="ervaringen" className="py-12 lg:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Ervaringen</span>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mt-2 mb-4">Wat klanten zeggen</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-slate-100">
            <div className="text-5xl mb-6 text-orange-400">"</div>

            <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8">{current.quote}</p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-xl font-bold text-orange-600">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{current.name}</p>
                  <p className="text-sm text-slate-500">{current.role}</p>
                </div>
              </div>

              <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                {current.result}
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === active ? "bg-orange-500 w-6" : "bg-slate-300 hover:bg-orange-300"}`}
                aria-label={`Toon ervaring ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
