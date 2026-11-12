import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { series, slotCount, statusLine, type Series } from "@/lib/series";

export const metadata: Metadata = {
  title: "Series | Pieter Borremans",
  description:
    "Multi-part stories Pieter Borremans documents start to finish, in reading order.",
  alternates: { canonical: "/series" },
};

// Static, regenerated at most once a minute (or instantly via /api/revalidate).
export const revalidate = 60;

// Spine heights cycle through this pattern so the bars look like book spines.
const SPINE_HEIGHTS = [38, 46, 34, 50, 42, 30];

function Spines({ s }: { s: Series }) {
  const published = s.postSlugs.length;
  const total = s.status === "planned" ? 0 : slotCount(s, published);
  if (total === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="hidden min-[560px]:flex items-end gap-1.5 shrink-0 h-[50px]"
    >
      {Array.from({ length: total }, (_, i) => {
        const height = SPINE_HEIGHTS[i % SPINE_HEIGHTS.length];
        const isPublished = i < published;
        const isLatest = i === published - 1;
        return (
          <span
            key={i}
            className={`block w-[11px] rounded-[2px] ${
              !isPublished
                ? "border border-dashed border-ink/30"
                : isLatest
                  ? "bg-gold"
                  : "bg-ink"
            }`}
            style={{ height }}
          />
        );
      })}
    </div>
  );
}

function SeriesCard({ s }: { s: Series }) {
  const body = (
    <>
      <div className="min-w-0">
        <h2 className="font-heading text-[22px] font-normal leading-[1.3] mb-1.5">{s.title}</h2>
        <p className="text-[14px] text-ink/55 leading-relaxed mb-3">{s.description}</p>
        <div
          className={`font-mono text-[11px] ${s.status === "planned" ? "text-ink/40" : "text-gold"}`}
        >
          {statusLine(s)}
        </div>
      </div>
      <Spines s={s} />
    </>
  );

  const layout = "flex justify-between items-center gap-6 rounded-[14px] p-[22px]";

  // Active series link to their detail page; planned ones aren't links.
  if (s.status === "active") {
    return (
      <Link
        href={`/series/${s.slug}`}
        className={`${layout} bg-[#1D1E22] border border-white/10 hover:border-white/20 transition-colors`}
      >
        {body}
      </Link>
    );
  }

  return <div className={`${layout} border border-dashed border-white/10`}>{body}</div>;
}

export default function SeriesPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
        <Header active="Series" />

        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35 mb-2"
        >
          <Link href="/blog" className="hover:text-ink/60 transition-colors">
            Blog
          </Link>
          <span className="mx-1.5">/</span>
          <span aria-current="page">Series</span>
        </nav>
        <h1 className="font-heading text-[34px] font-normal leading-[1.4] tracking-[-0.005em] mb-4">
          Series.
        </h1>
        <p className="text-[16px] text-ink/60 leading-relaxed mb-10 max-w-[600px]">
          Some things take more than one post. These are the ones I&apos;m documenting start to
          finish, in order, so you don&apos;t have to dig through the journal to follow along.
        </p>

        <ul className="flex flex-col gap-3.5 mb-10">
          {series.map((s) => (
            <li key={s.slug}>
              <SeriesCard s={s} />
            </li>
          ))}
        </ul>

        <p className="text-[13px] text-ink/40 leading-relaxed">
          Looking for the money side? That lives on the{" "}
          <Link href="/168" className="underline underline-offset-2 hover:text-ink/70 transition-colors">
            $168M challenge
          </Link>
          . Half-baked ideas go on the{" "}
          <Link href="/idea-bench" className="underline underline-offset-2 hover:text-ink/70 transition-colors">
            Idea Bench
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
