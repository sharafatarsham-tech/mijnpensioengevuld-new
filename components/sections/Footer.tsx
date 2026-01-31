import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { siteConfig, footerLinks } from "@/config/site";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CheckIcon } from "@/components/ui/Icons";

export function Footer() {
  return (
    <>
      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-orange-50 to-amber-50 border-t border-orange-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-orange-500 uppercase tracking-wider">Blijf op de hoogte</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2 mb-3 sm:mb-4">
                Gratis pensioen tips in je inbox
              </h2>
              <p className="text-slate-600 mb-4">
                Ontvang praktische tips, nieuws over pensioenregelingen en handige inzichten. 
                Maximaal 2x per maand, geen spam.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-green-500" size="sm" />
                  Praktische tips voor een beter pensioen
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-green-500" size="sm" />
                  Updates over nieuwe pensioenregels
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="text-green-500" size="sm" />
                  Altijd gratis uitschrijven
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="py-12 pb-24 md:pb-12 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <Logo variant="light" />
              <p className="text-sm text-slate-400 mt-4">
                Helder en onafhankelijk pensioenadvies. Samen zorgen we dat jouw spaarvarkentje goed gevuld wordt.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Navigatie</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {footerLinks.main.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-orange-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>{siteConfig.contact.phone}</li>
                <li>{siteConfig.contact.phoneMobile}</li>
                <li>{siteConfig.contact.email}</li>
                <li className="pt-2">{siteConfig.contact.address.street}</li>
                <li>{siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Juridisch</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-orange-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Aangesloten bij Financieel Zeker */}
          <div className="border-t border-slate-800 pt-8 mt-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <a
                  href="https://www.financieel-zeker.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 border border-slate-700 rounded-lg px-5 py-3 hover:border-slate-500 hover:bg-slate-800/50 transition-all group"
                >
                  <span className="text-sm text-slate-400 leading-tight">Wij zijn<br /><span className="text-white font-medium">aangesloten bij</span></span>
                  <Image
                    src="/financieel-zeker-new.png"
                    alt="Financieel Zeker"
                    width={140}
                    height={45}
                    className="object-contain"
                  />
                </a>
                <p className="text-xs text-slate-500 mt-3 max-w-md">
                  Geregistreerd bij de AFM onder vergunningnummer: <span className="text-slate-400">{siteConfig.compliance.afmNumber}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-6 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500">© {new Date().getFullYear()} {siteConfig.name}</p>
              <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                {footerLinks.legal.map((link) => (
                  <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
                <a href="https://www.financieel-zeker.nl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Financieel Zeker
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
