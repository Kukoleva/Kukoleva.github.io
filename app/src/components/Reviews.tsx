import { Carousel } from './Carousel'
import { reviews, site } from '../site'

function Stars({ n }: { n: number }) {
  return (
    <span className="text-accent" aria-label={`Оценка ${n} из 5`}>
      {'★'.repeat(n)}
      <span className="text-border">{'★'.repeat(5 - n)}</span>
    </span>
  )
}

export function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="text-center font-serif text-3xl text-plum md:text-4xl">Отзывы клиентов</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-fg/70">
        Средняя оценка{' '}
        {(
          reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
        ).toFixed(1)}{' '}
        из 5 по отзывам клиентов.
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
              <div className="mt-4 border-t border-border pt-3">
                <p className="font-semibold text-plum">{r.name}</p>
                <p className="text-xs text-fg/60">{r.service}</p>
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
