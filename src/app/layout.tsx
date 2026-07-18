import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { LogoLoader, CookieConsentBanner, WebGLFlowmap } from "@/components/ui";
import { AnalyticsLoader } from "@/components/analytics/AnalyticsLoader";
import { SITE_URL, SITE_NAME } from "@/lib";
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

const SITE_DESCRIPTION =
  "KRYPTA 2026: A premier multi-track tech arena organized by the Programming Club of Curtin University Colombo, featuring Buildathon, Capture The Flag (CTF), and School Students Hackathon tracks.";

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Multi-Track Tech Arena by Programming Club of Curtin University Colombo`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "KRYPTA 2026",
    "tech arena",
    "buildathon",
    "CTF",
    "Capture The Flag",
    "School Students Hackathon",
    "Curtin University Colombo",
    "Programming Club",
    "multi-track competition",
    "technology competition",
    "engineering challenge",
    "cybersecurity competition",
    "Sri Lanka tech competition",
    "student competition",
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
    title: `${SITE_NAME} | Multi-Track Tech Arena`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1080,
        height: 1080,
        alt: "KRYPTA 2026 - Multi-Track Tech Arena by Programming Club of Curtin University Colombo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Multi-Track Tech Arena`,
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

export async function generateViewport(): Promise<Viewport> {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? "";
  const isSamsungBrowser = userAgent.includes("SamsungBrowser");

  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
      { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    ],
    // Samsung Internet's forced dark mode algorithm destroys manual dark themes.
    // 'only light' forces it to opt out, while others get full 'light dark' support.
    colorScheme: isSamsungBrowser ? "only light" : "light dark",
    width: "device-width",
    initialScale: 1,
  };
}

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
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body suppressHydrationWarning>
        {/* Skip to content for keyboard / screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <WebGLFlowmap />
        <CookieConsentProvider>
          <LogoLoader />
          <AnalyticsLoader />
          <ThemeProvider>{children}</ThemeProvider>
          <CookieConsentBanner />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
