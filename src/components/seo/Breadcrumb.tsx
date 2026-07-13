import Link from "next/link";
import { cn } from "@/lib/utils";
import { JsonLdBreadcrumbList } from "./JsonLdBreadcrumbList";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <>
      <JsonLdBreadcrumbList
        items={items.map((item) => ({
          name: item.name,
          item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://krypta-2026.vercel.app"}${item.href}`,
        }))}
      />
      <nav
        aria-label="Breadcrumb"
        className={cn("flex items-center space-x-2 text-sm", className)}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.href} className="flex items-center">
              {index > 0 && (
                <span
                  className="mx-2 text-[var(--color-foreground-subtle)]"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
              {isLast ? (
                <span
                  className="font-medium text-[var(--color-foreground)]"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
