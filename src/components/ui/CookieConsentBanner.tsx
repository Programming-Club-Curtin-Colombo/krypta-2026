"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Settings } from "lucide-react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { cn } from "@/lib/utils";

export function CookieConsentBanner() {
  const { hasDecided, acceptAll, rejectNonEssential, updateConsent } =
    useCookieConsent();
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  if (hasDecided) {
    return null;
  }

  const handleAcceptAll = () => {
    acceptAll();
  };

  const handleReject = () => {
    rejectNonEssential();
  };

  const handleCustomize = () => {
    setShowCustomize(true);
  };

  const handleSavePreferences = () => {
    updateConsent({ analytics: analyticsEnabled });
    setShowCustomize(false);
  };

  return (
    <AnimatePresence>
      {!showCustomize && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div
            className={cn(
              "max-w-4xl mx-auto",
              "bg-[var(--color-card)] border border-[var(--color-border)]",
              "rounded-2xl shadow-2xl",
              "p-6 sm:p-8"
            )}
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2
                    id="cookie-consent-title"
                    className="text-lg font-semibold text-[var(--color-foreground)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Cookie Preferences
                  </h2>
                  <p
                    id="cookie-consent-description"
                    className="mt-2 text-sm text-[var(--color-foreground-muted)] leading-relaxed"
                  >
                    We use cookies to enhance your browsing experience and analyze
                    site traffic. By clicking &ldquo;Accept All&rdquo;, you consent to our use
                    of analytics cookies. You can manage your preferences at any
                    time.
                  </p>
                </div>

                {/* Cookie Categories */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-surface)]">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check
                        className="h-4 w-4 text-[var(--color-success)]"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--color-foreground)]">
                        Essential Cookies
                      </p>
                      <p className="text-xs text-[var(--color-foreground-subtle)] mt-1">
                        Required for the website to function properly. Always
                        enabled.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-surface)]">
                    <div className="flex-shrink-0 mt-0.5">
                      <Settings
                        className="h-4 w-4 text-[var(--color-foreground-subtle)]"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--color-foreground)]">
                        Analytics Cookies
                      </p>
                      <p className="text-xs text-[var(--color-foreground-subtle)] mt-1">
                        Help us improve the website by analyzing usage patterns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-3 sm:min-w-[160px]">
                <button
                  onClick={handleAcceptAll}
                  className={cn(
                    "flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold",
                    "bg-[var(--color-primary)] text-white",
                    "hover:bg-[var(--color-primary-hover)]",
                    "transition-all duration-200 shadow-sm",
                    "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                    "focus-visible:outline-none"
                  )}
                >
                  Accept All
                </button>
                <button
                  onClick={handleReject}
                  className={cn(
                    "flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold",
                    "border border-[var(--color-border)] bg-[var(--color-surface)]",
                    "text-[var(--color-foreground)] hover:border-[var(--color-primary)]/50",
                    "hover:bg-[var(--color-surface-2)]",
                    "transition-all duration-200",
                    "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                    "focus-visible:outline-none"
                  )}
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={handleCustomize}
                  className={cn(
                    "flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold",
                    "text-[var(--color-foreground-subtle)] hover:text-[var(--color-foreground)]",
                    "transition-all duration-200",
                    "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                    "focus-visible:outline-none"
                  )}
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showCustomize && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          role="dialog"
          aria-labelledby="customize-title"
        >
          <div
            className={cn(
              "max-w-4xl mx-auto",
              "bg-[var(--color-card)] border border-[var(--color-border)]",
              "rounded-2xl shadow-2xl",
              "p-6 sm:p-8"
            )}
          >
            <div className="space-y-6">
              <div>
                <h2
                  id="customize-title"
                  className="text-lg font-semibold text-[var(--color-foreground)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Customize Cookie Preferences
                </h2>
                <p className="mt-2 text-sm text-[var(--color-foreground-muted)]">
                  Choose which cookies you want to enable.
                </p>
              </div>

              <div className="space-y-4">
                {/* Essential - Always enabled */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-surface)]">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--color-foreground)]">
                      Essential Cookies
                    </p>
                    <p className="text-xs text-[var(--color-foreground-subtle)] mt-1">
                      Required for the website to function. Cannot be disabled.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 rounded-full bg-[var(--color-success)]/20 flex items-center px-1 border border-[var(--color-success)]/30">
                      <div className="w-4 h-4 rounded-full bg-[var(--color-success)] ml-auto shadow-sm" />
                    </div>
                  </div>
                </div>

                {/* Analytics - Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-surface)]">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--color-foreground)]">
                      Analytics Cookies
                    </p>
                    <p className="text-xs text-[var(--color-foreground-subtle)] mt-1">
                      Help us improve by analyzing site usage and performance.
                    </p>
                  </div>
                  <button
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    className={cn(
                      "flex-shrink-0 relative w-12 h-6 rounded-full transition-colors duration-200 border",
                      analyticsEnabled
                        ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                        : "bg-[var(--color-surface-2)] border-[var(--color-border)]"
                    )}
                    role="switch"
                    aria-checked={analyticsEnabled}
                    aria-label="Toggle analytics cookies"
                  >
                    <motion.span
                      initial={false}
                      animate={{
                        x: analyticsEnabled ? 24 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm border border-[var(--color-border)]/20"
                    />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSavePreferences}
                  className={cn(
                    "flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold",
                    "bg-[var(--color-primary)] text-white",
                    "hover:bg-[var(--color-primary-hover)]",
                    "transition-all duration-200 shadow-sm",
                    "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                    "focus-visible:outline-none"
                  )}
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowCustomize(false)}
                  className={cn(
                    "px-4 py-2.5 rounded-lg text-sm font-semibold",
                    "border border-[var(--color-border)] bg-[var(--color-surface)]",
                    "text-[var(--color-foreground)] hover:border-[var(--color-primary)]/50",
                    "hover:bg-[var(--color-surface-2)]",
                    "transition-all duration-200",
                    "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                    "focus-visible:outline-none"
                  )}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
