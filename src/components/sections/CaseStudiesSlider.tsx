"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import PngSlot from "@/components/ui/PngSlot";
import SpotlightCard from "@/components/ui/SpotlightCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

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
    sector: "Distribución de materiales de construcción · Venta mayorista y minorista",
    summary:
      "Administraban miles de artículos con listas de precios heterogéneas por proveedor, provocando desfasajes entre el inventario del depósito y el catálogo digital.",
    workDone:
      "Desarrollamos herramientas automatizadas para la normalización de listas masivas, recálculo de precios y sincronización continua con la tienda online.",
    pngPath: "/images/casos/caso-01.png",
    pngLabel: "Gráfica PNG · Caso Corralón Aconquija",
    metrics: [
      {
        value: "+10.000",
        label: "Artículos procesados y sincronizados",
      },
      {
        value: "-90%",
        label: "Tiempo invertido en actualización",
      },
      {
        value: "Tiempo real",
        label: "Sincronización entre inventario y web",
      },
    ],
  },
  {
    id: "soluciones-proyectables",
    number: "02",
    client: "Soluciones Proyectables S.R.L",
    sector: "Construcción e ingeniería civil",
    summary:
      "Requerían una plataforma web corporativa que reflejara la escala de sus obras y funcionara como respaldo institucional en licitaciones y proyectos privados.",
    workDone:
      "Diseñamos y desarrollamos el sitio web institucional bajo estándares de alto rendimiento, estructurando el catálogo de obras y optimizando el canal de cotizaciones.",
    pngPath: "/images/casos/caso-02.png",
    pngLabel: "Gráfica PNG · Caso Soluciones Proyectables",
    metrics: [
      {
        value: "Alto rendimiento",
        label: "Carga optimizada en móvil y escritorio",
      },
      {
        value: "100% personalizada",
        label: "Arquitectura desarrollada para su identidad",
      },
      {
        value: "Canal directo",
        label: "Recepción de solicitudes de presupuesto",
      },
    ],
  },
  {
    id: "sistema-erp",
    number: "03",
    client: "Sistema de Gestión Operativa (ERP)",
    sector: "Administración comercial y control de inventario",
    summary:
      "La gestión operativa dependía de archivos desconectados, lo que dificultaba el seguimiento de saldos y la trazabilidad de los movimientos de mercadería.",
    workDone:
      "Construimos un sistema web centralizado con base de datos unificada, módulos de facturación, caja, control de stock y accesos diferenciados por área.",
    pngPath: "/images/casos/caso-03.png",
    pngLabel: "Gráfica PNG · Caso Sistema ERP",
    metrics: [
      {
        value: "Centralizado",
        label: "Inventario, cobranzas y pedidos unificados",
      },
      {
        value: "Seguridad por rol",
        label: "Permisos y auditoría por puesto de trabajo",
      },
      {
        value: "$0 licencias",
        label: "Propiedad total sin abonos recurrentes por usuario",
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
                03 · CASOS DE DESARROLLO
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
              Proyectos implementados y resultados operativos.
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

        {/* Main Spotlight Case Card */}
        <SpotlightCard className="p-7 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase.id}
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                  <div className="p-4 liquid-glass-subtle rounded-xl">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                      Situación inicial
                    </span>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {currentCase.summary}
                    </p>
                  </div>

                  <div className="p-4 liquid-glass-subtle rounded-xl border-l-2 border-[#11ffa1]/70">
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider block mb-1"
                      style={{ color: "var(--color-accent-text)" }}
                    >
                      Solución implementada
                    </span>
                    <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
                      {currentCase.workDone}
                    </p>
                  </div>
                </div>

                {/* 3 Metric Pills with Animated Rolling Numbers */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {currentCase.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-3.5 liquid-glass-subtle rounded-xl flex flex-col justify-center border border-[var(--glass-border)] hover:border-[#11ffa1]/30 transition-colors"
                    >
                      <AnimatedCounter
                        value={metric.value}
                        className="font-display text-lg sm:text-2xl font-bold tracking-tight text-[#11ffa1]"
                      />
                      <span className="mt-1 text-[11px] sm:text-xs text-[var(--text-secondary)] leading-snug">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="#cotizador"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-pill text-xs font-medium text-[var(--text-primary)] hover:border-[#11ffa1]/40 hover:bg-white/[0.04] transition-all"
                  >
                    Solicitar una solución similar
                    <ArrowUpRight
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#11ffa1]"
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
        </SpotlightCard>
      </div>
    </section>
  );
}
