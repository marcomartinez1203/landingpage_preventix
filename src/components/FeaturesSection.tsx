import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Monitor, Clock, Wrench, Bell, BarChart2, FileText, X, ChevronRight, CheckCircle2, AlertCircle, CalendarClock, History, ChevronDown, Tag, Cpu, MapPin } from 'lucide-react'

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
// ── Datos para el dashboard de seguimiento de mantenimiento ──────────────────
type MtStatus = 'completado' | 'pendiente' | 'proximo'
interface Mantenimiento {
  id: string
  equipo: string
  tipo: string
  fecha: string
  tecnico: string
  status: MtStatus
  nota: string
}
const equiposDashboard = [
  { id: 'PC-001', nombre: 'Contabilidad A', ubicacion: 'Of. 201', tipo: 'Workstation', status: 'operativo' as const },
  { id: 'PC-002', nombre: 'Servidor Principal', ubicacion: 'Sala TI', tipo: 'Servidor', status: 'mantenimiento' as const },
  { id: 'PC-003', nombre: 'Recepción', ubicacion: 'Lobby', tipo: 'All-in-One', status: 'alerta' as const },
  { id: 'PC-004', nombre: 'Gerencia', ubicacion: 'Of. 301', tipo: 'Laptop', status: 'operativo' as const },
  { id: 'PC-005', nombre: 'Diseño', ubicacion: 'Of. 105', tipo: 'Workstation', status: 'proximo' as const },
]
const mantenimientosData: Mantenimiento[] = [
  { id: 'MT-001', equipo: 'PC-002', tipo: 'Preventivo', fecha: '28 Oct 2026', tecnico: 'Andrés M.', status: 'pendiente', nota: 'Limpieza interna y revisión de ventiladores' },
  { id: 'MT-002', equipo: 'PC-003', tipo: 'Correctivo', fecha: '27 Oct 2026', tecnico: 'Laura G.', status: 'pendiente', nota: 'Falla en pantalla, reemplazo de cable' },
  { id: 'MT-003', equipo: 'PC-005', tipo: 'Preventivo', fecha: '02 Nov 2026', tecnico: 'Andrés M.', status: 'proximo', nota: 'Revisión programada trimestral' },
  { id: 'MT-004', equipo: 'PC-001', tipo: 'Preventivo', fecha: '15 Oct 2026', tecnico: 'Laura G.', status: 'completado', nota: 'Actualización de drivers y limpieza' },
  { id: 'MT-005', equipo: 'PC-004', tipo: 'Preventivo', fecha: '10 Oct 2026', tecnico: 'Carlos V.', status: 'completado', nota: 'Revisión de batería y puertos' },
  { id: 'MT-006', equipo: 'PC-001', tipo: 'Correctivo', fecha: '01 Oct 2026', tecnico: 'Andrés M.', status: 'completado', nota: 'Reemplazo de teclado defectuoso' },
]

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




