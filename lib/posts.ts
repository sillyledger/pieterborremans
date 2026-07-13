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
  count: number;
}

// Category counts below are pulled from the real WordPress categories screenshot.
// They're separate from the live Supabase post count and may not match exactly
// until the full WordPress migration happens.
export const categories: Category[] = [
  { name: "Listen", slug: "listen", count: 10 },
  { name: "Personal", slug: "personal", count: 1 },
  { name: "Thinking", slug: "thinking", count: 7 },
  { name: "Updates", slug: "updates", count: 4 },
  { name: "Watching", slug: "watching", count: 2 },
  { name: "Working", slug: "working", count: 7 },
];

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
