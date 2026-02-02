export default function RateComparison() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-[#0d9488] uppercase tracking-wider mb-3">
            De realiteit
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            68% heeft een pensioengat
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            De meeste Nederlanders bouwen niet genoeg pensioen op. 
            Hoe eerder je het weet, hoe meer je kunt doen.
          </p>
        </div>

        {/* Stats - Clean Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-slate-900 mb-2">68%</div>
            <p className="text-slate-500">heeft een tekort</p>
          </div>
          <div className="bg-white rounded-xl p-8 text-center border-2 border-[#0d9488]">
            <div className="text-5xl font-bold text-[#0d9488] mb-2">€652</div>
            <p className="text-slate-500">gemiddeld tekort p/m</p>
          </div>
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-slate-900 mb-2">45%</div>
            <p className="text-slate-500">weet het niet</p>
          </div>
        </div>

        {/* CTA - Minimal */}
        <div className="text-center">
          <p className="text-slate-600 mb-6">
            Ontdek in 30 minuten waar jij staat
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/#calculator" 
              className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-8 py-3.5 rounded-lg font-medium transition-colors"
            >
              Bereken je pensioengat
            </a>
            <a 
              href="/#contact"
              className="bg-white hover:bg-slate-100 text-slate-700 px-8 py-3.5 rounded-lg font-medium border border-slate-200 transition-colors"
            >
              Plan gratis gesprek
            </a>
          </div>
          <p className="text-slate-400 text-sm mt-6">
            Gratis • Vrijblijvend • Binnen 24 uur reactie
          </p>
        </div>
      </div>
    </section>
  );
}