// ── Status config helpers ─────────────────────────────────────────────────────
const equipoStatusCfg = {
  operativo: { label: 'Operativo', dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
  mantenimiento: { label: 'Mantenimiento', dot: 'bg-yellow-electric', text: 'text-yellow-electric', bg: 'bg-yellow-electric/10 border-yellow-electric/30' },
  alerta: { label: 'Alerta', dot: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
  proximo: { label: 'Próximo mant.', dot: 'bg-blue-400', text: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
}
const mtStatusCfg: Record<MtStatus, { label: string; icon: React.ReactNode; badge: string }> = {
  completado: { label: 'Completado', icon: <CheckCircle2 size={13} className="text-emerald-400" />, badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  pendiente:  { label: 'Pendiente',  icon: <AlertCircle  size={13} className="text-red-400" />,     badge: 'text-red-400 bg-red-400/10 border-red-400/20' },
  proximo:    { label: 'Próximo',    icon: <CalendarClock size={13} className="text-blue-400" />,   badge: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
}

type FilterTab = 'todos' | MtStatus
const filterTabs: { key: FilterTab; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'pendiente', label: 'Pendientes' },
  { key: 'proximo', label: 'Próximos' },
  { key: 'completado', label: 'Historial' },
]

const MaintenanceDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('todos')
  const [selectedEquipo, setSelectedEquipo] = useState<typeof equiposDashboard[0] | null>(null)
  const [openMt, setOpenMt] = useState<string | null>(null)

  const filtered = mantenimientosData.filter(
    (m) => activeFilter === 'todos' || m.status === activeFilter
  )

  // Equipo detail: mantenimientos of that equipo
  const equipoMts = selectedEquipo
    ? mantenimientosData.filter((m) => m.equipo === selectedEquipo.id)
    : []

  const stats = [
    { label: 'Equipos registrados', value: equiposDashboard.length, icon: <Monitor size={16} className="text-yellow-electric" /> },
    { label: 'Pendientes', value: mantenimientosData.filter(m => m.status === 'pendiente').length, icon: <AlertCircle size={16} className="text-red-400" /> },
    { label: 'Próximos', value: mantenimientosData.filter(m => m.status === 'proximo').length, icon: <CalendarClock size={16} className="text-blue-400" /> },
    { label: 'Realizados', value: mantenimientosData.filter(m => m.status === 'completado').length, icon: <History size={16} className="text-emerald-400" /> },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
      className="relative rounded-2xl border border-yellow-electric/30 bg-gradient-to-br from-black-carbon via-black-surface/40 to-black-carbon overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-80 h-40 bg-yellow-electric/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-60 h-32 bg-yellow-electric/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-yellow-electric/10 border border-yellow-electric/30 flex items-center justify-center">
                <Wrench size={16} className="text-yellow-electric" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-yellow-electric/70 uppercase">Seguimiento de mantenimiento</span>
            </div>
            <h3 className="text-white-warm font-black text-xl sm:text-2xl">
              Cada equipo,{' '}
              <span className="text-yellow-electric">en el estado correcto.</span>
            </h3>
            <p className="text-gray-neutral text-sm mt-1 max-w-lg">
              Consulta el estado de los equipos y lleva un seguimiento organizado de los mantenimientos programados, realizados y pendientes.
            </p>
          </div>
          <span className="px-3 py-1 bg-yellow-electric/10 border border-yellow-electric/30 rounded-full text-[10px] text-yellow-electric font-mono font-medium tracking-widest shrink-0">
            DATOS ILUSTRATIVOS
          </span>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-black-deep/60 border border-white/8 rounded-xl p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                {s.icon}
              </div>
              <div>
                <div className="text-white-warm font-black text-xl leading-none">{s.value}</div>
                <div className="text-gray-neutral text-[10px] mt-0.5">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main layout: equipo list + maintenance table */}
        <div className="grid lg:grid-cols-[220px_1fr] gap-5">

          {/* Equipment sidebar */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono text-gray-neutral/60 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Cpu size={11} /> Equipos
            </p>
            {equiposDashboard.map((eq) => {
              const cfg = equipoStatusCfg[eq.status]
              const isSelected = selectedEquipo?.id === eq.id
              return (
                <motion.button
                  key={eq.id}
                  onClick={() => setSelectedEquipo(isSelected ? null : eq)}
                  whileHover={{ x: 2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-yellow-electric/10 border-yellow-electric/40'
                      : 'bg-black-deep/50 border-white/8 hover:border-yellow-electric/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono text-gray-neutral">{eq.id}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${eq.status === 'alerta' ? 'animate-pulse' : ''}`} />
                  </div>
                  <div className="text-xs text-white-warm font-medium truncate">{eq.nombre}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={9} className="text-gray-neutral/50" />
                    <span className="text-[9px] text-gray-neutral/60">{eq.ubicacion}</span>
                    <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded border ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Right panel */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {selectedEquipo ? (
                /* ── Equipo detail panel ────────────────────────────── */
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-black-deep/60 border border-yellow-electric/25 rounded-xl p-4 h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-yellow-electric/60 uppercase">Detalle de equipo</span>
                      <h4 className="text-white-warm font-bold text-base mt-0.5">{selectedEquipo.nombre}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Tag size={10} className="text-gray-neutral" />
                        <span className="text-[10px] text-gray-neutral">{selectedEquipo.tipo}</span>
                        <span className="text-gray-neutral/30">·</span>
                        <MapPin size={10} className="text-gray-neutral" />
                        <span className="text-[10px] text-gray-neutral">{selectedEquipo.ubicacion}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedEquipo(null)}
                      className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-gray-neutral hover:text-white-warm hover:border-yellow-electric/30 transition-all"
                    >
                      <X size={13} />
                    </button>
                  </div>

                  <p className="text-[10px] font-mono text-gray-neutral/50 uppercase tracking-widest mb-2">
                    Mantenimientos asociados ({equipoMts.length})
                  </p>
                  {equipoMts.length === 0 ? (
                    <p className="text-gray-neutral text-xs py-6 text-center">Sin mantenimientos registrados.</p>
                  ) : (
                    <div className="space-y-2">
                      {equipoMts.map((mt) => {
                        const cfg = mtStatusCfg[mt.status]
                        return (
                          <div key={mt.id} className="px-3 py-2.5 bg-black-carbon/60 rounded-lg border border-white/8 flex items-center gap-3">
                            {cfg.icon}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-white-warm font-medium">{mt.tipo}</span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded border ${cfg.badge}`}>{cfg.label}</span>
                              </div>
                              <div className="text-[10px] text-gray-neutral mt-0.5 truncate">{mt.nota}</div>
                            </div>
                            <span className="text-[9px] text-gray-neutral/60 shrink-0">{mt.fecha}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </motion.div>
              ) : (
                /* ── Maintenance list ────────────────────────────────── */
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Filter tabs */}
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {filterTabs.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveFilter(tab.key)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 border ${
                          activeFilter === tab.key
                            ? 'bg-yellow-electric text-black-deep border-yellow-electric font-bold'
                            : 'text-gray-neutral border-white/10 hover:border-yellow-electric/30 hover:text-white-warm'
                        }`}
                      >
                        {tab.label}
                        <span className="ml-1.5 opacity-60">
                          {tab.key === 'todos'
                            ? mantenimientosData.length
                            : mantenimientosData.filter(m => m.status === tab.key).length}
                        </span>
                      </button>
                    ))}
                    <span className="ml-auto text-[9px] text-gray-neutral/40 self-center">Selecciona un equipo para ver su detalle →</span>
                  </div>

                  {/* Maintenance rows */}
                  <div className="space-y-2">
                    <AnimatePresence mode="popLayout">
                      {filtered.map((mt) => {
                        const cfg = mtStatusCfg[mt.status]
                        const isOpen = openMt === mt.id
                        return (
                          <motion.div
                            key={mt.id}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                              isOpen
                                ? 'bg-black-deep/80 border-yellow-electric/30'
                                : 'bg-black-deep/50 border-white/8 hover:border-yellow-electric/15'
                            }`}
                          >
                            <button
                              onClick={() => setOpenMt(isOpen ? null : mt.id)}
                              className="w-full text-left px-4 py-3 flex items-center gap-3"
                            >
                              {cfg.icon}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-xs text-white-warm font-semibold">{mt.equipo}</span>
                                  <span className="text-[10px] text-gray-neutral">— {mt.tipo}</span>
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded border ${cfg.badge}`}>{cfg.label}</span>
                                </div>
                                <div className="text-[10px] text-gray-neutral/70 mt-0.5">{mt.fecha} · {mt.tecnico}</div>
                              </div>
                              <ChevronDown
                                size={13}
                                className={`text-gray-neutral transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-yellow-electric' : ''}`}
                              />
                            </button>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.22 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-3 pt-1 border-t border-white/8">
                                    <div className="flex items-start gap-2">
                                      <span className="text-[9px] font-mono text-gray-neutral/50 uppercase mt-0.5">Nota:</span>
                                      <p className="text-xs text-gray-neutral leading-relaxed">{mt.nota}</p>
                                    </div>
                                    <div className="mt-2 flex gap-4 text-[9px] text-gray-neutral/50">
                                      <span>ID: <span className="text-gray-neutral font-mono">{mt.id}</span></span>
                                      <span>Técnico: <span className="text-gray-neutral">{mt.tecnico}</span></span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>

                    {filtered.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10 text-gray-neutral text-sm"
                      >
                        No hay mantenimientos en este filtro.
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
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

        {/* ── Maintenance Tracking Dashboard ─────────────────────────────── */}
        <MaintenanceDashboard />
      </div>
    </section>
  )
}

export default FeaturesSection
