import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { getPosts } from "@/lib/posts";

// Static file at /168 takes priority over the generic app/[slug]/page.tsx
// category route for this slug — same pattern as app/updates/page.tsx.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The $168 million challenge | Pieter Borremans",
  description: "Tracking progress toward a $168,000,000 lifetime target — income, expenses, and milestones along the way.",
};

// --- Static config — update these by hand as the numbers move. Not wired
// to Supabase yet; that's a separate future task. ---

const CURRENT_TOTAL = 0;
const LIFETIME_TARGET = 168_000_000;
const LAST_UPDATED = "Aug 10, 2026";
const CHALLENGE_START = new Date(2026, 7, 10); // Aug 10, 2026

interface Milestone {
  value: number;
  label: string;
  sublabel?: string;
  legendary?: boolean;
}

const MILESTONES: Milestone[] = [
  { value: 0, label: "$0" },
  { value: 5_000, label: "$5K" },
  { value: 10_000, label: "$10K" },
  { value: 50_000, label: "$50K" },
  { value: 100_000, label: "$100K", sublabel: "real money" },
  { value: 500_000, label: "$500K" },
  { value: 1_000_000, label: "$1M", sublabel: "hardest part's over" },
  { value: 10_000_000, label: "$10M" },
  { value: 50_000_000, label: "$50M", sublabel: "unicorn territory" },
  { value: 168_000_000, label: "$168M", sublabel: "legendary", legendary: true },
];

interface LineItem {
  label: string;
  amount: number;
}

const income: LineItem[] = [
  { label: "Apps & SaaS", amount: 0 },
  { label: "Futures trading", amount: 0 },
  { label: "Poker", amount: 0 },
  { label: "Affiliate", amount: 0 },
  { label: "YouTube", amount: 0 },
  { label: "Services", amount: 0 },
  { label: "Ko-fi / BMC", amount: 0 },
];

const expenses: LineItem[] = [
  { label: "Subscriptions", amount: 0 },
  { label: "Acquisitions", amount: 0 },
];

// --- Helpers ---

