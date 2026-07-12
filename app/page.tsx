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
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full overflow-hidden shrink-0">
            <Image
              src="/images/pieter-borremans-founder-avatar.jpg"
              alt="Pieter Borremans"
              width={72}
              height={72}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xs md:text-[13px] font-bold tracking-[0.15em]">
            PIETER BORREMANS
          </span>
        </div>
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
      <section className="px-6 pb-20 pt-8 md:px-12 md:pb-28 md:pt-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-2xl">
            <h1 className="font-serif font-normal text-4xl md:text-6xl leading-[1.15]">
              Content creator, blogger, and entrepreneur with an occasional{" "}
              <span className="italic">experiment.</span>
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed mt-6 max-w-md">
              I write, build, and share things that interest me. This is my journal.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-bg px-7 py-4 text-[13px] font-bold tracking-wide whitespace-nowrap"
            >
              READ THE JOURNAL
              <span aria-hidden="true">&rarr;</span>
            </a>
            <span className="flex items-center gap-2 text-[11px] tracking-wide text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-gold inline-block" />
              WRITING SINCE 2018
            </span>
          </div>
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
