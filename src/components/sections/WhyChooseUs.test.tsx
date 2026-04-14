import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { WhyChooseUs } from "./WhyChooseUs"

describe("WhyChooseUs", () => {
  it("renders a section heading", () => {
    render(<WhyChooseUs />)
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
  })

  it("shows 4 differentiators", () => {
    render(<WhyChooseUs />)
    expect(screen.getByText(/vetted caregiver/i)).toBeInTheDocument()
    expect(screen.getByText(/personalized care plan/i)).toBeInTheDocument()
    expect(screen.getByText(/24\/7 availability/i)).toBeInTheDocument()
    expect(screen.getByText(/licensed & insured/i)).toBeInTheDocument()
  })

  it("each differentiator has a description", () => {
    render(<WhyChooseUs />)
    const section = document.querySelector("section")!
    expect(section.textContent!.length).toBeGreaterThan(100)
  })
})
