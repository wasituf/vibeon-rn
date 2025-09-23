import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatViews(value: string, decimals = 1) {
  // Remove everything that is not a digit or a comma
  const cleaned = value.replace(/[^\d,]/g, "")

  // Remove commas (optional – keep if you need the formatted number)
  const numeric = cleaned.replace(/,/g, "")

  // Convert to a Number (will be NaN if the result is empty)
  const num = Number(numeric)

  if (isNaN(num)) return ""

  const units = [
    { limit: 1e12, suffix: "T" },
    { limit: 1e9, suffix: "B" },
    { limit: 1e6, suffix: "M" },
    { limit: 1e3, suffix: "K" },
  ]

  for (const { limit, suffix } of units) {
    if (Math.abs(num) >= limit) {
      const short = (num / limit).toFixed(decimals)
      // Remove trailing ".0" when decimals are not needed
      const cleaned = short.replace(/\.0+$/, "")
      return `${cleaned}${suffix}` // non‑breaking space
    }
  }

  // Below 1 000 – return the raw number (optionally with decimals)
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })
}
