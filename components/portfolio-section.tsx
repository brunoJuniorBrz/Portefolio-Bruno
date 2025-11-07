
"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Calendar, ArrowLeft, ArrowRight, Sparkles, Monitor, Smartphone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface PortfolioProject {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  url: string
  category: string
  date: string
  technologies: string[]
  features: string[]
  gradient: string
  featured?: boolean
  industry?: string
  projectSize?: string
  duration?: string
}

const projects: PortfolioProject[] = [
  {
    id: 1,
    title: 'Mineração Itapeva',
    description: 'Site institucional moderno com foco em performance e design responsivo.',
    longDescription:
      'Meu primeiro projeto profissional completo - desenvolvi o site institucional da Mineração Itapeva, empresa com 65+ anos de tradição. O projeto foi criado em 15 dias usando Next.js 14, TypeScript e Tailwind CSS. Implementei um design moderno e limpo, com formulário de contato funcional, WhatsApp flutuante, otimização de performance e SEO básico. O site é totalmente responsivo e reflete a seriedade do setor de mineração.',
    image: '/mineracao-thumb.jpg',
    url: 'https://mineracaoitapeva.com.br/',
    category: 'Site Institucional',
    date: '2024',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    features: [
      'Design moderno e responsivo',
      'Formulário de contato funcional',
      'WhatsApp flutuante integrado',
      'SEO básico otimizado',
      'Performance otimizada',
      'Animações suaves com Framer Motion',
      'Arquitetura App Router',
      'Código limpo e organizado',
    ],
    gradient: 'from-purple-600 to-purple-400',
    featured: true,
    industry: 'Mineração & Indústria',
    projectSize: 'Site Institucional',
    duration: '15 dias',
  },
]

type DeviceView = 'desktop' | 'mobile'

const deviceOptions: { id: DeviceView; label: string; icon: typeof Monitor }[] = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
]

function DeviceSwitch({ value, onChange }: { value: DeviceView; onChange: (view: DeviceView) => void }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur">
      {deviceOptions.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all ${
            value === id
              ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-[0_15px_60px_rgba(168,85,247,0.35)]'
              : 'text-white/60 hover:text-white/80'
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  )
}

// Renderiza um mock responsivo (desktop ou iPhone) e ajusta o scale conforme a largura real disponível
function DevicePreview({ project, view }: { project: PortfolioProject; view: DeviceView }) {
  const isDesktop = view === 'desktop'
  const [viewport, setViewport] = useState<{ width: number; height: number }>({ width: 1440, height: 900 })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [wrapperWidth, setWrapperWidth] = useState<number | null>(null)

  useEffect(() => {
    const update = () => {
      if (typeof window === 'undefined') return
      const w = window.innerWidth
      if (isDesktop) {
        setViewport(w < 900 ? { width: 1440, height: 900 } : { width: 1440, height: 900 })
      } else {
        setViewport(w < 900 ? { width: 400, height: 780 } : { width: 420, height: 820 })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [isDesktop])

  useEffect(() => {
    if (!wrapperRef.current) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry?.contentRect) {
        setWrapperWidth(entry.contentRect.width)
      }
    })
    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  const effectiveWidth = wrapperWidth ?? (isDesktop ? 800 : 360)
  const baseScale = effectiveWidth / viewport.width
  const scale = Math.min(isDesktop ? 0.7 : 1, baseScale)
  const previewHeight = viewport.height * scale
  const outerRadius = isDesktop ? 'rounded-[30px]' : 'rounded-[2rem]'
  const innerRadius = isDesktop ? 'rounded-2xl' : 'rounded-[1.25rem]'

  return (
    <div className={`flex justify-center ${isDesktop ? 'w-full' : ''}`}>
      <div
        ref={wrapperRef}
        className={`relative ${isDesktop ? 'w-full max-w-5xl' : 'w-full max-w-[420px]'} border border-white/10 bg-slate-950/80 ${outerRadius} p-4 shadow-[0_25px_80px_rgba(3,2,20,0.65)]`}
        style={{ minHeight: previewHeight + 48 }}
      >
        <div className="absolute inset-x-16 -top-2 h-2 rounded-full bg-white/10 blur" aria-hidden />
        <div className="relative">
          <div className={`relative w-full overflow-hidden bg-black ${innerRadius}`} style={{ height: previewHeight }}>
            <LivePreviewFrame url={project.url} view={view} viewport={viewport} scale={scale} />
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-9 bg-white/85 text-slate-600 flex items-center justify-between px-4 text-xs font-medium">
              <span className="truncate">{project.url.replace('https://', '')}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">preview</span>
            </div>
          </div>
          {isDesktop && <div className="mx-auto mt-3 h-3 w-48 rounded-b-3xl bg-slate-700/70" aria-hidden />}
        </div>
      </div>
    </div>
  )
}

// Carrega o site real dentro do mock e trata loading/bloqueios sem quebrar a UI
function LivePreviewFrame({
  url,
  view,
  viewport,
  scale,
}: {
  url: string
  view: DeviceView
  viewport: { width: number; height: number }
  scale: number
}) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'blocked'>('loading')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    setStatus('loading')
    const timer = window.setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'blocked' : current))
    }, 6000)
    return () => window.clearTimeout(timer)
  }, [url, view])

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ height: viewport.height * scale }}>
      {status !== 'blocked' && (
        <iframe
          key={`${url}-${view}`}
          src={url}
          loading="lazy"
          onLoad={() => setStatus('ready')}
          style={{
            width: viewport.width,
            height: viewport.height,
            border: 0,
            position: 'absolute',
            top: 0,
            left: '50%',
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        />
      )}

      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/80 text-center text-white/70">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Carregando preview...</p>
        </div>
      )}

      {status === 'blocked' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/90 px-6 text-center text-white/80">
          <p className="text-sm">
            Este site bloqueia visualização embutida.
            <br />
            Abra em uma nova aba para conferir o projeto.
          </p>
          <Button
            onClick={() => window.open(url, '_blank', 'noopener')}
            className="bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white"
            size="sm"
          >
            <ExternalLink className="mr-2 h-4 w-4" /> Abrir site
          </Button>
        </div>
      )}
    </div>
  )
}

