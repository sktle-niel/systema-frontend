---
name: SYSTEMA
description: An independent digital studio's site, set as its own proposal deck.
colors:
  canvas: "#e6e6e3"
  surface: "#fbfbf9"
  mist: "#ececea"
  ink: "#0e0e0d"
  ink-soft: "#2b2b29"
  muted: "#5d5d59"
  line: "#d8d8d3"
  brand: "#72e800"
  brand-hover: "#8ff53a"
  brand-soft: "#def6c4"
  brand-ink: "#3d6b00"
  on-lime: "#0e0e0d"
  on-lime-text: "#24320f"
  on-lime-label: "#2b3d10"
  graphite: "#0e0e0d"
  graphite-soft: "#1b1b1a"
  graphite-chip: "#232321"
  graphite-line: "#3c3c39"
  on-graphite: "#f3f3f0"
  on-graphite-muted: "#a8a8a3"
  danger: "#a3271f"
  danger-soft: "#fbe6e3"
  warning: "#8a5a00"
  warning-soft: "#f8eccf"
  canvas-dark: "#0b0b0a"
  surface-dark: "#151514"
  mist-dark: "#20201e"
  ink-dark: "#f1f1ee"
  ink-soft-dark: "#d6d6d2"
  muted-dark: "#a3a39e"
  line-dark: "#2f2f2c"
  brand-soft-dark: "#1f2d0d"
  brand-ink-dark: "#8cf21e"
  graphite-dark: "#050505"
  graphite-soft-dark: "#161615"
  graphite-ring-dark: "#262624"
  danger-dark: "#ff8a7d"
  danger-soft-dark: "#3a1714"
  warning-dark: "#f2c45a"
  warning-soft-dark: "#33280e"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.7vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.93
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.2vw, 4.6rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  statement:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3vw, 2.9rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  numeral:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 5.6vw, 5.4rem)"
    fontWeight: 400
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  operate-heading:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(18px, 1.5vw, 22px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(15px, 1.15vw, 17px)"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  button:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.005em"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.04em"
rounded:
  pill: "999px"
  slide: "clamp(22px, 2.1vw, 30px)"
  slide-operate: "28px"
  nav-tile: "24px"
  tile: "clamp(16px, 1.5vw, 22px)"
  card: "1.375rem"
  field: "1.05rem"
  field-dark: "14px"
spacing:
  gutter: "12px"
  gutter-sm: "10px"
  slide-pad: "clamp(20px, 3.1vw, 46px)"
  tile-pad: "clamp(18px, 1.8vw, 26px)"
  tile-pad-sm: "16px"
  folio-gap: "clamp(36px, 5.4vw, 76px)"
  stat-pad: "20px"
  control-height: "44px"
  control-height-sm: "34px"
  header-height: "60px"
  deck-max: "1560px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.2rem"
    height: "{spacing.control-height}"
  button-primary-hover:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-lime}"
  button-accent:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-lime}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.2rem"
    height: "{spacing.control-height}"
  button-accent-hover:
    backgroundColor: "{colors.brand-hover}"
    textColor: "{colors.on-lime}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 1.2rem"
    height: "{spacing.control-height}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "0"
  button-ghost-hover:
    textColor: "{colors.ink}"
  button-sm:
    padding: "0 0.9rem"
    height: "{spacing.control-height-sm}"
  slide:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.slide}"
    padding: "{spacing.slide-pad}"
  slide-graphite:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-graphite}"
    rounded: "{rounded.slide}"
    padding: "{spacing.slide-pad}"
  slide-lime:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-lime}"
    rounded: "{rounded.slide}"
    padding: "{spacing.slide-pad}"
  tile-mist:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "{spacing.tile-pad}"
  tile-lime:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-lime}"
    rounded: "{rounded.tile}"
    padding: "{spacing.tile-pad}"
  tile-graphite:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-graphite}"
    rounded: "{rounded.tile}"
    padding: "{spacing.tile-pad}"
  pill-tag:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "32px"
  header-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 10px 0 22px"
    height: "{spacing.header-height}"
  header-bar-over-graphite:
    backgroundColor: "{colors.graphite-soft}"
    textColor: "{colors.on-graphite}"
  field:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
  field-on-graphite:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.on-graphite}"
    rounded: "{rounded.field-dark}"
    padding: "13px 16px"
  option-card:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px"
  option-card-selected:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-lime}"
  faq-item:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "20px 22px"
  faq-item-open:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-lime}"
  stat-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.stat-pad}"
    height: "132px"
  stat-tile-highlight:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-lime}"
  tag-success:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
  tag-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
  tag-danger:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.danger}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.6rem"
