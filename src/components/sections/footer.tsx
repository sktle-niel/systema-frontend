import { Link } from "react-router-dom";
import { Wordmark } from "@/components/ui/wordmark";
import { ArrowUp } from "@/components/ui/deck-icons";
import { NAV } from "@/lib/site";

export function Footer() {
  return <footer className="s-footer"><div className="s-footer-main"><div><Wordmark /><p>Thoughtful digital products for the way people work.</p></div><a href="#top" className="btn btn-outline btn-sm">BACK TO TOP <ArrowUp /></a></div><div className="s-footer-bottom"><span>© {new Date().getFullYear()} SYSTEMA</span><nav aria-label="Footer navigation">{NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}<Link to="/track">Track project</Link><Link to="/apply">Apply as Agent</Link></nav><span>PHILIPPINES</span></div></footer>;
}
