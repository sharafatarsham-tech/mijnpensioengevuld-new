"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Light version for white background */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo-mijnpensioen.png" 
              alt="MijnPensioenGevuld.nl" 
              width={220} 
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/over-ons" className="text-gray-700 hover:text-[#0d9488]">Over ons</Link>
            <Link href="/#calculator" className="text-gray-700 hover:text-[#0d9488]">Calculator</Link>
            <Link href="/kennisbank" className="text-gray-700 hover:text-[#0d9488]">Kennisbank</Link>
            <Link href="/#contact" className="text-gray-700 hover:text-[#0d9488]">Contact</Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-1.5 text-sm">
              <span className="text-amber-400 text-lg">★</span>
              <span className="font-bold text-slate-800">4.9</span>
              <span className="text-slate-400">/ 225+ reviews</span>
            </div>
            <Link 
              href="/#contact"
              className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              Gratis gesprek
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
