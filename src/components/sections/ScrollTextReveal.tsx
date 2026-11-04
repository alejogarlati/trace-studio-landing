"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TARGET_AUDIENCES = [
  "distribuidoras.",
  "mayoristas.",
  "empresas de servicios.",
  "logística y depósitos.",
  "pymes en crecimiento.",
];

export default function ScrollTextReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinned = pinnedRef.current;
      const textContainer = textContainerRef.current;
      const words = wordsRef.current.filter(Boolean);
      if (!section || !pinned || words.length === 0) return;

      const totalItems = words.length;

      // Animación de entrada con fade-in y ease-in para todo el bloque de texto
      if (textContainer) {
        gsap.fromTo(
          textContainer,
          {
            opacity: 0,
            y: 24,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power2.in",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Estado inicial: primera palabra nítida en el centro, las demás abajo y desenfocadas
      words.forEach((word, idx) => {
        if (!word) return;
        if (idx === 0) {
          gsap.set(word, { y: 0, opacity: 1, filter: "blur(0px)" });
        } else {
          gsap.set(word, { y: 36, opacity: 0, filter: "blur(8px)" });
        }
      });

      // Timeline vinculada al scroll para anclar la pantalla completa
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          pin: pinned,
          pinSpacing: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Transiciones entre palabras con fade-in y ease-in para las palabras entrantes
      for (let i = 0; i < totalItems - 1; i++) {
        const current = words[i];
        const next = words[i + 1];

        tl.to(
          current,
          {
            y: -36,
            opacity: 0,
            filter: "blur(8px)",
            duration: 1,
            ease: "power2.out",
          },
          `step-${i}`
        );

        tl.to(
          next,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.in",
          },
          `step-${i}`
        );
      }

      // Recalcular posiciones de ScrollTrigger
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="enfoque"
      className="relative w-full overflow-visible bg-[var(--bg-primary)]"
    >
      {/* Contenedor que se ancla a pantalla completa durante el scroll */}
      <div
        ref={pinnedRef}
        className="w-full h-screen flex flex-col justify-center items-center px-6 overflow-hidden select-none relative"
      >
        {/* =========================================================
            Atmósfera Cinemática Widescreen
            ========================================================= */}
        {/* Borde superior del encuadre con brillo atenuado */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* Resplandor ambiental esmeralda profundo */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[320px] rounded-full blur-[140px] pointer-events-none opacity-30"
          style={{ background: "var(--orb-primary)" }}
          aria-hidden="true"
        />

        {/* Viñeta radial oscura para concentrar la atención en el centro */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,8,10,0.85)_100%)] pointer-events-none" />

        {/* Borde inferior del encuadre */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* =========================================================
            Banner Cinemático Puro: Tipografía Monumental
            ========================================================= */}
        <div
          ref={textContainerRef}
          className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2.5 lg:gap-4 text-center lg:text-left">
            {/* Parte fija: estrictamente en 1 sola línea */}
            <span className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent whitespace-nowrap shrink-0">
              Software a medida para
            </span>

            {/* Parte dinámica: transiciones suaves con fade-in y ease-in */}
            <div className="relative h-12 sm:h-14 md:h-16 lg:h-16 xl:h-20 2xl:h-24 w-full lg:w-auto lg:min-w-[440px] xl:min-w-[560px] 2xl:min-w-[660px] flex items-center justify-center lg:justify-start">
              {TARGET_AUDIENCES.map((text, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    wordsRef.current[idx] = el;
                  }}
                  className="absolute font-display text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#11ffa1] drop-shadow-[0_0_35px_rgba(17,255,161,0.45)] whitespace-nowrap"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
