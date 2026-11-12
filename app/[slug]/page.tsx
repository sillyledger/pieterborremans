import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getPosts, categories } from "@/lib/posts";

// Static, regenerated at most once a minute (or instantly via /api/revalidate).
export const revalidate = 60;

// Note: don't set dynamicParams = false here. In Next 15.1, on-demand
// revalidation (/api/revalidate) of a dynamicParams=false route turns its
// prerendered pages into 404s. Unknown slugs (e.g. bots probing
// /wp-login.php) still 404 below before any page-level data fetch, and that
// 404 is ISR-cached per path.

// Category slugs that have their own route folder (app/168, app/updates).
// They must never be prerendered here: a prerendered /[slug] page for one of
// these paths shares the "/168" / "/updates" ISR cache entry with the real
// page and replaces it in production (this happened after the ISR switch in
// adef809, when /168 started serving the category archive).
const OWN_ROUTE_SLUGS = new Set(["168", "updates"]);

export function generateStaticParams() {
  return categories
    .filter((cat) => !OWN_ROUTE_SLUGS.has(cat.slug))
    .map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (OWN_ROUTE_SLUGS.has(slug)) notFound();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} | Pieter Borremans`,
    description: `Posts filed under ${category.name} on Pieter Borremans' blog.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (OWN_ROUTE_SLUGS.has(slug)) notFound();
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const posts = await getPosts();
  const categoryPosts = posts.filter((post) => post.category === slug);

  return (
    <main className="min-h-screen">
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
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
        <h1 className="font-heading text-[34px] font-normal leading-[1.4] tracking-[-0.005em] mb-1.5">
          {category!.name}
        </h1>
        <div className="font-mono text-[12px] text-ink/40 mb-9">
          {categoryPosts.length} {categoryPosts.length === 1 ? "entry" : "entries"}
        </div>

        <ul className="border-t border-white/10">
          {categoryPosts.length === 0 && (
            <li className="py-9 text-[13px] text-ink/40">No posts yet, check back soon.</li>
          )}
          {categoryPosts.map((post, i) => (
            <li
              key={post.slug}
              className={`py-[18px] ${i !== categoryPosts.length - 1 ? "border-b border-white/10" : ""}`}
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
