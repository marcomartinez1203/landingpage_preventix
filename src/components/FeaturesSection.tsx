import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { Monitor, Clock, Wrench, Bell, BarChart2, FileText, TrendingUp, X, ChevronRight, AlertTriangle } from 'lucide-react'

// Datos ilustrativos
const equiposList = [
  { id: 'PC-001', name: 'Contabilidad', status: 'operativo' },
  { id: 'PC-002', name: 'Servidor', status: 'mantenimiento' },
  { id: 'PC-003', name: 'Recepción', status: 'alerta' },
]
const timelineItems = [
  { date: '01 Oct', event: 'Falla disco duro', resolved: true },
  { date: '10 Oct', event: 'Pantalla azul', resolved: true },
  { date: '20 Oct', event: 'Overheating', resolved: false },
]
const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1)
const markedDays = [5, 12, 18, 25, 30]
const barData = {
  semana: [40, 70, 55, 90, 60, 45, 75],
  mes: [65, 48, 72, 55, 88, 60, 77, 45, 90, 52],
}
const reportes = [
  { name: 'Informe Mensual — Oct 2026', pages: 4 },
  { name: 'Resumen de Fallas Q3 2026', pages: 6 },
  { name: 'Plan de Mantenimiento Nov 2026', pages: 3 },
]
const trendData = [30, 35, 28, 45, 50, 42, 60, 55, 70, 65, 80, 72]

interface Feature {
  icon: React.ReactNode
  title: string
  desc: string
  tag?: string
  color: string
  content: React.ReactNode
}

const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    operativo: 'text-emerald-400 bg-emerald-400/10',
    mantenimiento: 'text-yellow-electric bg-yellow-electric/10',
    alerta: 'text-red-400 bg-red-400/10',
  }
  const labels: Record<string, string> = { operativo: 'Operativo', mantenimiento: 'Mantenimiento', alerta: 'Alerta' }
  return (
    <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${map[status] ?? 'text-gray-neutral bg-white/5'}`}>
      {labels[status] ?? status}
    </span>
  )
}

const EquipmentMini: React.FC = () => (
  <div className="space-y-1.5">
    {equiposList.map((eq) => (
      <div key={eq.id} className="flex items-center gap-2 px-2 py-1.5 bg-black-deep/60 rounded-lg border border-white/5">
        <Monitor size={11} className="text-gray-neutral shrink-0" />
        <span className="text-[10px] text-white-warm flex-1 truncate">{eq.id} — {eq.name}</span>
        <StatusChip status={eq.status} />
      </div>
    ))}
    <p className="text-[8px] text-gray-neutral/50 text-center mt-1 italic">Datos ilustrativos</p>
  </div>
)

const TimelineMini: React.FC = () => (
  <div className="relative pl-4 space-y-2">
    <div className="absolute left-1.5 top-0 bottom-0 w-px bg-yellow-electric/20" />
    {timelineItems.map((item, i) => (
      <div key={i} className="relative flex items-start gap-2">
        <span className={`absolute -left-3.5 top-1 w-2 h-2 rounded-full border ${item.resolved ? 'border-yellow-electric bg-yellow-electric/30' : 'border-gray-neutral bg-transparent'}`} />
        <div>
          <div className="text-[10px] text-white-warm font-medium">{item.event}</div>
          <div className="text-[9px] text-gray-neutral">{item.date} · {item.resolved ? 'Resuelto' : 'En proceso'}</div>
        </div>
      </div>
    ))}
    <p className="text-[8px] text-gray-neutral/50 italic mt-1">Datos ilustrativos</p>
  </div>
)

const CalendarMini: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null)
  return (
    <div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {['L','M','X','J','V','S','D'].map((d) => (
          <div key={d} className="text-center text-[8px] text-gray-neutral py-0.5">{d}</div>
        ))}
        {calendarDays.map((d) => {
          const marked = markedDays.includes(d)
          return (
            <button key={d} onClick={() => setSelected(marked ? (selected === d ? null : d) : null)}
              className={`text-center text-[9px] py-1 rounded transition-all ${
                marked ? 'bg-yellow-electric text-black-deep font-bold cursor-pointer hover:bg-yellow-bright' :
                'text-gray-neutral/60 hover:bg-white/5'
              } ${selected === d ? 'ring-1 ring-yellow-electric' : ''}`}>
              {d}
            </button>
          )
        })}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mt-1 px-2 py-1.5 bg-yellow-electric/10 border border-yellow-electric/30 rounded-lg text-[9px] text-yellow-electric">
            📅 Día {selected}: Mantenimiento programado (ilustrativo)
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const AlertsMini: React.FC = () => {
  const [dismissed, setDismissed] = useState<number[]>([])
  const alerts = [
    { msg: 'PC-002: Mantenimiento mañana', level: 'high' },
    { msg: 'PC-003: Revisión pendiente', level: 'medium' },
    { msg: 'PC-001: Actualización en 5 días', level: 'low' },
  ]
  return (
    <div className="space-y-1.5">
      <AnimatePresence>
        {alerts.filter((_, i) => !dismissed.includes(i)).map((a, i) => (
          <motion.div key={i} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border ${
              a.level === 'high' ? 'bg-yellow-electric/10 border-yellow-electric/40' :
              a.level === 'medium' ? 'bg-yellow-electric/5 border-yellow-electric/20' :
              'bg-white/5 border-white/10'
            }`}>
            <Bell size={10} className="text-yellow-electric shrink-0" />
            <span className="text-[9px] text-white-warm flex-1">{a.msg}</span>
            <button onClick={() => setDismissed(d => [...d, i])} className="text-gray-neutral hover:text-white-warm ml-1">
              <X size={10} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      {dismissed.length === alerts.length && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center text-[9px] text-gray-neutral py-2">
          No hay alertas pendientes ✓
        </motion.div>
      )}
      <p className="text-[8px] text-gray-neutral/50 italic mt-1">Datos ilustrativos</p>
    </div>
  )
}

