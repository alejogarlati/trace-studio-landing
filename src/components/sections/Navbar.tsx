"use client";

import { useState, useRef } from "react";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navContainerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pill = pillRef.current;
      if (!pill) return;

      // ScrollTrigger para elevar la barra con precisión Vercel al hacer scroll
      ScrollTrigger.create({
        start: "top -20",
        onEnter: () => {
          gsap.to(pill, {
            backgroundColor: "rgba(8, 8, 10, 0.82)",
            borderColor: "rgba(17, 255, 161, 0.25)",
            boxShadow: "0 12px 36px -10px rgba(0, 0, 0, 0.65), 0 0 20px rgba(17, 255, 161, 0.08)",
            duration: 0.35,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(pill, {
            backgroundColor: "var(--glass-bg)",
            borderColor: "var(--glass-border)",
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            duration: 0.3,
            ease: "power2.out",
          });
        },
      });
    },
    { scope: navContainerRef }
  );

  return (
    <header ref={navContainerRef} className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
      <div
        ref={pillRef}
        className="max-w-5xl mx-auto liquid-pill px-5 py-3 flex items-center justify-between transition-all duration-300 border border-[var(--glass-border)]"
      >
        {/* Brand Mark - Circular Dot + Typography */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full liquid-pill flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#11ffa1] shadow-[0_0_10px_#11ffa1]" />
          </div>
          <span className="font-display font-bold text-sm tracking-wider uppercase text-[var(--text-primary)]">
            TRACE{" "}
            <span
              className="font-mono text-xs font-normal"
              style={{ color: "var(--color-accent-text)" }}
            >
              STUDIO
            </span>
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-[var(--text-secondary)]">
          <a
            href="#problemas"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Desafíos
          </a>
          <a
            href="#soluciones"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Soluciones
          </a>
          <a
            href="#enfoque"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Enfoque
          </a>
          <a
            href="#proceso"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Metodología
          </a>
          <a
            href="#estudio"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Estudio
          </a>
        </nav>

        {/* Actions: Theme Toggle + Primary Pill CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full liquid-pill flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label={
              theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
            }
            title={
              theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#11ffa1]" />
            ) : (
              <Moon className="w-4 h-4 text-[#0a312d]" />
            )}
          </button>

          <a
            href="#cotizador"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-full bg-[#11ffa1] hover:bg-[#00e58d] text-[#08080a] shadow-[0_0_20px_rgba(17,255,161,0.25)] transition-all"
          >
            Consultar viabilidad
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full liquid-pill flex items-center justify-center text-[var(--text-secondary)] cursor-pointer"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#11ffa1]" />
            ) : (
              <Moon className="w-4 h-4 text-[#0a312d]" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full liquid-pill flex items-center justify-center text-[var(--text-secondary)]"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Liquid Glass Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-5xl mx-auto mt-2 liquid-glass p-5 flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
          <a
            href="#problemas"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[var(--text-primary)] py-1.5"
          >
            Desafíos
          </a>
          <a
            href="#soluciones"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[var(--text-primary)] py-1.5"
          >
            Soluciones
          </a>
          <a
            href="#enfoque"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[var(--text-primary)] py-1.5"
          >
            Enfoque
          </a>
          <a
            href="#proceso"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[var(--text-primary)] py-1.5"
          >
            Metodología
          </a>
          <a
            href="#estudio"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[var(--text-primary)] py-1.5"
          >
            Estudio
          </a>
          <a
            href="#cotizador"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-3 rounded-full bg-[#11ffa1] text-[#08080a] mt-1"
          >
            Consultar viabilidad
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </header>
  );
}
