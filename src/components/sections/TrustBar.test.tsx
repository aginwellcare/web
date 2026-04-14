import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { TrustBar } from "./TrustBar"

describe("TrustBar", () => {
  it("renders trust signal items", () => {
    render(<TrustBar />)
    // Should have multiple trust items
    expect(screen.getByText(/years/i)).toBeInTheDocument()
    expect(screen.getByText(/families/i)).toBeInTheDocument()
  })

  it("renders as a section with appropriate labeling", () => {
    render(<TrustBar />)
    const section = document.querySelector("section")
    expect(section).toBeInTheDocument()
  })

  it("displays numeric trust metrics", () => {
    render(<TrustBar />)
    // Should contain numbers
    const section = document.querySelector("section")!
    expect(section.textContent).toMatch(/\d+/)
  })
})
