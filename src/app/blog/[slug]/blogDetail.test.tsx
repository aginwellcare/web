import { render, screen, act } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import BlogDetailPage from "./page"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

async function renderAsync(slug: string) {
  const params = Promise.resolve({ slug })
  const Component = await BlogDetailPage({ params })
  await act(async () => {
    render(Component)
  })
}

describe("Blog Detail Page", () => {
  it("renders post title as h1", async () => {
    await renderAsync("caring-for-aging-parents")
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/caring for aging parents/i)).toBeInTheDocument()
  })

  it("shows date and author", async () => {
    await renderAsync("caring-for-aging-parents")
    expect(screen.getByText(/agingwellcare team/i)).toBeInTheDocument()
  })

  it("shows category badge", async () => {
    await renderAsync("caring-for-aging-parents")
    expect(screen.getByText(/caregiving tips/i)).toBeInTheDocument()
  })

  it("renders content body", async () => {
    await renderAsync("caring-for-aging-parents")
    const article = document.querySelector("article")!
    expect(article.textContent!.length).toBeGreaterThan(100)
  })

  it("shows back to blog link", async () => {
    await renderAsync("caring-for-aging-parents")
    expect(screen.getByRole("link", { name: /back to blog/i })).toBeInTheDocument()
  })
})
