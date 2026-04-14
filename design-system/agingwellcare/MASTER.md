# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** AgingWellCare
**Generated:** 2026-04-14
**Category:** Home Care / Elder Care — Premium Marketing Site
**Target Audience:** Adult children (40-65) researching care for aging parents

---

## Design Direction

**Warm premium** — NOT generic medical blue, NOT AI-slop purple gradients, NOT cold corporate.

Inspired by:
- **TheKey.com** — premium feel, animated stats, dark teal sections, gold warmth
- **GriswoldCare.com** — community warmth, approachable, trust-forward
- **AdultCareAssistance.com** — trust badges, certifications, authority signals

**Feel:** Trustworthy, warm, professional, human, premium but approachable.

---

## Global Rules

### Color Palette

| Role | Hex | oklch | CSS Variable | Usage |
|------|-----|-------|--------------|-------|
| Primary (Dark Teal) | `#0F5C5E` | `oklch(0.42 0.08 180)` | `--primary` | Headers, nav, primary actions |
| Primary Foreground | `#FAF7F2` | `oklch(0.97 0.01 80)` | `--primary-foreground` | Text on primary backgrounds |
| Secondary (Warm Gold) | `#B8860B` | `oklch(0.62 0.14 80)` | `--secondary` | Accents, highlights, CTAs |
| Secondary Foreground | `#FFFDF7` | `oklch(0.99 0.01 80)` | `--secondary-foreground` | Text on gold backgrounds |
| Background (Warm Cream) | `#FAF7F2` | `oklch(0.97 0.01 80)` | `--background` | Page background |
| Foreground (Warm Charcoal) | `#2C2825` | `oklch(0.24 0.02 60)` | `--foreground` | Body text (NOT pure black) |
| Muted | `#F0EBE3` | `oklch(0.93 0.02 80)` | `--muted` | Secondary backgrounds, borders |
| Muted Foreground | `#6B635A` | `oklch(0.48 0.03 60)` | `--muted-foreground` | Subtle text, captions |
| Card | `#FFFFFF` | `oklch(1.0 0 0)` | `--card` | Card backgrounds |
| Card Foreground | `#2C2825` | `oklch(0.24 0.02 60)` | `--card-foreground` | Card text |
| Accent (Light Teal) | `#E6F2F2` | `oklch(0.94 0.03 180)` | `--accent` | Hover states, subtle highlights |
| Accent Foreground | `#0F5C5E` | `oklch(0.42 0.08 180)` | `--accent-foreground` | Text on accent backgrounds |
| Destructive | `#C53030` | `oklch(0.45 0.18 25)` | `--destructive` | Error states, form validation |
| Ring | `#0F5C5E` | — | `--ring` | Focus ring color |
| Border | `#E5DED4` | `oklch(0.90 0.02 75)` | `--border` | Card borders, dividers |

**Color Notes:** Dark teal anchors trust/professionalism. Warm gold signals premium quality. Cream background avoids clinical sterility. Warm charcoal text (not pure black) maintains softness.

**Contrast Ratios (verified targets):**
- Foreground `#2C2825` on Background `#FAF7F2`: ~13:1 (exceeds AAA 7:1 target for elderly audience)
- Primary Foreground `#FAF7F2` on Primary `#0F5C5E`: ~7.5:1 (AAA compliant)
- Muted Foreground `#6B635A` on Background `#FAF7F2`: ~5:1 (exceeds AA 4.5:1)

### Extended Palette (non-shadcn semantic colors)

| Name | Hex | Usage |
|------|-----|-------|
| Teal Dark | `#07272D` | Stats counter background (inspired by TheKey), footer |
| Gold Light | `#F5E6C0` | CTA banner backgrounds, warm section fills |
| Sage | `#8B9A7B` | Secondary accent for nature/care associations |
| Cream Dark | `#EDE6D8` | Alternate section backgrounds |

---

### Typography

**Pairing:** Classic Elegant (Serif headings + Sans body)

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Heading | Playfair Display | 500, 600, 700 | h1-h4, hero headlines, section titles |
| Body | Inter | 400, 500, 600 | Body text, buttons, nav, form labels |

