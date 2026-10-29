"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  MessageSquare,
  RotateCcw,
  Layers,
  BarChart2,
  Workflow,
  Globe,
  HelpCircle,
} from "lucide-react";

const STEP_1_OPTIONS = [
  {
    id: "gestion",
    label: "Sistema de gestión interna a medida (ERP)",
    description: "Control de inventario, pedidos, facturación, cuentas corrientes y logística.",
    icon: Layers,
  },
  {
    id: "datos",
    label: "Consolidación de datos y tableros analíticos (BI)",
    description: "Centralización de métricas comerciales y márgenes netos en tiempo real.",
    icon: BarChart2,
  },
  {
    id: "automatizacion",
    label: "Automatización de procesos y sincronización de datos",
    description: "Integración de listas de precios, stock y canales de venta sin intervención manual.",
    icon: Workflow,
  },
  {
    id: "web",
    label: "Plataforma web institucional o catálogo digital",
    description: "Arquitectura web corporativa optimizada para velocidad y captación comercial.",
    icon: Globe,
  },
  {
    id: "diagnostico",
    label: "Evaluación y diagnóstico general",
    description: "Relevamiento conjunto de los procesos y necesidades técnicas de la empresa.",
    icon: HelpCircle,
  },
];

const STEP_2_OPTIONS = [
  {
    id: "empezando",
    label: "Estructurando y formalizando procesos",
    description: "Buscamos implementar una base tecnológica sólida desde el inicio.",
  },
  {
    id: "excel-saturado",
    label: "Gestión basada en planillas que resultan insuficientes",
    description: "Inconsistencias y demoras por dispersión de archivos entre áreas.",
  },
  {
    id: "enlatado-limitado",
    label: "Sistema estándar rígido que no se adapta a la operación",
    description: "Costos de licencias por usuario y funciones que no cubren los requerimientos.",
  },
  {
    id: "automatizar-canales",
    label: "Operación comercial activa con sobrecarga administrativa",
    description: "Necesidad de optimizar tareas repetitivas y sincronizar información.",
  },
];

const STEP_3_OPTIONS = [
  {
    id: "urgente",
    label: "Inmediato (1 a 4 semanas)",
    description: "Requerimiento operativo para resolver en el corto plazo.",
  },
  {
    id: "medio-plazo",
    label: "Planificado (2 a 3 meses)",
    description: "Implementación por fases y despliegue programado.",
  },
  {
    id: "explorando",
    label: "Evaluación técnica y presupuestaria",
    description: "Relevamiento de alcances, especificaciones técnicas y costos.",
  },
];

