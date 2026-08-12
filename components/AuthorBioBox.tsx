import Image from "next/image";
import Link from "next/link";

export default function AuthorBioBox() {
  return (
    <div className="mt-14 pt-10 border-t border-ink/[0.14] flex flex-col min-[481px]:flex-row items-start gap-4 min-[481px]:gap-6">
      <div className="w-[72px] h-[72px] min-[481px]:w-[100px] min-[481px]:h-[100px] rounded-full overflow-hidden shrink-0 border-2 min-[481px]:border-[3px] border-gold shadow-[0_0_0_3px_theme(colors.bg)]">
        <Image
          src="/images/pieter-borremans-writer.png"
          alt="Pieter Borremans"
          width={200}
          height={200}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <p className="font-mono text-[12px] font-medium tracking-[0.09em] uppercase text-ink/55 mb-1.5">
          Written by
        </p>
        <p className="font-heading font-bold text-[21px] min-[481px]:text-[24px] leading-tight text-ink mb-1.5">
          Pieter Borremans
        </p>
        <p className="font-mono text-[12.5px] font-medium tracking-[0.06em] uppercase text-gold mb-3.5">
          Writer<span className="text-ink/55 mx-1.5">&middot;</span>Content creator<span className="text-ink/55 mx-1.5">&middot;</span>Founder
        </p>
        <p className="text-[15.5px] max-[480px]:text-[15px] leading-[1.65] text-ink/85 max-w-[540px] mb-4">
          Based in Taichung, Taiwan and London, UK, this is Pieter&apos;s personal journal and builder&apos;s blog: field notes on entrepreneurship, solo business-building, and the unfiltered reality of creating online. Alongside it, he&apos;s chasing one absurd goal in public, <span className="text-gold font-semibold">$168M USD</span> in lifetime earnings, tracked live from zero.
        </p>
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-3">
          <Link
            href="/about"
            className="font-semibold text-[14.5px] text-gold border-b border-transparent hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-[3px] focus-visible:rounded-sm transition-colors"
          >
            More about Pieter
          </Link>
          <Link
            href="/168"
            className="group inline-flex items-center gap-1.5 bg-red text-bg font-mono font-medium text-[13.5px] uppercase tracking-[0.03em] px-4 py-[9px] rounded-md hover:bg-[#d4482f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-[3px] transition-colors"
          >
            Track the $168M challenge
            <span className="transition-transform group-hover:translate-x-[3px]" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
