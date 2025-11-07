import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'

// Lazy load dos blocos abaixo da dobra para reduzir o JS enviado no first paint
const ParticleNetwork = dynamic(() => import('@/components/particle-network').then(mod => ({ default: mod.ParticleNetwork })), {
  ssr: false,
})

const AboutSection = dynamic(() => import('@/components/about-section-new').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="min-h-screen" />,
})

const ServicesSection = dynamic(() => import('@/components/services-section').then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="min-h-screen" />,
})

const PortfolioSection = dynamic(() => import('@/components/portfolio-section').then(mod => ({ default: mod.PortfolioSection })), {
  loading: () => <div className="min-h-screen" />,
})

const HowIWorkSection = dynamic(() => import('@/components/how-i-work-section').then(mod => ({ default: mod.HowIWorkSection })), {
  loading: () => <div className="min-h-screen" />,
})

const TestimonialsSection = dynamic(() => import('@/components/testimonials-section').then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="min-h-screen" />,
})

const ContactSection = dynamic(() => import('@/components/contact-section').then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="min-h-screen" />,
})

const Footer = dynamic(() => import('@/components/footer').then(mod => ({ default: mod.Footer })), {
  loading: () => null,
})

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <ParticleNetwork />
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <HowIWorkSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
