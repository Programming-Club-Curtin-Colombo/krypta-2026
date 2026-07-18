import Script from "next/script";

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface JsonLdBreadcrumbListProps {
  items: BreadcrumbItem[];
}

export function JsonLdBreadcrumbList({ items }: JsonLdBreadcrumbListProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <Script
      id="json-ld-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
