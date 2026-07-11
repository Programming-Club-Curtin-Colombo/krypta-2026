import { MetadataRoute } from "next";

const SITE_URL = "https://krypta-2026.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // Future pages - uncomment as they are published:
    // { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    // { url: `${SITE_URL}/tracks`, changeFrequency: "monthly", priority: 0.8 },
    // { url: `${SITE_URL}/schedule`, changeFrequency: "weekly", priority: 0.7 },
    // { url: `${SITE_URL}/sponsors`, changeFrequency: "monthly", priority: 0.6 },
    // { url: `${SITE_URL}/judges`, changeFrequency: "monthly", priority: 0.6 },
    // { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
    // { url: `${SITE_URL}/register`, changeFrequency: "weekly", priority: 0.9 },
    // { url: `${SITE_URL}/workshops`, changeFrequency: "weekly", priority: 0.7 },
    // { url: `${SITE_URL}/rules`, changeFrequency: "monthly", priority: 0.5 },
    // { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];
}

