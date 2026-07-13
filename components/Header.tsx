"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Podcast", href: "/podcast" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="mb-14">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-[42px] w-[42px] rounded-full overflow-hidden shrink-0 bg-white/10">
            <Image
              src="/images/pieter-borremans-writer.png"
              alt="Pieter Borremans"
              width={84}
              height={84}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-[13px] font-semibold tracking-[0.16em] uppercase">
            Pieter Borremans
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-[0.08em] uppercase text-ink/45">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.label === active ? "text-ink" : "hover:text-ink/80 transition-colors"}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden flex items-center justify-center h-9 w-9 -mr-1.5 text-ink/70 hover:text-ink transition-colors"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden flex flex-col mt-6 pt-6 border-t border-white/10 text-sm font-medium tracking-[0.04em] uppercase text-ink/45">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`py-3 ${link.label === active ? "text-ink" : "hover:text-ink/80 transition-colors"}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
