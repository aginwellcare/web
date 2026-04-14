"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { TESTIMONIALS } from "@/content/testimonials"

const FILTERS = ["All", "personal-care", "companion-care", "live-in-care"]

export default function TestimonialsPage() {
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.service === filter)

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">What Families Say</h1>
        <div className="mt-8 flex gap-2" role="tablist">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-4 py-2 text-sm font-medium ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}
            >
              {f === "All" ? "All" : f.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <div key={t.id} className="rounded-lg border border-border bg-card p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-secondary text-secondary" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
              <p className="mt-3 text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.relationship}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
