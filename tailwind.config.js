/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-deep': '#0A0A0A',
        'black-carbon': '#141414',
        'black-surface': '#202020',
        'yellow-electric': '#FFD600',
        'yellow-bright': '#FFEA00',
        'white-warm': '#F5F5F0',
        'gray-neutral': '#A3A3A3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-yellow': 'pulseYellow 2s ease-in-out infinite',
        'draw-line': 'drawLine 2s ease-in-out forwards',
        'ambient-glow': 'ambientGlow 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseYellow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 214, 0, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(255, 214, 0, 0)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        ambientGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(255,214,0,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,214,0,0.05) 1px, transparent 1px)`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      boxShadow: {
        'yellow-glow': '0 0 30px rgba(255, 214, 0, 0.3)',
        'yellow-glow-sm': '0 0 15px rgba(255, 214, 0, 0.2)',
        'yellow-glow-lg': '0 0 60px rgba(255, 214, 0, 0.4)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.7)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
