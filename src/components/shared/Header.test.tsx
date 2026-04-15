import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { Header } from "./Header"
import { SITE_NAME, PHONE_NUMBER, PHONE_HREF, NAV_LINKS, SERVICES } from "@/lib/constants"

// Mock next/link to render as plain <a>
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("Header", () => {
  describe("Rendering", () => {
    it("renders the site name / logo", () => {
      render(<Header />)
      expect(screen.getByText(SITE_NAME)).toBeInTheDocument()
    })

    it("renders a nav element with correct role", () => {
      render(<Header />)
      expect(screen.getByRole("navigation")).toBeInTheDocument()
    })

    it("shows all top-level navigation links", () => {
      render(<Header />)
      for (const link of NAV_LINKS) {
        expect(screen.getByRole("link", { name: link.label })).toBeInTheDocument()
      }
    })

    it("all navigation links have correct href values", () => {
      render(<Header />)
      for (const link of NAV_LINKS) {
        const el = screen.getByRole("link", { name: link.label })
        expect(el).toHaveAttribute("href", link.href)
      }
    })

    it("shows phone number as a clickable tel: link", () => {
      render(<Header />)
      const phoneLink = screen.getByRole("link", { name: new RegExp(PHONE_NUMBER.replace(/[()]/g, "\\$&")) })
      expect(phoneLink).toHaveAttribute("href", PHONE_HREF)
    })

    it('shows "Free Care Assessment" CTA button', () => {
      render(<Header />)
      const cta = screen.getByRole("link", { name: /free care assessment/i })
      expect(cta).toBeInTheDocument()
      expect(cta).toHaveAttribute("href", "/assessment")
    })
  })

  describe("Services dropdown", () => {
    it("shows service sub-items when Services is clicked", async () => {
      const user = userEvent.setup()
      render(<Header />)

      const servicesTrigger = screen.getByRole("button", { name: /services/i })
      await user.click(servicesTrigger)

      for (const service of SERVICES) {
        expect(screen.getByRole("link", { name: service.label })).toBeInTheDocument()
      }
    })
  })

  describe("Sticky behavior", () => {
    it("header has sticky positioning classes", () => {
      render(<Header />)
      const header = screen.getByRole("banner")
      expect(header).toBeInTheDocument()
      const className = header.className
      expect(
        className.includes("sticky") || className.includes("fixed") ||
        window.getComputedStyle(header).position === "sticky"
      ).toBe(true)
    })
  })

  describe("Mobile navigation", () => {
    it("shows hamburger menu button on mobile viewport", () => {
      render(<Header />)
      const menuButton = screen.getByRole("button", { name: /open navigation/i })
      expect(menuButton).toBeInTheDocument()
    })

    it("opens Sheet overlay when hamburger is clicked", async () => {
      const user = userEvent.setup()
      render(<Header />)

      const menuButton = screen.getByRole("button", { name: /open navigation/i })
      await user.click(menuButton)

      const dialog = screen.getByRole("dialog")
      expect(dialog).toBeInTheDocument()

      for (const link of NAV_LINKS) {
        expect(within(dialog).getByText(link.label)).toBeInTheDocument()
      }
    })

    it("closes Sheet when a link is clicked", async () => {
      const user = userEvent.setup()
      render(<Header />)

      const menuButton = screen.getByRole("button", { name: /open navigation/i })
      await user.click(menuButton)

      const dialog = screen.getByRole("dialog")
      const aboutLink = within(dialog).getByText("About")
      await user.click(aboutLink)

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("has correct ARIA roles (nav, banner)", () => {
      render(<Header />)
      expect(screen.getByRole("banner")).toBeInTheDocument()
      expect(screen.getByRole("navigation")).toBeInTheDocument()
    })

    it("CTA has link role with assessment href", () => {
      render(<Header />)
      const cta = screen.getByRole("link", { name: /free care assessment/i })
      expect(cta).toHaveAttribute("href", "/assessment")
    })

    it("all interactive elements are keyboard focusable", async () => {
      const user = userEvent.setup()
      render(<Header />)

      await user.tab()
      expect(document.activeElement).not.toBe(document.body)

      const navLinks = NAV_LINKS.length
      for (let i = 0; i < navLinks + 2; i++) {
        await user.tab()
        const active = document.activeElement
        expect(active?.tagName).toMatch(/^(A|BUTTON)$/i)
      }
    })

    it("phone link has descriptive accessible name", () => {
      render(<Header />)
      const phoneLink = screen.getByRole("link", { name: new RegExp(PHONE_NUMBER.replace(/[()]/g, "\\$&")) })
      expect(phoneLink).toBeInTheDocument()
    })
  })

  describe("Touch targets", () => {
    it("CTA button meets minimum 44x44px touch target", () => {
      render(<Header />)
      const cta = screen.getByRole("link", { name: /free care assessment/i })
      const className = cta.className
      expect(
        className.includes("h-11") || className.includes("h-12") ||
        className.includes("min-h-[44px]") || className.includes("py-")
      ).toBe(true)
    })
  })
})
