import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects | Pieter Borremans",
  description:
    "Everything Pieter Borremans has built, launched, or crashed into along the way — Ryoka Group, Sorano, TWO Docs, Aegos Intel, Kiroka, Harova, and Echo Room.",
};

const projects = [
  { code: "RY-01", name: "Ryoka Group", domain: "ryoka.xyz", gate: "Holding · Investing", status: "On time", tier: "active", since: "2016" },
  { code: "SO-02", name: "Sorano", domain: "sorano.space", gate: "SaaS · Indie", status: "Active", tier: "active", since: "2024" },
  { code: "TD-03", name: "TWO Docs", domain: "two.so", gate: "SaaS · B2B & B2C", status: "Boarding", tier: "building", since: "2024" },
  { code: "AI-04", name: "Aegos Intel", domain: "aegosintel.com", gate: "SaaS · B2B", status: "In progress", tier: "building", since: "2025" },
  { code: "KI-05", name: "Kiroka", domain: "subscription tracker", gate: "Free · Donation", status: "Active", tier: "active", since: "2025" },
  { code: "HA-06", name: "Harova", domain: "harova.xyz", gate: "Web Directory", status: "Boarding", tier: "building", since: "2026" },
  { code: "ER-07", name: "Echo Room", domain: "solo podcast", gate: "Audio", status: "On time", tier: "active", since: "2026" },
  { code: "??-08", name: "— add project —", domain: "replace me", gate: "—", status: "TBA", tier: "idle", since: "—" },
];

const tierDot: Record<string, string> = {
  active: "text-[#4ADE80]",
  building: "text-gold",
  idle: "text-ink/30",
};

export default function Projects() {
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
            <a href="/projects" className="text-ink">Projects</a>
            <a href="/gallery" className="hover:text-ink/80 transition-colors">Gallery</a>
            <a href="/about" className="hover:text-ink/80 transition-colors">About</a>
            <a href="/contact" className="hover:text-ink/80 transition-colors">Contact</a>
          </nav>
        </header>

        <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40 mb-3">
          Projects
        </div>
        <div className="text-[28px] font-normal leading-[1.3] max-w-[520px] mb-3">
          Everything I&apos;ve built, launched, or crashed into along the way.
        </div>
        <div className="text-[15px] text-ink/60 leading-relaxed max-w-[480px] mb-10">
          Some are held for the long run. Others were experiments to test what&apos;s worth building next. Status
          updates as things move.
        </div>

        <div className="rounded-xl border border-hairline overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-hairline">
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink/50">
              Taichung departures &middot; {projects.length} flights
            </span>
            <span className="font-mono text-[11px] uppercase text-[#4ADE80]">
              &#9679; Live
            </span>
          </div>

          <div className="grid grid-cols-[60px_1fr_130px_100px_50px] px-5 py-2.5 font-mono text-[10px] tracking-[0.06em] uppercase text-ink/35 border-b border-hairline">
            <span>Flight</span>
            <span>Destination</span>
            <span className="hidden sm:block">Gate</span>
            <span>Status</span>
            <span className="hidden sm:block">Since</span>
          </div>

          {projects.map((project, i) => (
            <div
              key={project.code}
              className={`grid grid-cols-[60px_1fr_130px_100px_50px] items-center px-5 py-3.5 ${
                i !== projects.length - 1 ? "border-b border-hairline" : ""
              }`}
            >
              <span className="font-mono text-xs text-ink/50">{project.code}</span>
              <span>
                <span className="block text-sm font-semibold text-ink">{project.name}</span>
                <span className="block text-xs text-ink/45">{project.domain}</span>
              </span>
              <span className="hidden sm:block text-xs text-ink/50">{project.gate}</span>
              <span className={`text-xs ${tierDot[project.tier]}`}>&#9679; {project.status}</span>
              <span className="hidden sm:block text-xs text-ink/50">{project.since}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-5 mt-4 font-mono text-[11px] text-ink/50">
          <span><span className="text-[#4ADE80]">&#9679;</span> Active / shipped</span>
          <span><span className="text-gold">&#9679;</span> Building / in progress</span>
          <span><span className="text-ink/30">&#9679;</span> Idle / not started</span>
        </div>
      </div>
    </main>
  );
}
