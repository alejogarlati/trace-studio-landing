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
    title: "Tu propio sistema interno, armado para cómo trabaja tu gente.",
    description:
      "En vez de forzar a tu equipo a usar un programa genérico lleno de vueltas, armamos las pantallas exactas que necesitan para controlar stock, pedidos, caja, cuentas corrientes y entregas.",
    points: [
      "Entrás desde el navegador en el local, el depósito o tu casa.",
      "Cada persona ve solo lo que le corresponde según su puesto.",
      "Queda registrado quién hizo cada movimiento y a qué hora.",
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
    title: "Números limpios al día para decidir sin adivinar.",
    description:
      "Tomamos los datos que ya genera tu negocio (ventas, compras, costos, listas de precios), los limpiamos automáticamente y te los mostramos en un tablero simple donde ves qué rinde y qué no.",
    points: [
      "Dejás de cruzar planillas a mano cada fin de mes.",
      "Ves el margen real limpio por producto, rubro o sucursal.",
      "Sabés qué mercadería rota rápido y cuál te está frenando capital.",
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
    title: "Que las tareas repetitivas se hagan solas en segundos.",
    description:
      "Si todos los meses alguien de tu equipo pasa horas copiando precios de un PDF o Excel a la tienda online, automatizamos ese circuito de punta a punta para que se actualice sin errores.",
    points: [
      "Actualización masiva de miles de precios y márgenes en segundos.",
      "Stock sincronizado entre el mostrador físico y la tienda web.",
      "Menos errores de carga manual y más tiempo para atender clientes.",
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
    title: "Una presencia web rápida, seria y pensada para vender.",
    description:
      "Desarrollamos sitios empresariales y catálogos digitales que abren al instante en cualquier celular, muestran con claridad lo que hacés y facilitan que te pidan presupuesto directo.",
    points: [
      "Carga rapidísima sin plantillas pesadas que se traban.",
      "Imagen sólida para respaldar presupuestos y licitaciones.",
      "Contacto directo al WhatsApp o correo de tu equipo comercial.",
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
              02 · QUÉ CONSTRUIMOS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
            Cuatro áreas concretas para ordenar y agilizar tu empresa.
          </h2>
        </div>

        {/* Capsule Tab Bar (iOS Liquid Glass Pills) */}
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
                className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#11ffa1] text-[#08080a] font-semibold shadow-[0_0_25px_rgba(17,255,161,0.28)]"
                    : "liquid-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Solution Liquid Glass Card */}
        <div className="liquid-glass p-7 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSolution.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Column: Direct Copy */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-pill text-xs font-mono text-[var(--text-secondary)]">
                  <strong style={{ color: "var(--color-accent-text)" }}>
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
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm sm:text-base text-[var(--text-primary)]"
                    >
                      <span className="w-5 h-5 rounded-full liquid-pill flex items-center justify-center shrink-0 mt-0.5">
                        <Check
                          className="w-3 h-3"
                          style={{ color: "var(--color-accent-text)" }}
                        />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3">
                  <a
                    href="#cotizador"
                    onClick={() =>
                      handleSelectForQuote(activeSolution.wizardOptionId)
                    }
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#11ffa1] hover:bg-[#00e58d] text-[#08080a] font-semibold text-sm shadow-[0_0_20px_rgba(17,255,161,0.25)] transition-all"
                  >
                    Consultar por esto
                    <ArrowRight className="w-4 h-4" />
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
        </div>
      </div>
    </section>
  );
}
