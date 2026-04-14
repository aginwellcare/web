import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { HeroSection } from "./HeroSection"
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("HeroSection", () => {
  it("renders the main headline as h1", () => {
    render(<HeroSection />)
    const h1 = screen.getByRole("heading", { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1.textContent!.length).toBeGreaterThan(10)
  })

  it("renders a subheadline", () => {
    render(<HeroSection />)
    const hero = screen.getByRole("heading", { level: 1 }).parentElement!
    // Should have more text than just the headline
    expect(hero.textContent!.length).toBeGreaterThan(50)
  })

  it("shows Schedule Free Assessment CTA linking to /assessment", () => {
    render(<HeroSection />)
    const cta = screen.getByRole("link", { name: /schedule free assessment|free assessment/i })
    expect(cta).toHaveAttribute("href", "/assessment")
  })

  it("shows phone number CTA as tel: link", () => {
    render(<HeroSection />)
    const phoneLink = screen.getByRole("link", { name: new RegExp(PHONE_NUMBER.replace(/[()]/g, "\\$&")) })
    expect(phoneLink).toHaveAttribute("href", PHONE_HREF)
  })

  it("CTA buttons have minimum 44px touch targets", () => {
    render(<HeroSection />)
    const cta = screen.getByRole("link", { name: /schedule free assessment|free assessment/i })
    const className = cta.className
    expect(
      className.includes("h-11") || className.includes("h-12") ||
      className.includes("min-h-[44px]") || className.includes("py-3")
    ).toBe(true)
  })
})
