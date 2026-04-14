import Link from "next/link"
import { Heart, Users, Shield, Award } from "lucide-react"
import { TEAM_MEMBERS } from "@/content/team"
import { CTABanner } from "@/components/shared/CTABanner"

const VALUES = [
  { icon: Heart, title: "Compassion First", description: "Every interaction is guided by genuine care and empathy for our clients and their families." },
  { icon: Users, title: "Family Partnership", description: "We work alongside families as trusted partners in the care journey." },
  { icon: Shield, title: "Integrity Always", description: "Transparent communication, honest pricing, and accountability in everything we do." },
  { icon: Award, title: "Excellence in Care", description: "Continuous training and quality improvement ensure the highest standard of care." },
]

const TIMELINE = [
  { year: "2009", event: "Founded in Phoenix with a mission to provide compassionate home care" },
  { year: "2013", event: "Milestone: 500 families served across the greater Phoenix area" },
  { year: "2018", event: "Expanded to specialized Alzheimer's and dementia care programs" },
  { year: "2023", event: "Named Top Home Care Agency by Arizona Senior Living Magazine" },
]

export default function AboutPage() {
  return (
    <div>
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">About AgingWellCare</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            AgingWellCare was founded on a simple belief: every person deserves to age with dignity,
            comfort, and joy in the place they call home. What started as a small team of caregivers
            in Phoenix has grown into one of Arizona's most trusted home care agencies — but our
            commitment to personalized, compassionate care has never changed.
          </p>

          <h2 className="mt-16 text-2xl font-semibold text-foreground">Our Mission & Values</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <v.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold text-foreground">Our Team</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="mx-auto size-16 rounded-full bg-accent" />
                <h3 className="mt-4 font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold text-foreground">Our Timeline</h2>
          <div className="mt-8 space-y-6">
            {TIMELINE.map((item) => (
              <div key={item.year} className="flex gap-4">
                <span className="text-lg font-bold text-primary">{item.year}</span>
                <p className="text-muted-foreground">{item.event}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold text-foreground">Awards & Certifications</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <span className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground">BBB Accredited Business — A+ Rating</span>
            <span className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground">Arizona Home Care Association Certified</span>
            <span className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground">Top Home Care Agency 2023</span>
          </div>
        </div>
      </section>
      <CTABanner />
    </div>
  )
}
