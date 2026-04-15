"use client"

import { useState, useEffect } from "react"
import { Mail } from "lucide-react"

export function EmailLink({ user, domain }: { user: string; domain: string }) {
  const [email, setEmail] = useState("")

  useEffect(() => {
    setEmail(`${user}@${domain}`)
  }, [user, domain])

  if (!email) {
    return (
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="size-4 shrink-0" />
        Contact us via the form
      </span>
    )
  }

  return (
    <a
      href={`mailto:${email}`}
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
    >
      <Mail className="size-4 shrink-0" />
      {email}
    </a>
  )
}
