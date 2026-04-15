import { z } from "zod/v3"

const phoneRegex = /^\+?[\d\s\-()]{10,}$/

export const assessmentSchema = z.object({
  careRecipientName: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age is required").refine((v) => {
    const n = Number(v)
    return Number.isInteger(n) && n >= 0 && n <= 120
  }, "Please enter a valid age (0-120)"),
  relationship: z.string().min(1, "Relationship is required"),
  careNeeds: z.array(z.string()).min(1, "Select at least one care need"),
  frequency: z.string().min(1, "Frequency is required"),
  preferredTimes: z.string().optional(),
  startDate: z.string().optional(),
  contactName: z.string().min(1, "Contact name is required"),
  contactPhone: z.string().min(1, "Phone is required").regex(phoneRegex, "Please enter a valid phone number"),
  contactEmail: z.string().email("Valid email required"),
  contactMethod: z.string().min(1, "Preferred contact method is required"),
  _honeypot: z.string().max(0).optional(),
})

export type AssessmentFormValues = z.infer<typeof assessmentSchema>
