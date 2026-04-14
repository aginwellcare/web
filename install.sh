#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# AgingWellCare — Automated Setup Script
# ============================================================================
# This script sets up the full development environment for the AgingWellCare
# home care agency website. It installs all dependencies, scaffolds the
# Next.js project, and prepares the workspace for development with Claude Code.
#
# Usage:
#   chmod +x install.sh
#   ./install.sh [OPTIONS]
#
# Options:
#   --skip-plugins    Skip ECC and UI/UX Pro Max plugin installation
#   --skip-scaffold   Skip Next.js project scaffolding (if already done)
#   --dry-run         Print commands without executing
#   --help            Show this help message
# ============================================================================

# --- Colors & Formatting ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# --- Flags ---
SKIP_PLUGINS=false
SKIP_SCAFFOLD=false
DRY_RUN=false

# --- Parse Arguments ---
for arg in "$@"; do
  case $arg in
    --skip-plugins)  SKIP_PLUGINS=true ;;
    --skip-scaffold) SKIP_SCAFFOLD=true ;;
    --dry-run)       DRY_RUN=true ;;
    --help)
      head -20 "$0" | tail -15
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $arg${NC}"
      exit 1
      ;;
  esac
done

# --- Helpers ---
print_header() {
  echo ""
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BOLD}${CYAN}  $1${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
}

print_step() {
  echo -e "${GREEN}  [+]${NC} $1"
}

print_warn() {
  echo -e "${YELLOW}  [!]${NC} $1"
}

print_error() {
  echo -e "${RED}  [x]${NC} $1"
}

run_cmd() {
  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}  [DRY RUN]${NC} $*"
  else
    "$@"
  fi
}

check_command() {
  if ! command -v "$1" &> /dev/null; then
    print_error "$1 is not installed."
    echo -e "         Install it: ${CYAN}$2${NC}"
    return 1
  else
    local version
    version=$("$1" --version 2>/dev/null | head -1 || echo "installed")
    print_step "$1 found: $version"
    return 0
  fi
}

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ============================================================================
print_header "AgingWellCare — Development Environment Setup"
# ============================================================================

echo -e "  Project directory: ${BOLD}$PROJECT_DIR${NC}"
echo -e "  Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# ============================================================================
print_header "Phase 0 — Checking Prerequisites"
# ============================================================================

MISSING=0

check_command "node" "https://nodejs.org or: nvm install 20" || MISSING=$((MISSING + 1))
check_command "pnpm" "npm install -g pnpm" || MISSING=$((MISSING + 1))
check_command "git" "https://git-scm.com" || MISSING=$((MISSING + 1))
check_command "python3" "https://python.org" || MISSING=$((MISSING + 1))

# Optional but recommended
check_command "claude" "npm install -g @anthropic-ai/claude-code" || print_warn "Claude Code CLI not found — you can install it later"
check_command "vercel" "npm install -g vercel" || print_warn "Vercel CLI not found — needed for deployment only"
check_command "gh" "brew install gh (macOS) or https://cli.github.com" || print_warn "GitHub CLI not found — optional"

echo ""

if [ $MISSING -gt 0 ]; then
  print_error "$MISSING required tool(s) missing. Please install them and re-run."
  exit 1
fi

# Check Node version
NODE_MAJOR=$(node -v | cut -d'.' -f1 | tr -d 'v')
if [ "$NODE_MAJOR" -lt 20 ]; then
  print_error "Node.js 20+ required. Current: $(node -v)"
  echo -e "         Run: ${CYAN}nvm install 20 && nvm use 20${NC}"
  exit 1
fi
print_step "Node.js version OK (v$NODE_MAJOR)"

# ============================================================================
print_header "Phase 1 — Claude Code Plugins (ECC + UI/UX Pro Max)"
# ============================================================================

if [ "$SKIP_PLUGINS" = true ]; then
  print_warn "Skipping plugin installation (--skip-plugins)"
