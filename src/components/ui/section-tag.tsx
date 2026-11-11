import { cn } from "@/lib/utils";

/** Small monospace eyebrow with a lime marker, used to introduce sections. */
export function SectionTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-brand-ink",
        className
      )}
    >
      <span className="inline-block size-1.5 rounded-full bg-brand-ink" />
      {children}
    </span>
  );
}
