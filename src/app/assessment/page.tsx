import { AssessmentForm } from "@/components/forms/AssessmentForm"

export default function AssessmentPage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Free Care Assessment</h1>
        <p className="mt-4 text-muted-foreground">
          Tell us about your loved one&apos;s needs and we&apos;ll create a personalized care plan — no obligation.
        </p>
        <div className="mt-8">
          <AssessmentForm />
        </div>
      </div>
    </section>
  )
}
