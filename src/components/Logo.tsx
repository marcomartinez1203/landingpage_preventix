import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

const sizeMap = {
  sm: { icon: 28, text: 'text-base' },
  md: { icon: 36, text: 'text-xl' },
  lg: { icon: 48, text: 'text-2xl' },
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const { icon, text } = sizeMap[size]
  return (
    <div className="flex items-center gap-2 select-none">
      <svg width={icon} height={icon} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Hexagon */}
        <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="#141414" stroke="#FFD600" strokeWidth="1.5"/>
        {/* Shield */}
        <path d="M20 10 L28 14 L28 22 Q28 28 20 32 Q12 28 12 22 L12 14 Z" fill="none" stroke="#FFD600" strokeWidth="1.2"/>
        {/* Check mark */}
        <path d="M15 21 L18.5 24.5 L25 17" stroke="#FFD600" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {showText && (
        <span className={`font-bold tracking-widest text-white-warm ${text} font-sans`}>
          PREVENTIX
        </span>
      )}
    </div>
  )
}

export default Logo
