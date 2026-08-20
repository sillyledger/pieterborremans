import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_MS = 48 * 60 * 60 * 1000;

interface TokenPayload {
  email: string;
  exp: number;
}

function getSecret(): string {
  const secret = process.env.CONFIRM_TOKEN_SECRET;
  if (!secret) {
    throw new Error("CONFIRM_TOKEN_SECRET is not set");
  }
  return secret;
}

function sign(payloadB64: string): string {
  return createHmac("sha256", getSecret()).update(payloadB64).digest("base64url");
}

export function createConfirmToken(email: string): string {
  const payload: TokenPayload = { email, exp: Date.now() + TOKEN_TTL_MS };
  const payloadB64 = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = sign(payloadB64);
  return `${payloadB64}.${signature}`;
}

export function verifyConfirmToken(token: string): { valid: boolean; email?: string } {
  const parts = token.split(".");
  if (parts.length !== 2) {
    console.error("verifyConfirmToken: malformed token (expected exactly one '.')");
    return { valid: false };
  }
  const [payloadB64, signature] = parts;

  let expectedSignature: string;
  try {
    expectedSignature = sign(payloadB64);
  } catch (err) {
    console.error("verifyConfirmToken: could not compute signature:", err instanceof Error ? err.message : err);
    return { valid: false };
  }

  const signatureBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (signatureBuf.length !== expectedBuf.length || !timingSafeEqual(signatureBuf, expectedBuf)) {
    console.error("verifyConfirmToken: signature mismatch");
    return { valid: false };
  }

  let payload: TokenPayload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    console.error("verifyConfirmToken: payload is not valid base64url JSON");
    return { valid: false };
  }

  if (typeof payload.email !== "string" || typeof payload.exp !== "number") {
    console.error("verifyConfirmToken: payload missing email/exp");
    return { valid: false };
  }

  if (Date.now() > payload.exp) {
    console.error("verifyConfirmToken: token expired at", new Date(payload.exp).toISOString());
    return { valid: false };
  }

  return { valid: true, email: payload.email };
}
