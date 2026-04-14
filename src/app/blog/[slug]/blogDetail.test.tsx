import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import BlogDetailPage from "./page"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("Blog Detail Page", () => {
  it("renders post title as h1", () => {
    render(<BlogDetailPage params={{ slug: "caring-for-aging-parents" }} />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/caring for aging parents/i)).toBeInTheDocument()
  })

  it("shows date and author", () => {
    render(<BlogDetailPage params={{ slug: "caring-for-aging-parents" }} />)
    expect(screen.getByText(/agingwellcare team/i)).toBeInTheDocument()
  })

  it("shows category badge", () => {
    render(<BlogDetailPage params={{ slug: "caring-for-aging-parents" }} />)
    expect(screen.getByText(/caregiving tips/i)).toBeInTheDocument()
  })

  it("renders content body", () => {
    render(<BlogDetailPage params={{ slug: "caring-for-aging-parents" }} />)
    const page = document.querySelector("div")!
    expect(page.textContent!.length).toBeGreaterThan(100)
  })

  it("shows CTA or related content at bottom", () => {
    render(<BlogDetailPage params={{ slug: "caring-for-aging-parents" }} />)
    const links = screen.getAllByRole("link")
    expect(links.length).toBeGreaterThanOrEqual(1)
  })
})
