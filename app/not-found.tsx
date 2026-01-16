import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { PiggyIcon } from "@/components/ui/PiggyIcon";

export default function NotFound() {
  return (
    <>
      <Navigation />

      <main className="pt-28 pb-16 min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <PiggyIcon size="xl" className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Oeps, deze pagina is leeg
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Net als een leeg spaarvarkentje... maar geen zorgen, we helpen je verder!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Naar de homepage
            </Link>
            <Link
              href="/kennisbank"
              className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-orange-300 transition-all"
            >
              Bekijk de kennisbank
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
