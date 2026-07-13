import { supabase } from "./supabase";

export interface Post {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  content: string; // raw HTML from Ryoka OS
  spotifyUrl?: string;
}

export interface Category {
  name: string;
  slug: string;
}

// Static list of known categories. Counts are NOT stored here — they're
// computed live from Supabase via getCategoryCounts() so they never go stale.
export const categories: Category[] = [
  { name: "Listen", slug: "listen" },
  { name: "Personal", slug: "personal" },
  { name: "Thinking", slug: "thinking" },
  { name: "Updates", slug: "updates" },
  { name: "Watching", slug: "watching" },
  { name: "Working", slug: "working" },
];

// Tallies published posts per category from a live post list.
// Returns a slug -> count map; unknown/uncategorized posts are ignored.
export function getCategoryCounts(posts: Post[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const cat of categories) counts[cat.slug] = 0;
  for (const post of posts) {
    if (counts[post.category] !== undefined) {
      counts[post.category]++;
    }
  }
  return counts;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function makeExcerpt(html: string, maxLength = 160): string {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

function estimateReadTime(html: string): string {
  const wordCount = stripHtml(html).split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} min read`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

// Fetches every published post tagged for this site, newest first.
export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, title, content, category, published_at, spotify_url")
    .eq("target_site", "pieterborremans.com")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data) {
    console.error("Failed to fetch posts:", error);
    return [];
  }

  return data.map((row) => ({
    slug: row.slug,
    date: formatDate(row.published_at),
    title: row.title,
    excerpt: makeExcerpt(row.content ?? ""),
    readTime: estimateReadTime(row.content ?? ""),
    category: (row.category ?? "").toLowerCase().trim(),
    content: row.content ?? "",
    spotifyUrl: row.spotify_url || undefined,
  }));
}

// Fetches a single post by slug, or null if it doesn't exist / isn't published.
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, title, content, category, published_at, spotify_url")
    .eq("target_site", "pieterborremans.com")
    .eq("status", "published")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return {
    slug: data.slug,
    date: formatDate(data.published_at),
    title: data.title,
    excerpt: makeExcerpt(data.content ?? ""),
    readTime: estimateReadTime(data.content ?? ""),
    category: (data.category ?? "").toLowerCase().trim(),
    content: data.content ?? "",
    spotifyUrl: data.spotify_url || undefined,
  };
}
