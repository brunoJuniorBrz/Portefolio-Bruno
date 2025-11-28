"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote } from 'lucide-react'

export function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="depoimentos" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-12 left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center card-glow p-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mx-auto mb-6">
            <Quote className="h-8 w-8 text-purple-300" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Depoimentos
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            Em breve você verá aqui histórias de clientes satisfeitos. Cada novo projeto é uma nova conquista.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
