---
name: google-lighthouse-playbook
description: >-
  Comprehensive Google Lighthouse & PageSpeed Insights optimization playbook for modern Laravel,
  TALL stack, and Livewire applications. Covers actionable patterns to hit 90+ across Performance,
  Accessibility, SEO, Best Practices, and Agentic Browsing audits.
---

# Google Lighthouse & PageSpeed Optimization Playbook

This playbook provides an battle-tested, repeatable methodology for diagnosing, fixing, and maintaining **90+ scores** across Google Lighthouse and PageSpeed Insights audits on web applications, specifically tailored for Laravel, Tailwind CSS, Alpine.js, and Livewire (TALL Stack).

---

## 1. The Core Audit Triad: Patterns Identified Across Projects

Across both **Viaje Car Rental** (`98886107-30c2-4791-a311-874a9606ee92`) and **TowerBento US**, Lighthouse regressions stem from four universal recurring anti-patterns:

1. **Unscoped External CDNs & Font Bloat:**
   - CDN Tailwind (`cdn.tailwindcss.com`) blocking first paint by 800–1,500ms.
   - Unbounded Material Symbols / Google Fonts stylesheets requesting all font-weight axes (100–700, multiple megabytes).
2. **Accessible Names & Headless Element Blindness:**
   - Visual icon buttons (`<button @click="..."> <svg>...</svg> </button>`) without text, `aria-label`, or title.
   - Headless sliders (`<input type="range">`), custom selects, and radio tiles missing programmatic `<label for="...">` or `aria-label`.
   - Agentic Browsing and screen readers fail to parse interactive targets.
3. **Improper Heading Cascade & Generic ARIA Misuse:**
   - Heading levels jumping (e.g., `<h1>` directly to `<h4>`), skipping `<h2>` or `<h3>`.
   - Applying `aria-disabled="true"` to non-focusable, non-interactive `<span>` elements (prohibited by W3C ARIA specification).
4. **Hero Image Delays (LCP) & Cumulative Layout Shift (CLS):**
   - Missing explicit `width` and `height` attributes causing layout shift when images load.
   - Missing `fetchpriority="high"` on above-the-fold hero images.
   - Below-the-fold images missing `loading="lazy"` and `decoding="async"`.

---

## 2. Category-by-Category Optimization Protocol

### Category A: Performance (Aim: 90+ Mobile, 95+ Desktop)

#### 1. Eliminate Render-Blocking Scripts
- **Rule:** Never use runtime compiler CDNs (`cdn.tailwindcss.com`, unbundled Babel, etc.) in production or staging.
- **Implementation:** Always compile assets via Vite:
  ```blade
  <!-- BAD -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- GOOD -->
  @vite(['resources/css/app.css', 'resources/js/app.js'])
  ```

#### 2. Scope Google Fonts & Material Symbols
- **Rule:** Preconnect early and strictly scope character subsets and font weights.
- **Implementation:**
  ```html
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <!-- Only load weights needed (e.g. 400, 500, 600, 700) -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <!-- Scope Material Symbols to lightweight subset with font-display: swap -->
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..24,300..500,0,0&display=swap" rel="stylesheet"/>
  ```

#### 3. Image Loading Hierarchy (LCP vs. Lazy)
- **Above-The-Fold / Hero Images:**
  - Must specify explicit `width` and `height` (or aspect ratio container).
  - Must include `fetchpriority="high"` and `decoding="async"`.
  - Must **NOT** have `loading="lazy"` (this delays LCP by up to 2 seconds).
  ```html
  <img src="{{ $heroImage }}"
       alt="Clear descriptive subject"
       width="1200"
       height="800"
       fetchpriority="high"
       decoding="async"
       class="w-full h-full object-cover">
  ```
- **Below-The-Fold / Cards / Thumbnails:**
  - Must specify explicit `width` and `height`.
  - Must include `loading="lazy"` and `decoding="async"`.
  ```html
  <img src="{{ $thumbnail }}"
       alt="Descriptive label"
       width="400"
       height="250"
       loading="lazy"
       decoding="async"
       class="w-full h-full object-cover">
  ```

#### 4. Avoid Artificial Micro-Delays in JavaScript
- Do not hide content behind Alpine `setTimeout()` or JavaScript fade-in timers on initial paint; this directly penalizes LCP and First Contentful Paint (FCP).

---

### Category B: Accessibility (Aim: 95–100)

#### 1. Interactive Elements Must Have Discernible Names (Buttons & Links)
- Every `<button>` containing only an icon or SVG **MUST** have an `aria-label` or visually hidden screen reader text:
  ```html
  <!-- BAD: Lighthouse flags 'Buttons do not have an accessible name' -->
  <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2">
      <span class="material-symbols-outlined">menu</span>
  </button>

  <!-- GOOD: Fully accessible -->
  <button @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle navigation menu"
          class="p-2">
      <span class="material-symbols-outlined" aria-hidden="true">menu</span>
  </button>
  ```
- Carousel indicators and slide dots must use dynamic labels:
  ```html
  <button @click="goToSlide(index)"
          :aria-label="'Go to slide ' + (index + 1)"
          class="w-3 h-3 rounded-full">
  </button>
  ```
