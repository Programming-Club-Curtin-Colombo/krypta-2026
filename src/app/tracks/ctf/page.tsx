import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Flag, Globe2, MapPin, ShieldCheck, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = "https://krypta-2026.vercel.app";

export const metadata: Metadata = {
  title: "Capture The Flag Track",
  description:
    "Take on the KRYPTA 2026 online CTF qualifier and a 12-hour on-premises final spanning cryptography, web exploitation, reverse engineering, and forensics.",
  alternates: {
    canonical: `${SITE_URL}/tracks/ctf`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Capture The Flag Track | KRYPTA 2026",
    description:
      "A multi-stage cybersecurity competition culminating in a 12-hour final at Curtin University Colombo.",
    url: `${SITE_URL}/tracks/ctf`,
    type: "website",
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "KRYPTA 2026 - Capture The Flag Grand Final",
  description:
    "A 12-hour on-premises cybersecurity final at Curtin University Colombo covering cryptography, web exploitation, reverse engineering, and forensics. Finalists qualify through an online stage.",
  url: `${SITE_URL}/tracks/ctf`,
  image: `${SITE_URL}/opengraph-image.png`,
  startDate: "2026-11-28",
  duration: "PT12H",
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
    name: "KRYPTA 2026 - Capture The Flag Track",
    description:
      "A two-stage competition beginning with an online qualifier before the on-premises Grand Final.",
    url: `${SITE_URL}/tracks/ctf`,
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

export default function CtfPage() {
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
              <ShieldCheck className="h-6 w-6 text-[var(--color-primary)]" />
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
              Capture The Flag
            </h1>
            <p className="text-base text-[var(--color-foreground-muted)] leading-relaxed">
              Investigate, exploit, decode, and recover your way through a
              focused set of hands-on cybersecurity challenges.
            </p>
          </div>

          <Section id="overview" title="Overview">
            <p>
              The Capture The Flag track challenges participants to solve
              security puzzles and retrieve hidden flags. Points reward
              technical accuracy, disciplined investigation, and the ability to
              move efficiently across different cybersecurity domains.
            </p>
          </Section>

          <Section id="format" title="Format">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
                <Globe2 className="h-5 w-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                  Online qualifier
                </h3>
                <p>
                  The Open Stage establishes the field through online security
                  challenges before finalists advance.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
                <Clock3 className="h-5 w-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                  12-hour Grand Final
                </h3>
                <p>
                  Qualified competitors face a 12-hour on-premises challenge at
                  Curtin University Colombo.
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
                Break ciphers and identify patterns in cryptographic tasks.
              </li>
              <li>
                Investigate web applications for exploitable behavior and hidden
                data.
              </li>
              <li>
                Analyze binaries and reverse engineer unfamiliar programs.
              </li>
              <li>
                Examine forensic artifacts, recover evidence, and submit flags
                before time expires.
              </li>
            </ul>
          </Section>

          <Section id="eligibility" title="Eligibility & What to Expect">
            <p className="flex items-start gap-2">
              <Flag
                className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-primary)]"
                aria-hidden="true"
              />
              Expect challenges across cryptography, web exploitation, reverse
              engineering, and forensics, with difficulty designed to reward
              both breadth and specialist knowledge.
            </p>
            <p className="flex items-start gap-2">
              <Users
                className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-primary)]"
                aria-hidden="true"
              />
              Final participation format, team sizes, eligibility requirements,
              scoring rules, and permitted tools will be published with
              registration details.
            </p>
          </Section>
        </main>
      <Footer />
    </>
  );
}
