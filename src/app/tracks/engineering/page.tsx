import type { Metadata } from "next";
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
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLdEvent } from "@/components/seo/JsonLdEvent";
import { generateMetadata } from "@/lib/metadata";
import { EVENT_INFO, TRACKS, KEY_DATES } from "@/lib/seo-constants";

export const metadata: Metadata = generateMetadata({
  title: "Engineering Track",
  description:
    "Solve practical engineering challenges in the KRYPTA 2026 Engineering track. 2-5 members per team. Registration opens September 2026. Finals in November 2026 at Curtin University Colombo.",
  path: "/tracks/engineering",
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

export default function EngineeringPage() {
  return (
    <>
      <JsonLdEvent
        name="KRYPTA 2026 - Engineering Grand Final"
        startDate={KEY_DATES.finals}
        endDate={KEY_DATES.finals}
        location={EVENT_INFO.location}
        description="An 8-hour on-premises engineering and problem-solving final at Curtin University Colombo. Finalists qualify through an online preliminary round."
        url={`${EVENT_INFO.url}/tracks/engineering`}
        organizer={EVENT_INFO.organizer}
      />

      <Navbar />
      <main id="main-content" className="container-xl py-16 max-w-3xl">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Tracks", href: "/tracks" },
                { name: "Engineering", href: "/tracks/engineering" },
              ]}
              className="mb-6"
            />
          </div>
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
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Users
                  className="h-4 w-4 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <span><strong>Team Size:</strong> {TRACKS.engineering.teamSize.min}-{TRACKS.engineering.teamSize.max} members</span>
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
          </Section>
        </main>
      <Footer />
    </>
  );
}
