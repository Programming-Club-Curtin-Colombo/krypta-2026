import Link from "next/link";
import { Linkedin, Instagram, Github, Mail } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = {
  event: [
    { label: "About", href: "#about" },
    { label: "What to Expect", href: "#what-to-expect" },
    { label: "Competition Focus", href: "#competition-focus" },
    { label: "Timeline", href: "#timeline" },
  ],
  info: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Contact", href: "mailto:contact@krypta2026.vercel.app" },
  ],
};

const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    label: "Follow KRYPTA 2026 on LinkedIn",
    href: "https://www.linkedin.com/showcase/krypta-2026",
  },
  {
    icon: Instagram,
    label: "Follow KRYPTA 2026 on Instagram",
    href: "#",
  },
  {
    icon: Github,
    label: "KRYPTA 2026 on GitHub",
    href: "#",
  },
  {
    icon: Mail,
    label: "Email KRYPTA 2026",
    href: "mailto:contact@krypta2026.vercel.app",
  },
];

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
      role="contentinfo"
    >
      <div className="container-xl py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4"
              aria-label="KRYPTA 2026 Home"
            >
              <Image
                src="/logo/krypta-logo.png"
                alt="KRYPTA 2026 Logo"
                width={120}
                height={30}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed max-w-xs mb-6">
              Knowledge, Research & Yielding Parallel Technologies Arena.
              <br />
              A multi-track hackathon by the Programming Club of Curtin
              University Colombo.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className={cn(
                    "h-9 w-9 rounded-lg border border-[var(--color-border)]",
                    "flex items-center justify-center",
                    "text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)]",
                    "hover:border-[var(--color-primary)]",
                    "transition-all duration-200"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Event links */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-foreground-subtle)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Event
            </h3>
            <ul className="space-y-2.5" role="list">
              {FOOTER_LINKS.event.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-foreground-subtle)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Information
            </h3>
            <ul className="space-y-2.5" role="list">
              {FOOTER_LINKS.info.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-foreground-subtle)] text-center sm:text-left">
            &copy; {new Date().getFullYear()} Programming Club - Curtin
            University Colombo. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-foreground-subtle)]">
            Built with ❤️ for KRYPTA 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
