import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Serif_TC } from "next/font/google";
import Header from "@/components/Header";

const DESCRIPTION =
  "Pieter Borremans voices three English-learning audio shows, Study Brew, Story Brew, and Story Valley. Every episode is read by him, never by an AI voice.";

export const metadata: Metadata = {
  title: "Creator | Pieter Borremans",
  description: DESCRIPTION,
};

// Only used for the three characters in the Chinese name card.
const notoSerifTC = Noto_Serif_TC({
  weight: "500",
  preload: false,
  variable: "--font-cjk",
});

// --- Data: edit content here, not in the JSX. ---

// Order matches the level scale and the show list.
const SHOWS = [
  {
    key: "story-valley",
    name: "Story Valley",
    level: "A1 to A2",
    meta: "For parents and kids",
    color: "#E8967C",
    description:
      "Simple English stories to share with your child. I'm recording toward 365 of them, one for every night of the year.",
    spotify: "",
    youtube: "",
    cta: { label: "Discover", href: "https://www.studybrew.co/stories/story-valley" },
  },
  {
    key: "study-brew",
    name: "Study Brew",
    level: "B1 to B2",
    meta: "About 5 minutes",
    color: "#86A9DE",
    description:
      "Short everyday stories about daily life, travel, and work. Kept short on purpose, so you can listen closely the whole way through.",
    spotify: "",
    youtube: "",
    cta: { label: "Visit", href: "https://www.studybrew.co/stories" },
  },
  {
    key: "story-brew",
    name: "Story Brew",
    level: "B1 to B2",
    meta: "Bedtime",
    color: "#72C9A3",
    description: "Bedtime stories in slow, calm English to fall asleep to.",
    spotify: "",
    youtube: "",
    cta: { label: "Listen", href: "https://www.studybrew.co/stories/bedtime" },
  },
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const NAME = [
  { pinyin: "jiāng", char: "江", meaning: "river" },
  { pinyin: "míng", char: "銘", meaning: "to inscribe" },
  { pinyin: "tè", char: "特", meaning: "distinguished" },
];

const WAVEFORM = [18, 30, 22, 44, 58, 36, 26, 48, 62, 40, 24, 34, 52, 28, 16];

// "B1 to B2" -> grid columns 3 / 5 on the six-level scale.
function levelColumns(level: string) {
  const [from, to] = level.split(" to ");
  return `${LEVELS.indexOf(from) + 1} / ${LEVELS.indexOf(to) + 2}`;
}

// References the sitewide Person entity by @id rather than declaring a new
// one, same pattern as app/projects/page.tsx.
const PERSON_ID = "https://ryokagroup.com/founder#pieter";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://pieterborremans.com/creator#webpage",
      "url": "https://pieterborremans.com/creator",
      "name": "Creator | Pieter Borremans",
      "description": DESCRIPTION,
      "about": { "@id": PERSON_ID },
      "author": { "@id": PERSON_ID },
    },
    ...SHOWS.map((show) => ({
      "@type": "PodcastSeries",
      "@id": `https://pieterborremans.com/creator#${show.key}`,
      "name": show.name,
      "description": show.description,
      "url": show.cta.href,
      "inLanguage": "en",
      "author": { "@id": PERSON_ID },
    })),
  ],
};

// --- Shared classes ---

const body = "text-[18px] leading-[1.75] text-ink/85";
const h2 = "font-heading font-semibold text-[24px] leading-[1.3] mb-3.5";
const goldLink =
  "text-gold underline decoration-dotted decoration-gold/50 underline-offset-4 hover:decoration-gold transition-colors";
const pill =
  "font-mono text-xs uppercase tracking-[0.04em] border border-white/15 rounded-md px-3.5 py-2 text-ink/70 hover:text-ink hover:border-white/30 transition-colors";

// --- Page ---

