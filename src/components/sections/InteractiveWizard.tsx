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
    label: "Un sistema interno hecho a medida",
    description: "Control de stock, pedidos, caja, cuentas corrientes y usuarios.",
    icon: Layers,
  },
  {
    id: "datos",
    label: "Ordenar números y ver tableros de ganancia real",
    description: "Dejar de cruzar Excels a mano y tener métricas al día.",
    icon: BarChart2,
  },
  {
    id: "automatizacion",
    label: "Automatizar listas de precios o sincronizar stock",
    description: "Conectar proveedores, depósito y tienda online sin carga manual.",
    icon: Workflow,
  },
  {
    id: "web",
    label: "Sitio web empresarial o catálogo digital",
    description: "Una web rápida y seria para mostrar lo que hacés y recibir consultas.",
    icon: Globe,
  },
  {
    id: "diagnostico",
    label: "Todavía no sé bien, quiero charlarlo",
    description: "Vemos juntos dónde se está perdiendo tiempo en la operación.",
    icon: HelpCircle,
  },
];

const STEP_2_OPTIONS = [
  {
    id: "empezando",
    label: "Estamos empezando a ordenar los procesos",
    description: "Queremos armar una base prolija desde ahora.",
  },
  {
    id: "excel-saturado",
    label: "Nos manejamos con Excel pero ya nos quedó chico",
    description: "Hay demasiadas planillas dando vueltas y se cometen errores.",
  },
  {
    id: "enlatado-limitado",
    label: "Tenemos un sistema enlatado pero no se adapta a nosotros",
    description: "Pagamos por funciones que no usamos o nos faltan cosas clave.",
  },
  {
    id: "automatizar-canales",
    label: "Ya vendemos bien pero perdemos mucho tiempo operativo",
    description: "Queremos agilizar tareas repetitivas del equipo.",
  },
];

const STEP_3_OPTIONS = [
  {
    id: "urgente",
    label: "Lo antes posible (1 a 4 semanas)",
    description: "Tenemos una traba hoy y queremos resolverla rápido.",
  },
  {
    id: "medio-plazo",
    label: "En los próximos 2 a 3 meses",
    description: "Para ir implementándolo por etapas sin apuro.",
  },
  {
    id: "explorando",
    label: "Estoy averiguando opciones y presupuestos",
    description: "Quiero tener una idea clara de costos y tiempos.",
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
              06 · CONTANOS TU CASO
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
            Armemos una propuesta para tu negocio.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Elegí tres opciones rápidas para ubicarnos en tema y coordinamos una
            charla corta de 15 minutos.
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
                      1. ¿Qué estás buscando resolver hoy?
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
                      2. ¿Con qué situación te sentís más identificado?
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
                      3. ¿Para cuándo te gustaría tenerlo resuelto?
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
                      4. Dejanos tus datos para responderte hoy mismo
                    </h3>

                    {/* Summary Box */}
                    <div className="p-4 liquid-glass-subtle space-y-2 text-xs">
                      <div
                        className="font-mono uppercase tracking-wider mb-1"
                        style={{ color: "var(--color-accent-text)" }}
                      >
                        LO QUE ELEGISTE:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[var(--text-secondary)]">
                        <div>
                          <strong className="text-[var(--text-primary)] block">
                            Necesidad:
                          </strong>
                          {solutionObj.label}
                        </div>
                        <div>
                          <strong className="text-[var(--text-primary)] block">
                            Situación:
                          </strong>
                          {situationObj.label}
                        </div>
                        <div>
                          <strong className="text-[var(--text-primary)] block">
                            Plazo:
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
                          Tu nombre *
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
                          Empresa o rubro *
                        </label>
                        <input
                          id="wizard-company"
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Ej. Distribuidora Norte"
                          className="w-full px-4 py-3.5 liquid-glass-subtle focus:border-[#11ffa1] focus:outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="wizard-contact"
                        className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2"
                      >
                        Tu WhatsApp o correo *
                      </label>
                      <input
                        id="wizard-contact"
                        type="text"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Ej. 381 ... o correo@empresa.com"
                        className="w-full px-4 py-3.5 liquid-glass-subtle focus:border-[#11ffa1] focus:outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="wizard-challenge"
                        className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2"
                      >
                        Si querés, contanos en una línea qué buscan mejorar
                        (Opcional)
                      </label>
                      <textarea
                        id="wizard-challenge"
                        rows={2}
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        placeholder="Ej. Queremos unificar el stock de dos locales y actualizar listas de proveedores sin hacerlo a mano..."
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
                          Mandar directo por WhatsApp
                        </a>

                        <button
                          type="submit"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#11ffa1] hover:bg-[#00e58d] text-[#08080a] font-semibold text-sm shadow-[0_0_25px_rgba(17,255,161,0.25)] transition-all cursor-pointer"
                        >
                          Armar resumen
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
                    ¡Listo el resumen para {company || "tu negocio"}!
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                    Elegí si preferís mandármelo ahora por WhatsApp o por
                    correo electrónico con un solo clic:
                  </p>
                </div>

                <div className="max-w-lg mx-auto p-5 liquid-glass-subtle text-left text-xs sm:text-sm space-y-2">
                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Nombre:{" "}
                    </span>
                    <strong className="text-[var(--text-primary)]">
                      {name} ({company})
                    </strong>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Contacto:{" "}
                    </span>
                    <strong style={{ color: "var(--color-accent-text)" }}>
                      {contact}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[var(--text-secondary)]">
                      Necesidad:{" "}
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
                    Abrir en WhatsApp
                  </a>

                  <a
                    href={buildMailtoUrl()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full liquid-pill text-[var(--text-primary)] font-medium text-sm transition-all"
                  >
                    <Send
                      className="w-4 h-4"
                      style={{ color: "var(--color-accent-text)" }}
                    />
                    Mandar por Correo
                  </a>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Cambiar respuestas
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
