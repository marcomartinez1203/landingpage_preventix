import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Building2, GraduationCap, Briefcase, ShoppingBag } from 'lucide-react'

const sectors = [
  {
    icon: <Building2 size={28} />,
    title: 'Pequeñas y medianas empresas',
    desc: 'Organizaciones con equipos distribuidos en distintas áreas que requieren seguimiento del estado de su infraestructura tecnológica sin contar con un equipo TI dedicado de gran escala.',
    svg: (
      <svg viewBox="0 0 160 100" className="w-full h-24" aria-hidden="true">
        {/* Building */}
        <rect x="40" y="20" width="80" height="70" rx="3" fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <rect x="50" y="30" width="12" height="12" rx="1" fill="rgba(255,214,0,0.2)" stroke="rgba(255,214,0,0.4)" strokeWidth="0.5"/>
        <rect x="74" y="30" width="12" height="12" rx="1" fill="rgba(255,214,0,0.15)" stroke="rgba(255,214,0,0.3)" strokeWidth="0.5"/>
        <rect x="98" y="30" width="12" height="12" rx="1" fill="rgba(255,214,0,0.2)" stroke="rgba(255,214,0,0.4)" strokeWidth="0.5"/>
        <rect x="50" y="50" width="12" height="12" rx="1" fill="rgba(255,214,0,0.1)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
        <rect x="74" y="50" width="12" height="12" rx="1" fill="rgba(255,214,0,0.25)" stroke="rgba(255,214,0,0.5)" strokeWidth="0.5"/>
        <rect x="98" y="50" width="12" height="12" rx="1" fill="rgba(255,214,0,0.1)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
        <rect x="68" y="72" width="24" height="18" rx="2" fill="#141414" stroke="rgba(255,214,0,0.2)" strokeWidth="0.5"/>
        {/* Network dots */}
        <circle cx="20" cy="50" r="5" fill="#141414" stroke="rgba(255,214,0,0.4)" strokeWidth="1"/>
        <circle cx="140" cy="50" r="5" fill="#141414" stroke="rgba(255,214,0,0.4)" strokeWidth="1"/>
        <motion.line x1="25" y1="50" x2="40" y2="50" stroke="rgba(255,214,0,0.4)" strokeWidth="1"
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}/>
        <motion.line x1="120" y1="50" x2="135" y2="50" stroke="rgba(255,214,0,0.4)" strokeWidth="1"
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}/>
      </svg>
    ),
  },
  {
    icon: <GraduationCap size={28} />,
    title: 'Instituciones educativas',
    desc: 'Colegios, universidades y centros de formación con aulas de informática y múltiples computadores que necesitan un sistema de seguimiento de mantenimientos y fallas.',
    svg: (
      <svg viewBox="0 0 160 100" className="w-full h-24" aria-hidden="true">
        {/* School building */}
        <rect x="30" y="35" width="100" height="55" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <polygon points="80,10 130,35 30,35" fill="#141414" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        {/* Computer rows */}
        {[0,1,2].map((row) =>
          [0,1,2,3].map((col) => (
            <rect key={`${row}-${col}`} x={38 + col * 22} y={42 + row * 14} width="16" height="10" rx="1"
              fill="rgba(255,214,0,0.1)" stroke="rgba(255,214,0,0.25)" strokeWidth="0.5"/>
          ))
        )}
        <motion.circle cx="80" cy="22" r="3" fill="#FFD600" opacity={0.6}
          animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}/>
      </svg>
    ),
  },
  {
    icon: <Briefcase size={28} />,
    title: 'Oficinas',
    desc: 'Entornos de trabajo donde múltiples empleados usan computadores asignados y se requiere control del estado, mantenimientos programados y registro de incidencias.',
    svg: (
      <svg viewBox="0 0 160 100" className="w-full h-24" aria-hidden="true">
        {/* Floor plan */}
        <rect x="10" y="10" width="140" height="80" rx="3" fill="#141414" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        {/* Desks */}
        {[[20,20],[60,20],[100,20],[20,55],[60,55],[100,55],[140,20],[140,55]].map(([x,y],i)=>(
          <g key={i}>
            <rect x={x-8} y={y-4} width="20" height="14" rx="2" fill="#202020" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
            <rect x={x-4} y={y-1} width="12" height="7" rx="1" fill="rgba(255,214,0,0.1)" stroke="rgba(255,214,0,0.2)" strokeWidth="0.5"/>
          </g>
        ))}
        {/* Network spine */}
        <motion.line x1="80" y1="10" x2="80" y2="90" stroke="rgba(255,214,0,0.1)" strokeWidth="1" strokeDasharray="4 4"
          animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity }}/>
      </svg>
    ),
  },
  {
    icon: <ShoppingBag size={28} />,
    title: 'Establecimientos comerciales',
    desc: 'Locales, tiendas y negocios con terminales, computadores de punto de venta y sistemas que requieren disponibilidad constante y mantenimiento regular.',
    svg: (
      <svg viewBox="0 0 160 100" className="w-full h-24" aria-hidden="true">
        {/* Store front */}
        <rect x="20" y="20" width="120" height="70" rx="4" fill="#1a1a1a" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <rect x="20" y="20" width="120" height="20" rx="4" fill="#202020" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <text x="80" y="34" textAnchor="middle" fill="rgba(255,214,0,0.6)" fontSize="8" fontWeight="bold">COMERCIO</text>
        {/* Terminals */}
        <rect x="40" y="55" width="28" height="20" rx="2" fill="#141414" stroke="rgba(255,214,0,0.3)" strokeWidth="1"/>
        <rect x="44" y="58" width="20" height="12" rx="1" fill="rgba(255,214,0,0.08)"/>
        <rect x="95" y="55" width="28" height="20" rx="2" fill="#141414" stroke="rgba(255,214,0,0.3)" strokeWidth="1"/>
        <rect x="99" y="58" width="20" height="12" rx="1" fill="rgba(255,214,0,0.08)"/>
        <motion.circle cx="54" cy="48" r="3" fill="rgba(255,214,0,0.5)"
          animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}/>
        <motion.circle cx="109" cy="48" r="3" fill="rgba(255,214,0,0.5)"
          animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}/>
      </svg>
    ),
  },
]

