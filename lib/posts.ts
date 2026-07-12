export interface Post {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

// NOTE: once Supabase is wired in, `posts` becomes a fetched array where
// target_site = 'pieterborremans.com', ordered by date desc. This file stays
// as the single import point either way — only the internals change.

export const posts: Post[] = [
  {
    slug: "building-in-public-is-the-ultimate-leverage",
    date: "Jul 12, 2026",
    title: "Building in public is the ultimate leverage",
    excerpt:
      "Why sharing your journey online compounds your progress, attracts opportunities, and forces you to level up.",
    readTime: "5 min read",
    category: "thinking",
  },
  {
    slug: "the-systems-i-use-to-stay-focused",
    date: "Jul 09, 2026",
    title: "The systems I use to stay focused",
    excerpt:
      "A look at the daily habits, tools, and frameworks that help me ship consistently and protect my attention.",
    readTime: "6 min read",
    category: "working",
  },
  {
    slug: "lessons-from-shipping-20-side-projects",
    date: "Jul 06, 2026",
    title: "Lessons from shipping 20+ side projects",
    excerpt: "What actually moves the needle, what doesn't, and the mistakes I keep repeating.",
    readTime: "7 min read",
    category: "working",
  },
  {
    slug: "why-i-built-my-own-os-for-everything",
    date: "Jul 03, 2026",
    title: "Why I built my own OS for everything",
    excerpt: "How Ryoka OS helps me write, build, and publish across all my brands from a single place.",
    readTime: "6 min read",
    category: "updates",
  },
  {
    slug: "curating-signal-in-a-world-of-noise",
    date: "Jun 30, 2026",
    title: "Curating signal in a world of noise",
    excerpt:
      "My approach to finding, capturing, and connecting the right information across research, markets, and AI.",
    readTime: "4 min read",
    category: "thinking",
  },
];

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
