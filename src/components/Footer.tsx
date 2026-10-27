import React from 'react'
import { motion } from 'motion/react'
import Logo from './Logo'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Solución', href: '#solucion' },
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Contacto', href: '#contacto' },
]

const Footer: React.FC = () => {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-black-deep border-t border-white/8 overflow-hidden" role="contentinfo">
      {/* Decorative animated line */}
      <div className="relative h-px overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-electric to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <Logo size="md" showText={true} />
            <p className="text-gray-neutral/60 text-sm mt-3 leading-relaxed max-w-xs">
              Gestión inteligente de equipos de cómputo para organizaciones que dependen de su infraestructura tecnológica.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white-warm font-semibold text-sm mb-4 tracking-wide">Navegación</h3>
            <nav className="space-y-2.5" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="block text-gray-neutral text-sm hover:text-yellow-electric transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-electric rounded"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Cognitek info */}
          <div>
            <h3 className="text-white-warm font-semibold text-sm mb-4 tracking-wide">Cognitek</h3>
            <p className="text-yellow-electric/80 text-sm font-medium mb-2">
              "Donde la cognición humana se encuentra con la potencia digital."
            </p>
            <p className="text-gray-neutral/50 text-xs leading-relaxed">
              Proyecto académico de emprendimiento tecnológico · 2026
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-neutral/40 text-xs font-mono">
            © 2026 Preventix · Cognitek · Proyecto académico
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-electric/60 animate-pulse" aria-hidden="true" />
            <span className="text-gray-neutral/40 text-xs font-mono">Proyecto académico · Sin fines comerciales</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
