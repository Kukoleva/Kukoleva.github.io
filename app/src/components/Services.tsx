import { useMemo, useState } from 'react'
import { categories, services, type Category } from '../site'

export function Services({ onBook }: { onBook: (service: string) => void }) {
  const [active, setActive] = useState<Category | 'Все'>('Все')

  const list = useMemo(
    () => (active === 'Все' ? services : services.filter((s) => s.category === active)),
    [active],
  )

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-center font-serif text-3xl text-plum md:text-4xl">Услуги и цены</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-fg/70">
        Выберите процедуру — как товар в каталоге: цена фиксированная, без сюрпризов при оплате.
      </p>

      <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-center">
        {(['Все', ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active === c
                ? 'border-plum bg-plum text-white'
                : 'border-border bg-card text-fg hover:border-accent hover:text-accent-dark'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <article
            key={s.title}
            className="group flex flex-col rounded-card border border-border bg-card p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-card"
          >
            <span className="w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-dark">
              {s.category}
            </span>
            <h3 className="mt-3 font-serif text-xl leading-snug text-plum">{s.title}</h3>
            {s.details && <p className="mt-2 flex-1 text-sm leading-relaxed text-fg/70">{s.details}</p>}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-xl font-bold text-accent-dark">{s.price} р</span>
              <button
                type="button"
                onClick={() => onBook(s.title)}
                className="rounded-card bg-plum px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                Записаться →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
