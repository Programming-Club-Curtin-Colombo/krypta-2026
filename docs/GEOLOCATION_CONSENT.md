# Geolocation-Based Cookie Consent Implementation

## Overview

This implementation uses Vercel's geolocation detection to determine whether cookie consent is required based on the visitor's country. It automatically loads analytics for non-GDPR countries while requiring explicit consent for GDPR/EEA countries.

## Architecture

### Files Created/Modified

1. **`src/lib/geolocation.ts`** - Helper utilities for geolocation detection and consent country list
2. **`middleware.ts`** - Edge middleware that detects country and sets cookies
3. **`src/contexts/CookieConsentContext.tsx`** - Updated to read geolocation-based consent flag
4. **`src/components/ui/CookieConsentBanner.tsx`** - Updated to respect geolocation consent flag
5. **`src/components/analytics/AnalyticsLoader.tsx`** - No changes needed (already respects consent context)

## Request Flow

### 1. Initial Request (First Visit)

```
User Request → Edge Middleware → Set Cookies → Next.js App → CookieConsentProvider → Render
```

**Step-by-step:**

1. **Edge Middleware** (`middleware.ts`)
   - Extracts country code from Vercel headers (`x-vercel-ip-country`)
   - Determines if consent is required using `isConsentRequired(countryCode)`
   - Sets two cookies:
     - `consent-required=true/false` (30-day expiry)
     - `visitor-country=XX` (30-day expiry, for debugging)
   - Adds debug headers: `x-visitor-country`, `x-consent-required`

2. **CookieConsentProvider** (`src/contexts/CookieConsentContext.tsx`)
   - Reads `consent-required` cookie on mount
   - If `consent-required=false`:
     - Auto-accepts analytics cookies
     - Sets `hasDecided=true`
     - Banner never shows
   - If `consent-required=true`:
     - Shows consent banner to user
     - Waits for user decision

3. **CookieConsentBanner** (`src/components/ui/CookieConsentBanner.tsx`)
   - Checks `consentRequired` flag
   - If `false`, returns null (no banner)
   - If `true` and user hasn't decided, shows banner

4. **AnalyticsLoader** (`src/components/analytics/AnalyticsLoader.tsx`)
   - Reads `consent.analytics` from context
   - Only loads analytics scripts if `consent.analytics === true`

### 2. Returning Visit (With Existing Consent)

```
User Request → Edge Middleware → Set Cookies → CookieConsentProvider → Load Saved Consent → Skip Banner
```

- Middleware still sets geolocation cookies
- Provider loads saved consent decision from `krypta-consent` cookie
- If user already decided, banner doesn't show regardless of geolocation
- Respects user's previous choice

## Local Development Behavior

### Geolocation Unavailable Locally

When running locally (`npm run dev`), Vercel's geolocation headers are not available:

- `x-vercel-ip-country` header is absent
- `extractCountryCode()` returns `"unknown"`
- `isConsentRequired("unknown")` returns `true` (safe default for GDPR compliance)
- **Result**: Consent banner always shows locally

### Testing Geolocation Locally

To test different geolocation scenarios locally:

1. **Simulate GDPR country:**
   ```bash
   # Set cookie manually in browser dev tools
   document.cookie = "consent-required=true; path=/"
   document.cookie = "visitor-country=GB; path=/"
   ```

2. **Simulate non-GDPR country:**
   ```bash
   document.cookie = "consent-required=false; path=/"
   document.cookie = "visitor-country=US; path=/"
   ```

3. **Clear geolocation cookies:**
   ```bash
   document.cookie = "consent-required=; max-age=0; path=/"
   document.cookie = "visitor-country=; max-age=0; path=/"
   ```

## Deployment Testing on Vercel

### Testing Different Countries

Vercel provides geolocation data based on the visitor's IP. To test different countries:

#### Method 1: VPN (Recommended)

1. Connect to a VPN in the target country
2. Clear browser cookies for your domain
3. Visit your deployed site
4. Check cookies in DevTools → Application → Cookies
5. Verify:
   - `visitor-country` matches VPN country
   - `consent-required` is correct for that country
   - Banner shows/not shows as expected

#### Method 2: Vercel Preview Deployments with Headers

You can test by manually setting headers using curl:

```bash
# Test GDPR country (GB)
curl -I -H "x-vercel-ip-country: GB" https://your-app.vercel.app

# Test non-GDPR country (US)
curl -I -H "x-vercel-ip-country: US" https://your-app.vercel.app
```

#### Method 3: Browser Extensions

