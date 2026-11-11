# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary (confirmed):** business owners in the Philippines (SMEs and companies) commissioning a website, a business system, or an application. They arrive to judge whether SYSTEMA can build what they need and then start a project request.
- **Active clients:** people whose project is underway; they follow progress on `/track` with the reference code from their confirmation email.
- **Referral agents:** people who apply on `/apply`, then refer clients through a personal `?ref=` link and earn a commission on won projects (30% stated on the apply page); they work in the agent portal (`/agent`).
- **Studio staff:** the owner/admin runs the admin portal (`/admin`): agents, pending and completed projects, portfolio entries, settings, account.

## Product Purpose

SYSTEMA is an independent digital studio in the Philippines that designs and builds websites, business systems, and applications. The public site exists to turn a visiting business owner into a project request through the four-step "Start a project" form (need, business, budget, contact), and to serve clients and agents after that first contact. Success is a steady flow of well-scoped project requests, plus clients and agents who can do their jobs on the site without help.

## Positioning

Inferred from the site's own copy and functions (not yet confirmed in words): one studio carries a project from first idea to final release ("Good ideas need better systems."), and clients can see the work move through a live project tracker after kickoff.

## Operating Context

- Project request: 4-step modal (service, business details, budget, contact). Budget tiers are in PHP: static website starts at ₱15,000; business website / system ₱20,000 – ₱40,000; custom platform starts at ₱60,000; or the client's own figure. A ₱ / $ switch shows US-dollar estimates at the daily ECB rate. The downpayment is optional, at least ₱1,000. On success the client receives a reference code and a confirmation email.
- Tracker: reference code lookup showing progress %, the latest note, progress photos, and a payment heads-up at 90%+.
- Quick note: the contact form sends name, email and message straight to the studio inbox through the API (`POST /contact.php`, Reply-To the visitor). Nothing is stored. If sending fails, the visitor keeps their text and is offered a ready-made email draft instead.
- Agents: application with payout method (GCash, Maya, Bank, Other), approval by the admin, referral link, deals table with commission per client.
- Admin: agent approval/suspension, lead and won project management (deal amount, commission %, progress updates with photos, client notifications, receipts), portfolio ("Projects") management that feeds the landing page's Selected Work, agent limit, account.
- Backend: PHP API at `VITE_API_BASE`; the frontend is a React/Vite single-page app.

## Capabilities and Constraints

- All copy, labels, data, routes, and behaviors are fixed by the owner: a redesign changes presentation only, never the words or what the site does.
- Light and dark themes are both supported and must stay (toggle persists in `localStorage` under `systema-theme-v2`).
- Landing "Selected Work" comes from the API, with three built-in fallback projects.
- Undecided: none recorded.

## Brand Commitments

- Name set as SYSTEMA (all caps).
- Logo, logomark, and wordmark files in `public/brand/` (black with lime green, plus dark-theme variants) are fixed assets.
- Accent color is the logo's lime green (confirmed 2026-11-11).
- Binding visual reference supplied by the owner (2026-11-11): a business-proposal presentation deck (black and white with one bright accent, rounded tiles, very large grotesk headlines, monochrome 3D renders). The owner chose to translate its yellow accent to the logo lime, and to have the monochrome 3D imagery rendered in code rather than sourced or generated.

## Evidence on Hand

- Portfolio: Four Wheels Zone, Travelwise Palawan, Two Wheels Zone (screenshots in `public/works/`), plus any projects the admin publishes.
- Process (Discover, Design, Build, Deploy), six service lines, and FAQ answers as written on the landing page.
- `src/lib/site.ts` also holds STATS (120+ projects shipped, 60+ capstones built, 99.9% uptime target, 24/7 support window) and a TECH list that the current site does not display; do not surface them without the owner's say-so.
- No testimonials, client logos, case studies, prices, or press exist. Do not invent any.

## Product Principles

1. The owner's words stay exactly as written; design serves them.
2. The next step is always visible: starting a project is never more than one click away.
3. Show real, shipped work before making claims.
4. Clear by design: interfaces people understand from the first interaction (the site's own promise).
5. After kickoff, keep progress visible to the client.

## Accessibility & Inclusion

No product-specific requirement established beyond keeping what exists: reduced-motion support, keyboard access with visible focus, and readable contrast in both themes.
