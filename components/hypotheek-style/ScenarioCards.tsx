const scenarios = [
  {
    icon: "🏠",
    title: "Eerste woning kopen",
    description: "Ontdek hoeveel je kunt lenen en welke mogelijkheden er zijn voor starters.",
    link: "#"
  },
  {
    icon: "🔄",
    title: "Oversluiten",
    description: "Bespaar op je maandlasten door je huidige pensioen over te sluiten naar een betere regeling.",
    link: "#"
  },
  {
    icon: "💰",
    title: "Pensioengat dichten",
    description: "Heb je een tekort? Wij helpen je om slim extra op te bouwen voor je pensioen.",
    link: "#"
  },
  {
    icon: "🎯",
    title: "Eerder met pensioen",
    description: "Wil je voor je 67e stoppen? Bereken wat je nodig hebt en wat je opties zijn.",
    link: "#"
  },
  {
    icon: "👔",
    title: "Als ZZP'er",
    description: "Speciaal advies voor zelfstandigen die zelf pensioen willen opbouwen.",
    link: "#"
  },
  {
    icon: "📊",
    title: "Belasting besparen",
    description: "Gebruik fiscale voordelen optimaal en betaal minder belasting.",
    link: "#"
  },
];

export default function ScenarioCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Wat zijn jouw plannen?
          </h2>
          <p className="text-lg text-gray-600">
            Kies jouw situatie en ontdek direct wat mogelijk is
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario, i) => (
            <a
              key={i}
              href={scenario.link}
              className="group bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-[#1e56a0] hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4">{scenario.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#1e56a0] transition-colors">
                {scenario.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {scenario.description}
              </p>
              <span className="inline-flex items-center text-[#1e56a0] font-medium text-sm group-hover:gap-2 transition-all">
                Meer informatie
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
