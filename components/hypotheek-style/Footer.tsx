import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#1e56a0] rounded-full flex items-center justify-center text-white font-bold text-sm">
                MP
              </div>
              <span className="font-semibold text-white text-lg">MijnPensioenGevuld</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Onafhankelijk pensioenadvies. Helder en op maat.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center transition-colors">
                <span className="text-sm">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center transition-colors">
                <span className="text-sm">in</span>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center transition-colors">
                <span className="text-sm">✉</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:0403041767" className="hover:text-white transition-colors">
                  040 - 30 41 767
                </a>
              </li>
              <li>
                <a href="mailto:info@mijnpensioengevuld.nl" className="hover:text-white transition-colors">
                  info@mijnpensioengevuld.nl
                </a>
              </li>
              <li className="pt-2">
                <p>Eindhoven, Nederland</p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Navigatie</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/over-ons" className="hover:text-white transition-colors">Over ons</Link></li>
              <li><Link href="/diensten" className="hover:text-white transition-colors">Diensten</Link></li>
              <li><Link href="/kennisbank" className="hover:text-white transition-colors">Kennisbank</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
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

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© 2024 MijnPensioenGevuld.nl. Alle rechten voorbehouden.</p>
            <div className="flex items-center gap-6">
              <span>AFM-vergunning: 12016626</span>
              <span>KvK: 61016810</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
