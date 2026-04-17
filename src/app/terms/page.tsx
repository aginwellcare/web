import type { Metadata } from "next"
import { SITE_NAME, PHONE_NUMBER, PHONE_HREF } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Terms of Use",
}

export default function TermsOfUsePage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Terms of Use</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last Updated: April 17, 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <p>
              Welcome to the website of {SITE_NAME} (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
              or &ldquo;our&rdquo;). By accessing or using our website at agingwellcare.com (the &ldquo;Site&rdquo;),
              you agree to be bound by these Terms of Use (&ldquo;Terms&rdquo;). If you do not agree to these Terms,
              please do not use the Site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-3">
              By using this Site, you represent that you are at least 18 years of age and have the legal capacity
              to enter into these Terms. If you are using the Site on behalf of an organization, you represent that
              you have the authority to bind that organization to these Terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. Description of Services</h2>
            <p className="mt-3">
              {SITE_NAME} provides non-medical in-home care services, including but not limited to personal care,
              companion care, live-in care, respite care, and specialized care for individuals with specific health
              conditions. The information provided on this Site is for general informational purposes and does not
              constitute medical advice. Our services are not a substitute for professional medical care, diagnosis,
              or treatment.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Use of the Site</h2>
            <p className="mt-3">You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Use the Site in any way that violates any applicable federal, state, or local law or regulation</li>
              <li>Engage in any conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Site</li>
              <li>Attempt to gain unauthorized access to any portion of the Site, its servers, or any systems connected to the Site</li>
              <li>Use any robot, spider, scraper, or other automated means to access the Site for any purpose without our express written permission</li>
              <li>Introduce any viruses, Trojan horses, worms, or other malicious or technologically harmful material</li>
              <li>Impersonate or misrepresent your affiliation with any person or entity</li>
              <li>Collect or harvest any personally identifiable information from the Site without authorization</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Intellectual Property</h2>
            <p className="mt-3">
              All content on this Site, including but not limited to text, graphics, logos, images, photographs, video,
              audio, software, and the compilation thereof, is the property of {SITE_NAME} or its content suppliers
              and is protected by United States and international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-3">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
              republish, download, store, or transmit any material on our Site without our prior written consent, except
              as incidental to normal web browsing or as expressly permitted herein.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">5. User Submissions</h2>
            <p className="mt-3">
              Any information you submit through our contact forms, care assessments, or other interactive features
              of the Site is subject to our Privacy Policy. By submitting information, you represent that you have
              the right to provide such information and that it is accurate and complete to the best of your knowledge.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. No Medical Advice</h2>
            <p className="mt-3">
              The information provided on this Site is for general informational purposes only and is not intended as,
              nor should it be considered, medical advice. {SITE_NAME} provides non-medical home care services.
              Always seek the advice of your physician or other qualified health care provider with any questions
              you may have regarding a medical condition. Never disregard professional medical advice or delay in
              seeking it because of something you have read on this Site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">7. Third-Party Links</h2>
            <p className="mt-3">
              The Site may contain links to third-party websites or resources. These links are provided for your
              convenience only. We have no control over the contents of those sites or resources and accept no
              responsibility for them or for any loss or damage that may arise from your use of them. If you decide
              to access any of the third-party websites linked to this Site, you do so entirely at your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">8. Disclaimers</h2>
            <p className="mt-3">
              THE SITE AND ALL INFORMATION, CONTENT, MATERIALS, AND SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE
              TO YOU THROUGH THE SITE ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS,
              WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW,
              {SITE_NAME} DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES
              OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="mt-3">
              We do not warrant that the Site will be uninterrupted, timely, secure, or error-free, or that defects
              will be corrected. We do not warrant or make any representations regarding the use or the results of
              the use of the materials on the Site in terms of their correctness, accuracy, reliability, or otherwise.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">9. Limitation of Liability</h2>
            <p className="mt-3">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL {SITE_NAME}, ITS OFFICERS,
              DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE,
              GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE
              OF (OR INABILITY TO ACCESS OR USE) THE SITE OR ANY CONTENT, SERVICES, OR INFORMATION OBTAINED
              THROUGH THE SITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR
              ANY OTHER LEGAL THEORY, AND WHETHER OR NOT WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">10. Indemnification</h2>
            <p className="mt-3">
              You agree to indemnify, defend, and hold harmless {SITE_NAME}, its officers, directors, employees,
              agents, licensors, and suppliers from and against any and all claims, liabilities, damages, judgments,
              awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or
              relating to your violation of these Terms or your use of the Site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">11. Governing Law</h2>
            <p className="mt-3">
              These Terms shall be governed by and construed in accordance with the laws of the State of Arizona,
              without regard to its conflict of law provisions. Any legal action or proceeding arising under these
              Terms shall be brought exclusively in the state or federal courts located in Maricopa County, Arizona,
              and you hereby consent to personal jurisdiction and venue therein.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">12. Modifications to Terms</h2>
            <p className="mt-3">
              We reserve the right to revise and update these Terms at our sole discretion at any time. All changes
              are effective immediately when posted and apply to all access to and use of the Site thereafter. Your
              continued use of the Site following the posting of revised Terms means that you accept and agree to the changes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">13. Severability</h2>
            <p className="mt-3">
              If any provision of these Terms is held to be invalid, illegal, or unenforceable for any reason, such
              provision shall be eliminated or limited to the minimum extent such that the remaining provisions of
              the Terms will continue in full force and effect.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">14. Entire Agreement</h2>
            <p className="mt-3">
              These Terms, together with our Privacy Policy, constitute the sole and entire agreement between you
              and {SITE_NAME} regarding the Site and supersede all prior and contemporaneous understandings,
              agreements, representations, and warranties, both written and oral, regarding the Site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">15. Contact Us</h2>
            <p className="mt-3">
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <div className="mt-3 rounded-lg border border-border bg-card p-4">
              <p className="font-semibold text-foreground">{SITE_NAME}</p>
              <p>123 Care Street, Suite 100, Phoenix, AZ 85001</p>
              <p>Phone: <a href={PHONE_HREF} className="text-primary hover:underline">{PHONE_NUMBER}</a></p>
              <p>Email: info@agingwellcare.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
