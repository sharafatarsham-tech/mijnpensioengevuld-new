"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
    <section id="ervaringen" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">Ervaringen</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-6">Wat klanten zeggen</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-slate-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-5xl text-orange-400 leading-none">"</div>
              <div className="flex -space-x-2">
                {testimonials.map((t, i) => (
                  <div 
                    key={i} 
                    className={`w-10 h-10 rounded-full border-2 border-white overflow-hidden transition-all ${i === active ? "ring-2 ring-orange-400 scale-110 z-10" : "opacity-60"}`}
                  >
                    {t.image ? (
                      <Image src={t.image} alt={t.name} width={40} height={40} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-sm font-bold text-orange-600">
                        {t.name.charAt(0)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8">{current.quote}</p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-200 shadow-md">
                  {current.image ? (
                    <Image src={current.image} alt={current.name} width={56} height={56} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-xl font-bold text-orange-600">
                      {current.name.charAt(0)}
                    </div>
                  )}
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
