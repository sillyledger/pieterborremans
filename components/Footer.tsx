import Link from "next/link";

const categories = [
  { slug: "listen", name: "Listen", count: 10 },
  { slug: "personal", name: "Personal", count: 1 },
  { slug: "thinking", name: "Thinking", count: 7 },
  { slug: "updates", name: "Updates", count: 4 },
  { slug: "watching", name: "Watching", count: 2 },
  { slug: "working", name: "Working", count: 7 },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Podcast", href: "/podcast" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Affiliate disclaimer", href: "/affiliate-disclaimer" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-hairline">
      <div className="max-w-[720px] mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 border-t border-hairline pt-10">
          {/* Navigate */}
          <div>
            <p className="font-mono text-[11px] tracking-wider text-ink/40 mb-4">
              NAVIGATE
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p className="font-mono text-[11px] tracking-wider text-ink/40 mb-4">
              CATEGORIES
            </p>
            <ul className="flex flex-col gap-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/blog/category/${category.slug}`}
                    className="flex items-center justify-between text-sm font-medium text-ink/70 hover:text-ink transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="font-mono text-xs text-ink/30">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-mono text-[11px] tracking-wider text-ink/40 mb-4">
              LEGAL
            </p>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-5 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-xs text-ink/35">
            © {new Date().getFullYear()} Pieter Borremans
          </p>
          <p className="font-mono text-xs text-ink/35">TAICHUNG · LONDON</p>
        </div>
      </div>
    </footer>
  );
}
