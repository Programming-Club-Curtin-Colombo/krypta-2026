import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/faq", "/privacy-policy", "/terms", "/tracks"],
        disallow: ["/api", "/admin"],
      },
    ],
    sitemap: "https://krypta-2026.vercel.app/sitemap.xml",
  };
}
