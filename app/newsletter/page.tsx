import type { Metadata } from "next";
import Header from "@/components/Header";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter | Pieter Borremans",
  description:
    "Subscribe to get new posts from Pieter Borremans on entrepreneurship, independent business-building, and the unfiltered reality of creating things online, straight to your inbox.",
};

const details = [
  {
    label: "Format",
    description: "Every new post, sent the day it publishes.",
  },
  {
    label: "Frequency",
    description: "No fixed schedule, only when there's something worth sending.",
  },
  {
    label: "Content",
    description: "Journal entries, product updates, and the $168M challenge tracked in the open.",
  },
];

export default function Newsletter() {
  return (
    <main className="min-h-screen">
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
        {/* Nav */}
        <Header />

        <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-gold mb-3">
          Subscribe
        </div>

        <h1 className="font-heading font-semibold text-[28px] sm:text-[36px] leading-[1.3] tracking-[-0.005em] max-w-[580px] mb-4">
          Writing on building things that <span className="text-red">don&apos;t</span> need to scale fast.
        </h1>

        <p className="text-[15px] sm:text-[16px] text-ink/65 leading-relaxed max-w-[520px] mb-10">
          Pieter Borremans on entrepreneurship, independent business-building, and the unfiltered reality of
          creating things online. Straight to your inbox, no fluff.
        </p>

        <NewsletterForm variant="full" />

        <div className="mt-14 flex flex-col divide-y divide-white/10 border-t border-white/10">
          {details.map((item) => (
            <div
              key={item.label}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5"
            >
              <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-ink/40 sm:w-[110px] shrink-0">
                {item.label}
              </div>
              <div className="text-[14.5px] text-ink/75 leading-relaxed">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
