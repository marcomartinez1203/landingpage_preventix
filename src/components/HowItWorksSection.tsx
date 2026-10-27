import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Database, FolderOpen, Eye, Lightbulb } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Registrar',
    subtitle: 'Centralizar la información de los equipos.',
    icon: <Database size={22} />,
    desc: 'Ingresa la información de cada equipo de cómputo: identificación, ubicación, estado, responsable y especificaciones técnicas. Todo en un solo lugar.',
    mini: (
      <div className="bg-black-deep/80 rounded-xl p-4 border border-white/10 space-y-2">
        <div className="text-[10px] text-gray-neutral font-mono mb-2 text-yellow-electric/70">NUEVO EQUIPO</div>
        {[
          { label: 'ID', value: 'PC-006' },
          { label: 'Nombre', value: 'Laptop Diseño' },
          { label: 'Ubicación', value: 'Piso 2' },
          { label: 'Estado', value: 'Operativo' },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-[9px] text-gray-neutral w-16 shrink-0">{label}</span>
            <div className="flex-1 h-5 bg-black-surface/80 border border-white/10 rounded px-2 flex items-center">
              <span className="text-[10px] text-white-warm">{value}</span>
            </div>
          </div>
        ))}
        <button className="mt-2 w-full py-1.5 bg-yellow-electric text-black-deep text-[10px] font-bold rounded-lg">
          Guardar equipo
        </button>
        <p className="text-[8px] text-gray-neutral/50 text-center italic">Ilustrativo</p>
      </div>
    ),
  },
  {
    num: '02',
    title: 'Organizar',
    subtitle: 'Registrar fallas y planificar mantenimientos.',
    icon: <FolderOpen size={22} />,
    desc: 'Registra las fallas ocurridas y programa mantenimientos preventivos. Mantén un calendario de intervenciones claro y organizado para todo el parque de equipos.',
    mini: (
      <div className="bg-black-deep/80 rounded-xl p-4 border border-white/10 space-y-2">
        <div className="text-[10px] text-yellow-electric/70 font-mono mb-2">PLANIFICACIÓN</div>
        {[
          { date: '28 Oct', task: 'Limpieza PC-002', priority: 'Alta' },
          { date: '02 Nov', task: 'Actualización PC-001', priority: 'Media' },
          { date: '10 Nov', task: 'Revisión PC-004', priority: 'Baja' },
        ].map(({ date, task, priority }, i) => (
          <div key={i} className="flex items-center gap-2 p-1.5 bg-black-surface/60 rounded-lg border border-white/5">
            <span className="text-[9px] text-yellow-electric/70 font-mono w-14 shrink-0">{date}</span>
            <span className="text-[9px] text-white-warm flex-1 truncate">{task}</span>
            <span className={`text-[8px] px-1 py-0.5 rounded ${priority === 'Alta' ? 'text-red-400 bg-red-400/10' : priority === 'Media' ? 'text-yellow-electric bg-yellow-electric/10' : 'text-gray-neutral bg-white/5'}`}>
              {priority}
            </span>
          </div>
        ))}
        <p className="text-[8px] text-gray-neutral/50 italic mt-1">Datos ilustrativos</p>
      </div>
    ),
  },
  {
    num: '03',
    title: 'Supervisar',
    subtitle: 'Consultar estados, alertas e historiales.',
    icon: <Eye size={22} />,
    desc: 'Revisa el estado actual de cada equipo, consulta el historial de fallas y mantenimientos, y recibe alertas sobre equipos que requieren atención.',
    mini: (
      <div className="bg-black-deep/80 rounded-xl p-4 border border-white/10">
        <div className="text-[10px] text-yellow-electric/70 font-mono mb-3">ESTADO GENERAL</div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: 'Operativos', value: '8', color: 'text-emerald-400' },
            { label: 'En mant.', value: '2', color: 'text-yellow-electric' },
            { label: 'Con alerta', value: '1', color: 'text-red-400' },
            { label: 'Inactivos', value: '1', color: 'text-gray-neutral' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-black-surface/60 rounded-lg p-2 text-center border border-white/5">
              <div className={`text-xl font-black ${color}`}>{value}</div>
              <div className="text-[9px] text-gray-neutral">{label}</div>
            </div>
          ))}
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-yellow-electric rounded-full"
            initial={{ width: '0%' }} whileInView={{ width: '67%' }}
            transition={{ duration: 1.2 }} viewport={{ once: false }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[8px] text-gray-neutral">Estado general</span>
          <span className="text-[8px] text-yellow-electric">67% operativos</span>
        </div>
        <p className="text-[8px] text-gray-neutral/50 italic mt-2">Datos ilustrativos</p>
      </div>
    ),
  },
  {
    num: '04',
    title: 'Decidir',
    subtitle: 'Utilizar la información para organizar las intervenciones.',
    icon: <Lightbulb size={22} />,
    desc: 'Con toda la información centralizada y organizada, puedes priorizar intervenciones, asignar recursos y tomar mejores decisiones sobre el mantenimiento del parque tecnológico.',
    mini: (
      <div className="bg-black-deep/80 rounded-xl p-4 border border-white/10">
        <div className="text-[10px] text-yellow-electric/70 font-mono mb-3">PRIORIDADES</div>
        {[
          { eq: 'PC-003', action: 'Diagnóstico urgente', urgency: 3 },
          { eq: 'PC-002', action: 'Limpieza programada', urgency: 2 },
          { eq: 'PC-001', action: 'Actualización SO', urgency: 1 },
        ].map(({ eq, action, urgency }, i) => (
          <div key={i} className="flex items-center gap-2 mb-2 p-1.5 bg-black-surface/60 rounded-lg border border-white/5">
            <div className="flex gap-0.5">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className={`w-1.5 h-3 rounded-sm ${j < urgency ? 'bg-yellow-electric' : 'bg-white/10'}`} />
              ))}
            </div>
            <span className="text-[9px] text-yellow-electric/80 font-mono w-12 shrink-0">{eq}</span>
            <span className="text-[9px] text-white-warm flex-1 truncate">{action}</span>
          </div>
        ))}
        <p className="text-[8px] text-gray-neutral/50 italic mt-1">Datos ilustrativos</p>
      </div>
    ),
  },
]

