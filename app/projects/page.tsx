import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/Header";

const DESCRIPTION =
  "Everything Pieter Borremans has built, launched, or crashed into along the way, from Ryoka Group and its operating arm OnPoint VC to Sorano, TWO Docs, Aegos Intel, Kiroka, Harova, Echo Room, and Liyo.";

export const metadata: Metadata = {
  title: "Projects | Pieter Borremans",
  description: DESCRIPTION,
};

// References the sitewide Person entity by @id rather than declaring a new
// one, same pattern as app/idea-bench/page.tsx.
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://pieterborremans.com/projects#webpage",
  "url": "https://pieterborremans.com/projects",
  "name": "Projects | Pieter Borremans",
  "author": { "@id": "https://ryokagroup.com/founder#pieter" },
  "description": DESCRIPTION,
};

// --- Data: edit content here, not in the JSX. ---

type Stage = "idea" | "build" | "boarding" | "live";
type Tier = "live" | "build" | "crashed";

interface Project {
  name: string;
  domain: string; // shown under the name
  url?: string; // card link, external
  blurb: string;
  status: string; // pill text, e.g. "Active", "Boarding", "In progress", "On time"
  tier: Tier;
  stage: Stage;
  type: string;
  since: string;
  earned: number;
}

interface CrashedProject extends Project {
  ran: string; // e.g. "2024 to 2025"
  cause: string;
  postUrl?: string; // link to post-mortem blog post
}

const flagship = {
  name: "Ryoka Group",
  entityUrl: "https://ryokagroup.com",
  entityDomain: "ryokagroup.com",
  armName: "OnPoint VC",
  armUrl: "https://onpointvc.com",
  armDomain: "onpointvc.com",
  since: "2025",
  status: "On time",
  blurb:
    "The holding company every other project on this page sits under. Day to day it operates through OnPoint VC: investing, acquisitions, and whatever gets built next.",
  earned: 0,
};

const projects: Project[] = [
  { name: "Sorano", domain: "sorano.space", url: "https://sorano.space", blurb: "Public roadmaps for indie founders who build in the open.", status: "Active", tier: "live", stage: "live", type: "SaaS, indie", since: "2026", earned: 0 },
  { name: "TWO Docs", domain: "two.so", url: "https://two.so", blurb: "Docs for people and small teams.", status: "Boarding", tier: "build", stage: "boarding", type: "SaaS, B2B & B2C", since: "2026", earned: 0 },
  { name: "Aegos Intel", domain: "aegosintel.com", url: "https://aegosintel.com", blurb: "B2B intelligence tool.", status: "In progress", tier: "build", stage: "build", type: "SaaS, B2B", since: "2026", earned: 0 },
  { name: "Kiroka", domain: "kiroka.xyz", url: "https://kiroka.xyz", blurb: "A free subscription tracker, kept alive by donations.", status: "Active", tier: "live", stage: "live", type: "Free, donation", since: "2025", earned: 0 },
  { name: "Harova", domain: "harova.xyz", url: "https://harova.xyz", blurb: "A curated directory of tools, a few new ones added every day.", status: "Boarding", tier: "build", stage: "boarding", type: "Web directory", since: "2026", earned: 0 },
  { name: "Echo Room", domain: "echoroom.xyz", url: "https://echoroom.xyz", blurb: "A solo monologue podcast, recorded without a script.", status: "On time", tier: "live", stage: "live", type: "Audio", since: "2026", earned: 0 },
  { name: "Liyo", domain: "liyo.dev", url: "https://liyo.dev", blurb: "A shelf for developers: one shareable page for your stack, tools, books, and desk.", status: "Boarding", tier: "build", stage: "boarding", type: "SaaS, social", since: "2026", earned: 0 },
];

const crashed: CrashedProject[] = []; // empty for now, populated later

const LAST_UPDATED = "Sep 23, 2026";

// --- Helpers ---

function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

// "build" sits short of its tick on purpose: the project is mid-build, not
// done building.
const STAGE_POSITION: Record<Stage, number> = {
  idea: 0,
  build: 40,
  boarding: 66.6,
  live: 100,
};

