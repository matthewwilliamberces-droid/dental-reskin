# Production Engineering Plan: High-Speed Reskinnable Astro Landing Page (Australian Dental Clinic Baseline)

**Target Agent:** Claude Code  
**Goal:** Scaffold an ultra-fast, animation-rich, single-page landing page achieving **>= 90 Mobile / >= 95 Desktop Google Lighthouse / PageSpeed score**, engineered with a 100% decoupled data layer (`src/config/site.ts`) allowing 5-minute reskinning to any industry.

---

## 1. Architectural Guardrails & Hard Invariants

Claude Code MUST enforce the following technical constraints without deviation:

1. **Framework & Engine:**
   - Astro v5/v7 (Static Output mode: `output: 'static'`).
   - Tailwind CSS v4 via `@tailwindcss/vite` inside `astro.config.mjs`.
   - **FORBIDDEN:** Do NOT create `tailwind.config.js` or `tailwind.config.mjs`. All configuration belongs in `src/styles/global.css` using the `@theme` directive.
   - **FORBIDDEN:** Do NOT use legacy `@tailwind base;` directives. Use `@import "tailwindcss";`.

2. **Performance & Animation Invariant (90+ PageSpeed Guarantee):**
   - **Above-The-Fold / Hero:** MUST use hardware-accelerated CSS animations (`transform`, `opacity` only). Zero JavaScript running on initial page load to guarantee **Total Blocking Time (TBT) = 0ms** and **LCP < 1.2s**.
   - **Deferred Anime.js v4:** Anime.js v4 (`npm install animejs@latest`) is ONLY imported dynamically inside `<script>` tags for interactive components (e.g. Before/After slider, multi-step booking drawer, staggered card reveal on scroll via `IntersectionObserver`).
   - **FORBIDDEN:** Do NOT import monolithic Anime.js globally on initial paint. Always use tree-shaken modular imports: `import { animate, createTimeline } from 'animejs';`.
   - **FORBIDDEN:** Do NOT use framework UI packages (no React, Vue, Svelte, or `client:load` directives). Mobile menus, modals, and drawers must use native `<dialog>`, `<details>`, or lightweight vanilla JS.
   - **Icons:** Inline SVG icons only. BANNED: `lucide-react`, `@heroicons/react`, or external font icons like Material Symbols CDN.

3. **100% Decoupled Reskinning Engine:**
   - **Rule:** ZERO hardcoded copy, phone numbers, emails, addresses, prices, services, or reviews in Astro markup.
   - **Single Source of Truth:** `src/config/site.ts` drives 100% of the site's content, navigation, meta tags, and color theme tokens.

4. **Australian Localisation Standards:**
   - Australian spelling: *Specialised, Centred, Personalised, Orthodontics, Practitioners, Labour*.
   - Australian Phone: `(02) 9XXX XXXX` or `1300 XXX XXX` with `tel:` link.
   - Australian Address format: e.g., *Level 3, 140 Elizabeth Street, Sydney NSW 2000*.
   - Healthcare Badges: *HICAPS Instant Health Fund Claims*, *Medicare Child Dental Benefits Schedule (CDBS)*, *AHPRA Registered Dental Practitioners*.

---

## 2. Directory & File Structure Contract

Claude Code must generate the project following this exact structure:

```
dental/
├── astro.config.mjs                   # Configured with @tailwindcss/vite
├── package.json                       # Dependencies: astro, tailwindcss, @tailwindcss/vite, animejs
├── tsconfig.json                      # Strict TypeScript
├── src/
│   ├── config/
│   │   └── site.ts                    # The unified reskinning configuration & TypeScript schema
│   ├── styles/
│   │   └── global.css                 # @import "tailwindcss"; + @theme tokens (OKLCH) + CSS keyframes
│   ├── layouts/
│   │   └── BaseLayout.astro           # Global head, SEO meta, JSON-LD LocalBusiness schema, fonts
│   ├── components/
│   │   ├── Navbar.astro               # Sticky frosted glass nav, emergency badge, booking CTA
│   │   ├── Hero.astro                 # Split layout, CSS entrance animations, trust proof, CTA
│   │   ├── TrustBar.astro             # Clinic stats, HICAPS badge, Google review rating
│   │   ├── ServicesGrid.astro         # Asymmetric Bento grid of treatments with hover glow
│   │   ├── BeforeAfterSlider.astro    # Interactive touch/drag smile transformation slider (Anime.js)
│   │   ├── TechComfort.astro          # Why Choose Us (Painless numbing, 3D scanning, sedation)
│   │   ├── Testimonials.astro         # Verified patient reviews with Australian suburbs
│   │   ├── Faq.astro                  # Native <details> accordion with fluid CSS transitions
│   │   ├── BookingModal.astro         # Multi-step booking drawer/modal (<dialog>) with botcheck
│   │   └── Footer.astro               # NAP consistency, clinic hours, ABN, health fund notes
│   └── pages/
│       └── index.astro                # Composes all components; reads strictly from site.ts
```

