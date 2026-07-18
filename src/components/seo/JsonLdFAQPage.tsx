import Script from "next/script";

interface FAQItem {
  question: string;
  answer: string;
}

interface JsonLdFAQPageProps {
  faqs: FAQItem[];
}

export function JsonLdFAQPage({ faqs }: JsonLdFAQPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="json-ld-faq"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
