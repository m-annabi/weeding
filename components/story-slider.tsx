"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Diaporama en fondu enchaîné pour les blocs d'accueil.
 * Seules les diapositives voisines sont montées, pour précharger
 * la suivante sans télécharger toute la série d'un coup.
 */
export default function StorySlider({
  images,
  alt,
  interval = 1000,
}: {
  images: string[];
  alt: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      interval
    );
    return () => clearInterval(t);
  }, [images.length, interval]);

  const isNear = (i: number) => {
    const d = Math.abs(i - index);
    return d <= 1 || d === images.length - 1;
  };

  return (
    <div className="relative h-full w-full">
      {images.map((src, i) =>
        isNear(i) ? (
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 90vw, 440px"
            className={`object-cover warm-filter transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null
      )}
      {/* Voile chaud : légère profondeur terracotta + lumière dorée */}
      <div
        className="pointer-events-none absolute inset-0 bg-terracotta/15 mix-blend-multiply"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-camel/30 mix-blend-soft-light"
        aria-hidden
      />
    </div>
  );
}
