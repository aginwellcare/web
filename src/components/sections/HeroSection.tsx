import Link from "next/link"
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants"

export function HeroSection() {
  return (
    <section className="relative flex h-[60vh] items-center justify-center overflow-hidden md:h-[70vh]">
      {/* Background video with image poster fallback */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero.avif"
          className="absolute inset-0 size-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Centered overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered content — one line + one button */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
          Home Care That Feels Like Family
        </h1>
        <div className="mt-6">
          <Link
            href="/assessment"
            className="h-12 inline-flex items-center justify-center rounded-md bg-secondary px-8 text-base font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90"
          >
            Get Started
          </Link>
        </div>
        <a
          href={PHONE_HREF}
          className="mt-3 inline-block text-sm text-white/80 hover:text-white"
        >
          or call {PHONE_NUMBER}
        </a>
      </div>
    </section>
  )
}
