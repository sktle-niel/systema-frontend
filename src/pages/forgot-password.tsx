import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AgentShell, AgentCard } from "@/components/agent/agent-shell";
import { Field } from "@/components/project-modal/controls";
import { requestPasswordReset } from "@/lib/auth";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      // The response is deliberately the same whether or not the email
      // matched an account — that's the server's design, not a bug here.
      await requestPasswordReset(email.trim());
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the reset link.");
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <AgentShell>
        <AgentCard
          title="Check your email"
          subtitle="If that email has an account, a reset link is on its way. It's valid for 30 minutes and can only be used once."
        >
          <Link
            to="/login"
            className="btn btn-primary btn-block"
          >
            Back to log in
          </Link>
        </AgentCard>
      </AgentShell>
    );
  }

  return (
    <AgentShell>
      <AgentCard
        title="Forgot your password?"
        subtitle="Enter the email on your account and we'll send you a link to reset it."
      >
        <form onSubmit={submit} className="space-y-4" noValidate>
          <Field
            label="Email"
            type="email"
            inputMode="email"
            value={email}
            onChange={setEmail}
            required
          />
          {error && <p className="text-[13px] text-danger">{error}</p>}
          <button
            type="submit"
            disabled={busy || email.trim() === ""}
            className="btn btn-primary btn-block"
          >
            {busy ? "Sending…" : "Send reset link"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          <Link to="/login" className="font-semibold text-ink hover:underline">
            Back to log in
          </Link>
        </p>
      </AgentCard>
    </AgentShell>
  );
}
