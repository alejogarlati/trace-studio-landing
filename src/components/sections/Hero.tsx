"use client";

import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroCanvasOptionA from "@/components/canvas/HeroCanvasOptionA";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const primaryCtaRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      // Timeline cinematográfica de entrada con easing Vercel (power3.out / expo.out)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: -12,
        scale: 0.94,
        duration: 0.6,
        delay: 0.1,
      })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 28,
            filter: "blur(8px)",
            duration: 0.75,
          },
          "-=0.35"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-cta-group",
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
          },
          "-=0.45"
        )
        .from(
          ".hero-scroll-indicator",
          {
            opacity: 0,
            y: -10,
            duration: 0.6,
          },
          "-=0.2"
        );

      // Micro-interacción magnética sutil en el botón CTA primario
      const primaryBtn = primaryCtaRef.current;
      if (primaryBtn) {
        const xTo = gsap.quickTo(primaryBtn, "x", {
          duration: 0.35,
          ease: "power2.out",
        });
        const yTo = gsap.quickTo(primaryBtn, "y", {
          duration: 0.35,
          ease: "power2.out",
        });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = primaryBtn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.22;
          const deltaY = (e.clientY - centerY) * 0.22;
          xTo(deltaX);
          yTo(deltaY);
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        primaryBtn.addEventListener("mousemove", handleMouseMove);
        primaryBtn.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          primaryBtn.removeEventListener("mousemove", handleMouseMove);
          primaryBtn.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    },
    { scope: containerRef }
  );

  const handleScrollDown = () => {
    const target = document.getElementById("problemas");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-28 sm:pt-36 sm:pb-32 px-6 overflow-hidden"
    >
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
        {/* Borderless Hero Content */}
        <div id="hero-card" className="w-full flex flex-col items-center">
          {/* Tech Pill Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-pill text-xs font-mono mb-6 border border-[#11ffa1]/20 shadow-[0_0_20px_rgba(17,255,161,0.08)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#11ffa1] shadow-[0_0_8px_#11ffa1] animate-pulse" />
            <span className="text-[#11ffa1] tracking-wider uppercase">
              Ingeniería de Software & Automatización
            </span>
          </div>

          {/* H1: Máximo 3 líneas en desktop, 4 en mobile */}
          <h1 className="hero-title font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.14] sm:leading-[1.1] max-w-3xl mx-auto text-balance">
            Software a medida y automatización para la operación de su empresa.
          </h1>

          <p className="hero-description mt-5 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed text-balance">
            Reemplazamos planillas desactualizadas y sistemas rígidos por herramientas construidas para su dinámica de trabajo.
          </p>

          {/* Rounded Capsule CTAs with Vercel Precision Glow */}
          <div className="hero-cta-group mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              ref={primaryCtaRef}
              href="#cotizador"
              className="relative group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#11ffa1] hover:bg-[#00e58d] text-[#08080a] font-semibold text-sm shadow-[0_0_25px_rgba(17,255,161,0.3)] transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Solicitar diagnóstico operativo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </a>
            <a
              href="#casos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full liquid-pill text-[var(--text-primary)] hover:border-[#11ffa1]/40 hover:bg-white/[0.04] font-medium text-sm transition-all"
            >
              Ver casos de desarrollo
            </a>
          </div>
        </div>
      </div>

      {/* Flechita central debajo del hero que guía a la próxima sección */}
      <div className="hero-scroll-indicator absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
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
