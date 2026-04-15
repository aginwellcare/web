import { ShieldCheck, ClipboardList, Clock, Award } from "lucide-react"

const DIFFERENTIATORS = [
  { icon: ShieldCheck, title: "Vetted Caregivers", description: "Every caregiver passes rigorous background checks, reference verification, and skills assessment before joining our team." },
  { icon: ClipboardList, title: "Personalized Care Plans", description: "We design a custom care plan around your loved one&apos;s specific needs, preferences, and daily routine." },
  { icon: Clock, title: "24/7 Availability", description: "Care needs don&apos;t follow a schedule. Our team is available around the clock for emergencies and support." },
  { icon: Award, title: "Licensed & Insured", description: "Fully licensed, bonded, and insured. You can trust that your family is protected at every level." },
]

export function WhyChooseUs() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
          Why Families Choose AgingWellCare
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {DIFFERENTIATORS.map((d) => (
            <div key={d.title} className="flex gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent">
                <d.icon className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{d.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
