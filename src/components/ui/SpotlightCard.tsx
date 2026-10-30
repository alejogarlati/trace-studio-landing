"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(17, 255, 161, 0.08)",
  borderColor = "rgba(17, 255, 161, 0.22)",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(
    () => {
      const card = cardRef.current;
      const glow = glowRef.current;
      const borderGlow = borderGlowRef.current;
      if (!card || !glow || !borderGlow) return;

      // QuickTo para actualizar la posición x e y del resplandor a 60fps sin reflows
      const setGlowX = gsap.quickTo(glow, "x", { duration: 0.22, ease: "power2.out" });
      const setGlowY = gsap.quickTo(glow, "y", { duration: 0.22, ease: "power2.out" });
      const setBorderX = gsap.quickTo(borderGlow, "x", { duration: 0.22, ease: "power2.out" });
      const setBorderY = gsap.quickTo(borderGlow, "y", { duration: 0.22, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setGlowX(x);
        setGlowY(y);
        setBorderX(x);
        setBorderY(y);
      };

      card.addEventListener("mousemove", handleMouseMove);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md transition-colors duration-300 ${className}`}
      {...props}
    >
      {/* Resplandor radial de borde difuso con desenfoque suave y 30% menos opacidad */}
      <div
        ref={borderGlowRef}
        className="pointer-events-none absolute -top-[240px] -left-[240px] w-[480px] h-[480px] rounded-full blur-[36px] transition-opacity duration-500 ease-out"
        style={{
          background: `radial-gradient(circle, ${borderColor} 0%, rgba(17, 255, 161, 0.04) 40%, transparent 72%)`,
          opacity: isHovered ? 0.45 : 0,
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, opacity",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Resplandor radial interior amplio, etéreo y muy desenfocado */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full blur-[54px] transition-opacity duration-500 ease-out"
        style={{
          background: `radial-gradient(circle, ${spotlightColor} 0%, rgba(17, 255, 161, 0.02) 45%, transparent 75%)`,
          opacity: isHovered ? 0.7 : 0,
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, opacity",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Contenido real de la tarjeta */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}