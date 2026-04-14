import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Footer } from "./Footer"
import {
  SITE_NAME,
  PHONE_NUMBER,
  PHONE_HREF,
  EMAIL,
  SERVICES,
  SOCIAL_LINKS,
  COMPANY_INFO,
} from "@/lib/constants"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("Footer", () => {
  describe("Structure", () => {
    it("renders a footer element with contentinfo role", () => {
      render(<Footer />)
      expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    })

    it("renders the site name / logo", () => {
      render(<Footer />)
      expect(screen.getByText(SITE_NAME)).toBeInTheDocument()
    })

    it("renders a brief company description", () => {
      render(<Footer />)
      const footer = screen.getByRole("contentinfo")
      expect(footer.textContent!.length).toBeGreaterThan(50)
    })
  })

  describe("Company Info column", () => {
    it("shows phone number as clickable tel: link", () => {
      render(<Footer />)
      const phoneLinks = screen.getAllByRole("link", { name: new RegExp(PHONE_NUMBER.replace(/[()]/g, "\\$&")) })
      const telLink = phoneLinks.find((el) => el.getAttribute("href") === PHONE_HREF)
      expect(telLink).toBeDefined()
    })

    it("shows email as clickable mailto: link", () => {
      render(<Footer />)
      const emailLink = screen.getByRole("link", { name: new RegExp(EMAIL) })
      expect(emailLink).toHaveAttribute("href", `mailto:${EMAIL}`)
    })

    it("shows company address", () => {
      render(<Footer />)
      expect(screen.getByText(new RegExp(COMPANY_INFO.address))).toBeInTheDocument()
    })

    it("shows office hours", () => {
      render(<Footer />)
      expect(screen.getByText(new RegExp(COMPANY_INFO.hours))).toBeInTheDocument()
    })
  })

  describe("Quick Links column", () => {
    it("renders main navigation links", () => {
      render(<Footer />)
      const aboutLink = screen.getByRole("link", { name: "About" })
      expect(aboutLink).toHaveAttribute("href", "/about")

      const contactLink = screen.getByRole("link", { name: "Contact" })
      expect(contactLink).toHaveAttribute("href", "/contact")

      const careersLink = screen.getByRole("link", { name: "Careers" })
      expect(careersLink).toHaveAttribute("href", "/careers")
    })
  })

  describe("Services column", () => {
    it("renders links to all 5 service detail pages", () => {
      render(<Footer />)
      for (const service of SERVICES) {
        const link = screen.getByRole("link", { name: service.label })
        expect(link).toHaveAttribute("href", service.href)
      }
    })
  })

  describe("Social links", () => {
    it("renders social media links for Facebook, Instagram, LinkedIn", () => {
      render(<Footer />)
      for (const social of SOCIAL_LINKS) {
        const link = screen.getByRole("link", { name: new RegExp(social.label, "i") })
        expect(link).toHaveAttribute("href", social.href)
      }
    })

    it("social links open in new tab", () => {
      render(<Footer />)
      for (const social of SOCIAL_LINKS) {
        const link = screen.getByRole("link", { name: new RegExp(social.label, "i") })
        expect(link).toHaveAttribute("target", "_blank")
        expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"))
      }
    })
  })

  describe("Trust badges", () => {
    it("renders trust badge section", () => {
      render(<Footer />)
      expect(
        screen.getByText(/licensed/i) ||
        screen.getByText(/bonded/i) ||
        screen.getByText(/certified/i) ||
        screen.getByText(/accredited/i)
      ).toBeInTheDocument()
    })
  })

  describe("Bottom bar", () => {
    it("shows copyright text with current year", () => {
      render(<Footer />)
      const currentYear = new Date().getFullYear().toString()
      // Match copyright line containing both year and site name
      expect(screen.getByText(new RegExp(`${currentYear}.*${SITE_NAME}`))).toBeInTheDocument()
    })

    it("shows privacy policy link", () => {
      render(<Footer />)
      const link = screen.getByRole("link", { name: /privacy/i })
      expect(link).toHaveAttribute("href", "/privacy")
    })

    it("shows accessibility statement link", () => {
      render(<Footer />)
      const link = screen.getByRole("link", { name: /accessibility/i })
      expect(link).toHaveAttribute("href", "/accessibility")
    })
  })

  describe("Accessibility", () => {
    it("has navigation role on footer nav sections", () => {
      render(<Footer />)
      const navs = screen.getAllByRole("navigation")
      expect(navs.length).toBeGreaterThanOrEqual(1)
    })

    it("all links have descriptive accessible names", () => {
      render(<Footer />)
      const links = screen.getAllByRole("link")
      for (const link of links) {
        const name = link.getAttribute("aria-label") || link.textContent
        expect(name!.trim().length).toBeGreaterThan(0)
      }
    })
  })
})
