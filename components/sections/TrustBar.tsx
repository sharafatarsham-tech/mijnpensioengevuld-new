import { siteConfig } from "@/config/site";

export function TrustBar() {
  const trustItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      text: "Geregistreerd bij AFM",
      subtext: `Nr. ${siteConfig.compliance.afmNumber}`,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      text: "Aangesloten bij Kifid",
      subtext: "Geschillencommissie",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      text: "100% Onafhankelijk",
      subtext: "Geen provisie",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      text: "AVG Compliant",
      subtext: "Veilige data",
    },
  ];

  return (
    <section className="py-4 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-12">
          {trustItems.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 text-slate-600"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-full">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{item.text}</p>
                <p className="text-xs text-slate-500">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
