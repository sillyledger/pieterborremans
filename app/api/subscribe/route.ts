import { NextRequest, NextResponse } from "next/server";
import { resend, NEWSLETTER_AUDIENCE_ID } from "@/lib/resend";
import { createConfirmToken } from "@/lib/newsletter-token";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_URL = "https://pieterborremans.com";

function confirmEmailHtml(confirmUrl: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#161618;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#161618;padding:40px 20px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">
            <tr>
              <td style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#E8B923;padding-bottom:16px;">
                The journal
              </td>
            </tr>
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;color:#F5F3EE;padding-bottom:16px;">
                Confirm your subscription
              </td>
            </tr>
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:rgba(245,243,238,0.7);padding-bottom:28px;">
                One click and you're set. This link expires in 48 hours.
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:28px;">
                <a href="${confirmUrl}" style="display:inline-block;background-color:#E8B923;color:#161618;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:6px;">
                  Confirm subscription
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(245,243,238,0.4);">
                If you didn't request this, you can ignore this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

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

  const trimmedEmail = email.trim();

  try {
    const { error } = await resend.contacts.create({
      email: trimmedEmail,
      audienceId: NEWSLETTER_AUDIENCE_ID,
      unsubscribed: true,
    });

    if (error) {
      console.error("Failed to subscribe contact:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    let token: string | undefined;
    try {
      if (!process.env.CONFIRM_TOKEN_SECRET) {
        console.error("CONFIRM_TOKEN_SECRET is not set, cannot generate confirm token");
      }
      token = createConfirmToken(trimmedEmail);
    } catch (tokenError) {
      console.error("Failed to generate confirm token:", tokenError);
    }

    if (token) {
      const confirmUrl = `${SITE_URL}/newsletter/confirm?token=${token}`;
      try {
        const { error: emailError } = await resend.emails.send({
          from: "Pieter Borremans <journal@pieterborremans.com>",
          to: trimmedEmail,
          subject: "Confirm your subscription",
          html: confirmEmailHtml(confirmUrl),
        });

        if (emailError) {
          console.error("Failed to send confirmation email:", emailError);
        }
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to subscribe contact:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
