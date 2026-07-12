"use client";

import {
  Target,
  Lightbulb,
  Handshake,
  Shield,
  Layers,
  Users,
  TrendingUp,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const OBJECTIVES = [
  { icon: Target, label: "Rapid Problem Solving" },
  { icon: Lightbulb, label: "Real-world Innovation" },
  { icon: Layers, label: "Engineering Execution" },
  { icon: Handshake, label: "Industry Engagement" },
  { icon: Users, label: "Team Collaboration" },
  { icon: TrendingUp, label: "Technical Excellence" },
  { icon: Shield, label: "Fair & Transparent Competition" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="section bg-[var(--color-surface)]"
      aria-labelledby="about-heading"
    >
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <AnimatedSection>
            <div className="space-y-6">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  About the Event
                </p>
                <h2
                  id="about-heading"
                  className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Engineering meets
                  <br />
                  <span className="gradient-text">real-world impact.</span>
                </h2>
              </div>

              <p className="text-base text-[var(--color-foreground-muted)] leading-relaxed">
                KRYPTA 2026 is a time-bound engineering competition where
                participants design, build, and demonstrate working technical
                solutions for real-world challenges. Teams compete across
                multiple technology tracks while developing functional
                prototypes within a fixed timeframe under formal judging
                criteria.
              </p>

              <p className="text-base text-[var(--color-foreground-muted)] leading-relaxed">
                The event brings together students, mentors, judges, industry
                partners, and technical communities through competitive
                hackathon challenges, technical workshops, and structured
                judging - all fostering engineering excellence and
                collaboration between academia and industry.
              </p>
            </div>
          </AnimatedSection>

          {/* Objectives grid */}
          <AnimatedSection delay={0.15}>
            <div
              className={cn(
                "rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 sm:p-8",
                "space-y-5"
              )}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest text-[var(--color-foreground-subtle)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Core Objectives
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                {OBJECTIVES.map(({ icon: Icon, label }) => (
                  <motion.li
                    key={label}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl",
                      "border border-[var(--color-border)] bg-[var(--color-card)]",
                      "hover:border-[var(--color-primary)]/50 hover:shadow-md",
                      "transition-all duration-200 cursor-default"
                    )}
                  >
                    <motion.span
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10"
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4 text-[var(--color-primary)]" />
                    </motion.span>
                    <span className="text-sm font-medium text-[var(--color-foreground)]">
                      {label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
