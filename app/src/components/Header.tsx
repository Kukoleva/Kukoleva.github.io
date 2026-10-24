import { useEffect, useRef, useState } from 'react'
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
  const [scrolled, setScrolled] = useState(false)
  const progress = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 10)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progress.current)
        progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 text-white transition-all duration-300 ${
        scrolled ? 'bg-plum/85 shadow-lg backdrop-blur-md' : 'bg-plum'
      }`}
    >
      <div
        ref={progress}
        className="h-0.5 origin-left bg-gradient-to-r from-accent to-accent-dark"
        style={{ transform: 'scaleX(0)' }}
      />
      <div className="flex h-[70px] items-center justify-between px-4 md:px-8">
        <a href="#/" className="font-serif text-2xl tracking-wide">
          {site.brand}
        </a>

        <nav
          className={`${
            open ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-40 flex w-64 flex-col gap-1 bg-plum-dark p-6 pt-20 transition-transform md:static md:w-auto md:translate-x-0 md:flex-row md:items-center md:gap-5 md:bg-transparent md:p-0`}
          aria-label="Главное меню"
        >
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="relative rounded px-3 py-2 text-base font-semibold transition hover:bg-white/10 md:after:absolute md:after:inset-x-3 md:after:bottom-1 md:after:h-0.5 md:after:origin-left md:after:scale-x-0 md:after:bg-accent md:after:transition-transform md:hover:after:scale-x-100"
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
            className="rounded-card bg-gradient-to-r from-accent to-accent-dark px-4 py-2 font-semibold text-white shadow-btn transition hover:shadow-btn-hover"
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
            <span
              className={`h-0.5 w-6 bg-white transition ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`h-0.5 w-6 bg-white transition ${open ? 'opacity-0' : ''}`} />
            <span
              className={`h-0.5 w-6 bg-white transition ${open ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>
    </header>
  )
}
