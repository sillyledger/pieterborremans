import Image from "next/image";
import { photos } from "@/lib/photos";

export default function PhotoStrip() {
  const preview = photos.slice(0, 3);

  return (
    <section className="mt-10">
      <div className="mb-4">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/40">
          the roll &middot; unedited
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {preview.map((photo, i) => (
          <div
            key={photo.src}
            className={`relative aspect-square overflow-hidden rounded-sm border border-white/10 ${
              i % 2 === 0 ? "rotate-[-1.2deg]" : "rotate-[1deg]"
            } hover:rotate-0 transition-transform duration-200`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 220px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}