import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Photo Gallery | Pieter Borremans",
  description:
    "Unfiltered photos from Pieter Borremans — building, writing, and living between Taichung and London.",
};

const SITE_URL = "https://pieterborremans.com";

function GalleryJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Photo Gallery | Pieter Borremans",
    description:
      "Unfiltered photos from Pieter Borremans — building, writing, and living between Taichung and London.",
    url: `${SITE_URL}/gallery`,
    image: photos.map((photo) => ({
      "@type": "ImageObject",
      contentUrl: `${SITE_URL}${photo.src}`,
      description: photo.alt,
      caption: photo.caption,
      creator: {
        "@type": "Person",
        name: "Pieter Borremans",
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function GalleryPage() {
  return (
    <main className="max-w-[750px] mx-auto px-7 pt-9 pb-16">
      <GalleryJsonLd />

      {/* Nav */}
      <Header active="Gallery" />

      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/40">
          the roll &middot; unedited
        </span>
        <span className="font-mono text-[11px] text-ink/40">
          {photos.length} / 36 EXP
        </span>
      </div>

      <h1 className="text-[34px] font-normal leading-[1.4] tracking-[-0.005em] mb-12">
        Unfiltered,
        <br />
        one roll at a time.
      </h1>

      <p className="font-mono text-[11px] text-ink/40 max-w-[480px] mb-12">
        All photographs on this page are original works by Pieter Borremans
        and are protected by copyright. No image may be copied, downloaded,
        reproduced, or used in any form without prior written permission.
        Unauthorized use may result in legal action.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <figure
            key={photo.src}
            className={`flex flex-col gap-2 ${
              i % 2 === 0 ? "rotate-[-1.2deg]" : "rotate-[1deg]"
            } hover:rotate-0 transition-transform duration-200`}
          >
            <div className="relative aspect-square overflow-hidden rounded-sm border border-white/10">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 220px"
              />
            </div>
            <figcaption className="font-mono text-[10px] text-ink/40 leading-snug">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/10">
        <span className="font-mono text-[11px] text-ink/40">
          Taichung &middot; 2018&ndash;2026
        </span>
        <span className="font-mono text-[11px] text-red">
          STILL SHOOTING
        </span>
      </div>
    </main>
  );
}
