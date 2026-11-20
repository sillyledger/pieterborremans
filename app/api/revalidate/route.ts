import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "crypto";
import { categories } from "@/lib/posts";
import { findSeriesForPost } from "@/lib/series";

const SITE = "pieterborremans.com";

// Columns that affect what this site renders. An UPDATE that changes none of
// them (e.g. seo fields, updated_at, other editor metadata) is skipped.
const RENDERED_FIELDS = [
  "slug",
  "title",
  "content",
  "category",
  "published_at",
  "spotify_url",
  "status",
  "target_site",
] as const;

type PostRow = Partial<Record<(typeof RENDERED_FIELDS)[number], unknown>> | null | undefined;

function isValidSecret(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  const providedBuf = Buffer.from(provided);
  const expectedBuf = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, so check that first.
  if (providedBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(providedBuf, expectedBuf);
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function categoryPath(slug: string): string | null {
  const cat = categories.find((c) => c.slug === slug.toLowerCase());
  return cat ? cat.href ?? `/${cat.slug}` : null;
}

// Logged so Vercel logs show what each webhook call did (or why it didn't).
function skipped(reason: string, body: { type?: string; record?: PostRow; old_record?: PostRow }) {
  const slug = str(body.record?.slug) ?? str(body.old_record?.slug);
  console.log(`[revalidate] skipped (${reason}) type=${body.type ?? "-"} slug=${slug ?? "-"}`);
  return NextResponse.json({ revalidated: false, skipped: reason });
}

export async function POST(request: NextRequest) {
  const querySecret = request.nextUrl.searchParams.get("secret");

  // Accepts either { slug } (manual calls) or a Supabase database webhook
  // payload ({ type, table, record, old_record }).
  let body: {
    secret?: string;
    slug?: string;
    type?: string;
    record?: PostRow;
    old_record?: PostRow;
  } = {};
  try {
    body = await request.json();
  } catch {
    // No JSON body — fine if the secret was passed via the query string.
  }

  const providedSecret = querySecret ?? body.secret ?? null;

  if (!isValidSecret(providedSecret, process.env.REVALIDATE_SECRET)) {
    // Logged so a webhook or caller with a wrong/missing secret shows up in
    // Vercel logs instead of failing silently. Never logs the secret itself.
    console.log(
      `[revalidate] rejected (invalid token) secret=${providedSecret ? "wrong" : "missing"}` +
        ` env=${process.env.REVALIDATE_SECRET ? "set" : "MISSING"}` +
        ` ua=${request.headers.get("user-agent") ?? "-"}`
    );
    return NextResponse.json({ revalidated: false, message: "Invalid token" }, { status: 401 });
  }

  const { record, old_record: oldRecord } = body;
  const isWebhook = record != null || oldRecord != null;

  // Skip filters only act on fields the payload actually carries. A payload
  // without target_site/status (custom webhook body, manual { record: { slug } })
  // is never dropped: a skipped publish leaves / and /blog stale for a whole
  // day, since nothing else refreshes them before the 86400s window.
  if (isWebhook) {
    const sites = [record?.target_site, oldRecord?.target_site].map(str).filter(Boolean);
    // The posts table is shared by every Ryoka site: ignore other sites' rows.
    if (sites.length > 0 && !sites.includes(SITE)) {
      return skipped("other site", body);
    }
    // Drafts and autosaves of unpublished posts never show on the site. A post
    // that was published before or after the change (publish, edit, unpublish,
    // delete) does.
    const statuses = [record?.status, oldRecord?.status].map(str).filter(Boolean);
    if (statuses.length > 0 && !statuses.includes("published")) {
      return skipped("not published", body);
    }
    if (
      record &&
      oldRecord &&
      RENDERED_FIELDS.every((f) => f in record && f in oldRecord) &&
      RENDERED_FIELDS.every((f) => JSON.stringify(record[f]) === JSON.stringify(oldRecord[f]))
    ) {
      return skipped("no rendered fields changed", body);
    }
  }

  // The new slug and, if a post was renamed, the old one, so a 404 cached
  // before publishing (or the old URL) is replaced right away.
  const slugs = new Set(
    [str(body.slug), str(record?.slug), str(oldRecord?.slug)].filter(
      (s): s is string => s !== null
    )
  );

  const paths = new Set<string>(["/", "/blog", "/sitemap.xml"]);

  for (const slug of slugs) {
    paths.add(`/blog/${slug}`);
    const inSeries = findSeriesForPost(slug);
    if (inSeries) paths.add(`/series/${inSeries.series.slug}`);
  }

  // Category pages: from the webhook rows (old and new category, in case it
  // moved). A manual { slug } call doesn't say which category, so refresh them
  // all (a handful of small pages).
  const postCategories = [str(record?.category), str(oldRecord?.category)].filter(
    (c): c is string => c !== null
  );
  const categoryPaths = isWebhook
    ? postCategories.map(categoryPath)
    : categories.map((c) => c.href ?? `/${c.slug}`);
  for (const p of categoryPaths) if (p) paths.add(p);

  for (const path of paths) {
    revalidatePath(path);
  }
  // Every /blog/page/N index page (pagination shifts by one on each publish).
  revalidatePath("/blog/page/[page]", "page");

  // Deliberately no revalidatePath("/", "layout"): wiping the whole site on
  // every publish re-rendered every page. Footer category counts on pages not
  // listed above refresh within the daily revalidate window instead.

  console.log(`[revalidate] type=${body.type ?? "manual"} paths=${[...paths].join(",")}`);

  return NextResponse.json({
    revalidated: true,
    paths: [...paths, "/blog/page/[page]"],
    revalidatedAt: new Date().toISOString(),
  });
}
