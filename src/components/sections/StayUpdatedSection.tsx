"use client";

import { useState, useId } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type FormState = "idle" | "loading" | "success" | "error";

// ── Validation logic extracted from component body ─────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value: string): boolean {
  return EMAIL_REGEX.test(value);
}

export function StayUpdatedSection() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const emailInputId = useId();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setFormState("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit email.");
      }

      setFormState("success");
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
      setFormState("error");
    }
  }

  return (
    <section
      id="stay-updated"
      className="section bg-[var(--color-background)]"
      aria-labelledby="notify-heading"
    >
      <div className="container-xl">
        <AnimatedSection className="max-w-xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Stay Updated
            </p>
            <h2
              id="notify-heading"
              className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Be the first to know.
            </h2>
            <p className="text-base text-[var(--color-foreground-muted)]">
              Registration details, workshop announcements, and event updates -
              delivered directly to your inbox.
            </p>
          </div>

          {/* Form or success state */}
          {formState === "success" ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex flex-col items-center gap-3 p-6 rounded-2xl",
                "border border-[var(--color-success)]/30 bg-[var(--color-success)]/10"
              )}
              role="alert"
              aria-live="polite"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="h-8 w-8 text-[var(--color-success)]" aria-hidden="true" />
              </motion.div>
              <p className="font-semibold text-[var(--color-foreground)]">
                You&apos;re on the list!
              </p>
              <p className="text-sm text-[var(--color-foreground-muted)]">
                We&apos;ll notify you as soon as KRYPTA 2026 details are confirmed.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Email notification signup"
              className="space-y-3"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor={emailInputId} className="sr-only">
                    Email address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    id={emailInputId}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errorMessage}
                    aria-describedby={errorMessage ? "email-error" : undefined}
                    disabled={formState === "loading"}
                    className={cn(
                      "w-full h-12 px-4 rounded-xl text-sm",
                      "border bg-[var(--color-card)] text-[var(--color-foreground)]",
                      "placeholder:text-[var(--color-foreground-subtle)]",
                      "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-0",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "transition-all duration-200",
                      errorMessage
                        ? "border-[var(--color-destructive)]"
                        : "border-[var(--color-border)] hover:border-[var(--color-border-muted)]"
                    )}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={formState === "loading"}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl",
                    "bg-[var(--color-primary)] text-white font-semibold text-sm",
                    "hover:bg-[var(--color-primary-hover)]",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                    "transition-all duration-200 shadow-sm",
                    "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                    "whitespace-nowrap"
                  )}
                  aria-label={formState === "loading" ? "Submitting..." : "Notify me about KRYPTA 2026"}
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Notify Me</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Error message */}
              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="email-error"
                  className="text-sm text-[var(--color-destructive)] text-left"
                  role="alert"
                  aria-live="polite"
                >
                  {errorMessage}
                </motion.p>
              )}

              <p className="text-xs text-[var(--color-foreground-subtle)]">
                No spam. Unsubscribe at any time.
              </p>
            </motion.form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
