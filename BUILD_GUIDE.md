# AgingWellCare — Home Care Agency Website Build Guide

> A step-by-step guide to building a premium, non-generic home care agency website using Next.js, shadcn/ui, Tailwind CSS, and Claude Code with the Everything Claude Code (ECC) plugin + UI/UX Pro Max skill.

---

## Table of Contents

1. [Design Vision & Inspiration](#1-design-vision--inspiration)
2. [Tech Stack Overview](#2-tech-stack-overview)
3. [Prerequisites](#3-prerequisites)
4. [Phase 1 — Environment & Tool Setup](#4-phase-1--environment--tool-setup)
5. [Phase 2 — Project Scaffolding](#5-phase-2--project-scaffolding)
6. [Phase 3 — Design System Generation](#6-phase-3--design-system-generation)
7. [Phase 4 — Build the Website with Claude Code](#7-phase-4--build-the-website-with-claude-code)
8. [Phase 5 — Quality Assurance](#8-phase-5--quality-assurance)
9. [Phase 6 — Deploy to Vercel & Go Live](#9-phase-6--deploy-to-vercel--go-live)
10. [Appendix — Site Architecture & Content Map](#10-appendix--site-architecture--content-map)

---

## 1. Design Vision & Inspiration

### Inspiration Sources

We analyzed three leading home care company websites:

| Feature | Adult Care Assistance | Griswold Home Care | TheKey |
|---|---|---|---|
| **Scale** | Regional (Arizona) | National (franchise) | National (corporate) |
| **Hero Headline** | "Be Independent, Without Being Alone" | "Live Assured with In-Home Care" | "Largest, most trusted provider" |
| **Primary Colors** | Blue/Green/Gray | Teal/Blue-green | Gold/Dark Teal |
| **Tone** | Family-owned, trust-heavy | Warm, community-focused | Premium, corporate |
| **Testimonials** | 25+ text reviews | 4 video testimonials | Animated carousel |
| **Unique Angle** | Local ownership, awards | Foundation/philanthropy | Tech-forward, premium |

### Design Principles for AgingWellCare

1. **Warm premium** — Gold/cream palette inspired by TheKey's luxury feel, but friendlier
2. **Trust-first** — Prominent awards, certifications, and testimonials like Adult Care Assistance
3. **Community warmth** — Griswold's approachable, empathetic tone
4. **No AI slop** — No generic purple gradients, no gratuitous glassmorphism, no cookie-cutter SaaS layouts
5. **Intentional motion** — Subtle animations that reveal hierarchy (counter stats, staggered cards)
6. **Real photography feel** — Placeholder images should be replaced with authentic team/client photos

### Target Audience

Adult children (ages 40-65) making care decisions for aging parents. Secondary: seniors themselves and healthcare professionals making referrals.

---

## 2. Tech Stack Overview

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | SEO-critical pages, server components, image optimization |
| **Styling** | Tailwind CSS 4 | Utility-first, design token friendly, rapid iteration |
| **UI Components** | shadcn/ui | Accessible, unstyled base components we can make our own |
| **Animation** | Framer Motion | Scroll-triggered reveals, counters, page transitions |
| **Icons** | Lucide React | Clean, consistent icon set (already bundled with shadcn/ui) |
| **Forms** | React Hook Form + Zod | Type-safe form validation for contact/assessment forms |
| **Maps** | Google Maps Embed or Leaflet | Office locations (if needed) |
| **CMS (optional)** | Markdown/MDX or Sanity | Blog posts, team bios, service pages |
| **Analytics** | Vercel Analytics | Privacy-friendly, zero-config |
| **Deployment** | Vercel | Git-push deploys, edge network, preview URLs |
| **AI Design Tools** | ECC plugin + UI/UX Pro Max | Non-generic design system generation |

---

## 3. Prerequisites

Before starting, ensure you have:

- [ ] **Node.js 20+** — `node --version` (install via https://nodejs.org or `nvm install 20`)
- [ ] **pnpm** — `pnpm --version` (install via `npm install -g pnpm`)
- [ ] **Git** — `git --version`
- [ ] **Claude Code CLI** — `claude --version` (install via `npm install -g @anthropic-ai/claude-code`)
- [ ] **Python 3.x** — `python3 --version` (required for UI/UX Pro Max design system generator)
- [ ] **Vercel CLI** — `vercel --version` (install via `npm install -g vercel`)
- [ ] **GitHub CLI** — `gh --version` (install via `brew install gh` on macOS)
- [ ] **Anthropic API key** set as `ANTHROPIC_API_KEY` environment variable
- [ ] **Vercel account** — Sign up at https://vercel.com (free tier works)

---

## 4. Phase 1 — Environment & Tool Setup

### Step 1.1 — Install Everything Claude Code (ECC) Plugin

```bash
# Option A: Via Claude Code Plugin Marketplace (recommended)
claude
# Then inside Claude Code:
/plugin marketplace add https://github.com/affaan-m/everything-claude-code
/plugin install ecc@ecc

# Option B: Manual install
git clone https://github.com/affaan-m/everything-claude-code.git ~/.claude/plugins/ecc
cd ~/.claude/plugins/ecc
npm install
./install.sh --profile typescript
```

### Step 1.2 — Install UI/UX Pro Max Skill

This is a **separate plugin** from ECC. It provides 67 UI styles, 161 color palettes, 57 font pairings, and industry-specific design reasoning.

```bash
# Option A: Via Claude Code Plugin Marketplace
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill

# Option B: Via CLI
npm install -g uipro-cli
cd /Users/matlihan/dev/node/agingwellcare
uipro init --ai claude
```

### Step 1.3 — Verify installations

```bash
# Inside Claude Code, verify skills are available:
/skills list
# You should see: frontend-design, design-system, frontend-patterns, ui-ux-pro-max, etc.
```

---

## 5. Phase 2 — Project Scaffolding

### Step 2.1 — Create Next.js project

```bash
cd /Users/matlihan/dev/node/agingwellcare

# Create Next.js 15 app with TypeScript, Tailwind, ESLint, App Router
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm
```

> **Note:** When prompted, select defaults. The `.` installs into the current directory.

### Step 2.2 — Install shadcn/ui

```bash
pnpm dlx shadcn@latest init

# When prompted:
# - Style: Default
# - Base color: Neutral (we'll customize later)
# - CSS variables: Yes
```

### Step 2.3 — Install core shadcn/ui components

```bash
pnpm dlx shadcn@latest add button card dialog sheet navigation-menu \
  accordion tabs badge separator input textarea label select \
  form toast carousel avatar scroll-area
```

### Step 2.4 — Install additional dependencies

```bash
# Animation
pnpm add framer-motion

# Form handling
pnpm add react-hook-form @hookform/resolvers zod

# Icons (already included with shadcn, but ensure latest)
pnpm add lucide-react

# Utility
pnpm add clsx class-variance-authority
```

### Step 2.5 — Initial commit

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 with shadcn/ui, Tailwind, Framer Motion"
git push -u origin main
```

---

## 6. Phase 3 — Design System Generation

This is where the ECC and UI/UX Pro Max skills shine — generating a cohesive, non-generic design system tailored to home care.

### Step 3.1 — Generate design system with UI/UX Pro Max

Inside Claude Code, run:

```
/ui-ux-pro-max

Generate a complete design system for "AgingWellCare" — a premium home care agency
website. Industry: healthcare / home care / elder care. Target audience: adult children
(40-65) making care decisions for aging parents.

Design direction: Warm premium. Think gold/cream warmth of TheKey.com combined with
the community trust of Griswold. NOT generic medical blue. NOT AI-slop purple gradients.

Desired feel: Trustworthy, warm, professional, human, premium but approachable.
Persist the design system to design-system/ directory.
```

### Step 3.2 — Apply the ECC frontend-design skill

```
/frontend-design

Review and refine the generated design system. Ensure we are:
- Framing first (purpose, audience, tone established before any code)
- Building a real type hierarchy with intentional scale
- Using asymmetry and whitespace strategically
- Avoiding anti-patterns: generic card grids, unmotivated color, SaaS cliches
```

### Step 3.3 — Expected design system output

After generation, you should have a `design-system/` directory with:

```
design-system/
├── MASTER.md          # Core tokens: colors, typography, spacing, motion
├── homepage.md        # Page-specific overrides
├── services.md
├── about.md
└── contact.md
```

Apply the design tokens to your `tailwind.config.ts` and `src/app/globals.css`.

### Step 3.4 — Commit design system

```bash
git add -A
git commit -m "feat: generate AgingWellCare design system via UI/UX Pro Max"
git push
```

---

## 7. Phase 4 — Build the Website with Claude Code

Now use Claude Code with ECC skills to build each page. Work page-by-page, committing after each.

### Site Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout with header/footer
│   ├── page.tsx                # Homepage
│   ├── about/
│   │   └── page.tsx            # About Us (story, mission, team)
│   ├── services/
│   │   ├── page.tsx            # Services overview
│   │   ├── personal-care/
│   │   │   └── page.tsx
│   │   ├── companion-care/
│   │   │   └── page.tsx
│   │   ├── live-in-care/
│   │   │   └── page.tsx
│   │   ├── respite-care/
│   │   │   └── page.tsx
│   │   └── specialized-care/
│   │       └── page.tsx
│   ├── locations/
│   │   └── page.tsx            # Service areas
│   ├── careers/
│   │   └── page.tsx            # Join our team
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual post
│   ├── contact/
│   │   └── page.tsx            # Contact + Free assessment form
│   ├── testimonials/
│   │   └── page.tsx            # Client stories
│   └── faq/
│       └── page.tsx            # Frequently asked questions
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Sticky nav with phone CTA
│   │   ├── footer.tsx          # Multi-column footer
│   │   └── mobile-nav.tsx      # Sheet-based mobile menu
│   ├── home/
│   │   ├── hero.tsx            # Full-width hero with CTA
│   │   ├── services-preview.tsx
│   │   ├── why-choose-us.tsx
│   │   ├── stats-counter.tsx   # Animated statistics
│   │   ├── testimonials-carousel.tsx
│   │   ├── trust-badges.tsx
│   │   └── cta-banner.tsx
│   ├── shared/
│   │   ├── section-header.tsx
│   │   ├── service-card.tsx
│   │   ├── team-member-card.tsx
│   │   ├── testimonial-card.tsx
│   │   └── contact-form.tsx
│   └── ui/                     # shadcn/ui components (auto-generated)
├── lib/
│   ├── utils.ts
│   └── constants.ts            # Site-wide content constants
└── styles/
    └── globals.css
```

### Step 4.1 — Build the Layout Shell (Header + Footer)

In Claude Code:

```
Build the root layout with a sticky header and multi-column footer for AgingWellCare.

Header requirements:
- Top bar: phone number (clickable tel: link), email, social icons
- Main nav: Logo, Services (dropdown), About, Locations, Careers, Blog, Contact
- Sticky on scroll with subtle backdrop blur
- Mobile: hamburger -> Sheet slide-out menu
- Prominent "Free Care Assessment" CTA button (always visible)

Footer requirements:
- 4-column layout: Company info + logo, Quick Links, Services, Contact Info
- Phone, email, address
- Social media links
- "Areas We Serve" section
- Copyright + privacy/terms links
- Trust badges row (BBB, Home Care Association, etc.)

Use the design system tokens. Framer Motion for subtle entrance animations.
Follow the frontend-design skill principles — no generic layouts.
```

### Step 4.2 — Build the Homepage

```
Build the AgingWellCare homepage with these sections (in order):

1. HERO — Full-width, warm photography background (use placeholder for now).
   Headline: "Compassionate Home Care That Feels Like Family"
   Subheadline: "Personalized in-home care services that help your loved ones
   live independently, safely, and with dignity."
   Two CTAs: "Schedule Free Assessment" (primary) + "Call (XXX) XXX-XXXX" (secondary)
   Subtle parallax or Ken Burns effect on the background image.

2. TRUST BAR — Horizontal row of certification/award logos on muted background.
   "Trusted by 500+ families" or similar social proof line.

3. SERVICES PREVIEW — 4-6 service cards in an asymmetric grid (NOT a boring 3-column).
   Each card: icon, title, 2-line description, "Learn More" link.
   Services: Personal Care, Companion Care, Live-In Care, Respite Care,
   Specialized Care, Veteran Care.
   Staggered scroll-reveal animation.

4. WHY CHOOSE US — Split layout (image left, content right).
   3-4 differentiators with custom icons: Vetted Caregivers, Personalized Plans,
   24/7 Availability, Locally Owned.
   Each with a brief paragraph.

5. STATS COUNTER — Dark-themed section with animated number counters on scroll.
   "20+ Years Experience" / "500+ Families Served" / "98% Satisfaction Rate" /
   "200+ Caregivers". Use Framer Motion for the count-up animation.

6. TESTIMONIALS — Carousel of client/family testimonials.
   Each: quote, name, relationship ("Daughter of client"), star rating.
   Auto-play with manual navigation. Warm background treatment.

7. HOW IT WORKS — 3-step visual process:
   Step 1: Free Consultation → Step 2: Custom Care Plan → Step 3: Meet Your Caregiver
   Connected by a subtle line/path graphic.

8. CTA BANNER — Full-width warm gradient.
   "Ready to discuss care for your loved one?"
   Phone number + "Schedule Free Assessment" button.

Use Framer Motion for all scroll-triggered animations. Follow the design system.
No generic card grids — use intentional asymmetry and whitespace.
```

### Step 4.3 — Build Services Pages

```
Build the services overview page and individual service detail pages.

Overview page: Hero banner + grid of all services with rich cards.

Each service detail page should include:
- Hero with service title and warm image
- What this service includes (bullet list with icons)
- Who it's for (audience description)
- "A Day in the Life" scenario paragraph
- Related services sidebar
- CTA: "Get a Free Assessment for [Service Name]"

Services to create:
1. Personal Care — bathing, grooming, dressing, mobility, medication reminders
2. Companion Care — conversation, activities, errands, meal prep, light housekeeping
3. Live-In Care — 24-hour around-the-clock care, overnight support
4. Respite Care — temporary relief for family caregivers
5. Specialized Care — Alzheimer's/dementia, Parkinson's, post-surgery, chronic conditions
```

### Step 4.4 — Build About Page

```
Build the About Us page:
- Company story section with founder/owner photo placeholder
- Mission & values (3-4 core values with descriptions)
- Team showcase grid (placeholder photos, name, role, brief bio)
- Timeline/history section (company milestones)
- Awards and certifications gallery
- "Join Our Team" CTA linking to careers
```

### Step 4.5 — Build Contact & Assessment Pages

```
Build the Contact page with:
- Split layout: contact form left, contact info right
- Form fields: Name, Email, Phone, Relationship to care recipient,
  Type of care needed (dropdown), Message, Preferred contact method
- Use React Hook Form + Zod validation
- Success toast on submission
- Google Maps embed placeholder for office location
- Office hours display
- Direct phone and email with click-to-action

Also build a standalone "Free Care Assessment" page with a multi-step form:
- Step 1: About the care recipient (name, age, conditions)
- Step 2: Care needs (services interested in, schedule preferences)
- Step 3: Contact information
- Progress indicator at top
- Review step before submission
```

### Step 4.6 — Build Remaining Pages

```
Build these remaining pages:

TESTIMONIALS page:
- Grid of testimonial cards with photos, quotes, ratings
- Filter by service type
- Featured video testimonial section (placeholder)

CAREERS page:
- Why work with us section
- Benefits list
- Current openings (static for now)
- Application CTA

BLOG page:
- Blog listing with featured post hero
- Card grid for posts (static/placeholder content)
- Sidebar: categories, recent posts, newsletter signup

FAQ page:
- Accordion-based Q&A
- Categories: General, Services, Pricing, Caregivers, Getting Started
- CTA at bottom: "Still have questions? Contact us"

LOCATIONS page:
- Service area map (static or interactive)
- List of areas served
- Office contact details
```

### Step 4.7 — SEO & Performance

```
Add SEO and performance optimizations:

1. Metadata for every page (title, description, Open Graph, Twitter cards)
2. JSON-LD structured data:
   - Organization schema on homepage
   - LocalBusiness schema with service area
   - FAQPage schema on FAQ page
   - BreadcrumbList on all pages
3. sitemap.ts (dynamic sitemap generation)
4. robots.ts
5. Optimize all images with next/image
6. Add loading skeletons for dynamic content
7. Ensure Core Web Vitals are green:
   - No layout shift (proper image dimensions)
   - Fast LCP (hero image priority loading)
   - Good FID (minimal JS on initial load)
```

### Commit after each step

```bash
# After each step above:
git add -A
git commit -m "feat: build [section name]"
git push
```

---

## 8. Phase 5 — Quality Assurance

### Step 5.1 — Accessibility audit

In Claude Code:

```
Run an accessibility audit on all pages. Check:
- All images have meaningful alt text
- Color contrast ratios meet WCAG AA
- Keyboard navigation works on all interactive elements
- Focus indicators are visible
- Form labels are properly associated
- ARIA roles are correct on custom components
- Skip-to-content link exists
```

### Step 5.2 — Responsive testing

```
Review all pages for responsive design:
- Mobile (375px) — single column, hamburger nav, touch-friendly targets
- Tablet (768px) — 2-column where appropriate
- Desktop (1280px) — full layout
- Large (1536px+) — max-width container, no stretching

Fix any overflow, text truncation, or layout break issues.
```

### Step 5.3 — Performance check

```bash
# Build and test locally
pnpm build
pnpm start

# Run Lighthouse (in Chrome DevTools or CLI)
npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

### Step 5.4 — Final commit

```bash
git add -A
git commit -m "chore: QA fixes — accessibility, responsive, performance"
git push
```

---

## 9. Phase 6 — Deploy to Vercel & Go Live

### Step 6.1 — Link project to Vercel

```bash
# Login to Vercel (will open browser for auth)
vercel login

# Link this project (follow prompts)
vercel link
```

### Step 6.2 — Configure environment variables (if any)

```bash
# If you have env vars (e.g., for a contact form API, CMS, etc.)
vercel env add NEXT_PUBLIC_SITE_URL
# Enter: https://agingwellcare.com (or your domain)
```

### Step 6.3 — Deploy to preview

```bash
# Deploy to preview URL first
vercel

# This gives you a preview URL like: https://agingwellcare-xxxxx.vercel.app
# Test everything on this URL before going to production
```

### Step 6.4 — Deploy to production

```bash
# When satisfied with preview:
vercel --prod
```

### Step 6.5 — Connect custom domain

1. Go to https://vercel.com/dashboard → your project → Settings → Domains
2. Add your domain: `agingwellcare.com` and `www.agingwellcare.com`
3. Update your domain's DNS records:
   - **A record:** `76.76.21.21` (for apex domain)
   - **CNAME:** `cname.vercel-dns.com` (for www subdomain)
4. Vercel auto-provisions SSL certificates

### Step 6.6 — Post-launch checklist

- [ ] All pages load correctly on production URL
- [ ] Contact form submissions work (or show appropriate message)
- [ ] Phone numbers are clickable on mobile
- [ ] SSL certificate is active (green lock)
- [ ] Google Search Console — submit sitemap
- [ ] Google Business Profile — update website URL
- [ ] Social media profiles — update website links
- [ ] Set up Vercel Analytics (free tier)
- [ ] Test on real devices: iPhone, Android, iPad, desktop browsers

---

## 10. Appendix — Site Architecture & Content Map

### Recommended Content for Each Page

**Homepage**
- Headline: "Compassionate Home Care That Feels Like Family"
- Value props: Independence, Safety, Dignity, Peace of Mind
- Stats: Years in service, families served, satisfaction rate, caregivers

**About Us**
- Story: Why the company was founded (personal experience angle)
- Mission: "To provide exceptional, personalized home care that empowers seniors to live independently with dignity and joy."
- Values: Compassion, Integrity, Excellence, Community

**Services** (common across all home care sites)
- Personal Care (ADLs): Bathing, grooming, dressing, toileting, mobility
- Companion Care: Socialization, errands, meal prep, light housekeeping
- Live-In / 24-Hour Care: Around-the-clock support
- Respite Care: Relief for family caregivers
- Specialized Care: Alzheimer's/dementia, Parkinson's, post-surgery, chronic conditions
- Veteran Care: VA-approved services (if applicable)

**Trust Signals** (inspired by Adult Care Assistance)
- Years of experience
- Background-checked, trained caregivers
- Licensed, bonded, insured
- Industry certifications and awards
- Client satisfaction rate

**FAQ Categories**
- Getting Started: "How do I know if my parent needs home care?"
- Services: "What's the difference between personal care and companion care?"
- Caregivers: "How do you screen and train your caregivers?"
- Pricing: "How much does home care cost?" / "Does insurance cover home care?"
- General: "What areas do you serve?" / "Can I change my care plan?"

### Key Design Patterns from Inspiration Sites

1. **Always-visible phone number** in header (Adult Care Assistance, TheKey)
2. **Zip code / location finder** for multi-location agencies (Griswold, TheKey)
3. **Animated stat counters** on scroll (TheKey)
4. **Video testimonials** alongside text (Griswold)
5. **Multi-step assessment forms** with progress indicators (TheKey)
6. **Trust badge rows** — awards, certifications, BBB (Adult Care Assistance)
7. **Founder/owner story** for personal connection (Adult Care Assistance)
8. **"How It Works" 3-step process** — simplifies the decision to call

---

## Quick Reference — Claude Code Prompts

Here are copy-paste prompts to use inside Claude Code at each phase:

```
# Phase 3 — Design System
/ui-ux-pro-max Generate design system for "AgingWellCare" — premium home care agency. Healthcare/elder care industry. Warm premium style, gold/cream/teal palette. NOT generic medical blue.

# Phase 4 — Build
/frontend-design Review the design system and refine before we start building components.

# During development
/frontend-patterns Apply React/Next.js best practices: compound components, performance, accessibility.

# Quality check
/design-system Run visual audit and AI slop detection on the built pages.
```

---

**You're ready to build.** Run `./install.sh` (see companion script) or follow the manual steps above. Then open Claude Code and start with Phase 3.
