import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import {
  BUSINESS_BUDGETS,
  BUSINESS_SERVICES,
  INITIAL_DATA,
  type Option,
  type QuoteData,
} from "@/lib/quote";
import {
  CurrencySwitch,
  Field,
  OptionCard,
  PhoneField,
  Segmented,
  StepHeading,
  TextArea,
  type Currency,
} from "./controls";
import { describeRate, formatBudgetRange, getUsdRate, type UsdRate } from "@/lib/rates";
import { ArrowLeft } from "@/components/ui/deck-icons";
import { submitQuote } from "@/lib/api";
import {
  validateName,
  validateEmail,
  validateContact,
  validateText,
  validateDescription,
  validateCustomBudget,
  validateDownpayment,
} from "@/lib/validation";

const FORM_STEPS = 5;

// The visitor's PHP / USD choice on the budget step, remembered on this device.
const CURRENCY_KEY = "systema-currency";
function readCurrency(): Currency {
  try {
    return localStorage.getItem(CURRENCY_KEY) === "USD" ? "USD" : "PHP";
  } catch {
    return "PHP";
  }
}
const labelOf = (list: Option[], id: string) =>
  list.find((o) => o.id === id)?.title ?? "—";

const stepVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 28 : -28, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -28 : 28, opacity: 0 }),
};

