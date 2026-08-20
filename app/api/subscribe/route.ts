import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const AUDIENCE_ID = "356718d2-1ffb-4404-985a-abcf48117e4f";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  let body: { email?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email;

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  try {
    const { error } = await resend.contacts.create({
      email: email.trim(),
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    });

    if (error) {
      console.error("Failed to subscribe contact:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to subscribe contact:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
