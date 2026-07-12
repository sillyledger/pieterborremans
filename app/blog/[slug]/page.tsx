import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, categories } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Pieter Borremans`,
    description: post.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const category = categories.find((c) => c.slug === post.category);

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
          className="font-mono text-[11px] tracking-[0.06em] text-ink/40 hover:text-ink/70 transition-colors inline-flex items-center gap-1.5 mb-7"
        >
          &larr; Back to blog
        </Link>

        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.08em] uppercase text-gold mb-3.5">
          <span>{category?.name ?? post.category}</span>
          <span className="text-ink/25">&middot;</span>
          <span className="text-ink/45">{post.date}</span>
          <span className="text-ink/25">&middot;</span>
          <span className="text-ink/45">{post.readTime}</span>
        </div>

        <h1 className="text-[34px] font-normal leading-[1.4] tracking-[-0.005em] mb-8 max-w-[620px]">
          {post.title}
        </h1>

        <div className="flex flex-col gap-[18px] text-[15px] leading-[1.85] text-ink/75 max-w-[620px]">
          {(post.content ?? [post.excerpt]).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="border-t border-hairline mt-11 pt-5">
          <Link
            href="/blog"
            className="font-mono text-[11px] tracking-[0.06em] text-ink/40 hover:text-ink/70 transition-colors"
          >
            &larr; Back to blog
          </Link>
        </div>
      </div>
    </main>
  );
}
