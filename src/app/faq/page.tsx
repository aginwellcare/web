"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { FAQ_CATEGORIES } from "@/content/faqs"

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggle = (id: string) => setOpenItem((prev) => (prev === id ? null : id))

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
        <div className="mt-8 space-y-8">
          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.name}>
              <h2 className="text-lg font-semibold text-foreground">{cat.name}</h2>
              <div className="mt-4 space-y-2">
                {cat.questions.map((q) => {
                  const id = `${cat.name}-${q.question}`.replace(/\s/g, "-")
                  const isOpen = openItem === id
                  return (
                    <div key={id} className="rounded-lg border border-border">
                      <button
                        onClick={() => toggle(id)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground"
                        aria-expanded={isOpen}
                      >
                        {q.question}
                        <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-3 text-sm text-muted-foreground">{q.answer}</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
