import Link from "next/link"
import { Heart, Clock, GraduationCap, DollarSign } from "lucide-react"

const BENEFITS = [
  { icon: DollarSign, title: "Competitive Pay", description: "Above-market wages with regular performance reviews." },
  { icon: Heart, title: "Health Insurance", description: "Medical, dental, and vision coverage for full-time employees." },
  { icon: Clock, title: "Flexible Schedule", description: "Choose shifts that work for your lifestyle." },
  { icon: GraduationCap, title: "Ongoing Training", description: "Paid training and professional development opportunities." },
]

const OPENINGS = [
  { title: "Certified Caregiver", location: "Phoenix, AZ", type: "Full-time / Part-time" },
  { title: "Registered Nurse (RN)", location: "Scottsdale, AZ", type: "Full-time" },
  { title: "Care Coordinator", location: "Phoenix, AZ", type: "Full-time" },
]

export default function CareersPage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Join Our Team</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Make a meaningful difference in the lives of seniors and their families.
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-foreground">Benefits</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex gap-3">
              <b.icon className="size-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-semibold text-foreground">Current Openings</h2>
        <div className="mt-6 space-y-4">
          {OPENINGS.map((job) => (
            <div key={job.title} className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <h3 className="font-semibold text-foreground">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.location} — {job.type}</p>
              </div>
              <Link href={`mailto:careers@agingwellcare.com?subject=Application: ${job.title}`} className="text-sm font-medium text-primary hover:underline">Apply</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
