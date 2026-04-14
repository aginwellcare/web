import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { AnimatedSection } from "./AnimatedSection"

describe("AnimatedSection", () => {
  it("renders children", () => {
    render(<AnimatedSection><p>Hello world</p></AnimatedSection>)
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })

  it("accepts optional className prop", () => {
    const { container } = render(
      <AnimatedSection className="test-class"><p>Content</p></AnimatedSection>
    )
    expect(container.firstChild).toHaveClass("test-class")
  })

  it("accepts optional delay prop without crashing", () => {
    render(<AnimatedSection delay={0.2}><p>Delayed</p></AnimatedSection>)
    expect(screen.getByText("Delayed")).toBeInTheDocument()
  })

  it("wraps children in a motion-capable element", () => {
    const { container } = render(<AnimatedSection><p>Motion</p></AnimatedSection>)
    // Framer motion adds style attributes for transforms
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toBeInTheDocument()
    expect(wrapper.tagName).toBe("DIV")
  })
})
