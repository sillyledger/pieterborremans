import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts, categories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Pieter Borremans",
  description:
    "Pieter Borremans writes about entrepreneurship, independent business-building, and the unfiltered reality of creating things online.",
};

const POSTS_PER_PAGE = 9;

// Next.js 15: searchParams is a Promise and must be awaited — this is new
// vs. Next 14, where it was a plain object.
export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const requestedPage = parseInt(params.page ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, isNaN(requestedPage) ? 1 : requestedPage), totalPages);

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <main className="min-h-screen">
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
        {/* Nav */}
        <header className="flex items-center justify-between mb-14">
          <div className="flex items-center gap-2.5">
            <div className="h-[30px] w-[30px] rounded-full overflow-hidden shrink-0 bg-white/10">
              <Image
                src="/images/pieter-borremans-writer.png"
                alt="Pieter Borremans"
                width={60}
                height={60}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-[13px] font-semibold tracking-[0.16em] uppercase">
              Pieter Borremans
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-[0.08em] uppercase text-ink/45">
            <a href="/blog" className="text-ink">Blog</a>
            <a href="/podcast" className="hover:text-ink/80 transition-colors">Podcast</a>
            <a href="/projects" className="hover:text-ink/80 transition-colors">Projects</a>
            <a href="/gallery" className="hover:text-ink/80 transition-colors">Gallery</a>
            <a href="/about" className="hover:text-ink/80 transition-colors">About</a>
            <a href="/contact" className="hover:text-ink/80 transition-colors">Contact</a>
          </nav>
        </header>

        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35 mb-2">
          Browse by category
        </div>
        <h1 className="text-[26px] font-normal mb-8">The journal.</h1>

        {/* Category cards */}
        <div className="grid grid-cols-3 gap-3.5 items-start mb-12">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              className="block bg-[#1D1E22] border border-white/10 rounded-xl p-[18px] hover:border-white/20 transition-colors"
              style={{ transform: `rotate(${i % 2 === 0 ? "-2deg" : "2deg"})` }}
            >
              <div className="text-[15px] font-semibold mb-1">{cat.name}</div>
              <div className="font-mono text-[11px] text-gold">
                {cat.count} {cat.count === 1 ? "entry" : "entries"}
              </div>
            </Link>
          ))}
        </div>

        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35 mb-4">
          All entries
        </div>

        {/* Feed */}
        <ul className="border-t border-white/10">
          {pagePosts.map((post, i) => (
            <li
              key={post.slug}
              className={`py-[18px] ${i !== pagePosts.length - 1 ? "border-b border-white/10" : ""}`}
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

        {/* Pagination — only renders if there's more than one page */}
        {totalPages > 1 && (
          <nav
            aria-label="Blog pagination"
            className="flex items-center justify-center gap-2.5 font-mono text-xs mt-10"
          >
            {currentPage > 1 && (
              <Link href={`/blog?page=${currentPage - 1}`} className="text-ink/50 hover:text-ink/80 px-2 transition-colors" aria-label="Previous page">
                &larr;
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}`}
                className={
                  p === currentPage
                    ? "bg-ink text-bg px-2.5 py-1 rounded-md"
                    : "text-ink/50 hover:text-ink/80 px-2.5 py-1 transition-colors"
                }
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link href={`/blog?page=${currentPage + 1}`} className="text-ink/50 hover:text-ink/80 px-2 transition-colors" aria-label="Next page">
                &rarr;
              </Link>
            )}
          </nav>
        )}
      </div>
    </main>
  );
}