function ProjectPreviewSheet({
  project,
  onClose,
}: {
  project: PortfolioProject | null
  onClose: () => void
}) {
  const [view, setView] = useState<DeviceView>('desktop')

  useEffect(() => {
    if (!project) {
      return
    }

    setView('desktop')
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = original
    }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 w-full overflow-y-auto bg-slate-950/95 px-6 py-6 shadow-2xl border-l border-white/10 sm:w-[520px] lg:w-[860px]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
          >
            <div className="mx-auto flex max-w-5xl flex-col gap-6">
              <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                  </button>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">{project.category}</p>
                    <h3 className="text-3xl font-semibold text-white">{project.title}</h3>
                    <p className="text-sm text-white/60">{project.description}</p>
                  </div>
                </div>
              </header>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <DeviceSwitch value={view} onChange={setView} />
                <Button
                  onClick={() => window.open(project.url, '_blank', 'noopener')}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-900/40"
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir site
                </Button>
              </div>

              <DevicePreview project={project} view={view} />

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Tecnologias</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        className="border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-100"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Destaques</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {project.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Ano', value: project.date },
                  { label: 'Setor', value: project.industry },
                  { label: 'Escopo', value: project.projectSize },
                  { label: 'Duração', value: project.duration },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                    >
                      <span className="text-xs uppercase tracking-[0.2em] text-white/40">{item.label}</span>
                      <p className="text-white">{item.value}</p>
                    </div>
                  ))}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


export function PortfolioSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [drawerProject, setDrawerProject] = useState<PortfolioProject | null>(null)

  // Esconde o menu global enquanto o drawer estiver aberto para manter o foco no preview
  useEffect(() => {
    const rootMenu = document.querySelector('header, nav')
    if (!rootMenu) {
      return
    }
    if (drawerProject) {
      rootMenu.classList.add('opacity-0', 'pointer-events-none')
    } else {
      rootMenu.classList.remove('opacity-0', 'pointer-events-none')
    }
  }, [drawerProject])

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Projetos <span className="gradient-text">Recentes</span>
          </h2>
          <div className="glow-line w-24 mx-auto mb-6" />
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Transformando ideias em experiências digitais memoráveis e de alta performance.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects?.map((project, index) => (
            <motion.div
              key={project?.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative z-10 group project-card"
            >
              <div className="card-glow rounded-2xl overflow-hidden h-full">
                {/* Project Image */}
                <div className="relative h-64 bg-black/40 overflow-hidden">
                  <Image
                    src={project?.image || '/placeholder-project.jpg'}
                    alt={project?.title || 'Projeto'}
                    fill
                    className="object-cover project-image"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 px-3 py-1 text-xs font-medium">
                      {project?.category}
                    </Badge>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => window.open(project?.url, '_blank')}
                      className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg transform scale-90 group-hover:scale-100 transition-all"
                      size="sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Projeto
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title and Date */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold mb-1 gradient-text group-hover:text-purple-400 transition-colors">
                      {project?.title}
                    </h3>
                    <div className="flex items-center text-sm text-white/50">
                      <Calendar className="h-3 w-3 mr-1" />
                      {project?.date}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {project?.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project?.technologies?.slice(0, 3)?.map((tech) => (
                        <Badge 
                          key={tech} 
                          className="bg-purple-500/10 text-purple-300 border-purple-500/20 text-xs px-2 py-0.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project?.technologies?.length > 3 && (
                        <Badge className="bg-purple-500/10 text-purple-300 border-purple-500/20 text-xs px-2 py-0.5">
                          +{project?.technologies?.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-1 mb-4">
                    {project?.features?.slice(0, 2)?.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-white/60">
                        <div className="w-1 h-1 bg-purple-500 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <Button
                    onClick={() => setDrawerProject(project)}
                    variant="ghost"
                    className="w-full border border-purple-500/20 text-purple-200 hover:bg-purple-500/10"
                    size="sm"
                  >
                    Ver mais
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center relative z-10"
        >
          <div className="card-glow p-10 rounded-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-flex p-4 rounded-full bg-purple-500/20 mb-6"
            >
              <Sparkles className="h-8 w-8 text-purple-400" />
            </motion.div>
            <h3 className="text-3xl font-bold mb-4 gradient-text">Tem um projeto em mente?</h3>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Vamos transformar sua ideia em realidade digital. Entre em contato e descubra como podemos criar algo incrível juntos.
            </p>
            <Button 
              onClick={() => {
                const element = document.querySelector('#contact')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              size="lg" 
              className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 btn-glow"
            >
              Vamos Conversar
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
      <ProjectPreviewSheet project={drawerProject} onClose={() => setDrawerProject(null)} />
    </section>
  )
}
