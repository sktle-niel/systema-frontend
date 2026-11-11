import { Reveal } from "@/components/ui/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { useProjectModal } from "@/components/project-modal/use-project-modal";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";

export function StudioIntro() {
  const { open } = useProjectModal();

  return (
    <section className="studio-intro py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="intro-visual">
            <div className="intro-image-wrap">
              <img src="/works/travelwisepalawan.webp" alt="Travel Wise Palawan website by SYSTEMA" className="h-full w-full object-cover object-top" loading="lazy" />
            </div>
            <div className="intro-visual-label"><span className="size-2 rounded-full bg-brand" /> DIGITAL EXPERIENCES, BUILT WITH PURPOSE</div>
          </div>
        </Reveal>
        <div>
          <Reveal><SectionTag>Meet SYSTEMA</SectionTag></Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display mt-5 text-4xl leading-[1.07] text-ink md:text-6xl">
              Your partner from <span className="hero-highlight">idea to launch.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-[1.8] text-muted">
              Great digital products start with a clear plan. We bring design and development together to create useful, dependable software for real people and real businesses.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 grid grid-cols-3 border-y border-line py-5">
              {["Plan", "Design", "Build"].map((step, index) => <div key={step} className="border-r border-line px-3 last:border-r-0 first:pl-0"><span className="block font-mono text-[11px] text-brand-ink">0{index + 1}</span><span className="mt-1 block font-display text-lg text-ink md:text-xl">{step}</span></div>)}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <button type="button" onClick={open} className="button-deep-green mt-7"><span className="button-arrow"><ArrowUpRight /></span> Let's work together</button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
