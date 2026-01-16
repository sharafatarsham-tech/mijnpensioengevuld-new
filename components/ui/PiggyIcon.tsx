import Image from "next/image";

interface PiggyIconProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-40 h-40",
  "2xl": "w-52 h-52",
};

export function PiggyIcon({ size = "md", className = "" }: PiggyIconProps) {
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <Image
        src="/pig-favicon-v2.png"
        alt="Spaarvarkentje"
        fill
        className="object-contain"
      />
    </div>
  );
}
