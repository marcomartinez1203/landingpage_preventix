import React from 'react'
import { motion } from 'motion/react'
import { Cpu, Recycle } from 'lucide-react'

const ods = [
  {
    number: '9',
    icon: <Cpu size={24} />,
    title: 'ODS 9 — Industria, innovación e infraestructura',
    desc: 'Preventix propone una herramienta digital para facilitar la organización y el seguimiento de los recursos tecnológicos en organizaciones que dependen de su infraestructura de cómputo.',
    note: null,
  },
  {
    number: '12',
    icon: <Recycle size={24} />,
    title: 'ODS 12 — Producción y consumo responsables',
    desc: 'La gestión del mantenimiento puede contribuir indirectamente a las decisiones sobre conservación y reparación de equipos. El impacto ambiental dependerá de las prácticas aplicadas y de los resultados obtenidos.',
    note: 'Preventix es una herramienta de gestión tecnológica. Su posible contribución ambiental es indirecta y no está garantizada.',
  },
]

const InnovationSection: React.FC = () => (
  <section className="relative py-24 overflow-hidden" style={{ background: '#161616' }} aria-labelledby="innovation-title">
    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" aria-hidden="true" />
    {/* Ambient */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-yellow-electric/4 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

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
          Innovación y sostenibilidad
        </span>
        <h2 id="innovation-title" className="section-title text-3xl sm:text-4xl lg:text-5xl mt-4">
          Innovación tecnológica con una{' '}
          <span className="text-yellow-electric">mirada responsable.</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        {/* Connection line between ODS */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 z-10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-yellow-electric/40 w-full"
          />
        </div>

        {ods.map(({ number, icon, title, desc, note }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="relative card-dark hover:border-yellow-electric/25 hover:shadow-yellow-glow-sm group"
          >
            {/* ODS number */}
            <div className="absolute top-5 right-5 text-6xl font-black text-yellow-electric/8 select-none" aria-hidden="true">
              {number}
            </div>

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-yellow-electric/10 border border-yellow-electric/30 flex items-center justify-center text-yellow-electric mb-5 group-hover:shadow-yellow-glow-sm transition-all">
              {icon}
            </div>

            <div className="mb-1">
              <span className="text-yellow-electric text-xs font-mono font-bold tracking-widest">ODS {number}</span>
            </div>
            <h3 className="text-white-warm font-bold text-lg mb-3 leading-snug">{title}</h3>
            <p className="text-gray-neutral leading-relaxed text-sm mb-4">{desc}</p>

            {note && (
              <div className="p-3 bg-black-deep/60 border border-white/10 rounded-lg">
                <p className="text-gray-neutral/70 text-xs leading-relaxed italic">{note}</p>
              </div>
            )}

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 + 0.3 }}
              className="absolute bottom-0 left-6 right-6 h-px bg-yellow-electric/20 origin-left"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default InnovationSection
