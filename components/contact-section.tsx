
"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Send, User, MessageSquare, Phone, MapPin, Github, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { toast } from 'sonner'

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Mensagem enviada com sucesso! Entrarei em contato em breve.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error('Erro ao enviar mensagem. Tente novamente.')
      }
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      
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
            <Mail className="h-12 w-12 text-purple-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Vamos <span className="gradient-text">Conversar</span>
          </h2>
          <div className="glow-line w-24 mx-auto mb-6" />
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Quer tirar sua ideia do papel? Me envie uma mensagem e receba uma proposta personalizada.
            <br className="hidden sm:block" />
            Respondo em até 24 horas!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="card-glow p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text flex items-center">
                <Send className="h-6 w-6 mr-3" />
                Envie uma Mensagem
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2 text-purple-400" />
                    Seu Nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Digite seu nome completo"
                    className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-500/60"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-purple-400" />
                    Seu E-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-500/60"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-purple-400" />
                    Sua Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Conte-me sobre seu projeto..."
                    rows={6}
                    className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-500/60 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white py-6 text-lg font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 btn-glow"
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col h-full space-y-6"
          >
            <div className="card-glow p-8 flex-grow">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">E-mail</h4>
                    <a 
                      href="mailto:bruno.importacao1996@gmail.com" 
                      className="text-white/60 hover:text-purple-400 transition-colors"
                    >
                      bruno.importacao1996@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Localização</h4>
                    <p className="text-white/60">São Paulo, Brasil</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-purple-500/20">
                  <h4 className="text-xl font-bold mb-4 gradient-text">Redes Sociais</h4>
                  <p className="text-white/60 mb-6">
                    Conecte-se comigo nas redes sociais para acompanhar meu trabalho
                  </p>
                  
                  <div className="flex gap-4">
                    <motion.div whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/60"
                        onClick={() => window.open('https://linkedin.com', '_blank')}
                      >
                        <Linkedin className="h-5 w-5 mr-2" />
                        LinkedIn
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/60"
                        onClick={() => window.open('https://github.com', '_blank')}
                      >
                        <Github className="h-5 w-5 mr-2" />
                        GitHub
                      </Button>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-purple-500/20">
                  <h4 className="text-xl font-bold mb-4 gradient-text">Disponibilidade</h4>
                  <p className="text-white/70 leading-relaxed">
                    Estou disponível para novos projetos e pronto para entender sua ideia com atenção. Assim que a mensagem chega,
                    respondo em até 24 horas para seguirmos com o próximo passo.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