---

# Design System: SYSTEMA

## Overview

**Creative North Star: "The Proposal Deck"**

The site is SYSTEMA's own proposal deck. Each section is a slide: a near-white panel with generous corners, set on a presentation-grey canvas, with a 12px gutter of canvas between slides. Every slide has a folio row along the top (its section label on the left, the logo's twin bars on the right), one big headline, and an unequal grid of tiles. Tiles come in exactly three materials: logo lime with black text, graphite with white text, and mist. One family, Manrope, carries display, text and data. Every action is a pill.

Motion stays quiet and clean. Slide 01 has the one authored entrance; below it, content fades up softly once as it scrolls into view, the Selected Work projects stack as you scroll, and everything else is state feedback such as hover, the accordion, and the header changing colour. The imagery is the owner's own brand art (a glass-and-lime render of the S mark, the SYSTEMA mascot in four poses, and four step illustrations on the process cards) and real screenshots of shipped work. Dark theme keeps the same deck: a near-black canvas, charcoal slides, the same lime.

The Operate surfaces (admin and agent portals, tracker, auth, project modal) take the same palette, type, pill controls and floating chrome at working density. They are single slides on the canvas, and their signature move is the index-card stat tile.

**Key Characteristics:**
- Grey canvas, near-white slides, 12px gutters; slides read as panels in a deck, not page bands.
- Three tile materials only: lime, graphite, mist.
- Manrope 500 at -0.04em for every statement-size line; tight leading (0.93 to 0.98).
- Pill-shaped actions in three tones: ink, lime, outline.
- The twin lime parallelogram bars, from the logo, mark each slide.
- The owner's brand art (the S-mark render, the mascot, the step illustrations) and real work screenshots are the only imagery.

## Colors

A warm-neutral grey scale with one loud colour: the logo's electric lime, used as a surface material rather than as a thin accent.

### Primary
- **Logo Lime** (`brand`): the deck's one colour. It fills tiles, the tracker slide, the accent pill, the open FAQ item, the selected option card, the highlighted stat tile, the bars mark, text selection, the hero period, and the active-nav dot. It is the same value in both themes. Hover on lime pills lightens to **Lime Flash** (`brand-hover`).
- **Lime Ink** (`brand-ink`): lime's legible text form, used for required asterisks, hints, caret colour and success tag text on light surfaces. In dark theme it brightens to `brand-ink-dark`.
- **Lime Wash** (`brand-soft`): the background for success tags and note cards.

### Neutral
- **Presentation Grey** (`canvas`): the page behind the slides, the 12px gutters, and the portal background.
- **Slide White** (`surface`): slides, the floating header bar, portal stat tiles, tables, the modal, and the icon chips inside mist tiles.
- **Mist** (`mist`): the quiet tile material, text fields, segmented controls, unselected option cards, FAQ items, and nav hover.
- **Deck Ink** (`ink`): body text and the primary pill. **Muted** (`muted`) is used for secondary copy, labels and folios. **Line** (`line`) is for outline pills, pill tags and the footer rule.
- **Graphite** (`graphite`, `graphite-soft`): the dark tile and slide material (Work and Contact slides, hero banner, process panel). Text on it is `on-graphite`, secondary text is `on-graphite-muted`, icon chips are `graphite-chip`, and borders are `graphite-line`.
- **Status** (`danger`, `warning` and their `-soft` washes): portal badges and field errors only.

