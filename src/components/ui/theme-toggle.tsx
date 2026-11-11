import { useRef, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";
type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  );
  const switching = useRef(false);

  const applyTheme = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#0b0b0a" : "#e6e6e3");
    try { localStorage.setItem("systema-theme-v2", next); } catch { /* Storage may be unavailable. */ }
    flushSync(() => setTheme(next));
  };

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    if (switching.current) return;
    const next: Theme = theme === "dark" ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const viewDocument = document as TransitionDocument;

    if (reduceMotion) { applyTheme(next); return; }

    if (viewDocument.startViewTransition) {
      switching.current = true;
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = bounds.left + bounds.width / 2;
      const y = bounds.top + bounds.height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document.documentElement.classList.add("theme-view-transition");
      const transition = viewDocument.startViewTransition(() => applyTheme(next));
      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      }).catch(() => {});
      transition.finished.finally(() => {
        switching.current = false;
        document.documentElement.classList.remove("theme-view-transition");
      }).catch(() => {});
      return;
    }

    document.documentElement.classList.add("theme-fade-transition");
    applyTheme(next);
    window.setTimeout(() => document.documentElement.classList.remove("theme-fade-transition"), 450);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Dark mode"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={toggle}
      className={`theme-toggle theme-toggle-${theme}`}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <svg className="theme-toggle-track-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
        <svg className="theme-toggle-track-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M20.2 15.2A8.7 8.7 0 0 1 8.8 3.8 8.7 8.7 0 1 0 20.2 15.2Z" /></svg>
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  );
}
