import Link from "next/link";
import { Metadata } from "next";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { articles, getAllCategories } from "@/content/knowledge/articles";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Kennisbank",
  description: "Alles wat je moet weten over pensioen, AOW, lijfrente en meer. Helder uitgelegd.",
  alternates: {
    canonical: `${siteConfig.url}/kennisbank`,
  },
};

export default function KennisbankPage() {
  const categories = getAllCategories();

  return (
    <>
      <Navigation />
      
      <main className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Kennisbank</h1>
            <p className="text-lg text-slate-600">
              Alles wat je moet weten over pensioen, helder uitgelegd.
            </p>
          </div>

          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles
                  .filter((a) => a.category === category)
                  .map((article) => (
                    <Link
                      key={article.slug}
                      href={`/kennisbank/${article.slug}`}
                      className="bg-white rounded-xl p-6 border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all group"
                    >
                      <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">
                        {article.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-800 mt-2 mb-2 group-hover:text-orange-500 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{article.readingTime} min. leestijd</span>
                        <svg className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Persoonlijk advies nodig?</h2>
            <p className="text-slate-600 mb-6">
              Onze kennisbank geeft algemene informatie. Voor advies op maat neem je contact met ons op.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Plan een gratis gesprek
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
