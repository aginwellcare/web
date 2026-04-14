"use client"

import Link from "next/link"
import { Phone } from "lucide-react"
import { motion } from "framer-motion"
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] items-center bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Compassionate Home Care That Feels Like Family
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Your loved ones deserve care that goes beyond the basics. Our experienced,
            vetted caregivers provide personalized support so your family can focus on
            what matters most — being together.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/assessment"
              className="h-11 inline-flex items-center justify-center rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
            >
              Schedule Free Assessment
            </Link>
            <a
              href={PHONE_HREF}
              className="h-11 inline-flex items-center justify-center gap-2 rounded-md border-2 border-primary px-6 text-sm font-semibold text-primary hover:bg-primary/10"
            >
              <Phone className="size-4" />
              Call {PHONE_NUMBER}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
