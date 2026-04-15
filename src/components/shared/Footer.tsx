import Link from "next/link"
import { Phone, MapPin, Clock, ExternalLink } from "lucide-react"
import { EmailLink } from "@/components/shared/EmailLink"
import {
  SITE_NAME,
  PHONE_NUMBER,
  PHONE_HREF,
  EMAIL,
  NAV_LINKS,
  SERVICES,
  SOCIAL_LINKS,
  COMPANY_INFO,
} from "@/lib/constants"

const QUICK_LINKS = NAV_LINKS.filter(
  (link) => !("children" in link)
)


export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="text-xl font-bold text-primary">
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Providing compassionate, professional home care services that help
              your loved ones live safely and comfortably at home.
            </p>
            {/* Social links */}
            <div className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <ExternalLink className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-3 space-y-2">
              {SERVICES.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-3 space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li>
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Phone className="size-4 shrink-0" />
                  {PHONE_NUMBER}
                </a>
              </li>
              <li>
                <EmailLink user="info" domain="agingwellcare.com" />
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4 shrink-0" />
                <span>{COMPANY_INFO.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-border pt-8">
          <span className="text-xs font-medium text-muted-foreground">Licensed &amp; Bonded</span>
          <span className="text-xs font-medium text-muted-foreground">BBB Accredited</span>
          <span className="text-xs font-medium text-muted-foreground">Home Care Association Certified</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-muted/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/accessibility" className="text-xs text-muted-foreground hover:text-primary">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
