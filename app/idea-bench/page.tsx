import type { Metadata } from "next";
import Header from "@/components/Header";

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
    status: "In dev",
    added: "Aug 20",
    url: "https://equity.tw",
  },
  {
    code: "IB-02",
    title: "Bad news newsletter",
    blurb: "The anti-optimism newsletter, only worse updates.",
    stupid: 3,
    genius: 4,
    boring: 1,
    status: "Shelved",
    added: "Aug 28",
  },
  {
    code: "IB-03",
    title: "Vertical blog posts",
    blurb: "Scroll a blog post like a reel, one paragraph at a time.",
    stupid: 2,
    genius: 3,
    boring: 2,
    status: "In dev",
    added: "Sep 10",
  },
  {
    code: "IB-04",
    title: "Dead domain subscription box",
    blurb: "A new expired domain shipped to you every month.",
    stupid: 5,
    genius: 1,
    boring: 3,
    status: "Too stupid",
    added: "Aug 15",
  },
  {
    code: "IB-05",
    title: "Idea bench",
    blurb: "A public bench for every bad idea, rated in the open.",
    stupid: 2,
    genius: 4,
    boring: 1,
    status: "Build it",
    added: "Sep 13",
  },
  {
    code: "IB-06",
    title: "Guilt-trip to-do app",
    blurb: "Tasks that passive-aggressively remind you they're overdue.",
    stupid: 3,
    genius: 3,
    boring: 2,
    status: "Shelved",
    added: "Jul 30",
  },
  {
    code: "IB-07",
    title: "Cursed QR business cards",
    blurb: "Business cards that scan straight to a diss track.",
    stupid: 5,
    genius: 1,
    boring: 1,
    status: "Too stupid",
    added: "Aug 3",
  },
  {
    code: "IB-08",
    title: "Founders journal",
    blurb: "A private build log for people building alone.",
    stupid: 1,
    genius: 4,
    boring: 2,
    status: "In dev",
    added: "Sep 5",
  },
];

// RGB triples (plus alpha) so the same source of truth can produce both the
// full-strength text color and a 15%-opacity pill background. Falls back to
// muted gray for any status string that isn't one of the recognized ones,
// so custom statuses never break the page.
const STATUS_COLORS: Record<string, { r: number; g: number; b: number; a: number }> = {
  "build it": { r: 74, g: 222, b: 128, a: 1 }, // #4ADE80
  "in dev": { r: 232, g: 185, b: 35, a: 1 }, // gold #E8B923
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

export default function IdeaBench() {
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
      </div>
    </main>
  );
}
