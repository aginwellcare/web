import type { Metadata } from "next"
import { SITE_NAME, PHONE_NUMBER, PHONE_HREF, COMPANY_INFO } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last Updated: April 17, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <p>
              {SITE_NAME} (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting
              the privacy and security of the personal information of our clients, their families, caregivers, and visitors
              to our website. This Privacy Policy describes how we collect, use, disclose, and safeguard your information
              when you visit our website at {COMPANY_INFO.domain} (the &ldquo;Site&rdquo;), use our services, or otherwise
              interact with us.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
            <p className="mt-3">We may collect the following categories of personal information:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><strong>Identifiers:</strong> Name, email address, phone number, mailing address, and other contact information you provide through our forms or communications.</li>
              <li><strong>Care Recipient Information:</strong> Name, age, relationship to the inquiring party, care needs, schedule preferences, and health-related information voluntarily provided during care assessments.</li>
              <li><strong>Employment Information:</strong> Resume, work history, certifications, and references submitted through our careers page.</li>
              <li><strong>Device and Usage Data:</strong> IP address, browser type, operating system, referring URLs, pages viewed, time spent on pages, and other analytical data collected automatically through cookies and similar technologies.</li>
              <li><strong>Communications:</strong> Records of correspondence when you contact us via phone, email, live chat, or our contact forms.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
            <p className="mt-3">We use the information we collect for the following purposes:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>To respond to inquiries and provide information about our home care services</li>
              <li>To conduct care assessments and develop personalized care plans</li>
              <li>To match clients with appropriate caregivers</li>
              <li>To communicate with you regarding your account, services, or inquiries</li>
              <li>To process employment applications</li>
              <li>To improve our website, services, and client experience</li>
              <li>To comply with legal obligations and protect our rights</li>
              <li>To send periodic communications about our services, with your consent</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Disclosure of Your Information</h2>
            <p className="mt-3">
              We do not sell your personal information to third parties. We may share your information in the following circumstances:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website, conducting our business, or providing services to you, subject to confidentiality obligations.</li>
              <li><strong>Legal Compliance:</strong> When required by law, regulation, legal process, or governmental request.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction.</li>
              <li><strong>Protection of Rights:</strong> To protect the safety, rights, or property of {SITE_NAME}, our clients, caregivers, or the public.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. SMS/Text Messaging and Mobile Information</h2>
            <p className="mt-3">
              No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
              All the above categories exclude text messaging originator opt-in data and consent; this information will not
              be shared with any third parties. You can opt out at any time by replying STOP. Message and data rates may apply.
            </p>
            <p className="mt-3">
              If you opt in to receive SMS or text messages from {SITE_NAME}, you consent to receive recurring automated
              marketing and informational text messages at the phone number provided. Consent is not a condition of any purchase.
              Reply HELP for help. Message frequency varies.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Cookies and Tracking Technologies</h2>
            <p className="mt-3">
              Our Site uses cookies, web beacons, and similar tracking technologies to enhance your browsing experience,
              analyze site traffic, and understand where our visitors are coming from. You may set your browser to refuse
              cookies or alert you when cookies are being sent. If you disable cookies, some features of the Site may not
              function properly.
            </p>
            <p className="mt-3">
              We may use third-party analytics services, such as Google Analytics, to collect and analyze usage data.
              These services may use cookies and other tracking technologies to help us understand how visitors use our Site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Data Security</h2>
            <p className="mt-3">
              We implement commercially reasonable administrative, technical, and physical security measures to protect your
              personal information from unauthorized access, use, alteration, or disclosure. However, no method of transmission
              over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">7. Data Retention</h2>
            <p className="mt-3">
              We retain personal information for as long as necessary to fulfill the purposes for which it was collected,
              comply with legal obligations, resolve disputes, and enforce our agreements. When personal information is no
              longer needed, we will securely dispose of or de-identify it.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">8. Third-Party Links</h2>
            <p className="mt-3">
              Our Site may contain links to third-party websites or services that are not operated by us. We have no control
              over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites
              or services. We encourage you to review the privacy policy of every site you visit.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">9. Children&apos;s Privacy</h2>
            <p className="mt-3">
              Our Site and services are not directed to individuals under the age of 13. We do not knowingly collect personal
              information from children under 13. If we become aware that we have collected personal information from a child
              under 13, we will take steps to promptly delete such information.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">10. Your Rights and Choices</h2>
            <p className="mt-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate personal information</li>
              <li>Request deletion of your personal information, subject to certain exceptions</li>
              <li>Opt out of the sale or sharing of your personal information</li>
              <li>Opt out of receiving promotional communications from us</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us using the information provided below. We will respond
              to verified requests within 45 days, as required by applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">11. California Residents</h2>
            <p className="mt-3">
              If you are a California resident, the California Consumer Privacy Act (CCPA) and the California Privacy
              Rights Act (CPRA) provide you with additional rights regarding your personal information, including the
              right to know, delete, correct, and opt out of the sale or sharing of your personal information.
              You may designate an authorized agent to make a request on your behalf. We will not discriminate against
              you for exercising any of your rights.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">12. Changes to This Privacy Policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technologies,
              legal requirements, or other factors. We will post the updated policy on this page with a revised
              &ldquo;Last Updated&rdquo; date. Your continued use of the Site after any changes constitutes your
              acceptance of the updated Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">13. Contact Us</h2>
            <p className="mt-3">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
              please contact us at:
            </p>
            <div className="mt-3 rounded-lg border border-border bg-card p-4">
              <p className="font-semibold text-foreground">{SITE_NAME}</p>
              <p>{COMPANY_INFO.address}</p>
              <p>Phone: <a href={PHONE_HREF} className="text-primary hover:underline">{PHONE_NUMBER}</a></p>
              <p>Email: {COMPANY_INFO.email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
