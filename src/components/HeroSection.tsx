import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import HeroBackground from './hero/HeroBackground'
import InteractiveDashboard from './hero/InteractiveDashboard'

const HeroSection: React.FC = () => {
  const dashRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 6,
      })
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <HeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-16 items-center">

          {/* Left: content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            {/* Label */}
            <motion.div variants={item}>
              <span className="section-label">
                <span className="w-6 h-px bg-yellow-electric" aria-hidden="true" />
                Gestión Inteligente de Equipos
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight text-white-warm"
            >
              Tus equipos{' '}
              <span className="text-yellow-electric">bajo control.</span>
              <br />
              Tu empresa{' '}
              <span className="text-yellow-electric">un paso adelante.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={item}
              className="text-gray-neutral text-lg leading-relaxed max-w-lg"
            >
              Centraliza tus equipos, organiza tus mantenimientos y lleva el control de las fallas desde una sola plataforma.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => document.getElementById('funcionalidades')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary text-base px-7 py-3.5 shadow-yellow-glow-sm hover:shadow-yellow-glow"
              >
                Explorar Preventix <ArrowRight size={18} />
              </button>
              <button
                onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary text-base px-7 py-3.5"
              >
                Descubrir cómo funciona <ChevronDown size={18} />
              </button>
            </motion.div>

            {/* Firm */}
            <motion.p variants={item} className="text-gray-neutral/60 text-sm font-mono tracking-wide">
              Una propuesta tecnológica de{' '}
              <span className="text-gray-neutral font-semibold">Cognitek</span>
            </motion.p>
          </motion.div>

          {/* Right: Dashboard */}
          <motion.div
            ref={dashRef}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              rotateX: mouse.y * -0.5,
              rotateY: mouse.x * 0.5,
              perspective: 1200,
            }}
            className="relative lg:flex justify-center items-center hidden lg:block"
          >
            {/* Glow behind dashboard */}
            <div className="absolute inset-0 bg-yellow-electric/5 rounded-3xl blur-3xl scale-110 pointer-events-none" aria-hidden="true" />
            <InteractiveDashboard />
          </motion.div>
        </div>

        {/* Mobile dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="lg:hidden mt-10 flex justify-center"
        >
          <InteractiveDashboard />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-[10px] text-gray-neutral/50 font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-yellow-electric rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
