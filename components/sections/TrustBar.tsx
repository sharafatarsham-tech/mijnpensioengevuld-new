import { siteConfig } from "@/config/site";
import { ShieldCheckIcon, ScaleIcon, CheckIcon, LockIcon } from "@/components/ui/Icons";

export function TrustBar() {
  const trustItems = [
    {
      icon: <ShieldCheckIcon className="text-green-600" size="md" />,
      text: "Geregistreerd bij AFM",
      subtext: `Nr. ${siteConfig.compliance.afmNumber}`,
    },
    {
      icon: <ScaleIcon className="text-green-600" size="md" />,
      text: "Aangesloten bij Kifid",
      subtext: "Geschillencommissie",
    },
    {
      icon: <CheckIcon className="text-green-600" size="md" />,
      text: "100% Onafhankelijk",
      subtext: "Geen provisie",
    },
    {
      icon: <LockIcon className="text-green-600" size="md" />,
      text: "AVG Compliant",
      subtext: "Veilige data",
    },
  ];

  return (
    <section className="py-4 sm:py-5 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {trustItems.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-slate-600"
            >
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-sm font-semibold text-slate-800 leading-tight truncate">{item.text}</p>
                <p className="text-[9px] sm:text-xs text-slate-500 leading-tight truncate">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
