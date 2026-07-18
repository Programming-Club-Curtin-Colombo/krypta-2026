import {
  Megaphone,
  ClipboardList,
  GraduationCap,
  Code2,
  Presentation,
  Trophy,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";

type MilestoneStatus = "upcoming" | "tbd";

interface Milestone {
  icon: React.ElementType;
  title: string;
  description: string;
  date: string;
  status: MilestoneStatus;
}

const MILESTONES: Milestone[] = [
  {
    icon: Megaphone,
    title: "Announcement",
    description: "Official launch of KRYPTA 2026 with event details, tracks, and partner announcements.",
    date: "Q1 2026",
    status: "upcoming",
  },
  {
    icon: ClipboardList,
    title: "Registrations Open",
    description: "Team registration portal goes live from September 1st through September 30th, 2026. Secure your spot early - slots are limited.",
    date: "Sep 1, 2026",
    status: "upcoming",
  },
  {
    icon: GraduationCap,
    title: "Pre-event Workshops",
    description: "Technical workshops and mentorship sessions to help teams prepare and level up.",
    date: "Oct 2026",
    status: "tbd",
  },
  {
    icon: Code2,
    title: "Competition Finals",
    description: "Buildathon (24hr): Nov 28-29 | CTF (12hr): Nov 28-29 | School Students (6hr): Nov 28 at Curtin University Colombo.",
    date: "Nov 28-29, 2026",
    status: "tbd",
  },
  {
    icon: Presentation,
    title: "Presentations",
    description: "Buildathon: 12pm-2pm Nov 29 | School Students: 5pm-7pm Nov 29. Teams present before judges and industry guests.",
    date: "Nov 29, 2026",
    status: "tbd",
  },
  {
    icon: Trophy,
    title: "Closing Ceremony",
    description: "All tracks come together for the closing ceremony, awards, and recognition. 4pm-7pm on November 29th.",
    date: "Nov 29, 2026",
    status: "tbd",
  },
];

const STATUS_LABELS: Record<MilestoneStatus, string> = {
  upcoming: "Upcoming",
  tbd: "TBD",
};

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="section bg-[var(--color-background)] gradient-bg-subtle"
      aria-labelledby="timeline-heading"
    >
      <div className="container-xl">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Schedule
          </p>
          <h2
            id="timeline-heading"
            className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Mark your calendar.{" "}
            <span className="gradient-text">Exact dates coming soon.</span>
          </h2>
        </AnimatedSection>

        {/* Timeline */}
        <ol
          className="relative flex flex-col gap-0"
          aria-label="KRYPTA 2026 event timeline"
        >
          {/* Vertical track */}
          <div
            className="absolute left-6 sm:left-8 top-3 bottom-3 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-border)] to-transparent"
            aria-hidden="true"
          />

          {MILESTONES.map((milestone, index) => {
            const isFirst = index === 0;
            return (
              <li key={milestone.title}>
                <AnimatedSection
                  delay={index * 0.1}
                  className="relative flex items-start gap-6 sm:gap-8 h-24 sm:h-28"
                >
                  {/* Node */}
                  <div
                    className={cn(
                      "relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-2xl",
                      "border-2 bg-[var(--color-card)]",
                      isFirst
                        ? "border-[var(--color-primary)] shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                        : "border-[var(--color-border)]"
                    )}
                    aria-hidden="true"
                  >
                    <milestone.icon
                      className={cn(
                        "h-5 w-5 sm:h-6 sm:w-6",
                        isFirst
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-foreground-subtle)]"
                      )}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center gap-1.5 min-h-[3.5rem]">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className="text-base sm:text-lg font-bold text-[var(--color-foreground)]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {milestone.title}
                      </h3>
                      <span
                        className={cn(
                          "inline-block px-2 py-0.5 rounded-md text-xs font-medium",
                          isFirst
                            ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                            : "bg-[var(--color-surface-2)] text-[var(--color-foreground-muted)]"
                        )}
                        aria-label={`Status: ${STATUS_LABELS[milestone.status]}`}
                      >
                        {milestone.date} · {STATUS_LABELS[milestone.status]}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed max-w-lg">
                      {milestone.description}
                    </p>
                  </div>
                </AnimatedSection>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
