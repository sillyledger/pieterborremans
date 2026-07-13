import { MetadataRoute } from "next";
import { getPosts, categories } from "@/lib/posts";

const BASE_URL = "https://pieterborremans.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/podcast`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/gallery`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/affiliate-disclaimer`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/${cat.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
