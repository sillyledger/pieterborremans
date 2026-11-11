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
  totalParts?: number; // planned length incl. unpublished parts; undefined = open-ended
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
    slug: "vibe-coding-ipad-app",
    title: "Taking TWO to the iPad",
    shortName: "iPad app",
    description:
      "Taking TWO from Mac to iPad: touch, gestures and screen sizes I've never built for.",
    intro:
      "iPad users were always who I had in mind for TWO. The Mac app was the training ground, and this is the end boss: touch, gestures, Split View and screen sizes I've never built for. Documented from the first confused audit onward.",
    status: "active",
    // No totalParts: open-ended, always shows one "next part" slot.
    postSlugs: ["building-ipad-app-confusing"],
  },
  {
    slug: "building-study-brew",
    title: "Building Study Brew",
    shortName: "Study Brew",
    description:
      "A note-taking app for language learners, built from scratch alongside everything else.",
    status: "planned",
    statusNote: "First post coming soon",
    postSlugs: [],
  },
];

export const activeSeries = series.filter((s) => s.status === "active");

export function getSeries(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}

// Open-ended series have no planned length; there's always a "next part".
export function isOpenEnded(s: Series): boolean {
  return s.totalParts === undefined;
}

// Number of slots to draw for a series given how many parts are published:
// the planned length (never less than published), or published + 1 for an
// open-ended series.
export function slotCount(s: Series, published: number): number {
  return isOpenEnded(s) ? published + 1 : Math.max(s.totalParts!, published);
}

// Finds the active series a post belongs to, with its 1-based part number.
// `total` is undefined for open-ended series.
export function findSeriesForPost(
  postSlug: string,
): { series: Series; part: number; total?: number } | null {
  for (const s of activeSeries) {
    const index = s.postSlugs.indexOf(postSlug);
    if (index !== -1) {
      const total = isOpenEnded(s) ? undefined : slotCount(s, s.postSlugs.length);
      return { series: s, part: index + 1, total };
    }
  }
  return null;
}

// e.g. "4 parts, closing chapter coming" or "1 part so far, more coming".
// Planned series use their statusNote.
export function statusLine(s: Series): string {
  if (s.status === "planned") return s.statusNote ?? "Coming later";
  const published = s.postSlugs.length;
  const parts = `${published} ${published === 1 ? "part" : "parts"}`;
  if (isOpenEnded(s)) return `${parts} so far, more coming`;
  const remaining = slotCount(s, published) - published;
  if (remaining <= 0) return parts;
  if (remaining === 1) return `${parts}, closing chapter coming`;
  return `${parts}, ${remaining} more coming`;
}
