"use client";

import { useRef } from "react";
import { ShieldCheck, MessageSquareCode, KeyRound } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PngSlot from "@/components/ui/PngSlot";
import SpotlightCard from "@/components/ui/SpotlightCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PILLARS = [
  {
    title: "Criterio técnico y práctico",
    description:
      "Desarrollamos sobre arquitecturas web modernas y bases de datos relacionales sólidas, preparadas para soportar la carga diaria de su empresa.",
    icon: ShieldCheck,
  },
  {
    title: "Trato directo con quien programa",
    description:
      "Comunicación fluida y directa con el equipo técnico que construye la herramienta. Sin intermediarios comerciales ni mensajes distorsionados.",
    icon: MessageSquareCode,
  },
  {
    title: "Software propio sin licencias",
    description:
      "Construimos herramientas que quedan en propiedad de su empresa: código y datos le pertenecen por completo, sin costos mensuales por usuario.",
    icon: KeyRound,
  },
];

export default function AboutStudio() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Entrada con fade-in y ease-in para la tarjeta principal
      gsap.fromTo(
        ".about-main-card",
        {
          opacity: 0,
          y: 24,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power2.in",
          scrollTrigger: {
            trigger: ".about-main-card",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Entrada con fade-in y ease-in para los pilares
      gsap.fromTo(
        ".about-pillar-card",
        {
          opacity: 0,
          y: 24,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.55,
          ease: "power2.in",
          scrollTrigger: {
            trigger: ".about-pillars-grid",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="estudio"
      className="relative py-24 sm:py-32 px-6 overflow-hidden"
    >
      {/* Circular Ambient Orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "var(--orb-primary)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SpotlightCard className="about-main-card p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Manifesto */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-pill text-xs font-mono border border-[#11ffa1]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#11ffa1] shadow-[0_0_8px_#11ffa1]" />
                <span className="text-[#11ffa1] tracking-wider uppercase">
                  05 · SOBRE EL ESTUDIO
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                Desarrollo de software enfocado en hacer rendir la operación.
              </h2>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                Trace Studio nació para empresas que no encajan en los sistemas enlatados y buscan evitar los sobrecostos y las demoras de las agencias tradicionales.
              </p>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                Trabajamos con enfoque técnico directo en la operación y los números de su negocio. Construimos herramientas que eliminan horas de carga manual, resuelven errores de stock y quedan en propiedad definitiva de su empresa.
              </p>
            </div>

            {/* Right Column: Institutional Visual PNG Slot */}
            <div className="lg:col-span-5">
              <PngSlot
                src="/images/estudio/trace-studio.png"
                alt="Identidad Visual Trace Studio"
                label="Gráfica PNG · Identidad Trace Studio"
                resolutionHint="1000 × 1000 px · PNG transparente"
                aspectClass="aspect-square max-h-[340px]"
              />
            </div>
          </div>

          {/* 3 Institutional Pillars with Individual Spotlights */}
          <div className="about-pillars-grid mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <SpotlightCard
                  key={pillar.title}
                  className="about-pillar-card p-6 border border-[var(--glass-border)] hover:border-[#11ffa1]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full liquid-pill flex items-center justify-center mb-4 border border-[#11ffa1]/30 text-[#11ffa1]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {pillar.description}
                  </p>
                </SpotlightCard>
              );
            })}
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
