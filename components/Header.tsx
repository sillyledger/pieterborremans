import Image from "next/image";

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Podcast", href: "/podcast" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ active }: { active?: string }) {
  return (
    <header className="flex items-center justify-between mb-14">
      <div className="flex items-center gap-2.5">
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
      </div>
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
    </header>
  );
}