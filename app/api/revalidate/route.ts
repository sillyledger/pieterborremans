import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "crypto";

function isValidSecret(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  const providedBuf = Buffer.from(provided);
  const expectedBuf = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, so check that first.
  if (providedBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(providedBuf, expectedBuf);
}

export async function POST(request: NextRequest) {
  const querySecret = request.nextUrl.searchParams.get("secret");

  // Accepts either { slug } (manual calls) or a Supabase database webhook
  // payload ({ type, table, record, old_record }).
  let body: {
    secret?: string;
    slug?: string;
    record?: { slug?: string } | null;
    old_record?: { slug?: string } | null;
  } = {};
  try {
    body = await request.json();
  } catch {
    // No JSON body — fine if the secret was passed via the query string.
  }

  const providedSecret = querySecret ?? body.secret ?? null;

  if (!isValidSecret(providedSecret, process.env.REVALIDATE_SECRET)) {
    return NextResponse.json({ revalidated: false, message: "Invalid token" }, { status: 401 });
  }

  const paths = ["/", "/blog", "/updates", "/sitemap.xml"];
  // The new slug and, if a post was renamed, the old one, so a 404 cached
  // before publishing (or the old URL) is replaced right away.
  const slugs = new Set(
    [body.slug, body.record?.slug, body.old_record?.slug].filter(
      (s): s is string => typeof s === "string" && s.length > 0
    )
  );
  for (const slug of slugs) {
    paths.push(`/${slug}`, `/blog/${slug}`);
  }

  for (const path of paths) {
    revalidatePath(path);
  }
  // Every page is statically cached and the root layout's Footer shows
  // category counts, so a publish refreshes every page (all posts, category
  // pages, blog pagination, footer). Route handlers like /sitemap.xml aren't
  // covered by the layout revalidation, hence the explicit path above.
  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    paths,
    revalidatedAt: new Date().toISOString(),
  });
}
