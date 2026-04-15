import { FAQ_CATEGORIES } from "@/content/faqs"
import { FAQAccordion } from "./faq-accordion"

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.questions.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      }))
    ),
  }

  return (
    <section className="bg-background py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Frequently Asked Questions</h1>
        <FAQAccordion categories={FAQ_CATEGORIES} />
      </div>
    </section>
  )
}
