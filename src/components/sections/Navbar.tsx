"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
      <div
        className={`max-w-5xl mx-auto liquid-pill px-5 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "shadow-2xl" : ""
        }`}
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
            href="#casos"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Casos de estudio
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
            Solicitar cotización
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
            href="#casos"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[var(--text-primary)] py-1.5"
          >
            Casos de estudio
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
            Solicitar cotización
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </header>
  );
}
