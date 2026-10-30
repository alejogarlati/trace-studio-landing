"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  BarChart2,
  Workflow,
  Globe,
  Check,
  ArrowRight,
} from "lucide-react";
import PngSlot from "@/components/ui/PngSlot";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface SolutionItem {
  id: string;
  wizardOptionId: string;
  code: string;
  shortLabel: string;
  title: string;
  description: string;
  points: string[];
  pngPath: string;
  pngLabel: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const SOLUTIONS: SolutionItem[] = [
  {
    id: "gestion",
    wizardOptionId: "gestion",
    code: "01",
    shortLabel: "Sistemas de Gestión",
    title: "Sistemas de gestión interna desarrollados según el flujo de su equipo.",
    description:
      "Desarrollamos plataformas web para el control de inventario, pedidos, facturación, cuentas corrientes y logística, respetando la lógica operativa de la empresa.",
    points: [
      "Acceso seguro vía navegador desde cualquier sucursal o puesto de trabajo.",
      "Asignación de permisos y niveles de visualización segmentados por rol.",
      "Trazabilidad y registro de auditoría de cada movimiento realizado.",
    ],
    pngPath: "/images/soluciones/solucion-01.png",
    pngLabel: "Gráfica PNG · Sistema de Gestión",
    icon: Layers,
  },
  {
    id: "datos",
    wizardOptionId: "datos",
    code: "02",
    shortLabel: "Datos y Tableros",
    title: "Consolidación y análisis de métricas para la toma de decisiones.",
    description:
      "Estructuramos y limpiamos los datos generados por las diferentes áreas del negocio para proyectar tableros de control con indicadores comerciales y financieros precisos.",
    points: [
      "Eliminación de la consolidación manual de planillas al cierre de mes.",
      "Cálculo de márgenes netos por producto, categoría y punto de venta.",
      "Monitoreo de indicadores de rotación de mercadería y capital inmovilizado.",
    ],
    pngPath: "/images/soluciones/solucion-02.png",
    pngLabel: "Gráfica PNG · Inteligencia de Datos",
    icon: BarChart2,
  },
  {
    id: "automatizacion",
    wizardOptionId: "automatizacion",
    code: "03",
    shortLabel: "Automatizaciones",
    title: "Automatización de flujos de datos e integración de sistemas.",
    description:
      "Conectamos bases de datos, proveedores y plataformas de venta para ejecutar de forma automática tareas críticas de actualización y sincronización.",
    points: [
      "Procesamiento masivo de listas de precios y costos en segundos.",
      "Sincronización continua de inventario entre depósitos físicos y canales web.",
      "Reducción del margen de error humano en la transcripción de datos.",
    ],
    pngPath: "/images/soluciones/solucion-03.png",
    pngLabel: "Gráfica PNG · Automatización de Procesos",
    icon: Workflow,
  },
  {
    id: "plataformas",
    wizardOptionId: "web",
    code: "04",
    shortLabel: "Webs y Catálogos",
    title: "Sitios corporativos y catálogos digitales orientados a la conversión.",
    description:
      "Desarrollamos plataformas web institucionales con arquitectura moderna y carga instantánea, orientadas a presentar la propuesta comercial y canalizar consultas calificadas.",
    points: [
      "Rendimiento optimizado sin dependencia de plantillas prefabricadas.",
      "Arquitectura visual y técnica alineada a los estándares de la compañía.",
      "Canales de contacto directo integrados a los sistemas comerciales de la empresa.",
    ],
    pngPath: "/images/soluciones/solucion-04.png",
    pngLabel: "Gráfica PNG · Plataforma Web",
    icon: Globe,
  },
];

export default function SolutionsTabs() {
  const [activeTabId, setActiveTabId] = useState<string>(SOLUTIONS[0].id);
  const activeSolution =
    SOLUTIONS.find((s) => s.id === activeTabId) || SOLUTIONS[0];

  const handleSelectForQuote = (wizardOptionId: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("trace:select-solution", {
          detail: { solutionId: wizardOptionId },
        })
      );
    }
  };

  return (
    <section
      id="soluciones"
      className="relative py-24 sm:py-32 px-6 overflow-hidden"
    >
      {/* Circular Ambient Orbs */}
      <div
        className="absolute top-1/2 right-0 w-[520px] h-[520px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "var(--orb-primary)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-pill text-xs font-mono mb-4">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            <span style={{ color: "var(--color-accent-text)" }}>
              02 · ÁREAS DE DESARROLLO
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
            Soluciones de software estructuradas según la necesidad de su empresa.
          </h2>
        </div>

        {/* Capsule Tab Bar (Vercel Precision Active Indicator) */}
        <div
          className="flex flex-wrap items-center gap-2.5 mb-8"
          role="tablist"
          aria-label="Soluciones de Trace Studio"
        >
          {SOLUTIONS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTabId(tab.id)}
                className={`relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#11ffa1] text-[#08080a] font-semibold shadow-[0_0_25px_rgba(17,255,161,0.3)] scale-[1.02]"
                    : "liquid-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#11ffa1]/30"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#08080a]" : "text-[#11ffa1]"}`} />
                <span>{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Solution Spotlight Card */}
        <SpotlightCard className="p-7 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSolution.id}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Column: Direct Copy */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-pill text-xs font-mono text-[var(--text-secondary)] border border-[#11ffa1]/20">
                  <strong className="text-[#11ffa1]">
                    {activeSolution.code}
                  </strong>
                  <span>·</span>
                  <span>{activeSolution.shortLabel}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight">
                  {activeSolution.title}
                </h3>

                <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                  {activeSolution.description}
                </p>

                <ul className="space-y-3 pt-1">
                  {activeSolution.points.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.08 }}
                      className="flex items-start gap-3 text-sm sm:text-base text-[var(--text-primary)]"
                    >
                      <span className="w-5 h-5 rounded-full liquid-pill flex items-center justify-center shrink-0 mt-0.5 border border-[#11ffa1]/30 text-[#11ffa1]">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="pt-3">
                  <a
                    href="#cotizador"
                    onClick={() =>
                      handleSelectForQuote(activeSolution.wizardOptionId)
                    }
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#11ffa1] hover:bg-[#00e58d] text-[#08080a] font-semibold text-sm shadow-[0_0_20px_rgba(17,255,161,0.25)] transition-all overflow-hidden"
                  >
                    <span>Consultar por esta solución</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Right Column: Dedicated PNG Design Slot */}
              <div className="lg:col-span-6">
                <PngSlot
                  src={activeSolution.pngPath}
                  alt={activeSolution.shortLabel}
                  label={activeSolution.pngLabel}
                  resolutionHint="1200 × 800 px · PNG transparente"
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
