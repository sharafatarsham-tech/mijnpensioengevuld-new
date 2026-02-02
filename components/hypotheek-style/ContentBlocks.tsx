import Image from "next/image";

const articles = [
  {
    image: "/kennisbank/jaarruimte.jpg",
    title: "Hoe bouw je slim pensioen op?",
    excerpt: "Ontdek de beste strategieën om jouw pensioen op te bouwen en waar je op moet letten.",
    readTime: "5 min leestijd"
  },
  {
    image: "/kennisbank/aow-uitleg.jpg",
    title: "Belastingvoordeel optimaal benutten",
    excerpt: "Leer hoe je fiscale voordelen gebruikt om meer uit je pensioenopbouw te halen.",
    readTime: "4 min leestijd"
  },
  {
    image: "/kennisbank/vrouwzzp.jpg",
    title: "Eerder met pensioen: is het haalbaar?",
    excerpt: "Bereken of jij voor je 67e kunt stoppen met werken en wat daarvoor nodig is.",
    readTime: "6 min leestijd"
  },
];

export default function ContentBlocks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#0d9488] uppercase tracking-wider mb-3">
            Kennisbank
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Alles over pensioen
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Handige artikelen om je te helpen bij je pensioenplanning
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="relative h-52 rounded-xl overflow-hidden mb-5">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-[#0d9488] transition-colors">
                {article.title}
              </h3>
              <p className="text-slate-500 text-sm mb-3 leading-relaxed">
                {article.excerpt}
              </p>
              <span className="text-xs text-slate-400">{article.readTime}</span>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/kennisbank"
            className="text-[#0d9488] font-medium hover:underline"
          >
            Bekijk alle artikelen →
          </a>
        </div>
      </div>
    </section>
  );
}
