import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

const DESCRIPTION =
  "Pieter Borremans' personal audio journal: short, unscripted solo check-ins on building, frustrations, and small wins.";

export const metadata: Metadata = {
  title: "Podcast | Pieter Borremans",
  description: DESCRIPTION,
};

const PERSON_ID = "https://ryokagroup.com/founder#pieter";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.pieterborremans.com/podcast#webpage",
      "url": "https://www.pieterborremans.com/podcast",
      "name": "Podcast | Pieter Borremans",
      "description": DESCRIPTION,
      "about": { "@id": "https://www.pieterborremans.com/podcast#journal" },
      "author": { "@id": PERSON_ID },
    },
    {
      "@type": "PodcastSeries",
      "@id": "https://www.pieterborremans.com/podcast#journal",
      "name": "Pieter Borremans",
      "description":
        "A solo audio journal: short, unscripted check-ins on what I'm working on, what's frustrating me, and small wins.",
      "url": "https://www.pieterborremans.com/podcast",
      "inLanguage": "en",
      "author": { "@id": PERSON_ID },
      "sameAs": [
        "https://open.spotify.com/show/765k4LuyZrS2sYEkXHOZ47",
        "https://podcasts.apple.com/tw/podcast/pieter-borremans/id1893263919?l=en-GB",
        "https://music.amazon.com/podcasts/051af7fe-5f1a-4168-a97f-baa269a30408/pieter-borremans",
        "https://www.youtube.com/@pieterborremans",
      ],
    },
  ],
};

export default function Podcast() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
        {/* Nav */}
        <Header active="Podcast" />

        <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40 mb-3">
          Podcast
        </div>
        <h1 className="font-heading text-[26px] sm:text-[34px] font-normal leading-[1.4] tracking-[-0.005em] max-w-[520px] mb-3">
          One mic. No script.
        </h1>
        <div className="text-[15px] text-ink/60 leading-relaxed max-w-[480px] mb-12">
          A solo journal, no edits, no guests. Short check-ins on what I&apos;m working on, what&apos;s frustrating me, and small wins.
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
            <div className="font-heading text-xl font-semibold text-ink mb-2.5">
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
                href="https://podcasts.apple.com/tw/podcast/pieter-borremans/id1893263919?l=en-GB"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.04em] border border-white/15 rounded-md px-3.5 py-2 text-ink/70 hover:text-ink hover:border-white/30 transition-colors"
              >
                Apple
              </a>
              <a
                href="https://music.amazon.com/podcasts/051af7fe-5f1a-4168-a97f-baa269a30408/pieter-borremans"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.04em] border border-white/15 rounded-md px-3.5 py-2 text-ink/70 hover:text-ink hover:border-white/30 transition-colors"
              >
                Amazon
              </a>
              <a
                href="https://www.youtube.com/@pieterborremans"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.04em] border border-white/15 rounded-md px-3.5 py-2 text-ink/70 hover:text-ink hover:border-white/30 transition-colors"
              >
                YouTube
              </a>
              <a
                href="https://www.tiktok.com/@borremanspieter"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.04em] border border-white/15 rounded-md px-3.5 py-2 text-ink/70 hover:text-ink hover:border-white/30 transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>


        </div>

        <p className="mt-[72px] pt-[22px] border-t border-white/10 text-[15px] text-ink/60">
          Echo Room is now an English-learning show, so it lives on the{" "}
          <Link
            href="/creator"
            className="text-ink underline decoration-ink/30 underline-offset-[3px] hover:decoration-ink/60 transition-colors"
          >
            creator page
          </Link>{" "}
          with the other three.
        </p>
      </div>
    </main>
  );
}
