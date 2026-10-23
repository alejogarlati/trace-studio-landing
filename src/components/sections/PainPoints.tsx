"use client";

import { motion } from "framer-motion";
import {
  FileSpreadsheet,
  Lock,
  RefreshCw,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import PngSlot from "@/components/ui/PngSlot";

const PROBLEMS = [
  {
    number: "01",
    tag: "Operación diaria",
    title: "Cinco planillas distintas para saber qué hay en depósito",
    description:
      "Cuando el negocio crece, el Excel empieza a quedar chico: alguien borra una fórmula sin querer, los números no coinciden entre mostrador y administración, y nadie sabe cuál es el archivo válido.",
    resolution:
      "Armamos un sistema único donde cada sector carga y ve lo que le corresponde en el momento, desde el celular o la computadora.",
    pngPath: "/images/problemas/problema-01.png",
    pngLabel: "Gráfica PNG · Orden Operativo",
    icon: FileSpreadsheet,
  },
  {
    number: "02",
    tag: "Sistemas enlatados",
    title: "Pagar por un sistema rígido que usás por la mitad",
    description:
      "Los programas genéricos te obligan a adaptar tu negocio a sus pantallas, tienen cien botones que nadie toca y encima te cobran un abono mensual por cada empleado que entra.",
    resolution:
      "Construimos una herramienta hecha alrededor de tu flujo real, con las pantallas justas y sin cobrarte licencias por usuario.",
    pngPath: "/images/problemas/problema-02.png",
    pngLabel: "Gráfica PNG · Sistema a Medida",
    icon: Lock,
  },
  {
    number: "03",
    tag: "Tiempo perdido",
    title: "Días enteros actualizando listas de precios y stock a mano",
    description:
      "Recibir listas nuevas de proveedores, recalcular márgenes y subir los cambios uno por uno a la tienda online consume horas de gente que podría estar vendiendo.",
    resolution:
      "Automatizamos la lectura de listas y conectamos tu inventario con tus canales de venta para que los precios y el stock se actualicen solos.",
    pngPath: "/images/problemas/problema-03.png",
    pngLabel: "Gráfica PNG · Automatización",
    icon: RefreshCw,
  },
  {
    number: "04",
    tag: "Rentabilidad",
    title: "Vender mucho pero no tener claro dónde está la ganancia real",
    description:
      "Entre costos que cambian, comisiones, envíos y descuentos, muchas veces reponés mercadería por costumbre sin ver qué artículos te rinden de verdad.",
    resolution:
      "Limpiamos y cruzamos los datos de tus ventas y costos para dejarte un tablero claro con tus márgenes reales al día.",
    pngPath: "/images/problemas/problema-04.png",
    pngLabel: "Gráfica PNG · Rentabilidad y Datos",
    icon: BarChart3,
  },
];

export default function PainPoints() {
  return (
    <section
      id="problemas"
      className="relative py-24 sm:py-32 px-6 overflow-hidden"
    >
      {/* Circular Ambient Orbs in Background */}
      <div
        className="absolute top-1/3 left-10 w-[440px] h-[440px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "var(--orb-primary)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[380px] h-[380px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--orb-secondary)" }}
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
              01 · QUÉ PROBLEMAS SACAMOS DEL MEDIO
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
            Cuando la operación crece, los parches dejan de alcanzar.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            No hace falta complicarse con sistemas gigantes. Hace falta resolver
            los cuellos de botella concretos que hoy te hacen perder tiempo o
            plata.
          </p>
        </div>

        {/* 2x2 Liquid Glass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROBLEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="liquid-glass p-7 sm:p-9 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Pill & Circular Icon */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="px-3.5 py-1 rounded-full liquid-pill text-xs font-mono text-[var(--text-secondary)]">
                      <strong
                        className="mr-1.5"
                        style={{ color: "var(--color-accent-text)" }}
                      >
                        {item.number}
                      </strong>
                      {item.tag}
                    </span>

                    <div className="w-10 h-10 rounded-full liquid-pill flex items-center justify-center">
                      <Icon
                        className="w-4 h-4"
                        style={{ color: "var(--color-accent-text)" }}
                      />
                    </div>
                  </div>

                  {/* PNG Design Slot */}
                  <div className="mb-6">
                    <PngSlot
                      src={item.pngPath}
                      alt={item.title}
                      label={item.pngLabel}
                      resolutionHint="900 × 500 px · PNG transparente"
                      aspectClass="aspect-[16/9]"
                    />
                  </div>

                  {/* Problem Title & Natural Copy */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* How we solve it - Nested Liquid Glass Subtle */}
                <div className="mt-6 p-5 liquid-glass-subtle flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="block text-[11px] font-mono uppercase tracking-wider mb-1"
                      style={{ color: "var(--color-accent-text)" }}
                    >
                      Cómo lo resolvemos
                    </span>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      {item.resolution}
                    </p>
                  </div>

                  <a
                    href="#cotizador"
                    className="w-9 h-9 rounded-full liquid-pill flex items-center justify-center shrink-0 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors"
                    aria-label={item.title}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
