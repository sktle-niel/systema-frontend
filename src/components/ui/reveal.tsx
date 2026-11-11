import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** The house curve, ease-out-expo (--ease-out-expo in index.css). */
const EASE = [0.16, 1, 0.3, 1] as const;

const TAGS = { div: motion.div, p: motion.p, li: motion.li, span: motion.span } as const;

/**
 * A quiet entrance as content scrolls into view: it fades in while rising 18px,
 * once, over .7s on the house curve. `delay` staggers neighbours (steps of about
 * .05s). `eager` plays it on mount instead, for content already on screen. `as`
 * renders the element itself (a `p` beside a heading, say) instead of wrapping it.
 * With reduced motion the content is simply there.
 *
 * Never wrap a sticky element: the wrapper would become its containing block.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  eager = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  eager?: boolean;
  as?: keyof typeof TAGS;
}) {
  const reduceMotion = useReducedMotion();
  // One element type for the props below; every entry in TAGS takes the same ones.
  const Tag = TAGS[as] as typeof motion.div;

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const shown = { opacity: 1, y: 0 };
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      {...(eager ? { animate: shown } : { whileInView: shown, viewport: { once: true, amount: 0.2 } })}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
