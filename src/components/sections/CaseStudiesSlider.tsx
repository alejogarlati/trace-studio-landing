"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import PngSlot from "@/components/ui/PngSlot";

interface CaseStudy {
  id: string;
  number: string;
  client: string;
  sector: string;
  summary: string;
  workDone: string;
  pngPath: string;
  pngLabel: string;
  metrics: {
    value: string;
    label: string;
  }[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "corralon-aconquija",
    number: "01",
    client: "Corralón Aconquija S.R.L",
    sector: "Materiales de construcción · Mayorista y minorista",
    summary:
      "Manejaban miles de artículos con listas de precios distintas por proveedor y el stock de la tienda online quedaba desfasado del mostrador.",
    workDone:
      "Armamos herramientas automáticas para limpiar listas masivas, recalcular precios en segundos y mantener la tienda online al día sin cargar producto por producto.",
    pngPath: "/images/casos/caso-01.png",
    pngLabel: "Gráfica PNG · Caso Corralón Aconquija",
    metrics: [
      {
        value: "+10.000",
        label: "Artículos procesados y sincronizados",
      },
      {
        value: "-90%",
        label: "Menos tiempo actualizando precios",
      },
      {
        value: "Al día",
        label: "Catálogo online sincronizado con depósito",
      },
    ],
  },
  {
    id: "soluciones-proyectables",
    number: "02",
    client: "Soluciones Proyectables S.R.L",
    sector: "Construcción y obras civiles",
    summary:
      "Necesitaban una presencia institucional seria que mostrara la escala de sus obras y sirviera de respaldo al presentarse en licitaciones y proyectos privados.",
    workDone:
      "Diseñamos y desarrollamos su sitio web corporativo desde cero, priorizando velocidad de carga en celulares, claridad en los servicios y contacto directo.",
    pngPath: "/images/casos/caso-02.png",
    pngLabel: "Gráfica PNG · Caso Soluciones Proyectables",
    metrics: [
      {
        value: "Instantánea",
        label: "Apertura en celulares y escritorio",
      },
      {
        value: "100%",
        label: "Hecho a medida de su identidad",
      },
      {
        value: "Directo",
        label: "Canal comercial para presupuestos de obra",
      },
    ],
  },
  {
    id: "sistema-erp",
    number: "03",
    client: "Sistema de Gestión Operativa (ERP)",
    sector: "Administración interna y control de stock",
    summary:
      "La operación diaria dependía de planillas sueltas: costaba seguir los saldos pendientes y ver con claridad quién había movido mercadería.",
    workDone:
      "Construimos un sistema web propio con base de datos unificada, control de caja, movimientos de stock y accesos separados para administración, ventas y depósito.",
    pngPath: "/images/casos/caso-03.png",
    pngLabel: "Gráfica PNG · Caso Sistema ERP",
    metrics: [
      {
        value: "Unificado",
        label: "Stock, caja y pedidos en un solo lugar",
      },
      {
        value: "Por rol",
        label: "Permisos separados para cada empleado",
      },
      {
        value: "$0",
        label: "Costo mensual en licencias de terceros",
      },
    ],
  },
];

export default function CaseStudiesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? CASE_STUDIES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === CASE_STUDIES.length - 1 ? 0 : prev + 1
    );
  };

  const currentCase = CASE_STUDIES[currentIndex];

  return (
    <section id="casos" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      {/* Circular Ambient Orbs */}
      <div
        className="absolute bottom-0 left-1/4 w-[520px] h-[520px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "var(--orb-primary)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header + Circular Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-pill text-xs font-mono mb-4">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              <span style={{ color: "var(--color-accent-text)" }}>
                03 · TRABAJOS REALES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
              Proyectos concretos hechos para empresas de acá.
            </h2>
          </div>

          {/* Circular Slider Controls */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full liquid-pill flex items-center justify-center text-[var(--text-primary)] hover:border-[#11ffa1]/50 transition-all cursor-pointer"
              aria-label="Trabajo anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="px-4 py-2.5 rounded-full liquid-pill font-mono text-xs text-[var(--text-secondary)]">
              <strong style={{ color: "var(--color-accent-text)" }}>
                {currentCase.number}
              </strong>{" "}
              / 0{CASE_STUDIES.length}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-full liquid-pill flex items-center justify-center text-[var(--text-primary)] hover:border-[#11ffa1]/50 transition-all cursor-pointer"
              aria-label="Siguiente trabajo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Capsule Case Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          {CASE_STUDIES.map((cs, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={cs.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#11ffa1] text-[#08080a] font-semibold shadow-sm"
                    : "liquid-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cs.number} · {cs.client}
              </button>
            );
          })}
        </div>

        {/* Main Liquid Glass Case Card */}
        <div className="liquid-glass p-7 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.32 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Column: Story & Metrics */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span
                    className="text-xs font-mono uppercase tracking-wider block mb-2"
                    style={{ color: "var(--color-accent-text)" }}
                  >
                    {currentCase.sector}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                    {currentCase.client}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 liquid-glass-subtle">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                      Con qué se encontraban
                    </span>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {currentCase.summary}
                    </p>
                  </div>

                  <div className="p-4 liquid-glass-subtle">
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider block mb-1"
                      style={{ color: "var(--color-accent-text)" }}
                    >
                      Qué armamos
                    </span>
                    <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
                      {currentCase.workDone}
                    </p>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {currentCase.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-3.5 liquid-glass-subtle flex flex-col justify-center"
                    >
                      <span
                        className="font-display text-lg sm:text-2xl font-bold tracking-tight"
                        style={{ color: "var(--color-accent-text)" }}
                      >
                        {metric.value}
                      </span>
                      <span className="mt-1 text-[11px] sm:text-xs text-[var(--text-secondary)] leading-snug">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="#cotizador"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-pill text-xs font-medium text-[var(--text-primary)] hover:border-[#11ffa1]/40 transition-all"
                  >
                    Necesito algo parecido
                    <ArrowUpRight
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--color-accent-text)" }}
                    />
                  </a>
                </div>
              </div>

              {/* Right Column: PNG Showcase Slot */}
              <div className="lg:col-span-6">
                <PngSlot
                  src={currentCase.pngPath}
                  alt={currentCase.client}
                  label={currentCase.pngLabel}
                  resolutionHint="1400 × 900 px · PNG transparente"
                  aspectClass="aspect-[16/10]"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
