// Pesos per US dollar, for the budget step's USD view. The API reads the
// European Central Bank reference rate and caches it (public/rates.php), so the
// browser only ever talks to our own server.

const API_BASE = (import.meta.env.VITE_API_BASE ?? "").replace(/\/+$/, "");

export type UsdRate = {
  /** Pesos for one US dollar. */
  phpPerUsd: number;
  /** Day the rate was published (YYYY-MM-DD), when known. */
  asOf: string | null;
  /** False when this is the built-in estimate rather than a published rate. */
  published: boolean;
};

/** Used only when the API can't be reached: the ECB rate of 2026-11-10. */
const FALLBACK: UsdRate = { phpPerUsd: 62.9, asOf: null, published: false };

let pending: Promise<UsdRate> | null = null;

/** The current rate, fetched once per page load. Never rejects. */
export function getUsdRate(): Promise<UsdRate> {
  pending ??= fetch(`${API_BASE}/rates.php`)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
    .then((json: { php_per_usd?: unknown; as_of?: unknown; source?: unknown }) => {
      const rate = Number(json.php_per_usd);
      if (!(rate > 20 && rate < 200)) throw new Error("bad rate");
      return {
        phpPerUsd: rate,
        asOf: typeof json.as_of === "string" ? json.as_of : null,
        published: json.source !== "fallback",
      };
    })
    .catch(() => {
      pending = null; // try again next time
      return FALLBACK;
    });
  return pending;
}

const peso = new Intl.NumberFormat("en-PH", { maximumFractionDigits: 0 });
const dollar = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** Dollars, rounded to the nearest $5: these are budget ranges, not quotes. */
export function toUsd(php: number, rate: UsdRate): string {
  return `$${dollar.format(Math.max(5, Math.round(php / rate.phpPerUsd / 5) * 5))}`;
}

/**
 * A budget range as text, spelled out so it reads on its own: "₱20,000 – ₱40,000",
 * "Starts at ₱15,000"; in dollars "About $320 – $635", "Starts at about $240".
 */
export function formatBudgetRange(range: { min: number; max?: number }, rate: UsdRate | null): string {
  if (!rate) {
    return range.max ? `₱${peso.format(range.min)} – ₱${peso.format(range.max)}` : `Starts at ₱${peso.format(range.min)}`;
  }
  return range.max ? `About ${toUsd(range.min, rate)} – ${toUsd(range.max, rate)}` : `Starts at about ${toUsd(range.min, rate)}`;
}

/** "₱62.90 = $1 (ECB rate, Nov 10, 2026)" for the note under the tiers. */
export function describeRate(rate: UsdRate): string {
  const pesos = `₱${rate.phpPerUsd.toFixed(2)} = $1`;
  if (!rate.published || !rate.asOf) return `about ${pesos}`;
  const day = new Date(`${rate.asOf}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  return `${pesos} (ECB rate, ${day})`;
}
