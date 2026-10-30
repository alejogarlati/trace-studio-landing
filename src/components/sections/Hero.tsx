"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import HeroCanvasOptionA from "@/components/canvas/HeroCanvasOptionA";

export default function Hero() {
  const handleScrollDown = () => {
    const target = document.getElementById("problemas");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-28 sm:pt-36 sm:pb-32 px-6 overflow-hidden">
      {/* 3D Circular Canvas Background - Hero A (Orbes Líquidos / Metaballs) */}
      <HeroCanvasOptionA />

      {/* Circular Ambient Orbs in Background */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "var(--orb-primary)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 right-1/4 w-[320px] h-[320px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: "var(--orb-secondary)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto">
        {/* Borderless Hero Content (Sin card delimitadora) */}
        <motion.div
          id="hero-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="w-full flex flex-col items-center"
        >
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] max-w-3xl mx-auto">
            Desarrollo de software a medida y automatización para la operación
            de su empresa.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Diseñamos y construimos sistemas adaptados a sus procesos comerciales
            y logísticos. Reemplazamos la gestión dispersa en planillas y las
            limitaciones del software estándar por herramientas desarrolladas
            para su flujo real de trabajo.
          </p>

          {/* Rounded Capsule CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#cotizador"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#11ffa1] hover:bg-[#00e58d] text-[#08080a] font-semibold text-sm shadow-[0_0_25px_rgba(17,255,161,0.3)] transition-all"
            >
              Solicitar diagnóstico operativo
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#casos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full liquid-pill text-[var(--text-primary)] hover:border-[#11ffa1]/40 font-medium text-sm transition-all"
            >
              Ver casos de desarrollo
            </a>
          </div>
        </motion.div>
      </div>

      {/* Flechita central debajo del hero que guía a la próxima sección */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <button
          type="button"
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2 text-xs font-mono text-[var(--text-muted)] hover:text-[#11ffa1] transition-colors cursor-pointer"
          aria-label="Desplazarse a la siguiente sección"
        >
          <div className="w-10 h-10 rounded-full liquid-pill flex items-center justify-center border border-[var(--glass-border)] group-hover:border-[#11ffa1]/60 group-hover:shadow-[0_0_20px_rgba(17,255,161,0.25)] transition-all">
            <ArrowDown className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[#11ffa1] transition-transform duration-300 group-hover:translate-y-0.5 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
