"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { siteConfig, navItems } from "@/config/site";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-2" : "bg-white/90 backdrop-blur-sm py-3"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-slate-600 hover:text-orange-500 transition-colors">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href={`tel:${siteConfig.contact.phoneRaw}`} className="text-sm text-slate-600 flex items-center gap-2 hover:text-orange-500">
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {siteConfig.contact.phone}
          </a>
          <Link href="/#contact" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all">
            Gratis pensioencheck
          </Link>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-600" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg p-6 space-y-4">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block text-slate-600 font-medium py-2">
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg text-center font-semibold">
            Gratis pensioencheck
          </Link>
        </div>
      )}
    </nav>
  );
}
