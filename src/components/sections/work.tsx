import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionStyle, type MotionValue } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { SlideFolio } from "@/components/ui/slide-folio";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { fetchWorks, workImageUrl, type Work as WorkItem } from "@/lib/works";

const LOCAL_WORKS: WorkItem[] = [
  { id: -1, name: "Four Wheels Zone", domain: "fourwheelszone.com", url: "https://fourwheelszone.com", category: "Business website", description: "An automotive website designed to make services easier to explore.", image: "/works/fourwheelszone.webp", featured: true },
  { id: -2, name: "Travelwise Palawan", domain: "travelwisepalawan.com", url: "https://travelwisepalawan.com", category: "Travel platform", description: "A travel experience built around discovering and planning trips in Palawan.", image: "/works/travelwisepalawan.webp", featured: false },
  { id: -3, name: "Two Wheels Zone", domain: "twowheelszone.com", url: "https://twowheelszone.com", category: "Business website", description: "A focused online presence for a two-wheel community.", image: "/works/twowheelszone.webp", featured: false },
];

export function Work() {
  const [works, setWorks] = useState<WorkItem[]>(LOCAL_WORKS);
  useEffect(() => { fetchWorks().then((items) => { if (items.length > 0) setWorks(items); }).catch(() => {}); }, []);

  const items = works.slice(0, 5);
  const stackRef = useRef<HTMLDivElement>(null);
  // 0 when the stack reaches the top of the screen, 1 when its last card has landed.
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="work" className="s-slide s-slide-graphite s-work on-graphite">
      <SlideFolio label="02 / SELECTED WORK" />
      <div className="s-slide-head s-work-heading"><Reveal><h2>Made to be used.</h2></Reveal><Reveal as="p" delay={0.06}>A selection of sites and products shaped for different people, businesses, and goals.</Reveal></div>
      {/* A stack of project cards: scrolling slides the next project over the previous one,
          leaving its tab showing; scrolling back up brings the previous project back. */}
      <div ref={stackRef} className="s-work-stack" style={{ "--count": items.length } as CSSProperties}>
        {items.map((work, index) => <WorkCard key={work.id} work={work} index={index} count={items.length} progress={scrollYProgress} />)}
      </div>
    </section>
  );
}

function WorkCard({ work, index, count, progress }: { work: WorkItem; index: number; count: number; progress: MotionValue<number> }) {
  // A covered card eases back a little (the deeper, the smaller), the way a stack reads.
  // It drives --stack-scale; the CSS applies it only where the stack is active and motion is allowed.
  const scale = useTransform(progress, [index / count, 1], [1, 1 - (count - 1 - index) * 0.04]);
  const style = { "--i": index, "--stack-scale": scale } as MotionStyle;
  const label = `PROJECT / ${String(index + 1).padStart(2, "0")}`;

  const inner = (
    <>
      {/* The tab stays visible once the next card covers this one. The name repeats the
          heading below, so screen readers skip it. */}
      <div className="s-work-card-tab"><span className="s-label">{label}</span><span className="s-work-card-name" aria-hidden="true">{work.name}</span></div>
      <div className="s-work-card-body">
        <div className="s-work-card-text">
          <h3>{work.name}</h3>
          <p>{work.description}</p>
          <div className="s-work-card-meta">
            <span className="s-work-category">{work.category || "Digital project"}</span>
            {work.url && <span className="s-work-visit">VIEW LIVE SITE <ArrowUpRight /></span>}
          </div>
        </div>
        <div className="s-work-image"><img src={workImageUrl(work.image)} alt={`${work.name} project preview`} loading="lazy" /></div>
      </div>
    </>
  );

  return work.url
    ? <motion.a href={work.url} target="_blank" rel="noopener noreferrer" className="s-work-card" style={style}>{inner}</motion.a>
    : <motion.div className="s-work-card s-work-card-static" style={style}>{inner}</motion.div>;
}
