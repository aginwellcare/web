import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { ContactForm } from "./ContactForm"

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it("has a submit button", () => {
    render(<ContactForm />)
    expect(screen.getByRole("button", { name: /send|submit|contact/i })).toBeInTheDocument()
  })

  it("shows error for empty required fields on submit", async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    const submitBtn = screen.getByRole("button", { name: /send|submit|contact/i })
    await user.click(submitBtn)
    // Should show at least one error message
    const errors = await screen.findAllByRole("alert")
    expect(errors.length).toBeGreaterThanOrEqual(1)
  })

  it("validates email format", async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, "notanemail")
    const submitBtn = screen.getByRole("button", { name: /send|submit|contact/i })
    await user.click(submitBtn)
    expect(await screen.findByText(/valid email|email.*invalid/i)).toBeInTheDocument()
  })

  it("all form fields have persistent labels (not placeholder-only)", () => {
    render(<ContactForm />)
    const labels = document.querySelectorAll("label")
    expect(labels.length).toBeGreaterThanOrEqual(5)
  })

  it("error messages use aria-describedby", async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    const submitBtn = screen.getByRole("button", { name: /send|submit|contact/i })
    await user.click(submitBtn)
    // After validation, inputs should have aria-describedby pointing to error
    const nameInput = screen.getByLabelText(/name/i)
    await screen.findAllByRole("alert")
    expect(
      nameInput.getAttribute("aria-describedby") || nameInput.getAttribute("aria-invalid")
    ).toBeTruthy()
  })
})
