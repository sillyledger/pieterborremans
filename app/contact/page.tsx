import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Contact | Pieter Borremans",
  description: "Get in touch with Pieter Borremans — email, sponsorships, and corrections.",
};

export default function Contact() {
  return (
    <main className="min-h-screen">
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
        <Header active="Contact" />

        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35 mb-3">
          Get in touch
        </div>
        <div className="text-[34px] font-normal leading-[1.4] tracking-[-0.005em] max-w-[480px] mb-12">
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
