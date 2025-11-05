type InfoItem = {
  icon: string
  title: string
  text: string
}

const ITEMS: InfoItem[] = [
  { icon: '⚡', title: 'Apaixonado por Tecnologia', text: 'Ama tecnologia e aprendizado contínuo.' },
  { icon: '💻', title: 'Desenvolvedor Full Stack', text: 'Uno código e estratégia para entregar resultados reais.' },
  { icon: '🎯', title: 'Foco em Resultados', text: 'Soluções práticas, bem estruturadas e fáceis de manter para pequenas empresas.' },
  { icon: '🤝', title: 'Proximidade com o Cliente', text: 'Trabalho de forma próxima, entendendo o que importa para o negócio.' },
]

export function AboutCard() {
  return (
    <article
      role="region"
      aria-label="Sobre Bruno Gonçalves"
      className="group relative w-full overflow-hidden rounded-3xl card-glow p-8 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60"
    >
      {/* highlight sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />

      <header className="mb-6 flex items-center gap-5">
        <div
          aria-hidden="true"
          className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 border-purple-500/40 bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_8px_24px_rgba(168,85,247,0.35)]"
        >
          <span className="text-3xl font-black text-white tracking-wide">BG</span>
        </div>

        <div className="min-w-0">
          <h3 className="m-0 bg-gradient-to-br from-purple-300 to-pink-300 bg-clip-text text-2xl font-extrabold text-transparent">
            Bruno Gonçalves
          </h3>
          <p className="m-0 text-sm text-white/70">👤 29 anos</p>
        </div>
      </header>

      <section aria-label="Informações" className="grid gap-3">
        {ITEMS.map((item, index) => (
          <div
            key={item.title}
            tabIndex={0}
            className="grid grid-cols-[42px_1fr] items-center gap-3 rounded-2xl border border-purple-400/25 bg-purple-500/10 p-4 outline-none transition-all duration-300 hover:translate-x-1 hover:border-purple-300/60 hover:bg-purple-500/20 focus-visible:translate-x-1 focus-visible:ring-2 focus-visible:ring-purple-400/70"
          >
            <div
              aria-hidden="true"
              className="grid h-[42px] w-[42px] place-items-center rounded-lg bg-purple-400/30 text-[22px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
            >
              {item.icon}
            </div>

            <div className="min-w-0">
              <strong className="block text-sm font-semibold text-purple-300">{item.title}</strong>
              <p className="m-0 text-[0.98rem] leading-relaxed text-white/80">{item.text}</p>
            </div>
          </div>
        ))}
      </section>
    </article>
  )
}
