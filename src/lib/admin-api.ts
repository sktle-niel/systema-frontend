// Admin (owner) portal API client with bearer-token auth.

const API_BASE = (import.meta.env.VITE_API_BASE ?? "").replace(/\/+$/, "");
const TOKEN_KEY = "ckx_admin_token";

export function getAdminToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}
export function setAdminToken(t: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, t);
  } catch {
    /* ignore */
  }
}
export function clearAdminToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

export type AdminAgent = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  payout_method: string | null;
  payout_number: string | null;
  ref_token: string;
  status: "pending" | "approved" | "suspended";
  created_at: string;
  approved_at: string | null;
  referrals: number;
};

export type AdminRequest = {
  id: number;
  reference: string;
  path: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string | null;
  project_title: string | null;
  service: string | null;
  system_type: string | null;
  budget: string | null;
  custom_budget: string | null;
  downpayment: string | null;
  description: string;
  deal_amount: number | null;
  deal_status: "lead" | "won" | "lost";
  commission_pct: number;
  created_at: string;
  agent_id: number | null;
  agent_name: string | null;
  agent_commission: number;
  progress: number;
  progress_note: string | null;
  notified: boolean;
  paid: boolean;
  images: { id: number; url: string }[];
};

export type AdminSummary = {
  requests: { total: number; leads: number; won: number; lost: number };
  revenue: { won_total: number; agent_commission: number; owner_net: number };
  agents: { total: number; pending: number; approved: number };
  default_pct: number;
  max_pct: number;
};

export type AdminWork = {
  id: number;
  name: string;
  url: string | null;
  domain: string;
  category: string | null;
  description: string | null;
  image: string;
  featured: boolean;
  enabled: boolean;
  created_at: string;
};

type ApiError = { error?: string; errors?: Record<string, string> };

async function request<T>(
  query: string,
  init: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const headers: Record<string, string> = {
    ...(init.body ? { "Content-Type": "application/json" } : {}),
    ...(init.headers as Record<string, string>),
  };
  if (init.auth) {
    const t = getAdminToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(`${API_BASE}/admin.php${query}`, { ...init, headers });
  const json = (await res.json().catch(() => null)) as (T & ApiError) | null;
  if (!res.ok || !json) {
    const msg =
      json?.error ??
      (json?.errors ? Object.values(json.errors)[0] : undefined) ??
      `Request failed (${res.status})`;
    const err = new Error(msg) as Error & {
      status?: number;
      fields?: Record<string, string>;
    };
    err.status = res.status;
    if (json?.errors) err.fields = json.errors;
    throw err;
  }
  return json as T;
}

// Shared by adminCreateWork/adminUpdateWork — both post multipart form data
// (a file plus text fields) rather than JSON, so they bypass request<T>().
async function requestForm<T extends { ok?: boolean }>(
  query: string,
  fd: FormData
): Promise<T> {
  const headers: Record<string, string> = {};
  const t = getAdminToken();
  if (t) headers.Authorization = `Bearer ${t}`;
  const res = await fetch(`${API_BASE}/admin.php${query}`, {
    method: "POST",
    headers, // no Content-Type: the browser sets the multipart boundary
    body: fd,
  });
  const json = (await res.json().catch(() => null)) as (T & ApiError) | null;
  if (!res.ok || !json?.ok) {
    const msg =
      json?.error ??
      (json?.errors ? Object.values(json.errors)[0] : undefined) ??
      `Request failed (${res.status})`;
    const err = new Error(msg) as Error & { fields?: Record<string, string> };
    if (json?.errors) err.fields = json.errors;
    throw err;
  }
  return json as T;
}

export function adminAgents() {
  return request<{ agents: AdminAgent[] }>("?do=agents", { auth: true });
}

export function adminSetAgentStatus(id: number, status: string) {
  return request<{ ok: true; emailed: boolean }>("?do=agent-status", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ id, status }),
  });
}

export function adminDates(status = "") {
  const q = new URLSearchParams({ do: "dates" });
  if (status) q.set("status", status);
  return request<{ dates: string[] }>(`?${q.toString()}`, { auth: true });
}

export function adminRequests(page = 1, month = "", day = "", status = "") {
  const q = new URLSearchParams({ do: "requests", page: String(page) });
  if (month) q.set("month", month);
  if (day && day !== "all") q.set("day", day);
  if (status) q.set("status", status);
  return request<{
    requests: AdminRequest[];
    default_pct: number;
    max_pct: number;
    page: number;
    pages: number;
    total: number;
    limit: number;
  }>(`?${q.toString()}`, { auth: true });
}

