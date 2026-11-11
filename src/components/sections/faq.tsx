import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { SlideFolio } from "@/components/ui/slide-folio";
import { Minus, Plus } from "@/components/ui/deck-icons";

const QUESTIONS = [
  { q: "What kinds of projects does SYSTEMA take on?", a: "We build business websites, web systems, desktop applications, mobile apps, and focused landing pages. The first conversation helps us decide what fits your needs." },
  { q: "How does a project begin?", a: "Start with a short brief about your goals, users, and timeline. We then discuss the scope and propose a practical direction before development begins." },
  { q: "Can I track progress after we start?", a: "Yes. Active clients can use their project reference in the tracker to follow updates." },
  { q: "Can you improve an existing website or system?", a: "Yes. Share what you have and what needs to work better. We can review whether a focused revision or a larger rebuild makes sense." },
  { q: "What do you need for a quote?", a: "A description of the problem, the main features you need, any existing materials, and your preferred timeline are enough to begin." },
];

// The headline sits beside the dunes column, above the answers.
export function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return <section id="faq" className="s-slide s-faq"><SlideFolio label="05 / COMMON QUESTIONS" /><div className="s-faq-grid"><div className="s-faq-art" aria-hidden="true"><img className="s-faq-art-img" src="/art/builder-robot.webp" alt="" loading="lazy" width={1200} height={800} /><span className="s-faq-art-label">SYSTEMA / ALWAYS IN PROGRESS</span><img className="s-faq-mark" src="/brand/systema-mark-dark.webp" alt="" /></div><div className="s-faq-main"><div className="s-faq-head"><Reveal><h2>A few things worth knowing.</h2></Reveal><Reveal as="p" delay={0.06}>Simple answers before we start a conversation.</Reveal></div><div className="s-faq-list">{QUESTIONS.map((item, index) => <div className={`s-faq-item${active === index ? " is-open" : ""}`} key={item.q}><button type="button" aria-expanded={active === index} onClick={() => setActive(active === index ? null : index)}><span>{item.q}</span><span className="s-faq-sign" aria-hidden="true">{active === index ? <Minus /> : <Plus />}</span></button><AnimatePresence initial={false}>{active === index && <motion.div className="s-faq-answer" initial={reduce ? false : { height: 0 }} animate={{ height: "auto" }} exit={reduce ? { height: 0, transition: { duration: 0 } } : { height: 0 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}><p>{item.a}</p></motion.div>}</AnimatePresence></div>)}</div></div></div></section>;
}