const HowItWorksSection: React.FC = () => {
  const [active, setActive] = useState(0)

  return (
    <section className="relative py-24 bg-black-deep overflow-hidden" aria-labelledby="how-title">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" aria-hidden="true" />

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
            Cómo funcionaría
          </span>
          <h2 id="how-title" className="section-title text-3xl sm:text-4xl lg:text-5xl mt-4">
            De registrar equipos a{' '}
            <span className="text-yellow-electric">tomar mejores decisiones.</span>
          </h2>
        </motion.div>

        {/* Desktop: horizontal steps */}
        <div className="hidden lg:block">
          {/* Step indicators */}
          <div className="relative flex justify-between items-center mb-12">
            {/* Line track */}
            <div className="absolute left-0 right-0 top-8 h-px bg-white/10" />
            <motion.div
              className="absolute left-0 top-8 h-px bg-yellow-electric origin-left"
              animate={{ scaleX: (active + 1) / steps.length }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ right: 0 }}
            />
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative flex flex-col items-center gap-3 group z-10"
                aria-label={`Paso ${s.num}: ${s.title}`}
              >
                <motion.div
                  animate={{
                    backgroundColor: i <= active ? '#FFD600' : '#141414',
                    borderColor: i <= active ? '#FFD600' : 'rgba(255,255,255,0.1)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                >
                  <span className={`font-black text-xl transition-colors ${i <= active ? 'text-black-deep' : 'text-gray-neutral'}`}>
                    {s.num}
                  </span>
                </motion.div>
                <span className={`text-sm font-semibold transition-colors ${i === active ? 'text-yellow-electric' : 'text-gray-neutral group-hover:text-white-warm'}`}>
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-12 items-start"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-yellow-electric/10 border border-yellow-electric/30 flex items-center justify-center text-yellow-electric">
                    {steps[active].icon}
                  </div>
                  <div>
                    <p className="text-gray-neutral text-xs font-mono">{steps[active].num}</p>
                    <h3 className="text-white-warm text-2xl font-black">{steps[active].title}</h3>
                  </div>
                </div>
                <p className="text-white-warm/80 font-semibold text-lg mb-3">{steps[active].subtitle}</p>
                <p className="text-gray-neutral leading-relaxed">{steps[active].desc}</p>
              </div>
              <div>{steps[active].mini}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: vertical steps */}
        <div className="lg:hidden space-y-4">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <button
                onClick={() => setActive(active === i ? -1 : i)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  active === i ? 'border-yellow-electric/40 bg-yellow-electric/5' : 'border-white/10 bg-black-carbon hover:border-white/20'
                }`}
                aria-expanded={active === i}
              >
                <div className="flex items-center gap-3">
                  <span className="text-yellow-electric font-black text-lg">{s.num}</span>
                  <div className="w-8 h-8 rounded-lg bg-yellow-electric/10 border border-yellow-electric/20 flex items-center justify-center text-yellow-electric shrink-0">
                    {s.icon}
                  </div>
                  <span className="text-white-warm font-bold">{s.title}</span>
                </div>
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-x border-b border-yellow-electric/20 rounded-b-xl bg-yellow-electric/3 space-y-4">
                      <p className="text-gray-neutral text-sm leading-relaxed">{s.desc}</p>
                      {s.mini}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
