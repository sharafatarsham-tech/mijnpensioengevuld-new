import Image from "next/image";

interface AtmosphereImageProps {
  src?: string;
  alt: string;
  placeholder?: "chaos-to-clarity" | "peaceful-retirement" | "confident-future";
  className?: string;
}

export function AtmosphereImage({ src, alt, placeholder, className = "" }: AtmosphereImageProps) {
  // Als er geen src is, toon een placeholder met instructies
  if (!src) {
    return (
      <div className={`relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-600 mb-2">Sfeerbeeld placeholder</p>
            <p className="text-xs text-slate-500 max-w-xs">
              {placeholder === "chaos-to-clarity" && "Foto: stapel onbegrijpelijke pensioenbrieven → één duidelijk overzicht"}
              {placeholder === "peaceful-retirement" && "Foto: rustige sfeer (bijv. koffie in de tuin, wandeling op het strand)"}
              {placeholder === "confident-future" && "Foto: zelfverzekerde blik naar de toekomst (abstract, geen personen)"}
              {!placeholder && "Voeg hier een sfeerbeeld toe"}
            </p>
          </div>
        </div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
