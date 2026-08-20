import { MetadataRoute } from "next";

const BASE_URL = "https://pieterborremans.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/goods/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
