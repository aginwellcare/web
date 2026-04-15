import { z } from "zod/v3"

const phoneRegex = /^\+?[\d\s\-()]{10,}$/

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required").regex(phoneRegex, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().max(2000, "Message must be under 2000 characters").optional(),
  _honeypot: z.string().max(0).optional(),
})

export type ContactFormValues = z.infer<typeof contactSchema>
