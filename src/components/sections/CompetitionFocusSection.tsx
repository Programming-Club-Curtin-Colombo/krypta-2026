import {
  Search,
  PenLine,
  Hammer,
  FlaskConical,
  Presentation,
  Trophy,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";

const PROCESS_STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Identify",
    description:
      "Understand the problem space. Define the challenge, scope, and constraints before touching any code.",
  },
  {
    icon: PenLine,
    step: "02",
    title: "Design",
    description:
      "Architect the solution. Plan the technical approach, data flow, and user experience before building.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Build",
    description:
      "Execute with precision under time pressure. Write clean, functional code that solves the defined problem.",
  },
  {
    icon: FlaskConical,
    step: "04",
    title: "Test",
    description:
      "Validate rigorously. Ensure your solution is robust, handles edge cases, and delivers reliable output.",
  },
  {
    icon: Presentation,
    step: "05",
    title: "Present",
    description:
      "Communicate your solution clearly and confidently to judges, sponsors, and the broader audience.",
  },
  {
    icon: Trophy,
    step: "06",
    title: "Compete",
    description:
      "Stand measured against the best. Receive structured feedback and recognition for engineering excellence.",
  },
];

export function CompetitionFocusSection() {
  return (
    <section
      id="competition-focus"
      className="section bg-[var(--color-background)]"
      aria-labelledby="competition-heading"
    >
      <div className="container-xl">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Competition Framework
          </p>
          <h2
            id="competition-heading"
            className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From problem to{" "}
            <span className="gradient-text">podium.</span>
          </h2>
          <p className="mt-4 text-base text-[var(--color-foreground-muted)]">
            Every KRYPTA team follows a structured engineering process — mirroring
            how professional teams tackle real-world challenges.
          </p>
        </AnimatedSection>

        {/* Process steps */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent"
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-8 lg:gap-0" aria-label="Competition process steps">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <li key={step.step}>
                  <AnimatedSection
                    delay={index * 0.1}
                    className={cn(
                      "lg:grid lg:grid-cols-2 lg:gap-16 items-center",
                      "lg:py-6"
                    )}
                  >
                    {/* Content — alternates sides on desktop */}
                    <div
                      className={cn(
                        "flex gap-5 items-start",
                        isEven
                          ? "lg:col-start-1 lg:justify-end lg:text-right lg:flex-row-reverse"
                          : "lg:col-start-2 lg:justify-start"
                      )}
                    >
                      <div
                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20"
                        aria-hidden="true"
                      >
                        <step.icon className="h-6 w-6 text-[var(--color-primary)]" />
                      </div>
                      <div
                        className={cn(
                          "space-y-1.5",
                          isEven ? "lg:text-right" : "lg:text-left"
                        )}
                      >
                        <p
                          className="text-xs font-bold text-[var(--color-primary)] tracking-widest"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          STEP {step.step}
                        </p>
                        <h3
                          className="text-xl font-bold text-[var(--color-foreground)]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed max-w-xs">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Center node (desktop only) */}
                    <div
                      className={cn(
                        "hidden lg:flex absolute left-1/2 -translate-x-1/2 h-5 w-5 rounded-full",
                        "border-2 border-[var(--color-primary)] bg-[var(--color-background)]",
                        "items-center justify-center"
                      )}
                      aria-hidden="true"
                    >
                      <div className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                    </div>
                  </AnimatedSection>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