Use browser extensions that modify request headers to simulate different countries:

1. Install "Requestly" or similar header modification extension
2. Add rule to set `x-vercel-ip-country` header
3. Test different country codes

### Verification Checklist

For each test scenario, verify:

- [ ] `consent-required` cookie is set correctly
- [ ] `visitor-country` cookie matches expected country
- [ ] Debug headers (`x-visitor-country`, `x-consent-required`) are present
- [ ] Banner shows for GDPR countries (GB, DE, FR, etc.)
- [ ] Banner does NOT show for non-GDPR countries (US, CA, AU, etc.)
- [ ] Analytics loads automatically for non-GDPR countries
- [ ] Analytics does NOT load for GDPR countries until consent is given
- [ ] Existing consent choices are respected on return visits

## GDPR/EEA Countries List

The following countries require explicit consent (ISO 3166-1 alpha-2 codes):

```
AT (Austria), BE (Belgium), BG (Bulgaria), HR (Croatia), CY (Cyprus),
CZ (Czech Republic), DK (Denmark), EE (Estonia), FI (Finland), FR (France),
DE (Germany), GR (Greece), HU (Hungary), IE (Ireland), IT (Italy),
LV (Latvia), LT (Lithuania), LU (Luxembourg), MT (Malta), NL (Netherlands),
PL (Poland), PT (Portugal), RO (Romania), SK (Slovakia), SI (Slovenia),
ES (Spain), SE (Sweden), IS (Iceland), LI (Liechtenstein), NO (Norway),
GB (United Kingdom)
```

## Future Maintenance

### If Vercel Changes Geolocation APIs

The implementation uses a fallback chain in `extractCountryCode()`:

1. Primary: Vercel geolocation headers (`x-vercel-ip-country`)
2. Fallback: Can be extended to use other headers or APIs

To update, modify `src/lib/geolocation.ts`:

```typescript
export function extractCountryCode(
  headers: Headers,
  geolocation?: { country?: string } | null
): string {
  // Add new primary detection method here
  if (newMethod) {
    return newMethod;
  }

  // Existing fallbacks...
  const vercelCountryHeader = headers.get("x-vercel-ip-country");
  if (vercelCountryHeader) {
    return vercelCountryHeader.toUpperCase();
  }

  return "unknown";
}
```

### Adding New Consent Countries

Update the `CONSENT_COUNTRIES` array in `src/lib/geolocation.ts`:

```typescript
export const CONSENT_COUNTRIES: readonly string[] = [
  // Existing countries...
  "GB",
  // Add new country codes here
  "XX", // New country
] as const;
```

## Security Considerations

- Cookies use `SameSite=Lax` for security
- Cookies are marked `secure` (HTTPS only)
- Middleware runs on Edge Runtime for performance
- No sensitive data is stored in cookies (only country code and boolean flag)
- Geolocation data comes from Vercel's infrastructure, not client-side

## Performance Impact

- Middleware adds minimal overhead (~1-2ms per request)
- Cookies are set on first visit and cached for 30 days
- No additional API calls required
- Geolocation detection is handled by Vercel's infrastructure

## Troubleshooting

### Banner Always Shows

**Cause**: Geolocation unavailable or country is "unknown"

**Solution**: 
- Check if `consent-required` cookie is set
- Verify `visitor-country` cookie value
- Check browser console for errors
- On Vercel deployment, verify geolocation is enabled

### Analytics Not Loading for Non-GDPR Country

**Cause**: Cookie not set correctly or consent state not updated

**Solution**:
- Clear all cookies and reload
- Check `consent-required` cookie value is "false"
- Verify `consent.analytics` is true in context
- Check browser console for errors

### Cookie Parsing Error

**Cause**: Corrupted or malformed cookie

**Solution**:
- Clear the `krypta-consent` cookie
- The provider will reset to default consent
- Enhanced error handling logs specific issues

## Production Deployment

### Pre-Deployment Checklist

- [ ] Run `npm run lint` - should pass (warnings are OK)
- [ ] Run `npm run type-check` - should pass
- [ ] Test locally with simulated geolocation cookies
- [ ] Deploy to Vercel preview environment
- [ ] Test with VPN from different countries
- [ ] Verify analytics loads correctly
- [ ] Verify banner behavior
- [ ] Check browser console for errors
- [ ] Monitor Vercel logs for middleware errors

### Monitoring

After deployment, monitor:

- Vercel Edge Function logs for middleware errors
- Analytics data to ensure tracking works for non-GDPR countries
- User feedback from GDPR regions about consent experience
