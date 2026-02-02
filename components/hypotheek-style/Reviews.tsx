import Image from "next/image";

const reviews = [
  {
    name: "Sara",
    date: "02 februari 2026",
    category: "Pensioen",
    rating: 5,
    text: "Paul neemt echt de tijd voor je om de ingewikkelde onderwerpen rondom pensioen uit te leggen. Geen haast, gewoon duidelijke uitleg."
  },
  {
    name: "Marco",
    date: "28 januari 2026",
    category: "Pensioen",
    rating: 5,
    text: "Zeer tevreden over het pensioenadvies. Alles werd helder uitgelegd en ik weet nu precies waar ik sta. Aanrader!"
  },
  {
    name: "Linda",
    date: "22 januari 2026",
    category: "Pensioen",
    rating: 5,
    text: "Fijn dat er echt naar mijn situatie werd gekeken. Geen standaard verhaal, maar advies op maat. Top service."
  },
  {
    name: "Peter",
    date: "15 januari 2026",
    category: "Pensioen",
    rating: 5,
    text: "Na jaren twijfelen eindelijk actie ondernomen. Het gesprek gaf me precies het inzicht dat ik nodig had."
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Advieskeuze Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-12 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Score Badge */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-[#2196F3] rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-4xl font-bold text-white">9.4</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Image
                  src="/kennisbank/advieskeuze-logo.svg"
                  alt="Advieskeuze"
                  width={160}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Reviews van Financieel Zeker
              </h3>
              <p className="text-[#2196F3] font-semibold">1610 reviews</p>
            </div>

            {/* CTA */}
            <a
              href="https://www.advieskeuze.nl/over/keten/financieel-zeker/beoordelingen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
            >
              Bekijk alle reviews
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Wat klanten zeggen
          </h2>
          <p className="text-lg text-slate-500">
            Recente ervaringen van onze klanten
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-bold text-[#2196F3] text-lg">{review.name}</p>
                  <div className="flex text-amber-400 text-sm my-1">
                    {Array(review.rating).fill("★").join("")}
                  </div>
                  <p className="text-xs text-slate-400">{review.date}</p>
                </div>
                <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">
                  {review.category}
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <a 
            href="https://www.advieskeuze.nl/over/keten/financieel-zeker/beoordelingen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#2196F3] hover:bg-[#1976D2] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Image
              src="/kennisbank/advieskeuze-logo.svg"
              alt="Advieskeuze"
              width={100}
              height={24}
              className="h-5 w-auto brightness-0 invert"
            />
            <span>Bekijk alle 1610 reviews</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
