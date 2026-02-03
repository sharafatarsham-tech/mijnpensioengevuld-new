"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { siteConfig, navItems } from "@/config/site";
import { PhoneIcon, MenuIcon, XIcon } from "@/components/ui/Icons";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-200 ${scrolled ? "bg-white shadow-lg py-2" : "bg-white py-3"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Nav Items */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <a 
            href={`tel:${siteConfig.contact.phoneRaw}`} 
            className="text-sm text-slate-600 flex items-center gap-2 hover:text-teal-600 transition-colors duration-200"
          >
            <PhoneIcon className="text-teal-600" size="sm" />
            {siteConfig.contact.phone}
          </a>
          <Link 
            href="#contact"
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-teal-500/25 hover:shadow-xl hover:from-teal-700 hover:to-teal-600 transition-all duration-200"
          >
            Gratis pensioencheck
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden p-2 text-slate-600 cursor-pointer" 
          aria-label="Menu"
        >
          {mobileMenuOpen ? <XIcon size="lg" /> : <MenuIcon size="lg" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg p-6 space-y-4">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-slate-600 font-medium py-2 hover:text-teal-600 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="#contact"
            onClick={() => setMobileMenuOpen(false)} 
            className="block w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-3 rounded-lg text-center font-semibold"
          >
            Gratis pensioencheck
          </Link>
        </div>
      )}
    </header>
  );
}
