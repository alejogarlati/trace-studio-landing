"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
    title: "Sistemas de gestión interna diseñados para su operatoria.",
    description:
      "Plataformas web para controlar inventario, pedidos, facturación, cuentas corrientes y logística desde cualquier sucursal, sin intermediarios.",
    points: [
      "Acceso web seguro desde cualquier sucursal o puesto de trabajo.",
      "Permisos y niveles de visualización segmentados por rol.",
      "Registro de auditoría con fecha, hora y responsable de cada movimiento.",
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
    title: "Tableros de control con datos comerciales y financieros al día.",
    description:
      "Unificamos la información de ventas, compras y stock para mostrar métricas claras sin esperar al cierre de mes ni cruzar planillas a mano.",
    points: [
      "Cálculo automático de márgenes netos por producto y canal de venta.",
      "Control de rotación de mercadería y capital inmovilizado en depósito.",
      "Reportes inmediatos de cobranzas y cuentas corrientes pendientes.",
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
    title: "Automatización de tareas repetitivas y sincronización de datos.",
    description:
      "Conectamos proveedores, bases de datos y canales de venta para que las listas de precios y el inventario se actualicen solos.",
    points: [
      "Ingesta y normalización de listas de precios masivas en segundos.",
      "Sincronización automática de stock entre depósitos y tiendas web.",
      "Eliminación de la carga manual y los errores de tipeo en precios.",
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
    title: "Sitios web corporativos y catálogos de venta directa.",
    description:
      "Plataformas web rápidas y a medida para mostrar obras, productos o servicios y recibir consultas comerciales directas.",
    points: [
      "Carga instantánea en celular y escritorio, sin plantillas pesadas.",
      "Catálogo estructurado con buscador rápido y filtros por rubro.",
      "Canal de cotizaciones conectado directo a su WhatsApp o correo.",
    ],
    pngPath: "/images/soluciones/solucion-04.png",
    pngLabel: "Gráfica PNG · Plataforma Web",
    icon: Globe,
  },
];

export default function SolutionsTabs() {
  const [activeTabId, setActiveTabId] = useState<string>(SOLUTIONS[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeSolution =
    SOLUTIONS.find((s) => s.id === activeTabId) || SOLUTIONS[0];

  useGSAP(
    () => {
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

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
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
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

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
      ref={sectionRef}
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
        <div ref={headerRef} className="max-w-3xl mb-12">
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
            Herramientas hechas para resolver problemas concretos de su operación.
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
        <div ref={cardRef}>
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
      </div>
    </section>
  );
}
