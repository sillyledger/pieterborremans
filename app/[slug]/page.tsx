import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
          {category!.count} {category!.count === 1 ? "entry" : "entries"}
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
