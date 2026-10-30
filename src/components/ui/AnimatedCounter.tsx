"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  // Intentar extraer prefijo, número y sufijo
  // Ej: "+10.000" -> prefix: "+", rawNum: "10.000" (10000), suffix: ""
  // Ej: "-90%" -> prefix: "-", rawNum: "90", suffix: "%"
  // Ej: "$0 licencias" -> prefix: "$", rawNum: "0", suffix: " licencias"
  const match = value.match(/^([^\d]*)(\d+(?:[\.,]\d+)?)(.*)$/);

  useGSAP(
    () => {
      const el = spanRef.current;
      if (!el || !match) return;

      const prefix = match[1] || "";
      const rawNumStr = match[2] || "0";
      const suffix = match[3] || "";
      const hasDotThousands = rawNumStr.includes(".");
      const cleanNum = parseFloat(rawNumStr.replace(/\./g, "").replace(",", "."));

      if (isNaN(cleanNum)) {
        el.textContent = value;
        return;
      }

      const proxy = { val: 0 };

      gsap.to(proxy, {
        val: cleanNum,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          let formattedNum = Math.round(proxy.val).toString();
          if (hasDotThousands) {
            formattedNum = Math.round(proxy.val).toLocaleString("de-DE");
          }
          el.textContent = `${prefix}${formattedNum}${suffix}`;
        },
      });
    },
    { scope: spanRef, dependencies: [value] }
  );

  return (
    <span ref={spanRef} className={className}>
      {value}
    </span>
  );
}