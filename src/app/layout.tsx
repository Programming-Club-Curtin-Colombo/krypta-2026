import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

// ── Google Fonts ─────────────────────────────────────────────────────────────
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// ── Site constants ────────────────────────────────────────────────────────────
const SITE_URL = "https://krypta2026.vercel.app";
const SITE_NAME = "KRYPTA 2026";
const SITE_DESCRIPTION =
  "KRYPTA 2026 - Knowledge, Research & Yielding Parallel Technologies Arena. A premier multi-track hackathon competition organized by the Programming Club of Curtin University Colombo.";

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Multi-Track Hackathon by Curtin University Colombo`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "KRYPTA 2026",
    "hackathon",
    "Curtin University Colombo",
    "Programming Club",
    "multi-track hackathon",
    "technology competition",
    "engineering challenge",
    "Sri Lanka hackathon",
    "student hackathon",
    "innovation",
  ],
  authors: [{ name: "Programming Club - Curtin University Colombo" }],
  creator: "Programming Club - Curtin University Colombo",
  publisher: "Programming Club - Curtin University Colombo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Multi-Track Hackathon`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "KRYPTA 2026 - Multi-Track Hackathon by Curtin University Colombo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Multi-Track Hackathon`,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "qIrgChiJDqg0X_dmLbIniAPVl6-JGF2GfHgqH-AZ4nQ",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ── JSON-LD Structured Data ───────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Programming Club - Curtin University Colombo",
  alternateName: "Curtin Colombo Programming Club",
  description: "The official Programming Club of Curtin University Colombo, organizers of KRYPTA 2026.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/club-logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nawam Mawatha",
    addressLocality: "Colombo",
    addressCountry: "LK",
  },
  sameAs: [
    "https://www.linkedin.com/showcase/krypta-2026",
  ],
};

const eventSchemaOpenStage = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "KRYPTA 2026 - Open Stage",
  description: "The online preliminary round of KRYPTA 2026. " + SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.png`,
  startDate: "2026-11-07",
  endDate: "2026-11-08",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  location: {
    "@type": "VirtualLocation",
    url: SITE_URL,
  },
  organizer: {
    "@type": "Organization",
    name: "Programming Club - Curtin University Colombo",
    url: SITE_URL,
  },
};

const eventSchemaFinals = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "KRYPTA 2026 - Grand Finals",
  description: "The grand finals of KRYPTA 2026. " + SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.png`,
  startDate: "2026-11-28",
  endDate: "2026-11-29",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Curtin University Colombo",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Programming Club - Curtin University Colombo",
    url: SITE_URL,
  },
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XEFQJCLG7G" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
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
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xjcc7c1b6n");
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              eventSchemaOpenStage,
              eventSchemaFinals,
            ]),
          }}
        />
      </head>
      <body>
        {/* Skip to content for keyboard / screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
