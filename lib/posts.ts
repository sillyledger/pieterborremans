export interface Post {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  content?: string[];
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

// NOTE: once Supabase is wired in, `posts` becomes a fetched array where
// target_site = 'pieterborremans.com', ordered by date desc. This file stays
// as the single import point either way — only the internals change.

// Empty until real posts are migrated from WordPress or published via Ryoka OS.
export const posts: Post[] = [];

// Category counts below are pulled from the real WordPress categories screenshot,
// not computed from the placeholder posts array above — they'll need to be
// recomputed from real data once the WordPress migration happens.
export const categories: Category[] = [
  { name: "Listen", slug: "listen", count: 10 },
  { name: "Personal", slug: "personal", count: 1 },
  { name: "Thinking", slug: "thinking", count: 7 },
  { name: "Updates", slug: "updates", count: 4 },
  { name: "Watching", slug: "watching", count: 2 },
  { name: "Working", slug: "working", count: 7 },
];
