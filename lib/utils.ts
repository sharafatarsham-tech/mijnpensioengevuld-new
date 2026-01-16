import { CalculatorValues } from "@/types";

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function calculatePension(values: CalculatorValues) {
  const yearsToRetirement = Math.max(0, 67 - values.age);
  const annualAccrual = values.salary * 0.0175;
  const futureAccrual = annualAccrual * yearsToRetirement;
  const totalPension = values.currentPension + futureAccrual;
  const monthlyLow = Math.round((totalPension * 0.85) / 240);
  const monthlyHigh = Math.round((totalPension * 1.15) / 240);
  const aowMonthly = values.includeAOW ? 1400 : 0;
  const targetMonthly = Math.round((values.salary * 0.7) / 12);
  const avgMonthly = (monthlyLow + monthlyHigh) / 2 + aowMonthly;
  
  return {
    monthlyLow: monthlyLow + aowMonthly,
    monthlyHigh: monthlyHigh + aowMonthly,
    aow: aowMonthly,
    target: targetMonthly,
    gap: Math.max(0, targetMonthly - avgMonthly),
    percentage: Math.min(100, Math.round((avgMonthly / targetMonthly) * 100)),
  };
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
