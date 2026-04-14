import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { TestimonialsCarousel } from "./TestimonialsCarousel"

describe("TestimonialsCarousel", () => {
  it("renders testimonial quotes", () => {
    render(<TestimonialsCarousel />)
    // Should show at least one testimonial
    const section = document.querySelector("section")!
    expect(section.textContent!.length).toBeGreaterThan(20)
  })

  it("shows testimonial author names", () => {
    render(<TestimonialsCarousel />)
    // Should have at least one name visible
    expect(screen.getByText(/Sarah|James|Linda/)).toBeInTheDocument()
  })

  it("shows relationship to client", () => {
    render(<TestimonialsCarousel />)
    expect(screen.getByText(/daughter|son/i)).toBeInTheDocument()
  })

  it("has navigation buttons", () => {
    render(<TestimonialsCarousel />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it("renders as a section element", () => {
    render(<TestimonialsCarousel />)
    expect(document.querySelector("section")).toBeInTheDocument()
  })
})
