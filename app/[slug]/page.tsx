import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getPosts, categories } from "@/lib/posts";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
        <h1 className="text-[34px] font-normal leading-[1.4] tracking-[-0.005em] mb-1.5">
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
