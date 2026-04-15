"use client"

import { useState, useCallback } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import testimonialsData from "@/content/testimonials.json"

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? testimonialsData.length - 1 : c - 1))
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => (c === testimonialsData.length - 1 ? 0 : c + 1))
  }, [])

  const testimonial = testimonialsData[current]

  return (
    <section className="bg-cream-dark py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
          What Families Say
        </h2>
        <div className="mt-10" aria-live="polite" aria-atomic="true">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={`star-${i}`} className="size-5 fill-secondary text-secondary" />
            ))}
          </div>
          <blockquote className="mt-4 text-lg italic leading-relaxed text-foreground">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <p className="mt-4 font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.relationship}</p>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-border hover:bg-accent"
          >
            <ChevronLeft className="size-5" />
          </button>
          <span className="text-sm text-muted-foreground">
            {current + 1} / {testimonialsData.length}
          </span>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-border hover:bg-accent"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
