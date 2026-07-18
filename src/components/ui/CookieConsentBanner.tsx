"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { cn } from "@/lib/utils";

export function CookieConsentBanner() {
  const { hasDecided, consentRequired, acceptAll, updateConsent } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true); // Default to enabled

  // Don't show banner if consent is not required or if user has already decided
  if (hasDecided || consentRequired === false) {
    return null;
  }

  const handleAccept = () => {
    updateConsent({ analytics: analyticsEnabled });
  };

  const handleManage = () => {
    setShowSettings(true);
  };

  const handleSaveSettings = () => {
    updateConsent({ analytics: analyticsEnabled });
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {!showSettings && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
          role="dialog"
          aria-labelledby="cookie-consent-title"
        >
          <div
            className={cn(
              "max-w-4xl mx-auto",
              "bg-[var(--color-card)] border border-[var(--color-border)]",
              "rounded-xl shadow-lg",
              "p-4"
            )}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h2
                  id="cookie-consent-title"
                  className="text-sm font-semibold text-[var(--color-foreground)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  We use cookies to enhance your experience
                </h2>
                <p className="text-xs text-[var(--color-foreground-subtle)] mt-1">
                  By accepting, you agree to our use of cookies for analytics.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAccept}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer",
                    "bg-[var(--color-primary)] text-white",
                    "hover:bg-[var(--color-primary-hover)]",
                    "transition-all duration-200",
                    "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                    "focus-visible:outline-none"
                  )}
                >
                  Accept Cookies
                </button>
                <button
                  onClick={handleManage}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer",
                    "border border-[var(--color-border)] bg-[var(--color-surface-2)]",
                    "text-[var(--color-foreground)]",
                    "hover:bg-[var(--color-surface-3)]",
                    "transition-all duration-200",
                    "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                    "focus-visible:outline-none"
                  )}
                >
                  Manage Cookies
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-labelledby="settings-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "w-full max-w-md",
              "bg-[var(--color-card)] border border-[var(--color-border)]",
              "rounded-xl shadow-2xl",
              "p-6"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                id="settings-title"
                className="text-lg font-semibold text-[var(--color-foreground)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Cookie Settings
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 rounded-lg hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer"
                aria-label="Close settings"
              >
                <X className="h-5 w-5 text-[var(--color-foreground-subtle)]" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Essential - Always enabled */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface)]">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--color-foreground)]">
                    Essential Cookies
                  </p>
                  <p className="text-xs text-[var(--color-foreground-subtle)] mt-1">
                    Required for the website to function
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-10 h-5 rounded-full bg-[var(--color-success)]/20 flex items-center px-0.5 border border-[var(--color-success)]/30">
                    <div className="w-3.5 h-3.5 rounded-full bg-[var(--color-success)] ml-auto shadow-sm" />
                  </div>
                </div>
              </div>

              {/* Analytics - Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface)]">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--color-foreground)]">
                    Analytics Cookies
                  </p>
                  <p className="text-xs text-[var(--color-foreground-subtle)] mt-1">
                    Help us improve the website
                  </p>
                </div>
                <button
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  className={cn(
                    "flex-shrink-0 relative w-10 h-5 rounded-full transition-colors duration-200 border cursor-pointer",
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
                    animate={{ x: analyticsEnabled ? 20 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-sm border border-[var(--color-border)]/20"
                  />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveSettings}
                className={cn(
                  "flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer",
                  "bg-[var(--color-primary)] text-white",
                  "hover:bg-[var(--color-primary-hover)]",
                  "transition-all duration-200",
                  "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                  "focus-visible:outline-none"
                )}
              >
                Accept
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer",
                  "border border-[var(--color-border)] bg-[var(--color-surface-2)]",
                  "text-[var(--color-foreground)]",
                  "hover:bg-[var(--color-surface-3)]",
                  "transition-all duration-200",
                  "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
                  "focus-visible:outline-none"
                )}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
