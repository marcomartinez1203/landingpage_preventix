import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { LayoutGrid, Eye, Activity, Calendar, Target } from 'lucide-react'

const benefits = [
  {
    icon: <LayoutGrid size={28} />,
    title: 'Organización de la información',
    desc: 'Toda la información de equipos, fallas y mantenimientos estructurada en un sistema centralizado y accesible.',
    num: '01',
  },
  {
    icon: <Eye size={28} />,
    title: 'Visibilidad del estado de los equipos',
    desc: 'Conoce el estado actual de cada equipo del parque tecnológico sin necesidad de buscar en múltiples documentos.',
    num: '02',
  },
  {
    icon: <Activity size={28} />,
    title: 'Seguimiento de fallas y mantenimientos',
    desc: 'Historial completo de incidencias y mantenimientos realizados, consultable en cualquier momento.',
    num: '03',
  },
  {
    icon: <Calendar size={28} />,
    title: 'Planificación de intervenciones',
    desc: 'Organiza y programa los mantenimientos preventivos con fechas claras y recordatorios.',
    num: '04',
  },
  {
    icon: <Target size={28} />,
    title: 'Información centralizada para decisiones',
    desc: 'Datos disponibles para priorizar intervenciones y asignar recursos de manera más informada.',
    num: '05',
  },
]

const BenefitsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="relative py-24 bg-black-carbon overflow-hidden" aria-labelledby="benefits-title">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" aria-hidden="true" />
      {/* Ambient */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-electric/4 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 justify-center">
            <span className="w-6 h-px bg-yellow-electric" />
            Beneficios
          </span>
          <h2 id="benefits-title" className="section-title text-3xl sm:text-4xl lg:text-5xl mt-4">
            Más claridad.{' '}
            <span className="text-yellow-electric">Mejor organización.</span>
            <br />Mayor control.
          </h2>
        </motion.div>

        <div ref={ref} className="space-y-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-2xl border border-white/8 bg-black-deep/40 hover:border-yellow-electric/25 hover:bg-black-deep/60 transition-all duration-300"
            >
              {/* Number */}
              <span className="absolute right-6 top-4 text-7xl font-black text-white/3 select-none pointer-events-none group-hover:text-yellow-electric/5 transition-colors" aria-hidden="true">
                {b.num}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-black-surface border border-white/10 flex items-center justify-center text-yellow-electric shrink-0 group-hover:border-yellow-electric/30 group-hover:shadow-yellow-glow-sm transition-all duration-300">
                {b.icon}
              </div>

              {/* Text */}
              <div className="flex-1 relative z-10">
                <h3 className="text-white-warm font-bold text-lg mb-1 group-hover:text-yellow-electric transition-colors">
                  {b.title}
                </h3>
                <p className="text-gray-neutral leading-relaxed">{b.desc}</p>
              </div>

              {/* Connector line */}
              {i < benefits.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.12 + 0.4 }}
                  className="hidden sm:block absolute -bottom-3 left-14 w-px h-6 bg-yellow-electric/20 origin-top"
                  style={{ transform: 'translateX(26px)' }}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
