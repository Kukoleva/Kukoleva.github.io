import { Carousel } from './Carousel'
import type { LightboxImage } from './Lightbox'
import { reviews, site } from '../site'

function Stars({ n }: { n: number }) {
  return (
    <span className="text-accent" aria-label={`Оценка ${n} из 5`}>
      {'★'.repeat(n)}
      <span className="text-border">{'★'.repeat(5 - n)}</span>
    </span>
  )
}

export function Reviews({
  onOpenLightbox,
}: {
  onOpenLightbox: (images: LightboxImage[], index: number) => void
}) {
  const shots = reviews
    .filter((r) => r.shot)
    .map((r) => ({ src: r.shot as string, alt: `Скриншот отзыва — ${r.name}` }))

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-center font-serif text-3xl text-plum md:text-4xl">Отзывы клиентов</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-fg/70">
        Средняя оценка{' '}
        {(reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)} из 5 — реальные
        отзывы из мессенджеров.
      </p>

      <div className="mt-8">
        <Carousel>
          {reviews.map((r) => (
            <article
              key={r.name + r.service}
              className="flex w-72 shrink-0 snap-center flex-col rounded-card border border-border bg-card p-5 shadow-sm md:w-80"
            >
              <Stars n={r.stars} />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-fg/80">«{r.text}»</p>
              <div className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-3">
                <div>
                  <p className="font-semibold text-plum">{r.name}</p>
                  <p className="text-xs text-fg/60">{r.service}</p>
                </div>
                {r.shot && (
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(shots, shots.findIndex((s) => s.src === r.shot))}
                    aria-label={`Открыть скриншот отзыва — ${r.name}`}
                    className="shrink-0 overflow-hidden rounded-lg border border-border transition hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <img
                      src={r.shot}
                      alt={`Скриншот отзыва — ${r.name}`}
                      loading="lazy"
                      className="h-14 w-10 object-cover object-top"
                    />
                  </button>
                )}
              </div>
            </article>
          ))}
        </Carousel>
      </div>

      <div className="mt-8 text-center">
        <a
          href={site.socials.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-card border-2 border-plum px-8 py-3 font-semibold text-plum transition hover:bg-plum hover:text-white"
        >
          Оставить отзыв в Telegram →
        </a>
      </div>
    </section>
  )
}
