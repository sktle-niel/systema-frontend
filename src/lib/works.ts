// Public portfolio list ("Selected Work" on the landing page). Managed from
// the admin dashboard — see adminWorks() etc. in @/lib/admin-api.

const API_BASE = (import.meta.env.VITE_API_BASE ?? "").replace(/\/+$/, "");

export type Work = {
  id: number;
  name: string;
  domain: string;
  url: string | null; // null when the project isn't public
  category: string | null;
  description: string | null;
  image: string;
  featured: boolean;
};

/** Turn a stored "/uploads/x.webp" path into a full URL against the API host. */
export function workImageUrl(path: string): string {
  return /^https?:\/\//.test(path) || path.startsWith("/works/")
    ? path
    : `${API_BASE}${path}`;
}

export async function fetchWorks(): Promise<Work[]> {
  const res = await fetch(`${API_BASE}/works.php`);
  const json = (await res.json().catch(() => null)) as { works?: Work[] } | null;
  return json?.works ?? [];
}
