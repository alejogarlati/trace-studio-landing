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
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinned = pinnedRef.current;
      const words = wordsRef.current.filter(Boolean);
      if (!section || !pinned || words.length === 0) return;

      const totalItems = words.length;

      // Estado inicial: primera palabra nítida en el centro, las demás abajo y desenfocadas
      words.forEach((word, idx) => {
        if (!word) return;
        if (idx === 0) {
          gsap.set(word, { y: 0, opacity: 1, filter: "blur(0px)" });
        } else {
          gsap.set(word, { y: 36, opacity: 0, filter: "blur(8px)" });
        }
      });

      // Timeline vinculada al scroll
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

      // Transiciones cinematográficas escalonadas entre palabras
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
            ease: "power2.inOut",
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
            ease: "power2.inOut",
          },
          `step-${i}`
        );
      }

      // Sincronizar barra de progreso inferior
      if (progressBarRef.current) {
        tl.to(
          progressBarRef.current,
          {
            scaleX: 1,
            ease: "none",
            duration: totalItems - 1,
          },
          0
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
            Atmósfera y Encuadre Cinemático Widescreen
            ========================================================= */}
        {/* Borde superior del encuadre con brillo atenuado */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* Haz de luz anamórfico horizontal centrado detrás del texto */}
        <div className="absolute top-1/2 inset-x-0 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#11ffa1]/25 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 inset-x-1/4 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#11ffa1]/40 to-transparent blur-sm pointer-events-none" />

        {/* Resplandor ambiental esmeralda profundo */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[320px] rounded-full blur-[140px] pointer-events-none opacity-30"
          style={{ background: "var(--orb-primary)" }}
          aria-hidden="true"
        />

        {/* Viñeta radial oscura para concentrar la vista en el centro */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,8,10,0.85)_100%)] pointer-events-none" />

        {/* Borde inferior del encuadre */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* Marcas de telemetría y encuadre cinematográfico en las esquinas */}
        <div className="absolute top-8 left-6 sm:left-12 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-white/20 select-none">
          <span className="text-[#11ffa1]/40">+</span>
          <span>TRACE // ENFOQUE</span>
        </div>

        <div className="absolute top-8 right-6 sm:right-12 font-mono text-[10px] tracking-[0.25em] text-white/20 select-none">
          <span>[ 03 ]</span>
        </div>

        <div className="absolute bottom-8 left-6 sm:left-12 font-mono text-[10px] tracking-[0.25em] text-white/20 select-none hidden sm:block">
          <span>ALCANCE OPERATIVO</span>
        </div>

        {/* =========================================================
            Centro de Atención: Tipografía Monumental (Sin párrafos ni badges)
            ========================================================= */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2.5 lg:gap-4 text-center lg:text-left">
            {/* Parte fija: nunca se parte en 2 líneas */}
            <span className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent whitespace-nowrap shrink-0">
              Software a medida para
            </span>

            {/* Parte dinámica: transiciones verticales suaves en verde neón */}
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

          {/* Telemetría de progreso cinematográfica inferior */}
          <div className="mt-14 sm:mt-16 flex items-center gap-4">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#11ffa1]/60 uppercase">
              FOCUS
            </span>
            <div className="w-36 sm:w-56 h-[1.5px] bg-white/[0.08] relative overflow-hidden rounded-full">
              <div
                ref={progressBarRef}
                className="h-full w-full bg-gradient-to-r from-[#11ffa1]/50 to-[#11ffa1] shadow-[0_0_8px_#11ffa1] origin-left"
                style={{ transform: "scaleX(0.2)" }}
              />
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-white/30 uppercase">
              01—05
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
