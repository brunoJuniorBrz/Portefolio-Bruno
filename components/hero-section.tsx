
"use client"

import { motion } from 'framer-motion'
import { ArrowDown, Mail, Github, Linkedin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-300">Disponível para novos projetos</span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-white">Bruno</span>
              <br />
              <span className="gradient-text glow-text">Gonçalves</span>
            </motion.h1>

            <motion.p
              className="text-2xl sm:text-3xl mb-4 text-purple-300 font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Desenvolvedor Web
            </motion.p>

            <motion.p
              className="text-lg mb-8 text-white/70 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Transformo ideias em experiências digitais incríveis. Especializado em criar 
              sites institucionais, landing pages e sistemas web que impulsionam resultados.
            </motion.p>

            {/* Action buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <Button
                onClick={() => scrollToSection('#contact')}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold px-8 py-6 text-lg btn-glow shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all"
              >
                <Mail className="mr-2 h-5 w-5" />
                Vamos Conversar
              </Button>
              
              <Button
                onClick={() => scrollToSection('#portfolio')}
                variant="outline"
                size="lg"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/60 font-semibold px-8 py-6 text-lg transition-all"
              >
                Ver Projetos
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex justify-center lg:justify-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <motion.div whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/60 w-12 h-12"
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/60 w-12 h-12"
                  onClick={() => window.open('https://github.com', '_blank')}
                >
                  <Github className="h-5 w-5" />
                </Button>
              </motion.div>
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
                className="relative w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent backdrop-blur-sm border-2 border-purple-500/30 p-2 shadow-2xl shadow-purple-500/30"
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
                className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg shadow-purple-500/50 flex items-center justify-center"
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
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg shadow-lg shadow-purple-500/50"
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

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <button
            onClick={() => scrollToSection('#about')}
            className="text-purple-400/70 hover:text-purple-300 transition-colors flex flex-col items-center gap-2 group"
          >
            <span className="text-sm">Role para baixo</span>
            <ArrowDown className="h-6 w-6 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