**Mood:** Elegant, warm, trustworthy, premium, readable
**Why:** Playfair Display's high-contrast serif conveys premium quality and warmth without being cold or clinical. Inter's clean geometry ensures readability for the 40-65 age demographic.

**Load via `next/font/google`** — NOT CSS @import (performance).

**Type Scale (mobile-first):**

| Element | Mobile | Desktop | Weight | Font |
|---------|--------|---------|--------|------|
| h1 | 2rem (32px) | 3rem (48px) | 700 | Playfair Display |
| h2 | 1.5rem (24px) | 2.25rem (36px) | 600 | Playfair Display |
| h3 | 1.25rem (20px) | 1.5rem (24px) | 600 | Playfair Display |
| h4 | 1.125rem (18px) | 1.25rem (20px) | 500 | Playfair Display |
| Body | 1rem (16px) | 1rem (16px) | 400 | Inter |
| Body Large | 1.125rem (18px) | 1.25rem (20px) | 400 | Inter |
| Small/Caption | 0.875rem (14px) | 0.875rem (14px) | 400 | Inter |
| Button | 0.9375rem (15px) | 1rem (16px) | 600 | Inter |

**Line Height:** 1.6 for body text (generous for readability), 1.2 for headings
**Max Line Length:** 65-75 characters per line (`max-w-prose` or `max-w-2xl`)

---

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `0.25rem` (4px) | Tight inline gaps |
| `--space-sm` | `0.5rem` (8px) | Icon gaps, badge padding |
| `--space-md` | `1rem` (16px) | Standard padding, card gaps |
| `--space-lg` | `1.5rem` (24px) | Card padding, group spacing |
| `--space-xl` | `2rem` (32px) | Section inner padding |
| `--space-2xl` | `3rem` (48px) | Section vertical gaps |
| `--space-3xl` | `4rem` (64px) | Hero padding, major section breaks |
| `--space-4xl` | `6rem` (96px) | Desktop section vertical spacing |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `0.375rem` (6px) | Badges, small elements |
| `--radius-md` | `0.5rem` (8px) | Buttons, inputs |
| `--radius-lg` | `0.75rem` (12px) | Cards, dialogs |
| `--radius-xl` | `1rem` (16px) | Hero images, featured cards |

### Shadows

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(44,40,37,0.06)` | Subtle lift, badges |
| `--shadow-md` | `0 4px 12px rgba(44,40,37,0.08)` | Cards, buttons on hover |
| `--shadow-lg` | `0 12px 24px rgba(44,40,37,0.10)` | Featured cards, modals |

Note: Shadows use warm charcoal (`#2C2825`) tint, not pure black.

---

## Component Specs (shadcn/ui + Tailwind)

### Buttons

```
Primary CTA:
  bg: secondary (gold #B8860B)
  text: secondary-foreground (white)
  hover: darken 10% + translateY(-1px)
  size: h-11 px-6 (min 44px touch target)
  font: Inter 600
  radius: radius-md (8px)
  transition: all 200ms ease

Secondary CTA:
  bg: primary (teal #0F5C5E)
  text: primary-foreground (cream)
  hover: lighten 10% + translateY(-1px)
  size: h-11 px-6
  font: Inter 600
  radius: radius-md

Outline:
  border: 2px solid primary
  text: primary
  bg: transparent
  hover: bg primary/10

Ghost:
  bg: transparent
  text: foreground
  hover: bg accent
```

### Cards

```
Default:
  bg: card (white)
  border: 1px solid border (#E5DED4)
  radius: radius-lg (12px)
  padding: space-lg (24px)
  shadow: shadow-sm -> shadow-md on hover
  transition: all 200ms ease
  cursor: pointer (if clickable)
```

### Inputs

```
Default:
  border: 1px solid border (#E5DED4)
  radius: radius-md (8px)
  padding: 12px 16px
  font-size: 16px (prevents iOS zoom)
  focus: ring-2 ring-primary/40 border-primary
  error: border-destructive ring-destructive/30
```

---

## Page Patterns

