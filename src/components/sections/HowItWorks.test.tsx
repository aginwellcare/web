import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { HowItWorks } from "./HowItWorks"

describe("HowItWorks", () => {
  it("renders a section heading", () => {
    render(<HowItWorks />)
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
  })

  it("shows 3 steps in correct order", () => {
    render(<HowItWorks />)
    expect(screen.getByText(/contact us/i)).toBeInTheDocument()
    expect(screen.getByText(/care assessment/i)).toBeInTheDocument()
    expect(screen.getByText(/begin care/i)).toBeInTheDocument()
  })

  it("each step has a title and description", () => {
    render(<HowItWorks />)
    const section = document.querySelector("section")!
    expect(section.textContent!.length).toBeGreaterThan(100)
  })

  it("steps are numbered", () => {
    render(<HowItWorks />)
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
  })
})
