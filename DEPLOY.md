# Deploying the SYSTEMA website to Hostinger

This is a static Vite/React build (`npm run build` → `dist/`) — no Node
server needed at runtime, so it runs on standard **Hostinger shared hosting**
served straight out of `public_html`.

The plan: `codekathax.online` (root domain, non-www canonical) serves this
site; `api.codekathax.online` serves the PHP backend — see the backend
project's own `DEPLOY.md` for that half.

---

## 1. Point `VITE_API_BASE` at the live API

Already set in `.env.production` (not committed — see `.gitignore`):

```ini
VITE_API_BASE=https://api.codekathax.online
```

`npm run build` loads this automatically (Vite build mode = production). No
manual step needed unless the API subdomain ever changes.

## 2. Build

```
npm run build
```

Produces `dist/`. Vite copies everything in `public/` — including
`public/.htaccess` — into `dist/` as-is. **Confirm `dist/.htaccess` exists
after every build** before uploading; if a future Vite upgrade ever stops
copying dotfiles, copy it in manually.

That `.htaccess` handles three things Hostinger's static hosting doesn't do
for you:
- redirects `www` → non-www and `http` → `https`,
- serves `index.html` for any route that isn't a real file (`/track`,
  `/login`, `/agent`, `/admin`, etc. all use React Router client-side
  routing — without this, a hard refresh or a direct link 404s),
- sets baseline security headers and long-lived caching on the hashed
  `assets/*.js` / `*.css` files (with `index.html` itself never cached, so a
  new deploy is picked up immediately).

## 3. Upload `dist/` to `public_html`

hPanel → **File Manager** (or FTP) → `public_html`. Upload the **contents**
of `dist/` (not the `dist` folder itself) so `index.html` lands directly in
`public_html/`.

Re-deploying later: delete the old contents of `public_html` first (or at
least `index.html` and `assets/`) so you don't end up mixing an old build's
JS/CSS with a new `index.html`.

## 4. SSL

hPanel → **Security → SSL** → issue the free Let's Encrypt certificate for
`codekathax.online` (Hostinger does this automatically once the domain
resolves to the hosting account; on a domain bought directly through
Hostinger this is usually already the case). Confirm it covers both
`codekathax.online` and `www.codekathax.online` — the `.htaccess` redirect
needs `www` reachable over HTTPS too, before it can redirect it away.

## 5. Test the live site

- Visit `https://codekathax.online/` → landing page loads.
- Visit `https://www.codekathax.online/` → redirects to the non-www HTTPS URL.
- Open `https://codekathax.online/track`, refresh the page → should load the
  tracker directly, not 404 (confirms the SPA fallback rule is working).
- Submit the "Start a project" form → check the backend's `project_requests`
  table and your inbox.
- Log in at `/login` (admin or an approved agent) → should route to the
  right dashboard.

---

## Known gap: no `/reset-password` page yet

The backend now supports a full password-reset flow
(`POST /password-reset.php?do=request` and `?do=confirm`), but this frontend
has no route or page wired up to call it yet — `App.tsx` doesn't have a
`/reset-password` route, and `login.tsx` has no "forgot password?" link. The
reset email links point at `{SITE_URL}/reset-password?token=...`, so until
this page exists, a password-reset email is a dead end for whoever clicks it.
Worth building next.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Landing page loads but `/track` or `/admin` 404 on refresh | `dist/.htaccess` didn't make it to `public_html` — re-upload it (check for hidden-file upload settings in your FTP client / File Manager). |
| CORS error calling the API | Confirm the API's `.env` has `ALLOWED_ORIGINS=https://codekathax.online` (non-www, matching the canonical redirect). |
| Mixed content / not padlocked | SSL not yet issued, or a hardcoded `http://` URL somewhere — check `VITE_API_BASE` is `https://`. |
| Old JS/CSS after a redeploy | Browser cached the old `index.html`. The `.htaccess` sets `Cache-Control: no-cache` on it, but do a hard refresh once after deploying. |
