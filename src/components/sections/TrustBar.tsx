const TRUST_ITEMS = [
  { value: "4.9 Stars", label: "Average Google Rating" },
  { value: "15+", label: "Years of Home Care Experience" },
  { value: "5,000+", label: "Families Served" },
  { value: "98%", label: "Client Satisfaction Rate" },
]

export function TrustBar() {
  return (
    <section className="bg-accent py-10" aria-label="Trust indicators">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
        {TRUST_ITEMS.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-2xl font-bold text-primary md:text-3xl">{item.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
