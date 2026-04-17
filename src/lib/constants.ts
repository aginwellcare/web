import company from "@/content/company.json"

export const SITE_NAME = company.name
export const PHONE_NUMBER = company.phone
export const PHONE_HREF = company.phoneHref
export const EMAIL = company.email

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
  { label: "Facebook", href: company.social.facebook, icon: "facebook" },
  { label: "Instagram", href: company.social.instagram, icon: "instagram" },
  { label: "LinkedIn", href: company.social.linkedin, icon: "linkedin" },
] as const

export const COMPANY_INFO = {
  name: company.name,
  address: company.address,
  phone: company.phone,
  phoneHref: company.phoneHref,
  email: company.email,
  domain: company.domain,
  emailUser: company.emailUser,
  emailDomain: company.emailDomain,
  hours: company.hours,
} as const
