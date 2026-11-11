import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AgentShell, AgentCard } from "@/components/agent/agent-shell";
import { Field } from "@/components/project-modal/controls";
import { login, resolveSession } from "@/lib/auth";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  // Already signed in? Skip the form and go straight to the dashboard. The
  // server confirms the token is still live before we redirect.
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    resolveSession().then((role) => {
      if (!active) return;
      if (role) navigate(role === "admin" ? "/admin" : "/agent", { replace: true });
      else setChecking(false);
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const role = await login(email.trim(), password);
      navigate(role === "admin" ? "/admin" : "/agent", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not log in.");
      setBusy(false);
    }
  };

  if (checking) {
    return (
      <AgentShell>
        <AgentCard title="One moment" subtitle="Checking your session…">
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
        title="Log in"
        subtitle="Sign in to your SYSTEMA account. You'll be taken to the right dashboard automatically."
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
          <div>
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              required
            />
            <div className="mt-1.5 text-right">
              <Link
                to="/forgot-password"
                className="text-[13px] font-medium text-muted transition-colors hover:text-ink"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          {error && <p className="text-[13px] text-danger">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="btn btn-primary btn-block"
          >
            {busy ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          Want to refer clients?{" "}
          <Link to="/apply" className="font-semibold text-ink hover:underline">
            Apply as an Agent
          </Link>
        </p>
      </AgentCard>
    </AgentShell>
  );
}
