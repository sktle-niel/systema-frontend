import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { SlideFolio } from "@/components/ui/slide-folio";

export function Tracker() {
  const navigate = useNavigate();
  const [ref, setRef] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); const value = ref.trim().toUpperCase(); navigate(value ? `/track?ref=${encodeURIComponent(value)}` : "/track"); };
  return <section id="tracker" className="s-slide s-slide-lime s-tracker"><SlideFolio label="CLIENT ACCESS" tone="ink" /><div className="s-tracker-inner"><div><h2>Already working with us?</h2><p>Follow your project's progress with your reference code.</p></div><form onSubmit={submit}><label htmlFor="track-ref">YOUR REFERENCE</label><div className="s-tracker-field"><input id="track-ref" value={ref} onChange={(event) => setRef(event.target.value.toUpperCase())} placeholder="Enter project code" /><button type="submit" aria-label="Track project"><ArrowUpRight /></button></div><Link to="/track">Open project tracker <ArrowUpRight /></Link></form></div></section>;
}
