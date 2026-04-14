export const SITE_NAME = "AgingWellCare"
export const PHONE_NUMBER = "(555) 123-4567"
export const PHONE_HREF = "tel:+15551234567"
export const EMAIL = "info@agingwellcare.com"

export const NAV_LINKS = [
  { label: "Services", href: "/services", children: [
    { label: "Personal Care", href: "/services/personal-care" },
    { label: "Companion Care", href: "/services/companion-care" },
    { label: "Live-In Care", href: "/services/live-in-care" },
    { label: "Respite Care", href: "/services/respite-care" },
    { label: "Specialized Care", href: "/services/specialized-care" },
  ]},
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Locations", href: "/locations" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const

export const SERVICES = NAV_LINKS[0].children

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/agingwellcare", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com/agingwellcare", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/company/agingwellcare", icon: "linkedin" },
] as const

export const COMPANY_INFO = {
  name: SITE_NAME,
  address: "123 Care Street, Suite 100, Phoenix, AZ 85001",
  phone: PHONE_NUMBER,
  phoneHref: PHONE_HREF,
  email: EMAIL,
  hours: "Monday - Friday: 8:00 AM - 6:00 PM",
} as const
