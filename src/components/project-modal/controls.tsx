import { useEffect, useRef, useState, type ReactNode } from "react";
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

type CountryEntry = { code: string; flag: string; name: string };

const COUNTRIES: CountryEntry[] = [
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "+95", flag: "🇲🇲", name: "Myanmar" },
  { code: "+855", flag: "🇰🇭", name: "Cambodia" },
  { code: "+856", flag: "🇱🇦", name: "Laos" },
  { code: "+673", flag: "🇧🇳", name: "Brunei" },
  { code: "+670", flag: "🇹🇱", name: "Timor-Leste" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+962", flag: "🇯🇴", name: "Jordan" },
  { code: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "+98", flag: "🇮🇷", name: "Iran" },
  { code: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+93", flag: "🇦🇫", name: "Afghanistan" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "+36", flag: "🇭🇺", name: "Hungary" },
  { code: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "+359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+354", flag: "🇮🇸", name: "Iceland" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "+375", flag: "🇧🇾", name: "Belarus" },
  { code: "+370", flag: "🇱🇹", name: "Lithuania" },
  { code: "+371", flag: "🇱🇻", name: "Latvia" },
  { code: "+372", flag: "🇪🇪", name: "Estonia" },
  { code: "+385", flag: "🇭🇷", name: "Croatia" },
  { code: "+381", flag: "🇷🇸", name: "Serbia" },
  { code: "+386", flag: "🇸🇮", name: "Slovenia" },
  { code: "+421", flag: "🇸🇰", name: "Slovakia" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "+58", flag: "🇻🇪", name: "Venezuela" },
  { code: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "+591", flag: "🇧🇴", name: "Bolivia" },
  { code: "+595", flag: "🇵🇾", name: "Paraguay" },
  { code: "+598", flag: "🇺🇾", name: "Uruguay" },
  { code: "+506", flag: "🇨🇷", name: "Costa Rica" },
  { code: "+507", flag: "🇵🇦", name: "Panama" },
  { code: "+502", flag: "🇬🇹", name: "Guatemala" },
  { code: "+53", flag: "🇨🇺", name: "Cuba" },
  { code: "+1-809", flag: "🇩🇴", name: "Dominican Republic" },
  { code: "+509", flag: "🇭🇹", name: "Haiti" },
  { code: "+1-876", flag: "🇯🇲", name: "Jamaica" },
  { code: "+1-868", flag: "🇹🇹", name: "Trinidad & Tobago" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "+216", flag: "🇹🇳", name: "Tunisia" },
  { code: "+218", flag: "🇱🇾", name: "Libya" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "+250", flag: "🇷🇼", name: "Rwanda" },
  { code: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "+225", flag: "🇨🇮", name: "Ivory Coast" },
  { code: "+221", flag: "🇸🇳", name: "Senegal" },
  { code: "+243", flag: "🇨🇩", name: "DR Congo" },
  { code: "+260", flag: "🇿🇲", name: "Zambia" },
  { code: "+263", flag: "🇿🇼", name: "Zimbabwe" },
  { code: "+258", flag: "🇲🇿", name: "Mozambique" },
  { code: "+261", flag: "🇲🇬", name: "Madagascar" },
  { code: "+230", flag: "🇲🇺", name: "Mauritius" },
  { code: "+679", flag: "🇫🇯", name: "Fiji" },
  { code: "+675", flag: "🇵🇬", name: "Papua New Guinea" },
  { code: "+676", flag: "🇹🇴", name: "Tonga" },
  { code: "+685", flag: "🇼🇸", name: "Samoa" },
];

function CountryCodePicker({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (code: string) => void;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRIES.find((c) => c.code === value) ?? COUNTRIES[0];

  const filtered = search.trim()
    ? COUNTRIES.filter((c) => {
        const q = search.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.code.includes(q);
      })
    : COUNTRIES;

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setSearch(""); }}
        className={cn(
          "flex h-[46px] items-center gap-1.5 rounded-xl border-0 bg-mist px-3 text-[14px] text-ink outline-none transition-shadow duration-200 focus:ring-2",
          hasError ? "ring-2 ring-danger focus:ring-danger" : "focus:ring-ink"
        )}
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span>{selected.code}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="ml-0.5 text-muted">
          <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-xl bg-surface shadow-[0_8px_30px_rgb(0_0_0/0.25)]">
          <div className="border-b border-line p-2">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full rounded-lg bg-mist px-3 py-2 text-[13px] text-ink outline-none placeholder:text-muted"
            />
          </div>
          <div className="max-h-52 overflow-y-auto overscroll-contain py-1">
            {filtered.length === 0 && (
              <p className="px-3 py-2 text-[13px] text-muted">No results</p>
            )}
            {filtered.map((c, i) => (
              <button
                key={`${c.code}-${c.name}-${i}`}
                type="button"
                onClick={() => { onChange(c.code); setOpen(false); setSearch(""); }}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] transition-colors hover:bg-mist",
                  c.code === value && c.name === selected.name && "bg-mist font-semibold"
                )}
              >
                <span className="text-base leading-none">{c.flag}</span>
                <span className="flex-1 truncate text-ink">{c.name}</span>
                <span className="text-muted">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function PhoneField({
  label,
  phoneCode,
  phoneNumber,
  onCodeChange,
  onNumberChange,
  onBlur,
  optional,
  error,
}: {
  label: string;
  phoneCode: string;
  phoneNumber: string;
  onCodeChange: (code: string) => void;
  onNumberChange: (num: string) => void;
  onBlur?: () => void;
  optional?: boolean;
  error?: string;
}) {
  return (
    <div className="block">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted">(optional)</span>}
      </span>
      <div className="mt-1.5 flex gap-2">
        <CountryCodePicker value={phoneCode} onChange={onCodeChange} hasError={!!error} />
        <input
          type="tel"
          inputMode="tel"
          maxLength={10}
          value={phoneNumber}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            if (digits.length <= 10) onNumberChange(digits);
          }}
          onBlur={onBlur}
          placeholder="9xxxxxxxxx"
          aria-invalid={error ? true : undefined}
          className={cn(
            "min-w-0 flex-1 rounded-xl border-0 bg-mist px-4 py-3 text-[15px] text-ink outline-none transition-shadow duration-200 placeholder:text-muted focus:ring-2",
            error ? "ring-2 ring-danger focus:ring-danger" : "focus:ring-ink"
          )}
        />
      </div>
      {error && <span className="mt-1.5 block text-[13px] text-danger">{error}</span>}
    </div>
  );
}

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
