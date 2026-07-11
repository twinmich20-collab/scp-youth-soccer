# SCP Youth Soccer

Marketing site for SCP Youth Soccer, a youth soccer club in Kenilworth, NJ (Recreation, Travel, and Futsal programs). This repo is a redesign of the club's current live site, [scpyouthsoccer.org](https://www.scpyouthsoccer.org).

## Running it locally

No build step, no dependencies — it's plain HTML, CSS, and JS. Serve the folder with any static file server and open it in a browser:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html`.

## Structure

- One `.html` file per page, all in the repo root (`index.html`, `travel.html`, `faq.html`, etc.)
- `styles.css` — the entire site's styling; organized into commented sections (header, hero, cards, footer, per-page components) with CSS custom properties for the color palette at the top
- `site.js` — header scroll state, mobile menu toggle
- `image-slot.js` — a custom `<image-slot>` element used as a drag-and-drop image placeholder across the site (see below)
- `register.js` — registration flow data/logic used by register.html
- `promo-banner.js` — the homepage promo banner, injected into any page with a `#promo-banner-mount` element
- `images/` — static image assets
- `component-samples.html` — a dev-only scaffold page for previewing components in isolation; not part of the real site nav

**Note:** there's no shared header/footer include — the nav and footer markup is duplicated by hand in every page. Changing the nav means editing every page.

## Images

Images are managed through the `<image-slot>` custom element (`image-slot.js`): drop an image file onto a slot in the browser and it's saved to `.image-slots.state.json`, which every page reads on load to display the chosen image. This file is fairly large (it stores image data) and shouldn't be hand-edited.

## Content source of truth

Legal/policy pages (refund policies, Parent Code of Conduct, Privacy Policy, Uniform Policy, Tryout Policy) are meant to match the club's live site at [scpyouthsoccer.org](https://www.scpyouthsoccer.org) as closely as possible. If you're updating any of these, check the live site's current wording first.
