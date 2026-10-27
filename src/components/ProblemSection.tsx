import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const problems = [
  {
    title: 'Información dispersa',
    desc: 'Los datos de equipos, fallas y contratos viven en archivos separados, correos y notas sin conexión entre sí.',
    svg: (
      <svg viewBox="0 0 200 140" className="w-full h-32" aria-hidden="true">
        {/* Nodes scattered */}
        {[
          { x: 30, y: 30, label: 'PC-01' },
          { x: 160, y: 20, label: 'Falla' },
          { x: 80, y: 100, label: 'Mant.' },
          { x: 150, y: 90, label: 'Hoja' },
          { x: 20, y: 90, label: 'Email' },
        ].map(({ x, y, label }, i) => (
          <g key={i}>
            <motion.rect x={x - 18} y={y - 10} width={36} height={20} rx="4"
              fill="#202020" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              viewport={{ once: true }}
            />
            <motion.text x={x} y={y + 4} textAnchor="middle" fill="#A3A3A3" fontSize="7" fontFamily="monospace"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.15 + 0.2 }} viewport={{ once: true }}>
              {label}
            </motion.text>
          </g>
        ))}
        {/* Broken/dashed lines */}
        {[
          'M 30 30 Q 90 60 160 20', 'M 30 30 L 20 90', 'M 160 20 L 150 90',
        ].map((d, i) => (
          <motion.path key={i} d={d} stroke="rgba(255,100,100,0.25)" strokeWidth="1" strokeDasharray="4 4" fill="none"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8 + i * 0.2 }} viewport={{ once: true }} />
        ))}
        {/* Warning dot */}
        <motion.circle cx="100" cy="65" r="8" fill="none" stroke="rgba(255,100,100,0.4)" strokeWidth="1.5"
          animate={{ r: [8, 14, 8], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }} />
        <text x="100" y="69" textAnchor="middle" fill="rgba(255,100,100,0.7)" fontSize="10">?</text>
      </svg>
    ),
  },
  {
    title: 'Mantenimientos difíciles de controlar',
    desc: 'Sin un sistema centralizado, los mantenimientos se pierden, se olvidan o se realizan sin un seguimiento claro.',
    svg: (
      <svg viewBox="0 0 200 140" className="w-full h-32" aria-hidden="true">
        {/* Calendar grid */}
        {Array.from({ length: 21 }).map((_, i) => {
          const col = i % 7; const row = Math.floor(i / 7)
          const isLost = [2, 5, 9, 13, 17].includes(i)
          return (
            <motion.rect key={i} x={14 + col * 26} y={10 + row * 26} width={22} height={20} rx="3"
              fill={isLost ? 'rgba(255,100,100,0.15)' : '#202020'}
              stroke={isLost ? 'rgba(255,100,100,0.3)' : 'rgba(255,255,255,0.06)'} strokeWidth="1"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }} viewport={{ once: true }}
            />
          )
        })}
        {/* X marks on lost */}
        {[2, 5, 9, 13, 17].map((i) => {
          const col = i % 7; const row = Math.floor(i / 7)
          const cx = 14 + col * 26 + 11; const cy = 10 + row * 26 + 10
          return (
            <motion.text key={i} x={cx} y={cy + 4} textAnchor="middle" fill="rgba(255,100,100,0.6)" fontSize="10"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} viewport={{ once: true }}>
              ×
            </motion.text>
          )
        })}
        {/* Wrench icon area */}
        <motion.circle cx="170" cy="110" r="18" fill="#141414" stroke="rgba(255,214,0,0.2)" strokeWidth="1"
          animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }} />
        <text x="170" y="114" textAnchor="middle" fontSize="16">🔧</text>
        <motion.path d="M 100 95 L 150 108" stroke="rgba(255,214,0,0.3)" strokeWidth="1" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} />
      </svg>
    ),
  },
  {
    title: 'Historiales de fallas incompletos',
    desc: 'Sin registros detallados y continuos, es difícil identificar patrones, anticipar fallas o evaluar el desempeño de los equipos.',
    svg: (
      <svg viewBox="0 0 200 140" className="w-full h-32" aria-hidden="true">
        {/* Timeline */}
        <motion.line x1="20" y1="70" x2="180" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="2"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} />
        {/* Events on timeline */}
        {[
          { x: 40, ok: true, label: 'Falla 1' },
          { x: 80, ok: true, label: 'Falla 2' },
          { x: 120, ok: false, label: '???' },
          { x: 160, ok: false, label: '???' },
        ].map(({ x, ok, label }, i) => (
          <g key={i}>
            <motion.circle cx={x} cy={70} r={6}
              fill={ok ? '#141414' : 'transparent'}
              stroke={ok ? 'rgba(255,214,0,0.6)' : 'rgba(255,100,100,0.3)'}
              strokeWidth={ok ? 1.5 : 1}
              strokeDasharray={ok ? '0' : '3 3'}
              initial={{ scale: 0 }} whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.2 + 0.5 }} viewport={{ once: true }} />
            <motion.text x={x} y={90} textAnchor="middle" fill={ok ? '#A3A3A3' : 'rgba(255,100,100,0.5)'} fontSize="7"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.2 + 0.7 }} viewport={{ once: true }}>
              {label}
            </motion.text>
            {ok && (
              <motion.rect x={x - 20} y={40} width={40} height={22} rx="3"
                fill="#1a1a1a" stroke="rgba(255,214,0,0.15)" strokeWidth="1"
                initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.6 }} viewport={{ once: true }} />
            )}
            {!ok && (
              <motion.text x={x} y={55} textAnchor="middle" fill="rgba(255,100,100,0.5)" fontSize="18"
                animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}>
                ···
              </motion.text>
            )}
          </g>
        ))}
        {/* Gap visual */}
        <motion.rect x={98} y={60} width={44} height={20} rx="3" fill="rgba(255,100,100,0.06)" stroke="rgba(255,100,100,0.2)" strokeWidth="1" strokeDasharray="4 4"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} viewport={{ once: true }} />
      </svg>
    ),
  },
]

const ProblemSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const titleInView = useInView(ref, { once: true, amount: 0.3 })
  const phraseRef = useRef<HTMLDivElement>(null)
  const phraseInView = useInView(phraseRef, { once: true, amount: 0.8 })

  return (
    <section className="relative py-24 bg-black-carbon overflow-hidden" aria-labelledby="problem-title">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-4 justify-center">
            <span className="w-6 h-px bg-yellow-electric" />
            El problema
          </span>
          <h2 id="problem-title" className="section-title text-3xl sm:text-4xl lg:text-5xl mt-4 max-w-3xl mx-auto">
            "Una falla no siempre empieza{' '}
            <span className="text-yellow-electric">cuando el equipo deja de funcionar."</span>
          </h2>
        </motion.div>

        {/* 3 problem cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card-dark group hover:border-yellow-electric/30 hover:shadow-yellow-glow-sm transition-all duration-300"
            >
              {/* SVG illustration */}
              <div className="mb-4 rounded-lg bg-black-deep/60 border border-white/5 overflow-hidden p-3">
                {p.svg}
              </div>
              <h3 className="text-white-warm font-bold text-lg mb-2 group-hover:text-yellow-electric transition-colors">
                {p.title}
              </h3>
              <p className="text-gray-neutral text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Final phrase */}
        <div ref={phraseRef} className="mt-20 text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={phraseInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-electric leading-tight"
          >
            "La organización comienza
            <br className="hidden sm:block" />
            {' '}con la información."
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={phraseInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-4 h-px bg-gradient-to-r from-transparent via-yellow-electric to-transparent max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
