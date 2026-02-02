import Image from "next/image";

const reviews = [
  {
    name: "Marco V.",
    location: "Eindhoven",
    date: "januari 2026",
    rating: 5,
    title: "Uitstekend advies",
    text: "Zeer tevreden over het pensioenadvies. Alles werd helder uitgelegd en ik weet nu precies waar ik sta. Aanrader!"
  },
  {
    name: "Sandra K.",
    location: "Veldhoven",
    date: "januari 2026",
    rating: 5,
    title: "Professioneel en persoonlijk",
    text: "Fijn dat er echt naar mijn situatie werd gekeken. Geen standaard verhaal, maar advies op maat. Top service."
  },
  {
    name: "Peter de J.",
    location: "Helmond",
    date: "december 2025",
    rating: 5,
    title: "Eindelijk duidelijkheid",
    text: "Na jaren twijfelen eindelijk actie ondernomen. Het gesprek gaf me precies het inzicht dat ik nodig had."
  },
  {
    name: "Linda B.",
    location: "Eindhoven",
    date: "december 2025",
    rating: 5,
    title: "Zeer deskundig",
    text: "Goede uitleg over mijn pensioensituatie. Voelde me gehoord en kreeg eerlijk advies zonder verkooppraat."
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with Advieskeuze badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-slate-100 rounded-full px-5 py-2 mb-6">
            <span className="text-sm text-slate-600">Beoordeeld op</span>
            <span className="font-semibold text-slate-900">Advieskeuze.nl</span>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-5xl font-bold text-slate-900">9.4</span>
            <div>
              <div className="flex text-amber-400 text-xl">★★★★★</div>
              <p className="text-sm text-slate-500">Gemiddelde score</p>
            </div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Wat klanten zeggen
          </h2>
          <p className="text-lg text-slate-500">
            Lees de ervaringen van onze klanten
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {reviews.map((review, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#0d9488] rounded-full flex items-center justify-center text-white font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{review.name}</p>
                    <p className="text-xs text-slate-500">{review.location} • {review.date}</p>
                  </div>
                </div>
                <div className="flex text-amber-400 text-sm">
                  {Array(review.rating).fill("★").join("")}
                </div>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">{review.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        {/* CTA to Advieskeuze */}
        <div className="text-center">
          <a 
            href="https://www.advieskeuze.nl/over/keten/financieel-zeker/beoordelingen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#0d9488] font-semibold hover:underline"
          >
            Bekijk alle reviews op Advieskeuze.nl
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p className="text-slate-400 text-sm mt-3">
            Onafhankelijk beoordelingsplatform voor financieel advies
          </p>
        </div>
      </div>
    </section>
  );
}