else
  echo -e "  ${BOLD}Note:${NC} Plugin installation requires Claude Code to be running."
  echo -e "  The commands below are saved to ${CYAN}plugin-install-commands.txt${NC}"
  echo -e "  Run them inside Claude Code after this script completes."
  echo ""

  cat > "$PROJECT_DIR/plugin-install-commands.txt" << 'PLUGIN_EOF'
# ============================================================================
# Run these commands INSIDE Claude Code (start with: claude)
# ============================================================================

# Step 1: Install Everything Claude Code (ECC) plugin
/plugin marketplace add https://github.com/affaan-m/everything-claude-code
/plugin install ecc@ecc

# Step 2: Install UI/UX Pro Max skill
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill

# Step 3: Verify
/skills list

# You should see these skills available:
# - frontend-design (from ECC)
# - design-system (from ECC)
# - frontend-patterns (from ECC)
# - ui-ux-pro-max (from UI/UX Pro Max)
PLUGIN_EOF

  print_step "Plugin install commands saved to plugin-install-commands.txt"
fi

# ============================================================================
print_header "Phase 2 — Next.js Project Scaffolding"
# ============================================================================

if [ "$SKIP_SCAFFOLD" = true ]; then
  print_warn "Skipping project scaffolding (--skip-scaffold)"
elif [ -f "$PROJECT_DIR/package.json" ]; then
  print_warn "package.json already exists — skipping scaffolding"
  print_warn "To re-scaffold, delete package.json and run again, or use --skip-scaffold"
else
  print_step "Creating Next.js 15 project with TypeScript, Tailwind, App Router..."
  echo ""

  cd "$PROJECT_DIR"

  # Create Next.js app (non-interactive)
  run_cmd pnpm create next-app@latest . \
    --typescript \
    --tailwind \
    --eslint \
    --app \
    --src-dir \
    --import-alias "@/*" \
    --use-pnpm \
    --turbopack

  print_step "Next.js project created successfully"
fi

# ============================================================================
print_header "Phase 2.1 — Initialize shadcn/ui"
# ============================================================================

if [ -f "$PROJECT_DIR/components.json" ]; then
  print_warn "shadcn/ui already initialized (components.json exists)"
else
  print_step "Initializing shadcn/ui..."
  cd "$PROJECT_DIR"

  run_cmd pnpm dlx shadcn@latest init -d

  print_step "shadcn/ui initialized"
fi

# ============================================================================
print_header "Phase 2.2 — Install shadcn/ui Components"
# ============================================================================

print_step "Installing core UI components..."
cd "$PROJECT_DIR"

SHADCN_COMPONENTS=(
  button
  card
  dialog
  sheet
  navigation-menu
  accordion
  tabs
  badge
  separator
  input
  textarea
  label
  select
  form
  toast
  carousel
  avatar
  scroll-area
  dropdown-menu
  tooltip
)

for component in "${SHADCN_COMPONENTS[@]}"; do
  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}  [DRY RUN]${NC} pnpm dlx shadcn@latest add $component"
  else
    echo -e "  Installing: ${CYAN}$component${NC}"
    pnpm dlx shadcn@latest add "$component" -y 2>/dev/null || print_warn "Could not install $component (may already exist)"
  fi
done

print_step "All shadcn/ui components installed"

# ============================================================================
print_header "Phase 2.3 — Install Additional Dependencies"
# ============================================================================

print_step "Installing Framer Motion, React Hook Form, Zod..."

cd "$PROJECT_DIR"
run_cmd pnpm add framer-motion react-hook-form @hookform/resolvers zod lucide-react clsx class-variance-authority

print_step "All dependencies installed"

# ============================================================================
print_header "Phase 2.4 — Create Project Structure"
# ============================================================================

print_step "Creating directory structure..."

DIRS=(
  "src/components/layout"
  "src/components/home"
  "src/components/shared"
  "src/components/forms"
  "src/app/about"
  "src/app/services"
  "src/app/services/personal-care"
  "src/app/services/companion-care"
  "src/app/services/live-in-care"
  "src/app/services/respite-care"
  "src/app/services/specialized-care"
  "src/app/locations"
  "src/app/careers"
  "src/app/blog"
  "src/app/blog/[slug]"
  "src/app/contact"
  "src/app/testimonials"
  "src/app/faq"
  "src/app/free-assessment"
  "src/lib"
  "src/styles"
  "public/images"
  "public/images/team"
  "public/images/services"
  "public/images/testimonials"
  "public/icons"
  "design-system"
)