---

## 3. Data Architecture: `src/config/site.ts`

Claude Code must create this strongly-typed configuration file:

```typescript
export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  tag: string; // e.g. "Most Popular", "Emergency", "Cosmetic"
  iconSvg: string; // Raw clean inline SVG path/markup
  durationHint?: string;
  priceFrom?: string;
}

export interface Testimonial {
  author: string;
  suburb: string; // Australian location (e.g. "Surry Hills, NSW")
  rating: number; // 5
  treatment: string;
  quote: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  meta: {
    title: string;
    description: string;
    canonicalUrl: string;
    ogImage: string;
  };
  brand: {
    name: string;
    tagline: string;
    niche: string;
    abn: string;
    licenseBadge: string;
    emergencyBannerText: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string; // For display: (02) 9876 5432
    email: string;
    address: {
      line1: string;
      line2: string;
      suburb: string;
      state: string;
      postcode: string;
    };
    googleMapsEmbedUrl?: string;
    hours: Array<{ days: string; time: string }>;
  };
  theme: {
    primaryOklch: string;   // e.g. "oklch(0.65 0.16 230)"
    primaryLight: string;   // e.g. "oklch(0.95 0.04 230)"
    accentOklch: string;    // e.g. "oklch(0.75 0.18 175)" (Cyan/Ice glow)
    surfaceDark: string;    // e.g. "oklch(0.18 0.03 240)"
  };
  navigation: Array<{ label: string; href: string }>;
  trustStats: Array<{ value: string; label: string; subtext: string }>;
  services: ServiceItem[];
  beforeAfter: {
    title: string;
    subtitle: string;
    beforeLabel: string;
    afterLabel: string;
    beforeImage: string;
    afterImage: string;
    treatmentNote: string;
  };
  benefits: Array<{ title: string; desc: string; iconSvg: string }>;
  testimonials: Testimonial[];
  faqs: FaqItem[];
  bookingForm: {
    endpoint: string; // Web3Forms or Formspree access key
    title: string;
    subtitle: string;
    servicesList: string[];
    preferredTimes: string[];
  };
}

export const siteConfig: SiteConfig = {
  // Baseline Dental Clinic configuration pre-filled with authentic Australian data
  // (Sydney CBD Dental Studio, ABN, HICAPS, Medicare CDBS, Invisalign, Veneers, Emergency)
};
```

---

## 4. Anti-AI-Slop Directives & Craft Standards

Claude Code MUST actively counteract typical generative AI design clichés by enforcing these 4 craft rules:

### Rule 1: No B2B SaaS Jargon (Authentic Healthcare Copy)
- **STRICTLY BANNED:** Corporate tech fluff (*"Elevate your oral health ecosystem"*, *"Revolutionary smile synergy"*, *"Next-gen dental transformation"*, *"Empowering your wellness journey"*).
- **MANDATORY CLINICAL REALISM:** Copy must address real patient anxieties, concrete timelines, and insurance realities:
  - Pain mitigation: *"Gentle, zero-pinch computerized numbing & sleep dentistry for anxious patients."*
  - Financial transparency: *"Instant on-the-spot HICAPS claims for Bupa, Medibank, HCF, CBHS + 0% interest payment plans."*
  - Rapid triage: *"Daily dedicated emergency appointments reserved — guaranteed same-day relief."*

