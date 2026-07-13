import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | Pieter Borremans",
  description: "How affiliate links work on this site.",
};

export default function AffiliateDisclosure() {
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
          Affiliate Disclosure
        </h1>
        <div className="font-mono text-[12px] text-ink/40 mb-10">Last updated: July 2026</div>

        <div className="text-[16px] leading-[1.8] text-ink/80 space-y-5 max-w-[620px]">
          <p>
            Some links on this site are affiliate links. That means if you click one and go on
            to buy something, I may earn a small commission, at no extra cost to you. It doesn&apos;t
            change the price you pay.
          </p>
          <p>
            I only link to products, tools, and services I&apos;ve actually used or genuinely
            believe in. Affiliate relationships never decide what I write about or how I write
            about it, if something isn&apos;t good, I say so.
          </p>
          <p>
            This applies across the site, including blog posts, project pages, and any
            resources I recommend. Where it&apos;s not obvious from context, I&apos;ll try to
            flag that a link is an affiliate link.
          </p>
          <p>
            Any income from affiliate links helps cover the cost of running this site and the
            time spent writing it, nothing more calculated than that.
          </p>
          <p>
            Questions about a specific link or partnership? Email me at{" "}
            <a href="mailto:p@ryoka.xyz" className="underline decoration-ink/30 hover:decoration-ink/60 transition-colors">
              p@ryoka.xyz
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
