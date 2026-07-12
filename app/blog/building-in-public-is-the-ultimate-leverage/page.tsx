import { Reddit_Sans, Reddit_Mono } from "next/font/google";

// NOTE: fonts are loaded locally in this file only, as a preview.
// Nothing here touches the global font setup in app/layout.tsx.

const redditSans = Reddit_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const redditMono = Reddit_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Post() {
  return (
    <main className={`${redditSans.className} min-h-screen bg-[#161618] text-[#F5F3EE]`}>
      <article className="max-w-[680px] mx-auto px-7 pt-16 pb-24">
        <div
          className={`${redditMono.className} text-[11px] font-medium tracking-[0.15em] uppercase text-white/40 mb-4`}
        >
          Jul 12, 2026 &middot; 5 min read
        </div>

        <h1 className="text-[36px] font-bold leading-[1.2] mb-8">
          Building in public is the ultimate leverage
        </h1>

        <div className="space-y-6 text-[17px] leading-[1.75] text-white/85">
          <p>
            For the first few years of building Ryoka, I kept almost everything to myself.
            The products, the failed experiments, the slow months where nothing seemed to
            move. I told myself I was waiting until things were further along, until there
            was something worth showing. Looking back, that instinct cost me more than it
            protected me.
          </p>

          <p>
            What changed my mind wasn't a single moment. It was watching other founders
            share the boring middle parts of building something, the parts before the
            launch tweet and the parts after the initial spike of attention fades. Those
            were the posts I actually remembered. Not the polished announcements, the
            honest updates.
          </p>

          <p>
            Sharing the process does something a finished product can't. It gives people a
            reason to follow along before there's anything to buy or use. By the time
            Kiroka or Sorano actually shipped, a handful of people already understood why
            they existed and what problem they were solving, because they'd seen the
            thinking that led there.
          </p>

          <p>
            There's a version of this advice that gets reduced to "post every day" or
            "share your journey," and I think that framing misses the point. The value
            isn't in the frequency. It's in being specific enough that someone reading it
            learns something real about how you think, not just that you exist and are
            busy. Vague updates don't compound. Specific ones do.
          </p>

          <p>
            I still don't share everything. Some decisions are still made quietly, some
            failures stay private until there's a lesson worth extracting from them. But
            the default has flipped. Now I assume something is worth writing about unless
            I have a reason not to, instead of assuming silence until I'm sure it's
            impressive enough.
          </p>

          <p>
            That's really what this site is. Not a highlight reel, a running record of
            what I'm building and why, written close enough to when it's actually
            happening that it still has some uncertainty in it.
          </p>
        </div>
      </article>
    </main>
  );
}
