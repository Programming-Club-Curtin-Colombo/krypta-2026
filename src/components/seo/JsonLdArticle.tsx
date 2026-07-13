interface JsonLdArticleProps {
  headline: string;
  image?: string;
  author: {
    name: string;
    url?: string;
  };
  datePublished: string;
  dateModified?: string;
  description?: string;
  url?: string;
  publisher?: {
    name: string;
    logo?: string;
  };
}

export function JsonLdArticle({
  headline,
  image,
  author,
  datePublished,
  dateModified,
  description,
  url,
  publisher,
}: JsonLdArticleProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    ...(image && { image }),
    author: {
      "@type": "Person",
      ...author,
    },
    datePublished,
    ...(dateModified && { dateModified }),
    ...(description && { description }),
    ...(url && { url }),
    ...(publisher && {
      publisher: {
        "@type": "Organization",
        ...publisher,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
