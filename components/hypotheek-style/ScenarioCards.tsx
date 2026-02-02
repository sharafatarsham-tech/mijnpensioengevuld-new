const scenarios = [
  {
    icon: "📊",
    title: "Pensioenoverzicht krijgen",
    description: "Ontdek exact waar je staat. Wij brengen al je pensioenregelingen overzichtelijk in kaart.",
    link: "#"
  },
  {
    icon: "🎯",
    title: "Pensioengat dichten",
    description: "Heb je een tekort? Wij helpen je om slim extra op te bouwen voor je pensioen.",
    link: "#"
  },
  {
    icon: "💰",
    title: "Belasting besparen",
    description: "Gebruik fiscale voordelen optimaal en betaal minder belasting.",
    link: "#"
  },
  {
    icon: "⏰",
    title: "Eerder met pensioen",
    description: "Wil je voor je 67e stoppen? Bereken wat je nodig hebt en wat je opties zijn.",
    link: "#"
  },
  {
    icon: "💼",
    title: "Als ZZP'er / ondernemer",
    description: "Speciaal advies voor zelfstandigen die zelf pensioen willen opbouwen.",
    link: "#"
  },
  {
    icon: "🔄",
    title: "Pensioen optimaliseren",
    description: "Haal meer uit je bestaande pensioenopbouw met slim advies.",
    link: "#"
  },
];

export default function ScenarioCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Wat zijn jouw plannen?
          </h2>
          <p className="text-lg text-slate-600">
            Kies jouw situatie en ontdek direct wat mogelijk is
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario, i) => (
            <a
              key={i}
              href={scenario.link}
              className="group bg-white border-2 border-slate-200 rounded-lg p-8 hover:border-[#0d9488] hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4">{scenario.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-[#0d9488] transition-colors">
                {scenario.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {scenario.description}
              </p>
              <span className="inline-flex items-center text-[#0d9488] font-medium text-sm group-hover:gap-2 transition-all">
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
