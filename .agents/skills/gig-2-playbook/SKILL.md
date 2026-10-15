---
name: gig-2-playbook
description: >-
  Multi-agent engineering playbook for Fiverr Gig 2 (Ultra-fast Astro + Tailwind CSS websites).
  Orchestrates the entire 3-tier lifecycle (Basic, Standard, Premium) across Antigravity (grill-me planning,
  tier-specific spec.md/CLAUDE.md contracts, speed profiling) and Claude Code (visual design, Tailwind composition,
  full codebase scaffolding).
---

# Gig 2 Playbook: High-Speed Astro & Tailwind Multi-Agent Pipeline (Basic, Standard, Premium)

A production-grade, zero-overhead engineering playbook orchestrating Antigravity and Claude Code to deliver 100/100 Core Web Vitals websites across all three Fiverr tiers with sub-24h to 5-day turnarounds.

---

## 1. The 3-Tier Architecture Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                GIG 2 TIER BLUEPRINTS                                   │
├─────────────────┬───────────────────┬──────────────────────┬───────────────────────────┤
│ Tier            │ Price / Turnaround│ Codebase Scope       │ Data Engine & Features    │
├─────────────────┼───────────────────┼──────────────────────┼───────────────────────────┤
│ 1. Basic        │ $80 (Launch: $45) │ 1-Page High-Impact   │ Single `prospect.ts`      │
│                 │ 24–48 Hours       │ Landing Page         │ In-page anchor navigation │
├─────────────────┼───────────────────┼──────────────────────┼───────────────────────────┤
│ 2. Standard     │ $180 (Launch: $120│ 3–5 Static Pages     │ Multi-page Astro routing  │
│                 │ 3 Days            │ Complete Business Hub│ SEO metadata, JSON-LD,    │
│                 │                   │                      │ @astrojs/sitemap          │
├─────────────────┼───────────────────┼──────────────────────┼───────────────────────────┤
│ 3. Premium      │ $320 (Launch: $220│ Multi-Page Showcase  │ Astro Content Collections │
│                 │ 5 Days            │ Catalog or Blog      │ (Zod), Decap CMS admin,   │
│                 │                   │ (Up to 10-15 items)  │ Pagefind static search    │
└─────────────────┴───────────────────┴──────────────────────┴───────────────────────────┘
```

---

## 2. Stage 1: AGY Planning & Tiered Handoff Contracts

When initiating a Gig 2 build in Antigravity:

### 2.1 The Rapid Grill-Me Interrogation
Resolve these 4 parameters before generating specs:
1. **Tier Identification:** Basic (1-Page), Standard (Multi-Page Business), or Premium (Content/Catalog).
2. **Branding Assets:** Client logo, primary hex colors, typography preference (or system stack).
3. **Form Target:** Web3Forms access key, Formspree ID, or WhatsApp/Cal.com direct routing.
4. **Content Source:** Raw client text, existing legacy website URL to scrape, or industry placeholder copy.

---

### 2.2 Tier-Specific Architectural Specifications

#### Tier 1: Basic ($80) — 1-Page High-Velocity Landing
* **Routing:** `src/pages/index.astro` only.
* **Navigation:** Pure in-page anchors (`#about`, `#services`, `#testimonials`, `#contact`).
* **Data Schema:** Driven by a single file `src/data/prospect.ts`:
  ```typescript
  export interface ProspectConfig {
    businessName: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    primaryColor: string;
    services: Array<{ title: string; description: string; iconSvg: string }>;
    reviews: Array<{ author: string; stars: number; comment: string }>;
  }
  ```

#### Tier 2: Standard ($180) — 3–5 Page Business Hub
* **Routing:** Static file-based routing:
  * `src/pages/index.astro` (Homepage with social proof & value hooks)
  * `src/pages/about.astro` (Company background, mission, leadership/team)
  * `src/pages/services/index.astro` (Grid of offerings with feature bullets)
  * `src/pages/contact.astro` (Bot-shielded contact form, Google Maps embed/link, NAP)
  * `src/pages/privacy.astro` (Standard GDPR/CCPA privacy disclaimer)
* **Shared Architecture:**
  * `src/layouts/BaseLayout.astro` (Global `<head>`, canonical tags, OpenGraph previews, Schema.org JSON-LD).
  * `src/components/Navbar.astro` (Active route detection via `Astro.url.pathname`, pure CSS mobile drawer).
  * `src/components/Footer.astro` (Multi-column links, copyright, NAP).
* **SEO Baseline:**
  * `@astrojs/sitemap` configured in `astro.config.mjs`.
  * Schema.org `LocalBusiness` JSON-LD embedded in `BaseLayout.astro`:
    ```html
    <script type="application/ld+json" set:html={JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": config.businessName,
      "telephone": config.phone,
      "address": { "@type": "PostalAddress", "streetAddress": config.address }
    })} />
    ```

#### Tier 3: Premium ($320) — Content-Driven Catalog / Blog
* **Data Engine: Astro Content Collections with Strict Zod Schemas:**
  ```typescript
  // src/content/config.ts
  import { defineCollection, z } from 'astro:content';

  const items = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      category: z.string(),
      heroImage: z.string().optional(),
      featured: z.boolean().default(false),
      price: z.string().optional(), // For menu/service catalogs
    }),
  });

  export const collections = { items };
  ```
* **Dynamic Routes:**
  * `src/pages/items/index.astro` (List view with category pills)
  * `src/pages/items/[...slug].astro` (Dynamic item pages using `getStaticPaths()`)
* **Decap CMS Integration (Zero-Cost Client Admin):**
  * Place `public/admin/index.html` and `public/admin/config.yml` pre-configured for GitHub repository backend or Netlify Identity, allowing the client to edit Markdown items visually in a browser.

---

### 2.3 Strict Scope Fencing & Exclusion Boundaries

Include these explicit exclusion clauses in `spec.md` to prevent buyer disputes:

| Tier | Included Scope | Strictly Excluded (Requires Upsell) |
| :--- | :--- | :--- |
| **Basic** | 1 Page, up to 6 sections, 1 form, 2 revisions | Additional pages, dynamic blog, CMS login. |
| **Standard** | Up to 5 static pages, 1 form, SEO setup, 2 revisions | Dynamic blog/CMS, shopping cart, customer login. |
| **Premium** | Up to 10 static pages OR 1 collection (up to 15 items), Decap CMS, 3 revisions | E-commerce checkout, user auth, dynamic databases (Upsell to **Gig 1 - Laravel**). |

---

### 2.4 The `CLAUDE.md` Universal Guardrail Contract

Whenever handing off to Claude Code, inject these immutable rules into `CLAUDE.md` in the workspace root:

```markdown
# Mandatory Technical Guardrails for Claude Code

1. STACK LOCK:
   - Framework: Astro v5.
   - CSS: Tailwind CSS v4 via `@tailwindcss/vite`.
   - FORBIDDEN: Do NOT create `tailwind.config.js` or `tailwind.config.mjs`. Use `@import "tailwindcss";` in `src/styles/global.css`.
   - FORBIDDEN: Do NOT use deprecated `@tailwind base;` directives.

2. ZERO HYDRATION (PERFORMANCE INVARIANT):
   - FORBIDDEN: Do NOT use `client:load`, `client:visible`, or install React/Vue/Svelte packages unless explicitly instructed.
   - Mobile menus, accordions, and tabs MUST be implemented using native `<details>`, `<dialog>`, or pure CSS `:checked` states.
   - Icons: Use inline SVG elements only. Do NOT install `lucide-react`, `@heroicons/react`, or any icon npm package.

3. LOCAL ASSET RULE:
   - All images MUST be local files in `src/assets/images/` or `public/images/`.
   - FORBIDDEN: Never pass external Unsplash/placeholder URLs into `<Image />`.
   - Always supply explicit `width`, `height`, and `alt` attributes.

4. FORM SHIELDING:
   - Contact forms targeting Web3Forms or Formspree MUST include:
     `<input type="checkbox" name="botcheck" class="hidden" style="display: none;">`
```

---

## 3. Stage 2: Claude Code Terminal Execution

Run Claude Code in the designated project folder:

```bash
claude "Read spec.md and CLAUDE.md. Scaffold the Astro project and implement all components, pages, and styles strictly within the defined architecture."
```

### Execution Expectations:
* **For Basic:** Generates single `prospect.ts` configuration, modular landing sections, and compiles to pure HTML.
* **For Standard:** Generates shared `BaseLayout.astro`, responsive `Navbar.astro`, 5 separate route files, and SEO metadata.
* **For Premium:** Generates `src/content/config.ts`, Markdown sample files, dynamic `[...slug].astro` routes, and Decap CMS `config.yml`.

---

## 4. Stage 3: AGY Performance Auditing & Speed Gates

Once Claude finishes code generation, AGY takes ownership of the codebase and executes the verification protocol:

### 4.1 Production Build & Bundle Inspection
```bash
npm run build
```
* **Verify Client JS:** Check `dist/_astro/`. Confirm **0 KB of client JavaScript** is emitted (pure static HTML/CSS).
* **Verify Route Integrity:** Confirm every declared page generated a corresponding `dist/<page>/index.html`.

### 4.2 Core Web Vitals & Lighthouse Audit Gate
Run local preview:
```bash
npm run preview
```
* **Mobile Lighthouse Score:** Must be **>= 90** (Target: 95–100).
* **Desktop Lighthouse Score:** Must be **>= 95** (Target: 100).
* **Metrics:**
  * First Contentful Paint (FCP) < 0.8s
  * Largest Contentful Paint (LCP) < 1.5s
  * Cumulative Layout Shift (CLS) < 0.05
  * Total Blocking Time (TBT) = 0ms

### 4.3 Asset Optimization & Polish
* Convert any uncompressed PNG/JPEG files in `src/assets/images/` to WebP/AVIF format.
* Ensure LCP hero image has `fetchpriority="high"`.
* Ensure below-the-fold images have `loading="lazy"` and `decoding="async"`.

---

## 5. Stage 4: Zero-Touch Client Delivery & Handover Runbook

Non-technical buyers cannot run developer commands. Choose one of two standardized handover methods:

### Method A: Edge Cloud Deployment (Recommended)
1. **Host on Cloudflare Pages / Vercel:** Deploy to a production edge instance connected to your GitHub repo.
2. **Custom Domain Delegation:** Send the buyer a 3-step copy-paste DNS instruction:
   * Record Type: `CNAME`
   * Name: `@` or `www`
   * Target: `<project-name>.pages.dev`
3. **Admin Transfer:** If requested, invite the buyer’s email as an Admin in Cloudflare Pages.

### Method B: Code Transfer & ZIP Archive
1. **GitHub Transfer:** Push to a clean private repository and transfer repository ownership to the client's GitHub username.
2. **Compiled ZIP:** Provide `dist.zip` containing pre-rendered static HTML/CSS for buyers using traditional cPanel/Apache/Nginx hosting (they simply upload to `public_html`).

### Decap CMS Handoff (Premium Only)
Provide a 1-page PDF or 60-second video:
* *"Visit `yourdomain.com/admin/`"*
* *"Click 'Login with GitHub'"*
* *"Click 'New Article / New Item', type content, and hit Publish (your site updates automatically in 60 seconds)."*

---

## 6. Operational Shortcuts & Revision Protocols

### The Revision Shortcut Protocol (Bypass Stage 2)
For post-delivery client change requests (copy edits, color tweaks, minor spacing adjustments):
* **Do NOT re-invoke Claude Code.** Passing revisions back through Claude burns API tokens and risks regressing working layouts.
* **AGY Direct Edit:** Use Antigravity tools (`replace_file_content`) to modify the relevant `.astro` files directly, re-run `npm run build`, and verify Lighthouse metrics in place.
