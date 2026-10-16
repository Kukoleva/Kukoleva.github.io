import { useState } from 'react'
import { site } from '../site'

const nav = [
  { href: '#top', label: 'Главная' },
  { href: '#services', label: 'Услуги и цены' },
  { href: '#works', label: 'Работы' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#faq', label: 'Вопросы' },
  { href: '#contacts', label: 'Контакты' },
]

export function Header({ onCall }: { onCall: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between bg-plum px-4 text-white shadow-md md:px-8">
      <a href="#/" className="font-serif text-2xl tracking-wide">
        {site.brand}
      </a>

      <nav
        className={`${
          open ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-40 flex w-64 flex-col gap-1 bg-plum-dark p-6 pt-20 transition-transform md:static md:w-auto md:translate-x-0 md:flex-row md:items-center md:gap-6 md:bg-transparent md:p-0`}
        aria-label="Главное меню"
      >
        {nav.map((n) => (
          <a
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className="rounded px-3 py-2 text-base font-semibold transition hover:bg-white/10"
          >
            {n.label}
          </a>
        ))}
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCall}
          className="rounded-card bg-accent px-4 py-2 font-semibold text-white shadow-btn transition hover:bg-accent-dark hover:shadow-btn-hover"
        >
          📞 Связаться
        </button>
        <button
          type="button"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-white transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-white transition ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>
    </header>
  )
}
