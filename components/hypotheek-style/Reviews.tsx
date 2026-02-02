const reviews = [
  {
    name: "Peter van Dijk",
    role: "Ondernemer, 52 jaar",
    rating: 5,
    title: "Eindelijk duidelijkheid",
    text: "Ik dacht dat ik €2.400 per maand zou krijgen. Bleek €1.600 te zijn. Nu weet ik precies wat ik moet doen."
  },
  {
    name: "Marieke Jansen",
    role: "HR Manager, 47 jaar",
    rating: 5,
    title: "Heel prettig gesprek",
    text: "In één gesprek werd me duidelijk wat 15 jaar aan pensioenbrieven me niet hadden verteld."
  },
  {
    name: "Jan de Vries",
    role: "ZZP'er, 58 jaar",
    rating: 5,
    title: "Top advies",
    text: "Als ZZP'er had ik 12 jaar niks opgebouwd. Nu heb ik een plan waarmee ik toch op m'n 65e kan stoppen."
  },
];

export default function Reviews() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl font-bold text-slate-900">4.9</span>
            <div>
              <div className="flex text-yellow-400 text-xl">★★★★★</div>
              <p className="text-sm text-slate-600">van 225+ klanten</p>
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Wat anderen zeggen
          </h2>
          <p className="text-lg text-slate-600">
            Onze klanten waarderen ons met een 4.9
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-10 h-10 bg-[#0d9488] rounded-full flex items-center justify-center text-white font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{review.name}</p>
                      <p className="text-xs text-slate-500">{review.role}</p>
                    </div>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-sm">
                  {Array(review.rating).fill("★").join("")}
                </div>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">{review.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-[#0d9488] font-semibold hover:underline">
            Bekijk alle 225+ reviews
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
