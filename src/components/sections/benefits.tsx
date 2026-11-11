import { Reveal } from "@/components/ui/reveal";
import { SlideFolio } from "@/components/ui/slide-folio";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { BarsMark, IconFrame, IconLayers } from "@/components/ui/deck-icons";

export function Benefits() {
  return (
    <section id="benefits" className="s-slide s-benefits">
      <SlideFolio label="01 / THE APPROACH" />
      <div className="s-slide-head"><Reveal><h2>Why SYSTEMA?</h2></Reveal><Reveal as="p" delay={0.06}>Good software makes complex work feel simple. We bring design and engineering together so every screen, workflow, and detail has a reason to exist.</Reveal></div>
      <div className="s-benefit-grid">
        <Reveal className="s-tile s-tile-mist s-benefit-feature"><div className="s-benefit-feature-top"><span className="s-tile-icon"><ArrowUpRight /></span><div><h3>Made for the real world.</h3><p>We begin with the problem, then shape the right tool around it.</p></div></div><div className="s-benefit-image"><img src="/works/acrestventures.webp" alt="AC CREST VENTURES web admin and mobile app preview" loading="lazy" width={1584} height={672} /><span>FROM IDEA TO INTERFACE</span></div></Reveal>
        <Reveal className="s-tile s-tile-lime s-benefit-statement" delay={0.08}><span className="s-label">THE SYSTEMA WAY</span><p>Less noise.<br />More <em>useful</em> work.</p><BarsMark className="s-statement-mark" tone="ink" /></Reveal>
        <Reveal className="s-tile s-tile-graphite s-benefit-small"><span className="s-tile-icon"><IconFrame /></span><div><h3>Clear by design.</h3><p>Interfaces and workflows people can understand from the first interaction.</p></div></Reveal>
        <Reveal className="s-tile s-tile-mist s-benefit-small" delay={0.06}><span className="s-tile-icon"><IconLayers /></span><div><h3>Built to last.</h3><p>Practical architecture and careful implementation that support the next version, too.</p></div></Reveal>
      </div>
    </section>
  );
}
