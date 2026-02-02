const rates = [
  { period: "1 jaar vast", rate: "2.45%", monthly: "€ 895" },
  { period: "5 jaar vast", rate: "2.78%", monthly: "€ 945" },
  { period: "10 jaar vast", rate: "3.12%", monthly: "€ 998", popular: true },
  { period: "20 jaar vast", rate: "3.45%", monthly: "€ 1.045" },
  { period: "30 jaar vast", rate: "3.67%", monthly: "€ 1.078" },
];

export default function RateComparison() {
  return (
    <section className="py-16 bg-white border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Actuele pensioentarieven
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vergelijk de beste tarieven van meer dan 40 aanbieders. 
            Gegarandeerd de laagste rente voor jouw situatie.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-flex gap-4 min-w-full lg:grid lg:grid-cols-5">
            {rates.map((rate, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-64 lg:w-auto rounded-lg border-2 p-6 text-center transition-all ${
                  rate.popular
                    ? "border-[#1e56a0] bg-blue-50 scale-105 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                {rate.popular && (
                  <span className="inline-block bg-[#1e56a0] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    Meest gekozen
                  </span>
                )}
                <div className="text-sm font-medium text-gray-600 mb-2">{rate.period}</div>
                <div className="text-4xl font-bold text-[#1e56a0] mb-1">{rate.rate}</div>
                <div className="text-sm text-gray-500 mb-4">vanaf {rate.monthly} p/m</div>
                <button className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 px-4 py-2 rounded-md font-medium text-sm transition-colors">
                  Bekijk details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            * Tarieven indicatief, o.b.v. €200.000 lening • Laatste update: vandaag 09:15
          </p>
        </div>
      </div>
    </section>
  );
}