### Named Rules
**The Black-On-Lime Rule.** Text on lime is always `on-lime` (#0e0e0d), body copy is `on-lime-text`, and labels are `on-lime-label`, in both themes. Lime never takes theme-dependent ink and never carries white text.

**The Three Materials Rule.** A tile is lime, graphite or mist. There is no fourth fill, no gradient tile, and no tinted variant. Status washes are for tags, not tiles.

**The Same Lime Rule.** Dark theme changes the neutrals and `brand-ink`. `brand` stays #72e800.

## Typography

**Display Font:** Manrope (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Manrope
**Label/Mono Font:** Manrope (the `--font-serif` and `--font-mono` tokens both resolve to Manrope on purpose)

**Character:** One self-hosted variable grotesque (weights 200 to 800) does everything. Big lines are medium weight, tracked tight and set close. Small text is plain and open.

### Hierarchy
- **Display** (500, clamp(2.6rem, 6.7vw, 6rem), 0.93): the hero headline on slide 01 only. The second line is weight 600, and the full stop is lime.
- **Headline** (500, clamp(2.4rem, 5.2vw, 4.6rem), 0.95): one per slide. Some slides scale it locally (process up to 5.6rem, contact up to 6rem at 0.92, tracker up to 4.2rem).
- **Statement** (500, clamp(1.9rem, 3vw, 2.9rem), 0.98): headline text set inside a tile, such as project names, the lead service, the lime statement tile, and the process CTA (up to 4rem).
- **Numeral** (400, clamp(3rem, 5.6vw, 5.4rem), 0.82): index-card step numbers. Operate stat values use Manrope 500 at 32 to 36px, line-height 1, with tabular figures.
- **Operate heading** (500, 34px rising to 44px at md, 1.02, from `.font-display`): portal and modal page titles. The tracker title runs to 72px.
- **Title** (600, clamp(18px, 1.5vw, 22px), 1.2, -0.02em): tile headings.
- **Body** (400, 16px, 1.6): default text. **Lead** (clamp(15px, 1.15vw, 17px), 1.6, muted, max 32 to 34rem) is used for slide intros. **Body-sm** (14px, 1.55, max 30rem) is used inside tiles.
- **Label** (600, 11px, 0.04em, uppercase): folios, index numbers ("01 / 06", "PROJECT / 01"), field and list captions.

### Named Rules
**The Minus-Four Rule.** Every line at statement size or larger is weight 500 with -0.04em tracking and leading of 0.98 or less.

**The One-Family Rule.** Manrope only. Never add a serif, mono or system display face, even for data. Use tabular figures for numbers instead.

## Layout

The page is a vertical deck: `.s-page` pads the canvas by the gutter (12px, 10px at 560px and below), and `.s-deck` stacks slides in a grid with a gutter gap and a 1560px max width. Slides pad by clamp(20px, 3.1vw, 46px). Tiles pad by clamp(18px, 1.8vw, 26px), or 16px at 560px and below. Tiles inside a slide are separated by the same gutter, so canvas spacing and in-slide spacing stay the same.

Each slide opens with the folio row, then clamp(36px, 5.4vw, 76px) of air, then a two-column head (headline 1.3fr, lead 1fr, bottom-aligned), then its bento. Bentos are unequal on purpose: a 1.25/1/1 grid with a spanning feature tile, a 1.6/1 alternating work row, a three-column services grid with spanning cells, and four equal index cards. The footer sits on the canvas below the deck, not in a slide.

Breakpoints: at 1100px the hero stacks and the bentos drop to two columns. At 900px the header collapses to a menu button, slide heads stack, and work rows, panels and FAQ go to one column. At 720px the hero banner stacks (phone crop on top, copy below, `clamp(440px, 92vw, 660px)` tall, bottom-up scrim). At 560px everything is a single column, the gutter is 10px, and the FAQ art tile turns square. Portals use Tailwind's md (768px) and lg (1024px): a 6xl or 5xl container, and a 2- to 3-column stat grid with a 16px gap.

## Elevation & Depth

The deck is flat. Depth comes from material contrast (white slide on grey canvas, lime and graphite tiles on white), not from shadows. Shadows are only used on chrome that floats over the deck: the header bar, the portal nav tile, the mobile menu and the modal. All of them are soft, negative-spread drop shadows. In dark theme, graphite slides and tiles get a 1px inset ring (`graphite-ring-dark`) so they stay separate from the near-black canvas.

### Shadow Vocabulary
- **Floating bar** (`box-shadow: 0 14px 34px -22px rgb(0 0 0 / .45), 0 1px 2px rgb(0 0 0 / .04)`): the landing header and the portal and agent top bars.
- **Floating bar over graphite** (`box-shadow: 0 14px 34px -16px rgb(0 0 0 / .6), inset 0 0 0 1px #2c2c2a`): the header while it sits over the Work slide.
- **Nav tile** (`box-shadow: 0 18px 40px -18px rgb(0 0 0 / .28), 0 2px 6px rgb(0 0 0 / .05)`): the portal navigation tile.
- **Sheet** (`box-shadow: 0 30px 60px -24px rgb(0 0 0 / .5)` for the mobile menu; `0 40px 80px -30px rgb(0 0 0 / .55)` for the project modal).
- **Dark ring** (`box-shadow: inset 0 0 0 1px #262624`): graphite surfaces in dark theme.

### Named Rules
**The Flat Deck Rule.** Slides and tiles never cast shadows. Only floating chrome lifts, and the portal nav is a solid surface, not glass.

## Shapes

Everything is rounded, and the radius shrinks as you move inward: slides at clamp(22px, 2.1vw, 30px) (about 30px at 1440, and a fixed 28px on Operate slides and the modal), the portal nav tile at 24px, tiles at clamp(16px, 1.5vw, 22px), Operate cards at 22px, images inset in a tile at the tile radius minus 6px, and fields at about 17px (14px on graphite). Every action, tag, chip, icon disc, header bar and toggle is a full pill (999px).

**The Bars Mark.** The logo's two lime parallelograms (SVG viewBox 47×24: `23,0 47,0 38,9 14,9` and `9,15 33,15 24,24 0,24`) are the deck's recurring mark. They sit 30px wide at the right end of every folio row and every Operate slide, 46 to 54px in the statement tile (the hero banner has none: its render carries the mark), and up to 84px as a graphite tile of their own in the services bento. Use the lime fill by default. Use the ink fill on lime surfaces.

**Icons.** Stroked SVG on a 20×20 grid, 1.8 stroke, round caps and joins, `currentColor`, usually 14 to 17px. The up-right arrow is the action glyph on every pill.

## Components

### Buttons
Confident pills that change material on hover.
- **Shape:** full pill (999px), 44px min height (34px small), 0 1.2rem padding, 600 14px, with a 0.6rem gap before a 15px trailing icon.
- **Primary:** ink fill with canvas text. On hover it turns lime with ink text.
- **Accent:** lime with ink text. On hover it goes to Lime Flash. This is the "Start a project" button.
- **Outline:** a `line` border on transparent. On hover the border turns ink.
- **Ghost:** no chrome, muted text, ink on hover.
- **States:** on hover the trailing icon moves to translate(2px, -2px) over .25s ease-out-expo. On press the button scales to 0.98. Disabled is 40% opacity with a not-allowed cursor. Focus is the global ring (2px solid, 3px offset): ink in light theme, lime in dark theme and inside `.on-graphite`.

### Chips and Tags
- **Pill tag:** 32px tall, 1px `line` border, label type, muted. On graphite the border is `graphite-line`.
- **Capability chips:** 9px 14px pills with a line border. The first chip is filled lime.
- **Status tags (Operate):** 12px 600 pills in a soft wash with the matching ink: success uses brand-soft/brand-ink, pending uses warning-soft/warning, lost or suspended uses danger-soft/danger.

### Cards / Containers (tiles)
- **Corner Style:** tile radius. Overflow is hidden.
- **Background:** one of the three materials. Mist tiles hold a 36px `surface` icon disc; graphite tiles hold a `graphite-chip` disc with a lime icon.
- **Shadow Strategy:** none (see The Flat Deck Rule).
- **Internal Padding:** tile padding. Content is pushed apart with `justify-content: space-between` so a tile reads top-to-bottom like a slide card.

### Index Card (signature)
The deck's index card: a tall tile in column-reverse so the text sits at the top and a large numeral anchors the bottom (`justify-content: space-between`, 28px gap, min height clamp(260px, 24vw, 340px), 210px on small screens). The four process cards carry the owner's step art full-bleed: 01 lime with dark text, 02 to 04 dark with light text. **In Operate, this is the stat tile:** a `surface` card on the canvas, 22px radius, 20px padding, at least 132px tall, label on top (13px 500 muted), value at the bottom (Manrope 500, 32 to 36px, line-height 1, tabular). Exactly one stat per set, the figure that matters most (net, earnings, pending approvals), turns lime.

### Inputs / Fields
- **Style:** a mist fill with no border, about 17px radius, 12px 16px padding, 15px text, and a 14px 600 ink label above. Placeholders are muted. The caret is `brand-ink`.
- **Focus:** a 2px ink ring. **Error:** a 2px danger ring plus 13px danger text below. A required field gets a `brand-ink` asterisk.
- **On graphite (contact form):** a near-black fill, 1px #343432 border, 14px radius, lime caret. The border turns lime on focus.
- **On lime (tracker):** a white pill field with a 44px ink round submit button and a lime arrow. Focus shows a 2px ink ring around the whole pill.
- **Segmented:** a mist pill track. The active option is an ink pill with canvas text.
- **Option card:** a mist tile, 22px radius, 16px padding, with a 20px round check. When selected it turns lime with an ink check disc.

### Navigation
- **Landing header:** a sticky floating pill bar (60px, 56px at 560px and below) sitting a gutter below the top. It has a three-column grid of logo, centered links and actions. Links are 500 14px muted pills that get a mist fill on hover. Actions are the theme toggle, Log in, and a primary "Let's talk" pill. While the bar is over the Work slide it turns graphite (#1b1b1a) with the lime CTA. Below 900px it collapses to a 40px mist menu button whose two bars cross into an X. The menu is a slide-radius sheet with 20px links and a lime final row.
- **Portal nav:** a solid surface tile (24px radius, nav-tile shadow) in a sticky column at desktop, and a floating bottom pill bar on mobile. The active item is an ink pill with a 6px lime dot. Idle items are muted and get a mist fill on hover.
- **Theme toggle:** a 52×30 pill with a 22px thumb that slides 22px and turns lime in dark theme. Sun and moon icons cross-rotate.

### FAQ Accordion
Mist items at the tile radius. The open item turns lime, and its 32px sign disc turns ink with a lime glyph. The answer opens by height over .38s ease-out-expo. The first item is open on load.

### Imagery
Every raster in `/art/` has a `.json` provenance sidecar. The owner's brand art (supplied 2026-11-11) leads. The hero banner is the owner's "idea to launch" mascot: the SYSTEMA robot with a headset and a chat bubble showing idea, layers and launch (`hero-mascot.webp`, 2880x800, mascot at 72% across on the image's own near-black background, edges feathered so the left stays dark for text); at 720px and below a `<picture>` source swaps in `hero-mascot-mobile.webp` (mascot at the top) and the banner stacks, render above and copy below, growing to `clamp(440px, 92vw, 660px)`. The mascot carries the brand mark (its S logo), so the hero banner has no separate bars mark. The services art tile is the S-ribbon render (`s-ribbon.webp`, cover-cropped). The process CTA panel holds the waving mascot cut-out (`mascot-wave.webp`, `object-fit: contain`): it stands on the panel's bottom edge on wide screens and sits in a 16:9 strip above the headline at 900px and below. The FAQ tile shows the mascot at work among the studio's services (`builder-robot.webp`, soft transparent edges, `object-fit: contain` between the tile label and the logo mark; the tile is 4:5 on desktop, 16:10 at 900px and below, square at 560px and below). None of the owner's art is masked, recoloured or redrawn. The contact slide's "Email the studio" tile shows the support mascot (`support-robot.webp`, a headset and chat-bubble cut-out, top-right at 70% of the tile's height so it never reaches the link). The four How we work cards carry the owner's step images full-bleed (`process-1.webp` to `process-4.webp`: discover, design, build, deploy), bottom-anchored, with a scrim under the heading and another under the numeral; card 01 stays lime with dark text, 02 to 04 are dark with light text. No code-rendered scenes are in use any more (the renderer stays in `.impeccable/art-source/`; replaced images are kept in `.impeccable/art-retired/`). Full-bleed art is always paired with a dark scrim on the side where text sits, and on row banners between 721px and 900px the copy is held to 46% of the width so it never crosses the composition. Real work screenshots are always shown whole, never cropped or zoomed: in the Selected Work stack (one card per project: a tab with the project label and name, then the title, description, category and live-site pill beside the screenshot) they are contained in their frame (spare room shows the frame colour), and the "Made for the real world" card shows the AC CREST VENTURES screenshot (`/works/acrestventures.webp`) at its own proportions.

### Motion
One authored entrance, on slide 01 only: the two headline lines rise 36px (1s, delays .05s and .14s), and the banner render settles from scale 1.08 (1.6s), both on ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)`. Hero content is visible from the first frame and only its position moves. Below the hero, section headings, their intro lines, tiles, the process call-to-action panel and the contact block fade in while rising 18px as they scroll into view (.7s, ease-out-expo, once; neighbours stagger by about .05s), through `Reveal` in `src/components/ui/reveal.tsx`. Never wrap a sticky element in `Reveal`: the wrapper would become its containing block. The Selected Work cards stack on scroll (see Selected Work). Everything else is state feedback at .2 to .5s; the quick-note confirmation fades up 8px over .5s. Theme switches use a view transition or a .4s colour fade. With `prefers-reduced-motion`, the entrance and the scroll fade-ups are skipped (content is simply there), covered work cards don't ease back, smooth scroll is turned off, and component transitions are removed.

## Do's and Don'ts

### Do:
- **Do** set every new section as a slide: surface fill, slide radius, slide padding, a folio row with its label and the 30px bars mark, one headline, then an unequal bento of tiles.
- **Do** pick each tile's material from lime, graphite and mist. Vary them across a bento, and give lime to the single most important cell.
- **Do** use ink #0e0e0d text on lime in both themes. Use `on-lime-text` for paragraphs and `on-lime-label` for labels.
- **Do** make every action a pill: primary ink, accent lime, outline, or ghost. Keep the up-right arrow as the trailing glyph.
- **Do** build Operate dashboards as index-card stat tiles on the canvas, label on top and value at the bottom, with one lime highlight per set.
- **Do** add the `.on-graphite` class to any graphite container that holds focusable controls, so the focus ring turns lime.
- **Do** use only the owner's supplied brand art, the existing code-rendered scenes, or real work screenshots, each with a provenance JSON sidecar, and keep a scrim on the text side.
- **Do** honour `prefers-reduced-motion` for every new transition, as the existing components do.

### Don't:
- **Don't** add motion beyond the set the owner asked for: slide 01's entrance, the soft scroll fade-up (`Reveal`), the Selected Work stack (sticky project cards that slide over each other as you scroll and ease back slightly once covered; no easing back with reduced motion, and a plain list on screens under 640px tall), and state feedback. No parallax, bounce, scale-in or looping animation.
- **Don't** put shadows on slides or tiles. Only floating chrome lifts.
- **Don't** add a second accent colour, a gradient fill, or a fourth tile material.
- **Don't** introduce a serif, mono or system display face. Manrope covers display, text and data.
- **Don't** use stock photography, or any illustration or generated imagery the owner didn't supply. Don't use glyph characters (↗ ↓ + −) as icons; draw them as stroked SVG.
- **Don't** put a small uppercase label above a headline as decoration. Labels are for folios, index numbers and field or list captions.
- **Don't** fall back to a centred hero over a row of equal service cards, or to hairline editorial grids with tracked mono labels.
