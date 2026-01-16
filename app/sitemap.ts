import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { articles } from "@/content/knowledge/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/kennisbank`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/dienstenwijzer`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/klachten`, lastModified: new Date(), priority: 0.4 },
    { url: `${baseUrl}/toegankelijkheid`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/voorwaarden`, lastModified: new Date(), priority: 0.3 },
  ];

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/kennisbank/${article.slug}`,
    lastModified: new Date(article.lastUpdated),
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
