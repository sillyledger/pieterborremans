"use client";

import { useState, FormEvent } from "react";

type NewsletterFormVariant = "compact" | "full";

interface NewsletterFormProps {
  variant: NewsletterFormVariant;
}

export default function NewsletterForm({ variant }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const isCompact = variant === "compact";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className={isCompact ? "text-[14px] text-ink/85 font-medium" : "text-[17px] text-ink/85 font-medium"}>
        Check your inbox to confirm your subscription.
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-10">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          className={
            isCompact
              ? "flex-1 min-w-0 bg-bg border border-white/15 rounded-md px-3.5 py-2.5 text-[14px] text-ink placeholder:text-ink/35 focus:outline-none focus:border-gold/60 transition-colors"
              : "flex-1 min-w-0 bg-bg border border-white/15 rounded-md px-5 py-4 text-[16px] text-ink placeholder:text-ink/35 focus:outline-none focus:border-gold/60 transition-colors"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            isCompact
              ? "font-mono text-xs uppercase tracking-[0.04em] bg-gold text-bg font-bold px-4 py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              : "font-mono text-sm uppercase tracking-[0.04em] bg-gold text-bg font-bold px-6 py-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          }
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-3 text-[13px] text-red font-medium">{error}</p>
      )}
    </div>
  );
}
