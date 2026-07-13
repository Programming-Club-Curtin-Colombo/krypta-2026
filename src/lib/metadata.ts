import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "./seo-constants";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogImage?: string | undefined;
  noindex?: boolean;
  canonical?: string;
}

export function generateMetadata({
  title,
  description,
  path,
  ogImage,
  noindex = false,
  canonical,
}: PageMetadata): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = canonical || `${SITE_URL}${path}`;
  const imageUrl = ogImage || `${SITE_URL}/og-image.png`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noindex,
      follow: true,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}

export function generateArticleMetadata({
  title,
  description,
  path,
  ogImage,
  author,
  publishedTime,
  modifiedTime,
}: PageMetadata & {
  author: string;
  publishedTime: string;
  modifiedTime?: string;
}): Metadata {
  const baseMetadata = generateMetadata({
    title,
    description,
    path,
    ogImage,
  });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
      publishedTime,
      ...(modifiedTime && { modifiedTime }),
      authors: [author],
    },
  };
}