for dir in "${DIRS[@]}"; do
  run_cmd mkdir -p "$PROJECT_DIR/$dir"
done

print_step "Directory structure created"

# ============================================================================
print_header "Phase 2.5 — Create CLAUDE.md Configuration"
# ============================================================================

print_step "Writing CLAUDE.md project instructions..."

cat > "$PROJECT_DIR/CLAUDE.md" << 'CLAUDE_EOF'
# AgingWellCare — Claude Code Project Instructions

## Project Overview
AgingWellCare is a premium home care agency website built with Next.js 15 (App Router), shadcn/ui, Tailwind CSS, and Framer Motion.

## Tech Stack
- **Framework:** Next.js 15 with App Router and TypeScript
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui (in src/components/ui/)
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Package Manager:** pnpm

## Design Philosophy
- **Warm premium** — Gold/cream warmth, NOT generic medical blue or AI-slop purple gradients
- **Trust-first** — Awards, certifications, testimonials prominently displayed
- **Intentional layouts** — Use asymmetry, whitespace, and visual hierarchy. No cookie-cutter grids
- **Meaningful motion** — Animations reveal hierarchy and guide attention, not decorative noise
- **Accessible** — WCAG AA minimum, keyboard navigable, proper ARIA roles

## Code Conventions
- Use TypeScript strict mode
- Use server components by default, 'use client' only when needed
- All components in src/components/ organized by feature
- shadcn/ui components live in src/components/ui/ (do not modify these)
- Custom components use the design system tokens from tailwind.config.ts
- Use next/image for all images
- Use next/link for all internal links
- Use next/font for typography

## File Structure
- src/app/ — Pages (App Router)
- src/components/layout/ — Header, Footer, Mobile Nav
- src/components/home/ — Homepage-specific components
- src/components/shared/ — Reusable components across pages
- src/components/forms/ — Form components
- src/components/ui/ — shadcn/ui base components
- src/lib/ — Utilities, constants, types
- public/images/ — Static images
- design-system/ — Generated design tokens and documentation

## Design System
Check design-system/MASTER.md for the authoritative color palette, typography scale, spacing system, and motion tokens. Apply these consistently.

## Target Audience
Adult children (ages 40-65) making care decisions for aging parents. The site should feel trustworthy, warm, professional, and approachable — never cold or clinical.

## Key Pages
Homepage, About, Services (6 sub-pages), Locations, Careers, Blog, Contact, Testimonials, FAQ, Free Care Assessment

## SEO Requirements
- Metadata on every page (title, description, Open Graph)
- JSON-LD structured data (Organization, LocalBusiness, FAQPage, BreadcrumbList)
- Dynamic sitemap.ts and robots.ts
- Semantic HTML throughout
CLAUDE_EOF

print_step "CLAUDE.md created"

# ============================================================================
print_header "Phase 2.6 — Create Placeholder Constants"
# ============================================================================

cat > "$PROJECT_DIR/src/lib/constants.ts" << 'CONST_EOF'
export const SITE_CONFIG = {
  name: "AgingWellCare",
  tagline: "Compassionate Home Care That Feels Like Family",
  description:
    "Personalized in-home care services that help your loved ones live independently, safely, and with dignity.",
  phone: "(555) 123-4567",
  email: "info@agingwellcare.com",
  address: {
    street: "123 Care Avenue, Suite 100",
    city: "Your City",
    state: "ST",
    zip: "12345",
  },
  social: {
    facebook: "https://facebook.com/agingwellcare",
    instagram: "https://instagram.com/agingwellcare",
    linkedin: "https://linkedin.com/company/agingwellcare",
  },
  hours: {
    office: "Monday - Friday, 8:00 AM - 6:00 PM",
    care: "24/7 Care Available",
  },
} as const;

