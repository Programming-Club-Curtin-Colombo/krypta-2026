"use client";

import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function CookiePreferencesButton() {
  const { resetConsent } = useCookieConsent();

  const handleClick = () => {
    resetConsent();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors duration-150 text-left w-full"
      )}
    >
      Cookie Preferences
    </button>
  );
}