- Headless icon anchor tags (`<a>`):
  ```html
  <a href="https://example.com"
     aria-label="Visit external resource"
     rel="noopener noreferrer"
     class="p-2">
      <svg aria-hidden="true" ...></svg>
  </a>
  ```

#### 2. Form Inputs & Headless Controls
- Every `<input>`, `<select>`, and `<textarea>` must have an associated `<label>` via `for="id"` or explicit `aria-label`:
  ```html
  <!-- For visually hidden labels -->
  <label for="filter-search" class="sr-only">Search Listings</label>
  <input id="filter-search"
         name="search"
         type="text"
         aria-label="Search Listings"
         placeholder="Search by neighborhood...">

  <!-- Range Sliders -->
  <label for="dp-slider" class="sr-only">Down Payment Percentage</label>
  <input id="dp-slider"
         type="range"
         aria-label="Downpayment Percentage Slider"
         min="10" max="50" step="5">
  ```

#### 3. Strict Heading Cascade (No Skipping)
- Heading levels must strictly descend sequentially without gaps:
  - Document root: `<h1>` (Only one per page)
  - Major sections: `<h2>`
  - Subsections / Cards: `<h3>`
  - Deep components: `<h4>`
- Never jump from `<h1>` to `<h4>` or `<h2>` to `<h4>`.
- In footers or sidebars, avoid arbitrary `<h4>` tags; use styled `<p class="font-bold text-xs uppercase">` or semantic `<h2>` / `<h3>`.

#### 4. W3C ARIA Conformance (Zero ARIA Misuse)
- **Rule:** Do NOT place `aria-disabled="true"` on non-interactive `<span>` or `<div>` tags (common in default pagination templates).
- **Fix in Laravel Pagination:**
  ```blade
  {{-- BAD: W3C ARIA violation --}}
  <span aria-disabled="true" aria-label="Next">...</span>

  {{-- GOOD: Semantic non-clickable representation --}}
  <span class="opacity-50 cursor-not-allowed" title="Next page disabled">
      <svg aria-hidden="true" ...></svg>
  </span>
  ```

#### 5. Color Contrast Ratios (WCAG AA Compliance)
- Minimum contrast ratio for standard text: **4.5:1** against background.
- Minimum contrast ratio for large text (18pt+ or bold 14pt+): **3.0:1**.
- Replace light grays (`text-zinc-400` or `text-zinc-500` on white) with minimum `text-zinc-600` or `text-zinc-700` for body copy and metadata.

---

### Category C: SEO (Aim: 100)

1. **Meta Description:**
   - Must be present on every public route:
     ```html
     <meta name="description" content="Concise, 120-160 character description of page content.">
     ```
2. **Canonical URL:**
   - Prevent duplicate indexation penalties:
     ```html
     <link rel="canonical" href="{{ request()->url() }}" />
     ```
3. **Robots Directives:**
   - Include indexing and preview hints:
     ```html
     <meta name="robots" content="index, follow, max-image-preview:large" />
     ```
4. **Structured Data (JSON-LD):**
   - Provide schema markup appropriate to the model (`Product`, `RealEstateListing`, `LocalBusiness`, `Organization`).

---

### Category D: Best Practices (Aim: 95–100)

1. **External Link Security:**
   - All `target="_blank"` links must include `rel="noopener noreferrer"`.
2. **Modern Image Formats:**
   - Serve WebP or AVIF formats instead of heavy uncompressed PNG/JPEG where possible.
3. **HTTPS & Mixed Content:**
   - Ensure all assets (Leaflet tiles, API endpoints, icons) load over secure `https://`.

---

## 3. Systematic Audit Checklist

Before releasing any frontend change or deployment, execute this checklist:

| Check | Item | Verification Method |
| :---: | :--- | :--- |
| [ ] | **Tailwind CDN check** | Search view files for `cdn.tailwindcss.com`. None must exist. |
| [ ] | **Google Fonts subset** | Verify only needed weights & `display=swap` are requested. |
| [ ] | **Hero image LCP** | Verify `fetchpriority="high"` and explicit dimensions (`width`, `height`). |
| [ ] | **Card images** | Verify explicit dimensions, `loading="lazy"`, `decoding="async"`. |
| [ ] | **Interactive icon buttons** | Grep `<button` and `<a` without text. Confirm all have `aria-label`. |
| [ ] | **Form inputs & selects** | Grep `<input`, `<select`, `<textarea`. Confirm all have `id` + `<label>` or `aria-label`. |
| [ ] | **Heading hierarchy** | Check DOM tree order: `h1` $\rightarrow$ `h2` $\rightarrow$ `h3`. No skipped levels. |
| [ ] | **Pagination ARIA** | Verify pagination template doesn't use `aria-disabled` on non-interactive `<span>`. |
| [ ] | **Meta description** | Confirm `<meta name="description">` exists in document `<head>`. |
| [ ] | **Target blank security** | Confirm all `target="_blank"` have `rel="noopener noreferrer"`. |
