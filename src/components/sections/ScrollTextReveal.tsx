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

      // Estado inicial: primera palabra visible en el centro, las demás abajo
      words.forEach((word, idx) => {
        if (!word) return;
        if (idx === 0) {
          gsap.set(word, { y: 0, opacity: 1, filter: "blur(0px)" });
        } else {
          gsap.set(word, { y: 45, opacity: 0, filter: "blur(6px)" });
        }
      });

      // Timeline vinculada al scroll: solo se ancla cuando el inicio de la sección llega exactamente a la parte superior de la pantalla
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

      // Transiciones escalonadas limpias entre las palabras
      for (let i = 0; i < totalItems - 1; i++) {
        const current = words[i];
        const next = words[i + 1];

        tl.to(
          current,
          {
            y: -45,
            opacity: 0,
            filter: "blur(6px)",
            duration: 1,
            ease: "power1.inOut",
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
            ease: "power1.inOut",
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

      // Recalcular posiciones globales de ScrollTrigger para garantizar que no haya desfases de pin
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
      {/* Contenedor que se ancla a pantalla completa solo cuando la sección entra en foco */}
      <div
        ref={pinnedRef}
        className="w-full h-screen flex flex-col justify-center items-center px-6 overflow-hidden select-none relative"
      >
        {/* Resplandor ambiental de fondo */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-[160px] pointer-events-none opacity-35"
          style={{ background: "var(--orb-primary)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-pill text-xs font-mono mb-8 border border-[#11ffa1]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#11ffa1] shadow-[0_0_8px_#11ffa1]" />
            <span className="text-[#11ffa1] tracking-wider uppercase">
              03 · PARA QUIÉN TRABAJAMOS
            </span>
          </div>

          {/* Tipografía principal: Fija + Dinámica */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center">
            {/* Parte fija */}
            <span className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-secondary)]">
              Software a medida para
            </span>

            {/* Parte móvil: contenedor con altura fija para evitar saltos */}
            <div className="relative h-12 sm:h-16 md:h-20 min-w-[280px] sm:min-w-[420px] md:min-w-[480px] flex items-center justify-center md:justify-start">
              {TARGET_AUDIENCES.map((text, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    wordsRef.current[idx] = el;
                  }}
                  className="absolute font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#11ffa1] drop-shadow-[0_0_25px_rgba(17,255,161,0.35)] whitespace-nowrap"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Bajada sobria y honesta */}
          <p className="mt-10 text-base sm:text-lg text-[var(--text-muted)] max-w-xl text-center leading-relaxed">
            Desarrollamos herramientas adaptadas a la escala y la lógica operativa de cada negocio, sin imponer procesos enlatados ni cobrar licencias por usuario.
          </p>

          {/* Barra de progreso sutil */}
          <div className="mt-12 w-48 h-[2px] bg-[var(--glass-border)] rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-full bg-[#11ffa1] shadow-[0_0_10px_#11ffa1] origin-left"
              style={{ transform: "scaleX(0.2)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}