import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ── Constants ─────────────────────────────────────────────────────────────────
const SITE_URL = "https://krypta-2026.vercel.app";
const EFFECTIVE_DATE = "July 11, 2025";
const CONTACT_EMAIL = "krypta.pc.cuc@gmail.com";

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how KRYPTA 2026 collects, uses, and protects your personal information including email addresses, analytics data, and cookies.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | KRYPTA 2026",
    description:
      "How KRYPTA 2026 handles your data - email collection, analytics, and cookies.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
  },
};

// ── JSON-LD ───────────────────────────────────────────────────────────────────
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy - KRYPTA 2026",
  description:
    "Privacy Policy for the KRYPTA 2026 hackathon website, operated by the Programming Club of Curtin University Colombo.",
  url: `${SITE_URL}/privacy-policy`,
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    name: "KRYPTA 2026",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Programming Club - Curtin University Colombo",
    url: SITE_URL,
  },
  dateModified: new Date().toISOString(),
};

// ── Section helper ────────────────────────────────────────────────────────────
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mb-10">
      <h2
        id={id}
        className="text-xl font-bold text-[var(--color-foreground)] mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-sm text-[var(--color-foreground-muted)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <Navbar />
      <main id="main-content" className="container-xl py-16 max-w-3xl">
          {/* Page heading */}
          <div className="mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Legal
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Privacy Policy
            </h1>
            <p className="text-sm text-[var(--color-foreground-muted)]">
              Effective date: {EFFECTIVE_DATE}. Last reviewed:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <Section id="section-intro" title="1. Introduction">
            <p>
              This Privacy Policy describes how the Programming Club of Curtin
              University Colombo (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;our&rdquo;) collects, uses, and protects information when
              you visit the KRYPTA 2026 website at{" "}
              <a
                href={SITE_URL}
                className="text-[var(--color-primary)] hover:underline"
              >
                {SITE_URL}
              </a>{" "}
              (the &ldquo;Site&rdquo;).
            </p>
            <p>
              By using the Site, you agree to the data practices described in
              this Policy. If you do not agree, please discontinue use of the
              Site.
            </p>
          </Section>

          <Section id="section-data-collected" title="2. Information We Collect">
            <p>We collect two categories of information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[var(--color-foreground)]">
                  Information you provide voluntarily:
                </strong>{" "}
                When you submit our notification or &ldquo;Stay Updated&rdquo;
                form, we collect your email address. You are not required to
                submit any form to browse the Site.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">
                  Information collected automatically:
                </strong>{" "}
                When you visit the Site, we automatically receive certain
                technical data including your IP address (anonymised), browser
                type, operating system, referring URL, pages viewed, and
                session duration. This data is collected via the analytics
                services described below.
              </li>
            </ul>
          </Section>

          <Section id="section-email" title="3. Email Collection">
            <p>
              If you submit your email address via our notification form, we
              use it solely to send you updates about KRYPTA 2026 - such as
              registration openings, schedule announcements, and event
              outcomes. We will not sell, rent, or share your email address
              with third parties for marketing purposes.
            </p>
            <p>
              You may withdraw your consent at any time by contacting us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[var(--color-primary)] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              . We will remove your email from our list within 7 business days
              of receiving your request.
            </p>
          </Section>

          <Section id="section-analytics" title="4. Analytics & Tracking Services">
            <p>
              We use the following third-party analytics tools to understand
              how visitors interact with the Site. These services may place
              cookies or use similar tracking technologies on your device.
            </p>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 space-y-4 mt-2">
              <div>
                <p className="font-semibold text-[var(--color-foreground)] mb-1">
                  Google Analytics (GA4)
                </p>
                <p>
                  We use Google Analytics 4 (property ID:{" "}
                  <code className="px-1 py-0.5 rounded bg-[var(--color-surface-2)] text-xs">
                    G-XEFQJCLG7G
                  </code>
                  ) to collect anonymised usage data. Google Analytics uses
                  cookies to identify returning visitors and track sessions.
                  Data is processed by Google LLC and may be transferred to
                  servers in the United States. You can opt out using the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  . Google&apos;s privacy policy is available at{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    policies.google.com/privacy
                  </a>
                  .
                </p>
              </div>
              <hr className="border-[var(--color-border)]" />
              <div>
                <p className="font-semibold text-[var(--color-foreground)] mb-1">
                  Microsoft Clarity
                </p>
                <p>
                  We use Microsoft Clarity (tag ID:{" "}
                  <code className="px-1 py-0.5 rounded bg-[var(--color-surface-2)] text-xs">
                    xjcc7c1b6n
                  </code>
                  ) to capture anonymised session recordings and heatmaps that
                  help us improve the Site&apos;s usability. Clarity does not
                  record passwords or payment information. Data is processed by
                  Microsoft Corporation. Microsoft&apos;s privacy statement is
                  available at{" "}
                  <a
                    href="https://privacy.microsoft.com/privacystatement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    privacy.microsoft.com
                  </a>
                  .
                </p>
              </div>
              <hr className="border-[var(--color-border)]" />
              <div>
                <p className="font-semibold text-[var(--color-foreground)] mb-1">
                  Vercel Speed Insights
                </p>
                <p>
                  We use Vercel Speed Insights to collect Core Web Vitals and
                  real-user performance metrics. This service helps us monitor
                  and improve the Site&apos;s speed, stability, and overall user
                  experience. Performance analytics are only enabled after you
                  have granted consent where required by applicable privacy laws.
                  Vercel Speed Insights may process technical information such as
                  browser type, device information, pages visited, and similar
                  usage data. Data is processed by Vercel Inc. Vercel&apos;s
                  privacy policy is available at{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    vercel.com/legal/privacy-policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </Section>

          <Section id="section-cookies" title="5. Cookies">
            <p>
              Cookies are small text files placed on your device by a website.
              We use the following types of cookies:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[var(--color-foreground)]">
                  Essential cookies:
                </strong>{" "}
                Required for the Site to function, such as remembering your
                theme preference (light/dark) and your cookie consent choices.
                These are always enabled and cannot be disabled.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">
                  Analytics cookies:
                </strong>{" "}
                Set by Google Analytics, Microsoft Clarity, and Vercel Speed
                Insights to collect anonymised usage statistics and performance
                metrics. These are only enabled after you grant consent through
                our cookie consent banner. You can block these via your browser
                settings or an ad-blocking extension without affecting Site
                functionality.
              </li>
            </ul>
            <p>
              When you first visit the Site, you will see a cookie consent banner
              that allows you to accept or reject non-essential cookies. You can
              change your cookie preferences at any time by clicking the
              &ldquo;Cookie Preferences&rdquo; link in the website footer. If you
              withdraw your consent, we will stop future analytics collection and
              remove non-essential cookies where possible.
            </p>
            <p>
              You can also manage or delete cookies at any time through your
              browser settings. Blocking analytics cookies will not prevent you
              from using any part of the Site.
            </p>
          </Section>

          <Section id="section-data-sharing" title="6. Data Sharing & Third Parties">
            <p>
              We do not sell or rent your personal information. We share data
              only with the analytics service providers described in Section 4,
              and only to the extent necessary to operate those services. Each
              provider is bound by their own privacy terms.
            </p>
            <p>
              We may disclose information if required by law, regulation, or
              legal process, or to protect the rights and safety of our
              organisation and users.
            </p>
          </Section>

          <Section id="section-retention" title="7. Data Retention">
            <p>
              Email addresses collected via our notification form are retained
              until KRYPTA 2026 concludes or until you request removal,
              whichever comes first. Analytics data is retained in accordance
              with each third-party provider&apos;s default retention settings
              (typically 14 months for Google Analytics).
            </p>
          </Section>

          <Section id="section-security" title="8. Security">
            <p>
              We take reasonable technical and organisational measures to
              protect information collected through the Site. However, no
              method of transmission over the internet is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </Section>

          <Section id="section-rights" title="9. Your Rights">
            <p>
              Depending on your jurisdiction, you may have rights regarding your
              personal data, including the right to access, correct, or delete
              it. To exercise any of these rights, please contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[var(--color-primary)] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              . We will respond within 30 days.
            </p>
          </Section>

          <Section id="section-children" title="10. Children's Privacy">
            <p>
              The Site is not directed to children under 13 years of age. We do
              not knowingly collect personal information from children under 13.
              If you believe we have inadvertently collected such information,
              please contact us and we will delete it promptly.
            </p>
          </Section>

          <Section id="section-changes" title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Material
              changes will be reflected by an updated effective date at the top
              of this page. We encourage you to review this page periodically.
              Continued use of the Site after any changes constitutes
              acceptance of the revised policy.
            </p>
          </Section>

          <Section id="section-contact" title="12. Contact Us">
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at:
            </p>
            <address className="not-italic">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[var(--color-primary)] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <br />
              Programming Club of Curtin University Colombo
              <br />
              Nawam Mawatha, Colombo, Sri Lanka
            </address>
          </Section>

          <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
            >
              ← Return to KRYPTA 2026
            </Link>
          </div>
        </main>
      <Footer />
    </>
  );
}