const TICKS = [
  { pos: 0, label: "Idea" },
  { pos: 33.3, label: "Build" },
  { pos: 66.6, label: "Boarding" },
  { pos: 100, label: "Live" },
];

const TIER_STYLE: Record<Tier, { fill: string; dot: string; pillText: string; pillBg: string }> = {
  live: {
    fill: "rgba(74,222,128,0.5)",
    dot: "bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.5)]",
    pillText: "text-[#4ADE80]",
    pillBg: "rgba(74,222,128,0.15)",
  },
  build: {
    fill: "rgba(232,185,35,0.5)",
    dot: "bg-gold shadow-[0_0_8px_rgba(232,185,35,0.55)]",
    pillText: "text-gold",
    pillBg: "rgba(232,185,35,0.15)",
  },
  crashed: {
    fill: "rgba(194,59,59,0.45)",
    dot: "bg-red shadow-[0_0_8px_rgba(194,59,59,0.5)]",
    pillText: "text-red",
    pillBg: "rgba(194,59,59,0.15)",
  },
};

// --- Components ---

function StageTrack({ stage, tier }: { stage: Stage; tier: Tier }) {
  const position = tier === "crashed" ? 100 : STAGE_POSITION[stage];
  const style = TIER_STYLE[tier];

  return (
    <div className="relative h-[34px] mx-1.5 mb-1.5">
      <div className="absolute top-[5px] left-0 right-0 h-px bg-hairline" />
      <div
        className="absolute top-[5px] left-0 h-px"
        style={{ width: `${position}%`, backgroundColor: style.fill }}
      />
      {TICKS.map((tick) => (
        <div
          key={tick.label}
          className="absolute top-[5px] -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${tick.pos}%` }}
        >
          <div className="w-px h-1.5 bg-ink/20" />
          <div className="font-mono text-[9px] text-ink/35 mt-1 whitespace-nowrap leading-tight">
            {tick.label}
          </div>
        </div>
      ))}
      {tier === "crashed" && (
        <span
          className="absolute -top-[13px] -translate-x-1/2 font-mono text-xs font-bold text-red leading-none"
          style={{ left: `${position}%` }}
        >
          ×
        </span>
      )}
      <div
        className={`absolute top-[5px] w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 ${style.dot}`}
        style={{ left: `${position}%` }}
      />
    </div>
  );
}

interface Row {
  label: string;
  value: ReactNode;
  valueClassName?: string;
}

