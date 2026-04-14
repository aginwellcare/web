"use client"

import { useRef, useState, useEffect } from "react"
import { useInView } from "framer-motion"

const STATS = [
  { target: 15, suffix: "+", label: "Years of Service" },
  { target: 5000, suffix: "+", label: "Families Served" },
  { target: 98, suffix: "%", label: "Client Satisfaction" },
  { target: 500, suffix: "+", label: "Caregivers on Staff" },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = target / 60
    const id = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(id)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(id)
  }, [isInView, target])

  return (
    <span ref={ref} className="text-3xl font-bold text-secondary md:text-4xl">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsCounter() {
  return (
    <section className="bg-teal-dark py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <Counter target={stat.target} suffix={stat.suffix} />
            <p className="mt-2 text-sm text-primary-foreground/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
