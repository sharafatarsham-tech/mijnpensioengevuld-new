export default function TrustLogos() {
  const logos = [
    "ABN AMRO", "Rabobank", "ING", "SNS", "Aegon", 
    "ASR", "Nationale Nederlanden", "Allianz"
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-medium text-gray-500 mb-8">
          Wij werken samen met alle grote aanbieders
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="w-full h-16 flex items-center justify-center text-gray-400 font-semibold text-sm grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
            >
              <div className="w-20 h-20 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-3">
                <span className="text-xs text-center">{logo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
