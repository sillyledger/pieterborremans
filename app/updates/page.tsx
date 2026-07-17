import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Updates | Pieter Borremans",
  description: "Short, frequent notes on what's shipping, what's stuck, and what changed.",
};

// Same 160-char excerpt the rest of the site uses (see lib/posts.ts) — kept
// local here since the featured card needs a longer cut of the same content.
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function makeExcerpt(html: string, maxLength: number): string {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export default async function UpdatesPage() {
  const posts = await getPosts();
  const updatesPosts = posts.filter((post) => post.category === "updates");

  const [featured, ...rest] = updatesPosts;

  return (
    <main className="min-h-screen">
      <div className="max-w-[900px] mx-auto px-7 pt-9 pb-16">
        {/* Nav */}
        <Header active="Blog" />

        <Link
          href="/blog"
          className="font-mono text-[11px] tracking-[0.06em] text-ink/40 hover:text-ink/70 transition-colors inline-flex items-center gap-1.5 mb-6"
        >
          &larr; Back to blog
        </Link>

        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35 mb-2">
          Category
        </div>
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1.5">
          <h1 className="text-[34px] font-normal leading-[1.4] tracking-[-0.005em]">Updates</h1>
          <div className="font-mono text-[11px] text-ink/40">
            {updatesPosts.length} {updatesPosts.length === 1 ? "entry" : "entries"}
          </div>
        </div>
        <p className="text-[15px] text-ink/55 leading-relaxed max-w-[520px] mb-10">
          Short, frequent notes on what&rsquo;s shipping, what&rsquo;s stuck, and what changed.
        </p>

        {updatesPosts.length === 0 && (
          <div className="py-9 border-t border-white/10 text-[13px] text-ink/40">
            No posts yet, check back soon.
          </div>
        )}

        {/* Featured — most recent entry always gets the big slot */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block bg-[#1D1E22] border border-white/10 rounded-2xl p-8 mb-4 hover:border-white/20 transition-colors"
          >
            <div className="font-mono text-[11px] text-ink/40 mb-3">{featured.date}</div>
            <div className="text-[23px] font-semibold leading-snug mb-3 group-hover:text-ink/80 transition-colors max-w-[600px]">
              {featured.title}
            </div>
            <p className="text-[15px] text-ink/55 leading-relaxed max-w-[600px] mb-4">
              {makeExcerpt(featured.content, 280)}
            </p>
            <span className="font-mono text-[11px] text-ink/40">{featured.readTime}</span>
          </Link>
        )}

        {/* Rest of the entries */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-[#1D1E22] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
              >
                <div className="font-mono text-[11px] text-ink/40 mb-2.5">{post.date}</div>
                <div className="text-[17px] font-semibold leading-snug mb-2.5 group-hover:text-ink/80 transition-colors">
                  {post.title}
                </div>
                <p className="text-[13.5px] text-ink/55 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="font-mono text-[11px] text-ink/40 mt-auto">{post.readTime}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
