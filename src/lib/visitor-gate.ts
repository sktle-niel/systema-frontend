// First-visit gate: shown once per device/browser (localStorage-based — we
// don't do IP/device fingerprinting). Once dismissed, by any option, it never
// shows again on this device unless local storage is cleared.

const KEY = "ckx_gate_seen";

export function hasSeenGate(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return true; // storage unavailable — don't block the site over it
  }
}

export function markGateSeen(): void {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
}
