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
  labels,
  interval = 1000,
}: {
  images: string[];
  alt: string;
  /** Lieu affiché en haut à gauche de chaque photo (aligné sur images). */
  labels?: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  // Étiquette affichée seulement quand sa photo est réellement chargée
  const [loaded, setLoaded] = useState<boolean[]>(() =>
    images.map(() => false)
  );

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
          /* Photo + étiquette de lieu fondues ensemble */
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 90vw, 440px"
              className="object-cover warm-filter"
              onLoad={() =>
                setLoaded((l) =>
                  l[i] ? l : Object.assign([...l], { [i]: true })
                )
              }
            />
            {labels?.[i] && loaded[i] && (
              <p className="script pointer-events-none absolute left-3 top-2 z-10 -rotate-2 text-2xl text-cream drop-shadow-[0_1px_6px_rgba(40,25,10,0.75)]">
                {labels[i]}
              </p>
            )}
          </div>
        ) : null
      )}
      {/* Voile chaud : légère profondeur terracotta + lumière dorée */}
      <div
        className="pointer-events-none absolute inset-0 bg-terracotta/10 mix-blend-multiply"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-camel/20 mix-blend-soft-light"
        aria-hidden
      />
    </div>
  );
}