### Rule 2: Micro-Styling & Tactile Borders (Kill Cookie-Cutter Cards)
- **STRICTLY BANNED:** Identical `p-6 rounded-xl border border-slate-200 shadow-md` repeated on every single card.
- **MANDATORY TACTILE FINISH:**
  - Layered perimeter depth: Combine 1px hairline borders with micro-rings: `border border-slate-200/80 ring-1 ring-slate-900/[0.04]`.
  - Micro-metadata badges: Use uppercase tracking-widest tags for treatment specs (`text-[10px] font-mono tracking-[0.2em] uppercase text-sky-700 bg-sky-50/80 px-2.5 py-1 rounded-md border border-sky-100`).
  - Asymmetric weight: The primary Bento card (e.g. Cosmetic Smile Architecture) must have greater visual presence (`p-8 md:p-10`, subtle gradient depth `from-white via-sky-50/20 to-slate-50/50`) compared to utility cards (`p-6`).
  - **Zero Emojis:** Never use 🦷, ✨, 💉, 🩺, or ⭐. All icons must be clean, single-tone inline SVG primitives with consistent `stroke-width="1.5"`.

### Rule 3: High-Velocity Kinetics (No Sluggish Bouncy Animations)
- **STRICTLY BANNED:** 800ms–1500ms slow float-in animations or elastic cartoon bounces that delay user scanning and degrade perceived performance.
- **MANDATORY SNAPPY SPRINGS:**
  - Micro-interactions (hover, active, focus): `duration-200` to `duration-250` with high-velocity ease-out `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Interactive drawer/modal physics (Anime.js v4): Damped spring kinetics (`stiffness: 240, damping: 26, mass: 1`) preventing rubber-band oscillations.

### Rule 4: Bespoke Visual Assets (No Stock Photo Dental Slop)
- **STRICTLY BANNED:** Over-bleached, uncanny stock model smiles from Unsplash.
- **MANDATORY CLINICAL GRAPHICS:** Use technical vector blueprints, clean 3D scanning wireframe illustrations, frosted glass treatment cards, or local SVG smile contour line graphics.

---

## 5. Visual Design & CSS Architecture (`src/styles/global.css`)

1. **Aesthetic Direction: Modern Clinical Luxury / Boutique Tech**
   - Palette: Clean surgical white background (`#ffffff`), subtle cool slate secondary cards (`#f8fafc` / `#f1f5f9`), crisp ice-blue/cyan accents, and deep navy/slate typography (`#0f172a`).
   - Anti-Generic Rules: NO centered cliché purple-gradient hero. Use asymmetrical layout, glassmorphic badges (`backdrop-blur-md bg-white/70 border border-slate-200/60`), and subtle inner shadow borders.
   - Typography Stack: Display font: `Outfit` or `Plus Jakarta Sans`, Body: `Inter, system-ui, sans-serif`. Use font-display: `swap` and preconnect Google Fonts.

2. **Tailwind v4 Token Integration:**
   ```css
   @import "tailwindcss";

   @theme {
     --color-primary: var(--brand-primary);
     --color-primary-light: var(--brand-primary-light);
     --color-accent: var(--brand-accent);
     --font-display: 'Outfit', sans-serif;
     --font-body: 'Inter', system-ui, sans-serif;
   }

   :root {
     --brand-primary: #0284c7;
     --brand-primary-light: #e0f2fe;
     --brand-accent: #06b6d4;
   }
   ```

3. **GPU-Accelerated Keyframe Rules:**
   - Define smooth entrance animations (`fade-in-up`, `glow-pulse`, `subtle-float`) utilizing strictly `opacity` and `transform: translate3d()` to prevent layout shifts (CLS = 0).

---

## 6. Component Implementation Blueprint

### Component 1: `Navbar.astro`
- Fixed or sticky top with `backdrop-blur-md bg-white/80 border-b border-slate-100`.
- Top notification bar: Australian emergency callout + Direct Click-to-Call.
- Navigation links pointing to `#services`, `#results`, `#about`, `#reviews`, `#faq`.
- Primary CTA button opening the `#booking-dialog`.

### Component 2: `Hero.astro`
- Split 2-column layout (Left: High-converting headline, AHPRA accreditation badge, dual CTAs ["Book Consultation", "Explore Treatments"], patient satisfaction star rating. Right: Interactive/floating clinical card with live appointment availability indicator).
- Image Optimization: Hero image/visual must have `fetchpriority="high"`, explicit `width` and `height`, and `decoding="async"`. Zero lazy loading on above-the-fold media.

