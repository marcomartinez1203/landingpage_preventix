import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const HeroBackground: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const { scrollY } = useScroll()
  const gridY = useTransform(scrollY, [0, 600], [0, 80])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const orbX = (mouse.x - 0.5) * 40
  const orbY = (mouse.y - 0.5) * 40

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Grid */}
      <motion.div
        className="absolute inset-0 grid-bg opacity-60"
        style={{ y: gridY }}
      />
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black-deep/60 to-black-deep" />

      {/* Ambient orbs */}
      <motion.div
        className="ambient-orb w-[600px] h-[600px] bg-yellow-electric/10"
        style={{
          top: '5%',
          left: '55%',
          x: orbX * 0.6,
          y: orbY * 0.6,
        }}
        animate={{ opacity: [0.08, 0.2, 0.08], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-orb w-[400px] h-[400px] bg-yellow-electric/8"
        style={{ bottom: '10%', left: '5%', x: orbX * -0.3, y: orbY * -0.3 }}
        animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.15, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="ambient-orb w-[300px] h-[300px] bg-yellow-bright/6"
        style={{ top: '40%', left: '30%', x: orbX * 0.2, y: orbY * 0.2 }}
        animate={{ opacity: [0.03, 0.1, 0.03] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Decorative SVG lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <motion.line x1="0" y1="200" x2="400" y2="400" stroke="rgba(255,214,0,0.06)" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 1 }} />
        <motion.line x1="1440" y1="100" x2="900" y2="500" stroke="rgba(255,214,0,0.06)" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 1.5 }} />
        <motion.circle cx="200" cy="600" r="2" fill="rgba(255,214,0,0.3)"
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="1200" cy="200" r="2" fill="rgba(255,214,0,0.3)"
          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
        <motion.circle cx="700" cy="750" r="1.5" fill="rgba(255,214,0,0.2)"
          animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 2 }} />
      </svg>
    </div>
  )
}

export default HeroBackground
