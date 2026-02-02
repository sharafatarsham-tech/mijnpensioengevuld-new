const reviews = [
  {
    name: "Peter van Dijk",
    date: "2 dagen geleden",
    rating: 5,
    title: "zeer goed",
    text: "Professioneel advies en duidelijke uitleg. Alles precies zoals beloofd."
  },
  {
    name: "Linda Bakker",
    date: "1 week geleden",
    rating: 5,
    title: "goede ervaring",
    text: "Snelle service en vriendelijke medewerkers. Erg tevreden met het resultaat."
  },
  {
    name: "Mark Hendriks",
    date: "2 weken geleden",
    rating: 5,
    title: "Gewoon, heel goed",
    text: "Helder en to the point. Geen gedoe, gewoon goed advies."
  },
];

export default function Reviews() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-5xl font-bold text-gray-900">8.1</span>
            <div>
              <div className="flex text-yellow-400 text-xl">★★★★★</div>
              <p className="text-sm text-gray-600">van 225+ klanten</p>
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Wat anderen zeggen
          </h2>
          <p className="text-lg text-gray-600">
            Onze klanten waarderen ons met een 8.1
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-10 h-10 bg-[#1e56a0] rounded-full flex items-center justify-center text-white font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-sm">
                  {Array(review.rating).fill("★").join("")}
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-[#1e56a0] font-semibold hover:underline">
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
