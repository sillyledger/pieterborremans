import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Idea Bench | Pieter Borremans",
    description:
      "Every idea that comes to mind, rated in public for how stupid, genius, or boring it probably is.",
  };
}

// References the sitewide Person entity by @id rather than declaring a new
// one, same pattern as app/168/page.tsx.
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://pieterborremans.com/idea-bench#webpage",
  "url": "https://pieterborremans.com/idea-bench",
  "name": "Idea Bench | Pieter Borremans",
  "author": { "@id": "https://ryokagroup.com/founder#pieter" },
  "description":
    "Every idea that comes to mind, rated in public for how stupid, genius, or boring it probably is.",
};

interface Idea {
  code: string;
  title: string;
  blurb: string;
  stupid: number;
  genius: number;
  boring: number;
  status: string;
  added: string;
  url?: string;
}

const ideas: Idea[] = [
  {
    code: "IB-01",
    title: "Equity",
    blurb: "Bigger poker sessions, riskier trades, and weird bets, chasing a billion dollars in public.",
    stupid: 5,
    genius: 1,
    boring: 1,
    status: "In progress",
    added: "Aug 20",
    url: "https://equity.tw",
  },
  {
    code: "IB-02",
    title: "Stupid Hit",
    blurb: "A collection of ideas so stupid they went viral or made real money anyway.",
    stupid: 3,
    genius: 4,
    boring: 1,
    status: "Live",
    added: "Aug 28",
  },
  {
    code: "IB-04",
    title: "Random Facts",
    blurb: "A growing collection of random facts from all over the world.",
    stupid: 5,
    genius: 1,
    boring: 3,
    status: "In progress",
    added: "Aug 15",
  },
];

// RGB triples (plus alpha) so the same source of truth can produce both the
// full-strength text color and a 15%-opacity pill background. Falls back to
// muted gray for any status string that isn't one of the recognized ones,
// so custom statuses never break the page.
const STATUS_COLORS: Record<string, { r: number; g: number; b: number; a: number }> = {
  "live": { r: 74, g: 222, b: 128, a: 1 }, // #4ADE80
  "in progress": { r: 232, g: 185, b: 35, a: 1 }, // gold #E8B923
  "shelved": { r: 245, g: 243, b: 238, a: 0.55 }, // ink/55
  "too stupid": { r: 194, g: 59, b: 59, a: 1 }, // red #C23B3B
};
const DEFAULT_STATUS_COLOR = { r: 154, g: 158, b: 147, a: 1 }; // muted #9A9E93

function getStatusColor(status: string) {
  return STATUS_COLORS[status.toLowerCase()] ?? DEFAULT_STATUS_COLOR;
}

function rgba({ r, g, b, a }: { r: number; g: number; b: number; a: number }, alpha: number) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const METER_COLOR = {
  stupid: "#C23B3B", // red
  genius: "#E8B923", // gold
  boring: "#9A9E93", // muted
};

function Meter({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-11 shrink-0 font-mono text-[9px] uppercase text-ink/35">{label}</span>
      <span className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <span
          className="block h-full rounded-full"
          style={{ width: `${(score / 5) * 100}%`, backgroundColor: color }}
        />
      </span>
      <span className="font-mono text-[10px]" style={{ color }}>
        {score}/5
      </span>
    </div>
  );
}

export default async function IdeaBench() {
  const posts = await getPosts();
  const relatedPosts = posts.filter((post) => post.category?.toLowerCase() === "ideas");

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
        {/* Nav */}
        <Header />

        <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40 mb-3">
          Idea bench
        </div>
        <h1 className="font-heading text-[26px] sm:text-[34px] font-normal leading-[1.4] tracking-[-0.005em] mb-3">
          Every idea I&apos;ve had, rated for how stupid it probably is.
        </h1>
        <div className="text-[14px] text-ink/60 leading-relaxed max-w-[480px] mb-10">
          Random things show up in my head all day. Some I build. Some I try and give up on. Most
          just get rated and left here.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ideas.map((idea, i) => {
            const statusColor = getStatusColor(idea.status);
            const cardClassName = `bg-[#1D1E22] border border-hairline rounded-xl p-4${
              idea.url ? " hover:border-white/15 transition-colors" : ""
            }`;
            const cardStyle = { transform: `rotate(${i % 2 === 0 ? 1 : -1}deg)` };
            const cardContent = (
              <>
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <span className="text-[15px] font-semibold">{idea.title}</span>
                  <span
                    className="font-mono text-[9px] uppercase px-2 py-[3px] rounded-full whitespace-nowrap"
                    style={{
                      backgroundColor: rgba(statusColor, 0.15),
                      color: rgba(statusColor, statusColor.a),
                    }}
                  >
                    {idea.status}
                  </span>
                </div>
                <p className="text-xs text-ink/50 mb-3">{idea.blurb}</p>

                <div className="border-t border-hairline pt-2.5 flex flex-col gap-1.5 mb-2.5">
                  <Meter label="Stupid" score={idea.stupid} color={METER_COLOR.stupid} />
                  <Meter label="Genius" score={idea.genius} color={METER_COLOR.genius} />
                  <Meter label="Boring" score={idea.boring} color={METER_COLOR.boring} />
                </div>

                <div className="font-mono text-[10px] text-ink/30">Added {idea.added}</div>
              </>
            );

            if (idea.url) {
              return (
                <a
                  key={idea.code}
                  href={idea.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClassName}
                  style={cardStyle}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={idea.code} className={cardClassName} style={cardStyle}>
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* Related posts */}
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35 mb-4">
          Related posts
        </div>
        <ul className="border-t border-hairline">
          {relatedPosts.length === 0 && (
            <li className="py-6 text-[13px] text-ink/40">No posts yet, check back soon.</li>
          )}
          {relatedPosts.map((post, i) => (
            <li
              key={post.slug}
              className={`py-[18px] ${i !== relatedPosts.length - 1 ? "border-b border-hairline" : ""}`}
            >
              <Link href={`/blog/${post.slug}`} className="flex justify-between items-start gap-6 group">
                <div className="max-w-[520px]">
                  <div className="font-mono text-[11px] text-ink/40 mb-1.5">{post.date}</div>
                  <div className="text-lg font-semibold mb-1.5 group-hover:text-ink/80 transition-colors">
                    {post.title}
                  </div>
                  <p className="text-[13px] text-ink/55 leading-relaxed">{post.excerpt}</p>
                </div>
                <span className="font-mono text-[11px] text-ink/40 whitespace-nowrap mt-0.5">
                  {post.readTime}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
