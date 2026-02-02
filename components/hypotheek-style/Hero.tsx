export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Pensioenadvies dat<br />
              helder en persoonlijk is
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Ontdek vrijblijvend waar je staat met je pensioen. Wij vergelijken alle mogelijkheden 
              en geven onafhankelijk advies afgestemd op jouw situatie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-4 rounded-md font-semibold text-lg transition-colors">
                Bereken je pensioen
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-md font-semibold text-lg border-2 border-gray-200 transition-colors">
                Plan gratis gesprek
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                100% onafhankelijk
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Binnen 24 uur reactie
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                225+ tevreden klanten
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Bereken je pensioensituatie</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Huidige leeftijd</label>
                <input 
                  type="number" 
                  placeholder="bijv. 45"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e56a0] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gewenste pensioenleeftijd</label>
                <input 
                  type="number" 
                  placeholder="bijv. 67"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e56a0] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bruto jaarinkomen</label>
                <input 
                  type="text" 
                  placeholder="bijv. €50.000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e56a0] focus:border-transparent"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-4 rounded-md font-semibold transition-colors"
              >
                Bereken nu gratis →
              </button>
              <p className="text-xs text-gray-500 text-center">
                Vrijblijvend • Geen verplichtingen • 100% veilig
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