export default function Creator() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
        <Header active="Creator" />

        {/* Hero */}
        <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40">
          creator
        </div>
        <h1 className="font-heading text-[26px] sm:text-[34px] font-normal leading-[1.4] tracking-[-0.005em] mt-4 max-w-[560px]">
          English isn&apos;t my first language either.
        </h1>

        <div className={`${body} mt-7 space-y-[18px]`}>
          <p>
            I&apos;m Pieter Borremans, and every story on Study Brew, Story Brew, and Story Valley
            is read in my voice. I grew up in Brussels and have lived abroad for 25 years. English
            became the language I work and write in, but nobody handed it to me. I learned it.
          </p>
          <p>
            Over those years I&apos;ve met a lot of people who struggle with it. Capable, curious
            people for whom English felt like a wall instead of the shared language it&apos;s
            supposed to be. I care about education, and I believe being bilingual is one of the
            most useful things a person can give themselves. These shows are my small part in
            that.
          </p>
        </div>

        {/* Shows */}
        <section className="mt-16">
          <h2 className={h2}>Three shows, one voice</h2>
          <p className={body}>
            Each show is pitched at a level, so you can start where you are and move up.
          </p>

          <div aria-hidden="true" className="mt-7">
            <div className="grid grid-cols-6 gap-1 pb-2 border-b border-white/10">
              {LEVELS.map((level) => (
                <div
                  key={level}
                  className={`font-mono text-[12px] ${level.startsWith("C") ? "text-ink/20" : "text-ink/45"}`}
                >
                  {level}
                </div>
              ))}
            </div>
            {SHOWS.map((show) => (
              <div key={show.key} className="grid grid-cols-6 gap-1 mt-2.5">
                <div
                  className="rounded-md h-[30px] px-2.5 flex items-center text-[12.5px] font-medium text-[#161618] whitespace-nowrap overflow-hidden"
                  style={{ backgroundColor: show.color, gridColumn: levelColumns(show.level) }}
                >
                  {show.name}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 border-t border-white/10">
            {SHOWS.map((show) => (
              <article
                key={show.key}
                className="grid sm:grid-cols-[150px_1fr] gap-x-7 gap-y-2 py-[26px] border-b border-white/10"
              >
                <div>
                  <h3 className="flex items-center gap-2 font-heading font-semibold text-[19px]">
                    <span
                      className="w-[9px] h-[9px] rounded-full shrink-0"
                      style={{ backgroundColor: show.color }}
                    />
                    {show.name}
                  </h3>
                  <div className="font-mono text-[12px] text-ink/45 leading-relaxed mt-1.5">
                    {show.level}
                    <br />
                    {show.meta}
                  </div>
                </div>
                <div>
                  <p className="text-[16px] leading-[1.7] text-ink/80 mb-3.5">{show.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {show.spotify && (
                      <a href={show.spotify} target="_blank" rel="noopener noreferrer" className={pill}>
                        Spotify
                      </a>
                    )}
                    {show.youtube && (
                      <a href={show.youtube} target="_blank" rel="noopener noreferrer" className={pill}>
                        YouTube
                      </a>
                    )}
                    <a href={show.cta.href} target="_blank" rel="noopener noreferrer" className={pill}>
                      {show.cta.label}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Only my voice */}
        <section className="mt-[72px] grid sm:grid-cols-[auto_1fr] gap-[22px] items-start">
          <div aria-hidden="true" className="flex items-center gap-[3px] h-16">
            {WAVEFORM.map((height, i) => (
              <span
                key={i}
                className="w-[3px] rounded-sm bg-gold opacity-85"
                style={{ height }}
              />
            ))}
          </div>
          <div>
            <h2 className={h2}>Only my voice</h2>
            <p className={body}>
              Every episode on all three channels is read by me. No AI voice, no hired narrator.
              You&apos;ll hear a non-native accent, and that&apos;s deliberate: it&apos;s closer to
              the English you&apos;ll meet in real life than a studio voice will ever be.
            </p>
          </div>
        </section>

        {/* Chinese name note card */}
        <div
          className={`${notoSerifTC.variable} mt-14 rounded-xl bg-gold/[0.06] border border-gold/40 px-[26px] py-[22px] -rotate-[0.8deg] grid sm:grid-cols-[auto_1fr] gap-3.5 sm:gap-7 items-center`}
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0 37px, rgba(232,185,35,0.08) 37px 38px)",
            backgroundPosition: "0 22px",
          }}
        >
          <div lang="zh-Hant" className="flex gap-[22px]">
            {NAME.map((c) => (
              <div key={c.char} className="flex flex-col items-center text-center">
                <span lang="zh-Latn-pinyin" className="font-mono text-[12px] text-gold">
                  {c.pinyin}
                </span>
                <span className="font-[family-name:var(--font-cjk)] font-medium text-[38px] sm:text-[44px] leading-[1.15] text-ink my-0.5">
                  {c.char}
                </span>
                <span lang="en" className="text-[11.5px] text-ink/60 leading-[1.4]">
                  {c.meaning}
                </span>
              </div>
            ))}
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-gold/80 mb-2">
              My Chinese name
            </div>
            <p className="text-[15px] leading-[1.7] text-ink/75">
              In Taiwan the roles are reversed and I&apos;m the learner, working through Chinese one
              character at a time. I know what it&apos;s like to catch half a sentence and lose the
              rest. I write about that side on{" "}
              <Link href="https://pieter.tw" className={goldLink}>
                pieter.tw
              </Link>
              .
            </p>
          </div>
        </div>

        {/* The app */}
        <section className="mt-[72px]">
          <h2 className={h2}>Why I&apos;m also building an app</h2>
          <p className={body}>
            Listening is half of learning a language. The other half is keeping hold of what you
            heard. That&apos;s why I&apos;m building Study Brew into a note-taking app for language
            learners, a place for the words and sentences you want to remember. It&apos;s still in
            development, and you can follow it on{" "}
            <Link href="https://www.studybrew.co" className={goldLink}>
              studybrew.co
            </Link>
            .
          </p>
          {/* Reserved: future build-progress CTA for the Study Brew app */}
        </section>

        {/* Cross-link */}
        <p className="mt-[72px] pt-[22px] border-t border-white/10 text-[15px] text-ink/60">
          Looking for Echo Room or my personal journal? Those are on the{" "}
          <Link
            href="/podcast"
            className="text-ink underline decoration-ink/30 underline-offset-[3px] hover:decoration-ink/60 transition-colors"
          >
            podcast page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
