import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Wordmark } from "@/components/ui/wordmark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useProjectModal } from "@/components/project-modal/use-project-modal";
import { NAV } from "@/lib/site";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";

// Login links are hidden from the navigation for now (owner request, 2026-11-11).
// The /login page still works if opened directly. Set to true to show them again.
const SHOW_LOGIN_LINK = false;

export function Header() {
  const [open, setOpen] = useState(false);
  const [overWork, setOverWork] = useState(false);
  const { open: openModal } = useProjectModal();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const work = document.getElementById("work");
      if (!work) return;
      const { top, bottom } = work.getBoundingClientRect();
      setOverWork(top <= 88 && bottom > 62);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className={`s-header${overWork && !open ? " s-header-dark" : ""}`}>
      <div className="s-header-bar">
        <a href="#top" aria-label="SYSTEMA home" className="s-header-home" onClick={() => setOpen(false)}><Wordmark className="s-header-logo" /></a>
        <nav className="s-desktop-nav" aria-label="Main navigation">{NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <div className="s-header-actions">
          <ThemeToggle />
          {SHOW_LOGIN_LINK && <Link to="/login" className="s-login">Log in</Link>}
          <button type="button" onClick={openModal} className="btn btn-primary s-header-cta">Let's talk <ArrowUpRight /></button>
          <button type="button" className="s-menu-button" aria-expanded={open} aria-controls="s-mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}><span /><span /></button>
        </div>
      </div>
      <AnimatePresence>{open && <motion.nav id="s-mobile-menu" className="s-mobile-nav" initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} aria-label="Mobile navigation">{NAV.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight /></a>)}{SHOW_LOGIN_LINK && <Link to="/login" onClick={() => setOpen(false)}>Log in<ArrowUpRight /></Link>}<button type="button" onClick={() => { setOpen(false); openModal(); }}>Start a project<ArrowUpRight /></button></motion.nav>}</AnimatePresence>
    </header>
  );
}
