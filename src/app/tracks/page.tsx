import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Blocks, Clock3, Cog, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = "https://krypta-2026.vercel.app";

export const metadata: Metadata = {
  title: "Competition Tracks",
  description:
    "Explore the Buildathon, Capture The Flag, and Engineering competition tracks at KRYPTA 2026.",
  alternates: {
    canonical: `${SITE_URL}/tracks`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Competition Tracks | KRYPTA 2026",
    description:
      "Choose from three multi-stage competition tracks: Buildathon, Capture The Flag, and Engineering.",
    url: `${SITE_URL}/tracks`,
    type: "website",
  },
};

const TRACKS = [
  {
    href: "/tracks/buildathon",
    icon: Blocks,
    title: "Buildathon",
    duration: "24-hour on-site final",
    description:
      "Turn an idea into a functional full-stack product through an online preliminary round and an intensive on-site finale.",
  },
  {
    href: "/tracks/ctf",
    icon: ShieldCheck,
    title: "Capture The Flag",
    duration: "12-hour on-site final",
    description:
      "Solve cybersecurity challenges across cryptography, web exploitation, reverse engineering, and forensics.",
  },
  {
    href: "/tracks/engineering",
    icon: Cog,
    title: "Engineering",
    duration: "8-hour on-site final",
    description:
      "Apply engineering fundamentals, practical reasoning, and teamwork to solve a focused real-world challenge.",
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "KRYPTA 2026 Competition Tracks",
  itemListElement: TRACKS.map((track, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: track.title,
    url: `${SITE_URL}${track.href}`,
  })),
};

export default function TracksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <Navbar />
      <main id="main-content" className="container-xl py-16">
          <div className="max-w-3xl mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Choose Your Challenge
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              KRYPTA 2026 <span className="gradient-text">Tracks</span>
            </h1>
            <p className="text-base text-[var(--color-foreground-muted)] leading-relaxed">
              Every track begins online, where participants take on a
              preliminary or qualifier stage. Successful competitors advance to
              the Grand Finals at Curtin University Colombo.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            role="list"
            aria-label="KRYPTA 2026 competition tracks"
          >
            {TRACKS.map(
              ({ href, icon: Icon, title, duration, description }) => (
                <Link
                  key={href}
                  href={href}
                  className="group h-full flex flex-col gap-5 p-6 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)]/40 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300"
                  role="listitem"
                  aria-label={`Explore the ${title} track`}
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-200"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1">
                    <h2
                      className="text-lg font-semibold text-[var(--color-foreground)] mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {title}
                    </h2>
                    <p className="flex items-center gap-2 text-xs font-medium text-[var(--color-primary)] mb-3">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                      {duration}
                    </p>
                    <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
                      {description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)]">
                    Explore track
                    <ArrowRight
                      className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              )
            )}
          </div>
        </main>
      <Footer />
    </>
  );
}
