# Portfólio – Bruno Gonçalves

Portfólio pessoal desenvolvido em **Next.js 14 (App Router)** e **TypeScript**, com foco em animações suaves, lazy-loading agressivo e um painel de projetos que exibe previews navegáveis (desktop e mobile) sem perder performance.

<p align="center">
  <img src="./public/mineracao-thumb.jpg" alt="Thumb do projeto Mineração Itapeva" width="600" />
</p>

## ⚡️ Destaques
- **Hero interativo** com `ParticleNetwork` (renderizado apenas no client).
- **Seções preguiçosas** (`dynamic import`) para About, Services, Portfolio, How I Work, Testimonials, Contact e Footer — reduz o JavaScript enviado no carregamento inicial.
- **Drawer de projetos** com preview real (iframe escalado), alternância Desktop/Mobile e CTA rápido.
- **Contato completo** com formulários e componentes headless (Radix UI + shadcn/ui).
- **Design consistente** via Tailwind CSS + tokens utilitários definidos em `app/globals.css`.

## 🧱 Estrutura do projeto

```
├── app/                 # Rotas App Router e layout global
│   └── page.tsx         # Composição das seções (tudo lazy)
├── components/          # Seções e utilitários reutilizáveis
│   ├── portfolio-section.tsx
│   └── ...
├── public/              # Assets estáticos (favicons, thumbs, OG image)
│   └── mineracao-thumb.jpg
├── prisma/              # Schema e migrações (quando necessário)
├── package.json
└── README.md
```

## 🛠️ Stack principal
- **Next.js 14** (App Router, `dynamic()` e otimizações automáticas)
- **TypeScript**
- **Tailwind CSS** + `tailwind-merge`
- **Framer Motion** (animações)
- **Radix UI / shadcn/ui** (componentes acessíveis)
- **React Hook Form / Zod** (fluxos de formulários)

## 🚀 Rodando localmente
```bash
npm install          # instala dependências
npm run dev          # http://localhost:3000
npm run build        # build de produção
npm run start        # serve build
npm run lint         # (depois de inicializar o eslint) checa o TypeScript/React
```

> Obs.: o comando `npm run lint` acionará o wizard do Next na primeira execução. Basta escolher o preset **Strict**.

## 🖼️ Atualizando projetos
1. Abra `components/portfolio-section.tsx`.
2. Edite/adicione objetos no array `projects`.
3. Para novas thumbs, gere uma captura (ex.: `html2image`) e salve em `public/`.
4. Atualize os metadados (descrição, tecnologias, features).

## 🤖 Comentários úteis
- `portfolio-section.tsx` tem comentários explicando o cálculo do preview e o hook que oculta o menu global enquanto o drawer está aberto.
- `app/page.tsx` usa `dynamic import` para cada seção fora da dobra, melhorando o **LCP**.

## 🧹 Manutenção e limpeza
- Imports não utilizados são eliminados durante o lint (ESLint + TypeScript).
- O JSON com os projetos não depende mais de métricas fictícias (`stats`), reduzindo o payload.
- Assets pesados são convertidos para `.jpg` (ex.: `mineracao-thumb.jpg`) para economizar banda.

## 📌 Próximos passos sugeridos
- Configurar `next/image` para todas as imagens grandes.
- Adicionar testes de snapshot para componentes principais.
- Automatizar a captura de thumbs usando uma action que roda em pull request.

---

Feito com 💜 por [Bruno Gonçalves](https://github.com/brunoJuniorBrz). Sinta-se livre para abrir issues ou PRs!
