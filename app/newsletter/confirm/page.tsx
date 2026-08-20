import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Confirm subscription | Pieter Borremans",
  description: "Confirm your newsletter subscription to Pieter Borremans' journal.",
};

export default async function ConfirmNewsletter({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const isSuccess = status === "success";

  return (
    <main className="min-h-screen">
      <div className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
        {/* Nav */}
        <Header />

        <div className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-gold mb-3">
          Subscribe
        </div>

        {isSuccess ? (
          <>
            <h1 className="font-heading font-semibold text-[28px] sm:text-[36px] leading-[1.3] tracking-[-0.005em] max-w-[520px] mb-6">
              You&apos;re confirmed. Welcome to the journal.
            </h1>
            <Link
              href="/"
              className="font-semibold text-[14.5px] text-gold border-b border-transparent hover:border-gold transition-colors"
            >
              Back to homepage
            </Link>
          </>
        ) : (
          <>
            <h1 className="font-heading font-semibold text-[28px] sm:text-[36px] leading-[1.3] tracking-[-0.005em] max-w-[520px] mb-6">
              This link is invalid or has expired.
            </h1>
            <Link
              href="/newsletter"
              className="font-semibold text-[14.5px] text-gold border-b border-transparent hover:border-gold transition-colors"
            >
              Resubscribe
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
