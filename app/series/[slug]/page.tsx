import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getPosts, type Post } from "@/lib/posts";
import {
  activeSeries,
  getSeries,
  isOpenEnded,
  series as allSeries,
  slotCount,
  statusLine,
  type Series,
} from "@/lib/series";

const BASE_URL = "https://pieterborremans.com";

// Static, regenerated at most once a minute (or instantly via /api/revalidate).
export const revalidate = 60;

export function generateStaticParams() {
  return activeSeries.map((s) => ({ slug: s.slug }));
}

function getActiveSeries(slug: string): Series | null {
  const s = getSeries(slug);
  return s && s.status === "active" ? s : null;
}

function firstSentence(text: string): string {
  return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getActiveSeries(slug);
  if (!s) return {};
  return {
    title: `${s.title} | Series | Pieter Borremans`,
    description: firstSentence(s.intro ?? s.description),
    alternates: { canonical: `/series/${s.slug}` },
  };
}

// Published posts in series order; slugs that aren't found/published are skipped.
async function getSeriesPosts(s: Series): Promise<Post[]> {
  const posts = await getPosts();
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  return s.postSlugs.flatMap((slug) => {
    const post = bySlug.get(slug);
    return post ? [post] : [];
  });
}

// "Aug to Oct 2026", "Aug 2026", or "Dec 2025 to Feb 2026". Post dates arrive
// pre-formatted ("Aug 22, 2026"), so they're parsed back to get month/year.
function dateRange(posts: Post[]): string | null {
  if (posts.length === 0) return null;
  const first = new Date(posts[0].date);
  const last = new Date(posts[posts.length - 1].date);
  const month = (d: Date) => d.toLocaleDateString("en-US", { month: "short" });
  const sameYear = first.getFullYear() === last.getFullYear();
  if (sameYear && first.getMonth() === last.getMonth()) {
    return `${month(first)} ${first.getFullYear()}`;
  }
  if (sameYear) return `${month(first)} to ${month(last)} ${last.getFullYear()}`;
  return `${month(first)} ${first.getFullYear()} to ${month(last)} ${last.getFullYear()}`;
}

