"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroCurveSeparator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const fillPath = fillPathRef.current;
    const strokePath = strokePathRef.current;
    const glowPath = glowPathRef.current;
    if (!container || !fillPath || !strokePath || !glowPath) return;

    // ViewBox: 0 0 1000 140.
    // En reposo: y = 20 (recta). Al scrollear: se curva profundamente hasta y = 130.
    const curveProxy = { y: 20 };

    const updateCurve = () => {
      const cy = curveProxy.y.toFixed(2);
      const dStroke = `M 0 20 Q 500 ${cy} 1000 20`;
      const dFill = `M 0 140 L 0 20 Q 500 ${cy} 1000 20 L 1000 140 Z`;

      strokePath.setAttribute("d", dStroke);
      glowPath.setAttribute("d", dStroke);
      fillPath.setAttribute("d", dFill);
    };

    // Inicializar la geometría inmediatamente
    updateCurve();

    const ctx = gsap.context(() => {
      // 1. Ocultar inicialmente en scroll 0 para que no asome al entrar a la página
      gsap.set(container, { opacity: 0 });

      // 2. Control de visibilidad: aparece solo cuando el usuario scrollea hacia abajo
      ScrollTrigger.create({
        trigger: container,
        start: "top 95%",
        onEnter: () => gsap.to(container, { opacity: 1, duration: 0.35, ease: "power1.out" }),
        onLeaveBack: () => gsap.to(container, { opacity: 0, duration: 0.25, ease: "power1.in" }),
      });

      // 3. Animación de curvatura fluida y pronunciada sincronizada con el scroll
      gsap
        .timeline({
          onUpdate: updateCurve, // Garantiza ejecución cada frame durante el scrub
          scrollTrigger: {
            trigger: container,
            start: "top 92%",
            end: "bottom 15%",
            scrub: 0.4,
          },
        })
        .to(curveProxy, {
          y: 130,
          ease: "power2.out",
          duration: 1,
        })
        .to(curveProxy, {
          y: 20,
          ease: "power2.inOut",
          duration: 1,
        });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-6 sm:py-12 md:py-16 z-20 pointer-events-none overflow-visible select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 140"
        preserveAspectRatio="none"
        className="w-full h-20 sm:h-28 md:h-36 block overflow-visible"
      >
        <defs>
          {/* Borde especular esmeralda de alto brillo con núcleo blanco incandescente */}
          <linearGradient
            id="hero-specular-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#11ffa1" stopOpacity="0.15" />
            <stop offset="25%" stopColor="#11ffa1" stopOpacity="0.85" />
            <stop offset="47%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="53%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="75%" stopColor="#11ffa1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#11ffa1" stopOpacity="0.15" />
          </linearGradient>

          {/* Gradiente líquido ambiental inferior */}
          <linearGradient
            id="hero-curve-fill-gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#11ffa1" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#11ffa1" stopOpacity="0.03" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Relleno líquido que acompaña la curvatura */}
        <path
          ref={fillPathRef}
          d="M 0 140 L 0 20 Q 500 20 1000 20 L 1000 140 Z"
          fill="url(#hero-curve-fill-gradient)"
        />

        {/* Halo difuso de resplandor neón inferior */}
        <path
          ref={glowPathRef}
          d="M 0 20 Q 500 20 1000 20"
          fill="none"
          stroke="#11ffa1"
          strokeWidth="6"
          strokeOpacity="0.45"
          vectorEffect="non-scaling-stroke"
          className="blur-[3px]"
        />

        {/* Línea especular nítida y brillante con núcleo blanco */}
        <path
          ref={strokePathRef}
          d="M 0 20 Q 500 20 1000 20"
          fill="none"
          stroke="url(#hero-specular-gradient)"
          strokeWidth="2.8"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 8px rgba(17,255,161,0.7))" }}
        />
      </svg>
    </div>
  );
}
