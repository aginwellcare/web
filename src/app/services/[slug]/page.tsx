import Link from "next/link"
import { notFound } from "next/navigation"
import { CTABanner } from "@/components/shared/CTABanner"
import servicesData from "@/content/services.json"

export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }))
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesData.find((s) => s.slug === slug)
  if (!service) notFound()

  const otherServices = servicesData.filter((s) => s.slug !== slug)

  return (
    <div>
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">{service.label}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{service.description}</p>

          <h2 className="mt-10 text-xl font-semibold text-foreground">What This Service Includes</h2>
          <ul className="mt-4 space-y-2">
            {service.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-1 text-primary">&bull;</span>
                {f}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold text-foreground">Who Is This For?</h2>
          <p className="mt-3 text-muted-foreground">{service.whoIsItFor}</p>

          <div className="mt-10">
            <Link
              href="/assessment"
              className="inline-flex h-11 items-center rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
            >
              Get a Free Assessment for {service.label}
            </Link>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <h3 className="text-lg font-semibold text-foreground">Other Services</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
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
