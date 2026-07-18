"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Linkedin, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Tracks", href: "/tracks" },
  { label: "Timeline", href: "/#timeline" },
];

const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    label: "Follow KRYPTA 2026 on LinkedIn",
    href: "https://www.linkedin.com/showcase/krypta-2026",
  },
  {
    icon: Instagram,
    label: "Follow KRYPTA 2026 on Instagram",
    href: "https://www.instagram.com/krypta.pc.cuc/",
  },
  {
    icon: Mail,
    label: "Email KRYPTA 2026",
    href: "mailto:krypta.pc.cuc@gmail.com",
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const gradientRef = useRef<HTMLSpanElement>(null);

  // Combine scroll + resize listeners into a single effect to reduce overhead.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Extract logo hover handlers to stable named callbacks (not inline arrow fns).
  const handleLogoMouseEnter = useCallback(() => {
    if (gradientRef.current) {
      gradientRef.current.style.backgroundPosition = "0 0";
      gradientRef.current.style.opacity = "1";
    }
  }, []);

  const handleLogoMouseLeave = useCallback(() => {
    if (gradientRef.current) {
      gradientRef.current.style.backgroundPosition = "100% 0";
      gradientRef.current.style.opacity = "0";
    }
  }, []);

  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);
  const toggleMobileMenu = useCallback(
    () => setMobileOpen((open) => !open),
    [],
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      )}
      role="banner"
    >
      <div className="container-xl">
        <nav
          className="flex h-16 items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="KRYPTA 2026 - Home"
          >
            <Image
              src="/favicon-32x32.png"
              alt="KRYPTA 2026 Logo"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
              loading="eager"
            />
            <span
              className="text-2xl font-bold text-[var(--color-foreground)] relative overflow-hidden"
              style={{ fontFamily: "var(--font-display)" }}
              onMouseEnter={handleLogoMouseEnter}
              onMouseLeave={handleLogoMouseLeave}
            >
              <span
                ref={gradientRef}
                className="gradient-text absolute inset-0 bg-clip-text text-transparent transition-all duration-500 ease-out"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #4f46e5, #8b5cf6, #ec4899)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "100% 0",
                  opacity: 0,
                }}
              >
                KRYPTA
              </span>
              <span className="relative z-10">KRYPTA</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md",
                    "text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]",
                    "hover:bg-[var(--color-surface-2)]",
                    "transition-all duration-150"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <div
              className="flex items-center gap-1 mr-2"
              aria-label="Social media links"
            >
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                  className={cn(
                    "h-8 w-8 rounded-md flex items-center justify-center",
                    "text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)]",
                    "hover:bg-[var(--color-surface-2)]",
                    "transition-all duration-200"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
            <ThemeToggle />
            <Link
              href="/#stay-updated"
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold",
                "bg-[var(--color-primary)] text-white",
                "hover:bg-[var(--color-primary-hover)]",
                "transition-all duration-200 shadow-sm",
                "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
              )}
              aria-label="Notify Me - Get notified about KRYPTA 2026"
            >
              Notify Me
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className={cn(
                "h-9 w-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]",
                "flex items-center justify-center",
                "text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]",
                "transition-all duration-200"
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur-xl"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="container-xl py-4 flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "block px-3 py-2.5 text-sm font-medium rounded-md",
                    "text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]",
                    "hover:bg-[var(--color-surface-2)]",
                    "transition-all duration-150"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 mt-2 border-t border-[var(--color-border)]">
              <div
                className="flex items-center justify-center gap-4 mb-4"
                aria-label="Social media links"
              >
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={label}
                    className={cn(
                      "h-10 w-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]",
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
              <Link
                href="/#stay-updated"
                onClick={closeMobileMenu}
                className={cn(
                  "block px-3 py-2.5 text-sm font-semibold rounded-md text-center",
                  "bg-[var(--color-primary)] text-white",
                  "hover:bg-[var(--color-primary-hover)]",
                  "transition-all duration-200"
                )}
              >
                Notify Me
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
