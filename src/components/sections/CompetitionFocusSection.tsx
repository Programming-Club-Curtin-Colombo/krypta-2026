"use client";

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
import { motion } from "framer-motion";

const PROCESS_STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Identify",
    description:
      "Understand the problem space. Define the product, analyse the security challenge, or frame the engineering problem for your chosen track.",
  },
  {
    icon: PenLine,
    step: "02",
    title: "Design",
    description:
      "Architect the solution. Plan technical approach, stack, and data flow before writing a single line of code or crafting an exploit.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Build",
    description:
      "Execute with precision under time pressure. Ship clean, functional code or develop your CTF methodology within the allotted time.",
  },
  {
    icon: FlaskConical,
    step: "04",
    title: "Test",
    description:
      "Validate rigorously. Ensure your build handles edge cases, or verify your CTF solution is reproducible and well-documented.",
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
      "Stand measured against the best. Receive structured feedback and recognition for engineering and security excellence.",
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
            From problem to <span className="gradient-text">podium.</span>
          </h2>
          <p className="mt-4 text-base text-[var(--color-foreground-muted)]">
            Every KRYPTA team follows a structured engineering process -
            mirroring how professional teams tackle real-world challenges.
          </p>
        </AnimatedSection>

        {/* Process steps */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[var(--color-primary)]/30 to-transparent"
            aria-hidden="true"
          />

          <ol
            className="flex flex-col gap-8 lg:gap-0"
            aria-label="Competition process steps"
          >
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <li key={step.step} className="relative">
                  <AnimatedSection
                    delay={index * 0.1}
                    className={cn(
                      "lg:grid lg:grid-cols-2 items-center",
                      "py-4 lg:py-8"
                    )}
                  >
                    {/* Content - alternates sides on desktop */}
                    <motion.div
                      whileHover={{ x: isEven ? -4 : 4 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex flex-row lg:flex-col gap-5 lg:gap-1.5 items-start",
                        isEven
                          ? "lg:col-start-1 lg:items-end lg:pr-14"
                          : "lg:col-start-2 lg:items-start lg:pl-14"
                      )}
                    >
                      {/* Mobile Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20"
                        aria-hidden="true"
                      >
                        <step.icon className="h-6 w-6 text-[var(--color-primary)]" />
                      </motion.div>

                      {/* Text */}
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
                        <p
                          className={cn(
                            "text-sm text-[var(--color-foreground-muted)] leading-relaxed max-w-xs",
                            isEven ? "lg:ml-auto" : ""
                          )}
                        >
                          {step.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Desktop Center Icon */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
                        "h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-background)] p-1.5"
                      )}
                      aria-hidden="true"
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 shadow-sm">
                        <step.icon className="h-5 w-5 text-[var(--color-primary)]" />
                      </div>
                    </motion.div>
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
