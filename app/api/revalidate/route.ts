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

  let body: { secret?: string; slug?: string } = {};
  try {
    body = await request.json();
  } catch {
    // No JSON body — fine if the secret was passed via the query string.
  }

  const providedSecret = querySecret ?? body.secret ?? null;

  if (!isValidSecret(providedSecret, process.env.REVALIDATE_SECRET)) {
    return NextResponse.json({ revalidated: false, message: "Invalid token" }, { status: 401 });
  }

  const paths = ["/", "/blog", "/updates"];
  if (body.slug) {
    paths.push(`/${body.slug}`, `/blog/${body.slug}`);
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    paths,
    revalidatedAt: new Date().toISOString(),
  });
}
