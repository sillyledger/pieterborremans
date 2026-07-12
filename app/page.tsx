import Image from "next/image";

// NOTE: once Supabase is wired in, this will become:
// export const dynamic = "force-dynamic";
// and `posts` below will be a fetched array where target_site = 'pieterborremans.com'

const posts = [
  {
    date: "Jul 12, 2026",
    title: "Building in public is the ultimate leverage",
    excerpt:
      "Why sharing your journey online compounds your progress, attracts opportunities, and forces you to level up.",
    readTime: "5 min read",
  },
  {
    date: "Jul 09, 2026",
    title: "The systems I use to stay focused",
    excerpt:
      "A look at the daily habits, tools, and frameworks that help me ship consistently and protect my attention.",
    readTime: "6 min read",
  },
  {
    date: "Jul 06, 2026",
    title: "Lessons from shipping 20+ side projects",
    excerpt: "What actually moves the needle, what doesn't, and the mistakes I keep repeating.",
    readTime: "7 min read",
  },
  {
    date: "Jul 03, 2026",
    title: "Why I built my own OS for everything",
    excerpt: "How Ryoka OS helps me write, build, and publish across all my brands from a single place.",
    readTime: "6 min read",
  },
  {
    date: "Jun 30, 2026",
    title: "Curating signal in a world of noise",
    excerpt:
      "My approach to finding, capturing, and connecting the right information across research, markets, and AI.",
    readTime: "4 min read",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <span className="text-xs md:text-[13px] font-bold tracking-[0.15em]">
          PIETER BORREMANS
        </span>
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide text-muted">
          <a href="/blog" className="hover:text-ink transition-colors">BLOG</a>
          <a href="/about" className="hover:text-ink transition-colors">ABOUT</a>
          <a href="/projects" className="hover:text-ink transition-colors">PROJECTS</a>
          <a href="/contact" className="hover:text-ink transition-colors">CONTACT</a>
        </nav>
        <span className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[11px] tracking-wide text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          JOURNAL
        </span>
      </header>

      {/* Hero */}
      <section className="text-center px-6 pb-16 pt-4 md:px-12">
        <div className="mx-auto h-28 w-28 md:h-[118px] md:w-[118px] overflow-hidden rounded-full">
          <Image
            src="/images/pieter-borremans-founder-avatar.jpg"
            alt="Pieter Borremans, founder and writer, in Taichung, Taiwan"
            width={236}
            height={236}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <h1 className="font-serif font-medium text-3xl md:text-[39px] leading-tight max-w-[620px] mx-auto mt-8">
          Content creator, blogger, and entrepreneur with an occasional{" "}
          <span className="italic">experiment.</span>
        </h1>

        <p className="text-muted text-sm md:text-[14.5px] leading-relaxed mt-4">
          I write, build, and share things that interest me.
          <br />
          This is my journal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-bg px-6 py-3 text-[12.5px] font-bold tracking-wide"
          >
            READ THE JOURNAL
            <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            href="/about"
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-[12.5px] font-semibold tracking-wide"
          >
            ABOUT ME
          </a>
        </div>
      </section>

      <div className="border-t border-hairline" />

      {/* Latest posts */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[11.5px] font-semibold tracking-[0.15em] text-muted">
            LATEST POSTS
          </span>
          <a
            href="/blog"
            className="flex items-center gap-1.5 text-[11.5px] tracking-wide text-muted hover:text-ink transition-colors"
          >
            VIEW ALL POSTS <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <ul>
          {posts.map((post, i) => (
            <li
              key={post.title}
              className={`flex justify-between items-start gap-6 py-4 ${
                i !== posts.length - 1 ? "border-b border-hairline" : ""
              }`}
            >
              <div className="max-w-[560px]">
                <div className="text-[11px] text-muted mb-1.5">{post.date}</div>
                <h2 className="font-serif text-[19px]">{post.title}</h2>
                <p className="text-[13px] text-muted mt-1.5 leading-relaxed">{post.excerpt}</p>
              </div>
              <span className="text-[11.5px] text-muted whitespace-nowrap mt-0.5">
                {post.readTime}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
