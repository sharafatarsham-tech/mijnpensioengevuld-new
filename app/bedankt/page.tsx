import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { PiggyIcon } from "@/components/ui/PiggyIcon";

export const metadata: Metadata = {
  title: "Bedankt",
  description: "Bedankt voor je bericht.",
};

export default function BedanktPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="relative inline-block mb-6">
            <PiggyIcon size="xl" />
            <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Bedankt voor je bericht!</h1>
          <p className="text-lg text-slate-600 mb-8">
            We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op, meestal binnen 24 uur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold">
              Terug naar home
            </Link>
            <Link href="/kennisbank" className="inline-flex items-center justify-center border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-orange-300 transition-all">
              Bekijk onze kennisbank
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