const monoLabel = "font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35";

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getActiveSeries(slug);
  if (!s) notFound();

  const posts = await getSeriesPosts(s);
  const published = posts.length;
  const openEnded = isOpenEnded(s);
  const total = slotCount(s, published); // open-ended: published + 1 "next part" slot
  const upcoming = total - published;
  const range = dateRange(posts);
  const otherSeries = allSeries.filter((o) => o.slug !== s.slug);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: s.title,
    url: `${BASE_URL}/series/${s.slug}`,
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
        <Header active="Blog" />

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className={`${monoLabel} mb-2`}>
          <Link href="/blog" className="hover:text-ink/60 transition-colors">
            Blog
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/series" className="hover:text-ink/60 transition-colors">
            Series
          </Link>
          <span className="mx-1.5">/</span>
          <span aria-current="page">{s.shortName}</span>
        </nav>

        <h1 className="font-heading text-[28px] min-[560px]:text-[34px] font-normal leading-[1.35] tracking-[-0.005em] mb-4">
          {s.title}
        </h1>
        <p className="text-[16px] text-ink/60 leading-relaxed max-w-[580px] mb-7">
          {s.intro ?? s.description}
        </p>

        {/* Progress */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mb-8">
          <div aria-hidden="true" className="flex gap-1 w-[180px]">
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={`flex-1 h-[5px] rounded-full ${
                  i >= published
                    ? "border border-dashed border-ink/30"
                    : i === published - 1
                      ? "bg-gold"
                      : "bg-ink/75"
                }`}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12px] text-ink/50">
            {openEnded ? (
              <span>
                <span className="text-ink">{published}</span>{" "}
                {published === 1 ? "part" : "parts"} so far
              </span>
            ) : (
              <span>
                <span className="text-ink">{published}</span> of {total} parts
              </span>
            )}
            {range && (
              <>
                <span className="text-ink/25">&middot;</span>
                <span>{range}</span>
              </>
            )}
            <span className="text-ink/25">&middot;</span>
            {upcoming > 0 ? <span className="text-gold">In progress</span> : <span>Complete</span>}
          </div>
        </div>

        {/* Start here */}
        {published > 0 && (
          <div className="flex flex-col min-[560px]:flex-row min-[560px]:items-center justify-between gap-2 bg-[#1D1E22] border border-white/10 rounded-xl px-5 py-4 text-[14px] mb-12">
            <span className="text-ink/60">New here? It reads best in order.</span>
            <Link
              href={`/blog/${posts[0].slug}`}
              className="text-ink underline decoration-gold underline-offset-4 hover:text-gold transition-colors"
            >
              Start with part 1
            </Link>
          </div>
        )}

        {/* Timeline */}
        <ol className="relative mb-14">
          <span
            aria-hidden="true"
            className="absolute left-[19.5px] top-5 bottom-5 w-px bg-white/10"
          />
          {posts.map((post, i) => {
            const isLatest = i === published - 1;
            return (
              <li key={post.slug} className="relative pb-8 last:pb-0">
                <Link href={`/blog/${post.slug}`} className="flex gap-5 group">
                  <span
                    className={`relative shrink-0 flex items-center justify-center w-10 h-10 rounded-full font-mono text-[13px] ${
                      isLatest ? "bg-gold text-bg" : "bg-bg border border-white/20 text-ink/80"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 pt-1">
                    <div className="flex items-center gap-2.5 font-mono text-[11px] text-ink/40 mb-1.5">
                      <span>{post.date}</span>
                      {isLatest && (
                        <span className="tracking-[0.12em] uppercase text-gold">Latest</span>
                      )}
                    </div>
                    <div className="text-[19px] font-semibold leading-snug mb-1.5 group-hover:text-ink/80 transition-colors">
                      {post.title}
                    </div>
                    <p className="text-[14px] text-ink/55 leading-relaxed">{post.excerpt}</p>
                  </div>
                </Link>
              </li>
            );
          })}
          {Array.from({ length: upcoming }, (_, j) => {
            const part = published + j + 1;
            const isLastSlot = j === upcoming - 1;
            return (
              <li key={`upcoming-${part}`} className="relative pb-8 last:pb-0">
                <div className="flex gap-5">
                  <span className="relative shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-bg border border-dashed border-white/25 font-mono text-[13px] text-ink/45">
                    {part}
                  </span>
                  <div className="min-w-0 pt-1">
                    <div className="font-mono text-[11px] text-ink/40 mb-1.5">Coming soon</div>
                    <div className="text-[19px] font-semibold leading-snug text-ink/45 mb-1.5">
                      {upcoming === 1 && !openEnded ? "The closing chapter" : `Part ${part}`}
                    </div>
                    {isLastSlot && (
                      <p className="text-[14px] text-ink/45 leading-relaxed">
                        How it ends.{" "}
                        <Link
                          href="/newsletter"
                          className="text-ink/70 underline underline-offset-2 hover:text-gold transition-colors"
                        >
                          Get it in your inbox
                        </Link>{" "}
                        when it&apos;s out.
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* More series */}
        <div className="border-t border-white/10 pt-10">
          <div className={`${monoLabel} mb-4`}>More series</div>
          <div className="grid grid-cols-1 min-[560px]:grid-cols-2 gap-3.5">
            {otherSeries.map((o) => {
              const inner = (
                <>
                  <div className="font-heading text-[18px] leading-[1.3] mb-1.5">{o.title}</div>
                  <p className="text-[13px] text-ink/55 leading-relaxed mb-3">{o.description}</p>
                  <div
                    className={`font-mono text-[11px] ${o.status === "planned" ? "text-ink/40" : "text-gold"}`}
                  >
                    {statusLine(o)}
                  </div>
                </>
              );
              return o.status === "active" ? (
                <Link
                  key={o.slug}
                  href={`/series/${o.slug}`}
                  className="block bg-[#1D1E22] border border-white/10 rounded-[14px] p-5 hover:border-white/20 transition-colors"
                >
                  {inner}
                </Link>
              ) : (
                <div key={o.slug} className="border border-dashed border-white/10 rounded-[14px] p-5">
                  {inner}
                </div>
              );
            })}
            <Link
              href="/series"
              className="flex flex-col justify-between gap-6 bg-[#1D1E22] border border-white/10 rounded-[14px] p-5 hover:border-white/20 transition-colors"
            >
              <div className="font-heading text-[18px] leading-[1.3]">All series</div>
              <div className="font-mono text-[11px] text-gold">Back to the overview &rarr;</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
