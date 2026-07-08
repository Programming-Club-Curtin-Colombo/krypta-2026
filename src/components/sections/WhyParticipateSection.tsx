import {
  Rocket,
  BrainCircuit,
  Medal,
  BookOpen,
  Briefcase,
  GitBranch,
  Globe,
  Star,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";

const BENEFITS = [
  {
    icon: Rocket,
    title: "Accelerate Your Growth",
    description:
      "Compress months of learning into an intense, focused competition weekend that pushes your engineering boundaries.",
  },
  {
    icon: BrainCircuit,
    title: "Tackle Real Problems",
    description:
      "Work on challenges sourced from actual industry pain points - not contrived exercises with predetermined answers.",
  },
  {
    icon: Medal,
    title: "Recognition & Awards",
    description:
      "Earn recognition for your skills through structured, merit-based judging with prizes for top-performing teams.",
  },
  {
    icon: BookOpen,
    title: "Learn from Experts",
    description:
      "Access mentorship from seasoned professionals who bring deep domain expertise directly to your team.",
  },
  {
    icon: Briefcase,
    title: "Career Opportunities",
    description:
      "Demonstrate your ability to deliver under pressure - a signal that stands out to recruiters and industry partners.",
  },
  {
    icon: GitBranch,
    title: "Build Your Portfolio",
    description:
      "Leave with a working prototype, documented process, and a tangible project to showcase professionally.",
  },
  {
    icon: Globe,
    title: "Expand Your Network",
    description:
      "Form lasting connections with other engineers, mentors, sponsors, and the broader technical community.",
  },
  {
    icon: Star,
    title: "Experience Excellence",
    description:
      "Participate in a professionally organized event with clear standards, structured outcomes, and fair evaluation.",
  },
];

export function WhyParticipateSection() {
  return (
    <section
      id="why-participate"
      className="section bg-[var(--color-surface)]"
      aria-labelledby="why-heading"
    >
      <div className="container-xl">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Why Participate
          </p>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Invest one weekend.{" "}
            <span className="gradient-text">Gain far more.</span>
          </h2>
        </AnimatedSection>

        {/* Benefits grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          role="list"
          aria-label="Reasons to participate in KRYPTA 2026"
        >
          {BENEFITS.map((benefit, index) => (
            <AnimatedSection key={benefit.title} delay={index * 0.06}>
              <article
                className={cn(
                  "group relative h-full p-6 rounded-2xl overflow-hidden",
                  "border border-[var(--color-card-border)] bg-[var(--color-card)]",
                  "hover:border-[var(--color-primary)]/40",
                  "hover:shadow-[var(--shadow-card-hover)]",
                  "hover:-translate-y-1",
                  "transition-all duration-300"
                )}
                role="listitem"
                aria-label={benefit.title}
              >
                {/* Accent gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle at top left, rgba(79,70,229,0.05) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative space-y-3">
                  <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-200"
                    aria-hidden="true"
                  >
                    <benefit.icon className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <h3
                    className="text-sm font-semibold text-[var(--color-foreground)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
