"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ChevronRight, Cpu, Users, Zap, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { InteractiveGrid } from "@/components/ui/InteractiveGrid";

const STATS = [
  { icon: Cpu, label: "Buildathon & CTF Tracks" },
  { icon: Users, label: "Industry Mentors" },
  { icon: Zap, label: "Real-world Challenges" },
  { icon: MapPin, label: "Curtin University Colombo" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const resolvedContainerVariants = shouldReduceMotion
    ? {}
    : containerVariants;
  const resolvedItemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : itemVariants;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-bg-subtle"
      aria-label="KRYPTA 2026 hero"
    >
      {/* Interactive Background grid decoration */}
      <InteractiveGrid />

      {/* Glow orbs */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, #4f46e5 0%, #8b5cf6 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      <div className="container-xl relative z-10 flex flex-col items-center text-center pt-24 pb-16">
        <motion.div
          variants={resolvedContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Coming Soon badge */}
          <motion.div variants={resolvedItemVariants}>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                "border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/15",
                "text-[var(--color-primary)]"
              )}
              role="status"
              aria-label="Event status: Coming Soon"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" aria-hidden="true" />
              Coming Soon
            </span>
          </motion.div>

          {/* Event name */}
          <motion.div variants={resolvedItemVariants} className="space-y-2">
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter gradient-text leading-tight pb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              KRYPTA
            </h1>
            <p
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-foreground-muted)] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              2026
            </p>
          </motion.div>

          {/* Full name */}
          <motion.p
            variants={resolvedItemVariants}
            className="text-sm sm:text-base text-[var(--color-foreground-subtle)] font-medium tracking-widest uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Knowledge, Research & Yielding Parallel Technologies Arena
          </motion.p>

          {/* Supporting paragraph */}
          <motion.p
            variants={resolvedItemVariants}
            className="max-w-xl text-base sm:text-lg text-[var(--color-foreground-muted)] leading-relaxed"
          >
            A premier dual-track competition by the Programming Club of Curtin
            University Colombo - featuring a{" "}
            <span className="text-[var(--color-foreground)] font-medium">Buildathon</span>
            {" "}for full-stack builders and a{" "}
            <span className="text-[var(--color-foreground)] font-medium">CTF</span>
            {" "}for security challengers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={resolvedItemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 mt-2"
          >
            <a
              href="#stay-updated"
              id="hero-notify-btn"
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold",
                "bg-[var(--color-primary)] text-white",
                "hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5",
                "transition-all duration-200 shadow-lg shadow-[var(--color-primary)]/25",
                "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
              )}
              aria-label="Notify Me - Get notified when KRYPTA 2026 launches"
            >
              Notify Me
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#about"
              id="hero-learn-more-btn"
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold",
                "border border-[var(--color-border)] bg-[var(--color-surface)]",
                "text-[var(--color-foreground)] hover:border-[var(--color-primary)]",
                "hover:bg-[var(--color-surface-2)] hover:-translate-y-0.5",
                "transition-all duration-200"
              )}
              aria-label="Learn more about KRYPTA 2026"
            >
              Learn More
            </a>
          </motion.div>

          {/* Stats pills */}
          <motion.div
            variants={resolvedItemVariants}
            className="flex flex-wrap justify-center gap-3 mt-4"
            aria-label="Event highlights"
            role="list"
          >
            {STATS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                role="listitem"
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium",
                  "border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-sm",
                  "text-[var(--color-foreground-muted)]"
                )}
              >
                <Icon className="h-3.5 w-3.5 text-[var(--color-primary)]" aria-hidden="true" />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="h-5 w-5 text-[var(--color-foreground-subtle)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
