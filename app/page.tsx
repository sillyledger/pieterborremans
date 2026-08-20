import Link from "next/link";
import PhotoStrip from "@/components/PhotoStrip";
import Header from "@/components/Header";
import NewsletterForm from "@/components/NewsletterForm";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = (await getPosts()).slice(0, 5);
  return (
    <main className="min-h-screen">
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-14">
        {/* Nav */}
        <Header />

        {/* Generous breathing room before the statement, ryoka.xyz-style */}
        <div className="h-10" />

        {/* Hero */}
        <section>
          <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink/35 mb-5">
            Field notes on building
          </div>

          {/* No separate tagline headline — this statement IS the h1, just styled as body text */}
          <h1 className="font-heading text-[26px] sm:text-[34px] font-normal leading-[1.4] tracking-[-0.005em]">
            I write, build, and chase one absurd goal in public:{" "}
            <Link
              href="/168"
              className="text-gold font-semibold border-b border-gold/40 hover:border-gold/70 transition-colors"
            >
              $168M USD
            </Link>
            , tracked live from zero.
          </h1>

          {/* Fact cards — replaced the terminal. Real, confirmed details, not placeholders. */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap mt-8 sm:mt-14 mb-10 sm:mb-16">

            {/* Location */}
            <div className="w-[108px] h-[140px] sm:w-[150px] sm:h-[190px] rounded-xl bg-[#1D1E22] border border-white/10 p-3 sm:p-5 rotate-[-3deg] translate-y-2 relative flex flex-col justify-center">
              <span className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 text-[20px] sm:text-[28px] rotate-[3deg] drop-shadow-md" aria-hidden="true">🇹🇼</span>
              <div className="font-mono text-[9px] sm:text-[11px] tracking-[0.05em] uppercase text-ink/35 mb-1.5 sm:mb-2.5">Location</div>
              <div className="text-sm sm:text-lg text-ink">Taiwan</div>
            </div>

            {/* Founder — featured card, badge anchored bottom on purpose */}
            <div className="w-[116px] h-[164px] sm:w-[160px] sm:h-[224px] rounded-xl bg-gold/[0.07] border border-gold/40 p-4 sm:p-6 flex flex-col justify-between relative z-[2]">
              <div>
                <div className="font-mono text-[9px] sm:text-[11px] tracking-[0.05em] uppercase text-gold/70 mb-1.5 sm:mb-2.5">Founder</div>
                <div className="text-sm sm:text-lg text-ink leading-snug">Blogger & creator</div>
              </div>
              <div className="bg-gold text-bg text-[10px] sm:text-xs font-bold font-mono px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-center">
                Ryoka Group
              </div>
            </div>

            {/* $168M challenge — matches Founder's featured pattern, in red */}
            <Link
              href="/168"
              className="w-[116px] h-[164px] sm:w-[160px] sm:h-[224px] rounded-xl bg-red/[0.08] border border-red/45 p-4 sm:p-6 flex flex-col justify-between relative z-[1] rotate-[2deg] translate-y-1"
            >
              <div>
                <div className="font-mono text-[9px] sm:text-[11px] tracking-[0.05em] uppercase text-red/70 mb-1.5 sm:mb-2.5">$168M challenge</div>
                <div className="font-mono font-bold text-ink text-lg sm:text-2xl">$0.00</div>
                <div className="font-mono text-ink/40 text-[10px] sm:text-xs">of $168M USD</div>
              </div>
              <div className="bg-red text-[#2a0e0e] text-[10px] sm:text-xs font-bold font-mono px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-center">
                See tracker
              </div>
            </Link>

            {/* Builder */}
            <div className="w-[108px] h-[140px] sm:w-[150px] sm:h-[190px] rounded-xl bg-[#1D1E22] border border-white/10 p-3 sm:p-5 rotate-[-2deg] translate-y-2 flex flex-col justify-center">
              <div className="font-mono text-[9px] sm:text-[11px] tracking-[0.05em] uppercase text-ink/35 mb-1.5 sm:mb-2.5">Builder</div>
              <div className="text-sm sm:text-lg text-ink leading-snug">5 shipped,<br />4 in progress</div>
            </div>

          </div>

          {/* Writing / Recording / Building — real internal links now, not just labels */}
          <div className="flex items-center justify-center gap-10 text-base font-medium tracking-[0.03em] uppercase text-ink/45 flex-wrap">
            <a href="/blog" className="flex items-center gap-2.5 hover:text-ink/80 transition-colors">
              <svg className="text-ink/70" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              Writing
            </a>
            <a href="/podcast" className="flex items-center gap-2.5 hover:text-ink/80 transition-colors">
              <svg className="text-red/70" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              Recording
            </a>
            <a href="/projects" className="flex items-center gap-2.5 hover:text-ink/80 transition-colors">
              <svg className="text-gold/70" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              Building
            </a>
          </div>

          {/* Newsletter signup */}
          <div className="mt-14">
            <div className="border border-[#2a2a2e] bg-[#1c1c1f] rounded-2xl p-10">
              <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-gold mb-3">
                The journal
              </div>
              <h2 className="font-heading font-bold text-[22px] sm:text-[26px] leading-[1.3] mb-3">
                Get new posts before anyone else
              </h2>
              <p className="text-[14px] sm:text-[15px] text-ink/65 leading-relaxed max-w-[520px] mb-7">
                No noise, no automation sequences. Just what I&apos;m writing, thinking about, and building, sent
                when there&apos;s something worth sending.
              </p>
              <NewsletterForm variant="compact" />
              <p className="font-mono text-[11px] text-ink/40 tracking-[0.04em] mt-4">
                One email per post. Unsubscribe anytime.
              </p>
            </div>
          </div>

          <PhotoStrip />
        </section>
      </div>

      {/* Latest posts */}
      <section className="max-w-[750px] mx-auto px-7 py-10">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40">
            Latest posts
          </span>
          <a
            href="/blog"
            className="font-mono flex items-center gap-1.5 text-[11px] font-medium tracking-[0.06em] uppercase text-ink/40 hover:text-ink/70 transition-colors"
          >
            View all posts <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <ul>
          {posts.length === 0 && (
            <li className="py-6 text-[13px] text-ink/40">No posts yet, check back soon.</li>
          )}
          {posts.map((post, i) => (
            <li
              key={post.slug}
              className={`py-4 ${i !== posts.length - 1 ? "border-b border-white/10" : ""}`}
            >
              <Link href={`/blog/${post.slug}`} className="flex justify-between items-start gap-6 group">
                <div className="max-w-[440px]">
                  <div className="font-mono text-[11px] text-ink/40 mb-1.5">{post.date}</div>
                  <h2 className="font-heading font-semibold text-[19px] group-hover:text-ink/80 transition-colors">{post.title}</h2>
                  <p className="text-[13px] font-medium text-ink/70 mt-1.5 leading-relaxed">{post.excerpt}</p>
                </div>
                <span className="font-mono text-[11px] text-ink/40 whitespace-nowrap mt-0.5">
                  {post.readTime}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
