import { Reveal } from "@/components/ui/reveal";
import { SlideFolio } from "@/components/ui/slide-folio";
import { BarsMark } from "@/components/ui/deck-icons";
import { SERVICES } from "@/lib/site";

// One unequal bento in the reference's grammar, with the headline set inside it:
// the render and the lead service (Business Websites, on lime) own the large cells.
const MATERIAL = ["s-tile-graphite", "s-tile-mist", "s-tile-lime", "s-tile-mist", "s-tile-mist", "s-tile-mist"];

export function Services() {
  return (
    <section id="services" className="s-slide s-services">
      <SlideFolio label="03 / WHAT WE DO" />
      <div className="s-services-grid">
        <div className="s-services-head"><Reveal><h2><span className="s-line">One studio.</span> <span className="s-line">Many ways to build.</span></h2></Reveal><Reveal as="p" delay={0.06}>We match the solution to the work: a clear website, a dependable internal system, or a product people carry with them.</Reveal></div>
        <div className="s-services-art" aria-hidden="true"><img src="/art/s-ribbon.webp" alt="" loading="lazy" width={1672} height={941} /></div>
        {SERVICES.map((service, index) => <Reveal key={service.id} className={`s-tile ${MATERIAL[index % MATERIAL.length]} s-service-item s-service-${index + 1}`}><span className="s-label">{service.id} / {String(SERVICES.length).padStart(2, "0")}</span><div><h3>{service.title}</h3><p>{service.desc}</p></div></Reveal>)}
        <div className="s-tile s-tile-graphite s-services-mark" aria-hidden="true"><BarsMark /></div>
      </div>
    </section>
  );
}
