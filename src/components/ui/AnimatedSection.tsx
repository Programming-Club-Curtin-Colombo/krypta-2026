"use client";

import { motion, useReducedMotion, HTMLMotionProps, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

// ── Static animation configuration ───────────────────────────────────────────
// Extracted outside the component so the object reference is stable across renders.
// The delay is the only dynamic part; it is applied at call-site via the transition override.
const BASE_TRANSITION = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  once = true,
  ...props
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once, margin: "-80px" });

  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...BASE_TRANSITION, delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
