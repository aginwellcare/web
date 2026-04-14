# AgingWellCare — Claude Code Instructions

## Project

Home care agency website for AgingWellCare. Greenfield — no code yet, only planning docs.
Target audience: adult children (40-65) researching care for aging parents.
This is a marketing/trust site, not a SaaS app. Every decision should serve that context.

## Principles (adapted from Karpathy)

### Think Before Coding
- Read the file before editing it. Read the test before writing the fix.
- Understand the existing component tree, layout structure, and design tokens before adding anything new.
- When asked to build a page or section, first check what shared components already exist (`@/components/ui/`, `@/components/shared/`) and reuse them.
- If a task is ambiguous, ask one clarifying question rather than guessing and building the wrong thing.

### Simplicity First
- The simplest correct solution wins. A static page with good SEO beats a clever dynamic one.
- Server Components by default. Only add `"use client"` when the component genuinely needs browser APIs, state, or event handlers (Framer Motion animations, form inputs, mobile menu toggle).
- No abstractions until the third use. Three similar hero sections are fine — a premature `<GenericHero>` with 12 props is not.
- No state management libraries. React state + URL params + server-side data cover everything this site needs.
- No API routes unless there's a real backend action (form submissions). Static/SSG pages wherever possible.

### Surgical Changes
- Touch only what the task requires. A bug fix to the header doesn't need a footer refactor.
- One commit per logical change, not one mega-commit per session.
- Don't add comments, docstrings, or type annotations to code you didn't change.
- Don't "improve" adjacent code. Don't rename variables for style. Don't add error handling for impossible cases.
- When editing a component, preserve its existing patterns (naming, spacing, import style) even if you'd do it differently from scratch.

### Goal-Driven Execution
- Every action should trace back to a user request or an explicit plan step.
- Don't add features that weren't asked for. No "while we're here" improvements.
- Don't install packages speculatively. Only add dependencies when a concrete task requires them.
- After completing a task, stop. Don't volunteer follow-up work unless there's a clear issue.

## Stack

| Layer | Choice | Note |
|-------|--------|------|
| Framework | Next.js 15, App Router | `src/` directory, TypeScript strict |
| Styling | Tailwind CSS 4 | Design tokens in `tailwind.config.ts` + CSS custom properties |
| Components | shadcn/ui | Accessible base components, customize via design tokens |
| Animation | Framer Motion | Scroll-triggered reveals, stat counters, staggered cards |
| Forms | React Hook Form + Zod | Contact form, multi-step care assessment |
| Icons | Lucide React | Bundled with shadcn/ui |
| Package manager | pnpm | Always `pnpm`, never npm or yarn |
| Deploy | Vercel | Git-push deploys |

## Architecture (planned)

```
src/
  app/
    layout.tsx              # Root layout: fonts, metadata, Header + Footer
    page.tsx                # Homepage (8 sections)
    about/page.tsx
    services/
      page.tsx              # Overview
      [slug]/page.tsx       # Detail pages (5 services)
    contact/page.tsx
    assessment/page.tsx     # Multi-step care assessment form
    testimonials/page.tsx
    careers/page.tsx
    blog/
      page.tsx              # Listing
      [slug]/page.tsx       # Detail (MDX or static)
    faq/page.tsx
    locations/page.tsx
    sitemap.ts
    robots.ts
  components/
    ui/                     # shadcn/ui primitives (Button, Card, Sheet, etc.)
    shared/                 # Reusable across pages (Header, Footer, CTABanner, TrustBar)
    sections/               # Homepage sections (Hero, ServicesPreview, Stats, etc.)
    forms/                  # ContactForm, AssessmentForm
  lib/
    utils.ts                # cn() helper, shared utilities
    constants.ts            # Site metadata, nav links, service data
  content/                  # Static content (blog posts, service descriptions)
  design-system/            # MASTER.md from UI/UX Pro Max generation
```

## Design Direction

- **Warm premium** — gold/cream palette, dark teal accents. Not cold corporate blue.
- **Trust-first** — awards, certifications, testimonials above the fold.
- **No AI slop** — no purple gradients, no glassmorphism, no SaaS card grids, no decorative blobs.
- **Intentional motion** — animations reveal hierarchy (staggered cards, scroll counters). No motion for decoration.
- **WCAG AA** — non-negotiable. Elderly care audience includes users with low vision, motor impairments.
- **Mobile-first** — most visitors are adult children researching on phones during breaks.

## ECC — What to Use

Only these ECC skills are relevant to this project:

| Skill | When |
|-------|------|
| `frontend-design` | Building or reviewing UI components |
| `frontend-patterns` | React/Next.js patterns and anti-patterns |
| `design-system` | Auditing design token consistency |
| `tdd-workflow` | Writing tests before implementation |
| `e2e-testing` | Playwright tests for critical paths |
| `verification-loop` | End-of-phase verification sweeps |
| `seo` | Metadata, JSON-LD, sitemap, Core Web Vitals |
| `accessibility` | WCAG AA audits, ARIA, keyboard nav |
| `security-review` | Form submissions, input validation |
| `coding-standards` | Code quality baseline |
| `search-first` | Research before building a new pattern |
| `browser-qa` | Visual testing after UI changes |

## ECC — What to Ignore

Everything else. Specifically: all non-TypeScript language skills, database skills,
mobile/native skills, supply chain/DeFi/crypto domain skills, media generation,
agent harness patterns, social distribution, operator workflows, document processing.
If it's not in the table above, don't invoke it.

## Deployment

- **Remote:** `aginwellcare/web` on GitHub
- **Push auth:** Use `$AGINWELLCARE_GH_TOKEN` env var (set in `~/.zshrc`). Never hardcode tokens.
- **Push command:** `git remote set-url origin https://$AGINWELLCARE_GH_TOKEN@github.com/aginwellcare/web.git && git push`

## Code Conventions

- `pnpm` only. No npm, no yarn.
- `@/` import alias for all project imports.
- Named exports, not default exports.
- Server Components by default. Mark `"use client"` only when required.
- Keep components under ~150 lines. Extract when a component does two unrelated things, not when it's "big."
- Co-locate tests next to source: `Header.tsx` / `Header.test.tsx`.
- Commit messages: `type: description` (feat, fix, refactor, test, docs, chore).
