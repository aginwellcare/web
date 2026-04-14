import { MapPin, Phone } from "lucide-react"
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants"

const SERVICE_AREAS = [
  "Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler",
  "Gilbert", "Glendale", "Peoria", "Surprise", "Sun City",
]

export default function LocationsPage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Service Areas</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          AgingWellCare proudly serves families across the greater Phoenix metropolitan area.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SERVICE_AREAS.map((area) => (
            <div key={area} className="flex items-center gap-2 rounded-md border border-border px-4 py-3">
              <MapPin className="size-4 text-primary" />
              <span className="text-sm text-foreground">{area}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-lg bg-accent p-6 text-center">
          <p className="text-foreground">Not sure if we serve your area? Give us a call.</p>
          <a href={PHONE_HREF} className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-primary">
            <Phone className="size-5" />
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </section>
  )
}
