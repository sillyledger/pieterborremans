import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Pieter Borremans",
  description:
    "Pieter Borremans is a writer, content creator, and founder based in Taichung, Taiwan and London, UK. He writes about entrepreneurship, independent business-building, and the unfiltered reality of creating things online.",
};

export default function About() {
  return (
    <main className="min-h-screen">
      <div className="max-w-[720px] mx-auto px-7 pt-9 pb-16">
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
              />
            </div>
            <span className="text-[13px] font-semibold tracking-[0.16em] uppercase">
              Pieter Borremans
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-[0.08em] uppercase text-ink/45">
            <a href="/blog" className="hover:text-ink/80 transition-colors">Blog</a>
            <a href="/about" className="text-ink">About</a>
            <a href="/projects" className="hover:text-ink/80 transition-colors">Projects</a>
            <a href="/contact" className="hover:text-ink/80 transition-colors">Contact</a>
          </nav>
        </header>

        <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40">
          about
        </div>

        <h1 className="font-extrabold text-[38px] leading-[1.25] tracking-[-0.01em] mt-4">
          I stripped things back.
        </h1>

        <div className="text-[18px] leading-[1.75] text-ink/85 mt-6 space-y-[18px]">
          <p>
            I&apos;m Pieter Borremans. Writer, content creator, and{" "}
            <Link href="https://www.ryoka.xyz/" className="underline decoration-ink/30 hover:decoration-ink/60 transition-colors">
              founder
            </Link>
            . I was born in Asia but raised in Belgium.
          </p>
          <p>
            Being raised in the center of Brussels, and having spent my early adulthood in
            Antwerp for university, I went on a trip that never ended when I moved abroad.
            An emotional rollercoaster ride that started 25 years ago. And now, I plan to
            share the past, present, and future.
          </p>
          <p>
            This site is where I think out loud, share what I&apos;m learning, and document
            the process of building something meaningful after a period that asked a lot of
            me.
          </p>
          <p>
            I spent years in the weeds of business and digital strategy, but somewhere along
            the way, I realized the work I care most about is the stuff that connects.
            Writing that offers honest, useful ideas and content that actually means
            something to the person reading it. So I stripped things back.
          </p>
          <p>
            Here you&apos;ll find my blog, where I write about content, creativity, and the
            work of starting over with intention. Alongside that, I run a personal audio
            journal podcast, because some things are easier said than written.
          </p>
        </div>

        {/* Terminal card — same device as the homepage, whoami-style summary here */}
        <div className="bg-[#1D1E22] border border-white/10 rounded-[10px] overflow-hidden mt-9">
          <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-white/10">
            <span className="h-[9px] w-[9px] rounded-full bg-red" />
            <span className="h-[9px] w-[9px] rounded-full bg-gold" />
            <span className="h-[9px] w-[9px] rounded-full bg-[#3BA35C]" />
            <span className="flex-1 text-center font-mono text-[11px] text-ink/40">about.sh</span>
          </div>
          <div className="px-5 py-5 font-mono text-[13px] leading-[1.9]">
            <div><span className="text-ink/40">pieter@ryoka ~ %</span> whoami</div>
            <div className="mb-3">Pieter Borremans — writer, content creator, founder</div>

            <div><span className="text-ink/40">pieter@ryoka ~ %</span> background</div>
            <div className="ml-0.5 mb-3">
              <div><span className="text-gold">&#9679;</span> raised in: Brussels, Belgium</div>
              <div><span className="text-gold">&#9679;</span> university: Antwerp</div>
              <div><span className="text-gold">&#9679;</span> abroad since: ~25 years ago</div>
            </div>

            <div><span className="text-ink/40">pieter@ryoka ~ %</span> focus</div>
            <div className="ml-0.5 mb-3">
              <div><span className="text-gold">&#9679;</span> writing &amp; content creation</div>
              <div><span className="text-gold">&#9679;</span> founder: Ryoka Group</div>
              <div><span className="text-gold">&#9679;</span> podcast: Echo Room</div>
            </div>

            <div><span className="text-ink/40">pieter@ryoka ~ %</span> say_hello</div>
            <div className="mb-3">
              <a href="mailto:hi@pieterborremans.com" className="text-gold underline hover:text-gold/80 transition-colors">
                hi@pieterborremans.com
              </a>
            </div>

            <div>
              <span className="text-ink/40">pieter@ryoka ~ %</span>{" "}
              <span className="cursor-blink bg-ink text-[#1D1E22] px-[1px]">&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
