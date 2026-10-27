import React from 'react'
import { motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'

const CTASection: React.FC = () => {
  const scrollToTop = () => {
    document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-32 bg-black-deep overflow-hidden" aria-labelledby="cta-title">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" aria-hidden="true" />

      {/* Large ambient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-yellow-electric/6 rounded-full blur-3xl pointer-events-none"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden="true"
      />

      {/* Geometric SVG lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <motion.line x1="0" y1="700" x2="400" y2="200" stroke="rgba(255,214,0,0.06)" strokeWidth="1"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.2 }} />
        <motion.line x1="1440" y1="700" x2="1040" y2="200" stroke="rgba(255,214,0,0.06)" strokeWidth="1"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.4 }} />
        <motion.line x1="0" y1="0" x2="500" y2="350" stroke="rgba(255,214,0,0.04)" strokeWidth="1"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 0.6 }} />
        <motion.line x1="1440" y1="0" x2="940" y2="350" stroke="rgba(255,214,0,0.04)" strokeWidth="1"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 0.8 }} />
        {/* Corner diamonds */}
        <motion.polygon points="100,50 115,65 100,80 85,65" fill="none" stroke="rgba(255,214,0,0.15)" strokeWidth="1"
          animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 65px' }} />
        <motion.polygon points="1340,50 1355,65 1340,80 1325,65" fill="none" stroke="rgba(255,214,0,0.15)" strokeWidth="1"
          animate={{ rotate: [360, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '1340px 65px' }} />
      </svg>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="section-label justify-center">
            <span className="w-6 h-px bg-yellow-electric" />
            Una nueva perspectiva
            <span className="w-6 h-px bg-yellow-electric" />
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          id="cta-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-white-warm leading-tight mb-6"
        >
          Es momento de gestionar tus equipos{' '}
          <span className="text-yellow-electric">con una nueva perspectiva.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-neutral text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Descubre Preventix, una propuesta de Cognitek para organizar la información, planificar mantenimientos y mejorar el seguimiento de los equipos de cómputo.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={scrollToTop}
            className="btn-primary text-lg px-10 py-4 shadow-yellow-glow hover:shadow-yellow-glow-lg group"
            aria-label="Volver al inicio de la página"
          >
            <ArrowUp size={20} className="transition-transform group-hover:-translate-y-1" />
            Volver al inicio
          </button>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-yellow-electric/40 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-gray-neutral/40 text-xs font-mono"
        >
          COGNITEK · PREVENTIX · 2026
        </motion.p>
      </div>
    </section>
  )
}

export default CTASection
