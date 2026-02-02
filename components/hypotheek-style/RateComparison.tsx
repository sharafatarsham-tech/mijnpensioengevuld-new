const scenarios = [
  { title: "AOW + werkgeverspensioen", amount: "€1.850", popular: false },
  { title: "Met eigen opbouw (lijfrente)", amount: "€2.450", popular: true },
  { title: "Met maximale inleg", amount: "€3.200", popular: false },
];

export default function RateComparison() {
  return (
    <section className="py-16 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Wat kun je verwachten bij pensioen?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Een voorbeeld van verwacht maandelijks pensioeninkomen bij een 
            inkomen van €50.000 en pensioenleeftijd 67
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {scenarios.map((scenario, i) => (
            <div
              key={i}
              className={`rounded-lg border-2 p-8 text-center transition-all ${
                scenario.popular
                  ? "border-[#0d9488] bg-teal-50 scale-105 shadow-lg"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {scenario.popular && (
                <span className="inline-block bg-[#0d9488] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Aanbevolen
                </span>
              )}
              <div className="text-sm font-medium text-slate-600 mb-3">{scenario.title}</div>
              <div className="text-4xl font-bold text-[#0d9488] mb-2">{scenario.amount}</div>
              <div className="text-sm text-slate-500 mb-6">per maand (netto)</div>
              <button className={`w-full px-4 py-3 rounded-md font-medium text-sm transition-colors ${
                scenario.popular
                  ? "bg-[#0d9488] hover:bg-[#0f766e] text-white"
                  : "bg-white hover:bg-slate-50 border border-slate-300 text-slate-900"
              }`}>
                Meer informatie
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            * Indicatieve bedragen • Persoonlijke situatie kan afwijken
          </p>
        </div>
      </div>
    </section>
  );
}
