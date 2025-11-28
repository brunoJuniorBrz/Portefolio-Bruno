
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu, X, User, Briefcase, Code, Mail, Rocket, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Início', href: '#home', icon: User },
  { name: 'Sobre', href: '#about', icon: User },
  { name: 'Serviços', href: '#services', icon: Code },
  { name: 'Portfólio', href: '#portfolio', icon: Briefcase },
  { name: 'Processo', href: '#processo', icon: Rocket },
  { name: 'Depoimentos', href: '#depoimentos', icon: Quote },
  { name: 'Contato', href: '#contact', icon: Mail },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-black/60 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10'
        : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => scrollToSection('#home')}
              className="relative w-12 h-12"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navigation?.map((item) => (
                <motion.button
                  key={item?.name}
                  onClick={() => scrollToSection(item?.href)}
                  className="text-white/70 hover:text-purple-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-purple-500/10 relative group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item?.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10 border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/10"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-purple-400" />
              ) : (
                <Menu className="h-5 w-5 text-purple-400" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/80 backdrop-blur-xl rounded-lg mt-2 border border-purple-500/20">
              {navigation?.map((item) => {
                const IconComponent = item?.icon
                return (
                  <button
                    key={item?.name}
                    onClick={() => scrollToSection(item?.href)}
                    className="text-white/70 hover:text-purple-400 hover:bg-purple-500/10 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 flex items-center space-x-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item?.name}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
