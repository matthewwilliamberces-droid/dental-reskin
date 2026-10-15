# Instructions for Claude Code

When launched in this repository:
1. **Read `plan.md` first**: Execute all 8 steps in sequence without deviating from the architecture.
2. **Execute via Windows `.cmd`**: On this Windows environment, run commands using `npm.cmd` and `npx.cmd` to prevent PowerShell script execution policy errors.
3. **Strict Decoupling**: Do NOT hardcode strings or clinic content in `.astro` files. All content must be consumed strictly from `src/config/site.ts`.
4. **90+ PageSpeed & Zero-Hydration Invariants**:
   - Above-the-fold hero must use pure CSS animations.
   - Anime.js v4 must only be imported dynamically/deferred on interactive components.
   - Zero framework UI hydration (`client:load`, React, Next.js, Vue, Svelte are STRICTLY BANNED).
   - All inline icons must be clean native SVGs. Do NOT install `@phosphor-icons/react` or `@radix-ui/react-icons`.
5. **Skill Precedence & Design Rules**:
   - Adopt ONLY visual taste rules (anti-generic layouts, anti-emoji, `min-h-[100dvh]`, CSS Grid, OKLCH colors).
   - REJECT all React/Next.js/`'use client'`/npm icon instructions. All markup must be pure static `.astro` components.
6. **Token Optimization (Ignore `.agents/skills`)**:
   - Do NOT read, scan, or traverse `.agents/` or `.agents/skills/`. All relevant requirements, schemas, and component blueprints are already fully self-contained in `plan.md`. Reading `.agents/skills/` wastes context tokens and introduces conflicting instructions.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

