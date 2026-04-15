import { render, screen, act } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ServiceDetailPage from "./page"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

async function renderAsync(slug: string) {
  const params = Promise.resolve({ slug })
  const Component = await ServiceDetailPage({ params })
  await act(async () => {
    render(Component)
  })
}

describe("Service Detail Page", () => {
  it("renders service title as h1 for personal-care", async () => {
    await renderAsync("personal-care")
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByText("Personal Care")).toBeInTheDocument()
  })

  it("shows detailed description", async () => {
    await renderAsync("companion-care")
    const page = document.querySelector("div")!
    expect(page.textContent!.length).toBeGreaterThan(100)
  })

  it("shows features or benefits list", async () => {
    await renderAsync("live-in-care")
    const lists = document.querySelectorAll("ul, ol")
    expect(lists.length).toBeGreaterThanOrEqual(1)
  })

  it("shows CTA with service name", async () => {
    await renderAsync("respite-care")
    expect(screen.getByRole("link", { name: /assessment.*respite|respite.*assessment|get.*free.*assessment/i })).toBeInTheDocument()
  })

  it("shows related services links", async () => {
    await renderAsync("personal-care")
    const allLinks = screen.getAllByRole("link")
    const serviceLinks = allLinks.filter((l) => l.getAttribute("href")?.startsWith("/services/"))
    expect(serviceLinks.length).toBeGreaterThanOrEqual(1)
  })
})
