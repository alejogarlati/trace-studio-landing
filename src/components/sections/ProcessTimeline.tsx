"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, PenTool, Layers, Rocket } from "lucide-react";

const TRACE_STEPS = [
  {
    number: "01",
    title: "Nos sentamos a entender tu operación",
    subtitle: "Relevamiento real",
    description:
      "Vemos cómo trabajan hoy, dónde se traban los pedidos o las planillas y qué es lo primero que conviene ordenar. Te pasamos una propuesta concreta con alcance y valor cerrado.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Armamos el esquema de pantallas",
    subtitle: "Diseño práctico",
    description:
      "Antes de programar, definimos cómo se va a ver y usar cada pantalla para que sea cómoda y rápida para la gente que trabaja todos los días en el negocio.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Construimos mostrando avances reales",
    subtitle: "Entregas por etapas",
    description:
      "No desaparecemos tres meses. Vamos armando el sistema por partes funcionales y te las mostramos semana a semana para que las pruebes y ajustemos a tiempo.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Lo dejamos andando con tu equipo",
    subtitle: "Puesta en marcha",
    description:
      "Ponemos el sistema en marcha, le explicamos paso a paso a tu gente cómo usarlo sin complicarse y quedamos a disposición para acompañarte.",
    icon: Rocket,
  },
];

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number>(3);

  return (
    <section id="proceso" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      {/* Circular Ambient Orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "var(--orb-primary)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-pill text-xs font-mono mb-4">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            <span style={{ color: "var(--color-accent-text)" }}>
              04 · CÓMO TRABAJAMOS (EL TRAZADO)
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
            Un camino derecho desde la idea hasta el sistema andando.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Por eso nos llamamos{" "}
            <strong className="text-[var(--text-primary)] font-medium">
              Trace
            </strong>
            : trazamos una ruta corta y ordenada para que sepas en todo momento
            qué estamos haciendo y cuándo va a estar listo.
          </p>
        </div>

        {/* Horizontal Circular Nodes Connector (Desktop) */}
        <div className="hidden lg:block relative mb-10 px-10">
          <div className="h-[2px] w-full bg-[var(--glass-border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#11ffa1] shadow-[0_0_15px_#11ffa1]"
              initial={{ width: "25%" }}
              animate={{
                width: `${((activeStep + 1) / TRACE_STEPS.length) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-4 -mt-3.5">
            {TRACE_STEPS.map((step, index) => {
              const isReached = index <= activeStep;
              return (
                <div key={step.number} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                    className={`w-7 h-7 rounded-full liquid-pill flex items-center justify-center transition-all cursor-pointer ${
                      isReached ? "border-[#11ffa1]" : ""
                    }`}
                    aria-label={`Paso ${step.number}`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        isReached
                          ? "bg-[#11ffa1] shadow-[0_0_8px_#11ffa1]"
                          : "bg-[var(--text-muted)]"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Liquid Glass Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRACE_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isHighlighted = index === activeStep;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
                className={`liquid-glass p-7 flex flex-col justify-between cursor-pointer ${
                  isHighlighted ? "border-[#11ffa1]/50" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="px-3 py-1 rounded-full liquid-pill font-mono text-xs font-semibold"
                      style={{ color: "var(--color-accent-text)" }}
                    >
                      PASO {step.number}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isHighlighted
                          ? "bg-[#11ffa1] text-[#08080a]"
                          : "liquid-pill text-[var(--color-accent-text)]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                    {step.subtitle}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
