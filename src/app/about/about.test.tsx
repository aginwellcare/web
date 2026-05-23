import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import AboutPage from "./page"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("About Page", () => {
  it("renders page heading", () => {
    render(<AboutPage />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("shows company story section", () => {
    render(<AboutPage />)
    const page = document.querySelector("div")!
    expect(page.textContent!.length).toBeGreaterThan(100)
  })

  it("shows mission and values", () => {
    render(<AboutPage />)
    expect(screen.getByRole("heading", { name: /mission/i })).toBeInTheDocument()
  })

  it("shows team members with names and roles", () => {
    render(<AboutPage />)
    expect(screen.getByText(/Natasha Rreshka/i)).toBeInTheDocument()
    expect(screen.getByText(/Margaret Whitfield/i)).toBeInTheDocument()
  })

  it("shows our promise section", () => {
    render(<AboutPage />)
    expect(screen.getByRole("heading", { name: /promise/i })).toBeInTheDocument()
  })

  it("shows locally owned section", () => {
    render(<AboutPage />)
    expect(screen.getByRole("heading", { name: /locally owned/i })).toBeInTheDocument()
  })

  it("shows CTA at bottom", () => {
    render(<AboutPage />)
    expect(screen.getByRole("link", { name: /free care assessment|contact|get started/i })).toBeInTheDocument()
  })
})
