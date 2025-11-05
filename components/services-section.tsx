
"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Globe, Zap, Settings, ArrowRight, Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  {
    icon: Globe,
    title: 'Sites Institucionais',
    description: 'Criação de sites rápidos, responsivos e otimizados para mecanismos de busca.',
    note: 'Ideal para empresas que querem presença digital profissional.',
    features: [
      'Arquitetura pensada para SEO local',
      'Design alinhado à identidade da marca',
      'Integração com formulários e ferramentas de análise'
    ],
    price: 'Sob consulta',
    gradient: 'from-purple-600 to-purple-400'
  },
  {
    icon: Zap,
    title: 'Landing Pages',
    description: 'Páginas enxutas com foco total em conversão e carregamento leve.',
    note: 'Perfeitas para campanhas e captação de clientes.',
    features: [
      'Estrutura otimizada para leads',
      'Componentes leves e reutilizáveis',
      'Integração com automações de marketing'
    ],
    price: 'Sob consulta',
    gradient: 'from-purple-500 to-purple-300'
  },
  {
    icon: Settings,
    title: 'Sistemas Web Personalizados',
    description: 'Desenvolvimento de painéis, cadastros e dashboards conectados a banco de dados.',
    note: 'Para quem quer automatizar processos e centralizar informações.',
    features: [
      'Fluxos e regras de negócio sob medida',
      'Autenticação e segurança de dados',
      'Deploy monitorado em infraestrutura moderna'
    ],
    price: 'Sob consulta',
    gradient: 'from-purple-400 to-purple-200'
  }
]

export function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="pt-20 pb-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      
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
            <Sparkles className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Meus <span className="gradient-text">Serviços</span>
          </h2>
          <div className="glow-line w-24 mx-auto mb-6" />
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Soluções web criadas para gerar visibilidade, autoridade e resultado para o seu negócio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {services?.map((service, index) => {
            const IconComponent = service?.icon
            return (
              <motion.div
                key={service?.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative z-10"
              >
                <div className="card-glow p-8 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${service?.gradient} mb-4 shadow-lg shadow-purple-500/30`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 gradient-text hover-scale cursor-default">
                      {service?.title}
                    </h3>
                    <p className="text-white/60 text-sm hover-glow cursor-default">
                      {service?.description}
                    </p>
                    {service?.note && (
                      <p className="text-white/50 text-xs italic mt-2 hover-glow cursor-default">
                        {service?.note}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    {service?.features?.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-start group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + featureIndex * 0.1 }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5 mr-3 group-hover:bg-purple-500/40 transition-all">
                          <Check className="h-3 w-3 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        </div>
                        <span className="text-sm text-white/70 hover-glow">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-purple-500/20 pt-6 mt-auto">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold gradient-text">
                        {service?.price}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={scrollToContact}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all btn-glow"
                    >
                      Solicitar orçamento
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center relative z-10"
        >
          <div className="card-glow p-10">
            <h3 className="text-3xl font-bold mb-4 gradient-text hover-scale cursor-default">
              Não encontrou o que procura?
            </h3>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto text-lg hover-glow cursor-default">
              Cada projeto é único! Entre em contato e vamos conversar sobre suas necessidades específicas. 
              Juntos, encontraremos a solução ideal para o seu negócio.
            </p>
            <Button 
              onClick={scrollToContact} 
              size="lg" 
              className="px-10 py-6 text-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 btn-glow"
            >
              Vamos Conversar
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