const DashboardMini: React.FC = () => {
  const [period, setPeriod] = useState<'semana' | 'mes'>('semana')
  const data = barData[period]
  return (
    <div>
      <div className="flex gap-1 mb-2">
        {(['semana', 'mes'] as const).map((p) => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-2 py-0.5 text-[9px] rounded transition-all ${period === p ? 'bg-yellow-electric text-black-deep font-bold' : 'text-gray-neutral hover:text-white-warm'}`}>
            {p === 'semana' ? 'Esta semana' : 'Este mes'}
          </button>
        ))}
      </div>
      <div className="flex items-end gap-1 h-16">
        <AnimatePresence mode="wait">
          {data.map((v, i) => (
            <motion.div key={`${period}-${i}`}
              className="flex-1 bg-yellow-electric/60 rounded-t min-h-[4px]"
              initial={{ height: 0 }} animate={{ height: `${v}%` }} exit={{ height: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }} />
          ))}
        </AnimatePresence>
      </div>
      <p className="text-[8px] text-gray-neutral/50 italic mt-1">Datos ilustrativos</p>
    </div>
  )
}

const ReportsMini: React.FC = () => {
  const [preview, setPreview] = useState<typeof reportes[0] | null>(null)
  return (
    <div>
      <div className="space-y-1.5">
        {reportes.map((r, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1.5 bg-black-deep/60 rounded-lg border border-white/5 hover:border-yellow-electric/20 transition-all">
            <FileText size={10} className="text-yellow-electric shrink-0" />
            <span className="text-[9px] text-white-warm flex-1 truncate">{r.name}</span>
            <button onClick={() => setPreview(r)}
              className="text-[8px] text-gray-neutral hover:text-yellow-electric px-1.5 py-0.5 border border-white/10 hover:border-yellow-electric/30 rounded transition-all">
              Ver
            </button>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {preview && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="mt-2 p-2 bg-black-deep border border-yellow-electric/20 rounded-lg">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] text-yellow-electric font-bold">{preview.name}</span>
              <button onClick={() => setPreview(null)} className="text-gray-neutral hover:text-white-warm"><X size={10}/></button>
            </div>
            <div className="space-y-1">
              {Array.from({ length: preview.pages }).map((_, i) => (
                <div key={i} className="flex gap-1.5 items-center">
                  <span className="text-[8px] text-gray-neutral w-8">Pág {i + 1}</span>
                  <div className="h-1.5 bg-white/10 rounded flex-1">
                    <div className="h-full bg-yellow-electric/40 rounded" style={{ width: `${60 + i * 8}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[8px] text-gray-neutral/50 mt-1.5 italic">Vista previa ilustrativa</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const PredictiveMini: React.FC = () => {
  const max = Math.max(...trendData)
  const w = 200; const h = 80
  const pts = trendData.map((v, i) => `${(i / (trendData.length - 1)) * w},${h - (v / max) * (h - 10) - 5}`)
  const polyline = pts.join(' ')
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-hidden="true">
        {/* Risk zone */}
        <rect x="120" y="0" width="80" height={h} fill="rgba(255,100,100,0.06)" />
        <line x1="120" y1="0" x2="120" y2={h} stroke="rgba(255,100,100,0.3)" strokeWidth="1" strokeDasharray="3 3"/>
        <text x="124" y="10" fill="rgba(255,100,100,0.5)" fontSize="7">Zona riesgo</text>
        {/* Trend line */}
        <motion.polyline points={polyline} fill="none" stroke="rgba(255,214,0,0.7)" strokeWidth="1.5" strokeLinejoin="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} viewport={{ once: true }} />
        {/* Area */}
        <motion.polygon points={`0,${h} ${polyline} ${w},${h}`} fill="rgba(255,214,0,0.05)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }} />
        {/* Alert dots in risk zone */}
        {trendData.slice(6).map((v, i) => {
          const x = ((i + 6) / (trendData.length - 1)) * w
          const y = h - (v / max) * (h - 10) - 5
          return (
            <motion.circle key={i} cx={x} cy={y} r="3" fill="rgba(255,100,100,0.6)"
              animate={{ r: [3, 5, 3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
          )
        })}
        <text x="4" y={h - 2} fill="#A3A3A3" fontSize="6">Histórico</text>
        <text x="122" y={h - 2} fill="rgba(255,100,100,0.5)" fontSize="6">Proyección</text>
      </svg>
      <div className="mt-2 px-2 py-1.5 bg-red-400/5 border border-red-400/20 rounded-lg">
        <p className="text-[9px] text-red-400/80 leading-relaxed">
          ⚠ Funcionalidad proyectada. Requiere datos suficientes y validación. No implementada actualmente.
        </p>
      </div>
    </div>
  )
}

const features: Feature[] = [
  {
    icon: <Monitor size={20} />, title: 'Gestión de equipos', color: 'text-blue-400',
    desc: 'Centraliza el inventario de computadores con información de estado, ubicación y asignación.',
    content: <EquipmentMini />,
  },
  {
    icon: <Clock size={20} />, title: 'Historial de fallas', color: 'text-purple-400',
    desc: 'Registra y consulta incidencias pasadas con su estado de resolución.',
    content: <TimelineMini />,
  },
  {
    icon: <Wrench size={20} />, title: 'Mantenimiento preventivo', color: 'text-orange-400',
    desc: 'Planifica mantenimientos con fechas marcadas y recordatorios en calendario.',
    content: <CalendarMini />,
  },
  {
    icon: <Bell size={20} />, title: 'Alertas y recordatorios', color: 'text-yellow-electric',
    desc: 'Recibe notificaciones sobre mantenimientos próximos o equipos que requieren atención.',
    content: <AlertsMini />,
  },
  {
    icon: <BarChart2 size={20} />, title: 'Dashboard e indicadores', color: 'text-emerald-400',
    desc: 'Visualiza el estado general mediante gráficos actualizados por período.',
    content: <DashboardMini />,
  },
  {
    icon: <FileText size={20} />, title: 'Reportes', color: 'text-cyan-400',
    desc: 'Genera y consulta informes de equipos, fallas y mantenimientos realizados.',
    content: <ReportsMini />,
  },
]

const FeaturesSection: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section className="relative py-24 bg-black-carbon overflow-hidden" aria-labelledby="features-title">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" aria-hidden="true" />

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
            Funcionalidades
          </span>
          <h2 id="features-title" className="section-title text-3xl sm:text-4xl lg:text-5xl mt-4">
            Todo lo que necesitas para{' '}
            <span className="text-yellow-electric">mantener el control.</span>
          </h2>
        </motion.div>

        {/* 6 features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className={`w-full text-left card-dark transition-all duration-300 hover:shadow-yellow-glow-sm ${
                  expanded === i ? 'border-yellow-electric/40 shadow-yellow-glow-sm' : 'hover:border-yellow-electric/20'
                }`}
                aria-expanded={expanded === i}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg bg-black-deep border border-white/10 flex items-center justify-center mb-4 ${f.color} group-hover:border-yellow-electric/20 transition-all`}>
                  {f.icon}
                </div>
                <h3 className="text-white-warm font-bold text-base mb-2 group-hover:text-yellow-electric transition-colors flex items-center justify-between">
                  {f.title}
                  <ChevronRight size={14} className={`transition-transform duration-300 ${expanded === i ? 'rotate-90 text-yellow-electric' : 'text-gray-neutral'}`} />
                </h3>
                <p className="text-gray-neutral text-sm leading-relaxed mb-3">{f.desc}</p>

                {/* Mini content */}
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-white/10 pt-3 mt-1"
                    >
                      {f.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Predictive block - special */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-yellow-electric/30 bg-gradient-to-br from-black-carbon via-black-surface/50 to-black-carbon p-8 overflow-hidden"
        >
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-yellow-electric/10 border border-yellow-electric/30 rounded-full text-xs text-yellow-electric font-mono font-medium tracking-widest">
              CAPACIDAD PROYECTADA
            </span>
          </div>
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-electric/3 rounded-full blur-3xl" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-electric/10 border border-yellow-electric/30 flex items-center justify-center">
                  <TrendingUp size={20} className="text-yellow-electric" />
                </div>
                <div className="w-6 h-px bg-yellow-electric/40" />
                <AlertTriangle size={16} className="text-yellow-electric/60" />
              </div>
              <h3 className="text-white-warm font-black text-2xl mb-3">
                Una capacidad{' '}
                <span className="text-yellow-electric">proyectada para el futuro.</span>
              </h3>
              <p className="text-gray-neutral leading-relaxed mb-4">
                Preventix contempla analizar datos históricos para identificar equipos con mayor probabilidad de presentar fallas, facilitando la priorización de mantenimientos.
              </p>
              <div className="p-3 bg-black-deep/60 border border-white/10 rounded-lg">
                <p className="text-gray-neutral text-sm leading-relaxed">
                  <span className="text-yellow-electric font-medium">⚠ Nota:</span> Esta funcionalidad requiere un volumen suficiente de datos históricos y validación. No representa un modelo implementado ni resultados garantizados.
                </p>
              </div>
            </div>
            <div className="bg-black-deep/60 rounded-xl p-4 border border-white/10">
              <p className="text-gray-neutral text-xs font-mono mb-3">TENDENCIA ILUSTRATIVA DE RIESGO</p>
              <PredictiveMini />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
