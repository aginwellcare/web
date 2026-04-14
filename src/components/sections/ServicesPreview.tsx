"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Users, Home, Clock, Shield } from "lucide-react"
import { SERVICES } from "@/lib/constants"

const SERVICE_ICONS = [Heart, Users, Home, Clock, Shield]
const SERVICE_DESCRIPTIONS = [
  "Bathing, grooming, mobility assistance, and daily living support with dignity and respect.",
  "Meaningful companionship, conversation, activities, and emotional support for your loved one.",
  "Around-the-clock care in the comfort of home for those who need continuous support.",
  "Temporary relief for family caregivers so you can recharge while your loved one is cared for.",
  "Specialized support for Alzheimer's, dementia, post-surgery recovery, and chronic conditions.",
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
}

export function ServicesPreview() {
  return (
    <section className="bg-card py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-2xl font-semibold text-foreground md:text-3xl">
          Our Care Services
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Every family is different. We offer a range of services tailored to your loved one's unique needs.
        </p>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[i]
            return (
              <motion.div key={service.href} variants={card}>
                <Link
                  href={service.href}
                  className="group block cursor-pointer rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className="size-8 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {service.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {SERVICE_DESCRIPTIONS[i]}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-primary group-hover:underline">
                    Learn More →
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
