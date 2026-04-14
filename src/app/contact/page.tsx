import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { PHONE_NUMBER, PHONE_HREF, EMAIL, COMPANY_INFO } from "@/lib/constants"
import { ContactForm } from "@/components/forms/ContactForm"

export default function ContactPage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Contact Us</h1>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <div className="space-y-6">
            <div className="flex gap-3"><Phone className="size-5 text-primary" /><div><p className="font-semibold">Phone</p><a href={PHONE_HREF} className="text-muted-foreground hover:text-primary">{PHONE_NUMBER}</a></div></div>
            <div className="flex gap-3"><Mail className="size-5 text-primary" /><div><p className="font-semibold">Email</p><a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-primary">{EMAIL}</a></div></div>
            <div className="flex gap-3"><MapPin className="size-5 text-primary" /><div><p className="font-semibold">Address</p><p className="text-muted-foreground">{COMPANY_INFO.address}</p></div></div>
            <div className="flex gap-3"><Clock className="size-5 text-primary" /><div><p className="font-semibold">Hours</p><p className="text-muted-foreground">{COMPANY_INFO.hours}</p></div></div>
          </div>
        </div>
      </div>
    </section>
  )
}
