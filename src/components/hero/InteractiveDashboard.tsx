import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Monitor, Wrench, AlertTriangle, LayoutGrid, Bell, FileText, ChevronRight, X, CheckCircle, Clock, AlertCircle } from 'lucide-react'

// Datos ilustrativos - no representan resultados reales
const equipos = [
  { id: 'PC-001', nombre: 'Estación Contabilidad', estado: 'operativo', ubicacion: 'Piso 2', ultimo: '15 Oct 2026' },
  { id: 'PC-002', nombre: 'Servidor Archivos', estado: 'mantenimiento', ubicacion: 'Sala TI', ultimo: '20 Oct 2026' },
  { id: 'PC-003', nombre: 'PC Recepción', estado: 'alerta', ubicacion: 'Piso 1', ultimo: '10 Oct 2026' },
  { id: 'PC-004', nombre: 'Laptop Gerencia', estado: 'operativo', ubicacion: 'Piso 3', ultimo: '25 Oct 2026' },
  { id: 'PC-005', nombre: 'PC Diseño', estado: 'inactivo', ubicacion: 'Piso 2', ultimo: '01 Oct 2026' },
]
const mantenimientos = [
  { equipo: 'PC-002', tipo: 'Limpieza interna', fecha: 'Mañana', prioridad: 'alta' },
  { equipo: 'PC-001', tipo: 'Actualización SO', fecha: 'En 5 días', prioridad: 'media' },
  { equipo: 'PC-004', tipo: 'Revisión batería', fecha: 'En 10 días', prioridad: 'baja' },
  { equipo: 'PC-003', tipo: 'Diagnóstico falla', fecha: 'Urgente', prioridad: 'alta' },
]
const incidencias = [
  { equipo: 'PC-003', descripcion: 'Pantalla azul recurrente', estado: 'resuelto', fecha: '10 Oct' },
  { equipo: 'PC-002', descripcion: 'Temperatura excesiva', estado: 'en_proceso', fecha: '20 Oct' },
  { equipo: 'PC-005', descripcion: 'No enciende', estado: 'pendiente', fecha: '01 Oct' },
]
const graficaDatos = {
  semana: [65, 82, 45, 90, 70, 55, 80],
  labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
}

type Tab = 'equipos' | 'mantenimientos' | 'incidencias'
type SideTab = 'dashboard' | 'equipos' | 'alertas' | 'reportes'

const estadoConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  operativo: { label: 'Operativo', color: 'text-emerald-400 bg-emerald-400/10', icon: <CheckCircle size={11} /> },
  mantenimiento: { label: 'Mantenimiento', color: 'text-yellow-electric bg-yellow-electric/10', icon: <Wrench size={11} /> },
  alerta: { label: 'Alerta', color: 'text-red-400 bg-red-400/10', icon: <AlertCircle size={11} /> },
  inactivo: { label: 'Inactivo', color: 'text-gray-neutral bg-white/5', icon: <Clock size={11} /> },
  resuelto: { label: 'Resuelto', color: 'text-emerald-400 bg-emerald-400/10', icon: <CheckCircle size={11} /> },
  en_proceso: { label: 'En proceso', color: 'text-yellow-electric bg-yellow-electric/10', icon: <Clock size={11} /> },
  pendiente: { label: 'Pendiente', color: 'text-gray-neutral bg-white/5', icon: <AlertCircle size={11} /> },
}

const InteractiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('equipos')
  const [sideTab, setSideTab] = useState<SideTab>('dashboard')
  const [selectedEquipo, setSelectedEquipo] = useState<typeof equipos[0] | null>(null)
  const [notifOpen, setNotifOpen] = useState(false)

  const sideIcons: { id: SideTab; icon: React.ReactNode; label: string }[] = [
    { id: 'dashboard', icon: <LayoutGrid size={16} />, label: 'Dashboard' },
    { id: 'equipos', icon: <Monitor size={16} />, label: 'Equipos' },
    { id: 'alertas', icon: <Bell size={16} />, label: 'Alertas' },
    { id: 'reportes', icon: <FileText size={16} />, label: 'Reportes' },
  ]

  return (
    <div className="relative w-full max-w-[580px] rounded-2xl overflow-hidden border border-white/10 shadow-card bg-black-carbon"
      style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>

      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black-deep/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-gray-neutral text-xs font-mono">preventix • panel de control</span>
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative text-gray-neutral hover:text-yellow-electric transition-colors p-1 rounded"
          aria-label="Notificaciones"
        >
          <Bell size={14} />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-yellow-electric rounded-full" />
        </button>
      </div>

      <div className="flex h-[380px]">
        {/* Sidebar */}
        <div className="w-12 border-r border-white/10 flex flex-col items-center py-3 gap-2 bg-black-deep/40">
          {sideIcons.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setSideTab(id)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                sideTab === id ? 'bg-yellow-electric text-black-deep' : 'text-gray-neutral hover:text-white-warm hover:bg-white/10'
              }`}
              aria-label={label}
              title={label}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/10 bg-black-deep/20">
            {(['equipos', 'mantenimientos', 'incidencias'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-2 text-xs font-medium capitalize transition-colors border-b-2 ${
                  activeTab === t
                    ? 'text-yellow-electric border-yellow-electric'
                    : 'text-gray-neutral border-transparent hover:text-white-warm'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Resumen cards */}
          {activeTab === 'equipos' && (
            <div className="p-3 grid grid-cols-4 gap-2 border-b border-white/10">
              {[
                { label: 'Total', value: '5', color: 'text-white-warm' },
                { label: 'Operativos', value: '2', color: 'text-emerald-400' },
                { label: 'Alertas', value: '1', color: 'text-yellow-electric' },
                { label: 'Mant.', value: '1', color: 'text-orange-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-black-deep/60 rounded-lg p-2 text-center border border-white/5">
                  <div className={`text-lg font-bold ${color}`}>{value}</div>
                  <div className="text-gray-neutral text-[10px]">{label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'equipos' && (
                <motion.div key="equipos"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="divide-y divide-white/5"
                >
                  {equipos.map((eq) => {
                    const cfg = estadoConfig[eq.estado]
                    return (
                      <button
                        key={eq.id}
                        onClick={() => setSelectedEquipo(selectedEquipo?.id === eq.id ? null : eq)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors text-left ${
                          selectedEquipo?.id === eq.id ? 'bg-yellow-electric/5 border-l-2 border-yellow-electric' : ''
                        }`}
                      >
                        <Monitor size={14} className="text-gray-neutral shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-white-warm text-xs font-medium truncate">{eq.nombre}</div>
                          <div className="text-gray-neutral text-[10px]">{eq.id} · {eq.ubicacion}</div>
                        </div>
                        <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${cfg.color}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                        <ChevronRight size={12} className="text-gray-neutral shrink-0" />
                      </button>
                    )
                  })}
                </motion.div>
              )}

              {activeTab === 'mantenimientos' && (
                <motion.div key="mantenimientos"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="p-3 space-y-2"
                >
                  {/* Mini gráfica de barras */}
                  <div className="bg-black-deep/60 rounded-lg p-3 border border-white/5 mb-3">
                    <div className="text-gray-neutral text-[10px] mb-2 font-mono">ACTIVIDAD SEMANAL (ilustrativo)</div>
                    <div className="flex items-end gap-1 h-16">
                      {graficaDatos.semana.map((v, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <motion.div
                            className="w-full bg-yellow-electric/70 rounded-t"
                            initial={{ height: 0 }}
                            animate={{ height: `${v}%` }}
                            transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                          />
                          <span className="text-gray-neutral text-[8px]">{graficaDatos.labels[i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {mantenimientos.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 bg-black-deep/40 rounded-lg px-3 py-2 border border-white/5">
                      <Wrench size={12} className="text-yellow-electric shrink-0" />
                      <div className="flex-1">
                        <div className="text-white-warm text-xs">{m.equipo} — {m.tipo}</div>
                        <div className="text-gray-neutral text-[10px]">{m.fecha}</div>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        m.prioridad === 'alta' ? 'text-red-400 bg-red-400/10' :
                        m.prioridad === 'media' ? 'text-yellow-electric bg-yellow-electric/10' :
                        'text-gray-neutral bg-white/5'
                      }`}>
                        {m.prioridad}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'incidencias' && (
                <motion.div key="incidencias"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="p-3 space-y-2"
                >
                  {incidencias.map((inc, i) => {
                    const cfg = estadoConfig[inc.estado]
                    return (
                      <div key={i} className="bg-black-deep/40 rounded-lg px-3 py-2.5 border border-white/5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white-warm text-xs font-medium">{inc.equipo}</span>
                          <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${cfg.color}`}>
                            {cfg.icon} {cfg.label}
                          </span>
                        </div>
                        <div className="text-gray-neutral text-[10px]">{inc.descripcion} · {inc.fecha}</div>
                      </div>
                    )
                  })}

                  {/* Ring indicators */}
                  <div className="flex gap-3 mt-2">
                    {[
                      { label: 'Resueltas', pct: 33, color: '#10b981' },
                      { label: 'En proceso', pct: 33, color: '#FFD600' },
                      { label: 'Pendientes', pct: 34, color: '#6b7280' },
                    ].map(({ label, pct, color }) => {
                      const r = 18; const circ = 2 * Math.PI * r
                      return (
                        <div key={label} className="flex flex-col items-center gap-1 flex-1 bg-black-deep/40 rounded-lg p-2 border border-white/5">
                          <svg width={44} height={44} viewBox="0 0 44 44">
                            <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3"/>
                            <motion.circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="3"
                              strokeLinecap="round" strokeDasharray={circ}
                              initial={{ strokeDashoffset: circ }}
                              animate={{ strokeDashoffset: circ - (circ * pct) / 100 }}
                              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                              transform="rotate(-90 22 22)"
                            />
                            <text x="22" y="26" textAnchor="middle" fill={color} fontSize="10" fontWeight="bold">{pct}%</text>
                          </svg>
                          <span className="text-[9px] text-gray-neutral text-center">{label}</span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Panel detalle equipo */}
        <AnimatePresence>
          {selectedEquipo && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 160, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="border-l border-white/10 bg-black-deep/80 overflow-hidden shrink-0"
            >
              <div className="p-3 w-40">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-yellow-electric text-[10px] font-bold uppercase tracking-widest">Detalle</span>
                  <button onClick={() => setSelectedEquipo(null)} className="text-gray-neutral hover:text-white-warm">
                    <X size={12} />
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-gray-neutral text-[9px] uppercase mb-0.5">ID</div>
                    <div className="text-white-warm text-xs font-mono">{selectedEquipo.id}</div>
                  </div>
                  <div>
                    <div className="text-gray-neutral text-[9px] uppercase mb-0.5">Nombre</div>
                    <div className="text-white-warm text-[10px]">{selectedEquipo.nombre}</div>
                  </div>
                  <div>
                    <div className="text-gray-neutral text-[9px] uppercase mb-0.5">Ubicación</div>
                    <div className="text-white-warm text-[10px]">{selectedEquipo.ubicacion}</div>
                  </div>
                  <div>
                    <div className="text-gray-neutral text-[9px] uppercase mb-0.5">Estado</div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 w-fit ${estadoConfig[selectedEquipo.estado].color}`}>
                      {estadoConfig[selectedEquipo.estado].icon}
                      {estadoConfig[selectedEquipo.estado].label}
                    </span>
                  </div>
                  <div>
                    <div className="text-gray-neutral text-[9px] uppercase mb-0.5">Último mant.</div>
                    <div className="text-white-warm text-[10px]">{selectedEquipo.ultimo}</div>
                  </div>
                  <div className="w-full h-px bg-white/10 my-2" />
                  <div className="text-gray-neutral text-[9px] italic">Datos ilustrativos</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notification panel */}
      <AnimatePresence>
        {notifOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-10 right-2 w-52 bg-black-carbon border border-white/15 rounded-xl shadow-card overflow-hidden z-10"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
              <span className="text-xs font-medium text-white-warm">Notificaciones</span>
              <button onClick={() => setNotifOpen(false)} className="text-gray-neutral hover:text-white-warm"><X size={12}/></button>
            </div>
            {[
              { msg: 'PC-002: Mantenimiento mañana', type: 'warn' },
              { msg: 'PC-003: Requiere diagnóstico', type: 'alert' },
              { msg: 'PC-001: Actualización pendiente', type: 'info' },
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-2 px-3 py-2 border-b border-white/5 hover:bg-white/5 transition-colors">
                <span className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                  n.type === 'alert' ? 'bg-red-400' : n.type === 'warn' ? 'bg-yellow-electric' : 'bg-blue-400'
                }`}/>
                <span className="text-gray-neutral text-[10px]">{n.msg}</span>
              </div>
            ))}
            <div className="px-3 py-1.5 text-center">
              <span className="text-[9px] text-gray-neutral italic">Ilustrativo</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data label */}
      <div className="px-4 py-1.5 bg-black-deep/60 border-t border-white/10 flex items-center justify-between">
        <span className="text-[9px] text-gray-neutral font-mono">PREVENTIX • DATOS ILUSTRATIVOS</span>
        <span className="flex items-center gap-1 text-[9px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
          demo activo
        </span>
      </div>
    </div>
  )
}

export default InteractiveDashboard
