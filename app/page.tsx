import Image from "next/image";
import PhotoStrip from "@/components/PhotoStrip";

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
      <div className="max-w-[720px] mx-auto px-7 pt-9 pb-14">
        {/* Nav */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2.5">
            <div className="h-[30px] w-[30px] rounded-full overflow-hidden shrink-0 bg-white/10">
              <Image
                src="/images/pieter-borremans-writer.png"
                alt="Pieter Borremans"
                width={60}
                height={60}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="text-[13px] font-semibold tracking-[0.16em] uppercase">
              Pieter Borremans
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-[0.08em] uppercase text-ink/45">
            <a href="/blog" className="hover:text-ink/80 transition-colors">Blog</a>
            <a href="/about" className="hover:text-ink/80 transition-colors">About</a>
            <a href="/projects" className="hover:text-ink/80 transition-colors">Projects</a>
            <a href="/contact" className="hover:text-ink/80 transition-colors">Contact</a>
          </nav>
        </header>

        {/* Hero */}
        <section>
          <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40">
            Field notes on building
          </div>

          <h1 className="font-serif font-normal text-[40px] md:text-[52px] leading-[1.1] tracking-[-0.02em] mt-4">
            Content creator, blogger, and entrepreneur with an occasional{" "}
            <em className="italic text-ink/55">experiment.</em>
          </h1>

          <p className="leading-[1.75] text-ink/70 mt-5">
            I write, build, and share things that interest me — mostly entrepreneurship,
            independent business-building, and the unfiltered reality of creating things
            online. This is my journal.
          </p>

          <div className="flex items-center justify-center gap-8 text-xs font-medium tracking-[0.06em] uppercase text-ink/40 mt-8 mb-6 flex-wrap">
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              Writing
            </span>
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              Recording
            </span>
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              Building
            </span>
          </div>

          {/* Terminal card */}
          <div className="bg-[#1D1E22] border border-white/10 rounded-[10px] overflow-hidden">
            <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/10">
              <span className="h-[9px] w-[9px] rounded-full bg-red" />
              <span className="h-[9px] w-[9px] rounded-full bg-gold" />
              <span className="h-[9px] w-[9px] rounded-full bg-[#3BA35C]" />
              <span className="flex-1 text-center font-mono text-[11px] text-ink/40">status.sh</span>
            </div>
            <div className="px-5 py-4.5 font-mono text-[13px] leading-[1.9]">
              <div><span className="text-ink/40">pieter@ryoka ~ %</span> whoami</div>
              <div className="mb-2.5">Pieter Borremans — founder, writer, builder</div>

              <div><span className="text-ink/40">pieter@ryoka ~ %</span> status</div>
              <div className="ml-0.5">
                <div><span className="text-gold">&#9679;</span> building: Ryoka OS, Sorano, TWO Docs</div>
                <div><span className="text-gold">&#9679;</span> writing since: 2018</div>
                <div className="mb-2.5"><span className="text-gold">&#9679;</span> based in: Taichung, TW</div>
              </div>

              <div>
                <span className="text-ink/40">pieter@ryoka ~ %</span>{" "}
                <span className="cursor-blink bg-ink text-[#1D1E22] px-[1px]">&nbsp;</span>
              </div>
            </div>
            <div className="flex justify-end px-5 pb-3.5 pt-2.5">
              <a href="/about" className="font-mono text-[11px] text-ink/40 hover:text-ink/70 transition-colors">
                full status &rarr;
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 mt-7">
            <a
              href="/blog"
              className="inline-flex items-center gap-2.5 rounded-full bg-ink text-bg px-6 py-3.5 text-xs font-semibold tracking-[0.07em] uppercase"
            >
              Read the journal
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <PhotoStrip />
        </section>
      </div>

      {/* Latest posts */}
      <section className="max-w-[720px] mx-auto px-7 py-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40">
            Latest posts
          </span>
          <a
            href="/blog"
            className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.06em] uppercase text-ink/40 hover:text-ink/70 transition-colors"
          >
            View all posts <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <ul>
          {posts.map((post, i) => (
            <li
              key={post.title}
              className={`flex justify-between items-start gap-6 py-4 ${
                i !== posts.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <div className="max-w-[440px]">
                <div className="text-[11px] text-ink/40 mb-1.5">{post.date}</div>
                <h2 className="font-serif text-[19px]">{post.title}</h2>
                <p className="text-[13px] font-medium text-ink/70 mt-1.5 leading-relaxed">{post.excerpt}</p>
              </div>
              <span className="text-[11px] text-ink/40 whitespace-nowrap mt-0.5">
                {post.readTime}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
