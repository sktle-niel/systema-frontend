import { Reveal } from "@/components/ui/reveal";
import { SlideFolio } from "@/components/ui/slide-folio";
import { PROCESS } from "@/lib/site";
import { useProjectModal } from "@/components/project-modal/use-project-modal";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";

// The reference deck's index cards, each on the owner's step art: 01 is lime
// (dark text), 02-04 are dark (light text). The headline sits under the row,
// the way the deck sets "Market Analysis".
const MATERIAL = ["s-tile-lime", "s-tile-graphite", "s-tile-graphite", "s-tile-graphite"];

export function Process() {
  const { open } = useProjectModal();
  return (
    <section id="process" className="s-slide s-process">
      <SlideFolio label="04 / HOW WE WORK" />
      <div className="s-slide-head"><Reveal><h2>From idea to something real.</h2></Reveal><Reveal as="p" delay={0.06}>A straightforward process that keeps the work visible and the next step clear.</Reveal></div>
      <div className="s-process-steps">{PROCESS.map((step, index) => <Reveal key={step.id} delay={index * 0.05} className={`s-tile ${MATERIAL[index]} s-process-step s-process-step-art`}><span className="s-process-num">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.desc}</p></div><img src={`/art/process-${index + 1}.webp`} alt="" aria-hidden="true" loading="lazy" width={720} height={911} /></Reveal>)}</div>
      <Reveal className="s-process-panel on-graphite" delay={0.05}><div className="s-process-cta"><div><h3>Let's build the right thing.</h3><p>Tell us what you're working on. We can define the scope together.</p></div><div className="s-process-cta-actions"><button type="button" onClick={open} className="btn btn-accent">Start a project <ArrowUpRight /></button><span className="s-pill-tag">READY WHEN YOU ARE</span></div></div><div className="s-process-art" aria-hidden="true"><img className="s-process-mascot" src="/art/mascot-wave.webp" alt="" loading="lazy" width={953} height={960} /></div></Reveal>
    </section>
  );
}
