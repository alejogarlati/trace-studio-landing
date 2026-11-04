"use client";

import { useState, useRef } from "react";
import {
  FileSpreadsheet,
  Lock,
  RefreshCw,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PROBLEMS = [
  {
    number: "01",
    tag: "Control de inventario",
    title: "Stock desfasado entre mostrador, depósito y administración",
    description:
      "Llevar inventario en varias planillas genera ventas sin mercadería física, diferencias de caja y horas perdidas cruzando datos al cierre del día.",
    resolution:
      "Centralizamos la información en un sistema web en tiempo real: cada venta, ingreso y egreso queda registrado al instante con su responsable.",
    icon: FileSpreadsheet,
  },
  {
    number: "02",
    tag: "Sistemas estándar",
    title: "Sistemas enlatados que cobran por usuario y no se adaptan",
    description:
      "Obligan a cambiar la forma de trabajar para encajar en el software, mientras las cuotas mensuales aumentan cada vez que entra un empleado nuevo.",
    resolution:
      "Construimos software a medida, propiedad exclusiva de su empresa y sin licencias mensuales ni cargos por usuario.",
    icon: Lock,
  },
  {
    number: "03",
    tag: "Procesos repetitivos",
    title: "Carga manual de precios, listas de proveedores y catálogo",
    description:
      "Copiar y pegar listas de precios en Excel o actualizar artículos uno a uno en la web demora días y multiplica los errores de facturación.",
    resolution:
      "Automatizamos el procesamiento de listas y la sincronización directa con los canales de venta en segundos.",
    icon: RefreshCw,
  },
  {
    number: "04",
    tag: "Análisis de rentabilidad",
    title: "Decisiones a ciegas sin conocer el margen neto real",
    description:
      "Los aumentos de costos, comisiones y fletes hacen que muchos productos se vendan a pérdida sin que la administración lo note a tiempo.",
    resolution:
      "Tableros de control con costos actualizados y márgenes netos por artículo, categoría y punto de venta.",
    icon: BarChart3,
  },
];

export default function PainPoints() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const pinWrapper = pinWrapperRef.current;
    if (!pinWrapper) return;


      const items = itemsRef.current.filter(Boolean);
      const totalSteps = PROBLEMS.length;

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

            // Efecto de iluminación dinámica: mueve suavemente la luz focal
            if (spotlightRef.current) {
              const yOffset = (stepIndex - 1.5) * 40;
              gsap.to(spotlightRef.current, {
                y: yOffset,
                opacity: 0.45 + (stepIndex % 2) * 0.15,
                duration: 0.6,
                ease: "power2.out",
              });
            }
          },
        },
      });

      // Transiciones verticales tipo carrusel entre ítems (sin cajas)
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
      id="problemas"
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
        <div id="problemas-header" className="max-w-3xl mb-14 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-pill text-xs font-mono mb-4">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            <span style={{ color: "var(--color-accent-text)" }}>
              01 · DESAFÍOS OPERATIVOS
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
            Cuando la operación crece, los procesos manuales frenan el negocio.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Planillas desactualizadas, sistemas rígidos y tareas repetitivas que consumen horas y recortan márgenes comerciales.
          </p>
        </div>

        {/* Contenedor Fijo (Pinned Wrapper): Barra y carrusel vertical sin cajas con iluminación */}
        <div
          ref={pinWrapperRef}
          className="relative max-w-4xl w-full py-4 flex flex-col items-start"
        >
          {/* Luz Focal Dinámica (Efecto de Iluminación Específico) */}
          <div
            ref={spotlightRef}
            className="absolute -left-24 top-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ease-out"
            style={{
              background:
                "radial-gradient(circle, rgba(17,255,161,0.22) 0%, rgba(17,255,161,0.06) 50%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Barra de Progreso Continua con Marcadores alineada a la izquierda */}
          <div className="w-full max-w-xl mb-12 sm:mb-16">
            <div className="relative h-[2px] w-full bg-[var(--glass-border)] rounded-full">
              <div
                ref={progressBarRef}
                className="absolute left-0 top-0 h-full bg-[#11ffa1] shadow-[0_0_15px_#11ffa1] rounded-full"
                style={{ width: "0%" }}
              />
              <div className="absolute inset-0 flex justify-between items-center -top-[3px]">
                {PROBLEMS.map((_, i) => (
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
          <div className="relative w-full h-[400px] sm:h-[350px] flex items-center justify-start">
            {PROBLEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className="absolute inset-0 flex flex-col justify-center items-start text-left will-change-[transform,opacity,filter]"
                >
                  {/* Ícono Flotante Iluminado y Badge */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-13 h-13 rounded-full liquid-pill flex items-center justify-center shrink-0 border border-[#11ffa1]/40 shadow-[0_0_28px_rgba(17,255,161,0.32)]">
                      <Icon className="w-5 h-5 text-[#11ffa1]" />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#11ffa1]">
                        DESAFÍO {item.number} · {item.tag}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono">
                        PUNTO CRÍTICO {index + 1} DE {PROBLEMS.length}
                      </span>
                    </div>
                  </div>

                  {/* Título Principal */}
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-[1.18] mb-4 tracking-tight max-w-2xl">
                    {item.title}
                  </h3>

                  {/* Descripción del Desafío */}
                  <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-5">
                    {item.description}
                  </p>

                  {/* Bloque de Resolución Técnica con Rayo de Luz Iluminado */}
                  <div className="relative border-l-2 border-[#11ffa1] pl-4 sm:pl-5 py-2.5 bg-gradient-to-r from-[#11ffa1]/12 via-[#11ffa1]/3 to-transparent rounded-r-xl max-w-2xl">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#11ffa1]" />
                      <span
                        className="text-[11px] font-mono uppercase tracking-wider font-semibold"
                        style={{ color: "var(--color-accent-text)" }}
                      >
                        Resolución técnica
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                      {item.resolution}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