### Section Backgrounds (alternating rhythm)

1. **Cream** (`--background`) — default sections
2. **White** (`--card`) — card-heavy sections (services, testimonials)
3. **Light Teal** (`--accent`) — trust bar, how-it-works
4. **Dark Teal** (`--teal-dark #07272D`) — stats counter (high-impact)
5. **Gold Light** (`--gold-light #F5E6C0`) — CTA banners

This alternating pattern creates visual rhythm without monotony.

### Homepage Section Order

1. Hero (cream bg, parallax image, two CTAs)
2. Trust Bar (light teal bg, certification logos)
3. Services Preview (white bg, staggered card grid)
4. Why Choose Us (cream bg, split image/content)
5. Stats Counter (dark teal bg, white/gold text, animated numbers)
6. Testimonials Carousel (cream dark bg, flat cards)
7. How It Works (light teal bg, 3-step process)
8. CTA Banner (gold light bg, phone + assessment button)

---

## Animation Guidelines

**Library:** Framer Motion (imported as `motion/react`)
**Global:** `<MotionConfig reducedMotion="user">` wraps the app

| Pattern | Duration | Easing | Notes |
|---------|----------|--------|-------|
| Fade-in reveal | 500ms | easeOut | `whileInView`, `viewport={{ once: true }}` |
| Stagger children | 120ms gap | easeOut | Parent `staggerChildren: 0.12` |
| Stat counter | 2000ms | linear | `useInView` + `setInterval`, rolling digits |
| Card hover | 200ms | ease | `translateY(-2px)` + shadow increase |
| Page transition | 300ms | easeOut | Fade only, no slide |

**Rules:**
- Only animate `opacity` and `transform` (GPU compositor)
- Never animate `width`, `height`, `padding` (triggers reflow)
- All motion components require `"use client"` — extract thin wrappers
- `viewport={{ once: true }}` on all scroll animations (no re-trigger)

---

## Accessibility Requirements

| Requirement | Target | Notes |
|-------------|--------|-------|
| Color contrast (body text) | 7:1 (AAA) | Elderly audience — exceed minimum AA |
| Color contrast (large text) | 4.5:1 (AA) | Headings 18px+ |
| Touch targets | 44x44px minimum | All buttons, links, nav items |
| Focus ring | 3px solid, 3:1 contrast | Visible on all interactive elements |
| Skip link | First focusable element | "Skip to main content" |
| Form labels | Persistent `<label>` | Never placeholder-only |
| Form errors | Color + text + `aria-describedby` | Not color alone |
| Reduced motion | `prefers-reduced-motion` respected | Via MotionConfig |
| Heading hierarchy | One h1 per page, logical order | No skipped levels |
| Images | Descriptive alt text | Empty alt="" for decorative only |

---

## Anti-Patterns (Do NOT Use)

- **Generic medical blue** (#0369A1 or similar) — feels clinical, cold
- **AI purple/pink gradients** — feels cheap, not trustworthy
- **Glassmorphism** — poor readability for elderly audience
- **Pure black text** (#000000) — too harsh on cream background
- **Pure white background** (#FFFFFF for page bg) — too sterile for healthcare warmth
- **SaaS card grids** — this is not a SaaS product
- **Decorative blobs/shapes** — no floating circles, no abstract gradients
- **Emojis as icons** — use Lucide React SVG icons only
- **Small text** (<14px anywhere) — audience has declining vision
- **Complex navigation** — max 7 top-level items
- **Layout-shifting hover** — no scale transforms that move surrounding content
- **Dark mode** — not needed for a marketing site, adds unnecessary complexity

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] Colors match this palette (no medical blue, no generic gray)
- [ ] Headings use Playfair Display, body uses Inter
- [ ] No emojis used as icons (Lucide React SVGs only)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Body text contrast >= 7:1 against background
- [ ] Touch targets >= 44x44px
- [ ] Focus states visible (3px ring, 3:1 contrast)
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 320px, 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile
- [ ] No content hidden behind sticky header
- [ ] Phone numbers use `tel:` links
- [ ] All section backgrounds follow alternating rhythm
