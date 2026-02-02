import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            {/* Logo - light variant for dark background */}
            <div className="mb-6">
              <Logo variant="light" />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Onafhankelijk pensioenadvies. Helder en op maat.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-[#0d9488] rounded flex items-center justify-center transition-colors">
                <span className="text-sm">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-[#0d9488] rounded flex items-center justify-center transition-colors">
                <span className="text-sm">in</span>
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-[#0d9488] rounded flex items-center justify-center transition-colors">
                <span className="text-sm">✉</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="pt-2">
                <p>{siteConfig.contact.address.city}, Nederland</p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigatie</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/over-ons" className="hover:text-white transition-colors">Over ons</Link></li>
              <li><Link href="/#werkwijze" className="hover:text-white transition-colors">Werkwijze</Link></li>
              <li><Link href="/kennisbank" className="hover:text-white transition-colors">Kennisbank</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Juridisch</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacybeleid</Link></li>
              <li><Link href="/voorwaarden" className="hover:text-white transition-colors">Algemene voorwaarden</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookievoorkeuren</Link></li>
              <li><Link href="/klachten" className="hover:text-white transition-colors">Klachten</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© 2024 {siteConfig.name}. Alle rechten voorbehouden.</p>
            <div className="flex items-center gap-6">
              <span>AFM-vergunning: {siteConfig.compliance.afmNumber}</span>
              <span>KvK: {siteConfig.business.kvkNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
