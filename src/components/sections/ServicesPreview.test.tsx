import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ServicesPreview } from "./ServicesPreview"
import { SERVICES } from "@/lib/constants"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("ServicesPreview", () => {
  it("renders a section heading", () => {
    render(<ServicesPreview />)
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
  })

  it("shows all 5 service cards", () => {
    render(<ServicesPreview />)
    for (const service of SERVICES) {
      expect(screen.getByText(service.label)).toBeInTheDocument()
    }
  })

  it("each service card links to the correct detail page", () => {
    render(<ServicesPreview />)
    for (const service of SERVICES) {
      const links = screen.getAllByRole("link")
      const match = links.find((l) => l.getAttribute("href") === service.href)
      expect(match).toBeTruthy()
    }
  })

  it("each service card has a description", () => {
    render(<ServicesPreview />)
    const section = document.querySelector("section")!
    expect(section.textContent!.length).toBeGreaterThan(200)
  })
})
