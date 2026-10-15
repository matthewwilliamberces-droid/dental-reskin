# Ultra-Fast Reskinnable Astro Landing Page

A production-grade, zero-framework-hydration landing page built with **Astro 7**, **Tailwind CSS v4**, and **Anime.js v4**, engineered to achieve **90+ Mobile / 95+ Desktop PageSpeed scores** out of the box.

Pre-configured with an **Australian Dental Practice** baseline (*Sydney CBD Dental Studio*), but architected with a **100% decoupled data layer** (`src/config/site.ts`) that allows reskinning to any local service industry (plumbing, legal, medical, trades, fitness) in under 5 minutes.

---

## ⚡ Performance & Quality Invariants

- **0 KB Initial Client JS:** The initial HTML payload renders with zero JavaScript runtime overhead. No React, Vue, or Svelte libraries are loaded.
- **Hardware-Accelerated Hero:** Hero transitions run exclusively via GPU-accelerated CSS keyframes (`transform`, `opacity`), guaranteeing **Total Blocking Time (TBT) = 0ms** and **LCP < 1.2s**.
- **Deferred Anime.js v4:** Anime.js is split into an on-demand, dynamically imported module (`modules.*.js`) invoked only when users interact with the Before/After slider or open the booking modal.
- **Native Semantic Controls:** Accessible mobile navigation (`<details>`), FAQ accordion (`<details>`), and multi-step booking modal (`<dialog>`).
- **Anti-AI-Slop Craft:** Realistic Australian healthcare copy (AHPRA, HICAPS on-the-spot claiming, Medicare CDBS), tactile dual-perimeter borders, micro-metadata tags, and snappy 200–250ms spring kinetics. Zero generic purple gradients and zero emojis.
- **Structured Data:** Built-in Schema.org `Dentist` and `LocalBusiness` JSON-LD with opening hours, geo-address, and aggregated reviews.

---

## 🛠 Tech Stack

- **Framework:** [Astro v7](https://astro.build/) (`output: 'static'`)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` (CSS-first configuration with OKLCH theme variables)
- **Animation:** [Anime.js v4](https://animejs.com/) (modular dynamic import)
- **Typography:** `Outfit` (Headings) and `Inter` (Body) via non-blocking asynchronous Google Fonts
- **Language:** TypeScript (Strict mode)

---

## 🚀 Quick Start

### Prerequisites
- Node.js `>= 22.12.0`
- On Windows PowerShell, execute commands using `npm.cmd` to bypass script execution policy restrictions.

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/matthewwilliamberces-droid/dental-reskin.git
cd dental-reskin

# Install dependencies
npm.cmd install

# Start development server
npm.cmd run dev
```

Visit `http://localhost:4321/` in your browser.

### Production Build & Preview

```bash
# Compile static HTML/CSS into ./dist/
npm.cmd run build

# Preview production build locally
npm.cmd run preview
```

---

## 🎨 5-Minute Reskinning Guide

Every text string, telephone link, service card, review, color token, and form setting is decoupled into a single configuration file: [`src/config/site.ts`](src/config/site.ts).

To reskin this website for a different client or industry:

### 1. Update Site Configuration (`src/config/site.ts`)
Open `src/config/site.ts` and modify:
- **`brand`**: Business name, tagline, ABN, licence badges.
- **`contact`**: Phone number, formatted display phone, email, full address, opening hours.
- **`theme`**: Primary, light, accent, and dark surface color tokens in OKLCH format:
  ```typescript
  theme: {
    primaryOklch: 'oklch(0.60 0.15 238)',   // Main brand color
    primaryLight: 'oklch(0.95 0.03 232)',   // Tinted card backdrops
    accentOklch: 'oklch(0.78 0.13 200)',    // Subtle glowing highlights
    surfaceDark: 'oklch(0.20 0.04 255)',    // Dark section contrast
  }
  ```
- **`services`**: Array of services with tags (*"Most Requested"*, *"Emergency"*), descriptions, and price hints.
- **`testimonials`**: Verified customer reviews with suburbs and treatment tags.
- **`faqs`**: Questions and answers covering insurance, payment plans, and expectations.
- **`bookingForm`**: Service options, time windows, and submission endpoint.

### 2. Connect Your Lead Intake Endpoint
In `src/config/site.ts`:
```typescript
bookingForm: {
  endpoint: 'YOUR_WEB3FORMS_ACCESS_KEY', // Get a free key at web3forms.com
  submitUrl: 'https://api.web3forms.com/submit',
  ...
}
```

### 3. Replace Visual Assets
- **Logo & Favicon:** Replace `public/favicon.svg` and `public/favicon.ico`.
- **Social Sharing Preview:** Update `public/og-image.png` (1200x630px).
- **Comparison Slider:** Replace `public/images/smile-before.svg` and `public/images/smile-after.svg` with genuine before/after photos.

### 4. Build & Verify
```bash
npm.cmd run build
```

---

## 📁 Project Structure

```text
├── src/
│   ├── config/
│   │   └── site.ts             # 100% decoupled data engine & TypeScript schema
│   ├── styles/
│   │   └── global.css          # Tailwind v4 @import, @theme tokens, and GPU keyframes
│   ├── layouts/
│   │   └── BaseLayout.astro    # Global shell, SEO meta, JSON-LD Schema.org, non-blocking fonts
│   ├── components/
│   │   ├── Navbar.astro        # Sticky frosted navigation with emergency banner & CTA
│   │   ├── Hero.astro          # Asymmetric split hero with pure CSS entrance transitions
│   │   ├── TrustBar.astro      # 4-metric social proof bar (ratings, HICAPS, payment plans)
│   │   ├── ServicesGrid.astro  # Asymmetric Bento grid of offerings with hover micro-glow
│   │   ├── BeforeAfterSlider.astro # Interactive drag/touch comparison slider with Anime.js physics
│   │   ├── TechComfort.astro   # Feature breakdown addressing anxiety and modern equipment
│   │   ├── Testimonials.astro  # Grid of verified patient reviews with suburban locality
│   │   ├── Faq.astro           # Semantic <details> accordion with fluid CSS grid animation
│   │   ├── BookingModal.astro  # 3-step interactive booking drawer with botcheck shielding
│   │   └── Footer.astro        # NAP consistency, clinic hours, ABN, and health fund badges
│   └── pages/
│       └── index.astro         # Top-level page composing all components strictly from site.ts
├── public/
│   ├── favicon.svg             # Vector favicon
│   ├── og-image.png            # 1200x630 pre-rendered OpenGraph raster image
│   ├── og-image.svg            # Vector source for OpenGraph card
│   └── images/                 # Slider comparison images
├── plan.md                     # Engineering handoff blueprint
├── report.md                   # Build and architecture verification report
└── astro.config.mjs            # Astro configuration with @tailwindcss/vite
```

---

## 🚢 Deployment

### Cloudflare Pages (Recommended)
1. Link your GitHub repository in the Cloudflare dashboard.
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Node.js version environment variable: `NODE_VERSION=22`

### Vercel
1. Import repository into Vercel.
2. Framework preset: **Astro**.
3. Output directory: `dist`.

---

## 📄 License

MIT License. Free for commercial and personal client use.
