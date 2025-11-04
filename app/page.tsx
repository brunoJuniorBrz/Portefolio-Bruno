
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section-new'
import { ServicesSection } from '@/components/services-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { HowIWorkSection } from '@/components/how-i-work-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { ParticleNetwork } from '@/components/particle-network'

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
