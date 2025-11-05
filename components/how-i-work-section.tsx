"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MessageCircle, LayoutTemplate, Code2, Rocket } from 'lucide-react'

const steps = [
  {
    icon: MessageCircle,
    title: 'Entendimento',
    description: 'Converso com o cliente, mergulho na realidade do negócio e levanto o que é prioridade para o projeto.',
  },
  {
    icon: LayoutTemplate,
    title: 'Protótipo',
    description: 'Apresento a proposta visual antes da codificação para alinhar expectativas e validar o fluxo de navegação.',
  },
  {
    icon: Code2,
    title: 'Desenvolvimento',
    description: 'Implemento o projeto com tecnologias modernas, garantindo desempenho, acessibilidade e escalabilidade.',
  },
  {
    icon: Rocket,
    title: 'Entrega e suporte inicial',
    description: 'Publico o projeto, configuro métricas essenciais e acompanho os primeiros dias no ar para ajustes rápidos.',
  },
]

export function HowIWorkSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="processo" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-24 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

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
            <Rocket className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Como <span className="gradient-text">Trabalho</span>
          </h2>
          <div className="glow-line w-24 mx-auto mb-6" />
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Processo simples, transparente e pensado para entregar valor em cada etapa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card-glow p-8 relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-purple-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