function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Ticks are spaced evenly by index (not by dollar value, which would crush
// everything below $1M into the first few pixels). The dot's position is
// interpolated between the two bracketing milestones' index positions.
function positionForAmount(amount: number, milestones: Milestone[]): number {
  const last = milestones.length - 1;
  if (amount <= milestones[0].value) return 0;
  if (amount >= milestones[last].value) return 100;

  const i = milestones.findIndex((m, idx) => idx < last && amount < milestones[idx + 1].value);
  const lo = milestones[i];
  const hi = milestones[i + 1];
  const frac = (amount - lo.value) / (hi.value - lo.value);
  return ((i + frac) / last) * 100;
}

function getDayNumber(start: Date): number {
  const startLocal = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const now = new Date();
  const nowLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round((nowLocal.getTime() - startLocal.getTime()) / 86_400_000);
  return diffDays + 1;
}

export default async function ChallengePage() {
  const posts = await getPosts();
  const relatedPosts = posts.filter((post) => post.category === "168");

  const incomeTotal = income.reduce((sum, item) => sum + item.amount, 0);
  const expensesTotal = expenses.reduce((sum, item) => sum + item.amount, 0);
  const net = incomeTotal - expensesTotal;

  const dotPosition = positionForAmount(CURRENT_TOTAL, MILESTONES);
  const dayNumber = getDayNumber(CHALLENGE_START);

  return (
    <main className="min-h-screen">
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
        {/* Nav */}
        <Header active="Blog" />

        <Link
          href="/blog"
          className="font-mono text-[11px] tracking-[0.06em] text-ink/40 hover:text-ink/70 transition-colors inline-flex items-center gap-1.5 mb-6"
        >
          &larr; Back to blog
        </Link>

        {/* Eyebrow */}
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35 mb-2">
          The $168 million challenge
        </div>

        {/* Big total */}
        <h1 className="font-mono text-[48px] sm:text-[64px] font-bold leading-none tracking-[-0.01em] mb-2">
          {formatUSD(CURRENT_TOTAL)}
        </h1>
        <div className="font-mono text-[13px] text-muted mb-12">
          of {formatUSD(LIFETIME_TARGET)} lifetime target &middot; updated {LAST_UPDATED}
        </div>

        {/* Milestone ruler */}
        <div className="relative h-24 mb-14">
          <div className="absolute top-0 left-0 right-0 h-px bg-hairline" />

          <div
            className="absolute top-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_8px_rgba(232,185,35,0.55)]"
            style={{ left: `${dotPosition}%` }}
          />

          {MILESTONES.map((m) => (
            <div
              key={m.value}
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${positionForAmount(m.value, MILESTONES)}%` }}
            >
              <div className="w-px h-2 bg-ink/20" />
              <div className="font-mono text-[10px] text-muted mt-2 whitespace-nowrap">{m.label}</div>
              {m.sublabel && (
                <div
                  className={
                    m.legendary
                      ? "font-mono text-[11px] font-bold text-red mt-1 whitespace-nowrap"
                      : "font-mono text-[9px] text-muted mt-1 whitespace-nowrap"
                  }
                >
                  {m.sublabel}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35 mb-4">
          Breakdown
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mb-12">
          <div>
            <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-hairline">
              <span className="text-[15px] font-semibold">Income</span>
              <span className="font-mono text-[13px] text-gold">{formatUSD(incomeTotal)}</span>
            </div>
            <ul>
              {income.map((item) => (
                <li key={item.label} className="flex items-baseline gap-2 py-1.5">
                  <span className="text-[13px] text-ink/70 whitespace-nowrap">{item.label}</span>
                  <span className="flex-1 border-b border-dotted border-ink/20 translate-y-[-3px]" />
                  <span className="font-mono text-[13px] text-ink/70 whitespace-nowrap">
                    {formatUSD(item.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-hairline">
              <span className="text-[15px] font-semibold">Expenses</span>
              <span className="font-mono text-[13px] text-red">{formatUSD(expensesTotal)}</span>
            </div>
            <ul>
              {expenses.map((item) => (
                <li key={item.label} className="flex items-baseline gap-2 py-1.5">
                  <span className="text-[13px] text-ink/70 whitespace-nowrap">{item.label}</span>
                  <span className="flex-1 border-b border-dotted border-ink/20 translate-y-[-3px]" />
                  <span className="font-mono text-[13px] text-ink/70 whitespace-nowrap">
                    {formatUSD(item.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer strip */}
        <div className="flex items-center justify-between border-t border-hairline pt-5 mb-14 font-mono text-[12px] text-ink/45">
          <span>Day {dayNumber} of the challenge</span>
          <span>Net {formatUSD(net)}</span>
        </div>

        {/* Related posts */}
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35 mb-4">
          Related posts
        </div>
        <ul className="border-t border-hairline">
          {relatedPosts.length === 0 && (
            <li className="py-6 text-[13px] text-ink/40">No posts yet, check back soon.</li>
          )}
          {relatedPosts.map((post, i) => (
            <li
              key={post.slug}
              className={`py-[18px] ${i !== relatedPosts.length - 1 ? "border-b border-hairline" : ""}`}
            >
              <Link href={`/blog/${post.slug}`} className="flex justify-between items-start gap-6 group">
                <div className="max-w-[520px]">
                  <div className="font-mono text-[11px] text-ink/40 mb-1.5">{post.date}</div>
                  <div className="text-lg font-semibold mb-1.5 group-hover:text-ink/80 transition-colors">
                    {post.title}
                  </div>
                  <p className="text-[13px] text-ink/55 leading-relaxed">{post.excerpt}</p>
                </div>
                <span className="font-mono text-[11px] text-ink/40 whitespace-nowrap mt-0.5">
                  {post.readTime}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
