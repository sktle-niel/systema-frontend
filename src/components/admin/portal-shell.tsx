import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Wordmark } from "@/components/ui/wordmark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GlassNav, type NavItem } from "@/components/admin/glass-nav";

/** Shared portal chrome for the admin + agent dashboards: the deck's floating top
 *  bar, the floating nav tile, and a content area that clears the floating nav. */
export function PortalShell<T extends string>({
  items,
  view,
  onView,
  onLogout,
  children,
}: {
  items: readonly NavItem<T>[];
  view: T;
  onView: (v: T) => void;
  onLogout: () => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas px-3 text-ink">
      <header className="sticky top-3 z-30 mx-auto mt-3 max-w-6xl">
        <div className="flex h-[60px] items-center justify-between rounded-full bg-surface pl-5 pr-2.5 shadow-[0_14px_34px_-22px_rgb(0_0_0/0.45)]">
          <Link to="/" aria-label="SYSTEMA home">
            <Wordmark className="[&_img]:w-32" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={onLogout}
              className="btn btn-outline btn-sm"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl items-start gap-8 pb-28 pt-8 md:pb-16 md:pt-10">
        <GlassNav items={items} value={view} onChange={onView} />
        <main className="min-w-0 flex-1 px-2 md:px-0">
          {children}
        </main>
      </div>
    </div>
  );
}