function LeaderRows({ rows }: { rows: Row[] }) {
  return (
    <ul className="border-t border-hairline pt-2">
      {rows.map((row) => (
        <li key={row.label} className="flex items-baseline gap-2 py-[3px]">
          <span className="text-xs text-ink/55 whitespace-nowrap">{row.label}</span>
          <span className="flex-1 border-b border-dotted border-ink/20 translate-y-[-3px]" />
          <span className={`font-mono text-xs whitespace-nowrap ${row.valueClassName ?? "text-ink/75"}`}>
            {row.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

function StatusPill({ tier, children }: { tier: Tier; children: ReactNode }) {
  const style = TIER_STYLE[tier];
  return (
    <span
      className={`font-mono text-[9px] uppercase px-2 py-[3px] rounded-full whitespace-nowrap ${style.pillText}`}
      style={{ backgroundColor: style.pillBg }}
    >
      {children}
    </span>
  );
}

function CardHeader({ project, pill }: { project: Project; pill: ReactNode }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <div>
        <div className="text-base font-semibold leading-snug">{project.name}</div>
        <div className="font-mono text-[11px] text-ink/40 mt-0.5">{project.domain}</div>
      </div>
      {pill}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const className =
    "block bg-[#1D1E22] border border-hairline rounded-xl p-[18px] hover:border-white/15 transition-colors";
  const content = (
    <>
      <CardHeader project={project} pill={<StatusPill tier={project.tier}>{project.status}</StatusPill>} />
      <p className="text-xs text-ink/50 leading-relaxed mt-2 mb-4">{project.blurb}</p>
      <StageTrack stage={project.stage} tier={project.tier} />
      <LeaderRows
        rows={[
          { label: "Type", value: project.type },
          { label: "Since", value: project.since },
          { label: "Earned", value: formatUSD(project.earned) },
        ]}
      />
    </>
  );

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return <div className={className}>{content}</div>;
}

function CrashedCard({ project }: { project: CrashedProject }) {
  const rows: Row[] = [
    { label: "Ran", value: project.ran },
    { label: "Cause of death", value: project.cause, valueClassName: "text-red" },
  ];
  if (project.postUrl) {
    rows.push({
      label: "Post-mortem",
      value: (
        <Link href={project.postUrl} className="hover:text-gold/80 transition-colors">
          Read the post
        </Link>
      ),
      valueClassName: "text-gold",
    });
  }

  return (
    <div className="bg-red/[0.05] border border-red/35 rounded-xl p-[18px] rotate-[-0.6deg]">
      <CardHeader
        project={project}
        pill={<StatusPill tier="crashed">Crashed</StatusPill>}
      />
      <p className="text-xs text-ink/50 leading-relaxed mt-2 mb-4">{project.blurb}</p>
      <StageTrack stage={project.stage} tier="crashed" />
      <LeaderRows rows={rows} />
    </div>
  );
}

function SectionLabel({ left, right }: { left: string; right?: string }) {
  return (
    <div className="flex justify-between font-mono text-[11px] tracking-[0.18em] uppercase text-ink/35 mb-4">
      <span>{left}</span>
      {right && <span className="tracking-[0.06em]">{right}</span>}
    </div>
  );
}

const placeholderClassName =
  "border border-dashed border-hairline rounded-xl bg-transparent min-h-[220px] flex flex-col items-center justify-center text-center";

// --- Page ---

export default function Projects() {
  const liveCount = projects.filter((p) => p.tier === "live").length + 1; // +1 for the flagship
  const buildCount = projects.filter((p) => p.tier === "build").length;
  const boardingCount = projects.filter((p) => p.stage === "boarding").length;
  const inProgressCount = projects.filter((p) => p.stage === "build").length;
  const crashedCount = crashed.length;

  const statLabel = "font-mono text-[9px] sm:text-[11px] tracking-[0.05em] uppercase";
  const statNumber = "font-mono font-bold text-[30px] sm:text-[44px] leading-none";
  const statFoot = "font-mono text-[9px] sm:text-[11px] leading-snug";

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
        {/* Nav */}
        <Header active="Projects" />

        <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink/40 mb-3">
          Projects
        </div>
        <h1 className="font-heading text-[26px] sm:text-[34px] font-normal leading-[1.4] tracking-[-0.005em]">
          Everything I&apos;ve built, launched, or crashed into along the way.
        </h1>

        {/* Stat cards */}
        <div className="flex items-center justify-center gap-2 sm:gap-5 flex-nowrap mt-9 sm:mt-14 mb-12 sm:mb-16">
          <div className="w-[98px] h-[140px] sm:w-[150px] sm:h-[190px] rounded-xl flex flex-col justify-between p-3 sm:p-5 bg-[#1D1E22] border border-white/10 rotate-[-3deg] translate-y-2">
            <div className={`${statLabel} text-ink/35`}>Live</div>
            <div className={`${statNumber} text-[#4ADE80]`}>{pad2(liveCount)}</div>
            <div className={`${statFoot} text-ink/40`}>
              shipped and
              <br />
              running
            </div>
          </div>

          <div className="w-[106px] h-[164px] sm:w-[160px] sm:h-[224px] rounded-xl flex flex-col justify-between p-3 sm:p-5 bg-gold/[0.07] border border-gold/40 relative z-[2]">
            <div className={`${statLabel} text-gold/70`}>Building</div>
            <div className={`${statNumber} text-gold`}>{pad2(buildCount)}</div>
            <div className={`${statFoot} text-gold/60`}>
              {boardingCount} boarding,
              <br />
              {inProgressCount} in progress
            </div>
          </div>

          <Link
            href="#crashed"
            className="w-[98px] h-[140px] sm:w-[150px] sm:h-[190px] rounded-xl flex flex-col justify-between p-3 sm:p-5 bg-red/[0.08] border border-red/45 rotate-[2deg] translate-y-1"
          >
            <div className={`${statLabel} text-red/80`}>Crashed</div>
            <div className={`${statNumber} text-red`}>{pad2(crashedCount)}</div>
            <div className={`${statFoot} text-red/75`}>
              {crashedCount === 0 ? (
                <>
                  none yet.
                  <br />
                  check back
                </>
              ) : (
                <>
                  not hiding it.
                  <br />
                  see below
                </>
              )}
            </div>
          </Link>
        </div>

        {/* Flagship */}
        <SectionLabel left="Held for the long run" />
        <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_1fr] gap-7 bg-gold/[0.06] border border-gold/40 rounded-2xl p-[22px] sm:p-7 mb-14 rotate-[-0.6deg]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.05em] text-gold/75">
              Holding · since {flagship.since}
            </div>
            <h2 className="font-heading font-semibold text-[28px] leading-[1.2] mt-2 mb-1.5">
              <a
                href={flagship.entityUrl}
                className="border-b border-ink/20 hover:border-ink/60 transition-colors"
              >
                {flagship.name}
              </a>
            </h2>
            <p className="text-[13px] text-ink/60 leading-relaxed">{flagship.blurb}</p>
            <div className="font-mono text-[10px] uppercase tracking-[0.05em] text-gold/60 mt-5 mb-1.5">
              Operating arm
            </div>
            <a
              href={flagship.armUrl}
              className="inline-flex flex-col items-center bg-gold text-bg px-[18px] py-[9px] rounded-lg leading-snug"
            >
              <span className="font-mono text-sm font-bold">{flagship.armName}</span>
              <span className="font-mono text-[10px] font-medium text-bg/65">by {flagship.name}</span>
            </a>
          </div>

          <div className="self-end">
            <div className="mb-3.5">
              <StageTrack stage="live" tier="live" />
            </div>
            <LeaderRows
              rows={[
                { label: "Status", value: flagship.status, valueClassName: "text-[#4ADE80]" },
                { label: "Entity", value: flagship.entityDomain },
                { label: "Operating arm", value: flagship.armDomain, valueClassName: "text-gold" },
                { label: "Projects under it", value: projects.length },
                {
                  label: "Earned",
                  value: (
                    <Link href="/168" className="hover:text-ink transition-colors">
                      {formatUSD(flagship.earned)}
                    </Link>
                  ),
                },
              ]}
            />
          </div>
        </div>

        {/* The rest */}
        <SectionLabel left="The rest" right={`${projects.length} projects`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
          <Link href="/idea-bench" className={placeholderClassName}>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/40">Next one</div>
            <div className="text-base font-semibold text-ink/55 mt-1.5">Probably on the idea bench</div>
            <div className="font-mono text-[11px] text-gold mt-2.5">See the bench</div>
          </Link>
        </div>

        {/* Crashed */}
        <section id="crashed" className="scroll-mt-10">
          <SectionLabel
            left="Crashed"
            right={`${crashedCount} ${crashedCount === 1 ? "project" : "projects"}`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            {crashed.map((project) => (
              <CrashedCard key={project.name} project={project} />
            ))}
            <div className={placeholderClassName}>
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/40">
                Space reserved
              </div>
              <div className="text-base font-semibold text-ink/55 mt-1.5">
                {crashedCount === 0 ? "For whatever breaks first" : "For whatever breaks next"}
              </div>
            </div>
          </div>
        </section>

        {/* Footer strip */}
        <div className="flex items-center justify-between border-t border-hairline pt-5 font-mono text-[12px] text-ink/45">
          <span>
            {projects.length + 1} running · {liveCount} live · {buildCount} building · {crashedCount} crashed
          </span>
          <span>Updated {LAST_UPDATED}</span>
        </div>
      </div>
    </main>
  );
}
