
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios.' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido.' },
        { status: 400 }
      )
    }

    // Salvar no banco de dados
    const contactSubmission = await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || 'Contato via Portfólio',
        message: message.trim(),
        status: 'NEW',
        form_type: 'PORTFOLIO_CONTACT'
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensagem enviada com sucesso!',
        id: contactSubmission.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erro ao processar contato:', error)
    
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Endpoint de contato funcionando' },
    { status: 200 }
  )
}
