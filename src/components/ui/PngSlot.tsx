"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface PngSlotProps {
  src?: string;
  alt: string;
  resolutionHint?: string;
  aspectClass?: string;
  label?: string;
}

export default function PngSlot({
  src,
  alt,
  aspectClass = "aspect-[16/10]",
  label,
}: PngSlotProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative w-full ${aspectClass} liquid-glass-subtle overflow-hidden flex items-center justify-center group`}
    >
      {/* Circular ambient backlight behind the transparent PNG */}
      <div
        className="absolute w-56 h-56 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-110"
        style={{ background: "var(--orb-primary)" }}
        aria-hidden="true"
      />
      <div
        className="absolute w-36 h-36 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover:scale-125"
        style={{ background: "var(--orb-secondary)" }}
        aria-hidden="true"
      />

      {src && !imageError ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="relative z-10 w-full h-full object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        /* Minimal Circular Liquid Glass Placeholder when image is not provided */
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 max-w-xs">
          {/* Concentric Circular Halo */}
          <div className="relative flex items-center justify-center w-20 h-20 mb-4">
            <div
              className="absolute inset-0 rounded-full border border-dashed opacity-40 animate-[spin_25s_linear_infinite]"
              style={{ borderColor: "var(--color-accent-text)" }}
            />
            <div className="w-12 h-12 rounded-full liquid-pill flex items-center justify-center">
              <ImageIcon
                className="w-5 h-5"
                style={{ color: "var(--color-accent-text)" }}
              />
            </div>
          </div>

          {label && (
            <span className="font-display text-sm font-semibold text-[var(--text-primary)]">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
