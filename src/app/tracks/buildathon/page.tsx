import type { Metadata } from "next";
import { Blocks, Clock3, MapPin, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLdEvent } from "@/components/seo/JsonLdEvent";
import { generateMetadata } from "@/lib/metadata";
import { EVENT_INFO, TRACKS, KEY_DATES } from "@/lib/seo-constants";

export const metadata: Metadata = generateMetadata({
  title: "Buildathon Track",
  description:
    "Build a full-stack product in the KRYPTA 2026 Buildathon. 45 teams cap, 3-4 members per team. Registration opens September 1st, 2026. Finals in November 2026 at Curtin University Colombo.",
  path: "/tracks/buildathon",
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

export default function BuildathonPage() {
  return (
    <>
      <JsonLdEvent
        name="KRYPTA 2026 - Buildathon Grand Final"
        startDate={KEY_DATES.finals}
        endDate={KEY_DATES.finals}
        location={EVENT_INFO.location}
        description="A 24-hour on-premises full-stack product-building final at Curtin University Colombo. Finalists qualify through an online preliminary round."
        url={`${EVENT_INFO.url}/tracks/buildathon`}
        organizer={EVENT_INFO.organizer}
      />

      <Navbar />
      <main id="main-content" className="container-xl py-16 max-w-3xl">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Tracks", href: "/tracks" },
                { name: "Buildathon", href: "/tracks/buildathon" },
              ]}
              className="mb-6"
            />
          </div>
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
              {/* <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
                <Globe2 className="h-5 w-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                  Online preliminary
                </h3>
                <p>
                  The Open Stage tests each team&apos;s approach and determines
                  who advances to the on-site finale.
                </p>
              </div> */}
              <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
                <Clock3 className="h-5 w-5 text-[var(--color-primary)] mb-3" />
                <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                  24-hour Grand Final
                </h3>
                <p>
                  Opening Ceremony: Nov 28, 8am-9am<br />
                  Competition: Nov 28, 10am - Nov 29, 10pm<br />
                  Presentations: Nov 29, 12pm-2pm<br />
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
                  <p className="text-sm text-[var(--color-foreground-muted)]">November 28, 8:00am - 9:00am</p>
                  <p className="text-sm text-[var(--color-foreground-muted)]">Welcome address, rules overview, and team introductions</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[var(--color-primary)]">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)]">Competition</h4>
                  <p className="text-sm text-[var(--color-foreground-muted)]">November 28, 10:00am - November 29, 10:00pm</p>
                  <p className="text-sm text-[var(--color-foreground-muted)]">24-hour intensive product-building competition on premises</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[var(--color-primary)]">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)]">Presentations</h4>
                  <p className="text-sm text-[var(--color-foreground-muted)]">November 29, 12:00pm - 2:00pm</p>
                  <p className="text-sm text-[var(--color-foreground-muted)]">Teams present their products to judges and industry guests</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[var(--color-primary)]">4</span>
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
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Users
                  className="h-4 w-4 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <span><strong>Team Size:</strong> {TRACKS.buildathon.teamSize.min}-{TRACKS.buildathon.teamSize.max} members</span>
              </p>
              <p className="flex items-center gap-2">
                <Users
                  className="h-4 w-4 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <span><strong>Team Cap:</strong> {TRACKS.buildathon.teamCap} teams</span>
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
