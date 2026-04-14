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
    expect(screen.getByText(/Sarah Johnson/i)).toBeInTheDocument()
    expect(screen.getByText(/Michael Chen/i)).toBeInTheDocument()
  })

  it("shows company timeline or milestones", () => {
    render(<AboutPage />)
    expect(screen.getByRole("heading", { name: /timeline/i })).toBeInTheDocument()
  })

  it("shows awards or certifications section", () => {
    render(<AboutPage />)
    expect(screen.getByRole("heading", { name: /award/i })).toBeInTheDocument()
  })

  it("shows CTA at bottom", () => {
    render(<AboutPage />)
    expect(screen.getByRole("link", { name: /free care assessment|contact|get started/i })).toBeInTheDocument()
  })
})
