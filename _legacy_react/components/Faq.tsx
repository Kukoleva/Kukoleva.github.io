import { useState } from 'react'
import { faqs } from '../site'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-14">
      <h2 className="text-center font-serif text-3xl text-plum md:text-4xl">Частые вопросы</h2>
      <div className="mt-8 flex flex-col gap-3">
        {faqs.map((f, i) => (
          <div key={f.q} className="overflow-hidden rounded-card border border-border bg-card shadow-sm">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-plum transition hover:bg-accent/5"
            >
              {f.q}
              <span
                className={`shrink-0 text-xl text-accent-dark transition-transform ${
                  open === i ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm leading-relaxed text-fg/75">{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
