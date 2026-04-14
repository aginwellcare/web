import Link from "next/link"
import { SERVICES } from "@/lib/constants"
import { CTABanner } from "@/components/shared/CTABanner"

const SERVICE_DATA: Record<string, {
  title: string
  description: string
  features: string[]
  whoIsItFor: string
}> = {
  "personal-care": {
    title: "Personal Care",
    description: "Our personal care services help your loved one maintain their independence and dignity at home. Trained caregivers assist with the activities of daily living that become challenging with age or illness.",
    features: ["Bathing and grooming assistance", "Dressing and personal hygiene", "Mobility and transfer support", "Medication reminders", "Incontinence care", "Fall prevention"],
    whoIsItFor: "Seniors who need help with daily activities but want to remain in the comfort of their own home.",
  },
  "companion-care": {
    title: "Companion Care",
    description: "Loneliness is one of the biggest challenges for aging adults. Our companion care service provides meaningful social interaction, engaging activities, and a caring presence throughout the day.",
    features: ["Conversation and companionship", "Light meal preparation", "Grocery shopping and errands", "Recreational activities and games", "Accompaniment to appointments", "Light housekeeping"],
    whoIsItFor: "Seniors who are mostly independent but need social interaction and help with household tasks.",
  },
  "live-in-care": {
    title: "Live-In Care",
    description: "For families who need round-the-clock support, our live-in caregivers provide continuous care and supervision in the comfort of home — a safe, familiar alternative to facility-based care.",
    features: ["24-hour caregiver presence", "Overnight supervision and safety", "All personal care services", "Meal planning and preparation", "Home safety management", "Family communication and updates"],
    whoIsItFor: "Seniors with advanced care needs, dementia, or those who need constant supervision for safety.",
  },
  "respite-care": {
    title: "Respite Care",
    description: "Family caregivers deserve a break. Our respite care service provides temporary professional care so you can rest, travel, or attend to personal needs while knowing your loved one is in good hands.",
    features: ["Flexible scheduling (hours, days, or weeks)", "All personal and companion care services", "Seamless transition with your care routine", "Emergency respite available", "Regular progress updates"],
    whoIsItFor: "Family caregivers who need temporary relief, whether for a few hours or several weeks.",
  },
  "specialized-care": {
    title: "Specialized Care",
    description: "Some conditions require specialized knowledge and training. Our specialized care team has expertise in managing complex health conditions while keeping your loved one comfortable and safe at home.",
    features: ["Alzheimer's and dementia care", "Parkinson's disease support", "Post-surgery recovery care", "Stroke rehabilitation assistance", "Chronic illness management", "Hospice support care"],
    whoIsItFor: "Seniors with specific medical conditions that require trained, experienced caregivers.",
  },
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.href.replace("/services/", "") }))
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const data = SERVICE_DATA[params.slug]
  if (!data) return <div>Service not found</div>

  const otherServices = SERVICES.filter((s) => !s.href.endsWith(params.slug))

  return (
    <div>
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">{data.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{data.description}</p>

          <h2 className="mt-10 text-xl font-semibold text-foreground">What This Service Includes</h2>
          <ul className="mt-4 space-y-2">
            {data.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-1 text-primary">•</span>
                {f}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold text-foreground">Who Is This For?</h2>
          <p className="mt-3 text-muted-foreground">{data.whoIsItFor}</p>

          <div className="mt-10">
            <Link
              href="/assessment"
              className="inline-flex h-11 items-center rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
            >
              Get a Free Assessment for {data.title}
            </Link>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <h3 className="text-lg font-semibold text-foreground">Other Services</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {otherServices.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTABanner />
    </div>
  )
}