export default function InteractiveWizard() {
  const [step, setStep] = useState<number>(1);
  const [selectedSolution, setSelectedSolution] = useState<string>(
    STEP_1_OPTIONS[0].id
  );
  const [selectedSituation, setSelectedSituation] = useState<string>(
    STEP_2_OPTIONS[1].id
  );
  const [selectedTimeline, setSelectedTimeline] = useState<string>(
    STEP_3_OPTIONS[0].id
  );

  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [challenge, setChallenge] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const handlePreselect = (e: Event) => {
      const customEvent = e as CustomEvent<{ solutionId?: string }>;
      if (customEvent.detail?.solutionId) {
        setSelectedSolution(customEvent.detail.solutionId);
        setStep(2);
      }
    };
    window.addEventListener("trace:select-solution", handlePreselect);
    return () =>
      window.removeEventListener("trace:select-solution", handlePreselect);
  }, []);

  const solutionObj =
    STEP_1_OPTIONS.find((o) => o.id === selectedSolution) || STEP_1_OPTIONS[0];
  const situationObj =
    STEP_2_OPTIONS.find((o) => o.id === selectedSituation) || STEP_2_OPTIONS[0];
  const timelineObj =
    STEP_3_OPTIONS.find((o) => o.id === selectedTimeline) || STEP_3_OPTIONS[0];

  const buildWhatsAppUrl = () => {
    const lines = [
      `Hola! Les escribo desde la web de *Trace Studio*:`,
      ``,
      `• *Nombre:* ${name || "No especificado"}`,
      `• *Empresa:* ${company || "No especificada"}`,
      `• *Contacto:* ${contact || "No especificado"}`,
      ``,
      `• *Qué buscamos:* ${solutionObj.label}`,
      `• *Situación actual:* ${situationObj.label}`,
      `• *Plazo:* ${timelineObj.label}`,
    ];
    if (challenge.trim()) {
      lines.push(`• *Comentario:* ${challenge.trim()}`);
    }
    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/5493812203431?text=${text}`;
  };

  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Consulta Trace Studio - ${company || name || "Nuevo Proyecto"}`
    );
    const body = encodeURIComponent(
      [
        `Estimado equipo de Trace Studio,`,
        ``,
        `Les dejo los datos de nuestra consulta desde la web:`,
        ``,
        `- Nombre: ${name}`,
        `- Empresa: ${company}`,
        `- Contacto: ${contact}`,
        ``,
        `- Qué buscamos: ${solutionObj.label}`,
        `- Situación actual: ${situationObj.label}`,
        `- Plazo: ${timelineObj.label}`,
        challenge.trim() ? `- Comentario: ${challenge.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );
    return `mailto:gabrielgarlati@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
  };

  return (
    <section
      id="cotizador"
      className="relative py-24 sm:py-32 px-6 overflow-hidden"
    >
      <div id="contacto" className="absolute -top-20" aria-hidden="true" />

      {/* Circular Ambient Orbs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "var(--orb-primary)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-pill text-xs font-mono mb-4">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            <span style={{ color: "var(--color-accent-text)" }}>
              06 · DIAGNÓSTICO Y COTIZACIÓN
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
            Solicitar propuesta técnica y económica
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Seleccione las características de su requerimiento para coordinar
            una reunión de evaluación inicial.
          </p>
        </div>

        {/* Liquid Glass Wizard Container */}
        <div className="liquid-glass p-7 sm:p-10 lg:p-12">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-mono mb-3">
              <span style={{ color: "var(--color-accent-text)" }}>
                {submitted ? "LISTO PARA ENVIAR" : `PASO 0${step} DE 04`}
              </span>
              <span className="text-[var(--text-secondary)]">
                {step === 1 && "Qué necesitás"}
                {step === 2 && "Cómo están hoy"}
                {step === 3 && "Para cuándo"}
                {step === 4 && "Tus datos"}
              </span>
            </div>

            {/* Capsule Progress Bar */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => !submitted && setStep(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx <= step || submitted
                      ? "bg-[#11ffa1] shadow-[0_0_10px_rgba(17,255,161,0.4)]"
                      : "bg-[var(--glass-border)]"
                  }`}
                  aria-label={`Ir al paso ${idx}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                      1. ¿Qué requerimiento operativo busca resolver?
                    </h3>

                    <div className="grid grid-cols-1 gap-3">
                      {STEP_1_OPTIONS.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = selectedSolution === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSelectedSolution(opt.id);
                              setStep(2);
                            }}
                            className={`w-full p-4 sm:p-5 liquid-glass-subtle text-left transition-all flex items-center justify-between gap-4 cursor-pointer ${
                              isSelected ? "border-[#11ffa1]" : ""
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? "bg-[#11ffa1] text-[#08080a]"
                                    : "liquid-pill text-[var(--color-accent-text)]"
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="font-display font-semibold text-sm sm:text-base text-[var(--text-primary)] block">
                                  {opt.label}
                                </span>
                                <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                                  {opt.description}
                                </span>
                              </div>
                            </div>
                            <ArrowRight
                              className="w-4 h-4 shrink-0"
                              style={{
                                color: isSelected
                                  ? "var(--color-accent-text)"
                                  : "var(--text-muted)",
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#11ffa1] hover:bg-[#00e58d] text-[#08080a] font-semibold text-sm transition-all cursor-pointer"
                      >
                        Siguiente
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                      2. ¿Cuál describe mejor la situación actual de su empresa?
                    </h3>

                    <div className="grid grid-cols-1 gap-3">
                      {STEP_2_OPTIONS.map((opt) => {
                        const isSelected = selectedSituation === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSelectedSituation(opt.id);
                              setStep(3);
                            }}
                            className={`w-full p-4 sm:p-5 liquid-glass-subtle text-left transition-all flex items-center justify-between gap-4 cursor-pointer ${
                              isSelected ? "border-[#11ffa1]" : ""
                            }`}
                          >
                            <div>
                              <span className="font-display font-semibold text-sm sm:text-base text-[var(--text-primary)] block">
                                {opt.label}
                              </span>
                              <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                                {opt.description}
                              </span>
                            </div>
                            <ArrowRight
                              className="w-4 h-4 shrink-0"
                              style={{
                                color: isSelected
                                  ? "var(--color-accent-text)"
                                  : "var(--text-muted)",
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-pill text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#11ffa1] hover:bg-[#00e58d] text-[#08080a] font-semibold text-sm transition-all cursor-pointer"
                      >
                        Siguiente
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                      3. ¿En qué plazo estima iniciar la implementación?
                    </h3>

                    <div className="grid grid-cols-1 gap-3">
                      {STEP_3_OPTIONS.map((opt) => {
                        const isSelected = selectedTimeline === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSelectedTimeline(opt.id);
                              setStep(4);
                            }}
                            className={`w-full p-4 sm:p-5 liquid-glass-subtle text-left transition-all flex items-center justify-between gap-4 cursor-pointer ${
                              isSelected ? "border-[#11ffa1]" : ""
                            }`}
                          >
                            <div>
                              <span className="font-display font-semibold text-sm sm:text-base text-[var(--text-primary)] block">
                                {opt.label}
                              </span>
                              <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                                {opt.description}
                              </span>
                            </div>
                            <ArrowRight
                              className="w-4 h-4 shrink-0"
                              style={{
                                color: isSelected
                                  ? "var(--color-accent-text)"
                                  : "var(--text-muted)",
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-pill text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#11ffa1] hover:bg-[#00e58d] text-[#08080a] font-semibold text-sm transition-all cursor-pointer"
                      >
                        Último paso
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                      4. Ingrese los datos de contacto de su empresa
                    </h3>

                    {/* Summary Box */}
                    <div className="p-4 liquid-glass-subtle space-y-2 text-xs">
                      <div
                        className="font-mono uppercase tracking-wider mb-1"
                        style={{ color: "var(--color-accent-text)" }}
                      >
                        REQUERIMIENTO SELECCIONADO:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[var(--text-secondary)]">
                        <div>
                          <strong className="text-[var(--text-primary)] block">
                            Solución requerida:
                          </strong>
                          {solutionObj.label}
                        </div>
                        <div>
                          <strong className="text-[var(--text-primary)] block">
                            Situación actual:
                          </strong>
                          {situationObj.label}
                        </div>
                        <div>
                          <strong className="text-[var(--text-primary)] block">
                            Plazo estimado:
                          </strong>
                          {timelineObj.label}
                        </div>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="wizard-name"
                          className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2"
                        >
                          Nombre y apellido *
                        </label>
                        <input
                          id="wizard-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ej. Martín Gómez"
                          className="w-full px-4 py-3.5 liquid-glass-subtle focus:border-[#11ffa1] focus:outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="wizard-company"
                          className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2"
                        >
                          Empresa o razón social *
                        </label>
                        <input
                          id="wizard-company"
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Ej. Distribuidora Norte S.R.L."
                          className="w-full px-4 py-3.5 liquid-glass-subtle focus:border-[#11ffa1] focus:outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="wizard-contact"
                        className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2"
                      >
                        Teléfono / WhatsApp o correo electrónico corporativo *
                      </label>
                      <input
                        id="wizard-contact"
                        type="text"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Ej. +54 381 ... o contacto@empresa.com"
                        className="w-full px-4 py-3.5 liquid-glass-subtle focus:border-[#11ffa1] focus:outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="wizard-challenge"
                        className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2"
                      >
                        Detalles adicionales sobre el requerimiento (Opcional)
                      </label>
                      <textarea
                        id="wizard-challenge"
                        rows={2}
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        placeholder="Ej. Requerimos centralizar el inventario de múltiples sucursales y conectar listas de proveedores..."
                        className="w-full px-4 py-3.5 liquid-glass-subtle focus:border-[#11ffa1] focus:outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full liquid-pill text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                      </button>

                      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <a
                          href={buildWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full liquid-pill text-xs sm:text-sm font-semibold hover:border-[#11ffa1] transition-all"
                          style={{ color: "var(--color-accent-text)" }}
                        >
                          <MessageSquare className="w-4 h-4" />
                          Enviar vía WhatsApp
                        </a>

                        <button
                          type="submit"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#11ffa1] hover:bg-[#00e58d] text-[#08080a] font-semibold text-sm shadow-[0_0_25px_rgba(17,255,161,0.25)] transition-all cursor-pointer"
                        >
                          Generar solicitud
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-14 h-14 rounded-full liquid-pill flex items-center justify-center mx-auto">
                  <CheckCircle2
                    className="w-7 h-7"
                    style={{ color: "var(--color-accent-text)" }}
                  />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                    Solicitud preparada para {company || "su empresa"}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                    Seleccione el canal de su preferencia para enviar la información al equipo técnico:
                  </p>
                </div>

                <div className="max-w-lg mx-auto p-5 liquid-glass-subtle text-left text-xs sm:text-sm space-y-2">
                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Contacto:{" "}
                    </span>
                    <strong className="text-[var(--text-primary)]">
                      {name} ({company})
                    </strong>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Medio de contacto:{" "}
                    </span>
                    <strong style={{ color: "var(--color-accent-text)" }}>
                      {contact}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Requerimiento:{" "}
                    </span>
                    <span className="text-[var(--text-primary)]">
                      {solutionObj.label}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#11ffa1] hover:bg-[#00e58d] text-[#08080a] font-semibold text-sm shadow-[0_0_25px_rgba(17,255,161,0.3)] transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Enviar vía WhatsApp
                  </a>

                  <a
                    href={buildMailtoUrl()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full liquid-pill text-[var(--text-primary)] font-medium text-sm transition-all"
                  >
                    <Send
                      className="w-4 h-4"
                      style={{ color: "var(--color-accent-text)" }}
                    />
                    Enviar por Correo Electrónico
                  </a>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Modificar respuestas
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
