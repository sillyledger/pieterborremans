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
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
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
            <a href="/podcast" className="hover:text-ink/80 transition-colors">Podcast</a>
            <a href="/projects" className="hover:text-ink/80 transition-colors">Projects</a>
            <a href="/gallery" className="hover:text-ink/80 transition-colors">Gallery</a>
            <a href="/about" className="text-ink">About</a>
            <a href="/contact" className="hover:text-ink/80 transition-colors">Contact</a>
          </nav>
        </header>

        <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40">
          about
        </div>

        <h1 className="text-[34px] font-normal leading-[1.4] tracking-[-0.005em] mt-4">
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
            Antwerp for university, I went on a trip that never ended when I moved abroad. An
            emotional rollercoaster ride that started 25 years ago. And now, I plan to share
            the past, present, and future.
          </p>
        </div>

        {/* Fact cards — same fanned style as the homepage, dropped mid-page to break up the text */}
        <div className="flex gap-3.5 my-8">
          <div className="flex-1 bg-[#1D1E22] border border-white/10 rounded-[10px] p-4 -rotate-2">
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink/40 mb-2">
              Background
            </div>
            <div className="text-[13px] text-ink leading-relaxed">
              Brussels &rarr; Antwerp &rarr; abroad 25 years
            </div>
          </div>
          <div className="flex-1 bg-[#1D1E22] border border-gold rounded-[10px] p-4 rotate-1">
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-gold mb-2">
              Focus
            </div>
            <div className="text-[13px] text-ink leading-relaxed">
              Writing, Ryoka Group, Echo Room
            </div>
          </div>
          <div className="flex-1 bg-[#1D1E22] border border-white/10 rounded-[10px] p-4 -rotate-1">
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink/40 mb-2">
              Say hello
            </div>
            <div className="text-[13px] text-ink leading-relaxed">
              <a href="mailto:p@ryoka.xyz" className="hover:text-ink/70 transition-colors">
                p@ryoka.xyz
              </a>
            </div>
          </div>
        </div>

        <div className="text-[18px] leading-[1.75] text-ink/85 space-y-[18px]">
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
      </div>
    </main>
  );
}
