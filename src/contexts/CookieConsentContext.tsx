"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
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

// ── Cookie parsing helper ─────────────────────────────────────────────────────
function parseCookies(): Record<string, string> {
  const cookies: Record<string, string> = {};
  document.cookie.split("; ").forEach((cookie) => {
    const eqIndex = cookie.indexOf("=");
    if (eqIndex === -1) return;
    const key = cookie.slice(0, eqIndex);
    const value = cookie.slice(eqIndex + 1);
    if (key) cookies[key] = value;
  });
  return cookies;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);
  const [hasDecided, setHasDecided] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [consentRequired, setConsentRequired] = useState<boolean | null>(null);

  // Load consent from cookies on mount
  useEffect(() => {
    try {
      const cookies = parseCookies();

      // Determine if consent is required based on geolocation cookie set by middleware
      const isConsentRequired =
        cookies[CONSENT_REQUIRED_COOKIE] === "true" ||
        !cookies[CONSENT_REQUIRED_COOKIE];
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsentRequired(isConsentRequired);

      if (process.env.NODE_ENV === "development") {
        console.log("[CookieConsent] Geolocation debug:", {
          visitorCountry: cookies["visitor-country"],
          consentRequired: isConsentRequired,
        });
      }

      const cookieValue = cookies[CONSENT_COOKIE_NAME];

      if (cookieValue) {
        const decoded = decodeURIComponent(cookieValue);
        const savedConsent = JSON.parse(decoded) as CookieConsent;

        if (savedConsent.version === CONSENT_VERSION) {
          setConsent(savedConsent);
          setHasDecided(true);
        }
        // Version mismatch: leave defaults (hasDecided stays false, banner shows again)
      } else if (!isConsentRequired) {
        // Consent not required for this region: auto-accept analytics
        setConsent({
          essential: true,
          analytics: true,
          version: CONSENT_VERSION,
          timestamp: Date.now(),
        });
        setHasDecided(true);
      }
    } catch (error) {
      console.error("Failed to load cookie consent:", error);
      setConsent(DEFAULT_CONSENT);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    const consentString = encodeURIComponent(JSON.stringify(newConsent));
    const maxAge = 365 * 24 * 60 * 60; // 1 year
    document.cookie = `${CONSENT_COOKIE_NAME}=${consentString}; max-age=${maxAge}; path=/; SameSite=Lax`;
    setConsent(newConsent);
    setHasDecided(true);
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({
      essential: true,
      analytics: true,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    });
  }, [saveConsent]);

  const rejectNonEssential = useCallback(() => {
    saveConsent({
      essential: true,
      analytics: false,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    });
  }, [saveConsent]);

  const updateConsent = useCallback(
    (partialConsent: Partial<CookieConsent>) => {
      saveConsent({
        ...consent,
        ...partialConsent,
        version: CONSENT_VERSION,
        timestamp: Date.now(),
      });
    },
    [consent, saveConsent],
  );

  const resetConsent = useCallback(() => {
    document.cookie = `${CONSENT_COOKIE_NAME}=; max-age=0; path=/`;
    setConsent(DEFAULT_CONSENT);
    setHasDecided(false);
  }, []);

  // Memoize the context value so consumers only re-render when something
  // in the value actually changes, not on every provider render.
  const contextValue = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      hasDecided,
      consentRequired,
      acceptAll,
      rejectNonEssential,
      updateConsent,
      resetConsent,
    }),
    [consent, hasDecided, consentRequired, acceptAll, rejectNonEssential, updateConsent, resetConsent],
  );

  if (!isLoaded) {
    return null;
  }

  return (
    <CookieConsentContext.Provider value={contextValue}>
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