export function ProjectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<QuoteData>(INITIAL_DATA);
  const [phase, setPhase] = useState<"form" | "sending" | "done" | "error">(
    "form"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [reference, setReference] = useState("");
  const [clientEmailed, setClientEmailed] = useState<boolean | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [currency, setCurrency] = useState<Currency>(readCurrency);
  const [usdRate, setUsdRate] = useState<UsdRate | null>(null);

  // Load the exchange rate once the budget step is reached, so USD is ready.
  useEffect(() => {
    if (step === 3 && !usdRate) getUsdRate().then(setUsdRate);
  }, [step, usdRate]);

  const chooseCurrency = (next: Currency) => {
    setCurrency(next);
    try {
      localStorage.setItem(CURRENCY_KEY, next);
    } catch {
      // storage unavailable (private mode): the choice lasts for this visit only
    }
  };
  const shownRate = currency === "USD" ? usdRate : null;

  // fresh state every time the modal opens
  useEffect(() => {
    if (open) {
      setStep(1);
      setDir(1);
      setData(INITIAL_DATA);
      setPhase("form");
      setErrorMsg("");
      setReference("");
      setClientEmailed(null);
      setTouched({});
    }
  }, [open]);

  // lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // Escape closes (X / close affordance) — outside click never closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const set = <K extends keyof QuoteData>(key: K, value: QuoteData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  // Per-step validation. Returns { field: message } for anything invalid.
  const stepErrors = (s: number): Record<string, string> => {
    const e: Record<string, string> = {};
    const add = (k: string, msg: string | null) => {
      if (msg) e[k] = msg;
    };
    switch (s) {
      case 1:
        if (!data.service) {
          e.service = "Please choose what you need.";
        }
        break;
      case 2:
        add("businessName", validateText(data.businessName, { label: "your business name", min: 2 }));
        if (data.industry.trim()) {
          add("industry", validateText(data.industry, { label: "industry", min: 2 }));
        }
        add("description", validateDescription(data.description));
        break;
      case 3:
        if (!data.budget) {
          e.budget = "Please select a budget.";
        } else if (data.budget === "custom") {
          add("customBudget", validateCustomBudget(data.customBudget));
        }
        add("downpayment", validateDownpayment(data.downpayment));
        break;
      case 4:
        add("name", validateName(data.name));
        add("email", validateEmail(data.email));
        add("phone", validateContact(data.phone));
        if (data.org.trim()) {
          add("org", validateText(data.org, { label: "company", min: 2 }));
        }
        break;
    }
    return e;
  };

  const errors = stepErrors(step);
  const canProceed = (s: number): boolean => Object.keys(stepErrors(s)).length === 0;
  const markTouched = (k: string) => setTouched((t) => (t[k] ? t : { ...t, [k]: true }));
  const errOf = (k: string): string | undefined => (touched[k] ? errors[k] : undefined);

  const next = () => {
    if (step < FORM_STEPS && canProceed(step)) {
      if (step === 4) {
        setTouched((t) => ({ ...t, name: true, email: true, phone: true, org: true }));
        if (!canProceed(4)) return;
      }
      setDir(1);
      setStep((s) => s + 1);
    }
  };
  const prev = () => {
    if (step > 1) {
      setDir(-1);
      setStep((s) => s - 1);
    }
  };
  const submit = async () => {
    if (phase === "sending") return;
    setPhase("sending");
    setErrorMsg("");
    try {
      const res = await submitQuote(data);
      setReference(res.reference);
      setClientEmailed(res.clientEmailed);
      setPhase("done");
    } catch (e) {
      setErrorMsg(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again."
      );
      setPhase("error");
    }
  };

  const budgetText =
    data.budget === "custom"
      ? data.customBudget || "Custom budget"
      : labelOf(BUSINESS_BUDGETS, data.budget);

  const summary: [string, string][] = useMemo(() => {
    const rows: [string, string][] = [["Need", labelOf(BUSINESS_SERVICES, data.service)]];
    if (data.businessName) rows.push(["Business", data.businessName]);
    if (data.industry) rows.push(["Industry", data.industry]);
    rows.push(["Budget", budgetText]);
    if (data.downpayment.trim()) rows.push(["Downpayment", `₱${Number(data.downpayment).toLocaleString()}`]);
    return rows;
  }, [data, budgetText]);

  const fullSummary: [string, string, boolean?][] = useMemo(() => {
    const rows: [string, string, boolean?][] = [...summary.map(([k, v]): [string, string, boolean?] => [k, v])];
    rows.push(["Name", data.name]);
    rows.push(["Email", data.email, true]);
    if (data.phone.trim()) rows.push(["Phone", `${data.phoneCode} ${data.phone}`]);
    if (data.org.trim()) rows.push(["Company", data.org]);
    return rows;
  }, [summary, data]);

  const stepLabel =
    phase === "done"
      ? "Request received"
      : `Step ${step} of ${FORM_STEPS}`;
  const progress =
    phase === "done" ? 100 : (step / FORM_STEPS) * 100;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[rgb(8_8_8/0.6)] p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden={false}
        >
          {/* panel — backdrop click intentionally does NOT close */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Start a project"
            className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-[28px] bg-surface shadow-[0_40px_80px_-30px_rgb(0_0_0/0.55)] sm:rounded-[28px]"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* header */}
            <div className="flex shrink-0 items-center justify-between px-6 pb-4 pt-5 sm:px-7">
              <div>
                <p className="text-sm font-bold tracking-tight text-ink">
                  Start a project
                </p>
                <p className="label mt-0.5">
                  {stepLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex size-10 items-center justify-center rounded-full bg-mist text-ink transition-colors hover:bg-ink hover:text-canvas"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* progress */}
            <div className="grid shrink-0 grid-cols-5 gap-1.5 px-6 sm:px-7" aria-hidden="true">
              {Array.from({ length: FORM_STEPS }, (_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-colors duration-300 ${
                    progress >= ((i + 1) / FORM_STEPS) * 100 ? "bg-brand" : "bg-mist"
                  }`}
                />
              ))}
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-7">
              {phase === "done" ? (
                <Success
                  summary={summary}
                  name={data.name}
                  reference={reference}
                  clientEmailed={clientEmailed}
                />
              ) : (
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    {step === 1 && (
                      <>
                        <StepHeading
                          title="What do you need?"
                          subtitle="Choose the closest fit — you can add details next."
                        />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {BUSINESS_SERVICES.map((o) => (
                            <OptionCard
                              key={o.id}
                              title={o.title}
                              selected={data.service === o.id}
                              onClick={() => set("service", o.id)}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <StepHeading title="Tell us about your business" />
                        <div className="space-y-4">
                          <Field
                            label="Business name"
                            value={data.businessName}
                            onChange={(v) => set("businessName", v)}
                            onBlur={() => markTouched("businessName")}
                            error={errOf("businessName")}
                            placeholder="e.g. Sunrise Travel & Tours"
                            required
                          />
                          <Field
                            label="Industry"
                            value={data.industry}
                            onChange={(v) => set("industry", v)}
                            onBlur={() => markTouched("industry")}
                            error={errOf("industry")}
                            placeholder="e.g. Travel, Retail, Food"
                            optional
                          />
                          <TextArea
                            label="What do you want to build?"
                            value={data.description}
                            onChange={(v) => set("description", v)}
                            onBlur={() => markTouched("description")}
                            error={errOf("description")}
                            placeholder="Goals, features, and who it's for."
                            required
                          />
                          <Segmented
                            label="Do you have an existing website?"
                            value={data.hasExisting}
                            options={["Yes", "No"]}
                            onChange={(v) => set("hasExisting", v)}
                          />
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <StepHeading
                          title="Your budget"
                          subtitle="A range is fine — it helps us scope the right solution."
                          aside={<CurrencySwitch value={currency} onChange={chooseCurrency} />}
                        />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {BUSINESS_BUDGETS.map((b) => (
                            <OptionCard
                              key={b.id}
                              title={b.php ? formatBudgetRange(b.php, shownRate) : b.title}
                              hint={b.hint}
                              selected={data.budget === b.id}
                              onClick={() => set("budget", b.id)}
                            />
                          ))}
                        </div>
                        {currency === "USD" && (
                          <p className="mt-3 text-[13px] leading-relaxed text-muted" aria-live="polite">
                            {usdRate
                              ? `Dollar amounts are estimates, at ${describeRate(usdRate)}.`
                              : "Converting to US dollars…"}
                          </p>
                        )}
                        {data.budget === "custom" && (
                          <div className="mt-4">
                            <Field
                              label="Your budget"
                              value={data.customBudget}
                              onChange={(v) => set("customBudget", v)}
                              onBlur={() => markTouched("customBudget")}
                              error={errOf("customBudget")}
                              placeholder="e.g. ₱25,000 or what you can afford"
                              required
                            />
                          </div>
                        )}
                        <div className="mt-4">
                          <Field
                            label="Downpayment"
                            value={data.downpayment}
                            onChange={(v) =>
                              set("downpayment", v.replace(/[^\d]/g, ""))
                            }
                            onBlur={() => markTouched("downpayment")}
                            error={errOf("downpayment")}
                            placeholder="e.g. 2000 (₱1,000 min)"
                            inputMode="numeric"
                            optional
                          />
                          <p className="mt-2 text-[13px] leading-relaxed text-muted">
                            Numbers only, minimum ₱1,000. This is just your
                            initial downpayment — the final amount may still
                            change once we finalize the project price together.
                          </p>
                        </div>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <StepHeading
                          title="Where can we reach you?"
                          subtitle="We'll reply within one business day."
                        />
                        <div className="space-y-4">
                          <Field
                            label="Full name"
                            value={data.name}
                            onChange={(v) => set("name", v)}
                            onBlur={() => markTouched("name")}
                            error={errOf("name")}
                            placeholder="Your name"
                            required
                          />
                          <Field
                            label="Email"
                            type="email"
                            inputMode="email"
                            value={data.email}
                            onChange={(v) => set("email", v)}
                            onBlur={() => markTouched("email")}
                            error={errOf("email")}
                            placeholder="you@email.com"
                            required
                          />
                          <PhoneField
                            label="Phone / Messenger"
                            phoneCode={data.phoneCode}
                            phoneNumber={data.phone}
                            onCodeChange={(v) => set("phoneCode", v)}
                            onNumberChange={(v) => set("phone", v)}
                            onBlur={() => markTouched("phone")}
                            error={errOf("phone")}
                            optional
                          />
                          <Field
                            label="Company"
                            value={data.org}
                            onChange={(v) => set("org", v)}
                            onBlur={() => markTouched("org")}
                            error={errOf("org")}
                            placeholder="Your company"
                            optional
                          />
                        </div>
                      </>
                    )}

                    {step === 5 && (
                      <>
                        <StepHeading
                          title="Review your request"
                          subtitle="Please double-check everything before submitting."
                        />
                        <div className="mb-4 rounded-2xl bg-mist p-4">
                          <dl className="space-y-2">
                            {fullSummary.map(([k, v, highlight]) => (
                              <div
                                key={k}
                                className="flex justify-between gap-4 text-sm"
                              >
                                <dt className="text-muted">{k}</dt>
                                <dd className={cn("text-right font-medium", highlight ? "text-brand-ink" : "text-ink")}>
                                  {v}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                        <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-brand)_40%,transparent)] bg-brand-soft p-4">
                          <p className="text-[13px] font-semibold text-brand-ink">
                            Is your email correct?
                          </p>
                          <p className="mt-1 text-[15px] font-bold text-ink">{data.email}</p>
                          <p className="mt-2 text-[13px] leading-relaxed text-muted">
                            Your reference ticket number and project updates will be sent to this email. If it's wrong, go back and fix it — we won't be able to reach you otherwise.
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* error banner */}
            {phase === "error" && (
              <div className="shrink-0 bg-danger-soft px-6 py-3 text-[13px] text-danger sm:px-7">
                {errorMsg} Please try again in a moment.
              </div>
            )}

            {/* footer */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line px-6 py-4 sm:px-7">
              {phase === "done" ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setPhase("form");
                      setReference("");
                      setClientEmailed(null);
                      setErrorMsg("");
                      setStep(1);
                      setData(INITIAL_DATA);
                    }}
                    className="btn btn-ghost"
                  >
                    Start another
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-primary"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prev}
                      className="btn btn-ghost"
                    >
                      <ArrowLeft size={15} /> Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                  )}

                  {step < FORM_STEPS ? (
                    <button
                      type="button"
                      onClick={next}
                      disabled={!canProceed(step)}
                      className="btn btn-primary"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      disabled={!canProceed(FORM_STEPS) || phase === "sending"}
                      className="btn btn-accent"
                    >
                      {phase === "sending" ? "Sending…" : "Submit request"}
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Success({
  summary,
  name,
  reference,
  clientEmailed,
}: {
  summary: [string, string][];
  name: string;
  reference: string;
  clientEmailed: boolean | null;
}) {
  return (
    <div className="py-4 text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="#0e0e0d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="font-display mt-5 text-3xl text-ink">
        Thank you{name ? `, ${name.split(" ")[0]}` : ""}!
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
        {clientEmailed === false
          ? "Your request is saved. The confirmation email is queued for another attempt. Please keep your reference below."
          : clientEmailed === true
            ? "Your request is saved. Our mail service accepted the confirmation; please check your inbox or spam folder."
            : "Your request is saved. Please keep your reference below in case the confirmation email does not arrive."}
      </p>
      {reference && (
        <p className="label mt-3">
          Reference <span className="text-ink">{reference}</span>
        </p>
      )}
      <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-mist p-4 text-left">
        <dl className="space-y-1.5">
          {summary.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 text-sm">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
