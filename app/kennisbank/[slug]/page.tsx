import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/StructuredData";
import { articles, getArticleBySlug, getRelatedArticles } from "@/content/knowledge/articles";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "Artikel niet gevonden" };

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const relatedArticles = getRelatedArticles(article);

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Kennisbank", href: "/kennisbank" },
    { name: article.title, href: `/kennisbank/${article.slug}` },
  ];

  return (
    <>
      <ArticleSchema
        title={article.title}
        description={article.description}
        slug={article.slug}
        datePublished={article.lastUpdated}
        dateModified={article.lastUpdated}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {article.faqs && article.faqs.length > 0 && <FAQSchema faqs={article.faqs} />}

      <Navigation />

      <main className="pt-28 pb-16">
        <article className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-orange-500">Home</Link></li>
              <li>/</li>
              <li><Link href="/kennisbank" className="hover:text-orange-500">Kennisbank</Link></li>
              <li>/</li>
              <li className="text-slate-800">{article.title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-medium text-orange-500 uppercase tracking-wider">{article.category}</span>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-2 mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>{article.readingTime} min. leestijd</span>
              <span>•</span>
              <span>Bijgewerkt: {formatDate(article.lastUpdated)}</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* FAQ Section */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="mt-12 bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Veelgestelde vragen</h2>
              <div className="space-y-4">
                {article.faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border border-slate-100">
                    <h3 className="font-semibold text-slate-800 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-12 bg-slate-100 border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-800 mb-2">Disclaimer</h3>
            <p className="text-sm text-slate-600">{siteConfig.compliance.disclaimer}</p>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Vragen over dit onderwerp?</h3>
            <p className="text-slate-600 mb-4">We helpen je graag met persoonlijk advies.</p>
            <Link href="/#contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold">
              Neem contact op
            </Link>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Gerelateerde artikelen</h2>
              <div className="grid gap-4">
                {relatedArticles.map((related) => (
                  <Link key={related.slug} href={`/kennisbank/${related.slug}`} className="bg-white rounded-xl p-4 border border-slate-200 hover:border-orange-300 transition-all flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800">{related.title}</h3>
                      <p className="text-sm text-slate-500">{related.readingTime} min.</p>
                    </div>
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
