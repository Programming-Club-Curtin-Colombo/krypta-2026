import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock3,
  Cog,
  DraftingCompass,
  Globe2,
  MapPin,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = "https://krypta-2026.vercel.app";

export const metadata: Metadata = {
  title: "Engineering Track",
  description:
    "Solve a practical engineering challenge through the KRYPTA 2026 online preliminary round and 8-hour on-premises final.",
  alternates: {
    canonical: `${SITE_URL}/tracks/engineering`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Engineering Track | KRYPTA 2026",
    description:
      "A multi-stage engineering and problem-solving competition culminating in an 8-hour final at Curtin University Colombo.",
    url: `${SITE_URL}/tracks/engineering`,
    type: "website",
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "KRYPTA 2026 - Engineering Grand Final",
  description:
    "An 8-hour on-premises engineering and problem-solving final at Curtin University Colombo. Finalists qualify through an online preliminary round.",
  url: `${SITE_URL}/tracks/engineering`,
  image: `${SITE_URL}/opengraph-image.png`,
  startDate: "2026-11-28",
  duration: "PT8H",
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
    name: "KRYPTA 2026 - Engineering Track",
    description:
      "A two-stage competition beginning with an online preliminary round before the on-premises Grand Final.",
    url: `${SITE_URL}/tracks/engineering`,
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

export default function EngineeringPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <Navbar />
      <main id="main-content" className="container-xl py-16 max-w-3xl">
          <div className="mb-12">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 mb-5"
              aria-hidden="true"
            >
              <Cog className="h-6 w-6 text-[var(--color-primary)]" />
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
              Engineering
            </h1>
            <p className="text-base text-[var(--color-foreground-muted)] leading-relaxed">
              Combine engineering judgment, structured problem-solving, and
              practical execution to develop a credible solution.
            </p>
          </div>

          <Section id="overview" title="Overview">
            <p>
              The Engineering track is built around a focused technical
              challenge that rewards clear reasoning and an effective response
              to real-world constraints. Participants move from analysis and
              design to a practical, evidence-backed solution.
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
                  The Open Stage assesses each participant&apos;s approach and
                  determines who advances to the on-site finale.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
                <Clock3 className="h-5 w-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                  8-hour Grand Final
                </h3>
                <p>
                  Finalists complete an intensive 8-hour on-premises challenge
                  at Curtin University Colombo.
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
                Break down a technical problem, its constraints, and its success
                criteria.
              </li>
              <li>
                Develop and compare possible solutions using sound engineering
                reasoning.
              </li>
              <li>
                Create, test, or simulate a practical response within the
                competition window.
              </li>
              <li>
                Communicate trade-offs, evidence, and outcomes to the judging
                panel.
              </li>
            </ul>
          </Section>

          <Section id="eligibility" title="Eligibility & What to Expect">
            <p className="flex items-start gap-2">
              <DraftingCompass
                className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-primary)]"
                aria-hidden="true"
              />
              Expect an interdisciplinary problem where careful assumptions,
              teamwork, iteration, and a defensible result matter as much as
              speed.
            </p>
            <p className="flex items-start gap-2">
              <Users
                className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-primary)]"
                aria-hidden="true"
              />
              Final team sizes, eligibility requirements, judging criteria,
              permitted equipment, and submission rules will be published with
              registration details.
            </p>
          </Section>
        </main>
      <Footer />
    </>
  );
}
