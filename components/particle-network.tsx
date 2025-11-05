"use client"

import { useEffect, useRef } from 'react'

const MAX_DISTANCE = 150
const PARTICLE_COLOR = 'rgba(168,85,247,0.5)'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const createParticle = (width: number, height: number): Particle => {
  const angle = Math.random() * Math.PI * 2
  const speed = 0.3 + Math.random() * 0.4

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 1 + Math.random() * 1,
  }
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const particles = particlesRef.current
    particles.length = 0

    let width = window.innerWidth
    let height = window.innerHeight
    const dpi = Math.min(2, window.devicePixelRatio || 1)

    const targetParticleCount = (viewportWidth: number) => {
      if (viewportWidth < 640) {
        return 18
      }
      if (viewportWidth < 1024) {
        return 32
      }
      return 50
    }

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpi
      canvas.height = height * dpi
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0)

      const desiredCount = targetParticleCount(width)
      while (particles.length < desiredCount) {
        particles.push(createParticle(width, height))
      }
      while (particles.length > desiredCount) {
        particles.pop()
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Update particles
      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) {
          particle.x = 0
          particle.vx *= -1
        } else if (particle.x > width) {
          particle.x = width
          particle.vx *= -1
        }

        if (particle.y < 0) {
          particle.y = 0
          particle.vy *= -1
        } else if (particle.y > height) {
          particle.y = height
          particle.vy *= -1
        }

        ctx.beginPath()
        ctx.fillStyle = PARTICLE_COLOR
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw connections
      const particleCount = particles.length
      const dynamicMaxDistance = width < 640 ? 90 : width < 1024 ? 120 : MAX_DISTANCE
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.hypot(dx, dy)

          if (distance < dynamicMaxDistance) {
            const opacity = 1 - distance / dynamicMaxDistance
            ctx.strokeStyle = `rgba(168,85,247,${opacity * 0.45})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
