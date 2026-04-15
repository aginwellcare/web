"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod/v3"
import { zodResolver } from "@hookform/resolvers/zod"

const assessmentSchema = z.object({
  careRecipientName: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age is required").refine((v) => { const n = Number(v); return Number.isInteger(n) && n >= 0 && n <= 120 }, "Please enter a valid age (0-120)"),
  relationship: z.string().min(1, "Relationship is required"),
  careNeeds: z.array(z.string()).min(1, "Select at least one care need"),
  frequency: z.string().min(1, "Frequency is required"),
  preferredTimes: z.string().optional(),
  startDate: z.string().optional(),
  contactName: z.string().min(1, "Contact name is required"),
  contactPhone: z.string().min(1, "Phone is required"),
  contactEmail: z.string().email("Valid email required"),
  contactMethod: z.string().min(1, "Preferred contact method is required"),
})

type AssessmentValues = z.infer<typeof assessmentSchema>

const STEP_FIELDS: Record<number, (keyof AssessmentValues)[]> = {
  0: ["careRecipientName", "age", "relationship"],
  1: ["careNeeds"],
  2: ["frequency"],
  3: ["contactName", "contactPhone", "contactEmail", "contactMethod"],
}

const CARE_NEED_OPTIONS = [
  "Bathing & grooming", "Mobility assistance", "Medication reminders",
  "Meal preparation", "Companionship", "Transportation", "Light housekeeping",
]

export function AssessmentForm() {
  const [step, setStep] = useState(0)
  const methods = useForm<AssessmentValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      careNeeds: [],
      careRecipientName: "",
      age: "",
      relationship: "",
      frequency: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      contactMethod: "",
    },
  })

  const { register, trigger, handleSubmit, watch, formState: { errors } } = methods

  const totalSteps = 5
  const isReview = step === 4

  const handleNext = async () => {
    if (isReview) return
    const fields = STEP_FIELDS[step]
    const valid = await trigger(fields)
    if (valid) setStep((s) => s + 1)
  }

  const handlePrev = () => setStep((s) => Math.max(0, s - 1))

  const onSubmit = async (_data: AssessmentValues) => {
    // TODO: wire up server action for assessment submission
  }

  const values = watch()

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} aria-label="Care assessment form">
        <p className="mb-6 text-sm font-medium text-muted-foreground">
          Step {step + 1} of {totalSteps}
        </p>

        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="careRecipientName" className="block text-sm font-medium text-foreground">Care Recipient Name</label>
              <input id="careRecipientName" {...register("careRecipientName")} className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base" />
              {errors.careRecipientName && <p role="alert" className="mt-1 text-sm text-destructive">{errors.careRecipientName.message}</p>}
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-foreground">Age</label>
              <input id="age" {...register("age")} className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base" />
              {errors.age && <p role="alert" className="mt-1 text-sm text-destructive">{errors.age.message}</p>}
            </div>
            <div>
              <label htmlFor="relationship" className="block text-sm font-medium text-foreground">Relationship</label>
              <select id="relationship" {...register("relationship")} className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base">
                <option value="">Select relationship</option>
                <option value="parent">Parent</option>
                <option value="spouse">Spouse</option>
                <option value="other">Other</option>
              </select>
              {errors.relationship && <p role="alert" className="mt-1 text-sm text-destructive">{errors.relationship.message}</p>}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">What care does your loved one need?</p>
            {CARE_NEED_OPTIONS.map((need) => (
              <label key={need} className="flex items-center gap-2 text-sm">
                <input type="checkbox" value={need} {...register("careNeeds")} />
                {need}
              </label>
            ))}
            {errors.careNeeds && <p role="alert" className="mt-1 text-sm text-destructive">{errors.careNeeds.message}</p>}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-foreground">Care Frequency</label>
              <select id="frequency" {...register("frequency")} className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base">
                <option value="">Select frequency</option>
                <option value="few-hours">A few hours per week</option>
                <option value="daily">Daily visits</option>
                <option value="live-in">Live-in care</option>
              </select>
            </div>
            <div>
              <label htmlFor="preferredTimes" className="block text-sm font-medium text-foreground">Preferred Times</label>
              <input id="preferredTimes" {...register("preferredTimes")} className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base" />
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-foreground">Desired Start Date</label>
              <input id="startDate" type="date" {...register("startDate")} className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-foreground">Your Name</label>
              <input id="contactName" {...register("contactName")} className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base" />
              {errors.contactName && <p role="alert" className="mt-1 text-sm text-destructive">{errors.contactName.message}</p>}
            </div>
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-foreground">Phone</label>
              <input id="contactPhone" type="tel" {...register("contactPhone")} aria-invalid={!!errors.contactPhone} aria-describedby={errors.contactPhone ? "contactPhone-error" : undefined} className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base" />
              {errors.contactPhone && <p id="contactPhone-error" role="alert" className="mt-1 text-sm text-destructive">{errors.contactPhone.message}</p>}
            </div>
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-foreground">Email</label>
              <input id="contactEmail" type="email" {...register("contactEmail")} aria-invalid={!!errors.contactEmail} aria-describedby={errors.contactEmail ? "contactEmail-error" : undefined} className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base" />
              {errors.contactEmail && <p id="contactEmail-error" role="alert" className="mt-1 text-sm text-destructive">{errors.contactEmail.message}</p>}
            </div>
            <div>
              <label htmlFor="contactMethod" className="block text-sm font-medium text-foreground">Preferred Contact Method</label>
              <select id="contactMethod" {...register("contactMethod")} aria-invalid={!!errors.contactMethod} aria-describedby={errors.contactMethod ? "contactMethod-error" : undefined} className="mt-1 w-full rounded-md border border-border px-4 py-3 text-base">
                <option value="">Select method</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
              {errors.contactMethod && <p id="contactMethod-error" role="alert" className="mt-1 text-sm text-destructive">{errors.contactMethod.message}</p>}
            </div>
          </div>
        )}

        {isReview && (
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold">Review Your Information</h3>
            <p><strong>Name:</strong> {values.careRecipientName}</p>
            <p><strong>Age:</strong> {values.age}</p>
            <p><strong>Relationship:</strong> {values.relationship}</p>
            <p><strong>Care Needs:</strong> {values.careNeeds?.join(", ")}</p>
            <p><strong>Frequency:</strong> {values.frequency}</p>
            <p><strong>Contact:</strong> {values.contactName} — {values.contactEmail}</p>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <button type="button" onClick={handlePrev} className="h-11 rounded-md border border-border px-6 text-sm font-medium hover:bg-accent">
              Previous
            </button>
          )}
          {!isReview ? (
            <button type="button" onClick={handleNext} className="h-11 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Next
            </button>
          ) : (
            <button type="submit" className="h-11 rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90">
              Submit Assessment
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
