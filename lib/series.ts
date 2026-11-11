// Hand-curated multi-part series shown on /series. Post order is the reading
// order (oldest first). $168M and Idea Bench content live on their own pages
// and are intentionally not listed here.

export type Series = {
  slug: string;
  title: string;
  shortName: string; // last breadcrumb on /series/[slug]
  description: string;
  intro?: string; // longer lead paragraph on the detail page
  status: "active" | "planned";
  statusNote?: string; // shown instead of the part count for planned series
  totalParts?: number; // planned length, including parts not yet published
  postSlugs: string[];
};

export const series: Series[] = [
  {
    slug: "vibe-coding-mac-app",
    title: "How do you vibe code a Mac app?",
    shortName: "Mac app",
    description:
      "Building a native Mac app for TWO with zero Swift experience, one Claude limit at a time.",
    intro:
      "I write in TWO every day, and I wanted it as a real native Mac app, not a website in a wrapper. Problem: I'd never written a line of Swift. This is the whole run, from opening Xcode for the first time to shipping it, mistakes and burned limits included.",
    status: "active",
    totalParts: 5,
    postSlugs: [
      "vibecoding-a-mac-app-in-xcode",
      "vibe-coding-mac-app-part-2-decluttering",
      "vibe-coding-mac-app-part-3-reset",
      "vibe-coding-mac-app-part-4-limits-90-confidence",
    ],
  },
  {
    slug: "ipad-app",
    title: "Taking TWO to the iPad",
    shortName: "iPad app",
    description: "What happens after the Mac app ships. The endgame all along.",
    status: "planned",
    statusNote: "Starts after the Mac series wraps",
    postSlugs: [],
  },
];

export const activeSeries = series.filter((s) => s.status === "active");

export function getSeries(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}

// Planned length of a series, never less than what's already listed.
export function totalParts(s: Series): number {
  return Math.max(s.totalParts ?? s.postSlugs.length, s.postSlugs.length);
}

// Finds the active series a post belongs to, with its 1-based part number.
export function findSeriesForPost(
  postSlug: string,
): { series: Series; part: number; total: number } | null {
  for (const s of activeSeries) {
    const index = s.postSlugs.indexOf(postSlug);
    if (index !== -1) return { series: s, part: index + 1, total: totalParts(s) };
  }
  return null;
}

// e.g. "4 parts, closing chapter coming". Planned series use their statusNote.
export function statusLine(s: Series): string {
  if (s.status === "planned") return s.statusNote ?? "Coming later";
  const published = s.postSlugs.length;
  const remaining = totalParts(s) - published;
  const parts = `${published} ${published === 1 ? "part" : "parts"}`;
  if (remaining <= 0) return parts;
  if (remaining === 1) return `${parts}, closing chapter coming`;
  return `${parts}, ${remaining} more coming`;
}
