import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import LocationsPage from "./page"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("Locations Page", () => {
  it("renders page heading", () => {
    render(<LocationsPage />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("shows service area description", () => {
    render(<LocationsPage />)
    const page = document.querySelector("section")!
    expect(page.textContent!.length).toBeGreaterThan(50)
  })

  it("lists service areas", () => {
    render(<LocationsPage />)
    expect(screen.getByText("Phoenix")).toBeInTheDocument()
    expect(screen.getByText("Scottsdale")).toBeInTheDocument()
  })

  it("has a CTA for unlisted areas", () => {
    render(<LocationsPage />)
    expect(screen.getByText(/not sure|give us a call/i)).toBeInTheDocument()
  })
})
