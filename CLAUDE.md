# SCP Youth Soccer — project notes

Static marketing site for SCP Youth Soccer, a real youth soccer club in Kenilworth, NJ. This repo is a from-scratch redesign; the club's current live site is **https://www.scpyouthsoccer.org** — treat it as the source of truth for any factual/policy content (see "Content accuracy" below).

## Stack & local dev

Plain HTML/CSS/JS. No build step, no package manager, no framework. Every page is a standalone `.html` file that links `styles.css` and (depending on the page) `site.js`, `image-slot.js`, `register.js`, or `promo-banner.js`.

Preview locally with any static file server, e.g.:
```
python3 -m http.server 8000
```
then open `http://localhost:8000/index.html`.

## Critical gotcha: no templating

The `<header>`, mobile menu, and `<footer>` markup is **hand-duplicated in every page** — there is no shared include/partial. Any nav or footer change (new page, new link, renamed item) must be applied to **all real site pages** individually. `component-samples.html` is a dev scaffold with no site nav — leave it alone when doing sitewide nav edits.

When adding a link to every page's nav/footer in one pass, a small Python script matching on stable adjacent text (e.g. "insert after the line containing `Reviews</a>`") is safer than a blind global sed, since desktop nav / mobile nav / footer each have slightly different markup (active-state classes, `msublink` vs plain `<a>`).

## Design system (lives in styles.css, not documented separately)

Key CSS custom properties (top of styles.css): `--red` (brand/CTA/warnings), `--gold` (positive accent, tags, highlight borders), `--navy` (body text), `--gray`/`--paper` (light section backgrounds), `--black`/`--ink` (dark sections).

**Background rhythm is a deliberate, sitewide convention:**
- Marketing pages (index.html, tryouts.html, about.html): black hero → white → **black `.why`-class band** (spotlights core philosophy/values content) → white → optional gray → red `.final-cta` → near-black footer.
- Reference/utility pages (travel.html, fields.html, scholarship.html, faq.html, policy pages): skip the black `.why` band, just alternate white/gray `.prose-section` / `.prose-section.alt-bg`, same red CTA + black footer bookend.

Don't add a black `.why` band to a reference page "for consistency" — the split is intentional.

**Callout/box color must match message tone, not just reuse `.callout`:**
- Positive/reassuring/institutional notes → white or gray card with a 3px `var(--gold)` top border (see the coaches.html background-check note, or `.agc-commit` on travel.html). Make these full-width in their section, not `max-width`-capped next to a full-width grid.
- Genuine high-stakes warnings (e.g. "this payment is non-refundable, no exceptions") → the red `.callout` class is appropriate.

**Don't add friction to program pages.** If a policy is fully detailed on its own page (e.g. rec-refund-policy.html) and only linked from the program page (recreation.html), that's intentional — don't add a summarizing callout on the program page itself. The club doesn't want anything that reads as a warning sitting between a parent and the register button.

## Content accuracy (policy pages especially)

Refund policies, the Parent Code of Conduct, Privacy Policy, Uniform Policy, and Tryout Policy must match the live site's actual wording as closely as possible — light rewording for house style is fine, invented explanatory clauses or examples are not.

- When checking content against the live site, request **verbatim** text explicitly (e.g. "100% exact, word-for-word, no paraphrasing") — a normal WebFetch summary can misrepresent or drop clauses.
- Several of the club's legal docs live as PDFs linked from the live site (e.g. `_files/ugd/...pdf` URLs). WebFetch cannot extract text from these (they're font/stream-encoded) — download them (WebFetch saves fetched binaries to a local path) and read that path with the Read tool, which handles PDFs directly.
- The live site sometimes has more than one document covering the same policy (e.g. an older dated PDF plus a newer dedicated page) with conflicting terms. The newer/more specific dedicated page is presumed authoritative, but flag any conflict to the user rather than silently picking one — these have real financial/legal stakes.

## The `<image-slot>` component

`image-slot.js` implements a custom `<image-slot>` element used as an image placeholder throughout the site — users drag/drop an image onto it, and the chosen image persists via `.image-slots.state.json` (fetched client-side on load). Outside that editing runtime the slot is read-only and falls back to a striped placeholder. Don't hand-edit `.image-slots.state.json`.