### Component 3: `TrustBar.astro`
- 4-item metric counter (*15,000+ Happy Smiles*, *4.9★ Google Rating*, *HICAPS Instant Claiming*, *0% Interest Payment Plans via Afterpay/Zip*).

### Component 4: `ServicesGrid.astro`
- Asymmetric Bento Grid:
  - 1 Featured large treatment card (e.g. Cosmetic Smile Makeovers / Invisalign).
  - 4 Standard service cards (Preventive Checkup, Dental Implants, Teeth Whitening, Emergency Relief).
- Each card features hover micro-interaction (subtle lift + border color shift via CSS).

### Component 5: `BeforeAfterSlider.astro` (Animation Highlight)
- Interactive before/after split slider allowing horizontal mouse drag or touch sliding.
- Implemented with lightweight vanilla JS / Anime.js v4 dynamic import on `pointerdown` or `IntersectionObserver`.
- Accessible: includes keyboard navigation support (arrow keys control slider percentage) and ARIA attributes (`role="slider"`, `aria-valuenow`).

### Component 6: `TechComfort.astro`
- Addresses patient anxiety: Pain-free sleep dentistry, 3D intraoral digital scanners (no messy impressions), gentle laser hygiene.

### Component 7: `Testimonials.astro`
- Grid of verified patient reviews with Australian suburbs (*Bondi, Paddington, Neutral Bay*), star ratings, and treatment tags.

### Component 8: `Faq.astro`
- Clean semantic `<details>` and `<summary>` elements with animated SVG chevron. Includes questions on Australian private health insurance, HICAPS claiming on the spot, CDBS eligibility, and payment plans.

### Component 9: `BookingModal.astro`
- Implemented using native `<dialog id="booking-dialog">`.
- Step 1: Select Treatment (chips).
- Step 2: Preferred Date/Time window.
- Step 3: Patient Name, Mobile, Email + Health Fund dropdown.
- Anti-spam protection: `<input type="checkbox" name="botcheck" class="hidden" style="display: none;">`.
- Form submits asynchronously or triggers notification with fallback to direct phone call.
- Animated using Anime.js v4 spring physics when the modal opens/closes.

### Component 10: `Footer.astro`
- Consistent NAP (Name, Address, Phone), Australian Business Number (ABN), opening hours (including Saturday emergency appointments), and health fund logos/mentions.

---

## 7. Step-by-Step Execution Sequence for Claude Code

When launched in this workspace, Claude Code should execute in this exact sequence:

1. **Step 1: Install Required Dependencies:**
   ```bash
   npm.cmd install @tailwindcss/vite tailwindcss animejs
   ```
2. **Step 2: Configure Astro Integration (`astro.config.mjs`):**
   - Inject `@tailwindcss/vite` into Vite's plugin array.
3. **Step 3: Create Central Config (`src/config/site.ts`):**
   - Build the comprehensive TypeScript schema and provide complete, authentic Australian dental baseline data.
4. **Step 4: Configure CSS Design System (`src/styles/global.css`):**
   - Setup `@import "tailwindcss";`, `@theme` token mappings, and GPU keyframes.
5. **Step 5: Implement Layout & SEO (`src/layouts/BaseLayout.astro`):**
   - Embed canonical URLs, OpenGraph metadata, and Schema.org `LocalBusiness` / `Dentist` JSON-LD.
6. **Step 6: Scaffold All 10 Components (`src/components/*.astro`):**
   - Ensure all data is pulled strictly from `siteConfig`.
7. **Step 7: Assemble Page (`src/pages/index.astro`):**
   - Compose components sequentially.
8. **Step 8: Build & Verify:**
   ```bash
   npm.cmd run build
   ```
   - Verify zero build warnings, zero unhandled promises, and clean static HTML emission.

---

## 8. Speed Gate & Lighthouse Quality Verification

Claude Code must confirm the build satisfies these performance thresholds:
- **Lighthouse Performance Score:** >= 90 on Mobile, >= 95 on Desktop.
- **Total Blocking Time (TBT):** <= 50ms (Target: 0ms).
- **Largest Contentful Paint (LCP):** < 1.5s.
- **Cumulative Layout Shift (CLS):** < 0.05.
- **Accessibility:** 95–100 (Every button/icon must have `aria-label`, every input must have an associated `<label>`).
