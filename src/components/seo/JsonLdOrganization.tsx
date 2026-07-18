import Script from "next/script";

interface JsonLdOrganizationProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    email: string;
    contactType: string;
  };
}

export function JsonLdOrganization({
  name,
  url,
  logo,
  description,
  sameAs,
  contactPoint,
}: JsonLdOrganizationProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description }),
    ...(sameAs && { sameAs }),
    ...(contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        ...contactPoint,
      },
    }),
  };

  return (
    <Script
      id="json-ld-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