export function adminSetDeal(
  id: number,
  dealAmount: string,
  dealStatus: string,
  commissionPct: number,
  downpayment: string
) {
  return request<{
    ok: true;
    commission: number;
    commission_pct: number;
    downpayment: string | null;
  }>("?do=deal", {
    method: "POST",
    auth: true,
    body: JSON.stringify({
      id,
      deal_amount: dealAmount,
      deal_status: dealStatus,
      commission_pct: commissionPct,
      downpayment,
    }),
  });
}

export function adminSetProgress(id: number, progress: number, note: string) {
  return request<{ ok: true; progress: number }>("?do=progress", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ id, progress, note }),
  });
}

export async function adminUploadImage(id: number, file: File) {
  const fd = new FormData();
  fd.append("id", String(id));
  fd.append("image", file);
  const headers: Record<string, string> = {};
  const t = getAdminToken();
  if (t) headers.Authorization = `Bearer ${t}`;
  const res = await fetch(`${API_BASE}/admin.php?do=image-upload`, {
    method: "POST",
    headers, // no Content-Type: the browser sets the multipart boundary
    body: fd,
  });
  const json = (await res.json().catch(() => null)) as
    | { ok?: boolean; image?: { id: number; url: string }; error?: string }
    | null;
  if (!res.ok || !json?.ok || !json.image) {
    throw new Error(json?.error ?? `Upload failed (${res.status})`);
  }
  return json.image;
}

export function adminDeleteImage(imageId: number) {
  return request<{ ok: true }>("?do=image-delete", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ image_id: imageId }),
  });
}

export function adminNotify(id: number) {
  return request<{ ok: true; emailed: boolean }>("?do=notify", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ id }),
  });
}

export function adminComplete(id: number, dealAmount: string, paid: boolean) {
  return request<{ ok: true; emailed: boolean }>("?do=complete", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ id, deal_amount: dealAmount, paid }),
  });
}

export function adminResendReceipt(id: number) {
  return request<{ ok: true; emailed: boolean }>("?do=resend-receipt", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ id }),
  });
}

export function adminSummary() {
  return request<AdminSummary>("?do=summary", { auth: true });
}

export type AdminSettings = {
  agent_limit: number;
  agents: { total: number; pending: number; approved: number };
  commission: { default_pct: number; max_pct: number };
};

export function adminGetSettings() {
  return request<AdminSettings>("?do=settings", { auth: true });
}

export function adminUpdateSettings(agentLimit: number) {
  return request<{ ok: true; agent_limit: number }>("?do=settings", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ agent_limit: agentLimit }),
  });
}

export function adminGetAccount() {
  return request<{ name: string; email: string }>("?do=account", { auth: true });
}

export function adminUpdateAccount(data: {
  name: string;
  email: string;
  current_password: string;
  new_password: string;
}) {
  return request<{ ok: true; name: string; email: string }>("?do=account", {
    method: "POST",
    auth: true,
    body: JSON.stringify(data),
  });
}

/* -------------------------------------------------------------------- works */
export function adminWorks() {
  return request<{ works: AdminWork[] }>("?do=works", { auth: true });
}

function workForm(data: {
  name: string;
  url: string;
  category: string;
  description: string;
  image?: File;
}): FormData {
  const fd = new FormData();
  fd.append("name", data.name);
  fd.append("url", data.url);
  fd.append("category", data.category);
  fd.append("description", data.description);
  if (data.image) fd.append("image", data.image);
  return fd;
}

export function adminCreateWork(data: {
  name: string;
  url: string;
  category: string;
  description: string;
  image: File;
}) {
  return requestForm<{ ok: true; id: number }>("?do=work-create", workForm(data));
}

export function adminUpdateWork(
  id: number,
  data: { name: string; url: string; category: string; description: string; image?: File }
) {
  const fd = workForm(data);
  fd.append("id", String(id));
  return requestForm<{ ok: true }>("?do=work-update", fd);
}

export function adminToggleWork(id: number, enabled: boolean) {
  return request<{ ok: true; enabled: boolean }>("?do=work-toggle", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ id, enabled }),
  });
}

export function adminFeatureWork(id: number, featured: boolean) {
  return request<{ ok: true; featured: boolean }>("?do=work-feature", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ id, featured }),
  });
}

export function adminDeleteWork(id: number) {
  return request<{ ok: true }>("?do=work-delete", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ id }),
  });
}

export async function adminLogout() {
  try {
    await request("?do=logout", { method: "POST", auth: true });
  } catch {
    /* ignore */
  }
  clearAdminToken();
}
