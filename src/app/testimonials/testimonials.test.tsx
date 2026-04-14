import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import TestimonialsPage from "./page"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("Testimonials Page", () => {
  it("renders page heading", () => {
    render(<TestimonialsPage />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("shows testimonial cards with quotes", () => {
    render(<TestimonialsPage />)
    expect(screen.getByText(/changed our lives/i)).toBeInTheDocument()
  })

  it("shows author name and relationship", () => {
    render(<TestimonialsPage />)
    // All testimonials show at once, find one specific author
    const footer = screen.getByText("Sarah M.")
    expect(footer).toBeInTheDocument()
    // Relationship text appears near the name
    expect(screen.getAllByText(/daughter of client/i).length).toBeGreaterThanOrEqual(1)
  })

  it("has filter controls for service types", () => {
    render(<TestimonialsPage />)
    const tabs = screen.getAllByRole("tab")
    expect(tabs.length).toBeGreaterThanOrEqual(2)
  })
})
