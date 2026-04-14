# AgingWellCare — Home Care Agency Website Build Guide

> A step-by-step guide to building a premium home care agency website using the **Everything Claude Code (ECC) full development lifecycle** — from planning through deployment — with Next.js, shadcn/ui, Tailwind CSS, and the UI/UX Pro Max design skill.

---

## Table of Contents

1. [ECC Lifecycle Overview](#1-ecc-lifecycle-overview)
2. [Design Vision & Inspiration](#2-design-vision--inspiration)
3. [Tech Stack](#3-tech-stack)
4. [Prerequisites](#4-prerequisites)
5. [Phase 1 — Setup: Environment, Plugins & Scaffolding](#5-phase-1--setup)
6. [Phase 2 — Research: `/search-first`](#6-phase-2--research)
7. [Phase 3 — Plan: `/plan`](#7-phase-3--plan)
8. [Phase 4 — Design System: UI/UX Pro Max + `/frontend-design`](#8-phase-4--design-system)
9. [Phase 5 — TDD: `/tdd` (Red-Green-Refactor)](#9-phase-5--tdd)
10. [Phase 6 — Implement: Build Pages (Guided by Plan)](#10-phase-6--implement)
11. [Phase 7 — Code Review: `/code-review`](#11-phase-7--code-review)
12. [Phase 8 — Verify: `/verify`](#12-phase-8--verify)
13. [Phase 9 — Refactor & Docs: `/refactor-clean` + `/update-docs`](#13-phase-9--refactor--docs)
14. [Phase 10 — Deploy to Vercel & Go Live](#14-phase-10--deploy)
15. [ECC Commands Quick Reference](#15-ecc-commands-quick-reference)
16. [Appendix — Site Architecture & Content Map](#16-appendix)

---

## 1. ECC Lifecycle Overview

Everything Claude Code (ECC) is **not just a collection of skills** — it's a full development lifecycle system with 47 agents, 183 skills, and 40+ automated hooks that fire continuously during development.

### The ECC Development Lifecycle

```
┌──────────────────────────────────────────────────────────────────────┐
│                    ECC DEVELOPMENT LIFECYCLE                        │
│                                                                      │
│  RESEARCH ──► PLAN ──► DESIGN ──► TDD ──► IMPLEMENT ──► REVIEW     │
│  /search-first  /plan   UI/UX     /tdd    (code)      /code-review │
│                        Pro Max                                       │
│                                                                      │
│  ──► VERIFY ──► REFACTOR ──► DOCS ──► DEPLOY                       │
│     /verify   /refactor-clean  /update-docs  vercel --prod          │
│                                                                      │
│  ┌────────────────────────────────────────────────────────┐          │
│  │  HOOKS (fire automatically throughout):                │          │
│  │  • Quality gates after every file edit                 │          │
│  │  • Type checking on save                               │          │
│  │  • Console.log warnings                                │          │
│  │  • Design drift detection (anti-AI-slop)               │          │
│  │  • Secret scanning before commits                      │          │
│  │  • Commit message validation                           │          │
│  │  • Continuous learning & pattern extraction             │          │
│  └────────────────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────────────┘
```

### Key ECC Agents Used in This Project

| Agent | Role | When It Activates |
|-------|------|-------------------|
| `planner` | Decomposes features into phased steps | `/plan` command |
| `architect` | System design, pattern selection | Auto or explicit for design decisions |
| `tdd-guide` | Red-Green-Refactor test cycle | `/tdd` command |
| `code-reviewer` | Severity-tiered code review | `/code-review` command |
| `security-reviewer` | Vulnerability detection | When touching auth, forms, APIs |
| `typescript-reviewer` | TS-specific review | Auto during TypeScript reviews |
| `build-error-resolver` | Fix build/type errors | `/build-fix` when builds break |
| `refactor-cleaner` | Dead code removal | `/refactor-clean` post-feature |
| `doc-updater` | Documentation sync | `/update-docs` after features |

### Key ECC Hooks (Automatic — No Manual Action Needed)

These fire **automatically** during development:

| Hook | When | What It Does |
|------|------|--------------|
| `post:edit:design-quality-check` | After every file edit | Warns about generic/template UI drift |
| `post:edit:console-warn` | After every file edit | Catches leftover console.log |
| `stop:format-typecheck` | After Claude finishes | Batch formats + type-checks all changes |
| `pre:bash:commit-quality` | Before git commit | Lints staged files, validates commit msg, scans secrets |
| `pre:bash:block-no-verify` | Before git commit | Blocks `--no-verify` flag |
| `pre:edit-write:gateguard-fact-force` | Before first edit | Requires reading file before editing |
| `stop:desktop-notify` | After task completes | macOS notification when done |

---

## 2. Design Vision & Inspiration

### Inspiration Sources

| Feature | Adult Care Assistance | Griswold Home Care | TheKey |
|---|---|---|---|
| **Scale** | Regional (Arizona) | National (franchise) | National (corporate) |
| **Hero Headline** | "Be Independent, Without Being Alone" | "Live Assured with In-Home Care" | "Largest, most trusted provider" |
| **Primary Colors** | Blue/Green/Gray | Teal/Blue-green | Gold/Dark Teal |
| **Tone** | Family-owned, trust-heavy | Warm, community-focused | Premium, corporate |
| **Testimonials** | 25+ text reviews | 4 video testimonials | Animated carousel |
| **Unique Angle** | Local ownership, awards | Foundation/philanthropy | Tech-forward, premium |

### Design Principles for AgingWellCare

1. **Warm premium** — Gold/cream palette inspired by TheKey, but friendlier
2. **Trust-first** — Prominent awards, certifications, and testimonials (Adult Care Assistance)
3. **Community warmth** — Griswold's approachable, empathetic tone
4. **No AI slop** — No generic purple gradients, no gratuitous glassmorphism, no SaaS layouts
5. **Intentional motion** — Subtle animations that reveal hierarchy (counters, staggered cards)
6. **Authentic feel** — Placeholders should be replaced with real team/client photography

### Target Audience

Adult children (ages 40-65) making care decisions for aging parents. Secondary: seniors and healthcare professionals making referrals.

---

## 3. Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | SEO-critical pages, server components, image optimization |
| **Styling** | Tailwind CSS 4 | Utility-first, design token friendly |
| **UI Components** | shadcn/ui | Accessible, unstyled base components |
| **Animation** | Framer Motion | Scroll-triggered reveals, counters, transitions |
| **Icons** | Lucide React | Clean icon set (bundled with shadcn/ui) |
| **Forms** | React Hook Form + Zod | Type-safe validation for contact/assessment forms |
| **Analytics** | Vercel Analytics | Privacy-friendly, zero-config |
| **Deployment** | Vercel | Git-push deploys, edge network, preview URLs |
| **AI Lifecycle** | ECC + UI/UX Pro Max | Full dev lifecycle + design system generation |

---

## 4. Prerequisites

- [ ] **Node.js 20+** — `node --version`
- [ ] **pnpm** — `npm install -g pnpm`
- [ ] **Git** — `git --version`
- [ ] **Claude Code CLI** — `npm install -g @anthropic-ai/claude-code`
- [ ] **Python 3.x** — `python3 --version` (for UI/UX Pro Max)
- [ ] **Vercel CLI** — `npm install -g vercel`
- [ ] **Anthropic API key** — set as `ANTHROPIC_API_KEY` env var

---

## 5. Phase 1 — Setup

### Step 1.1 — Install ECC Plugin

```bash
# Start Claude Code
claude

# Inside Claude Code:
/plugin marketplace add https://github.com/affaan-m/everything-claude-code
/plugin install ecc@ecc
```

### Step 1.2 — Install UI/UX Pro Max Skill

```bash
# Inside Claude Code:
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

### Step 1.3 — Verify

```
/skills list
# Should see: frontend-design, design-system, frontend-patterns,
# tdd-workflow, coding-standards, ui-ux-pro-max, etc.
```

### Step 1.4 — Scaffold the Project

```bash
# Option A: Automated (run the install script)
./install.sh

# Option B: Manual
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --turbopack
pnpm dlx shadcn@latest init -d
pnpm dlx shadcn@latest add button card dialog sheet navigation-menu accordion tabs badge separator input textarea label select form toast carousel avatar scroll-area dropdown-menu tooltip
pnpm add framer-motion react-hook-form @hookform/resolvers zod lucide-react clsx class-variance-authority
```

### Step 1.5 — Configure ECC Hook Profile

```bash
# In your shell profile (.zshrc or .bashrc), set the hook strictness:
export ECC_HOOK_PROFILE=standard  # Options: minimal | standard | strict
```

- **minimal** — Basic quality gates only
- **standard** — Recommended. Quality gates + design drift detection + commit quality
- **strict** — All hooks active including gateguard (must read before edit)

### Step 1.6 — Commit & Push

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 with shadcn/ui, Tailwind, Framer Motion"
git push -u origin main
```

---

## 6. Phase 2 — Research (`/search-first`)

**Before writing any code**, use ECC's research skill to investigate existing solutions, patterns, and packages.

### In Claude Code:

```
/search-first

Research the best approaches for building a home care agency website with Next.js 15.
Investigate:
1. Existing Next.js templates or boilerplates for healthcare/agency sites
2. Best shadcn/ui component patterns for service-oriented websites
3. Framer Motion patterns for scroll-reveal animations and stat counters
4. React Hook Form + Zod patterns for multi-step assessment forms
5. Next.js SEO best practices (metadata, JSON-LD, sitemaps)
6. Accessibility requirements for healthcare websites (WCAG AA, ADA)
```

**What this does:** The `search-first` skill prevents reinventing the wheel. It feeds findings directly into the planner in the next phase.

---

## 7. Phase 3 — Plan (`/plan`)

This is where ECC's `planner` agent decomposes the entire project into phased, dependency-ordered steps. **You must approve the plan before proceeding.**

### In Claude Code:

```
/plan

Build a premium home care agency website for "AgingWellCare" with the following pages
and requirements:

PAGES:
- Homepage (hero, trust bar, services preview, why choose us, stats counter,
  testimonials carousel, how it works, CTA banner)
- About Us (company story, mission/values, team showcase, timeline, awards)
- Services overview + 5 detail pages (personal care, companion care, live-in care,
  respite care, specialized care)
- Contact (form + info) + Free Care Assessment (multi-step form)
- Testimonials (grid with filters)
- Careers (benefits, openings, application CTA)
- Blog (listing + detail pages, static/MDX content)
- FAQ (accordion, categorized)
- Locations (service area map/list)

REQUIREMENTS:
- Next.js 15 App Router, TypeScript, shadcn/ui, Tailwind CSS 4, Framer Motion
- Design system from UI/UX Pro Max (warm premium, gold/cream/teal palette)
- Sticky header with phone CTA + "Free Assessment" button
- Multi-column footer with trust badges
- SEO: metadata, JSON-LD (Organization, LocalBusiness, FAQPage, BreadcrumbList)
- Sitemap.ts + robots.ts
- Scroll-triggered animations (staggered cards, stat counters, parallax hero)
- Mobile-first responsive design
- WCAG AA accessibility

DESIGN DIRECTION:
- Warm premium — NOT generic medical blue, NOT AI-slop purple gradients
- Inspired by: adultcareassistance.com (trust signals), griswoldcare.com (warmth),
  thekey.com (premium feel, animated stats)
- Target audience: adult children (40-65) making care decisions for aging parents

Decompose this into phased implementation with dependencies.
Phase 1 = MVP (layout shell + homepage), Phase 2 = core pages,
Phase 3 = remaining pages, Phase 4 = SEO + polish.
```

### What ECC produces:

The planner agent will output a structured plan like:

```
Phase 1 — MVP (Layout + Homepage)
  ├── 1.1 Design system generation (UI/UX Pro Max)
  ├── 1.2 Apply tokens to tailwind.config.ts + globals.css
  ├── 1.3 Header component (sticky, mobile responsive)
  ├── 1.4 Footer component (multi-column, trust badges)
  ├── 1.5 Homepage hero section
  ├── 1.6 Homepage remaining sections
  └── 1.7 Verification sweep

Phase 2 — Core Pages
  ├── 2.1 Services overview + detail page template
  ├── 2.2 About Us page
  ├── 2.3 Contact page + form
  ├── 2.4 Free Assessment multi-step form
  └── 2.5 Verification sweep

Phase 3 — Remaining Pages
  ├── 3.1 Testimonials page
  ├── 3.2 Careers page
  ├── 3.3 Blog listing + detail
  ├── 3.4 FAQ page
  ├── 3.5 Locations page
  └── 3.6 Verification sweep

Phase 4 — SEO + Polish
  ├── 4.1 Metadata + JSON-LD on all pages
  ├── 4.2 Sitemap.ts + robots.ts
  ├── 4.3 Accessibility audit + fixes
  ├── 4.4 Performance optimization
  ├── 4.5 Final verification + security scan
  └── 4.6 Documentation update
```

**Review and approve the plan** before moving on. The plan becomes the roadmap for all subsequent phases.

---

## 8. Phase 4 — Design System (UI/UX Pro Max + `/frontend-design`)

Generate a cohesive, non-generic design system **before writing any component code**.

### Step 4.1 — Generate with UI/UX Pro Max

```
/ui-ux-pro-max

Generate a complete design system for "AgingWellCare" — a premium home care agency
website. Industry: healthcare / home care / elder care.
Target audience: adult children (40-65) making care decisions for aging parents.

Design direction: Warm premium. Gold/cream warmth of TheKey.com combined with
the community trust of Griswold. NOT generic medical blue. NOT AI-slop purple gradients.

Desired feel: Trustworthy, warm, professional, human, premium but approachable.
Tech stack: Next.js 15, shadcn/ui, Tailwind CSS 4.
Persist the design system to design-system/ directory.
```

**What this produces:**
- 1 of 67 UI styles matched to healthcare/elder care
- Color palette from 161 industry-specific palettes
- Font pairing from 57 Google Fonts combinations
- Industry-specific UX rules for healthcare services
- `design-system/MASTER.md` with all tokens

### Step 4.2 — Refine with ECC's frontend-design skill

```
/frontend-design

Review and refine the generated design system for AgingWellCare. Ensure:
- Frame first: purpose, audience, tone established
- Real type hierarchy with intentional scale (not just sm/md/lg)
- Color choices are motivated by the brand, not defaults
- Spacing system uses strategic whitespace and asymmetry
- Motion rules: animation reveals hierarchy, not decorative noise
- Anti-patterns caught: generic card grids, unmotivated color, SaaS cliches
```

### Step 4.3 — Apply tokens to code

```
Apply the design system tokens from design-system/MASTER.md to:
1. tailwind.config.ts — custom colors, fonts, spacing, border radius
2. src/app/globals.css — CSS custom properties, base styles
3. src/app/layout.tsx — font loading via next/font/google
```

### Step 4.4 — Commit

```bash
git add -A
git commit -m "feat: generate and apply AgingWellCare design system"
git push
```

**From this point forward**, the `post:edit:design-quality-check` hook will fire after every file edit to ensure your UI code stays consistent with the design system.

---

## 9. Phase 5 — TDD (`/tdd`)

ECC enforces **Test-Driven Development** with a strict Red-Green-Refactor cycle. Write tests *before* implementation.

### Step 5.1 — Set up testing

```bash
# Install testing dependencies
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom playwright @playwright/test
```

### Step 5.2 — TDD for each component group

For each section in the plan, run the TDD cycle:

```
/tdd

Write tests for the AgingWellCare header component:
- Renders logo and site name
- Shows navigation links (Services, About, Testimonials, Locations, Careers, Blog, Contact)
- Shows phone number as clickable tel: link
- Shows "Free Care Assessment" CTA button
- Mobile: hamburger menu toggles Sheet overlay
- Sticky behavior on scroll
- Services dropdown shows sub-items on hover/click
- All links have correct href values
- Keyboard navigation works (tab through nav items)
- ARIA roles are correct (nav, button, link)
```

**What ECC's TDD cycle does:**

```
RED:    Write failing tests → commit: "test: add header component tests"
GREEN:  Minimal implementation to pass → commit: "feat: implement header component"
REFACTOR: Clean up while tests stay green → commit: "refactor: clean up header"
```

Coverage gate: ECC targets **80%+ coverage** across branches, functions, lines, and statements.

### Step 5.3 — Repeat for each feature

Run `/tdd` for each component/page group before implementing it:

```
/tdd Write tests for the homepage hero section: renders headline, subheadline, two CTA buttons, background image, parallax scroll effect

/tdd Write tests for the stats counter component: renders 4 stat cards, animates numbers on scroll into view, displays correct values and labels

/tdd Write tests for the contact form: validates required fields, shows error messages, submits successfully, shows success toast

/tdd Write tests for the multi-step assessment form: navigates between 3 steps, validates each step, shows progress indicator, review step displays all entered data
```

---

## 10. Phase 6 — Implement (Build Pages)

Now implement each component/page, guided by the plan and with tests already written.

**ECC hooks fire continuously during this phase:**
- `post:edit:design-quality-check` — catches generic UI drift
- `post:edit:console-warn` — catches leftover console.log
- `stop:format-typecheck` — auto-formats and type-checks after each response
- `pre:edit-write:gateguard-fact-force` — ensures you read files before editing (strict mode)

### Step 6.1 — Layout Shell (Header + Footer)

```
Build the header and footer for AgingWellCare, following the approved plan
and design system tokens. Tests are already written — make them pass.

Header:
- Top bar: phone (tel: link), email, social icons
- Main nav: Logo, Services (dropdown), About, Testimonials, Locations, Careers, Blog, Contact
- Sticky with backdrop blur on scroll
- Mobile: hamburger → Sheet slide-out
- "Free Care Assessment" CTA button always visible

Footer:
- 4-column: Company info, Quick Links, Services, Contact
- Social links, trust badges row
- Copyright + privacy/terms links
```

### Step 6.2 — Homepage Sections

```
Build the AgingWellCare homepage sections in order. Tests exist — make them pass.
Follow the design system tokens. Use Framer Motion for scroll animations.

1. HERO — Full-width warm photo background, headline "Compassionate Home Care That
   Feels Like Family", two CTAs, subtle parallax
2. TRUST BAR — Certification logos, social proof line
3. SERVICES PREVIEW — 4-6 cards in asymmetric grid (NOT boring 3-column), staggered reveal
4. WHY CHOOSE US — Split layout (image + content), 4 differentiators with icons
5. STATS COUNTER — Dark section, animated count-up numbers on scroll
6. TESTIMONIALS — Carousel with quotes, names, ratings, auto-play
7. HOW IT WORKS — 3-step visual process connected by path graphic
8. CTA BANNER — Full-width warm gradient, phone + assessment button
```

### Step 6.3 — Services Pages

```
Build services overview + 5 detail pages. Each detail page:
- Hero with service title + image
- What this service includes (icon bullet list)
- Who it's for
- "A Day in the Life" scenario
- Related services sidebar
- CTA: "Get a Free Assessment for [Service Name]"

Services: Personal Care, Companion Care, Live-In Care, Respite Care, Specialized Care
```

### Step 6.4 — About, Contact, Assessment

```
Build About page: story, mission/values, team grid, timeline, awards, careers CTA

Build Contact page: split layout (form left, info right), React Hook Form + Zod,
success toast, map placeholder, office hours

Build Free Assessment page: multi-step form (3 steps + review), progress indicator,
Zod validation per step
```

### Step 6.5 — Remaining Pages

```
Build remaining pages:
- Testimonials: grid with filters, featured video placeholder
- Careers: benefits, openings, application CTA
- Blog: listing with featured post, card grid, sidebar
- FAQ: categorized accordion, CTA at bottom
- Locations: service area list, office details
```

### Commit after each feature

```bash
# ECC's pre:bash:commit-quality hook auto-validates commits
git add -A
git commit -m "feat: build [section name]"
git push
```

---

## 11. Phase 7 — Code Review (`/code-review`)

After implementing each phase, run ECC's code review.

```
/code-review

Review all changes since the last review. Check:
- Code quality and TypeScript correctness
- Component composition and reusability
- Accessibility (WCAG AA compliance)
- Performance (unnecessary re-renders, bundle size)
- Design system adherence
- Security (form handling, user input)
```

### What ECC's code-reviewer does:

1. Analyzes `git diff` of all changes
2. Applies severity-tiered checklist: **CRITICAL / HIGH / MEDIUM / LOW**
3. CRITICAL issues = must fix before proceeding
4. HIGH issues = should fix
5. Zero issues = approved

### Security review (auto-triggers when touching forms/APIs)

```
/security-scan

Review the contact form and assessment form for:
- Input validation and sanitization
- CSRF protection
- Data exposure risks
- Rate limiting considerations
```

---

## 12. Phase 8 — Verify (`/verify`)

Run ECC's 6-phase verification sweep after each major milestone.

```
/verify
```

**What it runs:**
1. **Build verification** — `pnpm build` succeeds
2. **Type checking** — `tsc --noEmit` passes
3. **Linting** — ESLint clean
4. **Test suite** — All tests pass with coverage report
5. **Security scanning** — No vulnerabilities
6. **Diff review** — Final check of all changes

---

## 13. Phase 9 — Refactor & Docs

### Step 9.1 — Refactor

```
/refactor-clean

Remove dead code, unused imports, unreachable components.
Run after all features are complete, NOT during active development.
```

### Step 9.2 — SEO & Metadata

```
Add SEO optimizations to all pages:
1. Metadata (title, description, Open Graph, Twitter cards) for every page
2. JSON-LD structured data:
   - Organization schema (homepage)
   - LocalBusiness schema with service area
   - FAQPage schema (FAQ page)
   - BreadcrumbList (all pages)
3. sitemap.ts (dynamic generation)
4. robots.ts
5. next/image optimization on all images
```

### Step 9.3 — Documentation

```
/update-docs

Generate/update documentation:
- Component architecture map
- Page structure documentation
- Design system reference
```

### Step 9.4 — Final commit

```bash
git add -A
git commit -m "chore: refactor, SEO, documentation"
git push
```

---

## 14. Phase 10 — Deploy to Vercel & Go Live

### Step 10.1 — Final verification

```
/verify
```

### Step 10.2 — Deploy

```bash
# Login to Vercel
vercel login

# Link project
vercel link

# Preview deploy (test first)
vercel

# Production deploy
vercel --prod
```

### Step 10.3 — Custom domain

1. Vercel Dashboard → Project → Settings → Domains
2. Add `agingwellcare.com` + `www.agingwellcare.com`
3. Update DNS:
   - **A record:** `76.76.21.21` (apex)
   - **CNAME:** `cname.vercel-dns.com` (www)
4. SSL auto-provisions

### Step 10.4 — Post-launch checklist

- [ ] All pages load on production URL
- [ ] Contact form works (or shows appropriate message)
- [ ] Phone numbers clickable on mobile
- [ ] SSL certificate active
- [ ] Google Search Console — submit sitemap
- [ ] Google Business Profile — update URL
- [ ] Social media — update links
- [ ] Vercel Analytics enabled
- [ ] Test on real devices: iPhone, Android, iPad, desktop

---

## 15. ECC Commands Quick Reference

### Core Lifecycle Commands

| Command | Phase | What It Does |
|---------|-------|-------------|
| `/search-first` | Research | Investigate before coding |
| `/plan` | Planning | Decompose into phased steps (requires approval) |
| `/tdd` | Testing | Red-Green-Refactor test cycle |
| `/build-fix` | Build | Fix compilation/type errors |
| `/code-review` | Review | Severity-tiered diff review |
| `/security-scan` | Security | Vulnerability detection |
| `/verify` | Verification | 6-phase verification sweep |
| `/refactor-clean` | Cleanup | Dead code removal |
| `/update-docs` | Documentation | Sync docs from source |

### Design & Frontend Commands

| Command | What It Does |
|---------|-------------|
| `/ui-ux-pro-max` | Generate design system (67 styles, 161 palettes, 57 fonts) |
| `/frontend-design` | Design philosophy — anti-generic, intentional UI |
| `/frontend-patterns` | React/Next.js best practices |
| `/design-system` | Visual audit + AI slop detection |

### Quality & Learning Commands

| Command | What It Does |
|---------|-------------|
| `/learn` | Extract patterns mid-session |
| `/verify` | Full verification sweep |
| `/e2e` | End-to-end test generation (Playwright) |
| `/test-coverage` | Coverage analysis |

### ECC Hook Profiles

```bash
export ECC_HOOK_PROFILE=minimal    # Basic quality gates only
export ECC_HOOK_PROFILE=standard   # Recommended — quality + design drift + commit quality
export ECC_HOOK_PROFILE=strict     # All hooks — must read before edit, gateguard active
```

---

## 16. Appendix

### Site Architecture

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (header/footer)
│   ├── page.tsx                    # Homepage
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx                # Overview
│   │   ├── personal-care/page.tsx
│   │   ├── companion-care/page.tsx
│   │   ├── live-in-care/page.tsx
│   │   ├── respite-care/page.tsx
│   │   └── specialized-care/page.tsx
│   ├── contact/page.tsx
│   ├── free-assessment/page.tsx
│   ├── testimonials/page.tsx
│   ├── careers/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── faq/page.tsx
│   └── locations/page.tsx
├── components/
│   ├── layout/       # header, footer, mobile-nav
│   ├── home/         # hero, services-preview, stats, testimonials, etc.
│   ├── shared/       # section-header, service-card, testimonial-card, etc.
│   ├── forms/        # contact-form, assessment-form
│   └── ui/           # shadcn/ui (auto-generated, don't modify)
├── lib/
│   ├── utils.ts
│   └── constants.ts  # Site content constants
└── styles/
    └── globals.css
```

### Content Themes (from inspiration sites)

**Trust Signals:** Years of experience, background-checked caregivers, licensed/bonded/insured, industry awards, satisfaction rate

**Services:** Personal Care (ADLs), Companion Care, Live-In/24-Hour Care, Respite Care, Specialized Care (Alzheimer's, Parkinson's, post-surgery), Veteran Care

**Design Patterns:** Always-visible phone number, animated stat counters, multi-step assessment forms, trust badge rows, founder story, 3-step "How It Works" process

### Complete ECC Workflow for One Feature

Here's the full ECC cycle for building a single feature (e.g., the homepage hero):

```
1. /plan "Build the homepage hero section with parallax background, headline,
   subheadline, and two CTAs"
   → Review and approve the plan

2. /tdd "Write tests for hero: renders headline, subheadline, primary CTA
   (Schedule Free Assessment), secondary CTA (phone), background image,
   parallax effect on scroll, responsive layout"
   → RED: Tests written and failing
   → Commit: "test: add hero section tests"

3. Implement the hero component
   → GREEN: Tests pass
   → Hooks auto-fire: design-quality-check, console-warn, format-typecheck
   → Commit: "feat: implement homepage hero section"

4. /code-review
   → Review findings, fix any CRITICAL/HIGH issues

5. /verify
   → Build, typecheck, lint, tests, security — all green

6. Commit: "feat: homepage hero — reviewed and verified"
```

**Repeat this cycle for every feature in the plan.**

---

**You're ready to build.** Start Claude Code (`claude`), install the plugins (Phase 1), then follow the lifecycle: Research → Plan → Design → TDD → Implement → Review → Verify → Deploy.
