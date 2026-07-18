"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import Script from "next/script";

// ── Static array extracted outside component ──────────────────────────────────
const ANALYTICS_COOKIES = [
  "_ga",
  "_gid",
  "_gat",
  "_clck",
  "_clsk",
  "CLID",
  "MR",
  "MUID",
  "_fbp",
  "_fbc",
];

export function AnalyticsLoader() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    // Clean up analytics cookies if consent is revoked
    if (!consent.analytics) {
      const hostname = window.location.hostname;
      const domain = hostname.startsWith(".") ? hostname : `.${hostname}`;

      ANALYTICS_COOKIES.forEach((cookie) => {
        document.cookie = `${cookie}=; max-age=0; path=/; domain=${hostname}`;
        document.cookie = `${cookie}=; max-age=0; path=/; domain=${domain}`;
      });
    }
  }, [consent.analytics]);

  if (!consent.analytics) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XEFQJCLG7G"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XEFQJCLG7G', {
            cookie_domain: 'krypta-2026.vercel.app',
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xjcc7c1b6n");
        `}
      </Script>

      {/* Vercel Speed Insights */}
      <Script
        src="https://vitals.vercel-analytics.com/v1/vitals/script.js"
        strategy="afterInteractive"
      />
    </>
  );
}