const MarketSection: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section className="relative py-24 bg-black-deep overflow-hidden" aria-labelledby="market-title">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-4"
        >
          <span className="section-label mb-4 justify-center">
            <span className="w-6 h-px bg-yellow-electric" />
            Mercado objetivo
          </span>
          <h2 id="market-title" className="section-title text-3xl sm:text-4xl lg:text-5xl mt-4 mb-4">
            Creado para organizaciones que{' '}
            <span className="text-yellow-electric">dependen de sus equipos.</span>
          </h2>
          <p className="text-gray-neutral/60 text-sm italic mb-12">
            Mercado al que se dirige la propuesta, no lista de clientes existentes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sectors.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <button
                onClick={() => setSelected(selected === i ? null : i)}
                className={`w-full text-left rounded-xl border p-5 transition-all duration-300 group ${
                  selected === i
                    ? 'border-yellow-electric/50 bg-yellow-electric/5 shadow-yellow-glow-sm'
                    : 'border-white/8 bg-black-carbon hover:border-yellow-electric/20 hover:bg-black-carbon/80'
                }`}
                aria-expanded={selected === i}
                aria-label={s.title}
              >
                {/* SVG illustration */}
                <div className="mb-4 rounded-lg bg-black-deep/60 border border-white/5 overflow-hidden p-2">
                  {s.svg}
                </div>

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
                    selected === i ? 'bg-yellow-electric text-black-deep border-yellow-electric' : 'bg-black-surface border-white/10 text-gray-neutral group-hover:text-yellow-electric group-hover:border-yellow-electric/30'
                  }`}>
                    {s.icon}
                  </div>
                </div>
                <h3 className={`font-bold text-sm leading-snug transition-colors ${selected === i ? 'text-yellow-electric' : 'text-white-warm'}`}>
                  {s.title}
                </h3>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Expanded description */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden mt-5"
            >
              <div className="p-6 rounded-xl border border-yellow-electric/20 bg-yellow-electric/3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-yellow-electric">{sectors[selected].icon}</div>
                  <h3 className="text-white-warm font-bold text-lg">{sectors[selected].title}</h3>
                </div>
                <p className="text-gray-neutral leading-relaxed">{sectors[selected].desc}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default MarketSection
