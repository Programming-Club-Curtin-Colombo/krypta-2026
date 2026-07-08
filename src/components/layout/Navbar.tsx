"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "What to Expect", href: "#what-to-expect" },
  { label: "Timeline", href: "#timeline" },
  { label: "Organized By", href: "#organized-by" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change / resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              src="/logo/krypta-logo.png"
              alt="KRYPTA 2026 Logo"
              width={140}
              height={35}
              className="h-8 w-auto"
            />
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
            <ThemeToggle />
            <a
              href="#stay-updated"
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold",
                "bg-[var(--color-primary)] text-white",
                "hover:bg-[var(--color-primary-hover)]",
                "transition-all duration-200 shadow-sm",
                "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
              )}
              aria-label="Get notified about KRYPTA 2026"
            >
              Notify Me
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
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
                  onClick={() => setMobileOpen(false)}
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
            <li className="pt-2 mt-1 border-t border-[var(--color-border)]">
              <a
                href="#stay-updated"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2.5 text-sm font-semibold rounded-md text-center",
                  "bg-[var(--color-primary)] text-white",
                  "hover:bg-[var(--color-primary-hover)]",
                  "transition-all duration-200"
                )}
              >
                Notify Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
