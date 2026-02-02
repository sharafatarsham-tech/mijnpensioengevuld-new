export default function NewsletterCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#1e56a0] to-[#164180]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ontvang wekelijks pensioentips
        </h2>
        <p className="text-lg text-blue-100 mb-8">
          Blijf op de hoogte van de laatste ontwikkelingen en ontvang exclusieve tips
        </p>
        
        <form className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Je e-mailadres"
              className="flex-1 px-6 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-4 rounded-md font-semibold whitespace-nowrap transition-colors"
            >
              Aanmelden
            </button>
          </div>
          <p className="text-sm text-blue-100 mt-4">
            Geen spam. Uitschrijven kan altijd.
          </p>
        </form>

        <div className="grid md:grid-cols-3 gap-8 mt-16 text-white">
          <div>
            <div className="text-4xl font-bold mb-2">225+</div>
            <div className="text-blue-100">Tevreden klanten</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-blue-100">Jaar ervaring</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">40+</div>
            <div className="text-blue-100">Aanbieders vergeleken</div>
          </div>
        </div>
      </div>
    </section>
  );
}
