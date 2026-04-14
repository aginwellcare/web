import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { StatsCounter } from "./StatsCounter"

describe("StatsCounter", () => {
  it("renders 4 stat items", () => {
    render(<StatsCounter />)
    const section = document.querySelector("section")!
    // Should have stat labels
    expect(screen.getByText(/years/i)).toBeInTheDocument()
    expect(screen.getByText(/families/i)).toBeInTheDocument()
    expect(screen.getByText(/satisfaction/i)).toBeInTheDocument()
    expect(screen.getByText(/caregiver/i)).toBeInTheDocument()
  })

  it("displays target numbers", () => {
    render(<StatsCounter />)
    const section = document.querySelector("section")!
    // Should contain numeric values
    expect(section.textContent).toMatch(/\d+/)
  })

  it("renders as a section element", () => {
    render(<StatsCounter />)
    expect(document.querySelector("section")).toBeInTheDocument()
  })
})
