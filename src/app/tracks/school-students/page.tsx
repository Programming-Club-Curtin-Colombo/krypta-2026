import type { Metadata } from "next";
import { Clock3, GraduationCap, MapPin, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLdEvent } from "@/components/seo/JsonLdEvent";
import { generateMetadata } from "@/lib/metadata";
import { EVENT_INFO, KEY_DATES } from "@/lib/seo-constants";

export const metadata: Metadata = generateMetadata({
  title: "School Students Track",
  description:
    "Join the KRYPTA 2026 School Students track. 10 teams cap, 3-4 members per team. Registration opens September 1st, 2026. Event on November 28, 2026 at Curtin University Colombo.",
  path: "/tracks/school-students",
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
        className="text-2xl font-bold text-[var(--color-foreground)] mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function SchoolStudentsPage() {
  return (
    <>
      <JsonLdEvent
        name={EVENT_INFO.name + " - School Students Track"}
        startDate={KEY_DATES.finals}
        endDate={KEY_DATES.finals}
        location={EVENT_INFO.location}
        description="A 6-hour beginner-friendly competition for school students at Curtin University Colombo."
        url={`${EVENT_INFO.url}/tracks/school-students`}
        organizer={EVENT_INFO.organizer}
      />

      <Navbar />
      <main id="main-content" className="container-xl py-16">
        <div className="max-w-3xl mb-8">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Tracks", href: "/tracks" },
              { name: "School Students", href: "/tracks/school-students" },
            ]}
            className="mb-6"
          />
        </div>

        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-[var(--color-primary)]" />
            </div>
            <div>
              <h1
                className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                School Students Track
              </h1>
              <p className="text-[var(--color-foreground-muted)]">
                Beginner-friendly competition for school students
              </p>
            </div>
          </div>

          <Section id="overview" title="Overview">
            <p className="text-base text-[var(--color-foreground-muted)] leading-relaxed">
              The School Students track is designed specifically for students aged 14-18 who are new to tech competitions. This 6-hour event includes workshops, hands-on challenges, and mentorship to help you learn and grow in a supportive environment.
            </p>
          </Section>

          <Section id="format" title="Format">
            <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
              <Clock3 className="h-5 w-5 text-[var(--color-primary)] mb-3" />
              <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                6-hour Event
              </h3>
              <p>
                Opening Ceremony: Nov 28, 8am-9am<br />
                Competition: 10am-4pm<br />
                Presentations: 5pm-7pm<br />
                Location: Curtin University Colombo
              </p>
            </div>
            <p className="flex items-center gap-2 mt-4">
              <MapPin
                className="h-4 w-4 text-[var(--color-primary)]"
                aria-hidden="true"
              />
              Event location: Curtin University Colombo.
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
                  <h4 className="font-semibold text-[var(--color-foreground)]">Workshops & Challenges</h4>
                  <p className="text-sm text-[var(--color-foreground-muted)]">November 28, 10:00am - 4:00pm</p>
                  <p className="text-sm text-[var(--color-foreground-muted)]">Hands-on workshops and beginner-friendly challenges with mentor support</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[var(--color-primary)]">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)]">Presentations</h4>
                  <p className="text-sm text-[var(--color-foreground-muted)]">November 28, 5:00pm - 7:00pm</p>
                  <p className="text-sm text-[var(--color-foreground-muted)]">Teams present their work to judges and receive feedback</p>
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

          <Section id="eligibility" title="Eligibility">
            <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
              <Users className="h-5 w-5 text-[var(--color-primary)] mb-3" />
              <p className="text-sm text-[var(--color-foreground-muted)] mb-3">
                <strong>Team Size:</strong> 3-4 members per team
              </p>
              <p className="text-sm text-[var(--color-foreground-muted)] mb-3">
                <strong>Team Cap:</strong> 10 teams
              </p>
              <h3 className="font-semibold text-[var(--color-foreground)] mb-3">Eligibility Criteria</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>School Students:</strong> Ages 14-18, currently enrolled in secondary education</li>
                <li>Parental/guardian consent required for participants under 18</li>
                <li>No prior programming experience required - this track is beginner-friendly</li>
              </ul>
            </div>
          </Section>

          <Section id="what-to-expect" title="What to Expect">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Introductory workshops on programming basics and problem-solving
              </li>
              <li>
                Hands-on challenges with step-by-step guidance from mentors
              </li>
              <li>
                Team-based activities to build collaboration skills
              </li>
              <li>
                Opportunities to learn from university students and industry professionals
              </li>
              <li>
                Certificates of participation for all completing teams
              </li>
            </ul>
          </Section>

          <Section id="key-dates" title="Key Dates">
            <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5">
              <p className="flex items-center gap-2">
                <Clock3
                  className="h-4 w-4 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <span><strong>Registration Opens:</strong> September 1st, 2026</span>
              </p>
              <p className="flex items-center gap-2 mt-2">
                <Clock3
                  className="h-4 w-4 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <span><strong>Registration Closes:</strong> September 30th, 2026</span>
              </p>
              <p className="flex items-center gap-2 mt-2">
                <Clock3
                  className="h-4 w-4 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <span><strong>Event Date:</strong> November 28, 2026</span>
              </p>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
