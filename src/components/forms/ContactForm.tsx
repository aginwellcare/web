"use client"

import { useForm } from "react-hook-form"
import { z } from "zod/v3"
import { zodResolver } from "@hookform/resolvers/zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required").regex(/^\+?[\d\s\-()]{10,}$/, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (_data: ContactFormValues) => {
    // TODO: wire up server action for form submission
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base"
          />
          {errors.name && <p id="name-error" role="alert" className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base"
          />
          {errors.email && <p id="email-error" role="alert" className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone</label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base"
          />
          {errors.phone && <p id="phone-error" role="alert" className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-foreground">Service Interest</label>
          <select
            id="service"
            {...register("service")}
            aria-invalid={!!errors.service}
            className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base"
          >
            <option value="">Select a service</option>
            <option value="personal-care">Personal Care</option>
            <option value="companion-care">Companion Care</option>
            <option value="live-in-care">Live-In Care</option>
            <option value="respite-care">Respite Care</option>
            <option value="specialized-care">Specialized Care</option>
          </select>
          {errors.service && <p role="alert" className="mt-1 text-sm text-destructive">{errors.service.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
          <textarea
            id="message"
            rows={4}
            {...register("message")}
            className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  )
}
