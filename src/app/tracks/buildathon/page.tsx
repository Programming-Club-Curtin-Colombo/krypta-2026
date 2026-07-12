import type { Metadata } from "next";
import Link from "next/link";
import { Blocks, Clock3, Globe2, MapPin, Users } from "lucide-react";

const SITE_URL = "https://krypta-2026.vercel.app";

export const metadata: Metadata = {
  title: "Buildathon Track",
  description:
    "Build a full-stack product through the KRYPTA 2026 online preliminary round and 24-hour on-premises Buildathon final.",
  alternates: {
    canonical: `${SITE_URL}/tracks/buildathon`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Buildathon Track | KRYPTA 2026",
    description:
      "A multi-stage full-stack product-building competition culminating in a 24-hour final at Curtin University Colombo.",
    url: `${SITE_URL}/tracks/buildathon`,
    type: "website",
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "KRYPTA 2026 - Buildathon Grand Final",
  description:
    "A 24-hour on-premises full-stack product-building final at Curtin University Colombo. Finalists qualify through an online preliminary round.",
  url: `${SITE_URL}/tracks/buildathon`,
  image: `${SITE_URL}/opengraph-image.png`,
  startDate: "2026-11-28",
  endDate: "2026-11-29",
  duration: "PT24H",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Curtin University Colombo",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Programming Club of Curtin University Colombo",
    url: SITE_URL,
  },
  superEvent: {
    "@type": "Event",
    name: "KRYPTA 2026 - Buildathon Track",
    description:
      "A two-stage competition beginning with an online preliminary round before the on-premises Grand Final.",
    url: `${SITE_URL}/tracks/buildathon`,
  },
};

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

export default function BuildathonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <div className="min-h-screen bg-[var(--color-background)]">
        <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-4">
          <div className="container-xl">
            <Link
              href="/tracks"
              className="text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors duration-150"
              aria-label="Back to KRYPTA 2026 tracks"
            >
              ← Back to Tracks
            </Link>
          </div>
        </header>

        <main id="main-content" className="container-xl py-16 max-w-3xl">
          <div className="mb-12">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 mb-5"
              aria-hidden="true"
            >
              <Blocks className="h-6 w-6 text-[var(--color-primary)]" />
            </div>
            <p
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Competition Track
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Buildathon
            </h1>
            <p className="text-base text-[var(--color-foreground-muted)] leading-relaxed">
              Build, validate, and present a functional full-stack product in a
              fast-moving competition shaped by real constraints.
            </p>
          </div>

          <Section id="overview" title="Overview">
            <p>
              The Buildathon is KRYPTA 2026&apos;s product-building track. Teams
              transform an idea into a working software solution by combining
              thoughtful product design, reliable engineering, and a clear
              demonstration of value.
            </p>
          </Section>

          <Section id="format" title="Format">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
                <Globe2 className="h-5 w-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                  Online preliminary
                </h3>
                <p>
                  The Open Stage tests each team&apos;s approach and determines
                  who advances to the on-site finale.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
                <Clock3 className="h-5 w-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                  24-hour Grand Final
                </h3>
                <p>
                  Finalists build on premises at Curtin University Colombo
                  across an intensive 24-hour competition window.
                </p>
              </div>
            </div>
            <p className="flex items-center gap-2">
              <MapPin
                className="h-4 w-4 text-[var(--color-primary)]"
                aria-hidden="true"
              />
              Grand Final location: Curtin University Colombo.
            </p>
          </Section>

          <Section id="participants-do" title="What Participants Do">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Interpret a challenge and define a focused product concept.
              </li>
              <li>
                Design and implement the front end, back end, and supporting
                integrations.
              </li>
              <li>
                Test, refine, and document a functional solution within the
                competition window.
              </li>
              <li>
                Present the product and its technical decisions to the judging
                panel.
              </li>
            </ul>
          </Section>

          <Section id="eligibility" title="Eligibility & What to Expect">
            <p>
              Participants should be ready to collaborate under time pressure,
              divide responsibilities, respond to feedback, and demonstrate a
              working outcome rather than a concept alone.
            </p>
            <p className="flex items-start gap-2">
              <Users
                className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-primary)]"
                aria-hidden="true"
              />
              Final team sizes, eligibility requirements, judging criteria,
              permitted tools, and submission rules will be published with
              registration details.
            </p>
          </Section>
        </main>
      </div>
    </>
  );
}
