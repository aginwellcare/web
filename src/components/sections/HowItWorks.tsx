"use client"

import { motion } from "framer-motion"
import { Phone, ClipboardList, Heart } from "lucide-react"

const STEPS = [
  { number: "1", icon: Phone, title: "Contact Us", description: "Call us or fill out our free assessment form. We'll listen to your situation and answer your questions." },
  { number: "2", icon: ClipboardList, title: "Care Assessment", description: "A care coordinator visits your home to understand your loved one's needs and create a personalized care plan." },
  { number: "3", icon: Heart, title: "Begin Care", description: "We match you with a carefully selected caregiver and begin providing compassionate, reliable care." },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export function HowItWorks() {
  return (
    <section className="bg-accent py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-2xl font-semibold text-foreground md:text-3xl">
          How It Works
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 grid gap-8 md:grid-cols-3"
        >
          {STEPS.map((step) => (
            <motion.div key={step.number} variants={item} className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {step.number}
              </div>
              <step.icon className="mx-auto mt-4 size-8 text-primary" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
