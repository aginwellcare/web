import { render, screen } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import { StatsCounter } from "./StatsCounter"

// Mock IntersectionObserver for jsdom
beforeEach(() => {
  const mockObserver = vi.fn((callback: IntersectionObserverCallback) => {
    callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    )
    return {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    }
  })
  vi.stubGlobal("IntersectionObserver", mockObserver)
})

describe("StatsCounter", () => {
  it("renders 4 stat items", () => {
    render(<StatsCounter />)
    expect(screen.getByText(/years/i)).toBeInTheDocument()
    expect(screen.getByText(/families/i)).toBeInTheDocument()
    expect(screen.getByText(/satisfaction/i)).toBeInTheDocument()
    expect(screen.getByText(/caregiver/i)).toBeInTheDocument()
  })

  it("displays target numbers", () => {
    render(<StatsCounter />)
    const section = document.querySelector("section")!
    expect(section.textContent).toMatch(/\d+/)
  })

  it("renders as a section element", () => {
    render(<StatsCounter />)
    expect(document.querySelector("section")).toBeInTheDocument()
  })
})
