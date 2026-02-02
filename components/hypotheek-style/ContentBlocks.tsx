const articles = [
  {
    image: "📈",
    title: "Hoe bouw je slim pensioen op?",
    excerpt: "Ontdek de beste strategieën om jouw pensioen op te bouwen en waar je op moet letten.",
    readTime: "5 min leestijd"
  },
  {
    image: "💡",
    title: "Belastingvoordeel optimaal benutten",
    excerpt: "Leer hoe je fiscale voordelen gebruikt om meer uit je pensioenopbouw te halen.",
    readTime: "4 min leestijd"
  },
  {
    image: "🎯",
    title: "Eerder met pensioen: is het haalbaar?",
    excerpt: "Bereken of jij voor je 67e kunt stoppen met werken en wat daarvoor nodig is.",
    readTime: "6 min leestijd"
  },
];

export default function ContentBlocks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Kennisbank
          </h2>
          <p className="text-lg text-slate-600">
            Alles wat je moet weten over pensioen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <article key={i} className="group">
              <div className="bg-teal-50 rounded-lg h-48 flex items-center justify-center text-6xl mb-6 group-hover:bg-teal-100 transition-colors">
                {article.image}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-[#0d9488] transition-colors">
                {article.title}
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">{article.readTime}</span>
                <a href="#" className="text-[#0d9488] font-medium text-sm hover:underline">
                  Lees meer →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/kennisbank"
            className="inline-block bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-900 px-8 py-3 rounded-md font-semibold transition-colors"
          >
            Bekijk alle artikelen
          </a>
        </div>
      </div>
    </section>
  );
}
