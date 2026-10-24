import { useEffect, useState } from 'react'
import { BookingForm } from '../components/BookingForm'
import { Carousel } from '../components/Carousel'
import { Faq } from '../components/Faq'
import type { LightboxImage } from '../components/Lightbox'
import { Reveal } from '../components/Reveal'
import { Reviews } from '../components/Reviews'
import { Services } from '../components/Services'
import { advantages, certs, priceCards, site, works } from '../site'

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-8 text-center font-serif text-3xl text-plum md:text-4xl">{children}</h2>
  )
}

export function Home({
  onOpenLightbox,
}: {
  onOpenLightbox: (images: LightboxImage[], index: number) => void
}) {
  const [bookedService, setBookedService] = useState<string | null>(null)

  useEffect(() => {
    const hash = window.location.hash
    if (hash && !hash.startsWith('#/')) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    }
  }, [])

  const book = (title: string) => {
    setBookedService(title)
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      {/* ГЕРОЙ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-plum to-plum-dark px-4 pb-16 pt-14 text-white md:pt-20">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#7b4a8f]/40 blur-3xl"
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:justify-between">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
              ⭐ 5.0 · г. Гомель, гостиница «Гомель»
            </span>
            <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
              Кабинет <em className="italic text-accent-soft">эстетической</em> косметологии в Гомеле
            </h1>
            <p className="mt-4 text-white/80">
              Чистка лица, пилинги, массаж, микронидлинг и комплексные программы — у
              косметолога-эстетиста Анастасии Куколевой.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href="#services"
                className="rounded-card bg-gradient-to-r from-accent to-accent-dark px-8 py-3 font-semibold text-white shadow-btn transition hover:-translate-y-0.5 hover:shadow-btn-hover"
              >
                Выбрать услугу
              </a>
              <a
                href="#booking"
                className="rounded-card border border-white/40 px-8 py-3 font-semibold backdrop-blur-sm transition hover:bg-white/10"
              >
                📞 Записаться
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-5 text-center md:text-left">
              <div>
                <p className="font-serif text-2xl text-accent-soft md:text-3xl">5-й</p>
                <p className="text-xs text-white/60">разряд косметолога</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-accent-soft md:text-3xl">21</p>
                <p className="text-xs text-white/60">процедура в каталоге</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-accent-soft md:text-3xl">5.0</p>
                <p className="text-xs text-white/60">оценка клиентов</p>
              </div>
            </div>
          </div>
          <Reveal>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[9rem] rounded-b-card border-2 border-accent/50"
              />
              <img
                src={site.specialist.photo}
                alt={`Косметолог ${site.specialist.name}`}
                fetchPriority="high"
                decoding="async"
                className="relative h-80 w-56 rounded-t-[9rem] rounded-b-card object-cover shadow-card transition duration-500 hover:scale-[1.02] md:h-96 md:w-72"
              />
              <span className="animate-floaty absolute -left-6 bottom-8 rounded-card border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                ✨ 7 этаж, каб. 716
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* БЕГУЩАЯ СТРОКА */}
      <div className="marquee overflow-hidden border-b border-border bg-card py-3.5" aria-hidden="true">
        <div className="marquee-track items-center font-serif text-lg uppercase tracking-[0.2em] text-plum">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {[
                'Чистка лица',
                'Пилинги',
                'Массаж лица',
                'Микронидлинг',
                'Брови',
                'Уходовые программы',
                'Консультация',
              ].map((t) => (
                <span key={t} className="flex items-center">
                  <span className="px-6">{t}</span>
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div className="h-full rounded-card border border-border bg-card p-5 shadow-sm">
                <span className="text-2xl" aria-hidden="true">
                  {a.icon}
                </span>
                <h3 className="mt-2 font-semibold text-plum">{a.title}</h3>
                <p className="mt-1 text-sm text-fg/70">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* КАТАЛОГ УСЛУГ */}
      <Services onBook={book} />

      {/* ПРАЙС-ЛИСТ (фото) */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <SectionTitle>Прайс-лист</SectionTitle>
        <Carousel>
          {priceCards.map((c, i) => (
            <button
              key={c.src}
              type="button"
              onClick={() => onOpenLightbox(priceCards, i)}
              className="shrink-0 snap-center overflow-hidden rounded-card bg-card shadow-card transition hover:-translate-y-1"
            >
              <img
                src={c.src}
                alt={c.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-72 w-64 object-cover md:h-96 md:w-80"
              />
            </button>
          ))}
        </Carousel>
      </section>

      {/* ЦИТАТА */}
      <div className="px-4 py-10 text-center">
        <blockquote className="mx-auto max-w-xl font-serif text-2xl leading-snug text-plum md:text-3xl">
          <p>
            <strong>{site.quote.accent}</strong> {site.quote.lines[0]}
          </p>
          <p>{site.quote.lines[1]}</p>
          <p className="mt-3 text-lg text-accent-dark md:text-xl">{site.quote.tail}</p>
        </blockquote>
      </div>

      {/* РАБОТЫ */}
      <section id="works" className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle>Наши работы</SectionTitle>
        <Carousel>
          {works.map((w, i) => (
            <button
              key={w.src}
              type="button"
              onClick={() => onOpenLightbox(works, i)}
              className="shrink-0 snap-center overflow-hidden rounded-card bg-card shadow-card transition hover:-translate-y-1"
            >
              <img
                src={w.src}
                alt={w.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-80 w-64 object-cover transition duration-500 hover:scale-105"
              />
            </button>
          ))}
        </Carousel>
      </section>

      {/* ОТЗЫВЫ */}
      <Reviews onOpenLightbox={onOpenLightbox} />

      {/* ФОРМА ЗАПИСИ */}
      <BookingForm selected={bookedService} />

      {/* FAQ */}
      <Faq />

      {/* О СПЕЦИАЛИСТЕ */}
      <section id="about" className="mx-auto max-w-4xl px-4 py-10">
        <Reveal>
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
        </Reveal>
      </section>

      {/* СЕРТИФИКАТЫ */}
      <section id="certs" className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle>Дипломы и сертификаты</SectionTitle>
        <Carousel>
          {certs.map((c, i) => (
            <button
              key={c.src}
              type="button"
              onClick={() => onOpenLightbox(certs, i)}
              className="shrink-0 snap-center overflow-hidden rounded-card bg-card shadow-card transition hover:-translate-y-1"
            >
              <img
                src={c.src}
                alt={c.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-80 w-64 object-cover transition duration-500 hover:scale-105"
              />
            </button>
          ))}
        </Carousel>
      </section>

      {/* КОНТАКТЫ + КАРТА */}
      <section id="contacts" className="mx-auto max-w-6xl px-4 py-12">
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
              href={site.mapUrl}
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
              {' · '}
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-dark hover:underline"
              >
                Instagram
              </a>
            </p>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-card border border-border shadow-card">
          <iframe
            title="Карта: гостиница «Гомель», пл. Привокзальная, 1"
            src={site.mapEmbed}
            className="h-72 w-full"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  )
}
