interface JsonLdEventProps {
  name: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressCountry: string;
    };
  };
  description?: string;
  url?: string;
  image?: string;
  organizer?: {
    name: string;
    url: string;
  };
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
  performer?: {
    name: string;
  }[];
}

export function JsonLdEvent({
  name,
  startDate,
  endDate,
  location,
  description,
  url,
  image,
  organizer,
  offers,
  performer,
}: JsonLdEventProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    startDate,
    ...(endDate && { endDate }),
    location: {
      "@type": "Place",
      ...location,
    },
    ...(description && { description }),
    ...(url && { url }),
    ...(image && { image }),
    ...(organizer && {
      organizer: {
        "@type": "Organization",
        ...organizer,
      },
    }),
    ...(offers && {
      offers: {
        "@type": "Offer",
        ...offers,
      },
    }),
    ...(performer && {
      performer: performer.map((p) => ({
        "@type": "Person",
        ...p,
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
