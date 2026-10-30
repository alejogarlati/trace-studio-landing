"use client";

import { useRef, useEffect } from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    const fillPath = fillPathRef.current;
    const strokePath = strokePathRef.current;
    if (!footer || !fillPath || !strokePath || !card) return;

    // Proxy numérico para el desplazamiento hacia arriba (y = 0 en reposo plano)
    // ViewBox: 0 0 1000 90. Base horizontal plana en y = 80.
    const bounceProxy = { y: 0 };

    const updateCurve = () => {
      const cy = (80 - bounceProxy.y).toFixed(2);
      const dFill = `M 0 90 L 0 80 Q 500 ${cy} 1000 80 L 1000 90 Z`;
      const dStroke = `M 0 80 Q 500 ${cy} 1000 80`;
      fillPath.setAttribute("d", dFill);
      strokePath.setAttribute("d", dStroke);
    };

    const triggerBounce = (scrollVelocity: number) => {
      const rawVel = Math.abs(scrollVelocity);
      const vel = Math.max(rawVel, 1200);
      const clampedVel = Math.min(vel, 8000);

      // Parámetros elásticos dinámicos (CodePen bGeZvpO)
      const amplitude = 1 + clampedVel / 2000;
      const period = Math.max(0.18, 0.44 - clampedVel / 22000);
      const displacement = Math.min(clampedVel / 30 + 20, 80);

      // 1. Rebote elástico del labio SVG superior
      bounceProxy.y = displacement;
      gsap.to(bounceProxy, {
        y: 0,
        duration: 2,
        ease: `elastic.out(${amplitude}, ${period})`,
        onUpdate: updateCurve,
        overwrite: true,
      });

      // 2. Motion físico integrado en el contenedor abierto del footer (sin card)
      gsap.fromTo(
        card,
        {
          y: -displacement * 0.4,
          scaleY: 1.02,
          transformOrigin: "50% 100%",
        },
        {
          y: 0,
          scaleY: 1,
          duration: 2,
          ease: `elastic.out(${amplitude}, ${period})`,
          overwrite: true,
        }
      );

      // 3. Inercia retardada sutil en el contenido interno (columnas y enlaces)
      if (content) {
        gsap.fromTo(
          content,
          {
            y: -displacement * 0.16,
          },
          {
            y: 0,
            duration: 1.8,
            delay: 0.04,
            ease: `elastic.out(${amplitude}, ${period})`,
            overwrite: true,
          }
        );
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: footer,
        start: "top 92%",
        onEnter: (self) => triggerBounce(self.getVelocity()),
        onEnterBack: (self) => triggerBounce(self.getVelocity()),
      });
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative pt-24 pb-20 sm:pt-36 sm:pb-32 px-6 sm:px-10 overflow-visible"
    >
      {/* Rebote Elástico de Entrada (CodePen bGeZvpO) */}
      <div
        className="relative max-w-6xl mx-auto mb-10 sm:mb-14 pointer-events-none overflow-visible select-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 90"
          preserveAspectRatio="none"
          className="w-full h-14 sm:h-20 block overflow-visible"
        >
          <defs>
            {/* Gradiente especular esmeralda con núcleo iluminado */}
            <linearGradient
              id="footer-specular-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#11ffa1" stopOpacity="0.05" />
              <stop offset="25%" stopColor="#11ffa1" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#11ffa1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#11ffa1" stopOpacity="0.05" />
            </linearGradient>

            {/* Gradiente líquido de relleno hacia el footer */}
            <linearGradient
              id="footer-liquid-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#11ffa1" stopOpacity="0.12" />
              <stop offset="45%" stopColor="#11ffa1" stopOpacity="0.03" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>

            {/* Filtro de resplandor neón */}
            <filter
              id="footer-specular-glow"
              x="-20%"
              y="-120%"
              width="140%"
              height="340%"
            >
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Relleno con gradiente líquido reactivo */}
          <path
            ref={fillPathRef}
            d="M 0 90 L 0 80 Q 500 80 1000 80 L 1000 90 Z"
            fill="url(#footer-liquid-gradient)"
          />

          {/* Borde superior especular iluminado */}
          <path
            ref={strokePathRef}
            d="M 0 80 Q 500 80 1000 80"
            fill="none"
            stroke="url(#footer-specular-gradient)"
            strokeWidth="2.2"
            vectorEffect="non-scaling-stroke"
            filter="url(#footer-specular-glow)"
          />
        </svg>
      </div>

      {/* Contenido del Footer Abierto y Sin Card (Borderless) */}
      <div
        ref={cardRef}
        className="max-w-6xl mx-auto relative z-10 will-change-transform"
      >
        <div
          ref={contentRef}
          className="will-change-transform"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-14 pb-12 border-b border-[var(--glass-border)]">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-4">
              <a href="#" className="inline-flex items-center gap-2.5">
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

              <p className="text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
                Desarrollo de software a medida, automatización e inteligencia de
                datos para empresas orientadas a la eficiencia operativa.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-3 space-y-3">
              <span
                className="block font-mono text-xs uppercase tracking-wider"
                style={{ color: "var(--color-accent-text)" }}
              >
                Secciones
              </span>
              <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                <li>
                  <a
                    href="#problemas"
                    className="hover:text-[var(--text-primary)] transition-colors"
                  >
                    Desafíos operativos
                  </a>
                </li>
                <li>
                  <a
                    href="#soluciones"
                    className="hover:text-[var(--text-primary)] transition-colors"
                  >
                    Áreas de desarrollo
                  </a>
                </li>
                <li>
                  <a
                    href="#casos"
                    className="hover:text-[var(--text-primary)] transition-colors"
                  >
                    Casos de estudio
                  </a>
                </li>
                <li>
                  <a
                    href="#proceso"
                    className="hover:text-[var(--text-primary)] transition-colors"
                  >
                    Metodología de trabajo
                  </a>
                </li>
                <li>
                  <a
                    href="#estudio"
                    className="hover:text-[var(--text-primary)] transition-colors"
                  >
                    Propuesta institucional
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="md:col-span-4 space-y-3">
              <span
                className="block font-mono text-xs uppercase tracking-wider"
                style={{ color: "var(--color-accent-text)" }}
              >
                Contacto directo
              </span>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>
                  <a
                    href="mailto:gabrielgarlati@gmail.com"
                    className="inline-flex items-center gap-2.5 hover:text-[var(--text-primary)] transition-colors"
                  >
                    <Mail
                      className="w-4 h-4"
                      style={{ color: "var(--color-accent-text)" }}
                    />
                    <span>gabrielgarlati@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5493812203431"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 hover:text-[var(--text-primary)] transition-colors"
                  >
                    <Phone
                      className="w-4 h-4"
                      style={{ color: "var(--color-accent-text)" }}
                    />
                    <span>+54 381 220-3431 (WhatsApp)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li className="inline-flex items-center gap-2.5">
                  <MapPin
                    className="w-4 h-4"
                    style={{ color: "var(--color-accent-text)" }}
                  />
                  <span>San Miguel de Tucumán, Argentina</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <p>© 2026 Trace Studio. Todos los derechos reservados.</p>
            <p>
              Desarrollo de Software, Automatización &amp; Datos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
