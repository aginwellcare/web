"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

type Category = {
  readonly name: string
  readonly questions: readonly { readonly question: string; readonly answer: string }[]
}

export function FAQAccordion({ categories }: { categories: readonly Category[] }) {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggle = (id: string) => setOpenItem((prev) => (prev === id ? null : id))

  return (
    <div className="mt-8 space-y-8">
      {categories.map((cat) => (
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
  )
}
