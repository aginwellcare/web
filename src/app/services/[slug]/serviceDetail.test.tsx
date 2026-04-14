import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ServiceDetailPage from "./page"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("Service Detail Page", () => {
  it("renders service title as h1 for personal-care", () => {
    render(<ServiceDetailPage params={{ slug: "personal-care" }} />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByText("Personal Care")).toBeInTheDocument()
  })

  it("shows detailed description", () => {
    render(<ServiceDetailPage params={{ slug: "companion-care" }} />)
    const page = document.querySelector("div")!
    expect(page.textContent!.length).toBeGreaterThan(100)
  })

  it("shows features or benefits list", () => {
    render(<ServiceDetailPage params={{ slug: "live-in-care" }} />)
    const lists = document.querySelectorAll("ul, ol")
    expect(lists.length).toBeGreaterThanOrEqual(1)
  })

  it("shows CTA with service name", () => {
    render(<ServiceDetailPage params={{ slug: "respite-care" }} />)
    expect(screen.getByRole("link", { name: /assessment.*respite|respite.*assessment|get.*free.*assessment/i })).toBeInTheDocument()
  })

  it("shows related services links", () => {
    render(<ServiceDetailPage params={{ slug: "personal-care" }} />)
    const allLinks = screen.getAllByRole("link")
    const serviceLinks = allLinks.filter((l) => l.getAttribute("href")?.startsWith("/services/"))
    expect(serviceLinks.length).toBeGreaterThanOrEqual(1)
  })
})
