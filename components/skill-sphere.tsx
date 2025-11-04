"use client"

import { useEffect, useRef } from "react"

type Skill = {
  name: string
  color: string
}

type Particle = {
  skill: Skill
  theta: number
  phi: number
  x: number
  y: number
  z: number
}

const SKILLS: Skill[] = [
  { name: "JavaScript", color: "#f7df1e" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#3c873a" },
  { name: "SQL", color: "#f29111" },
  { name: "Supabase", color: "#3ecf8e" },
  { name: "Prisma", color: "#0c344b" },
  { name: "Tailwind", color: "#38bdf8" },
  { name: "Vercel", color: "#ffffff" },
  { name: "Git", color: "#f1502f" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Netlify", color: "#00c7b7" },
]

export function SkillSphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const requestRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      return
    }

    let width = canvas.clientWidth
    let height = canvas.clientHeight
    const particles: Particle[] = []
    const DPR = Math.min(2, window.devicePixelRatio || 1)
    let radius = Math.min(width, height) * 0.48
    let angleX = 0.008
    let angleY = 0.008

    const computePosition = (particle: Particle) => {
      const x = radius * Math.sin(particle.phi) * Math.cos(particle.theta)
      const y = radius * Math.cos(particle.phi)
      const z = radius * Math.sin(particle.phi) * Math.sin(particle.theta)
      particle.x = x
      particle.y = y
      particle.z = z
    }

    const initSphere = () => {
      particles.length = 0
      const count = SKILLS.length
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i + 1) / count)
        const theta = Math.sqrt(count * Math.PI) * phi
        const particle: Particle = {
          skill: SKILLS[i],
          theta,
          phi,
          x: 0,
          y: 0,
          z: 0,
        }
        computePosition(particle)
        particles.push(particle)
      }
    }

    const rotate = () => {
      const sinX = Math.sin(angleX)
      const cosX = Math.cos(angleX)
      const sinY = Math.sin(angleY)
      const cosY = Math.cos(angleY)
      particles.forEach((particle) => {
        // rotation around X
        const y = particle.y * cosX - particle.z * sinX
        const z = particle.y * sinX + particle.z * cosX
        particle.y = y
        particle.z = z

        // rotation around Y
        const x = particle.x * cosY - particle.z * sinY
        particle.z = particle.x * sinY + particle.z * cosY
        particle.x = x
      })
    }

    const resizeCanvas = () => {
      const prevRadius = radius || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      radius = Math.min(width, height) * 0.52
      canvas.width = width * DPR
      canvas.height = height * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      if (particles.length && prevRadius) {
        const scale = radius / prevRadius
        particles.forEach((particle) => {
          particle.x *= scale
          particle.y *= scale
          particle.z *= scale
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const centerX = width / 2
      const centerY = height / 2
      const sorted = [...particles].sort((a, b) => b.z - a.z)

      sorted.forEach((particle) => {
        const scale = 1 + particle.z / radius
        const alpha = 0.7 + 0.3 * (particle.z / radius)
        ctx.save()
        ctx.translate(centerX + particle.x, centerY + particle.y)
        ctx.scale(scale, scale)
        ctx.globalAlpha = Math.max(0.2, Math.min(1, alpha))
        ctx.fillStyle = particle.skill.color
        ctx.font = "700 26px Inter, sans-serif"
        const textWidth = ctx.measureText(particle.skill.name).width
        ctx.fillText(particle.skill.name, -textWidth / 2, 7)
        ctx.restore()
      })
    }

    const tick = () => {
      rotate()
      draw()
      requestRef.current = requestAnimationFrame(tick)
    }

    let dragging = false
    let lastX = 0
    let lastY = 0

    const startDrag = (clientX: number, clientY: number) => {
      dragging = true
      lastX = clientX
      lastY = clientY
      canvas.style.cursor = "grabbing"
    }

    const stopDrag = () => {
      dragging = false
      canvas.style.cursor = "grab"
    }

    const handleDrag = (clientX: number, clientY: number) => {
      if (!dragging) return
      angleY = (clientX - lastX) * 0.002
      angleX = (clientY - lastY) * 0.002
      lastX = clientX
      lastY = clientY
    }

    const onMouseDown = (event: MouseEvent) => startDrag(event.clientX, event.clientY)
    const onMouseMove = (event: MouseEvent) => handleDrag(event.clientX, event.clientY)
    const onMouseUp = () => stopDrag()

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      startDrag(touch.clientX, touch.clientY)
    }
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      handleDrag(touch.clientX, touch.clientY)
    }
    const onTouchEnd = () => stopDrag()

    const observer = new ResizeObserver(() => {
      resizeCanvas()
    })

    resizeCanvas()
    initSphere()
    tick()

    canvas.style.cursor = "grab"
    observer.observe(canvas)
    canvas.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("touchend", onTouchEnd)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      observer.disconnect()
      canvas.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      canvas.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  return (
    <div className="relative h-[520px] w-full select-none">
      <canvas
        ref={canvasRef}
        className="h-full w-full rounded-xl bg-transparent touch-none"
      />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-background/30 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
        Arraste para explorar a esfera
      </div>
    </div>
  )
}
