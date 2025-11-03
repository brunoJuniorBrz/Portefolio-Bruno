
"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Calendar, Tag, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: 'Mineração Itapeva',
    description: 'Site institucional completo para empresa de mineração, focando na apresentação dos serviços e fortalecimento da marca no mercado.',
    image: 'https://cdn.abacus.ai/images/5be6e184-331d-43e2-a98e-bc615828c93b.png',
    url: 'https://mineracaoitapeva.com.br/',
    category: 'Site Institucional',
    date: '2024',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'Design responsivo e moderno',
      'Otimização para SEO',
      'Painel administrativo',
      'Galeria de projetos',
      'Formulários de contato'
    ]
  }
]

export function PortfolioSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      
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
            <Briefcase className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Meu <span className="gradient-text">Portfólio</span>
          </h2>
          <div className="glow-line w-24 mx-auto mb-6" />
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Confira alguns dos projetos que desenvolvi para clientes reais
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {projects?.map((project, index) => (
            <motion.div
              key={project?.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative z-10"
            >
              <div className="card-glow overflow-hidden h-full flex flex-col">
                
                {/* Project Image */}
                <div className="relative h-80 bg-black/40 overflow-hidden group">
                  <Image
                    src={project?.image || '/placeholder-project.jpg'}
                    alt={project?.title || 'Projeto'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* View Project Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      onClick={() => window.open(project?.url, '_blank')}
                      className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-2xl shadow-purple-500/50 btn-glow scale-90 group-hover:scale-100 transition-transform"
                      size="lg"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Ver Projeto Online
                    </Button>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600/90 text-white border-none px-3 py-1">
                      {project?.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  {/* Project Header */}
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold mb-3 gradient-text hover-scale cursor-default">
                      {project?.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <div className="flex items-center hover-glow">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project?.date}
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-white/70 mb-6 leading-relaxed hover-glow cursor-default">
                    {project?.description}
                  </p>

                  {/* Project Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-purple-300 hover-underline cursor-default">Principais Funcionalidades:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {project?.features?.slice(0, 3)?.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-white/60 hover-glow group">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-purple-300 hover-underline cursor-default">Tecnologias:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project?.technologies?.map((tech) => (
                        <Badge key={tech} className="bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 hover:scale-110 transition-all cursor-default">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => window.open(project?.url, '_blank')}
                    className="w-full mt-auto bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 btn-glow"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visitar Site
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center relative z-10"
        >
          <div className="card-glow p-10">
            <div className="inline-flex p-4 rounded-full bg-purple-500/20 mb-6">
              <Briefcase className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 gradient-text hover-scale cursor-default">Mais projetos em breve!</h3>
            <p className="text-white/60 text-lg hover-glow cursor-default">
              Estou constantemente trabalhando em novos projetos incríveis. 
              Em breve, mais cases de sucesso estarão disponíveis aqui.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
