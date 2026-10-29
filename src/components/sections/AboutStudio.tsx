"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MessageSquareCode, KeyRound } from "lucide-react";
import PngSlot from "@/components/ui/PngSlot";

const PILLARS = [
  {
    title: "Rigor técnico y arquitectura sólida",
    description:
      "Formación académica en ingeniería (UTN) y aplicación de estándares modernos en desarrollo de software y bases de datos.",
    icon: ShieldCheck,
  },
  {
    title: "Interlocución técnica directa",
    description:
      "Comunicación fluida y directa entre los responsables de la empresa y los ingenieros a cargo del proyecto, sin intermediarios comerciales.",
    icon: MessageSquareCode,
  },
  {
    title: "Activos tecnológicos propios",
    description:
      "Desarrollamos herramientas propietarias para su empresa, sin dependencia de licencias mensuales recurrentes por usuario.",
    icon: KeyRound,
  },
];

export default function AboutStudio() {
  return (
    <section id="estudio" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      {/* Circular Ambient Orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "var(--orb-primary)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="liquid-glass p-8 sm:p-12 lg:p-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Manifesto */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-pill text-xs font-mono">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--color-accent)" }}
                />
                <span style={{ color: "var(--color-accent-text)" }}>
                  05 · PROPUESTA INSTITUCIONAL
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                Ingeniería de software con enfoque en la eficiencia operativa.
              </h2>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                Trace Studio surge como alternativa para empresas que requieren
                soluciones tecnológicas específicas: aquellas que se encuentran
                limitadas por la rigidez de los sistemas estándar o por los tiempos
                extensos de las agencias tradicionales de desarrollo.
              </p>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                Combinamos formación técnica en ingeniería (UTN) con experiencia
                directa en procesos empresariales. Diseñamos herramientas
                propietarias orientadas a reducir tiempos de gestión, garantizar
                la integridad de los datos y asegurar que el software pertenezca
                íntegramente a la empresa.
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

          {/* 3 Institutional Pillars */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="p-6 liquid-glass-subtle">
                  <div className="w-10 h-10 rounded-full liquid-pill flex items-center justify-center mb-4">
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "var(--color-accent-text)" }}
                    />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
