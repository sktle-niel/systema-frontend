import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "@/components/ui/arrow-up-right";
import { Reveal } from "@/components/ui/reveal";
import { SlideFolio } from "@/components/ui/slide-folio";
import { useProjectModal } from "@/components/project-modal/use-project-modal";
import { QUOTE_EMAIL } from "@/lib/quote";
import { sendNote, type NoteErrors, type NoteInput } from "@/lib/api";
import { validateDescription, validateEmail, validateName } from "@/lib/validation";

type NoteState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; firstName: string }
  | { kind: "failed"; message: string; note: NoteInput };

const FIELDS = ["name", "email", "message"] as const;

/** The note as a ready-made email draft: the way out when sending fails. */
function draftHref(note: NoteInput): string {
  const subject = encodeURIComponent(`SYSTEMA inquiry from ${note.name}`);
  const body = encodeURIComponent(`${note.message}\r\n\r\nFrom: ${note.name}\r\nReply to: ${note.email}`);
  return `mailto:${QUOTE_EMAIL}?subject=${subject}&body=${body}`;
}

export function Contact() {
  const { open } = useProjectModal();
  const [state, setState] = useState<NoteState>({ kind: "idle" });
  const [errors, setErrors] = useState<NoteErrors>({});
  const sentHeading = useRef<HTMLHeadingElement>(null);

  // Move focus to the confirmation so screen readers and keyboards land on it.
  useEffect(() => { if (state.kind === "sent") sentHeading.current?.focus(); }, [state.kind]);

  const showErrors = (found: NoteErrors, form: HTMLFormElement) => {
    setErrors(found);
    const first = FIELDS.find((key) => found[key]);
    if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.kind === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const note: NoteInput = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      hp: String(data.get("website") ?? ""),
    };

    // The server applies the same rules; checking here first saves a round trip.
    const found: NoteErrors = {};
    const nameError = validateName(note.name);
    const emailError = validateEmail(note.email);
    const messageError = validateDescription(note.message);
    if (nameError) found.name = nameError;
    if (emailError) found.email = emailError;
    if (messageError) found.message = messageError;
    if (Object.keys(found).length > 0) {
      showErrors(found, form);
      return;
    }

    setErrors({});
    setState({ kind: "sending" });
    const result = await sendNote(note);
    if (result.ok) {
      setState({ kind: "sent", firstName: note.name.split(/\s+/)[0] });
    } else if (result.errors) {
      setState({ kind: "idle" });
      showErrors(result.errors, form);
    } else {
      setState({ kind: "failed", message: result.error, note });
    }
  };

  // Clear a field's message as soon as it is edited.
  const clearError = (event: FormEvent<HTMLFormElement>) => {
    const key = (event.target as HTMLInputElement).name as keyof NoteErrors;
    if (errors[key]) setErrors(({ [key]: _cleared, ...rest }) => rest);
  };

  const fieldProps = (key: keyof NoteErrors) => ({
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `note-${key}-error` : undefined,
  });
  const fieldError = (key: keyof NoteErrors) =>
    errors[key] ? <span id={`note-${key}-error`} className="s-field-error">{errors[key]}</span> : null;

  return <section id="contact" className="s-slide s-slide-graphite s-contact on-graphite"><SlideFolio label="THINK WE'RE A FIT?" /><Reveal className="s-contact-heading"><h2>Let's make it <em>work.</em></h2><p>Tell us what you have in mind. We'll find a clear way forward.</p><button type="button" onClick={open} className="btn btn-accent">Start a project brief <ArrowUpRight /></button></Reveal><Reveal className="s-contact-bottom" delay={0.06}><div className="s-contact-direct"><img className="s-contact-direct-art" src="/art/support-robot.webp" alt="" aria-hidden="true" loading="lazy" width={668} height={760} /><span className="s-label">DIRECT LINE</span><a href={`mailto:${QUOTE_EMAIL}`}>Email the studio <ArrowUpRight /></a></div>
    <form onSubmit={submit} onInput={clearError} className="s-contact-form" noValidate aria-busy={state.kind === "sending"}>
      <span className="s-label">OR SEND A QUICK NOTE</span>
      {state.kind === "sent" ? (
        <div className="s-note-sent" role="status">
          <span className="s-note-sent-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
          <h3 ref={sentHeading} tabIndex={-1}>Thanks, {state.firstName}! Your note is in our inbox.</h3>
          <p>We'll reply to you by email.</p>
          <button type="button" className="s-note-again" onClick={() => setState({ kind: "idle" })}>Send another note</button>
        </div>
      ) : (
        <>
          <div className="s-contact-fields">
            <label>Name<input {...fieldProps("name")} required autoComplete="name" placeholder="Your name" />{fieldError("name")}</label>
            <label>Email<input {...fieldProps("email")} type="email" required autoComplete="email" placeholder="you@example.com" />{fieldError("email")}</label>
          </div>
          <label>Project details<textarea {...fieldProps("message")} required rows={3} placeholder="A few lines about your idea" />{fieldError("message")}</label>
          <input className="s-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="s-contact-send"><span>Sends straight to our inbox.</span><button type="submit" className="btn btn-accent" disabled={state.kind === "sending"}>{state.kind === "sending" ? "Sending…" : <>Send note <ArrowUpRight /></>}</button></div>
          {state.kind === "failed" && <p className="s-note-alert" role="alert">{state.message} You can also <a href={draftHref(state.note)}>email it to us instead</a>.</p>}
        </>
      )}
    </form></Reveal></section>;
}
