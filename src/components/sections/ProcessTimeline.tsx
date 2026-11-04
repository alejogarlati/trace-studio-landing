"use client";

import { useState, useRef } from "react";
import { Compass, PenTool, Layers, Rocket } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRACE_STEPS = [
  {
    number: "01",
    title: "Diagnóstico operativo",
    subtitle: "Semana 1",
    description:
      "Revisamos sus procesos actuales, detectamos cuellos de botella y definimos una propuesta con alcance, plazos y costos cerrados.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Diseño de flujos y pantallas",
    subtitle: "Semana 2",
    description:
      "Definimos la estructura de datos y las interfaces de usuario antes de programar, priorizando una carga de datos ágil y sin confusiones.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Desarrollo y entregas parciales",
    subtitle: "Semanas 3 a 6",
    description:
      "Construimos el sistema en entregas funcionales periódicas para que pruebe y valide cada módulo en un entorno de pruebas real.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Puesta en marcha y capacitación",
    subtitle: "Entrega final",
    description:
      "Migramos sus datos al nuevo sistema, capacitamos al personal en su uso y brindamos soporte técnico continuo post-lanzamiento.",
    icon: Rocket,
  },
];

export default function ProcessTimeline() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Animación de entrada con fade-in y ease-in para el header
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
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
          stagger: 0.08,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    const pinWrapper = pinWrapperRef.current;
    if (!pinWrapper) return;


      const items = itemsRef.current.filter(Boolean);
      const totalSteps = TRACE_STEPS.length;

      // Estado inicial: primer ítem visible; los siguientes abajo y ocultos
      items.forEach((item, i) => {
        if (!item) return;
        if (i === 0) {
          gsap.set(item, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            pointerEvents: "auto",
          });
        } else {
          gsap.set(item, {
            opacity: 0,
            y: 75,
            scale: 0.96,
            filter: "blur(6px)",
            pointerEvents: "none",
          });
        }
      });

      // Pin exclusivo para el contenedor del carrusel y la barra (el claim scrollea libre)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapper,
          start: "top 22%",
          end: "+=2000",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          snap: {
            snapTo: (value) => {
              const stepFraction = 1 / (totalSteps - 1);
              return Math.round(value / stepFraction) * stepFraction;
            },
            duration: { min: 0.2, max: 0.4 },
            ease: "power2.out",
          },
          onUpdate: (self) => {
            const p = self.progress;
            const stepIndex = Math.min(
              totalSteps - 1,
              Math.max(0, Math.round(p * (totalSteps - 1)))
            );
            setActiveStep(stepIndex);

            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.min(
                100,
                Math.max(0, p * 100)
              )}%`;
            }
          },
        },
      });

      // Transiciones verticales tipo carrusel entre ítems (alineados a la izquierda)
      for (let i = 0; i < totalSteps - 1; i++) {
        const currentItem = items[i];
        const nextItem = items[i + 1];

        tl.to(
          currentItem,
          {
            y: -75,
            opacity: 0,
            scale: 0.96,
            filter: "blur(6px)",
            pointerEvents: "none",
            duration: 1,
            ease: "power2.inOut",
          },
          `step-${i}`
        );

        tl.to(
          nextItem,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            pointerEvents: "auto",
            duration: 1,
            ease: "power2.inOut",
          },
          `step-${i}`
        );
      }
    }, { scope: pinWrapperRef });






  return (
    <section
      id="proceso"
      className="relative py-24 sm:py-32 px-6 overflow-visible"
    >
      {/* Circular Ambient Orb */}
      <div
        className="absolute top-1/3 left-10 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "var(--orb-primary)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header Superior: Claim y Subclaim alineados a la izquierda (Scrollean libremente) */}
        <div ref={headerRef} className="max-w-3xl mb-14 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-pill text-xs font-mono mb-4">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            <span style={{ color: "var(--color-accent-text)" }}>
              04 · METODOLOGÍA DE TRABAJO
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
            Cómo trabajamos: del diagnóstico al sistema en producción.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Entregas por módulos funcionales para saber con exactitud qué se construye, cuánto cuesta y cuándo se entrega.
          </p>
        </div>

        {/* Contenedor Fijo (Pinned Wrapper): Barra y carrusel alineados a la izquierda */}
        <div
          ref={pinWrapperRef}
          className="relative max-w-4xl w-full py-4 flex flex-col items-start"
        >
          {/* Barra de Progreso Continua con Marcadores alineada a la izquierda */}
          <div className="w-full max-w-xl mb-12 sm:mb-16">
            <div className="relative h-[2px] w-full bg-[var(--glass-border)] rounded-full">
              <div
                ref={progressBarRef}
                className="absolute left-0 top-0 h-full bg-[#11ffa1] shadow-[0_0_15px_#11ffa1] rounded-full"
                style={{ width: "0%" }}
              />
              <div className="absolute inset-0 flex justify-between items-center -top-[3px]">
                {TRACE_STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i <= activeStep
                        ? "bg-[#11ffa1] shadow-[0_0_8px_#11ffa1] scale-125"
                        : "bg-[var(--glass-border)] scale-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Escenario del Carrusel Vertical Alineado a la Izquierda (Sin Caja) */}
          <div className="relative w-full h-[340px] sm:h-[300px] flex items-center justify-start">
            {TRACE_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className="absolute inset-0 flex flex-col justify-center items-start text-left will-change-[transform,opacity,filter]"
                >
                  {/* Ícono Flotante y Badge Alineados */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-13 h-13 rounded-full liquid-pill flex items-center justify-center shrink-0 border border-[#11ffa1]/40 shadow-[0_0_20px_rgba(17,255,161,0.25)]">
                      <Icon className="w-5 h-5 text-[#11ffa1]" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#11ffa1]">
                        PASO {step.number} · {step.subtitle}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono">
                        ETAPA {index + 1} DE {TRACE_STEPS.length}
                      </span>
                    </div>
                  </div>

                  {/* Título Principal */}
                  <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-[1.15] mb-4 tracking-tight max-w-2xl">
                    {step.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
