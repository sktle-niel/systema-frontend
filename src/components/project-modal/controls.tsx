import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Selectable card used for path / system / service / budget choices: a mist tile that turns lime when chosen. */
export function OptionCard({
  title,
  desc,
  hint,
  selected,
  onClick,
}: {
  title: string;
  desc?: string;
  hint?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group flex w-full items-start gap-3 rounded-2xl p-4 text-left transition-colors duration-200",
        selected
          ? "bg-brand text-[#0e0e0d]"
          : "bg-mist text-ink hover:bg-[color-mix(in_srgb,var(--color-mist)_88%,var(--color-ink))]"
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
          selected ? "border-[#0e0e0d] bg-[#0e0e0d] text-brand" : "border-[color-mix(in_srgb,var(--color-ink)_30%,transparent)] text-transparent"
        )}
        aria-hidden
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6.2l2.2 2.3L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold tracking-[-0.01em]">{title}</span>
        {desc && <span className={cn("mt-0.5 block text-[13px]", selected ? "text-[#24320f]" : "text-muted")}>{desc}</span>}
        {hint && (
          <span className={cn("mt-0.5 block text-[13px]", selected ? "text-[#24320f]" : "text-brand-ink")}>{hint}</span>
        )}
      </span>
    </button>
  );
}

const inputBase =
  "mt-1.5 w-full rounded-xl border-0 bg-mist px-4 py-3 text-[15px] text-ink outline-none transition-shadow duration-200 placeholder:text-muted focus:ring-2";

export function Field({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  required,
  optional,
  error,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-brand-ink">*</span>}
        {optional && <span className="text-xs font-normal text-muted">(optional)</span>}
      </span>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        className={cn(inputBase, error ? "ring-2 ring-danger focus:ring-danger" : "focus:ring-ink")}
      />
      {error && <span className="mt-1.5 block text-[13px] text-danger">{error}</span>}
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  error,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-brand-ink">*</span>}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={error ? true : undefined}
        className={cn(inputBase, "resize-none", error ? "ring-2 ring-danger focus:ring-danger" : "focus:ring-ink")}
      />
      {error && <span className="mt-1.5 block text-[13px] text-danger">{error}</span>}
    </label>
  );
}

/** Small segmented Yes/No control. */
export function Segmented({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="text-sm font-semibold text-ink">{label}</span>
      <div className="mt-1.5 inline-flex rounded-full bg-mist p-1">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            aria-pressed={value === opt}
            className={cn(
              "rounded-full px-5 py-1.5 text-sm font-semibold transition-colors",
              value === opt ? "bg-ink text-canvas" : "text-muted hover:text-ink"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function StepHeading({
  title,
  subtitle,
  aside,
}: {
  title: string;
  subtitle?: string;
  /** Optional control shown beside the heading (wraps below it on narrow screens). */
  aside?: ReactNode;
}) {
  const text = (
    <>
      <h3 className="font-display text-[28px] text-ink sm:text-[32px]">{title}</h3>
      {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
    </>
  );
  if (!aside) return <div className="mb-6">{text}</div>;
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">{text}</div>
      {aside}
    </div>
  );
}

export type Currency = "PHP" | "USD";

/** Peso / dollar switch for the budget step, styled like Segmented. */
export function CurrencySwitch({ value, onChange }: { value: Currency; onChange: (next: Currency) => void }) {
  return (
    <div role="group" aria-label="Show budget in" className="inline-flex shrink-0 rounded-full bg-mist p-1">
      {(["PHP", "USD"] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-pressed={value === c}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors",
            value === c ? "bg-ink text-canvas" : "text-muted hover:text-ink"
          )}
        >
          {c === "PHP" ? "₱ PHP" : "$ USD"}
        </button>
      ))}
    </div>
  );
}

export function NoteCard({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 rounded-2xl bg-brand-soft p-4">
      <p className="text-[13px] leading-relaxed text-brand-ink">{children}</p>
    </div>
  );
}
