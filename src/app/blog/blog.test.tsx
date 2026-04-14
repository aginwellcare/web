import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import BlogPage from "./page"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe("Blog Listing Page", () => {
  it("renders page heading", () => {
    render(<BlogPage />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("shows blog post cards with titles", () => {
    render(<BlogPage />)
    expect(screen.getByText(/caring for aging parents/i)).toBeInTheDocument()
    expect(screen.getByText(/signs.*needs home care/i)).toBeInTheDocument()
  })

  it("each post card has a Read More link to /blog/[slug]", () => {
    render(<BlogPage />)
    const links = screen.getAllByRole("link")
    const blogLinks = links.filter((l) => l.getAttribute("href")?.startsWith("/blog/"))
    expect(blogLinks.length).toBeGreaterThanOrEqual(2)
  })

  it("shows post dates", () => {
    render(<BlogPage />)
    expect(screen.getByText(/march|mar/i)).toBeInTheDocument()
  })

  it("shows category badges", () => {
    render(<BlogPage />)
    expect(screen.getByText(/caregiving tips/i)).toBeInTheDocument()
  })
})
