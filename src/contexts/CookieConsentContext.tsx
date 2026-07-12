"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { CookieConsent } from "@/lib/cookie-consent";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_VERSION,
  DEFAULT_CONSENT,
} from "@/lib/cookie-consent";

interface CookieConsentContextValue {
  consent: CookieConsent;
  hasDecided: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  updateConsent: (consent: Partial<CookieConsent>) => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(
  undefined,
);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);
  const [hasDecided, setHasDecided] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load consent from cookies on mount
  useEffect(() => {
    const loadConsent = () => {
      try {
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));

        if (cookieValue) {
          const value = cookieValue.split("=")[1];
          if (!value) {
            throw new Error("Invalid cookie format");
          }
          const decoded = decodeURIComponent(value);
          const savedConsent = JSON.parse(decoded) as CookieConsent;

          // Check if consent version matches current version
          if (savedConsent.version === CONSENT_VERSION) {
            setConsent(savedConsent);
            setHasDecided(true);
          } else {
            // Version mismatch, reset consent
            setConsent(DEFAULT_CONSENT);
            setHasDecided(false);
          }
        }
      } catch (error) {
        console.error("Failed to load cookie consent:", error);
        setConsent(DEFAULT_CONSENT);
      } finally {
        setIsLoaded(true);
      }
    };

    loadConsent();
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    const consentString = encodeURIComponent(JSON.stringify(newConsent));
    const maxAge = 365 * 24 * 60 * 60; // 1 year in seconds

    document.cookie = `${CONSENT_COOKIE_NAME}=${consentString}; max-age=${maxAge}; path=/; SameSite=Lax`;
    setConsent(newConsent);
    setHasDecided(true);
  };

  const acceptAll = () => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: true,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    };
    saveConsent(newConsent);
  };

  const rejectNonEssential = () => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: false,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    };
    saveConsent(newConsent);
  };

  const updateConsent = (partialConsent: Partial<CookieConsent>) => {
    const newConsent: CookieConsent = {
      ...consent,
      ...partialConsent,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    };
    saveConsent(newConsent);
  };

  const resetConsent = () => {
    document.cookie = `${CONSENT_COOKIE_NAME}=; max-age=0; path=/`;
    setConsent(DEFAULT_CONSENT);
    setHasDecided(false);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasDecided,
        acceptAll,
        rejectNonEssential,
        updateConsent,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return context;
}
