import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1e56a0] rounded-full flex items-center justify-center text-white font-bold text-sm">
              MP
            </div>
            <span className="font-semibold text-gray-900 text-lg">MijnPensioenGevuld</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#" className="text-gray-700 hover:text-[#1e56a0]">Tarieven</Link>
            <Link href="#" className="text-gray-700 hover:text-[#1e56a0]">Diensten</Link>
            <Link href="#" className="text-gray-700 hover:text-[#1e56a0]">Over ons</Link>
            <Link href="#" className="text-gray-700 hover:text-[#1e56a0]">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <span className="text-yellow-500">★</span>
              <span className="font-semibold text-gray-900">8.1</span>
              <span className="text-gray-500">/ 225+ reviews</span>
            </div>
            <Link 
              href="#"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-5 py-2.5 rounded-md font-medium text-sm transition-colors"
            >
              Start aanvraag
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
