import type { Metadata } from "next";
import { Clock3, Flag, Globe2, MapPin, ShieldCheck, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLdEvent } from "@/components/seo/JsonLdEvent";
import { generateMetadata } from "@/lib/metadata";
import { EVENT_INFO, TRACKS, KEY_DATES } from "@/lib/seo-constants";

export const metadata: Metadata = generateMetadata({
  title: "Capture The Flag Track",
  description:
    "Compete in the KRYPTA 2026 CTF cybersecurity competition. 20 teams cap, 3-4 members per team. Registration opens September 1st, 2026. Finals in November 2026 at Curtin University Colombo.",
  path: "/tracks/ctf",
});


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
      <JsonLdEvent
        name="KRYPTA 2026 - Capture The Flag Grand Final"
        startDate={KEY_DATES.finals}
        endDate={KEY_DATES.finals}
        location={EVENT_INFO.location}
        description="A 12-hour on-premises cybersecurity final at Curtin University Colombo covering cryptography, web exploitation, regression engineering, and forensics. Finalists qualify through an online stage."
        url={`${EVENT_INFO.url}/tracks/ctf`}
        organizer={EVENT_INFO.organizer}
      />

      <Navbar />
      <main id="main-content" className="container-xl py-16 max-w-3xl">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Tracks", href: "/tracks" },
                { name: "Capture The Flag", href: "/tracks/ctf" },
              ]}
              className="mb-6"
            />
          </div>
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
              {/* <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
                <Globe2 className="h-5 w-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                  Online qualifier
                </h3>
                <p>
                  The Open Stage establishes the field through online security
                  challenges before finalists advance.
                </p>
              </div> */}
              <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
                <Clock3 className="h-5 w-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                  12-hour Grand Final
                </h3>
                <p>
                  Opening Ceremony: Nov 28, 3pm-4pm<br />
                  Competition: Nov 28, 6pm - Nov 29, 6am<br />
                  Location: Curtin University Colombo
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

          <Section id="timeline" title="Event Timeline">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[var(--color-primary)]">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)]">Opening Ceremony</h4>
                  <p className="text-sm text-[var(--color-foreground-muted)]">November 28, 3:00pm - 4:00pm</p>
                  <p className="text-sm text-[var(--color-foreground-muted)]">Welcome address, rules overview, and team introductions</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[var(--color-primary)]">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)]">Competition</h4>
                  <p className="text-sm text-[var(--color-foreground-muted)]">November 28, 6:00pm - November 29, 6:00am</p>
                  <p className="text-sm text-[var(--color-foreground-muted)]">12-hour jeopardy style capture the flag</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[var(--color-primary)]">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)]">Closing Ceremony</h4>
                  <p className="text-sm text-[var(--color-foreground-muted)]">November 29, 4:00pm - 7:00pm</p>
                  <p className="text-sm text-[var(--color-foreground-muted)]">All tracks come together for awards and recognition</p>
                </div>
              </div>
            </div>
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
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Users
                  className="h-4 w-4 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <span><strong>Team Size:</strong> {TRACKS.ctf.teamSize.min}-{TRACKS.ctf.teamSize.max} members</span>
              </p>
              <p className="flex items-center gap-2">
                <Users
                  className="h-4 w-4 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <span><strong>Team Cap:</strong> {TRACKS.ctf.teamCap} teams</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock3
                  className="h-4 w-4 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <span><strong>Registration Opens:</strong> {KEY_DATES.registrationOpens}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock3
                  className="h-4 w-4 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <span><strong>Finals:</strong> November 2026</span>
              </p>
            </div>
            <div className="mt-4 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
              <h3 className="font-semibold text-[var(--color-foreground)] mb-3">Eligibility Criteria</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Undergraduate Students:</strong> Currently enrolled in a university undergraduate program</li>
                <li><strong>Masters Students:</strong> Currently enrolled in a postgraduate masters program</li>
              </ul>
            </div>
          </Section>
        </main>
      <Footer />
    </>
  );
}
