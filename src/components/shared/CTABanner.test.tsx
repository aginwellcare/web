import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { CTABanner } from "./CTABanner"
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("CTABanner", () => {
  it("renders default heading", () => {
    render(<CTABanner />)
    expect(screen.getByRole("heading")).toBeInTheDocument()
  })

  it("renders custom heading when provided", () => {
    render(<CTABanner heading="Custom CTA Heading" />)
    expect(screen.getByText("Custom CTA Heading")).toBeInTheDocument()
  })

  it("shows phone number as clickable tel: link", () => {
    render(<CTABanner />)
    const phoneLink = screen.getByRole("link", { name: new RegExp(PHONE_NUMBER.replace(/[()]/g, "\\$&")) })
    expect(phoneLink).toHaveAttribute("href", PHONE_HREF)
  })

  it("shows Free Care Assessment link to /assessment", () => {
    render(<CTABanner />)
    const cta = screen.getByRole("link", { name: /free care assessment/i })
    expect(cta).toHaveAttribute("href", "/assessment")
  })

  it("renders as a section element", () => {
    render(<CTABanner />)
    const section = screen.getByRole("heading").closest("section")
    expect(section).toBeInTheDocument()
  })
})
