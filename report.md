# Build Report: Reskinnable Astro Dental Landing Page

**Project:** `dental` (Sydney CBD Dental Studio baseline)
**Stack:** Astro 7 (static output), Tailwind CSS v4 via `@tailwindcss/vite`, Anime.js v4 (deferred), TypeScript strict
**Status:** Steps 1 to 8 of `plan.md` complete. `npm.cmd run build` passes with no warnings. Lighthouse has not been run.

## 1. What was built

| Step | Deliverable | Notes |
|---|---|---|
| 1 | Dependencies | `@tailwindcss/vite`, `tailwindcss`, `animejs` installed with `npm.cmd`. No React, Vue, Svelte or icon packages. |
| 2 | `astro.config.mjs` | `output: 'static'`, Tailwind Vite plugin. No `tailwind.config.*` file. |
| 3 | `src/config/site.ts` | Typed `SiteConfig` schema plus full Australian dental baseline data. |
| 4 | `src/styles/global.css` | `@import "tailwindcss"`, `@theme` tokens, GPU-only keyframes, reduced-motion fallback. |
| 5 | `src/layouts/BaseLayout.astro` | SEO meta, OpenGraph, `Dentist`/`LocalBusiness` JSON-LD, theme variables injected from config, non-blocking Google Fonts, scroll-reveal observer. |
| 6 | 10 components in `src/components/` | Navbar, Hero, TrustBar, ServicesGrid, BeforeAfterSlider, TechComfort, Testimonials, Faq, BookingModal, Footer. |
| 7 | `src/pages/index.astro` | Composes all components in order. |
| 8 | Build and check | Clean build; page and booking dialog opened in a preview. |

Other files: `public/images/smile-before.svg`, `public/images/smile-after.svg` (vector placeholders) and `public/og-image.svg`.

## 2. Architecture decisions

- **Single source of truth.** All copy, contact details, navigation, services, reviews, FAQs, UI labels and theme colours live in `site.ts`. The `.astro` files only render config values. Reskinning means editing that one file (plus the image assets).
- **Config additions beyond the plan's schema:** `hero`, `sections`, `ui`, `footer`, `bookingForm.submitUrl` and `bookingForm.healthFunds`, added so that no text sits in markup.
- **Theme.** `theme` values from the config are injected as CSS variables, and Tailwind tokens (`primary`, `accent`, `surface-dark`) read from them. A derived `primary-ink` token (primary darkened 38%) is used for text and buttons on light backgrounds for contrast.

## 3. Performance and zero-hydration invariants

- No `client:*` directives and no UI framework. Verified: zero `client:` matches in `dist/index.html`.
- Hero uses CSS animations only (`opacity` and `translate3d`), with no JavaScript needed to render it.
- Anime.js is loaded only through dynamic `import('animejs')` in the slider and booking scripts, with named imports (`animate`, `spring`, `createTimeline`). It ships in a separate chunk (`modules.*.js`, about 117 KB) that is not part of the initial page load.
- The initial page includes two small module scripts (slider about 1.5 KB, booking about 2.7 KB) plus an inline scroll-reveal observer.
- Icons are inline SVG with `stroke-width="1.5"`. No emojis.
- Mobile menu uses native `<details>`. FAQ uses native `<details>` with a CSS grid-row transition. Booking uses native `<dialog>`.
- Reduced-motion is respected in CSS and in the scripts.

## 4. Component notes

- **Navbar:** emergency call bar, sticky frosted header, mobile `<details>` menu, booking CTA.
- **Hero:** asymmetric split layout, AHPRA badge, dual CTAs, rating line, inline SVG smile-contour graphic (no stock photos), floating availability card.
- **ServicesGrid:** bento layout. The first service in the config is the featured card (2x2), the other four are standard cards.
- **BeforeAfterSlider:** pointer drag, keyboard control (arrows, Home, End), `role="slider"` with `aria-valuenow`. A spring easing (`stiffness 240, damping 26, mass 1`) is used for keyboard moves, and a short hint sweep plays on first view.
- **BookingModal:** three-step form (treatment, time, details), hidden `botcheck` honeypot, Web3Forms-style async submit, success state, and a phone-number fallback on failure. Opens and closes with Anime.js animation.
- **Footer:** NAP, ABN, opening hours, health fund list, compliance badges, lazy-loaded map embed, disclaimer.

## 5. Verification performed

- `npm.cmd run build`: succeeded, one static page, no warnings.
- Built CSS checked for theme tokens and keyframes.
- Built HTML checked for script tags and the absence of hydration directives.
- Preview in the in-app browser: hero rendered, booking dialog opened, no horizontal overflow at the preview width. Two bugs found and fixed (missing space in the hero headline; slow dialog fade).

## 6. Not done or not verified

- **Lighthouse and PageSpeed scores** (targets: 90+ mobile, 95+ desktop, TBT 50 ms or less, LCP under 1.5 s, CLS under 0.05) have not been measured.
- **Form submission** is untested. `bookingForm.endpoint` is still the placeholder `YOUR_WEB3FORMS_ACCESS_KEY`.
- **Responsive and accessibility audit** beyond the single preview size has not been done. Contrast was designed for AA but not measured.
- **FAQ open animation** may not animate in every browser because closed `<details>` content is not rendered.
- **Content accuracy.** Prices, ratings, review counts, ABN, phone number, address, CDBS amount and testimonials are placeholder baseline data and must be replaced with real clinic details.
- **Images.** The before/after and OG images are simple vector placeholders. The OG image is an SVG, which many social platforms do not preview, so use a PNG or JPG for production.

## 7. Housekeeping

- `.claude/launch.json` was added for previewing (`astro preview` on port 4321). It can be deleted.
- Windows note: use `npm.cmd` and `npx.cmd` to avoid PowerShell execution-policy errors.

## 8. How to reskin

1. Edit `src/config/site.ts`: `brand`, `contact`, `theme`, `services`, `testimonials`, `faqs`, `hero`, `sections`, `ui`, `footer`, `bookingForm`.
2. Replace the images in `public/images/` and `public/og-image.svg`.
3. Set a real form access key in `bookingForm.endpoint`.
4. Run `npm.cmd run build`.

---

## 9. Redesign update: photo-led, no SVG

This section supersedes the SVG, icon and image details above.

- All inline SVG and SVG files were removed (`favicon.svg`, `og-image.svg`, the before/after SVGs). The built `index.html` contains zero `<svg>` elements.
- Nine Unsplash photos (free Unsplash License) were downloaded, resized and converted to WebP in `public/images/photos/`. `public/og-image.jpg` was generated from the hero photo.
- `site.ts` now has a `Photo` type (`src`, `alt`, `width`, `height`), a top-level `photos` block, and `image` on each service. `iconSvg` was removed from services and benefits.
- Services use photo cards; the featured card is a full-bleed photo with an overlay. The hero is photo-led with `fetchpriority="high"`. The comfort section pairs two photos with numbered benefits. The footer call-to-action sits over a waiting-room photo.
- Former icons became plain CSS or text: hamburger lines, a CSS plus/minus for the FAQ, text glyphs for stars, check marks, close and the slider handle.
- The before/after slider now compares one smile photo with a staining filter applied to the "before" side. It is a simulation, labelled as such on the page. Replace it with real case photos before publishing.
- This reverses plan.md Rule 4 (no stock photos) and the SVG-icon rule in CLAUDE.md, at the user's request.
