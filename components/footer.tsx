
"use client"

import { Heart, Code } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 border-t border-purple-500/20">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2 text-white/60">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-purple-400 fill-purple-400 animate-pulse" />
            <span>e</span>
            <Code className="h-4 w-4 text-purple-400" />
            <span>por Bruno Gonçalves</span>
          </div>
          
          <div className="text-sm text-white/40">
            © {currentYear} Bruno Gonçalves. Todos os direitos reservados.
          </div>

          <div className="text-xs text-white/30">
            Desenvolvedor web focado em sites e sistemas sob medida
          </div>
        </div>
      </div>
    </footer>
  )
}
