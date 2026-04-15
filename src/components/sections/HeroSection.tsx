import Image from "next/image"
import Link from "next/link"
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-end overflow-hidden pb-20">
      {/* Background — video if available, image fallback with Ken Burns */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero.avif"
          className="absolute inset-0 size-full object-cover"
        >
          {/* Uncomment when video is ready:
          <source src="/videos/hero.mp4" type="video/mp4" />
          */}
        </video>
        {/* Image fallback — shows when video has no source */}
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src="/images/hero.avif"
            alt="Caregiver with elderly person in a warm home setting"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Bottom gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Minimal content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="animate-fade-up">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Compassionate Home Care That Feels Like Family
          </h1>
          <div className="mt-6 flex items-center gap-6">
            <Link
              href="/assessment"
              className="h-12 inline-flex items-center justify-center rounded-md bg-secondary px-8 text-base font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90"
            >
              Get Started
            </Link>
            <a
              href={PHONE_HREF}
              className="text-base font-medium text-white/90 hover:text-white"
            >
              or call {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
