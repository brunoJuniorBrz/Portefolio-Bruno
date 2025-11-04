
"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, MessageSquare, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const words = useMemo(() => ['modernos.', 'rápidos.', 'responsivos.'], [])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [buttonsVisible, setButtonsVisible] = useState(false)
  const [socialVisible, setSocialVisible] = useState(false)
  const [terminalCycle, setTerminalCycle] = useState(0)
  const [clsDisplay, setClsDisplay] = useState('')
  const lineBaseDelay = 0.85
  const lineInterval = 0.7
  const finalPause = 1.4
  const finalCommand = 'CLS'
  const terminalLines = useMemo(
    () => [
      [
        { text: 'bruno@portfolio', className: 'text-emerald-400 font-semibold' },
        { text: ':~$', className: 'text-sky-400 ml-2' },
        { text: ' iniciar_superpoderes', className: 'text-purple-300' },
      ],
      [
        { text: '>', className: 'text-amber-300 mr-2' },
        { text: 'Carregando habilidades...', className: 'text-white/70' },
      ],
      [
        { text: '✓', className: 'text-emerald-400 mr-2' },
        { text: 'React.js & Next.js carregados', className: 'text-white/80' },
      ],
      [
        { text: '✓', className: 'text-emerald-400 mr-2' },
        { text: 'Performance otimizada (0.5s load)', className: 'text-white/80' },
      ],
      [
        { text: '✓', className: 'text-emerald-400 mr-2' },
        { text: 'SEO local configurado', className: 'text-white/80' },
      ],
      [
        { text: '✓', className: 'text-emerald-400 mr-2' },
        { text: 'Design responsivo ativado', className: 'text-white/80' },
      ],
    ],
    []
  )

  useEffect(() => {
    const cycleDuration = lineBaseDelay + terminalLines.length * lineInterval
    const buttonsDelay = (cycleDuration + 0.5) * 1000
    const socialDelay = buttonsDelay + 400

    const buttonsTimer = setTimeout(() => setButtonsVisible(true), buttonsDelay)
    const socialTimer = setTimeout(() => setSocialVisible(true), socialDelay)

    return () => {
      clearTimeout(buttonsTimer)
      clearTimeout(socialTimer)
    }
  }, [lineBaseDelay, lineInterval, terminalLines.length])

  useEffect(() => {
    const cycleDuration = lineBaseDelay + terminalLines.length * lineInterval + finalPause
    const nextTimer = setTimeout(() => setTerminalCycle((cycle) => cycle + 1), cycleDuration * 1000)

    return () => {
      clearTimeout(nextTimer)
    }
  }, [terminalCycle, lineBaseDelay, lineInterval, finalPause, terminalLines.length])

  useEffect(() => {
    let startTimer: ReturnType<typeof setTimeout> | undefined
    let typeTimer: ReturnType<typeof setTimeout> | undefined
    setClsDisplay('')

    const startDelay = (lineBaseDelay + terminalLines.length * lineInterval) * 1000

    const typeNext = (index: number) => {
      setClsDisplay(finalCommand.slice(0, index + 1))
      if (index + 1 < finalCommand.length) {
        typeTimer = setTimeout(() => typeNext(index + 1), 180)
      }
    }

    startTimer = setTimeout(() => typeNext(0), startDelay)

    return () => {
      if (startTimer) {
        clearTimeout(startTimer)
      }
      if (typeTimer) {
        clearTimeout(typeTimer)
      }
    }
  }, [terminalCycle, lineBaseDelay, lineInterval, terminalLines.length, finalCommand])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    if (!isDeleting && displayText === currentWord) {
      timeoutId = setTimeout(() => setIsDeleting(true), 1500)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    } else {
      const nextLength = isDeleting ? displayText.length - 1 : displayText.length + 1
      timeoutId = setTimeout(
        () => setDisplayText(currentWord.slice(0, nextLength)),
        isDeleting ? 60 : 120
      )
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [displayText, isDeleting, currentWordIndex, words])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openWhatsApp = () => {
    window.open('https://wa.me/5511999999999', '_blank')
  }

  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
      {/* Cursor follower effect */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Text Content */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.h1
              className="hero-heading text-center lg:text-left text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="inline-flex flex-wrap items-baseline justify-center lg:justify-start gap-x-2">
                <span className="gradient-text glow-text whitespace-nowrap">Transformo ideias em sites</span>
                <span className="hero-rotating-word">
                  <span className="hero-typed-text">{displayText || '\u00A0'}</span>
                  <span className="hero-caret" />
                </span>
              </span>
            </motion.h1>

            <motion.div
              className="mt-4 w-full max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-[rgba(20,20,30,0.92)] p-3.5 shadow-[0_16px_40px_rgba(168,85,247,0.2)] backdrop-blur-xl font-mono text-xs sm:text-[0.9rem] text-white/90">
                <div className="flex gap-2 mb-6 pb-4 border-b border-white/10">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div key={terminalCycle} className="space-y-2">
                  {terminalLines.map((segments, index) => (
                    <motion.div
                      key={index}
                      className="leading-relaxed"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: lineBaseDelay + index * lineInterval }}
                    >
                      {segments.map((segment, partIndex) => (
                        <span key={partIndex} className={segment.className}>
                          {segment.text}
                        </span>
                      ))}
                    </motion.div>
                  ))}
                  <motion.div
                    className="leading-relaxed flex items-center gap-2"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: lineBaseDelay + terminalLines.length * lineInterval }}
                  >
                    <span className="text-emerald-300 mr-2">{'>'}</span>
                    <span className="text-white">
                      Pronto para transformar seu negócio! <span role="img" aria-label="Foguete">🚀</span>
                    </span>
                    <span className="ml-1 text-xs sm:text-sm font-bold uppercase tracking-wide text-red-400">
                      {clsDisplay || ' '}
                    </span>
                    <motion.span
                      className="ml-1 inline-block h-4 w-[2px] bg-red-400 align-middle"
                      animate={{ opacity: clsDisplay.length === finalCommand.length ? [0, 1, 0] : [1, 0, 1] }}
                      transition={{ duration: clsDisplay.length === finalCommand.length ? 0.8 : 0.4, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={buttonsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              style={{ pointerEvents: buttonsVisible ? 'auto' : 'none' }}
            >
              <Button
                onClick={openWhatsApp}
                size="lg"
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 via-purple-500 to-pink-500 px-6 py-3.5 text-sm md:text-base font-semibold text-white shadow-[0_10px_22px_rgba(168,85,247,0.3)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(168,85,247,0.48)]"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Pedir orçamento no WhatsApp
              </Button>
              <Button
                onClick={() => scrollToSection('#portfolio')}
                size="lg"
                variant="outline"
                className="rounded-xl border border-purple-500/40 bg-white/5 px-6 py-3.5 text-sm md:text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-1 hover:border-purple-400 hover:bg-purple-500/20"
              >
                Ver projetos
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="mt-3 flex items-center justify-center gap-3 lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={socialVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              style={{ pointerEvents: socialVisible ? 'auto' : 'none' }}
            >
              <button
                type="button"
                onClick={() => window.open('https://linkedin.com', '_blank')}
                aria-label="LinkedIn"
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-purple-500/30 bg-[rgba(30,20,50,0.6)] text-white shadow-[0_8px_20px_rgba(168,85,247,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(168,85,247,0.36)]"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Linkedin className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </button>
              <button
                type="button"
                onClick={() => window.open('https://github.com', '_blank')}
                aria-label="GitHub"
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-purple-500/30 bg-[rgba(30,20,50,0.6)] text-white shadow-[0_8px_20px_rgba(168,85,247,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(168,85,247,0.36)]"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Github className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="relative">
              {/* Glow rings */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 opacity-20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="relative w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent backdrop-blur-sm border-2 border-purple-500/30 p-2 shadow-2xl shadow-purple-500/25"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full rounded-full overflow-hidden relative bg-black/40 border-4 border-purple-500/20">
                  <Image
                    src="https://thumbs.dreamstime.com/b/happy-male-avatar-icon-modern-outline-style-professional-user-profile-graphic-friendly-minimalist-line-art-smiling-man-394004924.jpg"
                    alt="Bruno Gonçalves - Desenvolvedor Web"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-5 -right-5 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg shadow-purple-500/50 flex items-center justify-center"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 360],
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                }}
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-5 -left-5 w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg shadow-lg shadow-purple-500/50"
                animate={{
                  y: [10, -10, 10],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                }}
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
