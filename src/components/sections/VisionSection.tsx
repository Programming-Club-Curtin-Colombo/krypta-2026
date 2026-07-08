import { Telescope } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function VisionSection() {
  return (
    <section
      id="vision"
      className="section bg-[var(--color-background)] gradient-bg-subtle"
      aria-labelledby="vision-heading"
    >
      <div className="container-xl">
        <AnimatedSection className="max-w-3xl mx-auto">
          <div className="gradient-border rounded-2xl p-8 sm:p-12 text-center space-y-6">
            {/* Icon */}
            <div
              className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 mx-auto"
              aria-hidden="true"
            >
              <Telescope className="h-7 w-7 text-[var(--color-primary)]" />
            </div>

            {/* Label */}
            <p
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our Vision
            </p>

            {/* Heading */}
            <h2
              id="vision-heading"
              className="text-2xl sm:text-3xl font-bold text-[var(--color-foreground)] leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A premier multidisciplinary hackathon
              <br className="hidden sm:block" />
              <span className="gradient-text"> that challenges and inspires.</span>
            </h2>

            {/* Vision statement */}
            <p className="text-base sm:text-lg text-[var(--color-foreground-muted)] leading-relaxed max-w-2xl mx-auto">
              To establish KRYPTA as a premier multidisciplinary hackathon
              competition that challenges participants to design and build
              impactful, real-world technical solutions under structured
              constraints - while fostering engineering excellence and
              collaboration between academia and industry.
            </p>

            {/* Accent divider */}
            <div
              className="flex items-center justify-center gap-2 pt-2"
              aria-hidden="true"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-primary)]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-primary)]" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
