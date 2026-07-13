import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms | Pieter Borremans",
  description: "Terms for using this site.",
};

export default function Terms() {
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
            <a href="/podcast" className="hover:text-ink/80 transition-colors">Podcast</a>
            <a href="/projects" className="hover:text-ink/80 transition-colors">Projects</a>
            <a href="/gallery" className="hover:text-ink/80 transition-colors">Gallery</a>
            <a href="/about" className="hover:text-ink/80 transition-colors">About</a>
            <a href="/contact" className="hover:text-ink/80 transition-colors">Contact</a>
          </nav>
        </header>

        <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40 mb-3">
          Legal
        </div>
        <h1 className="text-[34px] font-normal leading-[1.4] tracking-[-0.005em] mb-3">
          Terms
        </h1>
        <div className="font-mono text-[12px] text-ink/40 mb-10">Last updated: July 2026</div>

        <div className="text-[16px] leading-[1.8] text-ink/80 space-y-5 max-w-[620px]">
          <p>
            By using this site, you&apos;re agreeing to the basics below. Nothing here is
            unusual, it&apos;s mostly common sense written down.
          </p>
          <p>
            <strong className="text-ink font-semibold">Content.</strong> Everything I write,
            record, or publish here, posts, podcast episodes, photos, is mine unless stated
            otherwise. You&apos;re welcome to quote or link to it with credit and a link back.
            Please don&apos;t republish it wholesale as your own.
          </p>
          <p>
            <strong className="text-ink font-semibold">No professional advice.</strong>{" "}
            Nothing on this site is legal, financial, or professional advice. It&apos;s my own
            thinking and experience, shared for what it&apos;s worth. Make your own decisions
            accordingly.
          </p>
          <p>
            <strong className="text-ink font-semibold">External links.</strong> This site links
            to other sites and services I don&apos;t control. I&apos;m not responsible for their
            content or how they handle your data once you leave.
          </p>
          <p>
            <strong className="text-ink font-semibold">No guarantees.</strong> This site is
            provided as-is. I try to keep things accurate and working, but I can&apos;t promise
            it&apos;ll always be error-free or available.
          </p>
          <p>
            <strong className="text-ink font-semibold">Changes.</strong> These terms might
            change as the site evolves. The date at the top of this page reflects the last
            update.
          </p>
          <p>
            Questions? Email me at{" "}
            <a href="mailto:p@ryoka.xyz" className="underline decoration-ink/30 hover:decoration-ink/60 transition-colors">
              p@ryoka.xyz
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
