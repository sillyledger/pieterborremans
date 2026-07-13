import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPostBySlug, categories } from "@/lib/posts";

// Converts a normal open.spotify.com link (episode/track/show/etc) into the
// /embed/ version that can actually be dropped into an iframe.
function getSpotifyEmbedUrl(url: string): string | null {
  const match = url.match(/open\.spotify\.com\/(episode|track|show|album|playlist)\/([a-zA-Z0-9]+)/);
  if (!match) return null;
  const [, type, id] = match;
  return `https://open.spotify.com/embed/${type}/${id}`;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
  const post = await getPostBySlug(slug);

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

        {post.spotifyUrl && getSpotifyEmbedUrl(post.spotifyUrl) && (
          <iframe
            src={getSpotifyEmbedUrl(post.spotifyUrl)!}
            width="100%"
            height="152"
            style={{ borderRadius: "12px", maxWidth: "620px" }}
            className="mb-8"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        )}

        {/* Real post content is HTML from Ryoka OS, so it's rendered directly
            rather than mapped as plain paragraphs. The [&_x] classes style
            the tags that come out of the editor (p, a, strong, em, lists). */}
        <div
          className="text-[18px] leading-[1.75] text-ink/85
            [&_p]:max-w-[620px] [&_p]:mb-[18px] [&_p:last-child]:mb-0
            [&_a]:text-gold [&_a]:underline [&_a]:decoration-dotted [&_a]:decoration-gold/50 [&_a]:underline-offset-4 hover:[&_a]:decoration-gold
            [&_strong]:text-ink [&_strong]:font-semibold [&_em]:italic
            [&_ul]:max-w-[620px] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-[18px]
            [&_ol]:max-w-[620px] [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-[18px]
            [&_li]:mb-1.5
            [&_img]:w-full [&_img]:rounded-xl [&_img]:my-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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
