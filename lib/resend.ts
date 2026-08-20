import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const NEWSLETTER_AUDIENCE_ID = "356718d2-1ffb-4404-985a-abcf48117e4f";
