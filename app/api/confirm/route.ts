import { NextRequest, NextResponse } from "next/server";
import { resend, NEWSLETTER_AUDIENCE_ID } from "@/lib/resend";
import { verifyConfirmToken } from "@/lib/newsletter-token";

export async function GET(request: NextRequest) {
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
