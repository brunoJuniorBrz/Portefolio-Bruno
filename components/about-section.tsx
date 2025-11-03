"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { User, Calendar, MapPin, Coffee, Code2, Rocket } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { SkillSphere } from '@/components/skill-sphere'

const stats = [
  { icon: Coffee, label: 'Anos de Experiencia', value: '5+' },
  { icon: Code2, label: 'Projetos Concluidos', value: '50+' },
  { icon: Rocket, label: 'Clientes Satisfeitos', value: '30+' },
]

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 dark:section-gradient section-gradient-light" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Sobre <span className="text-primary">Mim</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Desenvolvedor web apaixonado por criar solucoes digitais que fazem a diferenca
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 dark:card-gradient card-gradient-light border-primary/20 shadow-xl">
              <div className="flex items-center mb-6">
                <User className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold">Bruno Goncalves</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>29 anos</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>Sao Paulo, Brasil</span>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6">
                Sou um desenvolvedor web freelancer com mais de 5 anos de experiencia 
                criando solucoes digitais personalizadas. Especializado em sites 
                institucionais, landing pages e sistemas web de baixa a media complexidade.
              </p>

              <p className="text-foreground/80 leading-relaxed">
                Minha paixao e transformar ideias em realidade digital, sempre focando 
                na experiencia do usuario e na performance dos projetos. Trabalho como 
                pessoa fisica, oferecendo um atendimento personalizado e proximo aos meus clientes.
              </p>
            </Card>
          </motion.div>

          {/* Skills & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats?.map((stat, index) => {
                const IconComponent = stat?.icon
                return (
                  <motion.div
                    key={stat?.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="p-6 text-center dark:card-gradient card-gradient-light border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                      <IconComponent className="h-8 w-8 text-primary mx-auto mb-3" />
                      <div className="text-2xl font-bold text-primary mb-1">
                        {stat?.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat?.label}
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Skills */}
            <Card className="p-8 dark:card-gradient card-gradient-light border-primary/20 shadow-xl">
              <motion.h4
                className="text-xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Habilidades Tecnicas
              </motion.h4>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <SkillSphere />
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
