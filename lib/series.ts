// Hand-curated multi-part series shown on /series. Post order is the reading
// order (oldest first). $168M and Idea Bench content live on their own pages
// and are intentionally not listed here.

export type Series = {
  slug: string;
  title: string;
  description: string;
  status: "active" | "planned";
  totalParts?: number; // planned length, including parts not yet published
  postSlugs: string[];
};

export const series: Series[] = [
  {
    slug: "vibe-coding-mac-app",
    title: "How do you vibe code a Mac app?",
    description:
      "Building a native Mac app for TWO with zero Swift experience, one Claude limit at a time.",
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
    description: "What happens after the Mac app ships. The endgame all along.",
    status: "planned",
    postSlugs: [],
  },
];
