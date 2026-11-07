import { MetadataRoute } from "next";

const BASE_URL = "https://pieterborremans.com";

const AI_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "CCBot",
  "Bytespider",
  "PerplexityBot",
  "Amazonbot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/goods/"],
      },
      {
        userAgent: AI_CRAWLERS,
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
