// ── Edge Middleware for Geolocation-Based Cookie Consent ─────────────────────
// This middleware detects visitor country and determines whether cookie consent
// is required based on GDPR/EEA regulations. It runs on Vercel Edge Runtime.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  extractCountryCode,
  isConsentRequired,
  CONSENT_REQUIRED_COOKIE,
  VISITOR_COUNTRY_COOKIE,
} from "@/lib/geolocation";

// Configure middleware to run on all paths
export const config = {
  matcher: [
    // Match all paths except for:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // ── Extract Country Code ─────────────────────────────────────────────────────
  // Try to get country from Vercel's geolocation headers
  // In Next.js 16 on Vercel, geolocation is available via headers
  const countryCode = extractCountryCode(request.headers);

  // ── Determine Consent Requirement ───────────────────────────────────────────
  const consentRequired = isConsentRequired(countryCode);

  // ── Set Cookies ─────────────────────────────────────────────────────────────
  // Set consent-required cookie (true/false)
  // Using SameSite=Lax for security and compatibility
  response.cookies.set(CONSENT_REQUIRED_COOKIE, consentRequired.toString(), {
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === "production", // Only secure in production
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  // Set visitor-country cookie for debugging
  response.cookies.set(VISITOR_COUNTRY_COOKIE, countryCode, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production", // Only secure in production
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  // ── Add Debug Headers (Optional) ───────────────────────────────────────────
  // These headers can be useful for debugging during development
  response.headers.set("x-visitor-country", countryCode);
  response.headers.set("x-consent-required", consentRequired.toString());

  return response;
}
