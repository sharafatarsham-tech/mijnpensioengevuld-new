import { siteConfig } from "@/config/site";

// Custom SVG Badge Components
function AFMBadge() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
      {/* Outer swirl */}
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="none" stroke="#99f6e4" strokeWidth="4" />
        <path
          d="M 40 8 A 32 32 0 0 1 72 40"
          fill="none"
          stroke="#5eead4"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="40" cy="40" r="28" fill="none" stroke="#ccfbf1" strokeWidth="2" />
      </svg>
      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-teal-700 font-bold text-sm sm:text-base tracking-tight">AFM</span>
      </div>
    </div>
  );
}

function KifidBadge() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="none" stroke="#99f6e4" strokeWidth="3" />
        <circle cx="40" cy="40" r="30" fill="none" stroke="#ccfbf1" strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-teal-700 font-bold text-sm sm:text-base tracking-tight">Kifid</span>
      </div>
    </div>
  );
}

function GoogleReviewBadge() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="none" stroke="#99f6e4" strokeWidth="3" />
        {/* Star */}
        <path
          d="M40 18 L44 30 L57 30 L47 38 L51 51 L40 43 L29 51 L33 38 L23 30 L36 30 Z"
          fill="#5eead4"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
        <span className="text-teal-700 font-bold text-lg sm:text-xl leading-none">4.9</span>
        <span className="text-teal-600 text-[8px] sm:text-[10px] leading-tight">Google Reviews</span>
      </div>
    </div>
  );
}

function ClientsBadge() {
  return (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20">
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="40" cy="40" r="36" fill="none" stroke="#99f6e4" strokeWidth="3" />
        {/* Person icon */}
        <circle cx="35" cy="22" r="6" fill="#5eead4" />
        <path
          d="M25 38 Q25 30 35 30 Q45 30 45 38"
          fill="#5eead4"
        />
        {/* Arrow up */}
        <path
          d="M50 35 L50 22 M45 27 L50 22 L55 27"
          stroke="#5eead4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
        <span className="text-teal-700 font-bold text-lg sm:text-xl leading-none">225+</span>
        <span className="text-teal-600 text-[8px] sm:text-[10px] leading-tight">Klanten</span>
      </div>
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="py-6 sm:py-8 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center gap-4 sm:gap-8 lg:gap-12">
          <div className="flex flex-col items-center group cursor-default">
            <AFMBadge />
            <span className="text-[10px] sm:text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Geregistreerd
            </span>
          </div>
          
          <div className="flex flex-col items-center group cursor-default">
            <KifidBadge />
            <span className="text-[10px] sm:text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Aangesloten
            </span>
              </div>
          
          <div className="flex flex-col items-center group cursor-default">
            <GoogleReviewBadge />
            <span className="text-[10px] sm:text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Tevreden klanten
            </span>
              </div>
          
          <div className="flex flex-col items-center group cursor-default">
            <ClientsBadge />
            <span className="text-[10px] sm:text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Geholpen
            </span>
            </div>
        </div>
      </div>
    </section>
  );
}
