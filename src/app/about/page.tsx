import Image from "next/image"
import {
  Heart,
  Users,
  Shield,
  Award,
  ClipboardCheck,
  BadgeCheck,
  UserCheck,
  PhoneCall,
  Clock,
  Home,
} from "lucide-react"
import teamData from "@/content/team.json"
import { CTABanner } from "@/components/shared/CTABanner"

const VALUES = [
  { icon: Heart, title: "Compassion First", description: "Every interaction is guided by genuine care and empathy for our clients and their families." },
  { icon: Users, title: "Family Partnership", description: "We work alongside families as trusted partners in the care journey." },
  { icon: Shield, title: "Integrity Always", description: "Transparent communication, honest pricing, and accountability in everything we do." },
  { icon: Award, title: "Excellence in Care", description: "Continuous training and quality improvement ensure the highest standard of care." },
]

const PROMISES = [
  { icon: ClipboardCheck, title: "Free in-home consultation", description: "We start with a no-obligation visit to understand your family's needs before any commitment." },
  { icon: BadgeCheck, title: "Background-checked caregivers", description: "Every caregiver is screened, credential-verified, and trained before they step into your home." },
  { icon: Heart, title: "Personalized care plan", description: "Care is built around your loved one's routine, preferences, and health goals — not a one-size template." },
  { icon: UserCheck, title: "Caregiver continuity", description: "We match families with caregivers and keep the same faces showing up whenever possible." },
  { icon: PhoneCall, title: "Direct line to the owner", description: "When you call, you reach our team — not an out-of-state call center or after-hours service." },
  { icon: Clock, title: "Flexible scheduling", description: "Hourly visits, overnight care, or live-in support — adjusted as your family's needs change." },
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
            in Phoenix has grown into one of Arizona&apos;s most trusted home care agencies — but our
            commitment to personalized, compassionate care has never changed.
          </p>

          <h2 className="mt-16 text-2xl font-semibold text-foreground">Our Mission &amp; Values</h2>
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
            {teamData.map((member) => (
              <div key={member.name} className="rounded-lg border border-border bg-card p-6 text-center">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="mx-auto size-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-accent">
                    <span className="text-xl font-semibold text-primary">
                      {member.name
                        .replace(/,.*$/, "")
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  </div>
                )}
                <h3 className="mt-4 font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold text-foreground">Our Promise to You</h2>
          <p className="mt-4 text-muted-foreground">
            We&apos;re a new agency, and we&apos;re building it on commitments we can keep from day one.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {PROMISES.map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <p.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold text-foreground">Locally Owned &amp; Hands-On</h2>
          <div className="mt-6 flex items-start gap-4 rounded-lg border border-border bg-card p-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent">
              <Home className="size-5 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Aging Well Care is independently owned and operated right here in the Phoenix area —
              not a franchise, not a national chain. Our owner, Natasha Rreshka, is a Certified
              Nursing Assistant and Certified Phlebotomy Technician who personally stays involved
              in every care plan. When you choose us, you&apos;re working directly with the people
              accountable for the care your loved one receives.
            </p>
          </div>
        </div>
      </section>
      <CTABanner />
    </div>
  )
}
