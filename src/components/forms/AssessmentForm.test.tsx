import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { AssessmentForm } from "./AssessmentForm"

describe("AssessmentForm", () => {
  describe("Step navigation", () => {
    it("shows progress indicator with step count", () => {
      render(<AssessmentForm />)
      expect(screen.getByText(/step.*1/i)).toBeInTheDocument()
    })

    it("shows Next button", () => {
      render(<AssessmentForm />)
      expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument()
    })

    it("cannot advance past step 1 with empty required fields", async () => {
      const user = userEvent.setup()
      render(<AssessmentForm />)
      const nextBtn = screen.getByRole("button", { name: /next/i })
      await user.click(nextBtn)
      expect(screen.getByText(/step.*1/i)).toBeInTheDocument()
    })

    it("advances to step 2 when step 1 is valid", async () => {
      const user = userEvent.setup()
      render(<AssessmentForm />)
      await user.type(screen.getByLabelText(/care recipient name/i), "John Smith")
      await user.type(screen.getByLabelText(/age/i), "78")
      await user.selectOptions(screen.getByLabelText(/relationship/i), "parent")
      await user.click(screen.getByRole("button", { name: /next/i }))
      expect(screen.getByText(/step.*2/i)).toBeInTheDocument()
    })

    it("shows Previous button on step 2+", async () => {
      const user = userEvent.setup()
      render(<AssessmentForm />)
      await user.type(screen.getByLabelText(/care recipient name/i), "John Smith")
      await user.type(screen.getByLabelText(/age/i), "78")
      await user.selectOptions(screen.getByLabelText(/relationship/i), "parent")
      await user.click(screen.getByRole("button", { name: /next/i }))
      expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument()
    })

    it("going back preserves entered data", async () => {
      const user = userEvent.setup()
      render(<AssessmentForm />)
      await user.type(screen.getByLabelText(/care recipient name/i), "John Smith")
      await user.type(screen.getByLabelText(/age/i), "78")
      await user.selectOptions(screen.getByLabelText(/relationship/i), "parent")
      await user.click(screen.getByRole("button", { name: /next/i }))
      await user.click(screen.getByRole("button", { name: /previous/i }))
      expect(screen.getByLabelText(/care recipient name/i)).toHaveValue("John Smith")
    })
  })

  describe("Form fields", () => {
    it("step 1 has care recipient fields", () => {
      render(<AssessmentForm />)
      expect(screen.getByLabelText(/care recipient name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/age/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/relationship/i)).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("all form fields have persistent labels", () => {
      render(<AssessmentForm />)
      const labels = document.querySelectorAll("label")
      expect(labels.length).toBeGreaterThanOrEqual(2)
    })

    it("has a form element", () => {
      render(<AssessmentForm />)
      expect(document.querySelector("form")).toBeTruthy()
    })
  })
})
