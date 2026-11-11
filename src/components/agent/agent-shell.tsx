import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Wordmark } from "@/components/ui/wordmark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowLeft, BarsMark } from "@/components/ui/deck-icons";

/** Shared chrome for the agent portal pages (apply / login / dashboard): the deck's floating bar on the grey canvas. */
export function AgentShell({
  children,
  right,
}: {
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas px-3 pb-12 text-ink">
      <header className="sticky top-3 z-40 mx-auto mt-3 max-w-5xl">
        <div className="flex h-[60px] items-center justify-between rounded-full bg-surface pl-5 pr-2.5 shadow-[0_14px_34px_-22px_rgb(0_0_0/0.45)]">
          <Link to="/" aria-label="SYSTEMA home">
            <Wordmark className="[&_img]:w-32" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {right ?? (
              <Link to="/" className="btn btn-ghost px-3">
                <ArrowLeft size={15} /> Back to site
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl py-10 md:py-16">
        {children}
      </main>
    </div>
  );
}

/** Centered narrow card for the apply / login forms: a single slide. */
export function AgentCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-[28px] bg-surface p-7 md:p-9">
        <div className="mb-10 flex justify-end">
          <BarsMark className="w-[30px]" />
        </div>
        <h1 className="font-display text-[34px] text-ink md:text-[40px]">{title}</h1>
        {subtitle && (
          <p className="mt-3 text-sm leading-relaxed text-muted">{subtitle}</p>
        )}
        <div className="mt-7">{children}</div>
      </div>
    </div>
  );
}
