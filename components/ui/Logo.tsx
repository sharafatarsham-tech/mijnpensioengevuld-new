import Link from "next/link";
import Image from "next/image";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const textColor = variant === "light" ? "text-white" : "text-slate-800";
  const greenColor = variant === "light" ? "text-green-400" : "text-green-600";

  // Voor donkere achtergronden: pig icon + tekst
  if (variant === "light") {
    return (
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-14 h-14 lg:w-16 lg:h-16 relative flex-shrink-0">
          <Image
            src="/pig-favicon-v2.png"
            alt="MijnPensioenGevuld logo"
            fill
            className="object-contain group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className={`font-bold ${textColor} text-lg lg:text-xl`}>mijnpensioen</span>
          <span className={`font-bold ${greenColor} text-lg lg:text-xl -mt-1`}>gevuld.nl</span>
        </div>
      </Link>
    );
  }

  // Voor lichte achtergronden: volledig logo
  return (
    <Link href="/" className="block group">
      <div className="relative h-12 w-40 sm:h-14 sm:w-48 lg:h-14 lg:w-56">
        <Image
          src="/logo-mijnpensioen.png"
          alt="MijnPensioenGevuld.nl"
          fill
          className="object-contain object-left group-hover:scale-105 transition-transform"
          priority
        />
      </div>
    </Link>
  );
}
