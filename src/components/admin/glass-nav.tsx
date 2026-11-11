import { useEffect, useRef, useState } from "react";

export type NavItem<T extends string> = { id: T; label: string };

const active = "bg-ink text-canvas";
const idle = "text-muted hover:bg-mist hover:text-ink";
const FADE = 28;

/**
 * Navigation tile. A sticky column beside the content at desktop, a floating
 * horizontal bar at the bottom on mobile. Surface styling lives in
 * `.glass-nav` (index.css). The active item is an ink pill with the deck's
 * lime marker. On mobile the bar fades at whichever edge still has items
 * past it, and keeps the active item scrolled into view.
 */
export function GlassNav<T extends string>({
  items,
  value,
  onChange,
}: {
  items: readonly NavItem<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  const strip = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const update = () =>
      setEdges({
        left: el.scrollLeft > 4,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const el = strip.current;
    const current = el?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!el || !current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: current.offsetLeft - (el.clientWidth - current.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [value]);

  const mask =
    edges.left && edges.right
      ? `linear-gradient(to right, transparent, #000 ${FADE}px, #000 calc(100% - ${FADE}px), transparent)`
      : edges.right
        ? `linear-gradient(to right, #000 calc(100% - ${FADE}px), transparent)`
        : edges.left
          ? `linear-gradient(to right, transparent, #000 ${FADE}px)`
          : undefined;

  return (
    <>
      {/* desktop — vertical column anchored under the header's left edge, sticky beside the content */}
      <nav className="glass-nav sticky top-24 z-20 hidden shrink-0 flex-col gap-1 rounded-[1.5rem] p-2 md:flex">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={() => onChange(it.id)}
            aria-current={value === it.id ? "page" : undefined}
            className={`flex w-[8.5rem] items-center justify-between gap-2 rounded-full px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
              value === it.id ? active : idle
            }`}
          >
            {it.label}
            {value === it.id && <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />}
          </button>
        ))}
      </nav>

      {/* mobile — horizontal, floating bottom center; scrolls with edge fades when it overflows */}
      <nav className="glass-nav fixed bottom-4 left-1/2 z-40 max-w-[92vw] -translate-x-1/2 rounded-full p-1.5 md:hidden">
        <div
          ref={strip}
          className="flex gap-1 overflow-x-auto [scrollbar-width:none]"
          style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
        >
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => onChange(it.id)}
              aria-current={value === it.id ? "page" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                value === it.id ? active : idle
              }`}
            >
              {it.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
