import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact | Pieter Borremans",
  description: "Get in touch with Pieter Borremans — email, sponsorships, and corrections.",
};

export default function Contact() {
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
            <a href="/about" className="hover:text-ink/80 transition-colors">About</a>
            <a href="/projects" className="hover:text-ink/80 transition-colors">Projects</a>
            <a href="/contact" className="text-ink">Contact</a>
          </nav>
        </header>

        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35 mb-3">
          Get in touch
        </div>
        <div className="text-[28px] font-normal leading-[1.35] max-w-[480px] mb-12">
          Say hello, pitch something, or point out where I got it wrong.
        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap">

          {/* Email — featured card, the actual action */}
          <a
            href="mailto:p@ryoka.xyz"
            className="w-[190px] min-h-[150px] rounded-xl bg-gold/[0.07] border border-gold/40 p-[22px] flex flex-col justify-between hover:border-gold/60 transition-colors"
          >
            <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-gold/75">Email</div>
            <div className="font-mono text-base text-ink font-semibold">p@ryoka.xyz</div>
          </a>

          {/* Sponsorship */}
          <div className="w-40 min-h-[150px] rounded-xl bg-[#1D1E22] border border-white/10 p-5 rotate-[2deg] flex flex-col justify-center">
            <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink/35 mb-2">Sponsorship</div>
            <div className="text-[13px] text-ink/70 leading-relaxed">
              Sponsored content is possible. Email me to talk details.
            </div>
          </div>

          {/* Corrections */}
          <div className="w-40 min-h-[150px] rounded-xl bg-[#1D1E22] border border-white/10 p-5 rotate-[-2deg] flex flex-col justify-center">
            <div className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink/35 mb-2">Corrections</div>
            <div className="text-[13px] text-ink/70 leading-relaxed">
              Spotted something inaccurate in a post? Let me know.
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
