import Link from "next/link"
import { Heart, Users, Home, Clock, Shield } from "lucide-react"
import { CTABanner } from "@/components/shared/CTABanner"
import servicesData from "@/content/services.json"

const ICONS: Record<string, typeof Heart> = { Heart, Users, Home, Clock, Shield }

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
            {servicesData.map((service) => {
              const Icon = ICONS[service.icon] || Heart
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className="size-8 text-primary" />
                  <h2 className="mt-4 text-lg font-semibold text-foreground">{service.label}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.shortDescription}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-primary group-hover:underline">Learn More &rarr;</span>
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
