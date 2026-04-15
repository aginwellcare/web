import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { HeroSection } from "./HeroSection"
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}))

describe("HeroSection", () => {
  it("renders the main headline as h1", () => {
    render(<HeroSection />)
    const h1 = screen.getByRole("heading", { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1.textContent!.length).toBeGreaterThan(10)
  })

  it("renders a subheadline or supporting text", () => {
    render(<HeroSection />)
    const section = document.querySelector("section")!
    expect(section.textContent!.length).toBeGreaterThan(50)
  })

  it("shows CTA linking to /assessment", () => {
    render(<HeroSection />)
    const cta = screen.getByRole("link", { name: /get started|free assessment|schedule/i })
    expect(cta).toHaveAttribute("href", "/assessment")
  })

  it("shows phone number", () => {
    render(<HeroSection />)
    expect(screen.getByText(new RegExp(PHONE_NUMBER.replace(/[()]/g, "\\$&")))).toBeInTheDocument()
  })

  it("CTA button has minimum 44px touch target", () => {
    render(<HeroSection />)
    const cta = screen.getByRole("link", { name: /get started|free assessment|schedule/i })
    const className = cta.className
    expect(
      className.includes("h-11") || className.includes("h-12") ||
      className.includes("min-h-[44px]")
    ).toBe(true)
  })
})
