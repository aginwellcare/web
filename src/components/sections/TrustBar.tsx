import { Award, Users, Clock, Star } from "lucide-react"

const TRUST_ITEMS = [
  { icon: Clock, value: "15+", label: "Years of Service" },
  { icon: Users, value: "5,000+", label: "Families Served" },
  { icon: Star, value: "98%", label: "Satisfaction Rate" },
  { icon: Award, value: "A+", label: "BBB Rating" },
]

export function TrustBar() {
  return (
    <section className="bg-accent py-8" aria-label="Trust indicators">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 md:gap-16">
        {TRUST_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-center">
            <item.icon className="size-6 text-primary" />
            <div>
              <p className="text-xl font-bold text-foreground">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