export const SERVICES = [
  {
    slug: "personal-care",
    title: "Personal Care",
    shortDescription:
      "Assistance with daily living activities including bathing, grooming, dressing, and mobility support.",
    icon: "Heart",
  },
  {
    slug: "companion-care",
    title: "Companion Care",
    shortDescription:
      "Meaningful companionship, engaging activities, errands, meal preparation, and light housekeeping.",
    icon: "Users",
  },
  {
    slug: "live-in-care",
    title: "Live-In Care",
    shortDescription:
      "Around-the-clock support from a dedicated caregiver who lives in your loved one's home.",
    icon: "Home",
  },
  {
    slug: "respite-care",
    title: "Respite Care",
    shortDescription:
      "Temporary relief for family caregivers so you can recharge while your loved one is cared for.",
    icon: "Sun",
  },
  {
    slug: "specialized-care",
    title: "Specialized Care",
    shortDescription:
      "Expert care for Alzheimer's, dementia, Parkinson's, post-surgery recovery, and chronic conditions.",
    icon: "Shield",
  },
] as const;

export const STATS = [
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Families Served" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
  { value: 200, suffix: "+", label: "Caregivers" },
] as const;

export const NAV_ITEMS = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Personal Care", href: "/services/personal-care" },
      { label: "Companion Care", href: "/services/companion-care" },
      { label: "Live-In Care", href: "/services/live-in-care" },
      { label: "Respite Care", href: "/services/respite-care" },
      { label: "Specialized Care", href: "/services/specialized-care" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Locations", href: "/locations" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
CONST_EOF

print_step "Site constants created at src/lib/constants.ts"

# ============================================================================
print_header "Phase 2.7 — Git Commit"
# ============================================================================

cd "$PROJECT_DIR"

if [ "$DRY_RUN" = true ]; then
  print_warn "[DRY RUN] Would commit scaffolded project"
else
  # Only commit if there are changes
  if [ -n "$(git status --porcelain)" ]; then
    git add -A
    git commit -m "chore: scaffold Next.js 15 with shadcn/ui, Tailwind, Framer Motion

- Next.js 15 App Router with TypeScript
- shadcn/ui components initialized (20 components)
- Framer Motion, React Hook Form, Zod installed
- Full directory structure for all pages
- CLAUDE.md project instructions
- Site constants and configuration
- Design system directory prepared"

    print_step "Initial commit created"

    # Push if remote exists
    if git remote get-url origin &>/dev/null; then
      print_step "Pushing to origin..."
      git push -u origin main 2>/dev/null || git push -u origin master 2>/dev/null || print_warn "Could not push — you may need to push manually"
    fi
  else
    print_warn "No changes to commit"
  fi
fi

# ============================================================================
print_header "Setup Complete!"
# ============================================================================

echo -e "  ${BOLD}${GREEN}AgingWellCare project is ready for development.${NC}"
echo ""
echo -e "  ${BOLD}Next steps:${NC}"
echo ""
echo -e "  ${CYAN}1.${NC} Install Claude Code plugins (if not already done):"
echo -e "     ${CYAN}cat plugin-install-commands.txt${NC}"
echo ""
echo -e "  ${CYAN}2.${NC} Start the dev server:"
echo -e "     ${CYAN}pnpm dev${NC}"
echo ""
echo -e "  ${CYAN}3.${NC} Open Claude Code and generate the design system:"
echo -e "     ${CYAN}claude${NC}"
echo -e "     Then run the prompts from BUILD_GUIDE.md Phase 3"
echo ""
echo -e "  ${CYAN}4.${NC} Build pages following BUILD_GUIDE.md Phase 4"
echo ""
echo -e "  ${CYAN}5.${NC} Deploy to Vercel:"
echo -e "     ${CYAN}vercel --prod${NC}"
echo ""
echo -e "  ${BOLD}Documentation:${NC} BUILD_GUIDE.md"
echo -e "  ${BOLD}Plugin commands:${NC} plugin-install-commands.txt"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
