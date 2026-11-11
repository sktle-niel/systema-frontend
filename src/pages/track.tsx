import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Wordmark } from "@/components/ui/wordmark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowLeft, BarsMark } from "@/components/ui/deck-icons";
import { fetchStatus, imageUrl, type ProjectStatus } from "@/lib/status";

export function Track() {
  const [params, setParams] = useSearchParams();
  const [ref, setRef] = useState(params.get("ref") ?? "");
  const [status, setStatus] = useState<ProjectStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [searched, setSearched] = useState(false);

  const load = async (value: string) => {
    const v = value.trim().toUpperCase();
    if (!v) return;
    setBusy(true);
    setSearched(true);
    try {
      setStatus(await fetchStatus(v));
    } catch {
      setStatus({ found: false });
    } finally {
      setBusy(false);
    }
  };

  // Auto-load when arriving with ?ref= (e.g. from the landing form or an email).
  useEffect(() => {
    const initial = params.get("ref");
    if (initial) load(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = ref.trim().toUpperCase();
    setParams(v ? { ref: v } : {});
    load(v);
  };

  return (
    <div className="min-h-screen bg-canvas px-3 pb-12 text-ink">
      <header className="sticky top-3 z-40 mx-auto mt-3 max-w-5xl">
        <div className="flex h-[60px] items-center justify-between rounded-full bg-surface pl-5 pr-2.5 shadow-[0_14px_34px_-22px_rgb(0_0_0/0.45)]">
          <Link to="/" aria-label="SYSTEMA home">
            <Wordmark className="[&_img]:w-32" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/" className="btn btn-ghost px-3">
              <ArrowLeft size={15} /> Back to site
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl py-10 md:py-16">
        <div className="rounded-[28px] bg-surface p-6 md:p-12">
        <div className="mb-12 flex justify-end">
          <BarsMark className="w-[30px]" />
        </div>
        <h1 className="font-display text-[44px] text-ink md:text-[72px]">
          Track your project
        </h1>
        <p className="mt-4 max-w-md text-muted">
          Enter the reference from your confirmation email to see how far along
          your project is.
        </p>

        <form onSubmit={submit} className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <input
            value={ref}
            onChange={(e) => setRef(e.target.value.toUpperCase())}
            placeholder="e.g. CKX-7G2K9Q"
            aria-label="Project reference"
            className="flex-1 rounded-full border-0 bg-mist px-5 py-3.5 text-[15px] tracking-[0.02em] text-ink outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-ink"
          />
          <button
            type="submit"
            disabled={busy}
            className="btn btn-primary min-h-[50px] px-8"
          >
            {busy ? "Checking…" : "Track"}
          </button>
        </form>

        {searched && !busy && status && (
          status.found ? <StatusView s={status} /> : <NotFound />
        )}
        </div>
      </main>
    </div>
  );
}

function StatusView({ s }: { s: ProjectStatus }) {
  const p = s.progress ?? 0;
  return (
    <div className="mt-10 rounded-2xl bg-mist p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label">
            {s.reference}
          </p>
          <h2 className="mt-1 text-xl font-bold text-ink">{s.title}</h2>
        </div>
        <span className="tabular font-display text-[56px] leading-none text-ink">{p}%</span>
      </div>

      <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-700"
          style={{ width: `${p}%` }}
        />
      </div>

      {s.note && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="mb-1 label">
            Latest update
          </p>
          <p className="text-sm leading-relaxed text-ink">{s.note}</p>
        </div>
      )}

      {s.images && s.images.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 label">
            Progress photos
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {s.images.map((src) => (
              <a
                key={src}
                href={imageUrl(src)}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl"
              >
                <img
                  src={imageUrl(src)}
                  alt="Project progress"
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full bg-mist object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {p >= 90 && (
        <div className="mt-6 rounded-2xl bg-brand p-4">
          <p className="text-sm font-semibold text-[#0e0e0d]">
            Your project is almost ready — please get ready for payment. We&apos;ll
            be in touch shortly.
          </p>
        </div>
      )}
    </div>
  );
}

function NotFound() {
  return (
    <div className="mt-10 rounded-2xl bg-mist p-8 text-center">
      <p className="text-sm text-muted">
        We couldn&apos;t find a project with that reference. Double-check the code
        from your confirmation email.
      </p>
    </div>
  );
}
