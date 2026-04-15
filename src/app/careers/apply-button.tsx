"use client"

import { useCallback } from "react"

export function ApplyButton({ title, emailUser, emailDomain }: { title: string; emailUser: string; emailDomain: string }) {
  const handleClick = useCallback(() => {
    window.location.href = `mailto:${emailUser}@${emailDomain}?subject=Application: ${title}`
  }, [title, emailUser, emailDomain])

  return (
    <button
      type="button"
      onClick={handleClick}
      className="cursor-pointer text-sm font-medium text-primary hover:underline"
    >
      Apply
    </button>
  )
}
