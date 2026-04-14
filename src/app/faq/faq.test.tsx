import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import FAQPage from "./page"

describe("FAQ Page", () => {
  it("renders page heading", () => {
    render(<FAQPage />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("shows FAQ categories", () => {
    render(<FAQPage />)
    expect(screen.getByText("General")).toBeInTheDocument()
    expect(screen.getByText("Pricing")).toBeInTheDocument()
    expect(screen.getByText("Getting Started")).toBeInTheDocument()
  })

  it("shows accordion items with questions", () => {
    render(<FAQPage />)
    expect(screen.getByText(/what areas do you serve/i)).toBeInTheDocument()
  })

  it("clicking a question reveals the answer", async () => {
    const user = userEvent.setup()
    render(<FAQPage />)
    const question = screen.getByText(/what areas do you serve/i)
    await user.click(question)
    expect(screen.getByText(/phoenix/i)).toBeInTheDocument()
  })

  it("has FAQPage JSON-LD script tag", () => {
    render(<FAQPage />)
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    const faqSchema = Array.from(scripts).find((s) => s.textContent?.includes("FAQPage"))
    expect(faqSchema).toBeTruthy()
  })
})
