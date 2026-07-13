import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy | Pieter Borremans",
  description: "How this site handles your data.",
};

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <div className="font-mono text-[12px] text-ink/40 mb-10">Last updated: July 2026</div>

        <div className="text-[16px] leading-[1.8] text-ink/80 space-y-5 max-w-[620px]">
          <p>
            This is a personal site. I don&apos;t sell your data, and I try to collect as
            little of it as possible.
          </p>
          <p>
            <strong className="text-ink font-semibold">What&apos;s collected.</strong> Basic
            analytics, like which pages get visited and roughly where from, so I can understand
            what people find useful. If you email me or fill out a contact form, I keep that
            conversation to reply to you, nothing more.
          </p>
          <p>
            <strong className="text-ink font-semibold">Cookies.</strong> This site may use
            cookies for basic functionality and analytics. You can block or clear cookies in
            your browser at any time without breaking the site.
          </p>
          <p>
            <strong className="text-ink font-semibold">Third parties.</strong> This site is
            hosted on Vercel and may use Google Analytics or Search Console to understand
            traffic. Those services have their own privacy policies covering how they handle
            data.
          </p>
          <p>
            <strong className="text-ink font-semibold">Your data.</strong> I don&apos;t sell or
            trade personal information. If you&apos;d like to know what I have on you, or want
            it deleted, just ask.
          </p>
          <p>
            Questions about any of this? Email me at{" "}
            <a href="mailto:p@ryoka.xyz" className="underline decoration-ink/30 hover:decoration-ink/60 transition-colors">
              p@ryoka.xyz
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
