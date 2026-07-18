import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { Breadcrumb } from "@/components/seo";
import { generateMetadata, SITE_URL, CONTACT_EMAIL } from "@/lib";

// ── Constants ─────────────────────────────────────────────────────────────────
const EFFECTIVE_DATE = "July 11, 2025";

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = generateMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for KRYPTA 2026 - the multi-track Buildathon and CTF competition organised by the Programming Club of Curtin University Colombo.",
  path: "/terms",
});

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
export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container-xl py-16 max-w-3xl">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Terms & Conditions", href: "/terms" },
              ]}
              className="mb-6"
            />
          </div>
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
              Terms &amp; Conditions
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
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use
              of the KRYPTA 2026 website located at{" "}
              <a
                href={SITE_URL}
                className="text-[var(--color-primary)] hover:underline"
              >
                {SITE_URL}
              </a>{" "}
              (the &ldquo;Site&rdquo;) and your participation in the KRYPTA 2026
              competition (the &ldquo;Event&rdquo;), organised by the
              Programming Club of Curtin University Colombo
              (&ldquo;Organiser&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;our&rdquo;).
            </p>
            <p>
              By visiting the Site or registering for the Event, you confirm
              that you have read, understood, and agree to be bound by these
              Terms. If you do not agree, please refrain from using the Site or
              participating in the Event.
            </p>
          </Section>

          <Section id="section-event" title="2. About KRYPTA 2026">
            <p>
              KRYPTA 2026 is a multi-track competition comprising three distinct
              tracks:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong className="text-[var(--color-foreground)]">
                  Buildathon Track:
                </strong>{" "}
                A product-building competition where teams design, develop, and
                present a functional software solution within a defined
                timeframe.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">
                  Capture The Flag (CTF) Track:
                </strong>{" "}
                A cybersecurity competition where participants solve
                security-focused challenges spanning cryptography, web
                exploitation, reverse engineering, and forensics.
              </li>
            </ul>
            <p>
              All specific rules, formats, prize structures, and judging
              criteria for each track will be published separately prior to
              registration. Those rules form part of these Terms when published.
            </p>
          </Section>

          <Section id="section-eligibility" title="3. Eligibility">
            <p>
              Participation in KRYPTA 2026 is open to all individuals who meet
              the eligibility criteria to be published alongside registration
              details. At the time of these Terms:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Participants must be currently enrolled students or recent
                graduates, unless otherwise stated in the official registration
                guidelines.
              </li>
              <li>
                Participants must be at least 18 years of age, or have written
                parental or guardian consent if under 18.
              </li>
              <li>
                Organisers, judges, mentors, and their immediate family members
                are not eligible to compete.
              </li>
              <li>
                The Organiser reserves the right to verify eligibility and
                disqualify any participant who does not meet the requirements.
              </li>
            </ul>
          </Section>

          <Section
            id="section-registration"
            title="4. Registration & Notification Sign-Up"
          >
            <p>
              Registration for the Event will open on a date to be announced.
              Providing your email address on the Site enrolls you in
              pre-registration notifications only and does not constitute formal
              registration for the Event.
            </p>
            <p>
              By submitting your email address, you consent to receive
              communications about KRYPTA 2026, including registration
              announcements, event updates, and schedule information. You may
              withdraw consent at any time by contacting{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[var(--color-primary)] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section id="section-ip" title="5. Intellectual Property">
            <p>
              Participants retain full ownership of all original work,
              inventions, and intellectual property created during the Event. By
              participating, you grant the Organiser a non-exclusive,
              royalty-free licence to feature your project name, description,
              screenshots, and team name in post-event communications,
              promotional materials, and social media, solely for the purpose of
              showcasing KRYPTA 2026.
            </p>
            <p>
              All content on the Site - including but not limited to text,
              graphics, logos, and software - is the property of the Organiser
              or its licensors and is protected by applicable intellectual
              property laws. You may not reproduce or redistribute any Site
              content without prior written permission.
            </p>
          </Section>

          <Section id="section-conduct" title="6. Code of Conduct">
            <p>
              All participants, mentors, judges, volunteers, and attendees are
              expected to uphold a standard of professional and respectful
              conduct throughout the Event. The following are strictly
              prohibited:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Harassment, discrimination, or intimidation of any kind based on
                race, gender, religion, disability, age, sexual orientation, or
                any other characteristic.
              </li>
              <li>
                Plagiarism, submission of pre-existing work as original, or
                violation of another party&apos;s intellectual property rights.
              </li>
              <li>
                Any attempt to disrupt, sabotage, or gain an unfair advantage
                over other participants.
              </li>
              <li>
                For the CTF track: attacking competition infrastructure or other
                participants&apos; systems outside of designated challenge
                boundaries.
              </li>
            </ul>
            <p>
              Violation of the Code of Conduct may result in immediate
              disqualification and removal from the Event without recourse.
            </p>
          </Section>

          <Section id="section-site-use" title="7. Use of the Site">
            <p>
              You agree to use the Site only for lawful purposes. You must not:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Attempt to gain unauthorised access to any part of the Site or
                its underlying systems.
              </li>
              <li>
                Use the Site in any way that could damage, disable, or impair
                its availability or functionality.
              </li>
              <li>
                Transmit any unsolicited or unauthorised advertising or
                promotional material.
              </li>
            </ul>
          </Section>

          <Section id="section-disclaimer" title="8. Disclaimer of Warranties">
            <p>
              The Site and all information on it are provided on an &ldquo;as
              is&rdquo; and &ldquo;as available&rdquo; basis without any
              warranties of any kind, express or implied, including warranties
              of merchantability, fitness for a particular purpose, or
              non-infringement. We do not warrant that the Site will be
              uninterrupted, error-free, or free of viruses or other harmful
              components.
            </p>
          </Section>

          <Section id="section-liability" title="9. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, the Organiser
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of the
              Site or participation in the Event, including but not limited to
              loss of data, loss of profits, or personal injury.
            </p>
            <p>
              The Organiser&apos;s total liability to you for any claim arising
              from these Terms or the Event shall not exceed the registration
              fee paid by you, if any.
            </p>
          </Section>

          <Section id="section-photos" title="10. Photography & Media">
            <p>
              The Event may be photographed or recorded by the Organiser or its
              appointed representatives. By attending the Event in person or
              virtually, you grant the Organiser permission to use your likeness
              in photographs, videos, and recordings for promotional,
              educational, and journalistic purposes without compensation.
            </p>
            <p>
              If you do not wish to appear in event photography, please notify
              us in advance at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[var(--color-primary)] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section
            id="section-changes-event"
            title="11. Event Changes & Cancellation"
          >
            <p>
              The Organiser reserves the right to modify, postpone, or cancel
              the Event at any time due to circumstances beyond its reasonable
              control, including but not limited to natural disasters, public
              health emergencies, or security concerns. In such cases, the
              Organiser will endeavour to provide reasonable notice via the Site
              and registered email addresses.
            </p>
            <p>
              The Organiser reserves the right to amend competition rules,
              formats, prize structures, and schedules. Any material changes
              will be communicated to registered participants.
            </p>
          </Section>

          <Section id="section-privacy" title="12. Privacy">
            <p>
              Your use of the Site and participation in the Event is also
              governed by our{" "}
              <Link
                href="/privacy-policy"
                className="text-[var(--color-primary)] hover:underline"
              >
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference. Please
              review it to understand our data practices.
            </p>
          </Section>

          <Section id="section-governing-law" title="13. Governing Law">
            <p>
              These Terms are governed by and construed in accordance with the
              laws of the Democratic Socialist Republic of Sri Lanka. Any
              disputes arising under these Terms shall be subject to the
              exclusive jurisdiction of the courts of Sri Lanka.
            </p>
          </Section>

          <Section
            id="section-changes-terms"
            title="14. Changes to These Terms"
          >
            <p>
              We may update these Terms from time to time. Changes will be
              indicated by an updated effective date at the top of this page.
              Continued use of the Site or participation in the Event after
              changes are posted constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section id="section-contact" title="15. Contact">
            <p>For questions about these Terms, please contact us at:</p>
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
