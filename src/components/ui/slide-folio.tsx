import { BarsMark } from "@/components/ui/deck-icons";

/** A slide's running header: its section label on the left, the bars mark on the right. */
export function SlideFolio({ label, tone = "lime" }: { label: string; tone?: "lime" | "ink" }) {
  return (
    <div className="s-folio">
      <span>{label}</span>
      <BarsMark tone={tone} />
    </div>
  );
}
