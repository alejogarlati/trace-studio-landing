import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 px-6">
      <div className="max-w-6xl mx-auto liquid-glass p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[var(--glass-border)]">
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
              Software a medida, automatizaciones y datos para empresas que
              quieren trabajar con orden y sin perder tiempo en tareas manuales.
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
                  Qué resolvemos
                </a>
              </li>
              <li>
                <a
                  href="#soluciones"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  Soluciones
                </a>
              </li>
              <li>
                <a
                  href="#casos"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  Trabajos reales
                </a>
              </li>
              <li>
                <a
                  href="#proceso"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  Cómo trabajamos
                </a>
              </li>
              <li>
                <a
                  href="#estudio"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  Sobre el estudio
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
    </footer>
  );
}
