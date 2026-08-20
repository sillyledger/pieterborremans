import { NextRequest, NextResponse } from "next/server";
import { resend, NEWSLETTER_AUDIENCE_ID } from "@/lib/resend";
import { verifyConfirmToken } from "@/lib/newsletter-token";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!process.env.CONFIRM_TOKEN_SECRET) {
    console.error("CONFIRM_TOKEN_SECRET is not set, cannot verify confirm token");
  }

  const token = request.nextUrl.searchParams.get("token");
  const { valid, email } = token ? verifyConfirmToken(token) : { valid: false };

  if (!valid || !email) {
    return NextResponse.redirect(new URL("/newsletter/confirm?status=invalid", request.url));
  }

  try {
    const { error } = await resend.contacts.update({
      email,
      audienceId: NEWSLETTER_AUDIENCE_ID,
      unsubscribed: false,
    });

    if (error) {
      console.error("Failed to confirm contact:", error);
      return NextResponse.redirect(new URL("/newsletter/confirm?status=invalid", request.url));
    }
  } catch (error) {
    console.error("Failed to confirm contact:", error);
    return NextResponse.redirect(new URL("/newsletter/confirm?status=invalid", request.url));
  }

  return NextResponse.redirect(new URL("/newsletter/confirm?status=success", request.url));
}
