import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { articles } from "@/content/knowledge/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/werkgevers`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/kennisbank`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/bedankt`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/dienstenwijzer`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${baseUrl}/klachten`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${baseUrl}/toegankelijkheid`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/voorwaarden`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  // Note: Landing pages (/lp/*) are intentionally excluded from sitemap
  // They are ad-specific and shouldn't be indexed organically

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/kennisbank/${article.slug}`,
    lastModified: new Date(article.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
