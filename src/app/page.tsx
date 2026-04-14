import { HeroSection } from "@/components/sections/HeroSection"
import { TrustBar } from "@/components/sections/TrustBar"
import { ServicesPreview } from "@/components/sections/ServicesPreview"
import { WhyChooseUs } from "@/components/sections/WhyChooseUs"
import { StatsCounter } from "@/components/sections/StatsCounter"
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { CTABanner } from "@/components/shared/CTABanner"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesPreview />
      <WhyChooseUs />
      <StatsCounter />
      <TestimonialsCarousel />
      <HowItWorks />
      <CTABanner heading="Ready to Discuss Care for Your Loved One?" />
    </>
  )
}
