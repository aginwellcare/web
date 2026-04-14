import Link from "next/link"
import { Phone } from "lucide-react"
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants"

export function CTABanner({ heading }: { heading?: string }) {
  return (
    <section className="bg-gold-light py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
          {heading || "Ready to Get Started?"}
        </h2>
        <p className="mt-3 text-muted-foreground">
          Take the first step toward compassionate care for your loved one.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/assessment"
            className="h-11 inline-flex items-center rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
          >
            Free Care Assessment
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
          >
            <Phone className="size-4" />
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </section>
  )
}
