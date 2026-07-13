"use client";

import {
  Layers,
  BrainCircuit,
  Cog,
  Wrench,
  Users,
  Code2,
  Monitor,
  Scale,
  Network,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: Layers,
    title: "Buildathon Track",
    description:
      "Design and ship a full-stack product within the competition window. Real constraints, real deliverables, real impact.",
  },
  {
    icon: BrainCircuit,
    title: "CTF Track",
    description:
      "Tackle security challenges across cryptography, web exploitation, reverse engineering, and forensics.",
  },
  {
    icon: Wrench,
    title: "Technical Workshops",
    description:
      "Attend hands-on workshops before and during the event to sharpen relevant skills and prepare for your chosen track.",
  },
  {
    icon: Users,
    title: "Industry Mentorship",
    description:
      "Gain direct access to experienced professionals who guide teams through design, implementation, and security strategy.",
  },
  {
    icon: Code2,
    title: "Prototype Development",
    description:
      "Move from idea to working prototype within a fixed timeframe - real execution, real constraints, real outcomes.",
  },
  {
    icon: Monitor,
    title: "Live Demonstrations",
    description:
      "Present your functional solution to a panel of judges and an audience in structured final demonstrations.",
  },
  {
    icon: Scale,
    title: "Professional Judging",
    description:
      "Submissions evaluated by qualified industry and academic judges against transparent, structured criteria for each track.",
  },
  {
    icon: Network,
    title: "Networking Opportunities",
    description:
      "Connect with fellow participants, mentors, sponsors, and recruiters throughout the event and beyond.",
  },
];

export function WhatToExpectSection() {
  return (
    <section
      id="what-to-expect"
      className="section bg-[var(--color-surface)]"
      aria-labelledby="expect-heading"
    >
      <div className="container-xl">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Experience
          </p>
          <h2
            id="expect-heading"
            className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What to Expect at <span className="gradient-text">KRYPTA 2026</span>
          </h2>
        </AnimatedSection>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          role="list"
          aria-label="KRYPTA 2026 features"
        >
          {FEATURES.map((feature, index) => (
            <AnimatedSection
              key={feature.title}
              delay={index * 0.06}
              role="listitem"
            >
              <motion.article
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "group h-full flex flex-col gap-4 p-6 rounded-2xl",
                  "border border-[var(--color-card-border)] bg-[var(--color-card)]",
                  "hover:border-[var(--color-primary)]/40",
                  "hover:shadow-[var(--shadow-card-hover)]",
                  "transition-all duration-300"
                )}
                aria-label={feature.title}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-200"
                  aria-hidden="true"
                >
                  <feature.icon className="h-5 w-5 text-[var(--color-primary)]" />
                </motion.div>
                <div>
                  <h3
                    className="text-sm font-semibold text-[var(--color-foreground)] mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
