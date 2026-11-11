import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AgentShell, AgentCard } from "@/components/agent/agent-shell";
import { Field } from "@/components/project-modal/controls";
import { confirmPasswordReset } from "@/lib/auth";

export function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await confirmPasswordReset(token, password);
      setDone(true);
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reset your password.");
    } finally {
      setBusy(false);
    }
  };

  if (!token) {
    return (
      <AgentShell>
        <AgentCard
          title="Invalid reset link"
          subtitle="This link is missing its token. Request a new one from the login page."
        >
          <Link
            to="/forgot-password"
            className="btn btn-primary btn-block"
          >
            Request a new link
          </Link>
        </AgentCard>
      </AgentShell>
    );
  }

  if (done) {
    return (
      <AgentShell>
        <AgentCard
          title="Password updated"
          subtitle="You've been signed out everywhere for safety. Taking you to the login page…"
        >
          <div className="h-2 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-brand" />
          </div>
        </AgentCard>
      </AgentShell>
    );
  }

  return (
    <AgentShell>
      <AgentCard
        title="Choose a new password"
        subtitle="Reset links only work once and expire after 30 minutes."
      >
        <form onSubmit={submit} className="space-y-4" noValidate>
          <Field
            label="New password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
          <Field
            label="Confirm new password"
            type="password"
            value={confirm}
            onChange={setConfirm}
            required
          />
          {error && <p className="text-[13px] text-danger">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="btn btn-primary btn-block"
          >
            {busy ? "Updating…" : "Update password"}
          </button>
        </form>
      </AgentCard>
    </AgentShell>
  );
}
