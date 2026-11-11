import type { QuoteData } from "@/lib/quote";
import { getRef } from "@/lib/referral";

// Base URL of the PHP API. Configure via VITE_API_BASE (see .env). When empty,
// requests go to the same origin that serves the site.
const API_BASE = (import.meta.env.VITE_API_BASE ?? "").replace(/\/+$/, "");

export type SubmitResult = {
  ok: true;
  reference: string;
  emailed: boolean;
  clientEmailed: boolean | null;
};

type ApiResponse = {
  ok?: boolean;
  reference?: string;
  emailed?: boolean;
  client_emailed?: boolean;
  error?: string;
  errors?: Record<string, string>;
};

export async function submitQuote(data: QuoteData): Promise<SubmitResult> {
  const res = await fetch(`${API_BASE}/requests.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // `hp` is a honeypot the server checks for spam — always empty for real users.
    // `ref` attributes the submission to the agent whose link the client used.
    body: JSON.stringify({ ...data, hp: "", ref: getRef() }),
  });

  const json = (await res.json().catch(() => null)) as ApiResponse | null;

  if (!res.ok || !json?.ok) {
    const firstError =
      json?.error ??
      (json?.errors ? Object.values(json.errors)[0] : undefined) ??
      `Request failed (${res.status})`;
    throw new Error(firstError);
  }

  return {
    ok: true,
    reference: json.reference ?? "",
    emailed: Boolean(json.emailed),
    clientEmailed: json.client_emailed === undefined ? null : Boolean(json.client_emailed),
  };
}

// --- Quick note (contact section) -------------------------------------------

export type NoteInput = { name: string; email: string; message: string; hp: string };
export type NoteErrors = Partial<Record<"name" | "email" | "message", string>>;
export type NoteResult = { ok: true } | { ok: false; error: string; errors?: NoteErrors };

/**
 * Email a quick note straight to the studio inbox (POST /contact.php).
 * Never throws: a failure comes back as `{ ok: false }` with a message to show,
 * plus per-field messages when the server rejected the input (422).
 */
export async function sendNote(note: NoteInput): Promise<NoteResult> {
  try {
    const res = await fetch(`${API_BASE}/contact.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; errors?: NoteErrors } | null;
    if (res.ok && json?.ok) return { ok: true };
    if (res.status === 422 && json?.errors) {
      return { ok: false, error: Object.values(json.errors)[0] ?? "Please check the form.", errors: json.errors };
    }
    return { ok: false, error: json?.error ?? "We couldn't send your note just now." };
  } catch {
    return { ok: false, error: "We couldn't reach the server. Check your connection and try again." };
  }
}
