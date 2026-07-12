export type ConsentCategory = "essential" | "analytics";

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  version: number;
  timestamp: number;
}

export const CONSENT_VERSION = 1;
export const CONSENT_COOKIE_NAME = "krypta-consent";

export const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  version: CONSENT_VERSION,
  timestamp: Date.now(),
};
