// ── Geolocation & Consent Utilities ─────────────────────────────────────────────
// This module provides utilities for detecting visitor country and determining
// whether cookie consent is required based on GDPR/EEA regulations.

// Countries requiring cookie consent (EU + EEA + UK)
// Based on GDPR regulations and current compliance requirements
export const CONSENT_COUNTRIES: readonly string[] = [
  "AT", // Austria
  "BE", // Belgium
  "BG", // Bulgaria
  "HR", // Croatia
  "CY", // Cyprus
  "CZ", // Czech Republic
  "DK", // Denmark
  "EE", // Estonia
  "FI", // Finland
  "FR", // France
  "DE", // Germany
  "GR", // Greece
  "HU", // Hungary
  "IE", // Ireland
  "IT", // Italy
  "LV", // Latvia
  "LT", // Lithuania
  "LU", // Luxembourg
  "MT", // Malta
  "NL", // Netherlands
  "PL", // Poland
  "PT", // Portugal
  "RO", // Romania
  "SK", // Slovakia
  "SI", // Slovenia
  "ES", // Spain
  "SE", // Sweden
  "IS", // Iceland
  "LI", // Liechtenstein
  "NO", // Norway
  "GB", // United Kingdom
] as const;

// Cookie names for geolocation data
export const CONSENT_REQUIRED_COOKIE = "consent-required";
export const VISITOR_COUNTRY_COOKIE = "visitor-country";

/**
 * Determines if cookie consent is required for a given country code.
 * 
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., "GB", "US")
 * @returns true if the country requires cookie consent, false otherwise
 */
export function isConsentRequired(countryCode: string): boolean {
  if (!countryCode || countryCode === "unknown") {
    // If country is unknown, require consent to be safe (GDPR compliance)
    return true;
  }
  return CONSENT_COUNTRIES.includes(countryCode.toUpperCase());
}

/**
 * Extracts the country code from request headers with fallback chain.
 * 
 * Priority order:
 * 1. Vercel's geolocation object (if available)
 * 2. x-vercel-ip-country header
 * 3. "unknown" as fallback
 * 
 * @param headers - Request headers object
 * @param geolocation - Optional Vercel geolocation object
 * @returns ISO 3166-1 alpha-2 country code or "unknown"
 */
export function extractCountryCode(
  headers: Headers,
  geolocation?: { country?: string } | null
): string {
  // Priority 1: Vercel geolocation object (recommended API)
  if (geolocation?.country) {
    return geolocation.country.toUpperCase();
  }

  // Priority 2: Fallback to x-vercel-ip-country header
  const vercelCountryHeader = headers.get("x-vercel-ip-country");
  if (vercelCountryHeader) {
    return vercelCountryHeader.toUpperCase();
  }

  // Priority 3: Unknown country
  return "unknown";
}
