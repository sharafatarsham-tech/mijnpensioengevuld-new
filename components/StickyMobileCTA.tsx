"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show after scrolling down 300px
      if (currentScrollY > 300) {
        // Hide when scrolling up fast, show when scrolling down or slowly
        if (currentScrollY < lastScrollY - 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 block md:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Gradient shadow above */}
      <div className="h-4 bg-gradient-to-t from-white to-transparent" />

      {/* CTA Bar */}
      <div className="bg-white border-t border-slate-200 px-4 py-3 shadow-2xl shadow-slate-900/20">
        <div className="flex gap-3">
          {/* Call Button */}
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 px-4 rounded-xl font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Bel direct</span>
          </a>

          {/* CTA Button */}
          <Link
            href="#contact"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3.5 px-4 rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Gratis Check</span>
          </Link>
        </div>

        {/* Safe area padding for iPhone notch */}
        <div className="h-safe-area-inset-bottom" />
      </div>
    </div>
  );
}
