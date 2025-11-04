"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Code2, Rocket, Award } from 'lucide-react'
import { SkillSphere } from '@/components/skill-sphere'
import { AboutCard } from '@/components/about-card'

const stats = [
  { icon: Calendar, label: 'Tempo de código', value: 'Alguns anos', color: 'from-purple-600 to-purple-400' },
  { icon: Code2, label: 'Foco atual', value: 'Next.js & Supabase', color: 'from-purple-500 to-purple-300' },
  { icon: Rocket, label: 'Projeto real', value: 'Mineração Itapeva', color: 'from-purple-400 to-purple-200' },
]

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <Award className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <div className="glow-line w-24 mx-auto mb-6" />
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Programo há alguns anos e transformo ideias em produtos web que resolvem necessidades reais de negócio.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="card-glow p-8 text-center group hover:scale-105 transition-transform duration-300 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${stat.color} mb-4`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2 hover-scale cursor-default">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 hover-glow cursor-default">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10"
          >
            <AboutCard />
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-10"
          >
            <div className="flex h-full flex-col items-center gap-6 px-2">
              <motion.h4
                className="text-2xl font-bold flex items-center justify-center gap-3 text-center group cursor-default"
                initial={{ opacity: 0, y: -12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Code2 className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <span className="gradient-text hover-scale">Habilidades Técnicas</span>
              </motion.h4>
              <motion.div
                className="relative w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <SkillSphere />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
