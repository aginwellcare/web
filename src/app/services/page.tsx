import Link from "next/link"
import { Heart, Users, Home, Clock, Shield } from "lucide-react"
import { SERVICES } from "@/lib/constants"
import { CTABanner } from "@/components/shared/CTABanner"

const SERVICE_ICONS = [Heart, Users, Home, Clock, Shield]
const SERVICE_DESCRIPTIONS = [
  "Assistance with bathing, grooming, dressing, mobility, and daily living activities — delivered with dignity and respect.",
  "Meaningful companionship, engaging activities, conversation, errands, and emotional support for your loved one.",
  "Around-the-clock care in the comfort of home for those who need continuous, dedicated support.",
  "Temporary relief for family caregivers so you can recharge while knowing your loved one is well cared for.",
  "Expert support for Alzheimer's, dementia, post-surgery recovery, Parkinson's, and other chronic conditions.",
]

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">Our Care Services</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Every family has unique needs. We offer a full spectrum of home care services,
            from a few hours of companionship to 24/7 live-in care.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[i]
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group block rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className="size-8 text-primary" />
                  <h2 className="mt-4 text-lg font-semibold text-foreground">{service.label}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{SERVICE_DESCRIPTIONS[i]}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-primary group-hover:underline">Learn More →</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      <CTABanner />
    </div>
  )
}
