"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Phone, ChevronDown } from "lucide-react"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { SITE_NAME, PHONE_NUMBER, PHONE_HREF, NAV_LINKS, SERVICES } from "@/lib/constants"

export function Header() {
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4" aria-label="Main">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          {SITE_NAME}
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Services with dropdown */}
          <div className="relative">
            <Link href="/services" className="inline-flex h-9 items-center px-3 text-sm font-medium text-foreground hover:text-primary">
              Services
            </Link>
            <button
              aria-label="Services"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen(!servicesOpen)}
              className="inline-flex h-9 items-center px-1 text-sm text-foreground hover:text-primary"
            >
              <ChevronDown className="size-4" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-border bg-card p-2 shadow-lg">
                {SERVICES.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
                    onClick={() => setServicesOpen(false)}
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Other nav links */}
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-9 items-center px-3 text-sm font-medium text-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: phone + CTA + mobile menu */}
        <div className="flex items-center gap-2">
          {/* Phone */}
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary lg:inline-flex"
          >
            <Phone className="size-4" />
            {PHONE_NUMBER}
          </a>

          {/* CTA */}
          <Link
            href="/assessment"
            className="h-11 inline-flex items-center rounded-md bg-secondary px-4 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
          >
            Free Care Assessment
          </Link>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger
              aria-label="Open navigation menu"
              className="inline-flex size-11 items-center justify-center rounded-md text-foreground hover:bg-accent md:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>{SITE_NAME}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <SheetClose key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-4 border-t border-border pt-4">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-2 px-3 py-2 text-base font-medium text-foreground"
                  >
                    <Phone className="size-4" />
                    {PHONE_NUMBER}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
