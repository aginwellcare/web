import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import CareersPage from "./page"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("Careers Page", () => {
  it("renders Join Our Team heading", () => {
    render(<CareersPage />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/join our team/i)).toBeInTheDocument()
  })

  it("shows benefits section", () => {
    render(<CareersPage />)
    expect(screen.getByText(/competitive pay/i)).toBeInTheDocument()
    expect(screen.getByText(/health insurance/i)).toBeInTheDocument()
  })

  it("shows current openings with titles", () => {
    render(<CareersPage />)
    expect(screen.getByText(/certified caregiver/i)).toBeInTheDocument()
    expect(screen.getByText(/registered nurse/i)).toBeInTheDocument()
  })

  it("has apply buttons", () => {
    render(<CareersPage />)
    const applyButtons = screen.getAllByRole("button").filter(
      (el) => /apply/i.test(el.textContent || "")
    )
    expect(applyButtons.length).toBeGreaterThanOrEqual(1)
  })
})
