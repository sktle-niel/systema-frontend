import { cn } from "@/lib/utils";

/** The logo's twin lime parallelogram bars, used as the deck's recurring mark. */
export function BarsMark({ className, tone = "lime" }: { className?: string; tone?: "lime" | "ink" }) {
  return (
    <svg
      viewBox="0 0 47 24"
      aria-hidden="true"
      focusable="false"
      className={cn("bars-mark", tone === "ink" ? "bars-mark-ink" : "bars-mark-lime", className)}
    >
      <polygon points="23,0 47,0 38,9 14,9" />
      <polygon points="9,15 33,15 24,24 0,24" />
    </svg>
  );
}

type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export function ArrowDown({ size = 16, className }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M10 3.5v13M4.5 11 10 16.5 15.5 11" /></svg>;
}

export function ArrowUp({ size = 16, className }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M10 16.5v-13M4.5 9 10 3.5 15.5 9" /></svg>;
}

export function ArrowLeft({ size = 16, className }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M16.5 10h-13M9 4.5 3.5 10 9 15.5" /></svg>;
}

export function ArrowRight({ size = 16, className }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M3.5 10h13M11 4.5l5.5 5.5-5.5 5.5" /></svg>;
}

export function Check({ size = 16, className }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M4 10.5l4 4 8-9" /></svg>;
}

export function Plus({ size = 16, className }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M10 4v12M4 10h12" /></svg>;
}

export function Minus({ size = 16, className }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M4 10h12" /></svg>;
}

/** "Clear by design": a frame with a focus point. */
export function IconFrame({ size = 18, className }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M3 7V4.5A1.5 1.5 0 0 1 4.5 3H7M13 3h2.5A1.5 1.5 0 0 1 17 4.5V7M17 13v2.5a1.5 1.5 0 0 1-1.5 1.5H13M7 17H4.5A1.5 1.5 0 0 1 3 15.5V13" /><circle cx="10" cy="10" r="2.2" /></svg>;
}

/** "Built to last": stacked layers. */
export function IconLayers({ size = 18, className }: IconProps) {
  return <svg {...base(size)} className={className}><path d="M10 2.8 17.2 6.5 10 10.2 2.8 6.5Z" /><path d="m2.8 10 7.2 3.7 7.2-3.7" /><path d="m2.8 13.5 7.2 3.7 7.2-3.7" /></svg>;
}
