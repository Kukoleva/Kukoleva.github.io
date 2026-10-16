import { useEffect } from 'react'
import { Carousel } from '../components/Carousel'
import type { LightboxImage } from '../components/Lightbox'
import { certs, priceCards, site, works } from '../site'

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-8 text-center font-serif text-3xl text-plum md:text-4xl">{children}</h2>
  )
}

function ContactBtn({ onCall }: { onCall: () => void }) {
  return (
    <div className="mt-8 text-center">
      <button
        type="button"
        onClick={onCall}
        className="rounded-card bg-plum px-8 py-3 font-semibold text-white shadow-btn transition hover:bg-accent-dark hover:shadow-btn-hover"
      >
        📞 Связаться
      </button>
    </div>
  )
}

export function Home({
  onCall,
  onOpenLightbox,
}: {
  onCall: () => void
  onOpenLightbox: (images: LightboxImage[], index: number) => void
}) {
  useEffect(() => {
    const hash = window.location.hash
    if (hash && !hash.startsWith('#/')) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    }
  }, [])

  return (
    <main>
      {/* ГЕРОЙ */}
      <section className="bg-gradient-to-b from-plum to-plum-dark px-4 py-16 text-center text-white md:py-24">
        <p className="mx-auto max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
          {site.tagline}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Чистка лица, пилинги, массаж, микронидлинг и уходовые процедуры — у косметолога-эстетиста
          Анастасии Куколевой.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#/prices"
            className="rounded-card bg-accent px-8 py-3 font-semibold text-white shadow-btn transition hover:bg-accent-dark hover:shadow-btn-hover"
          >
            Узнать цены →
          </a>
          <button
            type="button"
            onClick={onCall}
            className="rounded-card border border-white/40 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            📞 Записаться
          </button>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle>Процедуры, которые мы выполняем</SectionTitle>
        <Carousel>
          {priceCards.map((c, i) => (
            <button
              key={c.src}
              type="button"
              onClick={() => onOpenLightbox(priceCards, i)}
              className="shrink-0 snap-center overflow-hidden rounded-card bg-card shadow-card transition hover:-translate-y-1"
            >
              <img src={c.src} alt={c.alt} className="h-72 w-64 object-cover md:h-96 md:w-80" />
            </button>
          ))}
        </Carousel>
        <ContactBtn onCall={onCall} />
      </section>

      {/* ПРАЙС-БАННЕР */}
      <section className="bg-plum px-4 py-12 text-center text-white">
        <h2 className="mx-auto max-w-2xl font-serif text-3xl md:text-4xl">
          Полный прайс-лист без сюрпризов при оплате
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="#/prices"
            className="rounded-card bg-white px-8 py-3 font-semibold text-plum transition hover:bg-accent hover:text-white"
          >
            Узнать цены →
          </a>
          <button
            type="button"
            onClick={onCall}
            className="rounded-card border border-white/40 px-8 py-3 font-semibold transition hover:bg-white/10"
          >
            📞 Связаться
          </button>
        </div>
      </section>

      {/* ЦИТАТА */}
      <div className="px-4 py-12 text-center">
        <blockquote className="mx-auto max-w-xl font-serif text-2xl leading-snug text-plum md:text-3xl">
          <p>
            <strong>{site.quote.accent}</strong> {site.quote.lines[0]}
          </p>
          <p>{site.quote.lines[1]}</p>
          <p className="mt-3 text-lg text-accent-dark md:text-xl">{site.quote.tail}</p>
        </blockquote>
      </div>

      {/* РАБОТЫ */}
      <section id="works" className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle>Наши работы</SectionTitle>
        <Carousel>
          {works.map((w, i) => (
            <button
              key={w.src}
              type="button"
              onClick={() => onOpenLightbox(works, i)}
              className="shrink-0 snap-center overflow-hidden rounded-card bg-card shadow-card transition hover:-translate-y-1"
            >
              <img src={w.src} alt={w.alt} loading="lazy" className="h-80 w-64 object-cover" />
            </button>
          ))}
        </Carousel>
        <ContactBtn onCall={onCall} />
      </section>

      {/* О СПЕЦИАЛИСТЕ */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        <article className="flex flex-col items-center gap-6 rounded-card bg-card p-8 shadow-card md:flex-row md:gap-10">
          <img
            src={site.specialist.photo}
            alt={`Косметолог ${site.specialist.name}`}
            className="h-56 w-44 rounded-card object-cover shadow-btn"
          />
          <div className="text-center md:text-left">
            <h3 className="font-serif text-3xl text-plum">{site.specialist.name}</h3>
            <p className="mt-2 font-semibold text-accent-dark">{site.specialist.rank}</p>
            <p className="mt-1 text-fg/80">{site.specialist.extra}</p>
            <p className="mt-4 text-sm text-fg/70">
              Приём ведётся в кабинете 716 гостиницы «Гомель» — по предварительной записи.
            </p>
          </div>
        </article>
      </section>

      {/* СЕРТИФИКАТЫ */}
      <section id="certs" className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle>Дипломы и сертификаты</SectionTitle>
        <Carousel>
          {certs.map((c, i) => (
            <button
              key={c.src}
              type="button"
              onClick={() => onOpenLightbox(certs, i)}
              className="shrink-0 snap-center overflow-hidden rounded-card bg-card shadow-card transition hover:-translate-y-1"
            >
              <img src={c.src} alt={c.alt} loading="lazy" className="h-80 w-64 object-cover" />
            </button>
          ))}
        </Carousel>
        <ContactBtn onCall={onCall} />
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle>Как нас найти</SectionTitle>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-card bg-card p-6 text-center shadow-card">
            <span className="text-3xl" aria-hidden="true">
              📍
            </span>
            <h3 className="mt-2 font-serif text-xl text-plum">Адрес студии</h3>
            <address className="mt-2 not-italic leading-relaxed">
              {site.address.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </address>
            <a
              href="https://yandex.by/maps/?ll=30.992874,52.431244&z=17&text=гостиница%20Гомель"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-semibold text-accent-dark underline-offset-4 hover:underline"
            >
              Открыть карту →
            </a>
          </div>
          <div className="rounded-card bg-card p-6 text-center shadow-card">
            <span className="text-3xl" aria-hidden="true">
              🕘
            </span>
            <h3 className="mt-2 font-serif text-xl text-plum">Работаем</h3>
            <p className="mt-2">{site.hours}</p>
          </div>
          <div className="rounded-card bg-card p-6 text-center shadow-card">
            <span className="text-3xl" aria-hidden="true">
              📞
            </span>
            <h3 className="mt-2 font-serif text-xl text-plum">Связаться</h3>
            <p className="mt-2">
              <a href={`tel:${site.phone}`} className="font-semibold text-accent-dark hover:underline">
                {site.phoneDisplay}
              </a>
            </p>
            <p className="mt-1">
              <a
                href={site.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-dark hover:underline"
              >
                WhatsApp
              </a>
              {' · '}
              <a
                href={site.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-dark hover:underline"
              >
                Telegram
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
