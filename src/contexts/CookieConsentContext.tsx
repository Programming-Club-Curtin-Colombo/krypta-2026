"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { CookieConsent } from "@/lib/cookie-consent";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_VERSION,
  DEFAULT_CONSENT,
} from "@/lib/cookie-consent";
import { CONSENT_REQUIRED_COOKIE } from "@/lib/geolocation";

interface CookieConsentContextValue {
  consent: CookieConsent;
  hasDecided: boolean;
  consentRequired: boolean | null;
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
  const [consentRequired, setConsentRequired] = useState<boolean | null>(null);

  // Load consent from cookies on mount
  useEffect(() => {
    const loadConsent = () => {
      try {
        // Check if consent is required based on geolocation
        const consentRequiredCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${CONSENT_REQUIRED_COOKIE}=`));

        const isConsentRequired = consentRequiredCookie
          ? consentRequiredCookie.split("=")[1] === "true"
          : true; // Default to requiring consent if cookie is missing

        setConsentRequired(isConsentRequired);

        // Load user's consent decision
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));

        if (cookieValue) {
          const value = cookieValue.split("=")[1];
          if (!value || value.trim() === "") {
            throw new Error("Invalid cookie format: empty value");
          }
          const decoded = decodeURIComponent(value);
          if (!decoded || decoded.trim() === "") {
            throw new Error("Invalid cookie format: empty decoded value");
          }
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
        } else if (!isConsentRequired) {
          // If consent is not required and user hasn't decided, auto-accept analytics
          const autoConsent: CookieConsent = {
            essential: true,
            analytics: true,
            version: CONSENT_VERSION,
            timestamp: Date.now(),
          };
          setConsent(autoConsent);
          setHasDecided(true);
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
        consentRequired,
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
