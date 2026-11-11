import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { ArrowDown } from "@/components/ui/deck-icons";
import { useProjectModal } from "@/components/project-modal/use-project-modal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { open } = useProjectModal();
  const reduceMotion = useReducedMotion();
  // Slide 01's one authored entrance: the headline lines rise into place and the
  // banner render settles. Content is visible from the first frame; only position moves.
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { y: 36 },
    animate: { y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });
  const settle = {
    initial: reduceMotion ? false : { scale: 1.08 },
    animate: { scale: 1 },
    transition: { duration: 1.6, ease: EASE },
  };

  return (
    <section id="top" className="s-slide s-hero">
      <div className="s-hero-folio">
        <span className="s-folio-item"><span className="s-status-dot" /> INDEPENDENT DIGITAL STUDIO</span>
        <span className="s-folio-item">PHILIPPINES</span>
        <span className="s-folio-item">WEB / APPS / SOFTWARE</span>
        <span className="s-folio-item">01 — 04</span>
      </div>

      <h1 className="s-hero-title"><motion.span {...rise(0.05)}>Good ideas need</motion.span><br /><motion.strong {...rise(0.14)}>better systems<span className="s-period">.</span></motion.strong></h1>

      <div className="s-hero-capabilities">
        <span className="s-label">WHAT WE BUILD</span>
        <div className="s-capability-list"><span>Websites</span><span>Business systems</span><span>Applications</span></div>
      </div>

      <div className="s-hero-banner on-graphite">
        <picture>
          {/* Both files are <source>s and the img has no src: React sets the img's attributes before it is
              inside the <picture>, and WebKit would fetch an early src as well as the matching source. */}
          <source media="(max-width: 720px)" srcSet="/art/hero-mascot-mobile.webp" width={1000} height={1300} />
          <source srcSet="/art/hero-mascot.webp" width={2880} height={800} />
          <motion.img className="s-hero-banner-art" alt="" aria-hidden="true" width={2880} height={800} fetchPriority="high" {...settle} />
        </picture>
        <div className="s-hero-intro">
          <p>Thoughtful digital products, built around the way people actually work. From first idea to final release, SYSTEMA brings structure to every step.</p>
          <button type="button" onClick={open} className="btn btn-accent">Start a project <ArrowUpRight /></button>
        </div>
      </div>
      <a href="#work" className="s-scroll-cue">EXPLORE SELECTED WORK <ArrowDown /></a>
    </section>
  );
}
