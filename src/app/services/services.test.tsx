import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ServicesPage from "./page"
import { SERVICES } from "@/lib/constants"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("Services Overview Page", () => {
  it("renders a page heading", () => {
    render(<ServicesPage />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("shows all 5 service cards", () => {
    render(<ServicesPage />)
    for (const service of SERVICES) {
      expect(screen.getByText(service.label)).toBeInTheDocument()
    }
  })

  it("each service card links to its detail page", () => {
    render(<ServicesPage />)
    for (const service of SERVICES) {
      const link = screen.getByRole("link", { name: new RegExp(service.label) })
      expect(link).toHaveAttribute("href", service.href)
    }
  })

  it("each service card has a description", () => {
    render(<ServicesPage />)
    const main = document.querySelector("main, div")!
    expect(main.textContent!.length).toBeGreaterThan(200)
  })

  it("shows CTABanner at bottom", () => {
    render(<ServicesPage />)
    expect(screen.getByRole("link", { name: /free care assessment/i })).toBeInTheDocument()
  })
})
