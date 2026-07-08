import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";

// Partner placeholder data — replace with real logos once available
const PARTNERS = [
  { name: "Partner 01", label: "Coming Soon" },
  { name: "Partner 02", label: "Coming Soon" },
  { name: "Partner 03", label: "Coming Soon" },
  { name: "Partner 04", label: "Coming Soon" },
];

export function OrganizedBySection() {
  return (
    <section
      id="organized-by"
      className="section bg-[var(--color-surface)]"
      aria-labelledby="organizer-heading"
    >
      <div className="container-xl">
        <AnimatedSection className="text-center space-y-10">
          {/* Label */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Organized By
            </p>
            <h2
              id="organizer-heading"
              className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Programming Club
            </h2>
            <p className="mt-1 text-base text-[var(--color-foreground-muted)]">
              Curtin University Colombo
            </p>
          </div>

          {/* Organizer card */}
          <div
            className={cn(
              "inline-flex flex-col items-center gap-4 px-10 py-8 rounded-2xl mx-auto",
              "border border-[var(--color-border)] bg-[var(--color-card)]",
              "shadow-[var(--shadow-card)]"
            )}
          >
            {/* Logo placeholder — replace with <Image> pointing to the actual logo */}
            <div
              className="h-20 w-20 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center"
              aria-hidden="true"
            >
              <span
                className="text-2xl font-bold gradient-text"
                style={{ fontFamily: "var(--font-display)" }}
              >
                PCC
              </span>
            </div>
            <div className="text-center">
              <p
                className="font-bold text-[var(--color-foreground)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Programming Club
              </p>
              <p className="text-sm text-[var(--color-foreground-muted)]">
                Curtin University Colombo
              </p>
            </div>
          </div>

          {/* Partners row */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest text-[var(--color-foreground-subtle)] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Partners & Sponsors — Announcements Coming Soon
            </p>
            <div
              className="flex flex-wrap justify-center gap-4"
              aria-label="Partner placeholders"
              role="list"
            >
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  role="listitem"
                  className={cn(
                    "flex items-center justify-center",
                    "h-14 w-36 rounded-xl",
                    "border border-dashed border-[var(--color-border-muted)]",
                    "bg-[var(--color-surface-2)]"
                  )}
                  aria-label={`${partner.name} — ${partner.label}`}
                >
                  <span className="text-xs font-medium text-[var(--color-foreground-subtle)]">
                    {partner.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
