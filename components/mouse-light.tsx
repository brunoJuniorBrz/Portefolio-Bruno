
"use client"

import { useEffect, useState } from 'react'

export function MouseLight() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isOverCard, setIsOverCard] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      
      // Detecta se o mouse está sobre um card
      const target = e.target as HTMLElement
      const isCard = target.closest('.card-glow, [class*="card"], [class*="Card"]')
      setIsOverCard(!!isCard)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.08) 30%, transparent 70%)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        mixBlendMode: 'screen',
        transition: 'opacity 0.3s ease',
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible && !isOverCard ? 1 : 0,
      }}
    />
  )
}
