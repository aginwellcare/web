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

### Step 1.1 — Install ECC

> ECC ships 47 agents, 183 skills, and 40+ hooks. The `/plugin` system installs
> everything — there is no profile selector at install time. Instead, we scope what
> gets used via `CLAUDE.md` (see project root). Unused skills don't consume tokens
> until invoked, so the main concern is hooks and rules, not the skill list.

```bash
# Option A — Plugin system (recommended)
/plugin marketplace add everything-claude-code
/plugin install everything-claude-code

# Option B — Manual clone
git clone https://github.com/affaan-m/everything-claude-code.git ~/.claude/plugins/cache/everything-claude-code
cd ~/.claude/plugins/cache/everything-claude-code && ./install.sh --target claude --profile core
```

#### Why `core` and not `developer` or `full`?

| Profile | What it installs | Right for this project? |
|---------|-----------------|------------------------|
| `core` | Common rules, all agents, quality hooks, workflow skills | **Yes — use this** |
| `developer` | Core + 52 framework skills across ALL languages | No — pulls in Go, Rust, Python, etc. |
| `security` | Core + security-focused skills | No — overkill for a marketing site |
| `full` | All 19 modules, every skill | No — massive context bloat |

The `core` profile gives you everything this project needs:
- **Rules:** coding-style, security, testing, git-workflow (TypeScript + Web)
- **Agents:** All 47 (lightweight — they only activate when called via `/command`)
- **Hooks:** Quality gates, design drift detection, commit validation, format+typecheck
- **Skills:** TDD, verification, continuous learning, coding standards

#### What this project uses vs. what ECC offers

**Agents relevant to this project (8 of 47):**

| Agent | Why we need it |
|-------|---------------|
| `planner` | Decompose pages/features into phased steps |
| `code-reviewer` | Quality checks on every PR |
| `typescript-reviewer` | TS-specific review (auto-triggers) |
| `security-reviewer` | XSS, input validation on contact/assessment forms |
| `seo-specialist` | Critical for a marketing site targeting search traffic |
| `a11y-architect` | WCAG AA — essential for elderly care audience |
| `performance-optimizer` | Core Web Vitals matter for SEO and UX |
| `refactor-cleaner` | Dead code cleanup post-feature |

