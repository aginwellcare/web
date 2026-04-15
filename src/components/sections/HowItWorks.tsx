import { Phone, ClipboardList, Heart } from "lucide-react"

const STEPS = [
  { number: "1", icon: Phone, title: "Contact Us", description: "Call us or fill out our free assessment form. We&apos;ll listen to your situation and answer your questions." },
  { number: "2", icon: ClipboardList, title: "Care Assessment", description: "A care coordinator visits your home to understand your loved one&apos;s needs and create a personalized care plan." },
  { number: "3", icon: Heart, title: "Begin Care", description: "We match you with a carefully selected caregiver and begin providing compassionate, reliable care." },
]

export function HowItWorks() {
  return (
    <section className="bg-accent py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-2xl font-semibold text-foreground md:text-3xl">
          How It Works
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {step.number}
              </div>
              <step.icon className="mx-auto mt-4 size-8 text-primary" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
