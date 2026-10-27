import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Monitor, AlertTriangle, Wrench, FileText } from 'lucide-react'

const nodes = [
  { icon: <Monitor size={20} />, label: 'Equipos', x: 50, y: 20, delay: 0 },
  { icon: <AlertTriangle size={20} />, label: 'Fallas', x: 80, y: 60, delay: 0.1 },
  { icon: <Wrench size={20} />, label: 'Mantenimientos', x: 20, y: 60, delay: 0.2 },
  { icon: <FileText size={20} />, label: 'Historial', x: 50, y: 85, delay: 0.3 },
]

const ideas = [
  { title: 'Centralización', desc: 'Toda la información en un solo lugar accesible.' },
  { title: 'Organización', desc: 'Equipos, fallas y mantenimientos estructurados y ordenados.' },
  { title: 'Seguimiento', desc: 'Estado actualizado de cada intervención registrada.' },
  { title: 'Decisiones', desc: 'Información disponible para organizar mejor las acciones.' },
]

const SolutionSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="relative py-24 bg-black-deep overflow-hidden" aria-labelledby="solution-title">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" aria-hidden="true" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-yellow-electric/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

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
            La solución
          </span>
          <h2 id="solution-title" className="section-title text-3xl sm:text-4xl lg:text-5xl mt-4 max-w-3xl mx-auto">
            Todo conectado.{' '}
            <span className="text-yellow-electric">Todo más fácil de supervisar.</span>
          </h2>
          <p className="text-gray-neutral text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Preventix propone centralizar la información de los equipos, sus fallas y sus mantenimientos para facilitar el seguimiento de las intervenciones.
          </p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Animation: nodes converging */}
          <div className="relative h-64 lg:h-80">
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
              {/* Center target */}
              <motion.circle cx="100" cy="100" r="22"
                fill="#141414" stroke="rgba(255,214,0,0.4)" strokeWidth="1.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              <motion.circle cx="100" cy="100" r="14"
                fill="#FFD600" opacity={0}
                animate={inView ? { opacity: 0.15, r: [14, 22, 14] } : {}}
                transition={{ duration: 3, delay: 1.2, repeat: Infinity }}
              />
              <motion.text x="100" y="104" textAnchor="middle" fill="#FFD600" fontSize="9" fontWeight="bold"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1 }}>
                PREVENTIX
              </motion.text>

              {/* Nodes */}
              {nodes.map(({ icon: _icon, label, x, y, delay }, i) => {
                const endX = 100; const endY = 100
                return (
                  <g key={i}>
                    {/* Connection line */}
                    <motion.line
                      x1={x * 2} y1={y * 2} x2={endX} y2={endY}
                      stroke="rgba(255,214,0,0.4)" strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.4 + delay }}
                    />
                    {/* Node circle */}
                    <motion.circle cx={x * 2} cy={y * 2} r="16"
                      fill="#1a1a1a" stroke="rgba(255,214,0,0.3)" strokeWidth="1"
                      initial={{ x: (Math.random() - 0.5) * 60, y: (Math.random() - 0.5) * 60, opacity: 0 }}
                      animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.9, delay }}
                    />
                    <motion.text x={x * 2} y={y * 2 + 4} textAnchor="middle" fill="#A3A3A3" fontSize="7"
                      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: delay + 0.3 }}>
                      {label}
                    </motion.text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Ideas grid */}
          <div className="grid grid-cols-2 gap-4">
            {ideas.map(({ title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="card-dark hover:border-yellow-electric/25 hover:shadow-yellow-glow-sm"
              >
                <div className="text-yellow-electric font-black text-3xl leading-none mb-2">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-white-warm font-bold text-sm mb-1">{title}</h3>
                <p className="text-gray-neutral text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