**Agents NOT needed (skip — they won't activate without matching code):**
- All non-TS language reviewers (Go, Python, Rust, C++, Java, Kotlin, Swift, Dart, C#, Perl, PHP)
- `database-reviewer`, `pytorch-build-resolver`, `healthcare-reviewer`
- `gan-*` agents, `chief-of-staff`, `opensource-*` agents

**Skills relevant to this project (~15 of 183):**
`frontend-design`, `frontend-patterns`, `design-system`, `tdd-workflow`, `seo`,
`accessibility`, `security-review`, `verification-loop`, `git-workflow`,
`coding-standards`, `search-first`, `browser-qa`, `deployment-patterns`,
`e2e-testing`, `continuous-learning-v2`

**Skill categories NOT needed (the other 80%):**
- All backend frameworks (Django, Laravel, Spring Boot, NestJS, Perl, PHP)
- Database skills (postgres-patterns, jpa-patterns, clickhouse, migrations)
- Mobile/native (Swift, Dart/Flutter, Android, Compose)
- Domain-specific (supply chain, healthcare compliance, DeFi/crypto, customs)
- Media generation (video creation, manim, fal-ai)
- Agent harness / GAN / autonomous loop patterns
- Social distribution, operator workflows, document processing

> **Note:** Unused agents and skills don't consume tokens when idle — they only load
> into context when you invoke their `/command`. The `core` profile avoids installing
> unused *rules* and *hooks*, which DO run automatically and would add overhead.

### Step 1.2 — Install UI/UX Pro Max Skill

> **Note:** UI/UX Pro Max is a separate skill, not part of ECC. It also does not use
> the `/plugin` system. Check the skill's repo for current install instructions.

```bash
# Check the repo for manual install steps:
# https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
# Typical pattern: clone into ~/.claude/skills/ and follow its README
```

### Step 1.3 — Verify Installation

```bash
# Verify ECC plugin is in place (marketplace installs to plugins/cache/)
ls ~/.claude/plugins/cache/everything-claude-code/

# Verify skills are loaded — start Claude Code and check the skill list
claude
# Then try: /plan "test" — should activate the planner agent
# ECC hooks are provided by the plugin system, not via settings.json entries
```

### Step 1.4 — Install pnpm

```bash
# Install pnpm globally (corepack on Node <22.12 has signature verification bugs)
npm install -g pnpm

# Verify
pnpm --version
```

### Step 1.5 — Scaffold the Project (unchanged)

```bash
# Option A: Automated (run the install script)
./install.sh

# Option B: Manual
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --turbopack
pnpm dlx shadcn@latest init -d
pnpm dlx shadcn@latest add button card dialog sheet navigation-menu accordion tabs badge separator input textarea label select form toast carousel avatar scroll-area dropdown-menu tooltip
pnpm add framer-motion react-hook-form @hookform/resolvers zod lucide-react clsx class-variance-authority
```

### Step 1.6 — Configure ECC Hook Profile

```bash
# In your shell profile (.zshrc or .bashrc), set the hook strictness:
export ECC_HOOK_PROFILE=standard  # Options: minimal | standard | strict
```

- **minimal** — Basic quality gates only
- **standard** — Recommended. Quality gates + design drift detection + commit quality
- **strict** — All hooks active including gateguard (must read before edit)

### Step 1.7 — Commit & Push

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
Reference: See "Inspiration Deep Dive" appendix for specific patterns from each site.

1. HERO — Full-width warm photo background with CSS Ken Burns effect (slow zoom
   1.0x→1.1x over 20s, infinite alternate — like TheKey). Semi-transparent dark
   overlay. Headline "Compassionate Home Care That Feels Like Family". Content
   fades up with staggered children (0.6s total). Two CTAs: "Schedule Free
   Assessment" (primary, purple #42273b) + "Call (XXX) XXX-XXXX" (secondary).
   Subtle scroll parallax on background only (useScroll + useTransform, 50% rate).

2. TRUST BAR — Certification logos on muted background. Simple fade-in on view (0.3s).
   Social proof line: "Trusted by 500+ families". Inspired by Adult Care Assistance's
   massive badge collection.

3. SERVICES PREVIEW — 4-6 cards in asymmetric grid (NOT boring 3-column equal grid).
   Staggered fade-up on scroll (0.1s stagger between cards — like TheKey). Each card
   has hover zoom effect (scale 1.05x + shadow increase, 0.2s — like TheKey's service
   cards). Icon, title, 2-line description, "Learn More" link.

4. WHY CHOOSE US — Split layout (image left with Ken Burns, content right).
   4 differentiators stagger in from left (0.8s total). Icons: Vetted Caregivers,
   Personalized Plans, 24/7 Availability, Locally Owned. Inspired by Adult Care
   Assistance's "Why Choose Us" six differentiators section.

5. STATS COUNTER — Dark teal/green background (#07272d like TheKey) for contrast.
   Odometer-style rolling digit counters triggered on scroll into view (useInView,
   2s duration, run once). NOT just incrementing numbers — digits should roll/flip
   like a mechanical counter. This is the single most impactful animation on the page.
6. TESTIMONIALS — Carousel using Embla Carousel + Framer Motion. Custom circle
   pagination (animated fill, not plain dots — like TheKey's Flickity carousel).
   Auto-play every 5s with pause on hover. Slide + fade transition (0.4s).
   Each card: quote, name, relationship ("Daughter of client"), star rating.
   Warm cream background (#f6f4ea). Consider placeholder structure for future
   video testimonials (like Griswold's Wistia embeds).

7. HOW IT WORKS — 3-step visual process: Free Consultation → Custom Care Plan →
   Meet Your Caregiver. Connected by an SVG path/line graphic. Steps reveal
   sequentially along the path as section scrolls into view (1.2s total).
   Each step: numbered circle, icon, title, brief description.

8. CTA BANNER — Full-width warm gradient (gold/cream). Subtle scroll parallax on
   background (same technique as hero, 50% rate). "Ready to discuss care for your
   loved one?" Phone number (clickable) + "Schedule Free Assessment" button.
   Repeating the CTA reduces friction (inspired by Griswold showing location
   finder twice on page).
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

---

### Inspiration Deep Dive — Component-Level Design Patterns

This appendix contains **specific, actionable** design and motion patterns extracted from each inspiration site. Use these details in your Claude Code prompts during implementation to produce precise, non-generic results.

---

#### Site 1: Adult Care Assistance (adultcareassistance.com)

**Overall approach:** Content-dense, trust-heavy, minimal motion. The site wins through sheer volume of social proof rather than flashy animation.

**Navigation:**
- Top-level: Senior Home Care, Locations, About Us, Careers, Blog, Phone number
- Extensive dropdowns — Services has 8 sub-items (Home Care, Veteran Home Care, 24-Hour Live-In, Free Senior Services, Free Assessment, Senior Care Options, Safety Tips, Pricing)
- Locations dropdown lists 4 Arizona cities
- About Us dropdown: Why We Care, History, Trust Our Team, Our Standards, Testimonials, FAQs

**Hero:**
- Headline: "Be Independent, Without Being Alone"
- Sub-headline: "Live In Your Home | Eliminate Worry | Confident In Your Care"
- Single CTA: "Contact Us"
- Clean, professional, photography-based — no parallax or complex motion

**Homepage Section Flow (8 sections):**
1. Home Care — 24-hour live-in assistance overview
2. Senior Care — Award-winning caregivers, independence emphasis
3. Caregiver — Quality, training, background checks
4. Company Overview — Owner Krystal Wilkinson featured, "24-Hour Caregiving Services Since 1996"
5. Home Care for Seniors in Arizona — Service area overview
6. Client & Caregiver Testimonials — 25+ five-star text reviews
7. Why Choose Adultcare Assistance? — Six differentiators
8. Contact/Consultation — "Talk to Our Team" with free assessment offer

**Color Palette:**
- Primary: White (#ffffff), Dark Gray (#434549)
- Accents: Green (#65bd7d), Blue (#4f81bc), Dark Teal (#005a87), Gold (#fcb900)
- Buttons: Dark gray (#32373c) with white text

**Trust Signals (massive collection):**
- "Voted Best of Arizona for 13 Years"
- Best of Home Care Leader in Excellence
- Employer of Choice award
- Provider of Choice award
- Caring Star 2024
- A+ BBB rating
- Highlights Arizona's lack of home care licensing as a differentiator for their voluntary standards

**Unique Elements:**
- Owner/founder prominently featured with personal story (builds personal connection)
- Emphasizes locally owned, non-franchise status
- 25+ testimonials with 5-star ratings displayed inline (not in a carousel — raw volume)
- Three phone numbers visible throughout

**What to steal for AgingWellCare:**
- The sheer volume of trust badges/awards displayed prominently
- Founder story with photo for personal connection
- "Free Senior Services" as a differentiator page
- The 8-section homepage flow that builds trust progressively
- Six differentiators section with clear why-choose-us messaging

---

#### Site 2: Griswold Home Care (griswoldcare.com)

**Overall approach:** Clean, warm, streamlined. Less content-dense than Adult Care Assistance, more approachable. Community-focused with a philanthropic angle.

**Navigation:**
- Minimal top-level: Who is Griswold (dropdown), Care Services, Be a Caregiver, Blog, Find your Local Griswold
- Secondary: Own a Franchise, Jean Griswold Foundation
- Much simpler/cleaner nav than the other two

**Hero:**
- Headline: "Live Assured with In-Home Care"
- Sub-headline: "Stay home where you belong, with compassionate care by Griswold."
- Primary CTA: **Zip code search field** with "Find care" button (not just a contact button)
- Background: Kitchen scene with caregiver in blue scrubs — warm, domestic setting

**Homepage Section Flow (6 sections):**
1. Why Griswold? — 40+ years experience, Care Professionals emphasis
2. At Griswold, Care is Personal — Three service pillars with descriptions
3. Griswold In Your Community — Regional office carousel (8 locations with event photos)
4. Hear for Yourself — **Video testimonial slider** (4 Wistia-embedded interviews)
5. Award-winning Home Care — Activated Insights endorsement
6. Supporting Caregivers Everywhere — Jean Griswold Foundation scholarship program

**Color Palette:**
- Primary: Teal/Blue-green (#82b8b2)
- White backgrounds
- Dark gray/charcoal for buttons and text
- Red accents in community photos

**Motion & Interaction:**
- Location finder appears **twice** on the page (top hero + bottom) — reduces friction
- Community event photography carousel for regional offices
- Video testimonials are the star interaction — Wistia embeds with custom styling
- Overall motion is restrained and purposeful

**Unique Elements:**
- **Video testimonials** — the only site of the three using video on homepage
- **Jean Griswold Foundation** — charitable/scholarship arm adds trust and warmth
- **Zip code search** as primary CTA (not just "contact us")
- Community event photos showing real local engagement
- Franchise model openly referenced (transparency)

**Footer:**
- Phone: 1.800.GRISWOLD (vanity number)
- Social: Facebook, LinkedIn, YouTube, Instagram
- State-specific service model disclaimer

**What to steal for AgingWellCare:**
- Video testimonials (even placeholder structure for future video content)
- Zip code / location finder as a primary interaction pattern
- The warm, domestic photography style (kitchen scenes, living rooms — not clinical)
- Foundation/community giving section for trust building
- Simpler, cleaner navigation structure
- Location finder repeated at top and bottom to reduce friction
- Three service pillars layout (Personal Care, Companionship, Homemaking)

---

#### Site 3: TheKey (thekey.com) — THE PARALLAX / MOTION REFERENCE

**Overall approach:** Premium, corporate, tech-forward. The most polished and animation-rich of the three. Gold/cream palette signals luxury. This is your primary motion/parallax reference.

**Navigation:**
- Top-level: Services, Locations, Learning Center, About Us, Careers
- "Find Care" dropdown with zip code search
- Header shows phone (866) 475-4967 and email
- Social links in header (Instagram, Facebook, LinkedIn)

**Hero:**
- Emphasizes "largest, and most trusted, in-home care provider"
- **Rotating SVG hero icons** — animated cycling through care theme concepts (NOT a traditional parallax image scroll, but motion-graphics-style icon rotation that gives the hero a dynamic, living feel)
- CTAs: Primary action button + "Find Your Local Office"
- Full-width layout with semi-transparent dark overlay on photography

**Homepage Section Flow (10 sections — most complex):**
1. Hero with rotating benefit SVG icons
2. **Animated statistics section** — Number counters on dark green background using odometer.js
3. Services overview — 4-column grid with **hover zoom effects** on cards
4. Blog/content carousel — Auto-scrolling article previews
5. Leadership/team showcase with logo carousel
6. Testimonials carousel — **Flickity-powered** with animated circle pagination dots
7. Trust associations and certifications gallery
8. Mobile app promotion — App Store + Google Play badges
9. Care assessment CTA — Full-width with form
10. FAQ accordion section

**Color Palette (the premium reference):**
- Primary gold/khaki: #d0b787, #ceb888 — luxury signaling
- Secondary dark teal/green: #07272d, #00293a — depth and authority
- Accent blue: #276fc4 — links and interactive elements
- Text: Dark brown #4b4545 — softer than pure black
- Backgrounds: Cream/tan #f6f4ea, Mint green #e5f6f1 — warm alternating sections
- Primary CTA buttons: Purple #42273b — distinctive, not generic blue

**Motion & Parallax Patterns (DETAILED):**

1. **Rotating SVG Hero Icons**
   - SVG icons cycle through care benefit concepts (heart, home, shield, etc.)
   - Smooth rotation/fade transition between icons
   - Creates a "living" hero without traditional image parallax
   - Implementation: Framer Motion `AnimatePresence` with `rotate` + `opacity` variants

2. **Odometer-Style Stat Counters**
   - Numbers roll up like an odometer when section scrolls into view
   - Dark green/teal background section creates visual contrast
   - Stats: years of experience, families served, satisfaction %, caregiver count
   - Implementation: Framer Motion `useInView` + `animate` with `duration: 2s` easing
   - The digit-rolling effect (not just a number increment) is what makes it premium

3. **Service Card Hover Zoom**
   - 4-column grid of service cards
   - On hover: image scales up slightly (1.05x) with smooth transition
   - Card lifts with subtle shadow increase
   - Implementation: Framer Motion `whileHover={{ scale: 1.05 }}` + CSS shadow transition

4. **Flickity Testimonial Carousel**
   - Custom circle pagination (not dots — animated circle fills)
   - Smooth slide transitions with momentum scrolling
   - Auto-play with pause on hover
   - Implementation: Embla Carousel (modern Flickity alternative) + Framer Motion

5. **Staggered Section Reveals**
   - Sections fade in + slide up as they enter viewport
   - Child elements stagger (first card, then second, then third...)
   - Implementation: Framer Motion `staggerChildren: 0.1` in parent variants

6. **Ken Burns on Photography**
   - Hero and section background images have slow zoom (not scroll-based parallax)
   - 15-20 second cycle: slow zoom in from 1.0x to 1.1x, then reset
   - Creates visual life without traditional scroll parallax
   - Implementation: CSS `@keyframes kenBurns { from { transform: scale(1) } to { transform: scale(1.1) } }` with `animation: kenBurns 20s ease-in-out infinite alternate`

7. **Scroll-Triggered Parallax Layers**
   - Background images scroll at ~50% of content scroll speed
   - Creates depth without being disorienting
   - Only on hero and CTA banner sections (not everywhere)
   - Implementation: Framer Motion `useScroll` + `useTransform` to translate Y at reduced rate

**Interactive Features:**
- **Salesforce Einstein chatbot** — embedded with custom avatar and greeting, activates after delay
- **Interactive US/Canada map** — clickable states/provinces for location finding
- **Multi-step care assessment forms** — progress indicators with breadcrumb navigation
- **Off-hours inquiry form** — auto-activates when offices are closed (time-aware UX)
- **Mobile app** with App Store and Google Play links

**What to steal for AgingWellCare:**

| Pattern | Priority | Implementation Notes |
|---------|----------|---------------------|
| Odometer stat counters | **HIGH** | Most impactful single animation. Use Framer Motion `useInView` + digit rolling |
| Ken Burns hero photography | **HIGH** | CSS-only, zero JS cost. Makes static images feel alive |
| Staggered section reveals | **HIGH** | Framer Motion `staggerChildren`. Apply to service cards, team grid, testimonials |
| Service card hover zoom | **MEDIUM** | `whileHover={{ scale: 1.05 }}` + shadow. Simple but polished |
| Testimonial carousel with custom pagination | **MEDIUM** | Embla Carousel + Framer Motion for pagination animation |
| Scroll parallax on hero/CTA | **MEDIUM** | `useScroll` + `useTransform`. Only 2 sections, not everywhere |
| Rotating SVG hero icons | **LOW** | Nice-to-have. `AnimatePresence` cycling through icon set |
| Gold/cream color palette | **HIGH** | The warm premium feel comes largely from the color choices |
| Dark brown text (#4b4545) | **HIGH** | Softer than black, more premium. Small detail, big impact |
| Purple CTA buttons (#42273b) | **MEDIUM** | Distinctive — stands out from typical blue/green CTAs |

---

#### Cross-Site Pattern Summary

**Patterns ALL THREE sites share:**
1. Always-visible phone number in header
2. Testimonials prominently displayed (text, video, or carousel)
3. Trust signals/awards/certifications section
4. "How it works" or "Getting started" simplified process
5. Free consultation/assessment as primary CTA
6. Services categorized similarly: personal care, companion care, homemaking/specialized
7. Target audience: adult children making care decisions for parents
8. Caregiver quality and screening process emphasized

**Motion spectrum across the three:**
```
Static ◄─────────────────────────────────────────────► Dynamic

Adult Care Assistance          Griswold              TheKey
(minimal motion,           (video testimonials,    (parallax, counters,
 trust through content)     location carousel)      hover effects, SVG
                                                    rotation, staggered
                                                    reveals, Ken Burns)
```

**AgingWellCare target: Between Griswold and TheKey** — premium motion that adds polish without being overwhelming. Use TheKey's techniques selectively (stat counters, Ken Burns, staggered reveals) but keep Griswold's warmth and Adult Care Assistance's trust density.

---

#### Recommended Motion Budget for AgingWellCare

To avoid over-animating (which can feel as generic as no animation):

| Section | Animation | Duration | Trigger |
|---------|-----------|----------|---------|
| Hero background | Ken Burns zoom | 20s loop | Page load |
| Hero content | Fade up + stagger | 0.6s total | Page load |
| Trust bar logos | Fade in | 0.3s | In view |
| Service cards | Staggered fade up | 0.8s total (0.1s stagger) | In view |
| Why Choose Us items | Staggered slide in from left | 0.8s total | In view |
| Stat counters | Odometer roll-up | 2s | In view (once) |
| Testimonial carousel | Slide + fade | 0.4s per slide | Auto-play 5s |
| How It Works steps | Sequential reveal along path | 1.2s total | In view |
| CTA banner background | Subtle parallax scroll | Continuous | Scroll |
| Service card hover | Scale 1.05x + shadow | 0.2s | Hover |
| Page transitions | Fade | 0.2s | Navigation |

**Total unique animations: 11.** Each serves a purpose (hierarchy, attention, delight). No animation is purely decorative.

---

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

**You're ready to build.** Start Claude Code (`claude`), install ECC via `git clone` + `install.sh --profile core` (Phase 1), then follow the lifecycle: Research → Plan → Design → TDD → Implement → Review → Verify → Deploy.
