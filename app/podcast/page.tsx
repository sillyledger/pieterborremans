import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Podcast | Pieter Borremans",
  description:
    "Two solo audio shows from Pieter Borremans: a short daily-ish personal journal, and Echo Room, a deeper unfiltered monologue.",
};

export default function Podcast() {
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
            <a href="/blog" className="hover:text-ink/80 transition-colors">Blog</a>
            <a href="/podcast" className="text-ink">Podcast</a>
            <a href="/about" className="hover:text-ink/80 transition-colors">About</a>
            <a href="/projects" className="hover:text-ink/80 transition-colors">Projects</a>
            <a href="/contact" className="hover:text-ink/80 transition-colors">Contact</a>
          </nav>
        </header>

        <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40 mb-3">
          Podcast
        </div>
        <div className="text-[28px] font-normal leading-[1.35] max-w-[520px] mb-3">
          Two shows. One mic. No script.
        </div>
        <div className="text-[15px] text-ink/60 leading-relaxed max-w-[480px] mb-12">
          Both are solo monologues, no edits, no guests. One is a short daily habit. The other goes a lot deeper.
        </div>

        <div className="flex flex-col gap-4">

          {/* Personal Journal */}
          <div className="rounded-xl bg-gold/[0.07] border border-gold/40 p-6 sm:p-7">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-gold/75">
                Personal Journal
              </div>
              <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink/35">
                Daily-ish
              </div>
            </div>
            <div className="text-xl font-semibold text-ink mb-2.5">
              Short entries, no editing
            </div>
            <div className="text-[13.5px] text-ink/70 leading-relaxed max-w-[460px] mb-6">
              Quick daily-ish check-ins on what I&apos;m working on, what&apos;s frustrating me, and small wins in
              self-improvement. Five to ten minutes, unscripted.
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://open.spotify.com/show/765k4LuyZrS2sYEkXHOZ47"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.04em] border border-white/15 rounded-md px-3.5 py-2 text-ink/70 hover:text-ink hover:border-white/30 transition-colors"
              >
                Spotify
              </a>
              <a
                href="#"
                className="font-mono text-xs uppercase tracking-[0.04em] border border-white/15 rounded-md px-3.5 py-2 text-ink/70 hover:text-ink hover:border-white/30 transition-colors"
              >
                Apple
              </a>
              <a
                href="#"
                className="font-mono text-xs uppercase tracking-[0.04em] border border-white/15 rounded-md px-3.5 py-2 text-ink/70 hover:text-ink hover:border-white/30 transition-colors"
              >
                Amazon
              </a>
              <a
                href="#"
                className="font-mono text-xs uppercase tracking-[0.04em] border border-white/15 rounded-md px-3.5 py-2 text-ink/70 hover:text-ink hover:border-white/30 transition-colors"
              >
                YouTube
              </a>
              <a
                href="#"
                className="font-mono text-xs uppercase tracking-[0.04em] border border-white/15 rounded-md px-3.5 py-2 text-ink/70 hover:text-ink hover:border-white/30 transition-colors"
              >
                Substack
              </a>
            </div>
          </div>

          {/* Echo Room */}
          <div className="rounded-xl bg-red/[0.07] border border-red/40 p-6 sm:p-7">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-red">
                Echo Room
              </div>
              <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink/35">
                Launching Sept 2026
              </div>
            </div>
            <div className="text-xl font-semibold text-ink mb-2.5">
              One voice. No script. No exit.
            </div>
            <div className="text-[13.5px] text-ink/70 leading-relaxed max-w-[460px] mb-6">
              The deeper, unfiltered monologue, covering entrepreneurship, technology, investing, creativity, and
              whatever I can&apos;t stop thinking about. Longer, heavier, its own home.
            </div>
            <a
              href="https://www.echoroom.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.04em] bg-red text-ink rounded-md px-4 py-2.5 hover:opacity-90 transition-opacity"
            >
              Visit echoroom.xyz ↗
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
