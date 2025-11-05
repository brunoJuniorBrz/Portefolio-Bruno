
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { MouseLight } from '@/components/mouse-light'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'Bruno Gonçalves - Desenvolvedor Web',
  description: 'Portfólio profissional de Bruno Gonçalves, desenvolvedor web especializado em sites institucionais, landing pages e sistemas web.',
  openGraph: {
    title: 'Bruno Gonçalves - Desenvolvedor Web',
    description: 'Portfólio profissional de Bruno Gonçalves, desenvolvedor web especializado em sites institucionais, landing pages e sistemas web.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <MouseLight />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
