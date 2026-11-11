import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)} role="img" aria-label="SYSTEMA">
      <img src="/brand/systema-wordmark-dark.webp" alt="" aria-hidden="true" className="brand-logo-dark w-36 sm:w-40" width="630" height="104" />
      <img src="/brand/systema-wordmark-light.webp" alt="" aria-hidden="true" className="brand-logo-light w-36 sm:w-40" width="630" height="104" />
    </span>
  );
}
